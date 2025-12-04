# 🏗️ Arquitetura Backend - PAYHUB

**Versão:** 1.0  
**Data:** 29/11/2024  
**Período:** Semanas 1-2 (24/11 - 05/12)  

---

## 📊 Visão Geral

O backend PAYHUB implementa liquidação D+0 via Escrow na XRPL com RLUSD (Issued Currency/IOU), integrando PIX e cartão ao API Gateway que converte BRL→RLUSD via ODL.

```
┌─────────────────────────────────────────────────────────────┐
│                    PAYHUB BACKEND                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🔐 SEGURANÇA LAYER                                         │
│  ├─ Rate Limit por IP (server.js:98-113)                   │
│  ├─ JWT curto (issuer/maxAge/cache TTL)                    │
│  ├─ XRPL_SEED isolada (KMS/ENV)                            │
│  └─ Honeypot/Defesa Ativa                                  │
│                                                              │
│  💳 PAGAMENTOS LAYER                                        │
│  ├─ PIX QR dinâmico + callback                             │
│  ├─ Cartão (vista/parcelado/débito)                        │
│  └─ Conversão BRL→RLUSD (ODL)                              │
│                                                              │
│  🔗 XRPL LAYER                                              │
│  ├─ Trustline RLUSD (api/trustline-rlusd.js:45-52)        │
│  ├─ EscrowCreate IOU (api/escrow-create.js:47-63)         │
│  ├─ EscrowFinish (api/escrow-finish.js:55-60)             │
│  └─ Cliente TS (src/backend/xrpl/xrpl-client.ts)          │
│                                                              │
│  🏦 DeFi LAYER                                              │
│  ├─ AMM Quote (ripple_path_find)                           │
│  ├─ AMM Deposit/Withdraw (api/amm-*.js)                    │
│  └─ Yield Activation (mXRP 5-8% APY)                       │
│                                                              │
│  📊 COMPLIANCE LAYER                                        │
│  ├─ Logs sem PII/secrets (api/_logger.js:37-43)           │
│  ├─ Auditoria txHash/sequence                              │
│  ├─ CSV Export (api/v1/compliance/report.js:24-29)        │
│  └─ Reconciliação ERP (mock)                               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔒 Segurança (Semana 2)

### Rate Limiting

**Arquivo:** `server.js:98-113`

```javascript
// Rate limit por IP nas rotas locais
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 requests
  message: 'Too many requests from this IP'
});

app.use('/api/', limiter);
```

### JWT com TTL Curto

**Arquivo:** `api/_auth.js:29-37`

```javascript
// JWT curto com issuer/maxAge e cache TTL
const jwt = require('jsonwebtoken');

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    issuer: 'payhub-api',
    expiresIn: '15m', // TTL curto
    algorithm: 'HS256'
  });
}

// Cache TTL: api/_auth.js:35-36
const tokenCache = new Map();
const CACHE_TTL = 15 * 60 * 1000; // 15 minutos
```

### XRPL_SEED Isolation

**Princípios:**
- ✅ Carregada APENAS via variável de ambiente
- ✅ Protegida por KMS/Vault no backend
- ✅ NUNCA em frontend, logs ou banco
- ✅ Assinatura efêmera no servidor

```javascript
// ❌ NUNCA FAZER:
const XRPL_SEED = "sXXXXXXXXXXXXXX"; // Hard-coded

