# 🗺️ Roadmap PAYHUB - Semanas 3-4

**Período:** 06/12/2024 - 19/12/2024  
**Autor:** Diego Guedes (DG)  
**Status:** ✅ Concluído (Entregue em Produção)

> **Nota de Encerramento (23/12/2025):** Todas as funcionalidades críticas foram entregues e validadas em produção (Vercel). A arquitetura foi adaptada para Serverless Functions para maior escalabilidade e segurança. Consulte `docs/BUILD_TRACKING_REPORT.md` para detalhes técnicos.

---

## 📊 Visão Geral

Após validação completa das Semanas 1-2 (Devnet + Testnet com 100% sucesso), o foco das próximas duas semanas é:

1. **Semana 3:** mXRP Adapter + Observabilidade + Endurecimento
2. **Semana 4:** Identidade + ERP + Defesa Ativa + Readiness Produção

---

## 🎯 SEMANA 3 (06/12-12/12)

### Objetivo Principal
**Integrar yield DeFi (mXRP) e observabilidade enterprise-grade**

---

### 💰 1. Adapter mXRP (XRPL EVM Sidechain)

#### Contexto
- mXRP: token wrapped do XRP na XRPL EVM Sidechain
- APY Target: 5-8% (pools de liquidez)
- Abstração completa para comerciante (não vê complexidade DeFi)

#### Entregas

**1.1 Fluxo de Yield Activation**

**Endpoint:** `POST /api/v1/merchant/yield/activate`

**Arquivo:** `api/v1/merchant/yield/activate.js` (já existe base)

**Melhorias:**
```javascript
// Adicionar:
- Validação de minimum stake (ex: min 100 RLUSD)
- Cálculo de IL (Impermanent Loss) estimado
- Lock period (opcional: 7/15/30 dias)
- APY dinâmico baseado no pool atual
```

**Request:**
```json
{
  "amount": {
    "currency": "RLUSD",
    "value": "1000.00"
  },
  "lockPeriod": 30,
  "expectedAPY": "6.2",
  "acceptIL": true
}
```

**Response:**
```json
{
  "success": true,
  "yieldActivated": true,
  "poolId": "mXRP_RLUSD_POOL_01",
  "lpTokens": "995.00",
  "expectedAPY": "6.2",
  "lockUntil": "2025-01-05T00:00:00Z",
  "estimatedReturns": {
    "daily": "0.17",
    "monthly": "5.17",
    "yearly": "62.00"
  },
  "estimatedIL": "1.2%"
}
```

**1.2 Endpoint de Saldo Yield**

**Endpoint:** `GET /api/v1/merchant/yield/balance`

**Response:**
```json
{
  "success": true,
  "totalStaked": "1000.00",
  "lpTokens": "995.00",
  "currentValue": "1005.17",
  "earnings": "5.17",
  "apy": "6.2",
  "lockUntil": "2025-01-05T00:00:00Z",
  "canWithdraw": false
}
```

**1.3 UI Básica de LP**

**Componente:** `/components/YieldDashboard.tsx`

```tsx
<YieldDashboard
  totalStaked={1000.00}
  earnings={5.17}
  apy={6.2}
  lockUntil="2025-01-05"
  onActivate={handleActivate}
  onWithdraw={handleWithdraw}
/>
```

**Features:**
- Card com total staked
- Earnings em tempo real
- APY atual (atualiza a cada hora)
- Countdown para unlock
- Botões ativar/retirar

**1.4 Auditoria sem PII**

**Logger:**
```javascript
logger.info('Yield activated', {
  poolId: 'mXRP_RLUSD_POOL_01',
  amount: '1000.00',
  apy: '6.2',
  // NUNCA: endereços wallet, PII
});
```

**Métricas:**
- Total staked (agregado)
- APY médio
- Earnings distribuídos
- IL realizado

---

### 📊 2. Observabilidade

#### 2.1 Latência Escrow/AMM

**Métricas a Capturar:**
```javascript
// Escrow
- escrow_create_latency (ms)
- escrow_finish_latency (ms)
- escrow_total_time (ms)

// AMM
- amm_quote_latency (ms)
- amm_deposit_latency (ms)
- amm_withdraw_latency (ms)

// Geral
- api_response_time (ms)
- xrpl_confirmation_time (ms)
```

**Implementação:** Prometheus + Grafana (Adaptado para Vercel Analytics)

**Arquivo:** `api/_metrics.js`

```javascript
const prometheus = require('prom-client');

const escrowLatency = new prometheus.Histogram({
  name: 'payhub_escrow_latency_ms',
  help: 'Latency of escrow operations',
  labelNames: ['operation', 'status']
});

// Usage:
const timer = escrowLatency.startTimer({ operation: 'create' });
// ... execute escrow create
timer({ status: 'success' });
```

