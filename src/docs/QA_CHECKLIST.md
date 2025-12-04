# ✅ Checklist QA - PAYHUB Testnet

**Data:** 29/11/2024  
**Versão:** 1.0  
**Auditor:** _______________  
**Status:** ⏳ Aguardando Execução  

---

## 🎯 Objetivo

Validar completamente a migração para XRPL Testnet e aprovar o Soft-POS para demo pública.

---

## 📋 Checklist de Validação

### 1. Infraestrutura Backend

- [ ] **ENV `XRPL_NETWORK=testnet` configurada**
  - Verificar: `echo $XRPL_NETWORK` deve retornar `testnet`
  - Arquivo: `api/_xrpl-config.js`
  
- [ ] **Endpoints XRPL Testnet configurados**
  - WebSocket: `wss://s.altnet.rippletest.net:51233`
  - JSON-RPC: `https://s.altnet.rippletest.net:51234/`
  
- [ ] **Conexão JSON-RPC validada**
  ```bash
  curl -s https://s.altnet.rippletest.net:51234/ \
    -H 'Content-Type: application/json' \
    -d '{"method":"server_info"}' | jq '.result.info.server_state'
  ```
  Resultado esperado: `"full"`
  
- [ ] **Conexão WebSocket validada**
  ```bash
  node scripts/qa-audit.js | jq '.ws.server_state'
  ```
  Resultado esperado: `"full"`
  
- [ ] **Servidor rodando com Testnet**
  ```bash
  curl -s http://localhost:3000/api/figma/config | jq '.network'
  ```
  Resultado esperado: `"testnet"`

---

### 2. Variáveis Sensíveis (ENV/KMS)

- [ ] **`XRPL_SEED` configurado**
  - ⚠️ NUNCA commitar, nunca em logs
  - Formato: `s...` (29 caracteres)
  - Verificar: `[ ! -z "$XRPL_SEED" ] && echo OK`
  
- [ ] **`RLUSD_ISSUER_ADDRESS` configurado**
  - Formato: `r...` (endereço XRPL válido)
  - Verificar: `[ ! -z "$RLUSD_ISSUER_ADDRESS" ] && echo OK`
  
- [ ] **`TREASURY_VAULT_ADDRESS` configurado**
  - Formato: `r...` (endereço XRPL válido)
  - Verificar: `[ ! -z "$TREASURY_VAULT_ADDRESS" ] && echo OK`
  
- [ ] **Saldo XRP na tesouraria**
  - Solicitar do faucet: https://faucet.altnet.rippletest.net/
  - Validar no explorer: https://testnet.xrpl.org/accounts/[TREASURY_VAULT_ADDRESS]
  - Saldo mínimo: 100 XRP (para fees)

---

### 3. Frontend Vercel

- [ ] **ENV `NEXT_PUBLIC_XRPL_NETWORK=testnet` configurada**
  - Verificar no Vercel Dashboard → Settings → Environment Variables
  - Rebuildar deploy após configurar
  
- [ ] **Badge "Testnet Live" visível**
  - Acessar: https://[seu-app].vercel.app/
  - Verificar banner verde com "XRPL Testnet ao Vivo"
  
- [ ] **Componente LiveTestnetBanner funcionando**
  - Ledger index atualizando a cada ~3.5s
  - Latência exibida (2-6s)
  - Link para explorer clicável

---

### 4. Interface Soft-POS

- [ ] **Layout maquininha implementado**
  - Keypad numérico (0-9, backspace, confirmar)
  - Sem formulários complexos
  - Mobile-first design
  
- [ ] **Terminologia correta**
  - Recibo visual usa: **NSU / AUT**
  - Detalhes técnicos usa: **Hash** (clicável)
  - Links abrem: `testnet.xrpl.org`
  
- [ ] **Componentes de auditoria integrados**
  - TestnetStatus com última TX
  - VerifiedTxBadge em escrows concluídos
  - LatencyIndicator mostrando performance
  - AuditModal com histórico completo

---

### 5. Teste de Fogo (E2E)

#### Preparação

- [ ] **ENVs carregadas**
  ```bash
  export $(cat .env.testnet | xargs)
  ```

- [ ] **JWT gerado**
  ```bash
  JWT_TOKEN=$(JWT_SECRET=dev node scripts/generate-jwt.js)
  echo $JWT_TOKEN
  ```

#### Execução (Método Manual)

