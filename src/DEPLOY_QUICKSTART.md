# ⚡ Deploy PAYHUB - Quick Start

**Tempo:** 5 minutos  
**Pré-requisito:** Conta no Vercel  

---

## 🚀 DEPLOY EM 5 PASSOS

### 1️⃣ Validar Localmente

```bash
# Validação automática (EXECUTE PRIMEIRO!)
bash scripts/pre-deploy-check.sh
```

**Esperado:** ✅ APROVADO PARA DEPLOY

---

### 2️⃣ Commit e Push

```bash
# Adicionar mudanças
git add .

# Commit
git commit -m "chore: prepare for Vercel deploy"

# Push para GitHub
git push origin main
```

---

### 3️⃣ Importar no Vercel

1. Acesse: https://vercel.com/new
2. Clique em **"Import Git Repository"**
3. Selecione **`payhub-v3`**
4. Clique em **"Import"**

---

### 4️⃣ Configurar (Auto-Detectado)

Vercel detecta Vite automaticamente:

- ✅ Framework: Vite
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `dist`
- ✅ Install Command: `npm install`

**Não mude nada!** Clique em **"Deploy"**

---

### 5️⃣ Adicionar Variáveis (IMPORTANTE!)

**Após deploy inicial:**

1. Dashboard > **Settings > Environment Variables**
2. Adicione **APENAS estas para começar:**

```bash
VITE_XRPL_NETWORK=testnet
VITE_APP_NAME=PAYHUB
VITE_APP_VERSION=1.0.0
```

3. Clique em **"Save"**
4. **Re-deploy** (Deployments > ... > Redeploy)

---

## ✅ VALIDAR DEPLOY

Acesse a URL fornecida (ex: `payhub-v3.vercel.app`)

**Checklist:**
- [ ] Badge "XRPL Testnet Live" verde
- [ ] 6 TX Hashes clicáveis
- [ ] Security banner visível
- [ ] Site responsivo (mobile/desktop)

---

## 🔐 VARIÁVEIS CRÍTICAS (Opcional)

**Para funcionalidades backend:**

```bash
# NUNCA commitar estes valores!
XRPL_SEED=sEdV...
RLUSD_ISSUER_ADDRESS=rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X
TREASURY_VAULT_ADDRESS=r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K
JWT_SECRET=[gerar com: openssl rand -base64 32]
```

**Adicionar via:**
1. Vercel Dashboard > Settings > Environment Variables
2. Cole valores
3. Marque: Production + Preview + Development
4. Re-deploy

---

## 🎯 PRÓXIMOS PASSOS

### Domínio Customizado

1. Settings > **Domains**
2. Add > Digite `seudomain.com`
3. Configurar DNS (CNAME → `cname.vercel-dns.com`)

### Analytics

1. Dashboard > **Analytics** (auto-habilitado)
2. Ver métricas em tempo real

### Monitoramento

1. Settings > **Notifications**
2. Habilitar alertas de build/deploy

---

## 🐛 PROBLEMAS COMUNS

### Build Falhou

```bash
# Limpar e rebuildar localmente
rm -rf node_modules dist
npm install
npm run build
```

### Site não carrega

1. Verificar build logs no Vercel
2. Confirmar `dist/index.html` existe
3. Re-deploy

### TX Hashes não aparecem

**Causa:** Variáveis de ambiente faltando

**Solução:**
1. Adicionar `VITE_XRPL_NETWORK=testnet`
2. **Re-deploy obrigatório**

---

## 📚 DOCS COMPLETAS

Para guia detalhado: [DEPLOY_VERCEL.md](/DEPLOY_VERCEL.md)

---

**Status:** ✅ Pronto para deploy  
**Suporte:** [GitHub Issues](https://github.com/DGuedz/payhub-v3/issues)

---

```
╔═══════════════════════════════════════════╗
║                                           ║
║   🚀 PAYHUB → VERCEL                      ║
║                                           ║
║   1. bash scripts/pre-deploy-check.sh    ║
║   2. git push origin main                ║
║   3. vercel.com/new → Import             ║
║   4. Deploy                              ║
║   5. Adicionar ENVs                      ║
║                                           ║
║   Tempo: ~5 minutos                      ║
║                                           ║
╚═══════════════════════════════════════════╝
```
