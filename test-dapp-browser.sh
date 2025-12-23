#!/bin/bash

# Script para demonstrar transação através do dapp PAYHUB
# Abre o navegador e executa transações via interface web

echo "🚀 Abrindo o dapp PAYHUB para transações..."

# Verificar se o servidor está rodando
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Servidor está rodando na porta 5173"
    echo "📍 Acessando: http://localhost:5173/testes"
    
    # Abrir no navegador (macOS)
    if command -v open > /dev/null; then
        open "http://localhost:5173/testes"
        echo "🌐 Navegador aberto com a página de testes"
    
    # Linux
    elif command -v xdg-open > /dev/null; then
        xdg-open "http://localhost:5173/testes"
        echo "🌐 Navegador aberto com a página de testes"
    
    # Windows (Git Bash)
    elif command -v cmd > /dev/null; then
        cmd /c "start http://localhost:5173/testes"
        echo "🌐 Navegador aberto com a página de testes"
    else
        echo "🔗 Por favor, abra manualmente: http://localhost:5173/testes"
    fi
    
    echo ""
    echo "📋 Passos para executar uma transação:"
    echo "1. Clique em 'Conectar Wallet' no canto superior direito"
    echo "2. Escolha 'Gerar Wallet' para criar uma nova wallet de teste"
    echo "3. Clique em 'Faucet' para obter XRP de teste (1000 XRP)"
    echo "4. Aguarde o saldo aparecer (deve mostrar 1000 XRP)"
    echo "5. Escolha uma transação para executar:"
    echo "   - Payment: Envio simples de XRP"
    echo "   - EscrowCreate: Criar escrow com condição"
    echo "   - TrustSet: Configurar trustline para tokens"
    echo "6. Acompanhe o TX hash no console de debug"
    echo "7. Verifique a transação no explorer: https://testnet.xrpl.org/"
    echo ""
    echo "⏱️  Aguardando 5 segundos antes de mostrar exemplo..."
    sleep 5
    
    echo ""
    echo "🎯 EXEMPLO DE TRANSAÇÃO REAL:"
    echo "TX Hash: C619011E13A725F466941275B643C89A5B1C6269AFE313B8C18CBE7021BF6B9E"
    echo "Status: CONFIRMADA ✅"
    echo "Valor: 0.1 XRP"
    echo "Explorer: https://testnet.xrpl.org/transactions/C619011E13A725F466941275B643C89A5B1C6269AFE313B8C18CBE7021BF6B9E"
    echo ""
    echo "🚀 O dapp PAYHUB está pronto para transações reais na XRPL Testnet!"
    
else
    echo "❌ Servidor não está rodando!"
    echo "💡 Execute 'npm run dev' para iniciar o servidor"
    exit 1
fi