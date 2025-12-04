# Atualização do package.json Root para Workspace

## O que fazer

Substituir o `package.json` na **raiz** do projeto por este conteúdo:

```json
{
  "name": "payhub-v3-monorepo",
  "version": "1.0.0",
  "description": "PAYHUB V3 - Hybrid Payments Infrastructure (Monorepo)",
  "private": true,
  "workspaces": [
    "payhub-frontend",
    "payhub-dashboard"
  ],
  "scripts": {
    "dev": "npm run dev --workspace=payhub-dashboard",
    "dev:frontend": "npm run dev --workspace=payhub-frontend",
    "dev:dashboard": "npm run dev --workspace=payhub-dashboard",
    "build": "npm run build --workspaces --if-present",
    "lint": "npm run lint --workspaces --if-present",
    "typecheck": "npm run typecheck --workspaces --if-present",
    "format": "npm run format --workspaces --if-present",
    "test": "npm run test --workspaces --if-present"
  },
  "keywords": [
    "xrpl",
    "rlusd",
    "escrow",
    "pix",
    "treasury",
    "defi",
    "compliance",
    "monorepo"
  ],
  "author": "PAYHUB Team",
  "license": "MIT",
  "devDependencies": {
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

## Comandos Workspace

Após atualizar, você poderá usar:

```bash
# Rodar dashboard (padrão)
npm run dev

# Rodar frontend Next.js
npm run dev:frontend

# Rodar dashboard explicitamente
npm run dev:dashboard

# Build todos os workspaces
npm run build

# Lint em todos
npm run lint

# TypeCheck em todos
npm run typecheck

# Instalar dependência em workspace específico
npm install lucide-react --workspace=payhub-dashboard

# Executar script em workspace específico
npm run dev --workspace=payhub-dashboard
```

## Verificação

Após atualizar o package.json root:

```bash
# Listar workspaces
npm ls --workspaces

# Verificar estrutura
npm run dev:dashboard
npm run dev:frontend
```

## Estrutura Final

```
payhub-v3/                     # Root (workspace manager)
├── package.json               # ← Atualizar este com config acima
├── payhub-frontend/           # Workspace 1: Next.js
│   └── package.json
├── payhub-dashboard/          # Workspace 2: Vite (NOVO)
│   └── package.json
├── api/                       # Backend (não é workspace npm)
└── scripts/                   # Scripts compartilhados
```

## Benefícios do Workspace

✅ Gerenciamento centralizado de dependências
✅ Scripts aggregados para todos os projetos
✅ Hoisting de node_modules (economiza espaço)
✅ Comandos simples para rodar múltiplos apps
✅ CI/CD mais fácil
