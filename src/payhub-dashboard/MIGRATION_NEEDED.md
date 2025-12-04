# 🚨 MIGRAÇÃO DE COMPONENTES NECESSÁRIA

## Problema Identificado

O App.tsx está em `/payhub-dashboard/src/App.tsx` e importa componentes de `./components/`, mas a maioria dos componentes ainda está em `/components/` (raiz do projeto).

## Status Atual

### ✅ Componentes Já Copiados
- DashboardNav.tsx
- PaymentsPage.tsx (novo)
- ProfilePage.tsx (novo)
- Header.tsx
- Hero.tsx
- ComplianceBanner.tsx
- CookieBar.tsx
- CookieModal.tsx

### ❌ Componentes Que Precisam Ser Copiados

Copie os seguintes arquivos de `/components/` para `/payhub-dashboard/src/components/`:

```bash
cp /components/SecurityCard.tsx /payhub-dashboard/src/components/
cp /components/EscrowWizard.tsx /payhub-dashboard/src/components/
cp /components/YieldCard.tsx /payhub-dashboard/src/components/
cp /components/AMMCard.tsx /payhub-dashboard/src/components/
cp /components/AuditTable.tsx /payhub-dashboard/src/components/
cp /components/Footer.tsx /payhub-dashboard/src/components/
cp /components/DashboardHome.tsx /payhub-dashboard/src/components/
cp /components/PaymentPix.tsx /payhub-dashboard/src/components/
cp /components/Toast.tsx /payhub-dashboard/src/components/
```

### ❌ SDK Necessário

Alguns componentes (EscrowWizard, YieldCard, AMMCard, AuditTable) importam o SDK de `'../sdk/payhub'`.

Copie a pasta SDK:

```bash
cp -r /sdk /payhub-dashboard/src/
```

## Solução Rápida

Execute este script no terminal na raiz do projeto:

```bash
#!/bin/bash

# Criar diretório de componentes se não existir
mkdir -p /payhub-dashboard/src/components
mkdir -p /payhub-dashboard/src/sdk

# Copiar componentes faltantes
for component in SecurityCard EscrowWizard YieldCard AMMCard AuditTable Footer DashboardHome PaymentPix Toast; do
  if [ -f "/components/${component}.tsx" ]; then
    cp "/components/${component}.tsx" "/payhub-dashboard/src/components/"
    echo "✅ Copiado: ${component}.tsx"
  else
    echo "❌ Não encontrado: ${component}.tsx"
  fi
done

# Copiar SDK se existir
if [ -d "/sdk" ]; then
  cp -r /sdk/* /payhub-dashboard/src/sdk/
  echo "✅ SDK copiado"
else
  echo "⚠️  SDK não encontrado em /sdk"
fi

echo ""
echo "✅ Migração concluída!"
echo "Execute: cd payhub-dashboard && npm run dev"
```

## Verificação

Depois de copiar, verifique se todos os arquivos existem:

```bash
ls -la /payhub-dashboard/src/components/
```

Deve listar:
- AMMCard.tsx
- AuditTable.tsx
- ComplianceBanner.tsx
- CookieBar.tsx
- CookieModal.tsx
- DashboardHome.tsx
- DashboardNav.tsx
- EscrowWizard.tsx
- Footer.tsx
- Header.tsx
- Hero.tsx
- PaymentPix.tsx
- PaymentsPage.tsx
- ProfilePage.tsx
- SecurityCard.tsx
- Toast.tsx
- YieldCard.tsx

## Navegação Funcionando

Depois da migração, a navegação vai funcionar corretamente:

- **Home** → DashboardHome
- **Pagar** → PaymentsPage
- **Escrow** → EscrowWizard
- **Yield** → YieldCard + AMMCard
- **Auditoria** → AuditTable
- **Perfil** → ProfilePage

---

**Criado em**: 2025-11-27  
**Status**: Aguardando execução manual
