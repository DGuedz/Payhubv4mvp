# ✅ Deploy Checklist - PAYHUB Vercel

**Data:** _____________  
**Responsável:** _____________  
**Versão:** 1.0 Testnet  

---

## 📋 PRÉ-DEPLOY

### Configuração Local

- [ ] **Node.js >= 18** instalado (`node -v`)
- [ ] **npm >= 9** instalado (`npm -v`)
- [ ] Dependências instaladas (`npm install`)
- [ ] `.env.local` configurado (copiar de `.env.example`)

### Arquivos Necessários

- [ ] **`vercel.json`** existe e configurado
- [ ] **`.env.example`** atualizado com todas variáveis
- [ ] **`.gitignore`** protegendo `.env*`
- [ ] **`package.json`** com scripts de build

### Validação Técnica

- [ ] Build local OK (`npm run build`)
  - [ ] Sem erros
  - [ ] `dist/` gerado
  - [ ] `dist/index.html` existe
  
- [ ] TypeScript OK (`npm run typecheck`)
  - [ ] Sem erros de tipo
  
- [ ] Linting OK (`npm run lint`)
  - [ ] Sem erros críticos
  - [ ] Warnings aceitáveis

### Segurança

- [ ] Nenhum `.env` commitado
- [ ] Nenhum `XRPL_SEED` hardcoded
- [ ] Nenhum `JWT_SECRET` hardcoded
- [ ] `.gitignore` validado

### Conteúdo

- [ ] 6 TX Hashes reais integrados
- [ ] Badge "XRPL Testnet Live" implementado
- [ ] Security banner implementado
- [ ] Métricas de performance exibidas
- [ ] Roadmap placeholders (disabled)

### Script de Validação

- [ ] **Executar:** `bash scripts/pre-deploy-check.sh`
- [ ] **Resultado:** ✅ APROVADO PARA DEPLOY

---

## 🚀 DEPLOY VERCEL

### Setup Inicial

- [ ] Conta Vercel criada/logada
- [ ] GitHub conectado ao Vercel
- [ ] Projeto commitado e pushed

### Importar Projeto

- [ ] Acessar https://vercel.com/new
- [ ] Clicar "Import Git Repository"
- [ ] Selecionar `payhub-v3`
- [ ] Clicar "Import"

### Configuração Detectada

- [ ] Framework: **Vite** (auto-detectado)
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`
- [ ] Root Directory: `./`

### Primeiro Deploy

- [ ] Clicar **"Deploy"**
- [ ] Aguardar build (2-3 min)
- [ ] Deploy concluído sem erros
- [ ] URL gerada (ex: `payhub-v3.vercel.app`)

---

## 🔐 VARIÁVEIS DE AMBIENTE

### Variáveis Públicas (Seguras)

Adicionar em: **Settings > Environment Variables**

- [ ] `VITE_XRPL_NETWORK` = `testnet`
- [ ] `VITE_APP_NAME` = `PAYHUB`
- [ ] `VITE_APP_VERSION` = `1.0.0`
- [ ] `VITE_API_URL` = `https://seu-dominio.vercel.app/api`

**Scopes:** ✓ Production ✓ Preview ✓ Development

### Variáveis Críticas (⚠️ NUNCA COMMITAR!)

**Opcional para backend funcionando:**

- [ ] `XRPL_SEED` = `sEdV...` (do KMS/Vault)
- [ ] `RLUSD_ISSUER_ADDRESS` = `rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X`
- [ ] `TREASURY_VAULT_ADDRESS` = `r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K`
- [ ] `JWT_SECRET` = `[gerado: openssl rand -base64 32]`

**Scopes:** ✓ Production ✓ Preview ✓ Development

### Re-Deploy Após ENVs

- [ ] Clicar **"Redeploy"** (necessário!)
- [ ] Aguardar novo deploy
- [ ] Validar variáveis carregadas

---

## ✅ VALIDAÇÃO PÓS-DEPLOY

### Acesso Básico

- [ ] Site acessível na URL Vercel
- [ ] HTTPS funcionando (certificado automático)
- [ ] Sem erros 404
- [ ] Loading correto

### Funcionalidades Visuais

- [ ] **Badge Testnet**
  - [ ] Verde e visível no header
  - [ ] Animação pulse funcionando
  
- [ ] **Security Banner**
  - [ ] Visível no topo
  - [ ] Texto correto (KMS/JWT/Honeypot)
  - [ ] Badge "✓ OK" visível

- [ ] **TX Hashes (6 total)**
  - [ ] EscrowFinish: `38D3ED5B...` ✓
  - [ ] EscrowCreate: `7876B63E...` ✓
  - [ ] Payment RLUSD: `025375A5...` ✓
  - [ ] Emissão RLUSD: `CECB0CA7...` ✓
  - [ ] TrustSet Merchant: `527F0C56...` ✓
  - [ ] TrustSet Treasury: `4BB99CE6...` ✓
  - [ ] Todos clicáveis (abrem explorer)

- [ ] **Métricas de Performance**
  - [ ] Latência: 3.5s exibida
  - [ ] Confirmação: ~4s exibida
  - [ ] Taxa Sucesso: 100% exibida
  - [ ] Uptime: 100% exibida

- [ ] **Roadmap Placeholders**
  - [ ] Yield mXRP (disabled)
  - [ ] Xumm OAuth (disabled)
  - [ ] ERP Reconciliation (disabled)
  - [ ] Badges "EM BREVE" / "SEMANA 4"

### Responsividade

- [ ] **Desktop** (> 1024px)
  - [ ] Layout 3 colunas
  - [ ] Todos componentes visíveis
  
- [ ] **Tablet** (768-1024px)
  - [ ] Layout 2 colunas
  - [ ] TX Hash truncado OK
  
