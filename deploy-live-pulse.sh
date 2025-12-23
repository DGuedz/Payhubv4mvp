#!/bin/bash

echo "🚀 Iniciando deploy automatizado do PAYHUB v4 - Fase Produção..."
echo "=================================================="

# 1. Adicionar arquivos ao Git
echo "📦 Adicionando arquivos ao Git..."
git add api/pulse.js api/security/alerts.js api/auth/xumm/init.js api/auth/xumm/callback.js \
        src/components/SystemStatus.tsx src/components/Header.tsx src/components/WalletConnect.tsx \
        src/components/SecurityDashboard.tsx src/sdk/payhub.ts

# 2. Criar commit com mensagem estruturada
echo "💾 Criando commit..."
git commit -m "feat(prod): deploy final Semana 4 - Segurança & Identidade

- Backend: API Honeypot (/api/security/alerts)
- Backend: API Xumm OAuth (/api/auth/xumm/*)
- Frontend: Security Dashboard com alertas em tempo real
- Frontend: WalletConnect com suporte a Xumm Login
- SDK: Módulos de Auth e Security integrados

Ref: Semana 4 Roadmap
Deploy: Vercel Serverless Functions"

# 3. Push para produção
echo "📤 Enviando para produção..."
git push origin main

echo ""
echo "✨ Deploy concluído com sucesso!"
echo "=================================================="
echo ""
echo "📋 Próximos passos no Vercel (Novas Variáveis):"
echo "1. Acesse https://vercel.com/dashboard"
echo "2. Configure as Environment Variables:"
echo "   - XUMM_API_KEY: Sua chave de API da Xumm (opcional para testes)"
echo "   - XUMM_API_SECRET: Seu segredo da API da Xumm (opcional)"
echo ""
echo "🔍 Para verificar se funcionou:"
echo "- Acesse o Dashboard de Segurança"
echo "- Teste o Login com Xumm (modo Mock ativo se sem chaves)"
echo ""
echo "🎯 Status: PAYHUB PRODUCTION READY!"

# Tornar o script executável
chmod +x "$0"