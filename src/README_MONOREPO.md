# PAYHUB V3 - Monorepo Structure

> 🏗️ **Nova Estrutura**: Monorepo com múltiplos workspaces para frontend e backend

## 📦 Estrutura do Monorepo

```
payhub-v3/
├── api/                        # Backend API (Node.js + Express)
├── payhub-frontend/            # Frontend Next.js (existente)
├── payhub-dashboard/           # Frontend Vite + React (NOVO)
├── scripts/                    # Scripts compartilhados
├── docs/                       # Documentação
├── .github/workflows/          # CI/CD
└── package.json                # Root workspace manager
```

## 🎯 Workspaces

### 1. payhub-dashboard/ (NOVO)

**Stack**: Vite + React + TypeScript + Tailwind CSS

Dashboard interativo com foco em experiência "ativar e usar":

- ✨ Pagamento PIX com QR dinâmico
- ✨ Escrow RLUSD com wizard de 4 passos
- ✨ Yield automático (5-8% APY)
- ✨ Roteamento AMM com pathfind transparente
- ✨ Auditoria CARF/OCDE com exportação CSV
- ✨ SDK modular com retry/backoff

[📚 Documentação completa →](./payhub-dashboard/README.md)

### 2. payhub-frontend/

**Stack**: Next.js + React + TypeScript

Aplicação frontend existente com foco em:

- Portal institucional
- Integração Supabase
- Server-side rendering
- Otimização SEO

### 3. api/

**Stack**: Node.js + Express

Backend API com endpoints:

- Trustline RLUSD
- Escrow Create/Finish
- AMM Quote
- Yield Activation
- Compliance Reports
- Security Alerts

## 🚀 Quick Start

### Instalação Global

```bash
# Instalar dependências de todos os workspaces
npm install
```

### Desenvolvimento

```bash
# Rodar dashboard (Vite) - Padrão
npm run dev

# Rodar frontend Next.js
npm run dev:frontend

# Rodar dashboard explicitamente
npm run dev:dashboard

# Rodar backend API (separado)
cd api && JWT_SECRET='dev-secret-123' node server.js
```

### Build

```bash
# Build todos os workspaces
npm run build

# Build workspace específico
npm run build --workspace=payhub-dashboard
```

### Testes

```bash
# Lint todos
npm run lint

# TypeCheck todos
npm run typecheck

# Smoke test SDK (dashboard)
cd payhub-dashboard
BASE_URL=http://localhost:3000 JWT_SECRET='dev-secret-123' npx tsx scripts/sdk-smoke.ts
```

## 📋 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia dashboard (padrão) |
| `npm run dev:frontend` | Inicia Next.js app |
| `npm run dev:dashboard` | Inicia Vite dashboard |
| `npm run build` | Build todos workspaces |
| `npm run lint` | Lint todos workspaces |
| `npm run typecheck` | TypeCheck todos workspaces |
| `npm run format` | Format código todos workspaces |

## 🏗️ Arquitetura

### Frontend (payhub-dashboard)

```
src/
├── components/          # Componentes React
│   ├── PaymentPix.tsx   # Modal PIX
│   ├── EscrowWizard.tsx # Wizard Escrow
│   ├── DashboardHome.tsx
│   ├── DashboardNav.tsx
│   └── ...
├── sdk/
│   └── payhub.ts        # SDK modular
├── styles/
│   └── globals.css      # Tailwind CSS
├── App.tsx              # Root component
└── main.tsx             # Entry point
```

### Backend (api/)

```
api/
├── payment-pix.js           # PIX QR + Escrow
├── payment-pix-callback.js  # Auto-finish
├── trustline-rlusd.js
├── escrow-create.js
├── escrow-finish.js
├── amm-quote.js
├── v1/
│   ├── compliance/report.js
│   └── merchant/yield/activate.js
└── security/
    └── alerts.js
```

## 🔧 Configuração

### Variáveis de Ambiente

#### Dashboard (.env no payhub-dashboard/)

```env
VITE_API_URL=http://localhost:3000
```

#### Backend (.env na raiz ou via KMS)

```env
XRPL_NETWORK=devnet
XRPL_SEED=sEdV...
RLUSD_ISSUER_ADDRESS=rN7n7...
TREASURY_VAULT_ADDRESS=rVault...
JWT_SECRET=dev-secret-123
RATE_LIMIT_MAX=200
```

## 📊 Features por Workspace

### payhub-dashboard

