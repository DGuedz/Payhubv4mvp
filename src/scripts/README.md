# 🛠️ Scripts PAYHUB

Scripts utilitários para configuração, testes e auditoria do sistema PAYHUB na XRPL Testnet.

---

## 📋 Scripts Disponíveis

### 1. **setup-testnet-envs.sh**

**Descrição:** Assistente interativo para configurar variáveis sensíveis da Testnet.

**Uso:**
```bash
bash scripts/setup-testnet-envs.sh
```

**O que faz:**
- Solicita interativamente as ENVs sensíveis
- Cria arquivo `.env.testnet` (gitignored)
- Valida se está no `.gitignore`
- Fornece próximos passos

**Variáveis configuradas:**
- `XRPL_NETWORK=testnet`
- `XRPL_SEED` (seed da carteira)
- `RLUSD_ISSUER_ADDRESS` (emissor RLUSD)
- `TREASURY_VAULT_ADDRESS` (tesouraria admin)
- `JWT_SECRET=dev`
- `PORT=3000`

**Segurança:**
- ⚠️ O arquivo `.env.testnet` NUNCA deve ser commitado
- ⚠️ Use apenas para desenvolvimento local
- ⚠️ Em produção, use ENV ou KMS

**Exemplo de saída:**
```bash
✅ Arquivo .env.testnet criado com sucesso!

📋 Próximos passos:

1. Validar valores no arquivo:
   cat .env.testnet

2. Carregar no ambiente atual:
   export $(cat .env.testnet | xargs)

3. Ou iniciar servidor com envs:
   env $(cat .env.testnet | xargs) node server.js
```

---

### 2. **run-e2e-testnet.sh**

**Descrição:** Executa sequência completa E2E na Testnet (Trustline → EscrowCreate → EscrowFinish).

**Pré-requisitos:**
- Arquivo `.env.testnet` configurado
- Servidor rodando (`node server.js`)
- Saldo XRP na tesouraria

**Uso:**
```bash
bash scripts/run-e2e-testnet.sh
```

**Sequência executada:**
1. Health Check (`GET /api/health`)
2. Criar Trustline RLUSD (`POST /api/trustline-rlusd`)
3. Criar Escrow de R$ 5,00 (`POST /api/escrow-create`)
4. Finalizar Escrow (`POST /api/escrow-finish`)

**Validações automáticas:**
- ✅ ENVs configuradas
- ✅ JWT gerado
- ✅ HTTP 200 em todas as requisições
- ✅ TX Hashes capturados
- ✅ Links do explorer gerados

**Saídas geradas:**
- `testnet-e2e-[DATA].log` - Log completo da execução
- `testnet-qa-report-snippet.md` - Snippet para relatório QA
- `/tmp/payhub_step_*.json` - Responses de cada passo

**Exemplo de saída:**
```bash
✅ SEQUÊNCIA E2E CONCLUÍDA COM SUCESSO!

📊 Resumo das Transações:

3. Escrow Finish (PROVA PRINCIPAL):
   Hash: F6E5D4C3B2A1...
   Link: https://testnet.xrpl.org/transactions/F6E5D4C3B2A1...

🎯 Use o hash do Escrow Finish para o relatório QA:
F6E5D4C3B2A1...
```

---

### 3. **qa-audit.js**

**Descrição:** Script de auditoria automatizada para validar infraestrutura Testnet.

**Uso:**
```bash
# Via npm
npm run qa:audit

# Direto
node scripts/qa-audit.js | jq .
```

**Validações:**
- ✅ ENV `XRPL_NETWORK` e `NEXT_PUBLIC_XRPL_NETWORK`
- ✅ Conexão JSON-RPC (`server_info`)
- ✅ Conexão WebSocket (`server_info`)
- ✅ Endpoint Figma Config (`GET /api/figma/config`)
- ✅ Saldo da tesouraria (se configurada)

**Exemplo de saída:**
```json
{
  "env": {
    "NEXT_PUBLIC_XRPL_NETWORK": "testnet",
    "XRPL_NETWORK": "testnet",
    "ok": true
  },
  "rpc": {
    "ok": true,
    "server_state": "full",
    "validated_ledger_seq": 1589661
  },
  "ws": {
    "server_state": "full",
    "validated_ledger_seq": 1589662
  },
  "figma": {
    "config": "http://localhost:3000/api/figma/config",
    "network": "testnet"
  },
  "treasury": {
    "ok": true,
    "balance": "1000.000000",
    "address": "rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
```

**Status:**
- `ok: true` - Tudo funcionando
- `ok: false` - Verificar logs de erro

---

### 4. **generate-jwt.js**

**Descrição:** Gera JWT para autenticação nas APIs protegidas.

**Uso:**
```bash
# Com JWT_SECRET padrão (dev)
JWT_TOKEN=$(JWT_SECRET=dev node scripts/generate-jwt.js)
echo $JWT_TOKEN

# Com JWT_SECRET customizado
JWT_TOKEN=$(JWT_SECRET=my-secret node scripts/generate-jwt.js)
```

**Saída:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Uso em requisições:**
```bash
curl -X POST http://localhost:3000/api/escrow-create \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

### 5. **endpoint-test-runner.js**

**Descrição:** Testa todos os endpoints da API com validações.

**Uso:**
```bash
# Via npm
npm run test:endpoints

