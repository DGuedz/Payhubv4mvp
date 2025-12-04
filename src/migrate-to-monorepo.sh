#!/bin/bash

#############################################################################
# PAYHUB V3 - Migração para Estrutura de Monorepo
# 
# Este script move os arquivos do projeto Vite para payhub-dashboard/
# mantendo a estrutura do monorepo intacta.
#############################################################################

set -e  # Exit on error

echo "🚀 PAYHUB V3 - Migração para Monorepo"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erro: Execute este script da raiz do repositório payhub-v3${NC}"
    exit 1
fi

echo -e "${YELLOW}📁 Criando estrutura de diretórios...${NC}"

# Create directory structure
mkdir -p payhub-dashboard/src/components/figma
mkdir -p payhub-dashboard/src/components/ui
mkdir -p payhub-dashboard/src/sdk
mkdir -p payhub-dashboard/src/styles
mkdir -p payhub-dashboard/scripts
mkdir -p payhub-dashboard/public

echo -e "${GREEN}✓${NC} Estrutura criada"

echo ""
echo -e "${YELLOW}📦 Copiando componentes...${NC}"

# Copy components
if [ -d "components" ]; then
    # Copy main components
    find components -maxdepth 1 -name "*.tsx" -exec cp {} payhub-dashboard/src/components/ \;
    echo -e "${GREEN}✓${NC} Componentes principais copiados"
    
    # Copy figma components
    if [ -d "components/figma" ]; then
        cp -r components/figma/* payhub-dashboard/src/components/figma/ 2>/dev/null || true
        echo -e "${GREEN}✓${NC} Componentes Figma copiados"
    fi
    
    # Copy UI components
    if [ -d "components/ui" ]; then
        cp -r components/ui/* payhub-dashboard/src/components/ui/ 2>/dev/null || true
        echo -e "${GREEN}✓${NC} Componentes UI copiados"
    fi
else
    echo -e "${YELLOW}⚠${NC}  Pasta 'components' não encontrada na raiz"
fi

echo ""
echo -e "${YELLOW}🔧 Copiando SDK...${NC}"

# Copy SDK
if [ -d "sdk" ]; then
    cp sdk/payhub.ts payhub-dashboard/src/sdk/
    echo -e "${GREEN}✓${NC} SDK copiado"
else
    echo -e "${YELLOW}⚠${NC}  Pasta 'sdk' não encontrada na raiz"
fi

echo ""
echo -e "${YELLOW}🎨 Copiando estilos...${NC}"

# Copy styles
if [ -d "styles" ]; then
    cp styles/globals.css payhub-dashboard/src/styles/
    echo -e "${GREEN}✓${NC} Estilos copiados"
else
    echo -e "${YELLOW}⚠${NC}  Pasta 'styles' não encontrada na raiz"
fi

echo ""
echo -e "${YELLOW}🧪 Copiando scripts de teste...${NC}"

# Copy smoke test script
if [ -f "scripts/sdk-smoke.ts" ]; then
    cp scripts/sdk-smoke.ts payhub-dashboard/scripts/
    echo -e "${GREEN}✓${NC} Script de smoke test copiado"
fi

echo ""
echo -e "${YELLOW}📝 Verificando arquivos necessários...${NC}"

# Check if required files exist
REQUIRED_FILES=(
    "payhub-dashboard/package.json"
    "payhub-dashboard/vite.config.ts"
    "payhub-dashboard/tsconfig.json"
    "payhub-dashboard/index.html"
    "payhub-dashboard/src/main.tsx"
    "payhub-dashboard/src/App.tsx"
)

ALL_FILES_OK=true
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓${NC} $file"
    else
        echo -e "${RED}✗${NC} $file ${RED}(faltando)${NC}"
        ALL_FILES_OK=false
    fi
done

echo ""
echo "======================================"

if [ "$ALL_FILES_OK" = true ]; then
    echo -e "${GREEN}✅ Migração concluída com sucesso!${NC}"
    echo ""
    echo "Próximos passos:"
    echo ""
    echo "1. Instalar dependências:"
    echo "   cd payhub-dashboard && npm install"
    echo ""
    echo "2. Verificar TypeScript:"
    echo "   npm run typecheck"
    echo ""
    echo "3. Testar build:"
    echo "   npm run build"
    echo ""
    echo "4. Iniciar dev server:"
    echo "   npm run dev"
    echo ""
    echo "5. Commit das mudanças:"
    echo "   git add payhub-dashboard/"
    echo "   git commit -m 'refactor: migrate to monorepo structure with payhub-dashboard'"
    echo ""
else
    echo -e "${RED}⚠️  Alguns arquivos necessários estão faltando!${NC}"
    echo "Por favor, verifique o output acima e corrija antes de prosseguir."
    exit 1
fi
