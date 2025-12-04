# 🔄 Guia de Migração para Monorepo

## Estrutura Atual → Nova Estrutura

Este documento descreve a migração do projeto para estrutura de monorepo.

### Arquivos a Mover

```bash
# De raiz → payhub-dashboard/src/

# Componentes
/components/*.tsx              → /payhub-dashboard/src/components/
/components/figma/*            → /payhub-dashboard/src/components/figma/
/components/ui/*               → /payhub-dashboard/src/components/ui/

# SDK
/sdk/payhub.ts                 → /payhub-dashboard/src/sdk/payhub.ts

# Styles
/styles/globals.css            → /payhub-dashboard/src/styles/globals.css

# Scripts (copiar, não mover)
/scripts/sdk-smoke.ts          → /payhub-dashboard/scripts/sdk-smoke.ts
```

### Comando de Migração Manual

Execute estes comandos na raiz do projeto:

```bash
# Criar estrutura de diretórios
mkdir -p payhub-dashboard/src/components/figma
mkdir -p payhub-dashboard/src/components/ui
mkdir -p payhub-dashboard/src/sdk
mkdir -p payhub-dashboard/src/styles
mkdir -p payhub-dashboard/scripts

# Copiar componentes
cp -r components/*.tsx payhub-dashboard/src/components/
cp -r components/figma/* payhub-dashboard/src/components/figma/ 2>/dev/null || true
cp -r components/ui/* payhub-dashboard/src/components/ui/ 2>/dev/null || true

# Copiar SDK
cp sdk/payhub.ts payhub-dashboard/src/sdk/

# Copiar styles
cp styles/globals.css payhub-dashboard/src/styles/

# Copiar script de smoke test
cp scripts/sdk-smoke.ts payhub-dashboard/scripts/

# Manter arquivos originais temporariamente para referência
```

### Ajustes de Import Necessários

Após mover os arquivos, os imports devem ser ajustados:

**Antes:**
```typescript
import { createSDK } from '../sdk/payhub';
import { Header } from './components/Header';
```

**Depois:**
```typescript
import { createSDK } from '../sdk/payhub';
import { Header } from './components/Header';
// Paths permanecem os mesmos graças ao tsconfig paths
```

### Verificação Pós-Migração

```bash
cd payhub-dashboard

# 1. Instalar dependências
npm install

# 2. Verificar TypeScript
npm run typecheck

# 3. Verificar ESLint
npm run lint

# 4. Testar build
npm run build

# 5. Testar desenvolvimento
npm run dev
```

### Estrutura Final do Monorepo

```
payhub-v3/
├── api/                        # Backend API (existente)
├── payhub-frontend/            # Next.js app (existente)
├── payhub-dashboard/           # Vite + React app (NOVO)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── PaymentPix.tsx
│   │   │   ├── ... (todos os componentes)
│   │   │   ├── figma/
│   │   │   └── ui/
│   │   ├── sdk/
│   │   │   └── payhub.ts
│   │   ├── styles/
│   │   │   └── globals.css
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── scripts/
│   │   └── sdk-smoke.ts
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── index.html
├── scripts/                    # Scripts compartilhados (existente)
├── docs/                       # Documentação (existente)
├── package.json                # Root workspace
└── README.md                   # Atualizar com nova estrutura
```

### Root package.json (Workspace)

Atualizar o `package.json` na raiz para suportar workspaces:

```json
{
  "name": "payhub-v3-monorepo",
  "version": "1.0.0",
  "private": true,
  "workspaces": [
    "payhub-frontend",
    "payhub-dashboard"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=payhub-dashboard",
    "dev:frontend": "npm run dev --workspace=payhub-frontend",
    "dev:dashboard": "npm run dev --workspace=payhub-dashboard",
    "build": "npm run build --workspaces",
    "lint": "npm run lint --workspaces",
    "typecheck": "npm run typecheck --workspaces"
  },
  "devDependencies": {
    "typescript": "^5.3.3"
  }
}
```

### Checklist de Migração

- [ ] Criar estrutura `payhub-dashboard/`
- [ ] Copiar componentes
- [ ] Copiar SDK
- [ ] Copiar styles
- [ ] Instalar dependências no dashboard
- [ ] Verificar TypeScript (sem erros)
- [ ] Verificar ESLint (sem warnings)
- [ ] Testar build
- [ ] Testar dev server
- [ ] Atualizar root package.json para workspace
- [ ] Atualizar README.md principal
- [ ] Atualizar CI/CD workflows
- [ ] Commit e push

### Rollback (Se Necessário)

Se houver problemas, os arquivos originais ainda estão na raiz:

```bash
# Reverter para estrutura anterior
git checkout feature/pix-qr-escrow-auto-finish -- components/ sdk/ styles/
```

### Próximos Passos

Após migração bem-sucedida:

1. **Testar fluxo completo**: PIX → Escrow → CSV
2. **Atualizar CI/CD**: GitHub Actions para incluir `payhub-dashboard`
3. **Documentar diferenças**: Next.js vs Vite app
4. **Decidir sobre merge**: Manter ambos ou consolidar

### Suporte

Em caso de dúvidas ou problemas durante a migração, consulte:
- `/payhub-dashboard/README.md` (documentação específica do dashboard)
- `/PULL_REQUEST.md` (detalhes técnicos)
- GitHub Issues
