# ✅ Checklist de Migração para Monorepo

## Pré-Migração

- [x] ✅ Estrutura `payhub-dashboard/` criada
- [x] ✅ package.json do dashboard configurado
- [x] ✅ vite.config.ts com proxy API
- [x] ✅ tsconfig.json com paths aliases
- [x] ✅ ESLint configurado
- [x] ✅ Prettier configurado
- [x] ✅ App.tsx e main.tsx criados
- [x] ✅ index.html template criado
- [x] ✅ README.md do dashboard escrito
- [x] ✅ .gitignore configurado
- [x] ✅ .env.example criado
- [x] ✅ vite-env.d.ts types criado

## Executar Migração

- [ ] 🔄 Tornar script executável: `chmod +x migrate-to-monorepo.sh`
- [ ] 🔄 Executar script: `./migrate-to-monorepo.sh`
- [ ] 🔄 Verificar output do script (sem erros)
- [ ] 🔄 Confirmar que arquivos foram copiados

## Pós-Migração

### Configuração Root

- [ ] 🔄 Backup do package.json root: `cp package.json package.json.backup`
- [ ] 🔄 Atualizar package.json root com workspace config (ver `ROOT_WORKSPACE_UPDATE.md`)
- [ ] 🔄 Verificar workspaces: `npm ls --workspaces`

### Instalação

- [ ] 🔄 `cd payhub-dashboard`
- [ ] 🔄 `npm install`
- [ ] 🔄 Verificar node_modules criado
- [ ] 🔄 `cd ..` (voltar para raiz)

### Verificações Técnicas

- [ ] 🔄 TypeScript: `cd payhub-dashboard && npm run typecheck`
  - Espera-se: 0 erros
- [ ] 🔄 ESLint: `npm run lint`
  - Espera-se: 0 warnings críticos
- [ ] 🔄 Build: `npm run build`
  - Espera-se: dist/ criado sem erros
- [ ] 🔄 Preview: `npm run preview`
  - Espera-se: servidor rodando em http://localhost:4173

### Testes Funcionais

- [ ] 🔄 Backend rodando: `JWT_SECRET='dev-secret-123' node server.js` (em outra aba)
- [ ] 🔄 Frontend: `npm run dev` (no dashboard)
  - Espera-se: http://localhost:5173
- [ ] 🔄 Dashboard carrega sem erros no console
- [ ] 🔄 Navegação funciona (Home, Escrow, Yield, Audit)
- [ ] 🔄 Botão "Pagar" abre modal PIX
- [ ] 🔄 Toast notifications aparecem

### Smoke Test SDK

- [ ] 🔄 Backend rodando na porta 3000
- [ ] 🔄 Executar: `BASE_URL=http://localhost:3000 JWT_SECRET='dev-secret-123' npx tsx payhub-dashboard/scripts/sdk-smoke.ts`
- [ ] 🔄 Verificar resultado: `{"ok":true, ...}`

### Git

- [ ] 🔄 `git status` (ver arquivos modificados/adicionados)
- [ ] 🔄 Revisar diff dos novos arquivos
- [ ] 🔄 `git add .`
- [ ] 🔄 `git commit -F MONOREPO_COMMIT_MESSAGE.txt`
- [ ] 🔄 `git push origin feature/pix-qr-escrow-auto-finish`

### Pull Request

- [ ] 🔄 Abrir PR: https://github.com/DGuedz/payhub-v3/pull/new/feature/pix-qr-escrow-auto-finish
- [ ] 🔄 Copiar descrição de `PULL_REQUEST.md`
- [ ] 🔄 Adicionar labels: `feature`, `refactor`, `monorepo`
- [ ] 🔄 Solicitar review (se aplicável)

## Validação Final

### Estrutura de Arquivos

Confirme que existem:

```
payhub-v3/
├── payhub-dashboard/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx              ← Deve existir
│   │   │   ├── Hero.tsx                ← Deve existir
│   │   │   ├── PaymentPix.tsx          ← Deve existir
│   │   │   ├── DashboardHome.tsx       ← Deve existir
│   │   │   ├── DashboardNav.tsx        ← Deve existir
│   │   │   ├── EscrowWizard.tsx        ← Deve existir
│   │   │   ├── YieldCard.tsx           ← Deve existir
│   │   │   ├── AMMCard.tsx             ← Deve existir
│   │   │   ├── AuditTable.tsx          ← Deve existir
│   │   │   ├── Toast.tsx               ← Deve existir
│   │   │   ├── ... (outros componentes)
│   │   │   ├── figma/                  ← Deve existir (se houver)
│   │   │   └── ui/                     ← Deve existir (se houver)
│   │   ├── sdk/
│   │   │   └── payhub.ts               ← Deve existir
│   │   ├── styles/
│   │   │   └── globals.css             ← Deve existir
│   │   ├── App.tsx                     ← Deve existir
│   │   └── main.tsx                    ← Deve existir
│   ├── scripts/
│   │   └── sdk-smoke.ts                ← Deve existir
│   ├── package.json                    ← Deve existir
│   ├── vite.config.ts                  ← Deve existir
│   ├── tsconfig.json                   ← Deve existir
│   ├── index.html                      ← Deve existir
│   └── README.md                       ← Deve existir
├── MIGRATION_GUIDE.md                  ← Deve existir
├── MONOREPO_SUMMARY.md                 ← Deve existir
├── ROOT_WORKSPACE_UPDATE.md            ← Deve existir
├── MONOREPO_COMMIT_MESSAGE.txt         ← Deve existir
└── migrate-to-monorepo.sh              ← Deve existir
```

### Comando Rápido de Verificação

```bash
# Da raiz do projeto
ls -la payhub-dashboard/src/components/ | wc -l
# Espera-se: > 15 arquivos

ls -la payhub-dashboard/src/sdk/
# Espera-se: payhub.ts presente

ls -la payhub-dashboard/src/styles/
# Espera-se: globals.css presente

cat payhub-dashboard/package.json | grep '"name"'
# Espera-se: "@payhub/dashboard"
```

## Problemas Conhecidos & Soluções

### Problema: Script não encontra componentes
**Solução**: Certifique-se de executar da raiz do projeto onde existe pasta `components/`

### Problema: npm install falha
**Solução**: Delete `payhub-dashboard/node_modules` e `package-lock.json`, tente novamente

### Problema: TypeScript reclama de imports
**Solução**: Verifique tsconfig.json e certifique-se que `baseUrl` e `paths` estão corretos

### Problema: Vite não encontra API
**Solução**: Backend deve estar rodando em http://localhost:3000 (ou ajustar `VITE_API_URL`)

## Rollback (Se Necessário)

Se algo der errado:

```bash
# Deletar dashboard
rm -rf payhub-dashboard/

# Restaurar package.json root (se tiver backup)
mv package.json.backup package.json

# Reverter commits
git reset --hard HEAD~1

# Ou reverter mudanças não commitadas
git checkout .
```

## 📞 Suporte

- **Documentação**: Ver `MIGRATION_GUIDE.md` e `MONOREPO_SUMMARY.md`
- **Issues**: https://github.com/DGuedz/payhub-v3/issues
- **Email**: dg@payhub.com.br

---

**Última Atualização**: 2025-11-27
**Status**: ✅ Pronto para Execução