- [ ] **1. Criar Trustline RLUSD**
  ```bash
  curl -X POST http://localhost:3000/api/trustline-rlusd \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json"
  ```
  
  **Validação:**
  - [ ] HTTP 200 OK
  - [ ] `"success": true`
  - [ ] `"txHash": "..."` (64 caracteres)
  - [ ] Link explorer: https://testnet.xrpl.org/transactions/[TX_HASH]
  - [ ] Status no explorer: **SUCCESS**
  - [ ] Tipo: **TrustSet**
  
- [ ] **2. Criar Escrow (R$ 5,00)**
  ```bash
  curl -X POST http://localhost:3000/api/escrow-create \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "amount": {
        "currency": "RLUSD",
        "value": "5.00",
        "issuer": "'$RLUSD_ISSUER_ADDRESS'"
      },
      "destination": "'$TREASURY_VAULT_ADDRESS'",
      "finishAfter": '$(date -u +%s -d '-1 minute')'
    }'
  ```
  
  **Validação:**
  - [ ] HTTP 200 OK
  - [ ] `"success": true`
  - [ ] `"txHash": "..."` (64 caracteres)
  - [ ] `"owner": "r..."`
  - [ ] `"offerSequence": NUMBER`
  - [ ] Link explorer: https://testnet.xrpl.org/transactions/[TX_HASH]
  - [ ] Status no explorer: **SUCCESS**
  - [ ] Tipo: **EscrowCreate**
  - [ ] Amount: **5.00 RLUSD**
  
  **Anotar:**
  - Owner: ________________
  - Sequence: ________________
  
- [ ] **3. Finalizar Escrow**
  ```bash
  curl -X POST http://localhost:3000/api/escrow-finish \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "owner": "[OWNER_DO_PASSO_2]",
      "offerSequence": [SEQUENCE_DO_PASSO_2]
    }'
  ```
  
  **Validação:**
  - [ ] HTTP 200 OK
  - [ ] `"success": true`
  - [ ] `"txHash": "..."` (64 caracteres)
  - [ ] Link explorer: https://testnet.xrpl.org/transactions/[TX_HASH]
  - [ ] Status no explorer: **SUCCESS** ⭐
  - [ ] Tipo: **EscrowFinish** ⭐
  - [ ] Amount: **5.00 RLUSD** ⭐
  - [ ] Ledger: **Validado** ⭐
  
  **🎯 TX Hash Principal (para relatório):**
  ```
  ________________________________________
  ```

#### Execução (Método Automatizado)

- [ ] **Rodar script E2E**
  ```bash
  bash scripts/run-e2e-testnet.sh
  ```
  
  **Validação:**
  - [ ] Script completo sem erros
  - [ ] 3 TX Hashes gerados
  - [ ] Todos os status: **SUCCESS**
  - [ ] Snippet do relatório gerado
  - [ ] Log salvo em `testnet-e2e-[DATA].log`

---

### 6. Auditoria On-Chain

- [ ] **Abrir TX Hash no Explorer**
  - URL: https://testnet.xrpl.org/transactions/[TX_HASH_DO_FINISH]
  
- [ ] **Validar campos:**
  - [ ] **Status:** `tesSUCCESS` (verde)
  - [ ] **Type:** `EscrowFinish`
  - [ ] **Amount:** `5.00 RLUSD`
  - [ ] **Ledger Index:** Número válido
  - [ ] **Validated:** `true`
  - [ ] **Fee:** ~0.00001 XRP
  
- [ ] **Capturar screenshot**
  - [ ] Print da página do explorer
  - [ ] Status SUCCESS visível
  - [ ] TX Hash legível
  - [ ] Salvar como: `testnet-proof-[DATA].png`

---

### 7. Componentes Visuais

- [ ] **LiveTestnetBanner**
  - [ ] Ledger index atualizando
  - [ ] Latência exibida
  - [ ] Link para explorer funciona
  
- [ ] **TestnetStatus**
  - [ ] Última TX exibida corretamente
  - [ ] Countdown funcionando (45s → 1m → 1h)
  - [ ] Badge "Verificada" verde
  - [ ] Link para explorer funciona
  
- [ ] **VerifiedTxBadge**
  - [ ] Versão inline funciona
  - [ ] Versão block funciona
  - [ ] Abre explorer ao clicar
  - [ ] Countdown preciso
  
- [ ] **LatencyIndicator**
  - [ ] Atualização em tempo real
  - [ ] Barra de progresso visual
  - [ ] Status correto (Excelente/Bom/Aceitável)
  - [ ] Métricas 24h exibidas
  
- [ ] **AuditModal**
  - [ ] Abre corretamente
  - [ ] Lista de TXs completa
  - [ ] Filtros funcionando
  - [ ] CSV export funciona
  - [ ] Links para explorer funcionam
  