#### 2.2 pathsCount e ROI/IL

**Métricas AMM:**
```javascript
- amm_paths_count (number)
- amm_roi (percentage)
- amm_il_realized (percentage)
- amm_pool_liquidity (RLUSD)
```

**Dashboard:**
- Gráfico de ROI vs IL ao longo do tempo
- Paths disponíveis por par
- Liquidez total dos pools

#### 2.3 Dashboards e Alarmes

**Dashboards Grafana:**
1. **Performance**
   - Latência P50/P95/P99
   - Taxa de sucesso por endpoint
   - Volume de transações

2. **DeFi**
   - Total staked
   - APY médio
   - IL realizado
   - Earnings distribuídos

3. **Segurança**
   - Rate limit hits
   - JWT failures
   - Honeypot triggers

**Alarmes:**
- Latência P95 > 5s
- Taxa de erro > 5%
- APY < 4% (pool baixo)
- Rate limit > 1000/min (possível ataque)

---

### 🔒 3. Endurecimento

#### 3.1 Política de Rotação JWT Emergencial

**Cenário:** JWT comprometido detectado

**Resposta:**
```javascript
// api/_auth-emergency.js
async function emergencyJWTRotation() {
  // 1. Invalidar todos tokens ativos
  await tokenCache.clear();
  
  // 2. Gerar novo JWT_SECRET
  const newSecret = crypto.randomBytes(64).toString('hex');
  
  // 3. Atualizar KMS/ENV
  await kms.updateSecret('JWT_SECRET', newSecret);
  
  // 4. Notificar usuários (re-login necessário)
  await notifyUsers('JWT rotation - please login again');
  
  // 5. Log do incidente
  logger.warn('Emergency JWT rotation executed', {
    timestamp: new Date().toISOString(),
    reason: 'compromised_token_detected'
  });
}
```

**Trigger Manual:**
```bash
npm run security:jwt-rotate-emergency
```

#### 3.2 Code Scanning Dedicado

**GitHub Actions:** `.github/workflows/security-scan.yml`

```yaml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Domingo 00:00

jobs:
  codeql:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: github/codeql-action/init@v2
      - uses: github/codeql-action/analyze@v2
  
  npm-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm audit --audit-level=moderate
  
  secrets-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: trufflesecurity/trufflehog@main
```

#### 3.3 Rate Limit por Token/Rota

**Granularidade:**
```javascript
// Diferente para cada rota
const rateLimits = {
  '/api/escrow-create': { max: 10, windowMs: 60000 }, // 10/min
  '/api/escrow-finish': { max: 10, windowMs: 60000 }, // 10/min
  '/api/amm-quote': { max: 100, windowMs: 60000 },    // 100/min
  '/api/health': { max: 1000, windowMs: 60000 }       // 1000/min
};

// Por token JWT (identificar usuário)
const tokenLimiter = rateLimit({
  keyGenerator: (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    return jwt.decode(token)?.sub || req.ip;
  },
  max: 100,
  windowMs: 60000
});
```

---

## 🎯 SEMANA 4 (13/12-19/12)

### Objetivo Principal
**Preparar para produção: identidade, ERP e defesa ativa**

---

### 🔐 1. Identidade Xumm OAuth

#### Contexto
- Xumm: wallet XRPL com OAuth
- Onboarding sem seed management
- Associação automática de `owner`

#### 1.1 Fluxo OAuth

**Endpoint:** `GET /api/auth/xumm/authorize`

```javascript
// Redireciona para Xumm
const authUrl = `https://oauth2.xumm.app/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=wallet`;
res.redirect(authUrl);
```

**Callback:** `GET /api/auth/xumm/callback`

```javascript
// Recebe código e troca por token
const { code } = req.query;
const token = await exchangeCodeForToken(code);

// Pega endereço XRPL do usuário
const userInfo = await getXummUserInfo(token);

// Associa owner ao comerciante
await db.merchants.update({
  id: merchantId,
  owner: userInfo.account,
  xummToken: token
});
```

#### 1.2 Onboarding Seguro

**Fluxo:**
1. Comerciante clica "Conectar com Xumm"
2. Abre Xumm app (QR ou deeplink)
3. Autoriza acesso
4. PAYHUB recebe `owner` address
5. Pronto para criar escrows

**Vantagens:**
- ✅ Sem gerenciar seeds
- ✅ Usuário mantém controle total
- ✅ Audit trail completa

---

### 📊 2. ERP Estendido

#### 2.1 Reconciliação com Estados

**Endpoint:** `POST /api/v1/connect/erp/reconcile` (melhorado)

**Request:**
```json
{
  "erpSystem": "SAP",
  "transactions": [
    {
      "txHash": "38D3ED5B...",
      "amount": "5.00",
      "currency": "RLUSD",
      "erpStatus": "pending"
    }
  ]
}
```

**Estados:**
- `pending`: Aguardando confirmação XRPL
- `confirmed`: TX validada no blockchain
- `reconciled`: Sincronizado com ERP
- `error`: Erro de reconciliação

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "txHash": "38D3ED5B...",
      "status": "reconciled",
      "erpDocumentId": "DOC-2024-001234"
    }
  ],
  "summary": {
    "reconciled": 1,
    "pending": 0,
    "errors": 0
  }
}
```

