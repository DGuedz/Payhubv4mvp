#!/bin/bash

# ===================================
# PAYHUB - Pre-Deploy Validation
# ===================================
# Valida que tudo está pronto para deploy no Vercel
# Uso: bash scripts/pre-deploy-check.sh

set -e

echo "🚀 PAYHUB - Validação Pré-Deploy"
echo "=================================="
echo ""

# Cores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
PASSED=0
FAILED=0
WARNINGS=0

# Função de check
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $1"
        ((FAILED++))
    fi
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# ===================================
# 1. Arquivos de Configuração
# ===================================
echo "📋 1. Validando arquivos de configuração..."
echo ""

# vercel.json
if [ -f "vercel.json" ]; then
    check "vercel.json existe"
else
    check "vercel.json NÃO existe"
fi

# .env.example
if [ -f ".env.example" ]; then
    check ".env.example existe"
else
    check ".env.example NÃO existe"
fi

# .gitignore
if [ -f ".gitignore" ]; then
    check ".gitignore existe"
else
    check ".gitignore NÃO existe"
fi

# package.json
if [ -f "package.json" ]; then
    check "package.json existe"
else
    check "package.json NÃO existe"
fi

echo ""

# ===================================
# 2. Node.js e npm
# ===================================
echo "🔧 2. Validando ambiente Node.js..."
echo ""

# Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 18 ]; then
    check "Node.js >= 18 (atual: $(node -v))"
else
    check "Node.js < 18 (atual: $(node -v)) - UPGRADE NECESSÁRIO"
fi

# npm version
NPM_VERSION=$(npm -v | cut -d'.' -f1)
if [ "$NPM_VERSION" -ge 9 ]; then
    check "npm >= 9 (atual: $(npm -v))"
else
    check "npm < 9 (atual: $(npm -v)) - UPGRADE NECESSÁRIO"
fi

echo ""

# ===================================
# 3. Dependências
# ===================================
echo "📦 3. Validando dependências..."
echo ""

if [ -d "node_modules" ]; then
    check "node_modules/ existe"
else
    warn "node_modules/ não existe - Execute: npm install"
fi

# Verificar se package-lock.json existe
if [ -f "package-lock.json" ]; then
    check "package-lock.json existe"
else
    warn "package-lock.json não existe"
fi

echo ""

# ===================================
# 4. Build Local
# ===================================
echo "🏗️  4. Testando build local..."
echo ""

# Limpar dist anterior
if [ -d "dist" ]; then
    rm -rf dist
    echo "  Limpando dist/ anterior..."
fi

# Executar build
echo "  Executando npm run build..."
if npm run build > /dev/null 2>&1; then
    check "Build concluído sem erros"
    
    # Verificar se dist foi criado
    if [ -d "dist" ]; then
        check "dist/ gerado com sucesso"
        
        # Verificar index.html
        if [ -f "dist/index.html" ]; then
            check "dist/index.html existe"
        else
            check "dist/index.html NÃO existe"
        fi
        
        # Contar arquivos em dist
        FILE_COUNT=$(find dist -type f | wc -l)
        if [ "$FILE_COUNT" -gt 10 ]; then
            check "dist/ contém $FILE_COUNT arquivos (OK)"
        else
            warn "dist/ contém apenas $FILE_COUNT arquivos (verificar)"
        fi
    else
        check "dist/ NÃO foi gerado"
    fi
else
    check "Build FALHOU - Verificar erros acima"
fi

echo ""

# ===================================
# 5. TypeScript
# ===================================
echo "📘 5. Validando TypeScript..."
echo ""

echo "  Executando npm run typecheck..."
if npm run typecheck > /dev/null 2>&1; then
    check "TypeScript sem erros"
else
    warn "TypeScript com erros - Revisar código"
fi

echo ""

# ===================================
# 6. Linting
# ===================================
echo "🧹 6. Validando código (ESLint)..."
echo ""

echo "  Executando npm run lint..."
if npm run lint > /dev/null 2>&1; then
    check "ESLint sem erros"
else
    warn "ESLint com warnings/erros - Executar: npm run lint:fix"
fi

echo ""

# ===================================
# 7. Variáveis de Ambiente
# ===================================
echo "🔐 7. Validando variáveis de ambiente..."
echo ""

