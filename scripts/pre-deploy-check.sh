#!/bin/bash 
echo "🔍 PAYHUB PRE-DEPLOY VALIDATION" 
echo "================================" 
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; NC='\033[0m' 
ERRORS=0 
[ -f "package.json" ] && echo -e "${GREEN}✅ package.json${NC}" || { echo -e "${RED}❌ package.json${NC}"; ERRORS=$((ERRORS+1)); } 
[ -f "vite.config.ts" ] && echo -e "${GREEN}✅ vite.config.ts${NC}" || { echo -e "${RED}❌ vite.config.ts${NC}"; ERRORS=$((ERRORS+1)); } 
[ -d "src" ] && echo -e "${GREEN}✅ src/ ($(find src -name "*.tsx" | wc -l | tr -d ' ') components)${NC}" || { echo -e "${RED}❌ src/${NC}"; ERRORS=$((ERRORS+1)); } 
git remote -v | grep -q "github.com" && echo -e "${GREEN}✅ Git remote: $(git remote get-url origin)${NC}" || { echo -e "${RED}❌ Git remote${NC}"; ERRORS=$((ERRORS+1)); } 
[ "$(git branch --show-current)" = "main" ] && echo -e "${GREEN}✅ Branch: main${NC}" || echo -e "${YELLOW}⚠️  Branch: $(git branch --show-current)${NC}" 
git diff-index --quiet HEAD -- && echo -e "${GREEN}✅ Clean working tree${NC}" || echo -e "${YELLOW}⚠️  Uncommitted changes${NC}" 
[ -d "node_modules" ] && echo -e "${GREEN}✅ Dependencies installed${NC}" || { echo -e "${RED}❌ Run npm install${NC}"; ERRORS=$((ERRORS+1)); } 
echo ""; echo "🔨 Testing build..." 
npm run build > /dev/null 2>&1 && echo -e "${GREEN}✅ Build OK ($(du -sh build 2>/dev/null | cut -f1))${NC}" || { echo -e "${RED}❌ Build failed${NC}"; ERRORS=$((ERRORS+1)); } 
echo ""; [ $ERRORS -eq 0 ] && echo -e "${GREEN}🎯 READY FOR VERCEL!${NC}" || echo -e "${RED}❌ ${ERRORS} errors${NC}" 
exit $ERRORS 