| Feature | Status | Descrição |
|---------|--------|-----------|
| **PIX QR** | ✅ | QR dinâmico com callback auto-finish |
| **Escrow Wizard** | ✅ | 4 passos: Trustline → Create → Advance → Finish |
| **Yield** | ✅ | Ativação one-click, 5-8% APY |
| **AMM Pathfind** | ✅ | ripple_path_find com transparência |
| **Auditoria** | ✅ | Tabela + CSV export (CARF/OCDE) |
| **SDK** | ✅ | Modular, retry, backoff exponencial |
| **Toast** | ✅ | Notificações globais |
| **Navegação** | ✅ | Omnicanal (mobile tab bar + desktop sidebar) |

### api/

| Endpoint | Método | Status |
|----------|--------|--------|
| `/api/payment/pix` | POST | ✅ |
| `/api/payment/pix/callback` | POST | ✅ |
| `/api/trustline-rlusd` | POST | ✅ |
| `/api/escrow-create` | POST | ✅ |
| `/api/escrow-finish` | POST | ✅ |
| `/api/amm/quote` | POST | ✅ |
| `/api/v1/merchant/yield/activate` | POST | ✅ |
| `/api/v1/compliance/report` | GET | ✅ |
| `/api/security/alerts` | GET | ✅ |

## 🔒 Segurança

- ✅ **XRPL_SEED** isolada no backend (KMS/ENV)
- ✅ **JWT** curto obrigatório em rotas críticas
- ✅ **Rate limiting** global com retry exponencial
- ✅ **Honeypot** ativo para detecção de ataques
- ✅ **Auditoria sem PII** (apenas txHash/sequence)

## 📋 Compliance

- ✅ **CARF/OCDE**: Banner IN RFB nº 2.291/2025
- ✅ **LGPD**: Cookie consent padrão GOV.BR
- ✅ **CSV Export**: Relatórios para fiscalização
- ✅ **Audit Trail**: Registro completo de transações

## 🧪 Testing

### Smoke Test SDK

```bash
cd payhub-dashboard
BASE_URL=http://localhost:3000 JWT_SECRET='dev-secret-123' npx tsx scripts/sdk-smoke.ts
```

### E2E Real (Devnet)

```bash
node scripts/xrpl-e2e-real.js
```

Artefatos gerados:
- `docs/ARTIFACTS_DEVNET_REAL.json`
- `docs/COMPLIANCE_LAST.csv`

## 📚 Documentação

### Guias Principais

- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Guia de migração para monorepo
- [MONOREPO_SUMMARY.md](./MONOREPO_SUMMARY.md) - Sumário executivo
- [CHECKLIST_MONOREPO.md](./CHECKLIST_MONOREPO.md) - Checklist completo
- [payhub-dashboard/README.md](./payhub-dashboard/README.md) - Docs do dashboard
- [PULL_REQUEST.md](./PULL_REQUEST.md) - Detalhes técnicos do PR

### Documentação por Workspace

- **Dashboard**: [payhub-dashboard/README.md](./payhub-dashboard/README.md)
- **Frontend**: [payhub-frontend/README.md](./payhub-frontend/README.md)
- **API**: Ver `/api` e `server.js`

## 🚢 Deploy

### Vercel (Frontend + Dashboard)

```bash
# Deploy frontend Next.js
vercel --prod

# Deploy dashboard Vite
cd payhub-dashboard && vercel --prod
```

### Backend

```bash
# Heroku, Railway, Render, etc
# Configurar variáveis de ambiente seguras (KMS)
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'feat: adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

### Convenção de Commits

```
feat: nova feature
fix: correção de bug
refactor: refatoração
docs: documentação
chore: manutenção
test: testes
```

## 📞 Suporte

- **GitHub Issues**: [Create Issue](https://github.com/DGuedz/payhub-v3/issues)
- **Email**: dg@payhub.com.br
- **Documentation**: Ver `/docs`

## 📄 Licença

MIT License - veja [LICENSE](./LICENSE) para detalhes.

## 🎉 Changelog

### [1.0.0] - 2025-11-27

#### Added
- ✨ Estrutura de monorepo com workspaces
- ✨ payhub-dashboard (Vite + React)
- ✨ Pagamento PIX com QR dinâmico
- ✨ Escrow RLUSD wizard completo
- ✨ SDK modular com retry/backoff
- ✨ Toast notifications
- ✨ Navegação omnicanal
- ✨ Auditoria CARF/OCDE

#### Changed
- 🔄 Reestruturação para monorepo
- 🔄 Workspaces npm para gerenciamento centralizado

---

**PAYHUB V3** - Desenvolvido para XRPL Hackathon  
© 2025 PAYHUB Team. Todos os direitos reservados.