# Verificar .env.local
if [ -f ".env.local" ]; then
    check ".env.local existe (desenvolvimento)"
else
    warn ".env.local não existe - Copie .env.example"
fi

# Verificar que .env não está commitado
if [ -f ".env" ]; then
    warn ".env existe - REMOVER antes de commit!"
else
    check ".env não existe (correto)"
fi

# Verificar .gitignore
if grep -q ".env" .gitignore; then
    check ".env listado em .gitignore"
else
    warn ".env NÃO listado em .gitignore - ADICIONAR!"
fi

echo ""

# ===================================
# 8. Secrets no Código
# ===================================
echo "🔍 8. Verificando secrets no código..."
echo ""

# Buscar XRPL_SEED no código
if grep -r "XRPL_SEED.*=.*s" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . > /dev/null 2>&1; then
    warn "POSSÍVEL SECRET no código - REVISAR MANUALMENTE"
else
    check "Nenhum XRPL_SEED hardcoded encontrado"
fi

# Buscar JWT_SECRET no código
if grep -r "JWT_SECRET.*=.*[a-zA-Z0-9]" --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" . > /dev/null 2>&1; then
    warn "POSSÍVEL JWT_SECRET no código - REVISAR MANUALMENTE"
else
    check "Nenhum JWT_SECRET hardcoded encontrado"
fi

echo ""

# ===================================
# 9. Protótipo HTML
# ===================================
echo "🎨 9. Validando protótipo HTML..."
echo ""

if [ -f "public/merchant-portal.html" ]; then
    check "public/merchant-portal.html existe"
    
    # Verificar se contém TX Hashes reais
    if grep -q "38D3ED5B" public/merchant-portal.html; then
        check "TX Hash EscrowFinish presente"
    else
        warn "TX Hash EscrowFinish não encontrado"
    fi
    
    # Verificar se contém badge Testnet
    if grep -q "XRPL Testnet" public/merchant-portal.html; then
        check "Badge Testnet presente"
    else
        warn "Badge Testnet não encontrado"
    fi
else
    warn "public/merchant-portal.html não existe"
fi

echo ""

# ===================================
# 10. Documentação
# ===================================
echo "📚 10. Validando documentação..."
echo ""

DOCS=(
    "docs/QA_FINAL_REPORT.md"
    "docs/FIGMA_DESIGN_SPEC.md"
    "docs/BACKEND_ARCHITECTURE.md"
    "DEPLOY_VERCEL.md"
)

for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        check "$doc existe"
    else
        warn "$doc não existe"
    fi
done

echo ""

# ===================================
# RESUMO FINAL
# ===================================
echo "=================================="
echo "📊 RESUMO"
echo "=================================="
echo ""
echo -e "${GREEN}✓ Passou:${NC} $PASSED checks"
echo -e "${YELLOW}⚠ Avisos:${NC} $WARNINGS warnings"
echo -e "${RED}✗ Falhou:${NC} $FAILED checks"
echo ""

# Decisão final
if [ $FAILED -eq 0 ]; then
    if [ $WARNINGS -eq 0 ]; then
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${GREEN}✅ APROVADO PARA DEPLOY!${NC}"
        echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo "Próximos passos:"
        echo "1. Commit e push para GitHub"
        echo "2. Importar projeto no Vercel"
        echo "3. Adicionar variáveis de ambiente no Vercel"
        echo "4. Deploy!"
        echo ""
        echo "Ou via CLI:"
        echo "  vercel"
        echo "  vercel --prod"
        exit 0
    else
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo -e "${YELLOW}⚠️  APROVADO COM AVISOS${NC}"
        echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
        echo ""
        echo "Revisar warnings acima antes do deploy."
        echo "Deploy pode prosseguir, mas verifique:"
        echo "- Variáveis de ambiente (.env.local)"
        echo "- Secrets no código (manualmente)"
        echo "- Documentação faltante"
        exit 0
    fi
else
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${RED}❌ NÃO APROVADO PARA DEPLOY${NC}"
    echo -e "${RED}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Corrigir erros acima antes do deploy:"
    echo "- Verificar build local"
    echo "- Corrigir erros TypeScript"
    echo "- Adicionar arquivos faltantes"
    exit 1
fi
