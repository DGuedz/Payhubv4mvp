# 🚀 Deploy PAYHUB no Vercel - Guia Completo

**Data:** 29/11/2024  
**Status:** ✅ Pronto para Deploy  
**Tempo Estimado:** 10-15 minutos  

---

## ✅ PRÉ-REQUISITOS

### O que você precisa ter:

- [x] ✅ Conta no [Vercel](https://vercel.com)
- [x] ✅ Repositório GitHub do PAYHUB
- [x] ✅ Node.js 18+ instalado localmente
- [x] ✅ Variáveis de ambiente configuradas

---

## 📋 CHECKLIST PRÉ-DEPLOY

### 1. Arquivos de Configuração

- [x] ✅ `vercel.json` - Configuração Vercel
- [x] ✅ `.env.example` - Template de variáveis
- [x] ✅ `.gitignore` - Proteção de secrets
- [x] ✅ `package.json` - Scripts de build

### 2. Build Local (Teste)

```bash
# Instalar dependências
npm install

# Build de produção
npm run build

# Preview local
npm run preview
```

**Esperado:** Build sem erros, preview funcionando em `http://localhost:4173`

### 3. Variáveis de Ambiente

**Arquivo:** `.env.example` → Copie para `.env.local` e preencha

```bash
cp .env.example .env.local
```

**Variáveis CRÍTICAS (Nunca commitar!):**

```bash
# XRPL Seed (Backend Only - Use KMS/Vault em Produção)
XRPL_SEED=sEdV...

# RLUSD Issuer
RLUSD_ISSUER_ADDRESS=rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X

# Treasury Vault
TREASURY_VAULT_ADDRESS=r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K

# JWT Secret (Gerar com: openssl rand -base64 32)
JWT_SECRET=sua_secret_aqui
```

---

## 🚀 DEPLOY PASSO-A-PASSO

### Método 1: Via Dashboard Vercel (Recomendado)

#### Passo 1: Importar Projeto

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Import Git Repository"**
3. Selecione o repositório **`payhub-v3`**
4. Clique em **"Import"**

#### Passo 2: Configurar Build

Vercel detecta automaticamente Vite. Confirme:

- **Framework Preset:** Vite
- **Root Directory:** `./` (raiz)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

#### Passo 3: Adicionar Variáveis de Ambiente

**IMPORTANTE:** Adicione TODAS as variáveis do `.env.example`

1. Vá em **Settings > Environment Variables**
2. Adicione uma por uma:

```
XRPL_NETWORK=testnet
VITE_APP_NAME=PAYHUB
VITE_APP_VERSION=1.0.0
VITE_XRPL_NETWORK=testnet
VITE_API_URL=https://seu-dominio.vercel.app/api
```

**⚠️ CRITICAL SECRETS (Adicione, mas NUNCA commite!):**

```
XRPL_SEED=[seu_seed_aqui]
RLUSD_ISSUER_ADDRESS=rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X
TREASURY_VAULT_ADDRESS=r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K
JWT_SECRET=[gerado_com_openssl]
```

**Scopes:**
- Production ✓
- Preview ✓
- Development ✓

#### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde build (2-3 minutos)
3. ✅ Deploy concluído!

#### Passo 5: Validar

1. Acesse a URL fornecida (ex: `payhub-v3.vercel.app`)
2. Verifique:
   - [x] Badge "XRPL Testnet Live" visível
   - [x] TX Hashes clicáveis funcionando
   - [x] Security banner exibido
   - [x] Métricas carregando

---

### Método 2: Via Vercel CLI

#### Passo 1: Instalar CLI

```bash
npm install -g vercel
```

#### Passo 2: Login

```bash
vercel login
```

#### Passo 3: Deploy

```bash
# Na raiz do projeto
vercel

# Seguir prompts:
# - Set up and deploy? Yes
# - Which scope? [sua conta]
# - Link to existing project? No
# - What's your project's name? payhub-v3
# - In which directory is your code located? ./
```

#### Passo 4: Adicionar Secrets via CLI

```bash
# JWT Secret
vercel env add JWT_SECRET production
# Cole o valor gerado

# XRPL Seed
vercel env add XRPL_SEED production
# Cole o seed (NUNCA commite!)

# Repita para todas as variáveis críticas
```

#### Passo 5: Re-deploy

```bash
vercel --prod
```

---

## 🔐 SEGURANÇA EM PRODUÇÃO

### ⚠️ NUNCA FAZER:

❌ **Commitar** `.env`, `.env.local`, ou qualquer arquivo com secrets  
❌ **Logar** `XRPL_SEED` ou `JWT_SECRET`  
❌ **Expor** variáveis no frontend (use `VITE_` apenas para públicas)  
❌ **Usar** Testnet seed em Mainnet  

### ✅ SEMPRE FAZER:

✅ **Usar** KMS/Vault para `XRPL_SEED` em produção  
✅ **Rotacionar** `JWT_SECRET` periodicamente  
✅ **Validar** `.gitignore` antes de commit  
✅ **Habilitar** Honeypot em produção  
✅ **Monitorar** logs sem PII  

---

## 🌐 DOMÍNIO CUSTOMIZADO (Opcional)

### Passo 1: Adicionar Domínio

1. Vercel Dashboard > **Settings > Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `payhub.com`)
4. Siga instruções DNS