#### 2.2 Export CSV Diário

**Endpoint:** `GET /api/v1/compliance/daily-report`

**Query:**
- `date`: YYYY-MM-DD (default: hoje)

**Response:** CSV file

```csv
date,txHash,type,status,amount,currency,erpStatus,erpDocumentId
2024-12-13,38D3ED5B...,EscrowFinish,tesSUCCESS,5.00,RLUSD,reconciled,DOC-2024-001234
```

**Automação:** Job diário às 23:59 UTC

#### 2.3 Endpoint Compliance Refinado

**Endpoint:** `GET /api/v1/compliance/report` (melhorado)

**Novos Filtros:**
```
- merchant_id
- erp_status (reconciled, pending, error)
- min_amount / max_amount
- group_by (day, week, month)
```

**Response:** JSON ou CSV

```json
{
  "period": {
    "start": "2024-12-01",
    "end": "2024-12-13"
  },
  "summary": {
    "totalTransactions": 150,
    "totalVolume": "7500.00",
    "reconciledCount": 148,
    "pendingCount": 2,
    "errorCount": 0
  },
  "transactions": [...]
}
```

#### 2.4 Automação n8n

**Workflow:** `n8n/workflows/hubai-erp-reconcile-daily.json`

**Schedule:** Diariamente às 00:00 UTC

**Steps:**
1. GET /api/v1/compliance/daily-report?date=yesterday
2. Parse CSV
3. Para cada TX:
   - Se `erpStatus=pending`:
     - POST /api/v1/connect/erp/reconcile
     - Atualizar status
4. Enviar relatório por email (stakeholders)

---

### 🛡️ 3. Defesa Ativa

#### 3.1 Gatilho Honeypot Aprimorado

**Cenário:** Ataque detectado em wallet isca

**Resposta Automática:**
```javascript
// api/_honeypot.js
async function onHoneypotTrigger(attackDetails) {
  // 1. Invalidar todas sessões do IP atacante
  await invalidateSessionsByIP(attackDetails.ip);
  
  // 2. Bloquear IP no firewall
  await firewall.blockIP(attackDetails.ip, '24h');
  
  // 3. Rotacionar JWT_SECRET (se necessário)
  if (attackDetails.severity === 'high') {
    await emergencyJWTRotation();
  }
  
  // 4. Notificar equipe de segurança
  await slack.send('#security', {
    text: '🚨 Honeypot triggered!',
    details: attackDetails
  });
  
  // 5. Log do incidente
  logger.error('Honeypot triggered', {
    ip: attackDetails.ip,
    severity: attackDetails.severity,
    timestamp: new Date().toISOString()
  });
}
```

#### 3.2 Drill de Incidentes

**Schedule:** Mensal (primeiro sábado do mês)

**Cenários:**
1. **JWT Comprometido**
   - Detectar token suspeito
   - Rotação emergencial
   - Notificar usuários
   - Validar recuperação

2. **Rate Limit Excedido**
   - Simular ataque DDoS
   - Verificar bloqueio automático
   - Validar recuperação de serviço

3. **Honeypot Trigger**
   - Simular acesso a wallet isca
   - Verificar resposta automática
   - Validar bloqueio de IP

**Checklist:**
- [x] Resposta < 5 minutos
- [x] Equipe notificada
- [x] Logs capturados
- [x] Serviço recuperado
- [x] Post-mortem documentado

---

### 🚀 4. Readiness para Produção

#### 4.1 PRs Protegidos

**GitHub Branch Rules:**
```yaml
main:
  required_reviews: 2
  require_code_owner_review: true
  dismiss_stale_reviews: true
  require_status_checks:
    - ci
    - security-scan
    - tests
  require_signed_commits: true
  enforce_admins: true
```

#### 4.2 KMS/HSM

**Migration Plan:**

**Atual:** ENV variables
```bash
XRPL_SEED=sXXXXXXXXXXXXXX (em ENV)
```

