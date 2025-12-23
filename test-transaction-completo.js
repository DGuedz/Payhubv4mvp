#!/usr/bin/env node

/**
 * Script para testar transações XRPL através do dapp
 * Executa uma transação de Payment na XRPL Testnet com funding automático
 */

const XRPL = require('xrpl');
const https = require('https');

// Configurações
const TESTNET_SERVER = 'wss://s.altnet.rippletest.net:51233';
const FAUCET_URL = 'https://faucet.altnet.rippletest.net/accounts';

async function fundWallet(address) {
  console.log(`💰 Solicitando XRP do faucet para ${address}...`);
  
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      destination: address,
      xrpAmount: 1000 // 1000 XRP drops = 0.001 XRP
    });

    const options = {
      hostname: 'faucet.altnet.rippletest.net',
      port: 443,
      path: '/accounts',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.account && response.account.xAddress) {
            console.log('✅ Wallet financiada com sucesso!');
            console.log(`   XAddress: ${response.account.xAddress}`);
            console.log(`   Secret: ${response.account.secret}`);
            resolve(response);
          } else {
            reject(new Error('Resposta inválida do faucet'));
          }
        } catch (error) {
          reject(new Error(`Erro ao processar resposta: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`Erro na requisição: ${error.message}`));
    });

    req.write(postData);
    req.end();
  });
}

async function testTransaction() {
  console.log('🚀 Iniciando teste de transação XRPL com funding automático...');
  
  try {
    // 1. Conectar ao XRPL Testnet
    console.log('🔗 Conectando ao XRPL Testnet...');
    const client = new XRPL.Client(TESTNET_SERVER);
    await client.connect();
    
    console.log('✅ Conectado ao XRPL Testnet');
    
    // 2. Criar uma wallet de teste
    console.log('👛 Criando wallet de teste...');
    const wallet = XRPL.Wallet.generate();
    
    console.log('📍 Wallet criada:');
    console.log(`   Address: ${wallet.address}`);
    console.log(`   Seed: ${wallet.seed}`);
    
    // 3. Financiar a wallet via faucet
    console.log('💸 Financiando wallet via faucet...');
    await fundWallet(wallet.address);
    
    // Aguardar um momento para a transação ser processada
    console.log('⏳ Aguardando confirmação do funding...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 4. Obter saldo e sequence
    console.log('💰 Verificando saldo...');
    const account_info = await client.request({
      command: 'account_info',
      account: wallet.address,
      ledger_index: 'validated'
    });
    
    const balance = XRPL.dropsToXrp(account_info.result.account_data.Balance);
    const sequence = account_info.result.account_data.Sequence;
    
    console.log(`   Saldo: ${balance} XRP`);
    console.log(`   Sequence: ${sequence}`);
    
    if (parseFloat(balance) < 0.001) {
      throw new Error('Saldo insuficiente para transação');
    }
    
    // 5. Criar uma transação de Payment
    console.log('💸 Criando transação de Payment...');
    const payment = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', // Endereço de teste
      Amount: XRPL.xrpToDrops('0.5'), // 0.5 XRP
      Fee: '12',
      Sequence: sequence
    };
    
    // 6. Assinar a transação
    console.log('🔐 Assinando transação...');
    const signed = wallet.sign(payment);
    console.log(`   TX Hash: ${signed.hash}`);
    
    // 7. Enviar transação
    console.log('📤 Enviando transação...');
    const submit_response = await client.request({
      command: 'submit',
      tx_blob: signed.tx_blob
    });
    
    console.log('📊 Resultado do envio:');
    console.log(`   Status: ${submit_response.result.engine_result}`);
    console.log(`   Mensagem: ${submit_response.result.engine_result_message}`);
    
    if (submit_response.result.engine_result === 'tesSUCCESS') {
      console.log('✅ Transação enviada com sucesso!');
      console.log(`   TX Hash: ${signed.hash}`);
      console.log(`   Explorer: https://testnet.xrpl.org/transactions/${signed.hash}`);
      
      // 8. Aguardar confirmação
      console.log('⏳ Aguardando confirmação na ledger...');
      await new Promise(resolve => setTimeout(resolve, 6000));
      
      // 9. Verificar status final da transação
      console.log('🔍 Verificando status final da transação...');
      const tx_response = await client.request({
        command: 'tx',
        transaction: signed.hash
      });
      
      console.log(`   Status final: ${tx_response.result.meta.TransactionResult}`);
      console.log(`   Ledger: ${tx_response.result.ledger_index}`);
      console.log(`   Validated: ${tx_response.result.validated}`);
      
      if (tx_response.result.meta.TransactionResult === 'tesSUCCESS') {
        console.log('🎉 Transação confirmada com sucesso na blockchain!');
      }
      
    } else {
      console.log('❌ Transação falhou:', submit_response.result.engine_result_message);
    }
    
    // 10. Desconectar
    await client.disconnect();
    console.log('🔌 Desconectado do XRPL');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    
    if (error.message.includes('Account not found')) {
      console.log('💡 Dica: A wallet precisa ser financiada primeiro.');
      console.log('   Tente acessar: https://faucet.altnet.rippletest.net/accounts');
    }
  }
}

// Executar o teste
if (require.main === module) {
  testTransaction().catch(console.error);
}

module.exports = { testTransaction };