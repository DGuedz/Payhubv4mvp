#!/usr/bin/env node

/**
 * Script para testar transações através da API do dapp
 * Simula requisições que viriam do frontend
 */

const http = require('http');

const DAPP_URL = 'http://localhost:5173';

// Função para fazer requisições HTTP
function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, DAPP_URL);
    
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {}
    };
    
    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.headers['Content-Length'] = Buffer.byteLength(JSON.stringify(data));
    }
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: parsedData
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data: responseData
          });
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testDappAPI() {
  console.log('🚀 Testando API do dapp PAYHUB...');
  
  try {
    // 1. Testar se o servidor está rodando
    console.log('🔗 Testando conexão com o dapp...');
    const healthCheck = await makeRequest('/api/health');
    console.log(`   Health Check: ${healthCheck.status}`);
    
    // 2. Testar página de testes
    console.log('📄 Testando página de testes...');
    const testPage = await makeRequest('/testes');
    console.log(`   Testes Page: ${testPage.status}`);
    
    if (testPage.status === 200) {
      console.log('✅ Página de testes está acessível');
    }
    
    // 3. Testar endpoints da API (se existirem)
    console.log('🔌 Testando endpoints da API...');
    
    // Testar endpoint de wallet
    try {
      const walletEndpoint = await makeRequest('/api/wallet/info');
      console.log(`   Wallet Info: ${walletEndpoint.status}`);
      if (walletEndpoint.data) {
        console.log('   Data:', walletEndpoint.data);
      }
    } catch (error) {
      console.log('   Wallet Info: Endpoint não disponível');
    }
    
    // Testar endpoint de transações
    try {
      const txEndpoint = await makeRequest('/api/transactions');
      console.log(`   Transactions: ${txEndpoint.status}`);
    } catch (error) {
      console.log('   Transactions: Endpoint não disponível');
    }
    
    // 4. Testar se o frontend está carregando os componentes
    console.log('🧩 Verificando componentes do frontend...');
    
    // Verificar se os arquivos estáticos estão acessíveis
    const staticFiles = [
      '/src/utils/xrpl-client.ts',
      '/src/hooks/useXRPLWallet.ts',
      '/src/components/WalletConnect.tsx',
      '/src/components/TestesPage.tsx'
    ];
    
    for (const file of staticFiles) {
      try {
        const response = await makeRequest(file);
        console.log(`   ${file}: ${response.status}`);
      } catch (error) {
        console.log(`   ${file}: Não acessível (${error.message})`);
      }
    }
    
    console.log('✅ Teste da API do dapp concluído!');
    
    // 5. Instruções para teste manual
    console.log('\n📋 Para testar transações reais:');
    console.log('1. Acesse: http://localhost:5173/testes');
    console.log('2. Clique em "Conectar Wallet"');
    console.log('3. Gere uma nova wallet ou importe uma existente');
    console.log('4. Clique em "Faucet" para obter XRP de teste');
    console.log('5. Execute as transações disponíveis');
    console.log('6. Acompanhe os TX hashes no console');
    
  } catch (error) {
    console.error('❌ Erro ao testar API do dapp:', error.message);
    console.log('\n💡 Verifique se:');
    console.log('- O servidor está rodando (npm run dev)');
    console.log('- A porta 5173 está acessível');
    console.log('- Não há firewall bloqueando a conexão');
  }
}

// Executar o teste
if (require.main === module) {
  testDappAPI().catch(console.error);
}

module.exports = { testDappAPI };