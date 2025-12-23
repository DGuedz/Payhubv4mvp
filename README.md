# 🏦 PAYHUB v4 - Tesouraria Ativa na XRPL

[![Vercel Production](https://img.shields.io/badge/vercel-production-success?logo=vercel&style=flat-square)](https://payhubv4mvp.vercel.app)
[![XRPL Testnet](https://img.shields.io/badge/xrpl-testnet-blue?logo=xrp&style=flat-square)](https://xrpl.org)
[![Security Mode](https://img.shields.io/badge/security-active-green?logo=shield&style=flat-square)](https://payhubv4mvp.vercel.app/api/pulse)
[![License](https://img.shields.io/badge/license-MIT-gray?style=flat-square)](LICENSE)

> **O Centro de Pagamentos Simplificado.** Transforme seu celular no terminal mais rentável do mundo. Zero Aluguel. Zero Atraso. Liquidação D+0.

---

## 🚀 Status do Projeto: Production Ready

O PAYHUB v4 é uma DApp (Decentralized Application) híbrida que combina a velocidade de um Frontend moderno com a segurança de um Backend Serverless blindado.

- **URL de Produção:** [https://payhubv4mvp.vercel.app](https://payhubv4mvp.vercel.app)
- **Status da API:** [https://payhubv4mvp.vercel.app/api/pulse](https://payhubv4mvp.vercel.app/api/pulse)
- **Relatório de Build:** [Ver Relatório Completo (Semana 4)](docs/BUILD_TRACKING_REPORT.md)

---

## 🏗️ Arquitetura Técnica

O sistema utiliza uma arquitetura **Vite + Serverless Functions**, hospedada na Vercel.

### 1. Frontend (Client-Side)
- **Framework:** React 18 + Vite
- **UI Kit:** TailwindCSS + Lucide Icons + Shadcn/UI
- **Conectividade:** XRPL.js (Client) + Xumm SDK (Auth)
- **Features:** Dashboard Financeiro, Escrow Wizard, Yield Monitor.

### 2. Backend (Serverless Functions)
- **Runtime:** Node.js 18 (TypeScript)
- **Segurança:** Isolamento de chaves (`XRPL_SEED` nunca sai do servidor).
- **Rotas Críticas:**
  - `GET /api/pulse`: Health Check & Security Status.
  - `GET /api/security/alerts`: Monitoramento de Honeypot/WAF.
  - `GET /api/auth/xumm/*`: Fluxo OAuth seguro.

---

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+
- Conta na Vercel (para deploy)
- Conta na Xumm Developer Console (para Auth)

### 1. Clonar e Instalar
```bash
git clone https://github.com/DGuedz/Payhubv4mvp.git
cd Payhubv4mvp
npm install
```

### 2. Variáveis de Ambiente
Crie um arquivo `.env.local` para desenvolvimento ou configure no Dashboard da Vercel para produção:

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL do Backend (Gateway) | `https://payhubv4mvp.vercel.app` |
| `XRPL_SEED` | Seed da Carteira Tesouraria (Testnet) | `sEd...` (Segredo!) |
| `XUMM_API_KEY` | API Key do Xumm Console | `00000000-0000-0000-0000-000000000000` |
| `XUMM_API_SECRET` | API Secret do Xumm Console | `00000000-0000-0000-0000-000000000000` |

### 3. Rodar Localmente
```bash
# Inicia o Frontend (Vite) na porta 5173
npm run dev

# Para testar as Serverless Functions localmente, use o Vercel CLI:
# vercel dev
```

### 4. Deploy
O projeto está configurado para deploy automático na Vercel via Git.
```bash
# Deploy manual via script
./deploy-live-pulse.sh
```

---

## 🛡️ Segurança & Compliance

- **Honeypot:** O sistema possui endpoints isca para detectar scanners maliciosos.
- **Auditoria:** Todas as operações críticas geram logs de auditoria (sem PII) exportáveis para CSV (padrão CARF/OCDE).
- **Identidade:** Suporte nativo a Xumm (Self-Sovereign Identity) e carteiras manuais.

---

## 📚 Documentação Adicional

- [Roadmap Semanas 3-4 (Entregue)](docs/ROADMAP_WEEKS_3_4.md)
- [Relatório de Tracking de Build](docs/BUILD_TRACKING_REPORT.md)
- [Especificação de Design (Figma)](docs/FIGMA_DESIGN_SPEC.md)

---

**© 2025 PAYHUB.** Todos os direitos reservados.
_Institutional Grade DeFi on XRPL._