# Direto
API_BASE_URL=http://localhost:3000 \
JWT_TOKEN=$(JWT_SECRET=dev node scripts/generate-jwt.js) \
node scripts/endpoint-test-runner.js
```

**Endpoints testados:**
- `GET /api/health`
- `GET /api/figma/config`
- `POST /api/trustline-rlusd`
- `POST /api/escrow-create`
- `POST /api/escrow-finish`

**Validações:**
- ✅ Status HTTP correto
- ✅ Response structure válida
- ✅ Campos obrigatórios presentes
- ✅ Tipos de dados corretos

---

## 🔄 Fluxo Recomendado

### Setup Inicial

```bash
# 1. Configurar ENVs
bash scripts/setup-testnet-envs.sh

# 2. Validar configuração
npm run qa:audit

# 3. Iniciar servidor
export $(cat .env.testnet | xargs)
node server.js
```

### Testes

```bash
# 1. Testar endpoints
npm run test:endpoints

# 2. Executar E2E completo
bash scripts/run-e2e-testnet.sh

# 3. Validar auditoria
npm run qa:audit
```

### Auditoria

```bash
# 1. Gerar relatório
npm run qa:audit > qa-report.json

# 2. Executar E2E e capturar TX Hashes
bash scripts/run-e2e-testnet.sh

# 3. Preencher checklist QA
# Ver: /docs/QA_CHECKLIST.md
```

---

## 🛡️ Segurança

### ⚠️ Variáveis Sensíveis

**NUNCA faça:**
- ❌ Commitar `.env.testnet` ou arquivos com secrets
- ❌ Logar valores de `XRPL_SEED` ou `JWT_SECRET`
- ❌ Expor secrets no frontend
- ❌ Compartilhar secrets em mensagens/emails

**SEMPRE faça:**
- ✅ Use `.gitignore` para arquivos sensíveis
- ✅ Use ENV ou KMS em produção
- ✅ Rotacione secrets periodicamente
- ✅ Valide permissões de arquivos (`chmod 600 .env.testnet`)

### 🔍 Validar Segurança

```bash
# Verificar se secrets não estão no código
grep -r "XRPL_SEED.*=.*s" api/ components/

# Verificar .gitignore
grep ".env.testnet" .gitignore

# Verificar permissões
ls -la .env.testnet
# Resultado esperado: -rw------- (600)
```

---

## 📝 Logs e Outputs

### Logs de Execução

| Script | Log File | Localização |
|--------|----------|-------------|
| `run-e2e-testnet.sh` | `testnet-e2e-[DATA].log` | Raiz do projeto |
| `endpoint-test-runner.js` | Console | STDOUT |
| `qa-audit.js` | Console | STDOUT (pode redirecionar) |

### Outputs Temporários

| Arquivo | Descrição |
|---------|-----------|
| `/tmp/payhub_step_*.json` | Responses de cada passo E2E |
| `testnet-qa-report-snippet.md` | Snippet do relatório QA |
| `qa-report.json` | Output do qa-audit em JSON |

---

## 🔧 Troubleshooting

### Erro: "XRPL_SEED not configured"

**Solução:**
```bash
# Verificar se ENV está carregada
echo $XRPL_SEED

# Se vazio, carregar .env.testnet
export $(cat .env.testnet | xargs)
```

### Erro: "Failed to connect to XRPL"

**Solução:**
```bash
# Testar conexão diretamente
curl -s https://s.altnet.rippletest.net:51234/ \
  -H 'Content-Type: application/json' \
  -d '{"method":"server_info"}'

# Se falhar, Testnet pode estar offline
# Verificar: https://xrpl.org/xrp-testnet-faucet.html
```

### Erro: "JWT verification failed"

**Solução:**
```bash
# Gerar novo JWT
JWT_TOKEN=$(JWT_SECRET=dev node scripts/generate-jwt.js)

# Verificar se JWT_SECRET está correto
echo $JWT_SECRET
# Deve ser "dev" para desenvolvimento
```

### Erro: "Insufficient XRP balance"

**Solução:**
```bash
# Solicitar XRP do faucet
# 1. Acessar: https://faucet.altnet.rippletest.net/
# 2. Inserir TREASURY_VAULT_ADDRESS
# 3. Aguardar 10-30 segundos
# 4. Validar: https://testnet.xrpl.org/accounts/[ADDRESS]
```

---

## 📚 Documentação Relacionada

- [QA Testnet Audit Report](/docs/QA_TESTNET_AUDIT_REPORT.md)
- [QA Checklist](/docs/QA_CHECKLIST.md)
- [Testnet Components](/docs/TESTNET_COMPONENTS.md)
- [Integration Summary](/docs/TESTNET_INTEGRATION_SUMMARY.md)

---

## 🤝 Contribuindo

Para adicionar novos scripts:

1. Criar arquivo em `/scripts/`
2. Adicionar comando em `package.json` → `"scripts"`
3. Documentar neste README
4. Adicionar ao `.gitignore` se necessário
5. Testar com `npm run [comando]`

**Padrão de nomenclatura:**
- Scripts shell: `kebab-case.sh`
- Scripts Node: `kebab-case.js`
- Comandos npm: `npm run [categoria]:[acao]`

Exemplos:
- `setup-testnet-envs.sh` → `npm run setup:testnet`
- `qa-audit.js` → `npm run qa:audit`
- `run-e2e-testnet.sh` → `npm run test:e2e`

---

**Última Atualização:** 29/11/2024  
**Versão:** 1.0  
**Maintainer:** PAYHUB Team  