**Produção:** AWS KMS
```javascript
const { KMSClient, DecryptCommand } = require('@aws-sdk/client-kms');

async function getXRPLSeed() {
  const kms = new KMSClient({ region: 'us-east-1' });
  const command = new DecryptCommand({
    KeyId: 'arn:aws:kms:...',
    CiphertextBlob: process.env.ENCRYPTED_XRPL_SEED
  });
  const response = await kms.send(command);
  return response.Plaintext.toString('utf-8');
}
```

**HSM (opcional):** Para volumes altos, usar AWS CloudHSM

#### 4.3 Documentação

**Entregas:**
- [x] API Reference (Swagger/OpenAPI)
- [x] Runbook de Incidentes
- [x] Disaster Recovery Plan
- [x] Escalation Matrix

**Exemplo Runbook:**
```markdown
# Incident: Escrow Finish Falhando

## Detecção
- Alarme: escrow_finish_error_rate > 5%
- Grafana: Dashboard "Performance"

## Investigação
1. Verificar logs: `grep "escrow-finish" /var/log/payhub.log`
2. Checar XRPL status: https://xrpl.org/status
3. Validar XRPL_SEED: `npm run health:check-seed`

## Resposta
1. Se XRPL offline: Aguardar (SLA: 99.9% uptime)
2. Se seed inválida: Rotação emergencial
3. Se rate limit: Aumentar limites temporariamente

## Recuperação
1. Reprocessar escrows pendentes
2. Validar TX Hashes no explorer
3. Notificar clientes afetados

## Post-Mortem
- Preencher template em /docs/post-mortems/
```

#### 4.4 Pilotos Controlados

**Fase 1:** 5 comerciantes (1 semana)
- Volume: < R$ 10k/dia
- Suporte: 24/7
- Feedback: Diário

**Fase 2:** 20 comerciantes (2 semanas)
- Volume: < R$ 100k/dia
- Suporte: 8h/dia
- Feedback: Semanal

**Fase 3:** 100 comerciantes (1 mês)
- Volume: < R$ 1M/dia
- Suporte: 8h/dia
- Feedback: Quinzenal

**KPIs:**
- Taxa de sucesso > 99%
- Latência P95 < 5s
- NPS > 70
- Churn < 5%

---

## 📊 Métricas de Sucesso (Semanas 3-4)

### Semana 3

| Métrica | Target |
|---------|--------|
| **mXRP Yield Ativo** | ✅ Endpoint funcionando |
| **APY Médio** | 5-8% |
| **Dashboards Grafana** | ✅ 3 criados (Adaptado p/ Vercel) |
| **Alarmes Configurados** | ✅ 10+ |
| **Code Scans Rodando** | ✅ CI integrado |
| **Rate Limit Granular** | ✅ Por token/rota |

### Semana 4

| Métrica | Target |
|---------|--------|
| **Xumm OAuth** | ✅ Integrado |
| **ERP Reconciliação** | ✅ Estados implementados |
| **CSV Diário** | ✅ Job automatizado |
| **Honeypot Drill** | ✅ 1 executado |
| **KMS Migration** | ✅ Planejado |
| **Pilotos Fase 1** | ✅ 5 comerciantes |

---

## 🔗 Dependências

### Ferramentas Necessárias

| Ferramenta | Propósito | Semana |
|------------|-----------|--------|
| **Prometheus** | Métricas | 3 |
| **Grafana** | Dashboards | 3 |
| **CodeQL** | Security scan | 3 |
| **Xumm SDK** | OAuth | 4 |
| **AWS KMS** | Secret management | 4 |
| **n8n** | Automação ERP | 4 |

### Integrações

- Xumm API (OAuth)
- SAP/TOTVS API (ERP)
- Slack API (Notificações)
- AWS KMS (Secrets)

---

## ✅ Checklist de Entrega

### Semana 3
- [x] mXRP adapter funcionando
- [x] UI yield dashboard
- [x] Prometheus + Grafana setup (Substituído por Vercel Analytics)
- [x] 3 dashboards criados
- [x] 10+ alarmes configurados
- [x] Code scanning CI
- [x] Rate limit granular
- [x] JWT rotation script
- [x] Documentação atualizada

### Semana 4
- [x] Xumm OAuth integrado
- [x] ERP reconciliação com estados
- [x] CSV export diário
- [x] n8n workflow ativo (Simulado no SDK)
- [x] Honeypot drill executado
- [x] KMS migration plan
- [x] API reference completa
- [x] Runbook de incidentes
- [x] 5 pilotos iniciados

---

## 📞 Contato

**Autor:** Diego Guedes (DG)  
**Email:** diego@payhub.com.br  
**Repositório:** https://github.com/DGuedz/payhub-v3  

---

**Última Atualização:** 23/12/2025  
**Versão:** 4.0.0-rc.1  
**Status:** ✅ Concluído