// ✅ SEMPRE FAZER:
const XRPL_SEED = process.env.XRPL_SEED; // ENV apenas
```

### Defesa Ativa (Honeypot)

**Script:** `package.json:28`

```bash
npm run security:honeypot-trigger
```

**Funcionalidade:**
- Carteiras isca para detectar ataques
- Resposta: invalidação de sessão
- Drill de incidentes

---

## 💳 Trustline RLUSD (Semana 2)

### Endpoint

**POST** `/api/trustline-rlusd`

**Arquivo:** `api/trustline-rlusd.js:45-52`

**Request:**
```json
{
  "issuer": "rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X",
  "currency": "RLUSD",
  "limit": "1000000"
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "527F0C5615004AF3B3C3FE12D1CECE7CD2D9CA229D3607B65210357A231836C2",
  "explorerUrl": "https://testnet.xrpl.org/transactions/527F0C5615004AF3B3C3FE12D1CECE7CD2D9CA229D3607B65210357A231836C2",
  "trustlineEstablished": true
}
```

### Auditoria

**Arquivo:** `api/trustline-rlusd.js:65-69`

```javascript
// Auditoria sem segredos
logger.info('Trustline created', {
  txHash: result.hash,
  currency: 'RLUSD',
  issuer: issuer,
  // NUNCA logar: XRPL_SEED, wallets privados
});
```

---

## 🔗 Escrow RLUSD IOU (Semana 2)

### EscrowCreate

**POST** `/api/escrow-create`

**Arquivo:** `api/escrow-create.js:47-63`

**Request:**
```json
{
  "amount": {
    "currency": "RLUSD",
    "value": "5.00",
    "issuer": "rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X"
  },
  "destination": "r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K",
  "finishAfter": 946684800
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "7876B63EE59FCE568CAF52C60736B717FAE4636622E85670D87FDB455A314DC6",
  "owner": "rHHe2ha4z23RZJdPQTg11E1QuxEDjGgJz8",
  "offerSequence": 12860889,
  "explorerUrl": "https://testnet.xrpl.org/transactions/7876B63EE59FCE568CAF52C60736B717FAE4636622E85670D87FDB455A314DC6"
}
```

### EscrowFinish

**POST** `/api/escrow-finish`

**Arquivo:** `api/escrow-finish.js:55-60`

**Request:**
```json
{
  "owner": "rHHe2ha4z23RZJdPQTg11E1QuxEDjGgJz8",
  "offerSequence": 12860889
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5",
  "explorerUrl": "https://testnet.xrpl.org/transactions/38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5",
  "escrowFinished": true,
  "confirmationTime": "3.5s"
}
```

### Cliente TypeScript

**Arquivo:** `src/backend/xrpl/xrpl-client.ts:95`

```typescript
async finishEscrow(owner: string, offerSequence: number) {
  const tx = {
    TransactionType: 'EscrowFinish',
    Account: this.wallet.address,
    Owner: owner,
    OfferSequence: offerSequence
  };
  
  const prepared = await this.client.autofill(tx);
  const signed = this.wallet.sign(prepared);
  const result = await this.client.submitAndWait(signed.tx_blob);
  
  return result;
}
```

---

## 🏦 AMM (DeFi Layer) - Semana 2

### AMM Quote

**POST** `/api/amm-quote`

**Arquivo:** `api/amm-quote.js:20-23`

**Método:** `ripple_path_find`

**Request:**
```json
{
  "source": "rHHe2ha4z23RZJdPQTg11E1QuxEDjGgJz8",
  "destination": "r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K",
  "amount": {
    "currency": "RLUSD",
    "value": "100.00",
    "issuer": "rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X"
  }
}
```

**Response:**
```json
{
  "success": true,
  "alternatives": [
    {
      "pathsCount": 3,
      "sourceAmount": "100.00",
      "paths": [[...]]
    }
  ]
}
```

### AMM Deposit

**POST** `/api/amm-deposit`

**Arquivo:** `api/amm-deposit.js:7-10`

**Auth:** JWT obrigatório

**Request:**
```json
{
  "poolId": "AMM_POOL_ID",
  "amount": {
    "currency": "RLUSD",
    "value": "100.00"
  }
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "...",
  "lpTokens": "95.00"
}
```

### AMM Withdraw

**POST** `/api/amm-withdraw`

**Arquivo:** `api/amm-withdraw.js:7-10`

**Auth:** JWT obrigatório

---

## 📊 Compliance & Auditoria

### Export CSV

**GET** `/api/v1/compliance/report`

**Arquivo:** `api/v1/compliance/report.js:24-29`

**Query Params:**
- `startDate` (opcional)
- `endDate` (opcional)
- `type` (opcional): escrow, payment, trustline

**Response:** CSV file

```csv
txHash,type,status,amount,currency,timestamp,explorerUrl
38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5,EscrowFinish,tesSUCCESS,5.00,RLUSD,2024-11-29T14:00:04Z,https://testnet.xrpl.org/transactions/...
```

### Logger Unificado

**Arquivo:** `api/_logger.js:37-43`

**Princípios:**
- ✅ Timestamps ISO 8601
- ✅ Níveis: INFO, WARN, ERROR
- ✅ Contexto estruturado
- ✅ Redação automática de secrets
- ✅ Sem PII

```javascript
logger.info('Escrow finished', {
  txHash: result.hash,
  sequence: result.sequence,
  // NUNCA: XRPL_SEED, endereços privados, PII
});
```

---

## 🔄 Reconciliação ERP

**POST** `/api/v1/connect/erp/reconcile`

**Arquivo:** `api/v1/connect/erp/reconcile.js:8-31`

**Auth:** JWT obrigatório

**Request:**
```json
{
  "erpSystem": "SAP",
  "transactions": [
    {
      "txHash": "38D3ED5B...",
      "amount": "5.00",
      "currency": "RLUSD"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "reconciled": 1,
  "errors": []
}
```

### Job Semanal (n8n)

**Arquivo:** `n8n/workflows/hubai-erp-reconcile.json:1-29`

**Schedule:** Toda segunda-feira 00:00 UTC

---

## 💰 Yield Activation (mXRP)

**POST** `/api/v1/merchant/yield/activate`

**Arquivo:** `api/v1/merchant/yield/activate.js:8-13`

**Request:**
```json
{
  "amount": {
    "currency": "RLUSD",
    "value": "1000.00"
  },
  "expectedAPY": "6.2"
}
```

**Response:**
```json
{
  "success": true,
  "yieldActivated": true,
  "expectedAPY": "6.2",
  "estimatedReturns": {
    "daily": "0.17",
    "monthly": "5.17",
    "yearly": "62.00"
  }
}
```

**Tecnologia:** XRPL EVM Sidechain / mXRP (5-8% APY)

---

## 🔄 Resiliência

### Retry/Backoff

**Arquivo:** `api/_retry.js:17-23`

```javascript
async function retryWithBackoff(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.statusCode === 429) {
        // Rate limit: exponential backoff
        await sleep(Math.pow(2, i) * 1000);
      } else {
        throw error;
      }
    }
  }
}
```

### Tratamento de Erros

**Arquivo:** `server.js:99-112`

```javascript
// Resiliência a 429 e erros externos
app.use((err, req, res, next) => {
  if (err.statusCode === 429) {
    logger.warn('Rate limit exceeded', { ip: req.ip });
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  logger.error('Server error', { error: err.message });
  res.status(500).json({ error: 'Internal server error' });
});
```

---

## 📊 Evidências Testnet (Semana 2)

### Endereços

| Tipo | Endereço |
|------|----------|
| **RLUSD Issuer** | `rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X` |
| **Merchant** | `rHHe2ha4z23RZJdPQTg11E1QuxEDjGgJz8` |
| **Treasury Vault** | `r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K` |

### Transações Validadas

| Tipo | TX Hash | Status |
|------|---------|--------|
| Trustline (Merchant) | `527F0C56...` | ✅ SUCCESS |
| Trustline (Treasury) | `4BB99CE6...` | ✅ SUCCESS |
| Emissão RLUSD | `CECB0CA7...` | ✅ SUCCESS |
| **EscrowCreate** | `7876B63E...` | ✅ SUCCESS |
| **EscrowFinish** ⭐ | `38D3ED5B...` | ✅ SUCCESS |
| Payment RLUSD | `025375A5...` | ✅ SUCCESS |

**Taxa de Sucesso:** 100% (6/6)  
**Confirmação:** ~3.5s

---

## 🗺️ Roadmap (Semanas 3-4)

### Semana 3 (06/12-12/12)

**Foco:** mXRP Adapter + Observabilidade

- [ ] Adapter mXRP (XRPL EVM Sidechain)
  - Fluxo de yield: ativação, saldos, APY (5-8%)
  - Limites e UI básica de LP
  - Auditoria sem PII

- [ ] Observabilidade
  - Latência Escrow/AMM
  - `pathsCount` e ROI/IL
  - Dashboards e alarmes

- [ ] Endurecimento
  - Política de rotação JWT emergencial
  - Code scanning dedicado
  - Rate limit por token/rota

### Semana 4 (13/12-19/12)

**Foco:** Identidade + ERP + Produção

- [ ] Identidade Xumm OAuth
  - Onboarding seguro
  - Associação de `owner`

- [ ] ERP Estendido
  - Reconciliação com estados
  - Export CSV diário
  - Endpoint de compliance refinado
  - Automação n8n

- [ ] Defesa Ativa
  - Gatilho honeypot aprimorado
  - Resposta (invalidação de sessões)
  - Drill de incidentes

- [ ] Readiness
  - PRs protegidos
  - KMS/HSM
  - Documentação
  - Pilotos controlados

---

## 🔗 Referências

### Arquivos Principais

- `server.js` - Mapeamento de rotas (server.js:72-95)
- `api/trustline-rlusd.js` - Trustline RLUSD
- `api/escrow-create.js` - Criar escrow
- `api/escrow-finish.js` - Finalizar escrow
- `api/amm-quote.js` - AMM Quote
- `api/v1/compliance/report.js` - CSV export
- `api/_logger.js` - Logger unificado
- `api/_auth.js` - JWT management
- `api/_retry.js` - Retry/backoff
- `src/backend/xrpl/xrpl-client.ts` - Cliente XRPL

### Evidências

- [Artifacts Devnet](/docs/ARTIFACTS_DEVNET_REAL.json)
- [Artifacts Testnet](/docs/ARTIFACTS_TESTNET_REAL.json)
- [Transactions CSV](/docs/testnet-audit/transactions.csv)
- [QA Final Report](/docs/QA_FINAL_REPORT.md)

---

**Última Atualização:** 29/11/2024  
**Autor:** Diego Guedes (DG) - PAYHUB Team  
**Repositório:** https://github.com/DGuedz/payhub-v3
