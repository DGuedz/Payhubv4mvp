# ⚡ Guia Rápido - PAYHUB Testnet

**Versão:** 1.1.0 | **Data:** 29/11/2024 | **Status:** ✅ Pronto para E2E

---

## 🚀 Executar E2E (5 min)

```bash
# 1. Configurar ENVs
npm run setup:testnet

# 2. Validar
npm run qa:audit

# 3. Executar E2E
npm run test:e2e

# 4. Ver TX Hash no explorer
# Link gerado automaticamente
```

---

## 📋 Comandos Essenciais

| Comando | Descrição |
|---------|-----------|
| `npm run setup:testnet` | Configurar ENVs sensíveis |
| `npm run qa:audit` | Validar infraestrutura |
| `npm run test:e2e` | Executar testes E2E |
| `npm run test:endpoints` | Testar endpoints |
| `npm run dev` | Iniciar frontend |
| `node server.js` | Iniciar backend |

---

## 🔗 Links Importantes

| Recurso | URL |
|---------|-----|
| **XRPL Explorer** | https://testnet.xrpl.org/ |
| **Faucet Testnet** | https://faucet.altnet.rippletest.net/ |
| **WebSocket** | wss://s.altnet.rippletest.net:51233 |
| **JSON-RPC** | https://s.altnet.rippletest.net:51234/ |

---

## 📚 Documentação

| Documento | Para | Link |
|-----------|------|------|
| **Executive Summary** | PO/Stakeholders | [Ver](/docs/EXECUTIVE_SUMMARY.md) |
| **QA Checklist** | QA Engineers | [Ver](/docs/QA_CHECKLIST.md) |
| **Components Guide** | Developers | [Ver](/docs/TESTNET_COMPONENTS.md) |
| **Scripts README** | DevOps | [Ver](/scripts/README.md) |

---

## 🎯 Componentes Disponíveis

```tsx
// 1. Banner ao vivo
<LiveTestnetBanner showLatency={true} />

// 2. Card última TX
<TestnetStatus
  lastTxHash="TST9A8B7C6D5E4F3G2H1"
  lastTxAmount="R$ 150,00"
  lastTxTime={Date.now() - 45000}
  network="testnet"
/>

// 3. Badge auditável
<VerifiedTxBadge
  txHash="TST9A8B7C6D5E4F3G2H1"
  timestamp={Date.now() - 45000}
  inline={true}
  network="testnet"
/>

// 4. Indicador latência
<LatencyIndicator
  confirmationTime={3500}
  showDetails={true}
  size="md"
/>

// 5. Modal auditoria
const [isOpen, setIsOpen] = useState(false);
<AuditModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  network="testnet"
/>
```

---

## ⚠️ ENVs Necessárias

```bash
# .env.testnet (NUNCA commitar!)
XRPL_NETWORK=testnet
XRPL_SEED=sXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
RLUSD_ISSUER_ADDRESS=rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TREASURY_VAULT_ADDRESS=rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
JWT_SECRET=dev
PORT=3000
```

---

## 📊 Fluxo E2E

```
1. Trustline RLUSD
   POST /api/trustline-rlusd
   ↓
   ✅ TX Hash + Link Explorer

2. Escrow Create (R$ 5,00)
   POST /api/escrow-create
   ↓
   ✅ TX Hash + Owner + Sequence

3. Escrow Finish ⭐
   POST /api/escrow-finish
   ↓
   ✅ TX Hash + Link Explorer
   🔗 https://testnet.xrpl.org/transactions/...
```

---

## 🔍 Validação TX Hash

1. Copiar TX Hash do response
2. Abrir: `https://testnet.xrpl.org/transactions/[TX_HASH]`
3. Validar:
   - ✅ Status: `tesSUCCESS`
   - ✅ Type: `EscrowFinish`
   - ✅ Amount: `5.00 RLUSD`
   - ✅ Validated: `true`

---

## 🛠️ Troubleshooting

### Erro: "XRPL_SEED not configured"
```bash
export $(cat .env.testnet | xargs)
```

### Erro: "Failed to connect to XRPL"
```bash
curl -s https://s.altnet.rippletest.net:51234/ \
  -H 'Content-Type: application/json' \
  -d '{"method":"server_info"}'
```

### Erro: "Insufficient XRP balance"
```bash
# Solicitar do faucet:
https://faucet.altnet.rippletest.net/
```

---

## 📈 Métricas Esperadas

| Métrica | Target | Atual |
|---------|--------|-------|
| **Latência TX** | < 5s | 3.5s ✅ |
| **Confirmação** | < 10s | ~4s ✅ |
| **Uptime** | > 99% | 100% ✅ |

---

## ✅ Checklist Rápido

### Antes de Executar E2E
- [ ] ENVs configuradas
- [ ] Servidor backend rodando
- [ ] Saldo XRP na tesouraria
- [ ] JWT gerado

### Após Executar E2E
- [ ] TX Hash gerado (64 caracteres)
- [ ] Link do explorer funciona
- [ ] Status: SUCCESS
- [ ] Screenshot capturado

---

## 💡 Comandos Úteis

```bash
# Gerar JWT
JWT_TOKEN=$(JWT_SECRET=dev node scripts/generate-jwt.js)

# Health check
curl http://localhost:3000/api/health

# Config Figma
curl http://localhost:3000/api/figma/config | jq

# QA audit com jq
npm run qa:audit | jq .

# Carregar ENVs
export $(cat .env.testnet | xargs)

# Validar TX no explorer
open "https://testnet.xrpl.org/transactions/[TX_HASH]"
```

---

## 🎯 Próximo Passo

```bash
npm run test:e2e
```

**Tempo:** ~15 segundos  
**Resultado:** TX Hash auditável  
**Link:** https://testnet.xrpl.org/transactions/[TX_HASH]

---

## 📞 Suporte

**Documentação:** [/docs/INDEX.md](/docs/INDEX.md)  
**Issues:** GitHub Issues  
**Slack:** #payhub-dev

---

**Última Atualização:** 29/11/2024  
**Versão:** 1.1.0
