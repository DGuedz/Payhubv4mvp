#!/bin/bash

echo "🔄 [1/4] Limpando cache e dependências corrompidas..."
rm -rf node_modules package-lock.json .vite

echo "pkg [2/4] Reinstalando dependências (Corrigindo Babel/Vite)..."
npm install && npm install @vitejs/plugin-react@latest @babel/core@latest --save-dev

echo "🌐 [3/4] Configurando ambiente para Smoke Test..."
export BASE_URL="http://localhost:3001"
export JWT_SECRET="dev-secret-key-payhub-v4-2025"

echo "🚀 [4/4] Executando Smoke Test E2E..."
# Start Vite in background (on 5173)
npx vite --force & 
VITE_PID=$!

# Start Mock Gateway (on 3001) for the smoke test
echo "Starting Mock Gateway on 3001..."
node scripts/mock-gateway.js &
GATEWAY_PID=$!

sleep 10 # Wait for both to start

echo "Running smoke test..."
node scripts/e2e-smoke.js
TEST_EXIT_CODE=$?

echo "Cleaning up..."
kill $VITE_PID
kill $GATEWAY_PID

exit $TEST_EXIT_CODE