- [ ] **Mobile** (< 768px)
  - [ ] Stack vertical
  - [ ] Header colapsado
  - [ ] Botões touch-friendly

### Performance (Lighthouse)

Executar: Chrome DevTools > Lighthouse

- [ ] **Performance:** > 90
- [ ] **Accessibility:** > 95
- [ ] **Best Practices:** > 95
- [ ] **SEO:** > 90

### Core Web Vitals

Vercel Analytics > Real Experience Score

- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay): < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1

---

## 🌐 DOMÍNIO CUSTOMIZADO (Opcional)

### Configuração Vercel

- [ ] Settings > Domains
- [ ] Adicionar domínio (ex: `payhub.com`)
- [ ] Copiar configuração DNS

### Configuração DNS

No provedor DNS (Cloudflare, GoDaddy, etc.):

- [ ] **Type:** CNAME
- [ ] **Name:** @ (ou www)
- [ ] **Value:** `cname.vercel-dns.com`
- [ ] Salvar

### Validação DNS

- [ ] Aguardar propagação (5-60 min)
- [ ] Testar: `dig payhub.com`
- [ ] SSL automático (Let's Encrypt)
- [ ] Domínio acessível

---

## 📊 ANALYTICS & MONITORING

### Vercel Analytics

- [ ] Analytics habilitado (automático)
- [ ] Dashboard > Analytics visível
- [ ] Métricas em tempo real funcionando

### Notificações

Settings > Notifications - Habilitar:

- [ ] ✓ Build Failed
- [ ] ✓ Deployment Failed
- [ ] ✓ Performance Degraded
- [ ] ✓ Budget Exceeded

### Logs

- [ ] Deployments > Logs acessível
- [ ] Nenhum erro crítico
- [ ] Warnings aceitáveis

---

## 🔄 CI/CD AUTOMÁTICO

### GitHub Integration

- [ ] Vercel conectado ao GitHub
- [ ] Auto-deploy em push para `main`
- [ ] Preview em Pull Requests

### Teste CI/CD

- [ ] Fazer commit de teste
- [ ] Push para `main`
- [ ] Vercel detecta automaticamente
- [ ] Deploy automático bem-sucedido

---

## 🎯 DEMO VALIDAÇÃO

### Para Stakeholders (2 min)

- [ ] Abrir URL Vercel
- [ ] Mostrar badge Testnet pulsante
- [ ] Clicar em TX Hash (abre explorer)
- [ ] Mostrar status SUCCESS
- [ ] "Sistema em produção, auditável"

### Para Investidores (5 min)

- [ ] Site em produção
- [ ] 6 TXs com 100% sucesso
- [ ] Métricas de performance
- [ ] Roadmap visível
- [ ] Analytics com tráfego real

---

## 📝 DOCUMENTAÇÃO

### Atualizar Docs

- [ ] README.md com URL Vercel
- [ ] DEPLOY_VERCEL.md revisado
- [ ] QA_FINAL_REPORT.md com link deploy

### Links Compartilháveis

- [ ] **Produção:** `https://payhub-v3.vercel.app`
- [ ] **Docs:** `https://payhub-v3.vercel.app/docs`
- [ ] **Protótipo:** `https://payhub-v3.vercel.app/merchant-portal.html`

---

## 🐛 TROUBLESHOOTING

### Build Falhou

- [ ] Verificar logs em Deployments
- [ ] Executar `npm run build` local
- [ ] Corrigir erros TypeScript
- [ ] Re-deploy

### Site não carrega

- [ ] Verificar `dist/` foi gerado
- [ ] Confirmar `vercel.json` correto
- [ ] Verificar variáveis de ambiente
- [ ] Limpar cache do Vercel

### TX Hashes não aparecem

- [ ] Adicionar `VITE_XRPL_NETWORK=testnet`
- [ ] **Re-deploy obrigatório**
- [ ] Validar em incógnito (cache)

---

## 🎊 APROVAÇÃO FINAL

### Checklist Executivo

- [ ] **Build:** ✅ Sem erros
- [ ] **Deploy:** ✅ URL acessível
- [ ] **TX Hashes:** ✅ 6 clicáveis e funcionando
- [ ] **Performance:** ✅ Lighthouse > 90
- [ ] **Security:** ✅ Badges visíveis
- [ ] **Responsive:** ✅ Mobile/Tablet/Desktop

### Assinaturas

**Developer:**  
Nome: _____________  
Data: _____________  
Assinatura: _____________

**QA Engineer:**  
Nome: _____________  
Data: _____________  
Assinatura: _____________

**Tech Lead:**  
Nome: _____________  
Data: _____________  
Assinatura: _____________

**Product Owner:**  
Nome: _____________  
Data: _____________  
Assinatura: _____________

---

## 📞 SUPORTE

**Issues Técnicos:**
- GitHub: [repo]/issues
- Vercel: support@vercel.com

**Documentação:**
- [Deploy Guide](/DEPLOY_VERCEL.md)
- [Quick Start](/DEPLOY_QUICKSTART.md)
- [QA Report](/docs/QA_FINAL_REPORT.md)

---

**Status:** ⬜ Não Iniciado | 🟨 Em Progresso | ✅ Completo  
**Versão:** 1.0 Testnet  
**Última Atualização:** 29/11/2024

---

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║           ✅ DEPLOY CHECKLIST - PAYHUB VERCEL                 ║
║                                                               ║
║   Pré-Deploy:   __ / 25 checks                               ║
║   Deploy:       __ / 15 checks                               ║
║   Pós-Deploy:   __ / 30 checks                               ║
║   Opcional:     __ / 10 checks                               ║
║                                                               ║
║   Total:        __ / 80 checks                               ║
║                                                               ║
║   Meta: 100% para aprovação final                            ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```
