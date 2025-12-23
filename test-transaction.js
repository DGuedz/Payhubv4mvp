#!/usr/bin/env node

/**
 * Script para testar transações XRPL através do dapp
 * Executa uma transação de Payment na XRPL Testnet
 */

const XRPL = require('xrpl');

// Configurações
const TESTNET_SERVER = 'wss://s.altnet.rippletest.net:51233';
const DAPP_API_URL = 'http://localhost:5173';

async function testTransaction() {
  console.log('🚀 Iniciando teste de transação XRPL...');
  
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
    
    // 3. Obter saldo inicial
    console.log('💰 Verificando saldo inicial...');
    const account_info = await client.request({
      command: 'account_info',
      account: wallet.address,
      ledger_index: 'validated'
    });
    
    console.log(`   Saldo: ${XRPL.dropsToXrp(account_info.result.account_data.Balance)} XRP`);
    
    // 4. Criar uma transação de Payment
    console.log('💸 Criando transação de Payment...');
    const payment = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH', // Endereço de teste
      Amount: XRPL.xrpToDrops('1.5'), // 1.5 XRP
      Fee: '12',
      Sequence: account_info.result.account_data.Sequence
    };
    
    // 5. Assinar a transação
    console.log('🔐 Assinando transação...');
    const signed = wallet.sign(payment);
    console.log(`   TX Hash: ${signed.hash}`);
    
    // 6. Enviar transação
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
      
      // 7. Aguardar confirmação
      console.log('⏳ Aguardando confirmação...');
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // 8. Verificar status da transação
      console.log('🔍 Verificando status da transação...');
      const tx_response = await client.request({
        command: 'tx',
        transaction: signed.hash
      });
      
      console.log(`   Status final: ${tx_response.result.meta.TransactionResult}`);
      console.log(`   Ledger: ${tx_response.result.ledger_index}`);
      
    } else {
      console.log('❌ Transação falhou:', submit_response.result.engine_result_message);
    }
    
    // 9. Desconectar
    await client.disconnect();
    console.log('🔌 Desconectado do XRPL');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    
    // Tentar obter XRP do faucet se o erro for de saldo insuficiente
    if (error.message.includes('insufficient')) {
      console.log('💡 Dica: Tente obter XRP do faucet primeiro:');
      console.log('   https://faucet.altnet.rippletest.net/accounts');
    }
  }
}

// Executar o teste
if (require.main === module) {
  testTransaction().catch(console.error);
}

module.exports = { testTransaction };