### Passo 2: Configurar DNS

**No seu provedor DNS (Cloudflare, GoDaddy, etc.):**

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### Passo 3: Aguardar Propagação

- **Tempo:** 5-60 minutos
- **Verificar:** `dig payhub.com` ou https://dnschecker.org/

### Passo 4: SSL Automático

Vercel provisiona SSL (Let's Encrypt) automaticamente. Nada a fazer!

---

## 📊 PÓS-DEPLOY

### 1. Validação Funcional

**Checklist:**

- [ ] Site acessível na URL
- [ ] Badge "XRPL Testnet Live" verde e pulsante
- [ ] 6 TX Hashes clicáveis abrindo explorer
- [ ] Security banner com KMS/JWT/Honeypot
- [ ] Métricas de performance exibidas
- [ ] Roadmap placeholders visíveis (disabled)
- [ ] Responsive (Mobile/Tablet/Desktop)

### 2. Performance Audit

**Google Lighthouse:**

```bash
# Instalar
npm install -g lighthouse

# Rodar
lighthouse https://payhub-v3.vercel.app --view
```

**Targets:**

- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 90

### 3. Vercel Analytics

1. Dashboard > **Analytics**
2. Ver métricas:
   - Page Views
   - Unique Visitors
   - Top Pages
   - Real Experience Score (Core Web Vitals)

### 4. Monitoring

**Ativar alertas:**

1. Dashboard > **Settings > Notifications**
2. Habilitar:
   - [x] Build Failed
   - [x] Deployment Failed
   - [x] Performance Degraded
   - [x] Budget Exceeded

---

## 🔄 CI/CD AUTOMÁTICO

### Deploy Automático no Push

Vercel conecta automaticamente ao GitHub:

```bash
# Push para main
git push origin main

# Vercel detecta e faz deploy automático!
```

### Deploy Preview em PRs

Cada Pull Request gera um preview:

1. Criar PR no GitHub
2. Vercel comenta com URL de preview
3. Validar mudanças antes de merge

---

## 🐛 TROUBLESHOOTING

### Build Falhando

**Erro:** `Module not found`

**Solução:**
```bash
# Limpar node_modules
rm -rf node_modules package-lock.json
npm install

# Build local
npm run build
```

**Erro:** `TypeScript errors`

**Solução:**
```bash
# Validar localmente
npm run typecheck

# Corrigir erros
npm run lint:fix
```

### Site não carrega

**Erro:** White screen ou 404

**Solução:**

1. Verificar build logs no Vercel Dashboard
2. Confirmar `dist/` foi gerado
3. Verificar `vercel.json` está correto

### Variáveis de ambiente não funcionam

**Erro:** TX Hashes não aparecem

**Solução:**

1. Vercel Dashboard > Settings > Environment Variables
2. Confirmar todas as variáveis estão setadas
3. **Re-deploy** (necessário após adicionar ENVs)

### CORS Errors

**Erro:** API calls bloqueadas

**Solução:**

Adicionar em `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,OPTIONS" }
      ]
    }
  ]
}
```

---

## 📈 MÉTRICAS DE SUCESSO

### Targets Pós-Deploy

| Métrica | Target | Como Medir |
|---------|--------|------------|
| **Lighthouse Score** | > 90 | Chrome DevTools |
| **Time to Interactive** | < 3s | Vercel Analytics |
| **First Contentful Paint** | < 1.5s | Vercel Analytics |
| **Uptime** | > 99.9% | Vercel Status |
| **TX Hashes Funcionando** | 100% | Teste manual (6 links) |

### Dashboard Vercel

**Monitorar diariamente:**

- Page Views
- Unique Visitors
- Top Referrers
- Core Web Vitals
- Error Rate

---

## 🎯 PRÓXIMOS PASSOS

### Após Deploy Testnet

1. **Beta Testing**
   - Convidar 5-10 comerciantes
   - Coletar feedback UX
   - Iterar componentes

2. **Auditoria de Segurança**
   - Pen test externo
   - Code review
   - KMS/HSM para secrets

3. **Preparar Mainnet**
   - Trocar `XRPL_NETWORK=mainnet`
   - Usar carteiras reais
   - Deploy em domínio próprio

4. **Go-to-Market**
   - Landing page
   - SEO otimization
   - Marketing materials

---

## 🔗 LINKS ÚTEIS

### Vercel

- **Dashboard:** https://vercel.com/dashboard
- **Docs:** https://vercel.com/docs
- **Status:** https://vercel-status.com/
- **Community:** https://github.com/vercel/vercel/discussions

### PAYHUB

- **Repositório:** https://github.com/DGuedz/payhub-v3
- **Documentação:** [/docs/INDEX.md](/docs/INDEX.md)
- **QA Report:** [/docs/QA_FINAL_REPORT.md](/docs/QA_FINAL_REPORT.md)

---

## ✅ CHECKLIST FINAL

### Antes do Deploy

- [ ] Build local funciona (`npm run build`)
- [ ] Todas as variáveis em `.env.example` documentadas
- [ ] `.gitignore` protegendo secrets
- [ ] `vercel.json` configurado
- [ ] TX Hashes reais integrados

### Durante o Deploy

- [ ] Repositório importado no Vercel
- [ ] Framework detectado (Vite)
- [ ] Variáveis de ambiente adicionadas
- [ ] Build concluído sem erros
- [ ] Deploy URL acessível

### Após o Deploy

- [ ] Site acessível e responsivo
- [ ] 6 TX Hashes clicáveis funcionando
- [ ] Security badges visíveis
- [ ] Lighthouse score > 90
- [ ] Analytics configurado
- [ ] Alertas habilitados

---

## 🎬 DEMO PÓS-DEPLOY

### Para Stakeholders (2 min)

1. Abrir URL Vercel (ex: `payhub-v3.vercel.app`)
2. Mostrar badge "XRPL Testnet Live" pulsante
3. Clicar em TX Hash do EscrowFinish
4. Mostrar explorer com status SUCCESS
5. "Sistema em produção, auditável publicamente"

### Para Investidores (5 min)

1. Abrir site em produção
2. Mostrar métricas de performance
3. Clicar em múltiplos TX Hashes
4. Mostrar roadmap placeholders
5. Ver Vercel Analytics (tráfego real)
6. "Produto validado, escalável, em produção"

---

## 📞 SUPORTE

**Issues técnicos:**
- GitHub Issues: [repo]/issues
- Vercel Support: support@vercel.com

**Documentação PAYHUB:**
- [Deploy Guide](/DEPLOY_VERCEL.md) (este arquivo)
- [Quick Reference](/docs/QUICK_REFERENCE.md)
- [QA Report](/docs/QA_FINAL_REPORT.md)

---

**Status:** ✅ **PRONTO PARA DEPLOY**  
**Última Atualização:** 29/11/2024  
**Próxima Revisão:** Após deploy Mainnet  

---

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║           🚀 PAYHUB - DEPLOY VERCEL READY                     ║
║                                                               ║
║   • vercel.json: ✓ Configurado                               ║
║   • .env.example: ✓ Template completo                        ║
║   • .gitignore: ✓ Secrets protegidos                         ║
║   • Build: ✓ Testado localmente                              ║
║                                                               ║
║   Tempo Estimado: 10-15 minutos                              ║
║   Complexidade: ⭐⭐ (Fácil)                                  ║
║                                                               ║
║   Comando: vercel --prod                                     ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```
