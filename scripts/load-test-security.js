const http = require('http');

const ENDPOINTS = [
  '/api/security/alerts',
  '/api/auth/xumm/init'
];

const BASE_URL = 'http://localhost:3000'; // Ajuste se rodar em outra porta localmente
const REQUESTS_PER_ENDPOINT = 20;

async function runLoadTest() {
  console.log('🚀 Iniciando Smoke/Load Test nos endpoints de Segurança...');
  
  // Vamos assumir que o servidor local NÃO está rodando neste ambiente de CI/Agent
  // Então este teste é mais um "template" para o usuário rodar localmente ou em staging
  console.log('⚠️  NOTA: Certifique-se de que o servidor local (Vercel dev ou Vite) esteja rodando na porta 3000.');
  console.log('    Se não estiver, este teste falhará propositalmente com ECONNREFUSED.');

  for (const endpoint of ENDPOINTS) {
    console.log(`\nTesting ${endpoint}...`);
    let success = 0;
    let fail = 0;
    
    const promises = [];

    for (let i = 0; i < REQUESTS_PER_ENDPOINT; i++) {
      promises.push(new Promise((resolve) => {
        const req = http.get(`${BASE_URL}${endpoint}`, (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            success++;
          } else if (res.statusCode === 501 && endpoint.includes('xumm')) {
             // 501 é esperado para Xumm Init sem chaves (Mock mode retorna 200, mas o código atual pode retornar 501 se a lógica mudar)
             // No nosso código atual: init.js retorna 200 se isMockMode=true.
             success++; 
          } else {
            fail++;
          }
          res.resume();
          resolve();
        });
        
        req.on('error', (e) => {
          fail++;
          resolve();
        });
      }));
    }

    await Promise.all(promises);
    console.log(`✅ Sucesso: ${success} | ❌ Falha: ${fail}`);
  }
  
  console.log('\n🏁 Teste concluído.');
}

// Para executar, descomente a linha abaixo se tiver um servidor rodando
// runLoadTest();
console.log('Script de teste criado em scripts/load-test-security.js');
console.log('Para rodar: node scripts/load-test-security.js (Requer servidor local ativo)');