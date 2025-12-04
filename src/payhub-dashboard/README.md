# PAYHUB Dashboard - Vite + React

> Aplicação frontend moderna para o PAYHUB com foco em experiência "ativar e usar", pagamentos PIX e gestão de tesouraria.

## 🚀 Visão Geral

Dashboard interativo construído com Vite + React + TypeScript, oferecendo:

- **Pagamento PIX** com QR Code dinâmico
- **Escrow RLUSD** com wizard de 4 passos
- **Yield automático** (5-8% APY)
- **Roteamento AMM** com pathfind transparente
- **Auditoria** com exportação CSV (CARF/OCDE compliant)
- **SDK modular** com retry/backoff e error handling

## 📦 Stack Tecnológica

- **Frontend**: React 18 + TypeScript 5
- **Build**: Vite 5
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **State**: React Hooks
- **API**: Fetch API com retry automático

## 🏗️ Estrutura do Projeto

```
payhub-dashboard/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── PaymentPix.tsx   # Modal de pagamento PIX
│   │   ├── DashboardHome.tsx
│   │   ├── DashboardNav.tsx
│   │   ├── EscrowWizard.tsx # Wizard 4 passos
│   │   ├── YieldCard.tsx
│   │   ├── AMMCard.tsx
│   │   ├── AuditTable.tsx
│   │   ├── Toast.tsx
│   │   └── ...
│   ├── sdk/
│   │   └── payhub.ts        # SDK modular
│   ├── styles/
│   │   └── globals.css      # Estilos globais
│   ├── App.tsx              # Componente raiz
│   └── main.tsx             # Entry point
├── scripts/
│   └── sdk-smoke.ts         # Smoke test do SDK
├── package.json
├── vite.config.ts
├── tsconfig.json
└── index.html
```

## 🚦 Começando

### Pré-requisitos

- Node.js 18+
- npm 9+

### Instalação

```bash
cd payhub-dashboard
npm install
```

### Configuração

Copie `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite `.env` com suas configurações:

```env
VITE_API_URL=http://localhost:3000
```

### Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:5173

### Build de Produção

```bash
npm run build
npm run preview
```

## 📡 Integração com Backend

O dashboard espera que o backend esteja rodando em `http://localhost:3000` (ou conforme `VITE_API_URL`).

### Endpoints Utilizados

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api/trustline-rlusd` | POST | Cria Trustline RLUSD |
| `/api/escrow-create` | POST | Cria Escrow e captura owner/offerSequence |
| `/api/escrow-finish` | POST | Finaliza Escrow |
| `/api/amm/quote` | POST | Consulta ripple_path_find |
| `/api/v1/merchant/yield/activate` | POST | Ativa yield |
| `/api/v1/compliance/report` | GET | Exporta CSV de auditoria |
| `/api/security/alerts` | GET | Lista alertas de honeypot |

## 🧪 Testes

### Smoke Test do SDK

```bash
# Com backend rodando em localhost:3000
BASE_URL=http://localhost:3000 JWT_SECRET='dev-secret-123' npx tsx scripts/sdk-smoke.ts
```

### TypeScript Check

```bash
npm run typecheck
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Formatting

```bash
npm run format
npm run format:check
```

## 🎨 Componentes Principais

### PaymentPix

Modal de pagamento PIX com 4 steps:
1. Input (QR scanner + teclado numérico)
2. Review (confirmação de dados)
3. Auth (simulação de biometria)
4. Success (recibo compartilhável)

```tsx
import { PaymentPix } from './components/PaymentPix';

<PaymentPix
  onClose={() => setPaymentPixOpen(false)}
  onSuccess={(receipt) => console.log(receipt)}
/>
```

### EscrowWizard

Wizard de 4 passos para criação e finalização de Escrow:

```tsx
import { EscrowWizard } from './components/EscrowWizard';

<EscrowWizard />
```

### Dashboard Components

```tsx
import { DashboardHome } from './components/DashboardHome';
import { DashboardNav } from './components/DashboardNav';

<DashboardNav 
  activeSection={activeSection}
  onNavigate={setActiveSection}
/>

<DashboardHome
  balance="2,450.00"
  yieldStatus="active"
  yieldApy="6.2"
  recentEscrows={recentEscrows}
  securityAlerts={0}
  onPayClick={() => setPaymentPixOpen(true)}
  onEscrowClick={() => setActiveSection('escrow')}
  onYieldClick={() => setActiveSection('yield')}
/>
```

## 📦 SDK Usage

```typescript
import { createSDK } from './sdk/payhub';

// Inicializar SDK
const sdk = createSDK({
  baseUrl: 'http://localhost:3000',
  token: '<JWT>',
});

// Criar Trustline
await sdk.trustline.create('1000');

// Criar Escrow
const escrow = await sdk.escrow.create('250.00');
console.log(escrow.owner, escrow.offerSequence);

// Finalizar Escrow
await sdk.escrow.finish(escrow.owner, escrow.offerSequence);

// Exportar CSV
const csv = await sdk.compliance.exportCSV();

// AMM Pathfind
const quote = await sdk.amm.quote({
  sourceAccount: 'rSource...',
  destinationAccount: 'rDest...',
  deliverCurrency: sdk.currencyHex('RLUSD'),
  deliverIssuer: 'rIssuer...',
  deliverValue: '1000',
});
console.log('Rotas encontradas:', quote.pathsCount);
```

## 🔒 Segurança

- ✅ **XRPL_SEED** nunca exposta no frontend
- ✅ **JWT** obrigatório em todas as chamadas
- ✅ **Rate limiting** com retry automático
- ✅ **Auditoria sem PII** (apenas txHash/sequence)

## 📋 Compliance

- ✅ **CARF/OCDE**: Banner IN RFB nº 2.291/2025
- ✅ **LGPD**: Cookie consent GOV.BR
- ✅ **CSV Export**: Relatórios para fiscalização

## 🎨 Design System

### Paleta "Lucid Dark Financial"

```css
--primary: #2979FF      /* XRPL Blue */
--background: #0F1218   /* Dark background */
--card: #1A1F2B         /* Card background */
--success: #00E676      /* Success green */
--error: #EF4444        /* Error red */
--warning: #F59E0B      /* Warning orange */
```

### Tipografia

- **Títulos**: 28-32px
- **Subtítulos**: 20-24px
- **Corpo**: 16px
- **Microcopy**: 14px

## 🚢 Deploy

### Build

```bash
npm run build
```

Os arquivos estarão em `/dist`.

### Variáveis de Ambiente (Produção)

```env
VITE_API_URL=https://api.payhub.com.br
```

## 🔄 Integração com Monorepo

Este dashboard faz parte do monorepo `payhub-v3`:

```bash
# Da raiz do monorepo
npm run dev:dashboard
npm run build --workspace=payhub-dashboard
```

## 📚 Documentação Adicional

- [Guia de Migração](/MIGRATION_GUIDE.md)
- [Pull Request Template](/PULL_REQUEST.md)
- [README Principal (Monorepo)](/README.md)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch de feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

MIT License - veja [LICENSE](../LICENSE) para detalhes.

## 📞 Suporte

- **GitHub Issues**: [Create Issue](https://github.com/DGuedz/payhub-v3/issues)
- **Email**: dg@payhub.com.br