- [ ] **TestnetQuickActions**
  - [ ] Botão "Ver Auditoria" funciona
  - [ ] Botão "XRPL Explorer" funciona
  - [ ] Stats corretas

---

### 8. Segurança e Compliance

- [ ] **Nenhuma ENV em código**
  ```bash
  # Não deve retornar matches
  grep -r "XRPL_SEED.*=.*s" api/ components/
  ```
  
- [ ] **Nenhuma ENV em logs**
  ```bash
  # Verificar últimos 100 logs
  tail -n 100 [LOG_FILE] | grep -i "seed\|secret"
  ```
  Resultado esperado: Nada ou apenas redações `[REDACTED]`
  
- [ ] **Nenhuma ENV no frontend**
  ```bash
  # Bundle não deve conter secrets
  grep -r "XRPL_SEED" .next/ 2>/dev/null
  ```
  Resultado esperado: Nenhum match
  
- [ ] **Links externos seguros**
  ```bash
  # Todos devem ter rel="noopener noreferrer"
  grep -r "target=\"_blank\"" components/ | grep -v "noopener"
  ```
  Resultado esperado: Nenhum match
  
- [ ] **Logger redatando secrets**
  - Arquivo: `api/_logger.js:41-43`
  - Verificar função `redactSecrets()`
  
- [ ] **CSV export sem PII**
  - Exportar CSV do AuditModal
  - Verificar: apenas TX Hash, valores, timestamps
  - Sem: endereços de usuários, emails, PII

---

### 9. Performance

- [ ] **Latência RPC < 500ms**
  ```bash
  time curl -s https://s.altnet.rippletest.net:51234/ \
    -H 'Content-Type: application/json' \
    -d '{"method":"server_info"}' > /dev/null
  ```
  
- [ ] **Confirmação TX < 5s**
  - Observar tempo entre POST e SUCCESS no explorer
  
- [ ] **Bundle size frontend < 500KB**
  ```bash
  du -sh .next/static/chunks/*.js | sort -h
  ```

---

### 10. Documentação

- [ ] **README atualizado**
  - [ ] Instruções de setup Testnet
  - [ ] Links para docs
  
- [ ] **TESTNET_COMPONENTS.md completo**
  - [ ] Props documentadas
  - [ ] Exemplos de uso
  - [ ] Screenshots
  
- [ ] **QA_TESTNET_AUDIT_REPORT.md preenchido**
  - [ ] TX Hashes reais
  - [ ] Links do explorer
  - [ ] Screenshots anexados
  
- [ ] **Changelog atualizado**
  - [ ] Versão da release
  - [ ] Features implementadas
  - [ ] Breaking changes

---

## 📊 Relatório Final

### Resumo de Transações

| Etapa | TX Hash | Status | Link |
|-------|---------|--------|------|
| Trustline | ____________ | ☐ SUCCESS | [Link]() |
| Escrow Create | ____________ | ☐ SUCCESS | [Link]() |
| **Escrow Finish** | ____________ | ☐ SUCCESS | [Link]() |

### Prova On-Chain Principal

**TX Hash do Escrow Finish:**
```
________________________________________
```

**Link do Explorer:**
```
https://testnet.xrpl.org/transactions/____________________
```

### Screenshots

- [ ] Screenshot do explorer (Escrow Finish)
- [ ] Screenshot do LiveTestnetBanner
- [ ] Screenshot do AuditModal
- [ ] Screenshot do CSV exportado

### Aprovação

- [ ] **Infraestrutura:** ✅ Aprovada
- [ ] **Interface:** ✅ Aprovada
- [ ] **Teste E2E:** ✅ Aprovada
- [ ] **Segurança:** ✅ Aprovada
- [ ] **Performance:** ✅ Aprovada
- [ ] **Documentação:** ✅ Aprovada

---

## ✅ STATUS FINAL

```
☐ APROVADO PARA DEMO
☐ APROVADO PARA PRODUÇÃO (após auditoria adicional)
☐ BLOQUEADO (especificar motivo abaixo)
```

**Motivo do bloqueio (se aplicável):**
```
_________________________________________________
_________________________________________________
```

---

## 📝 Observações Adicionais

```
_________________________________________________
_________________________________________________
_________________________________________________
```

---

## 👤 Assinaturas

**Auditor QA:**  
Nome: _______________  
Data: _______________  
Assinatura: _______________  

**Tech Lead:**  
Nome: _______________  
Data: _______________  
Assinatura: _______________  

**Product Owner:**  
Nome: _______________  
Data: _______________  
Assinatura: _______________  

---

**Versão do Checklist:** 1.0  
**Última Atualização:** 29/11/2024  
**Próxima Revisão:** Após cada deploy Testnet  
