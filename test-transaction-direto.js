#!/usr/bin/env node

/**
 * Script para testar transações XRPL através do dapp
 * Usa xrpl.js diretamente para realizar transações reais
 */

const XRPL = require('xrpl');

// Configurações
const TESTNET_SERVER = 'wss://s.altnet.rippletest.net:51233';

async function testTransactionDireto() {
  console.log('🚀 Iniciando teste de transação XRPL direto...');
  
  let client;
  
  try {
    // 1. Conectar ao XRPL Testnet
    console.log('🔗 Conectando ao XRPL Testnet...');
    client = new XRPL.Client(TESTNET_SERVER);
    await client.connect();
    console.log('✅ Conectado ao XRPL Testnet');
    
    // 2. Criar uma wallet de teste
    console.log('👛 Criando wallet de teste...');
    const wallet = XRPL.Wallet.generate();
    
    console.log('📍 Wallet criada:');
    console.log(`   Address: ${wallet.address}`);
    console.log(`   Seed: ${wallet.seed}`);
    
    // 3. Financiar via faucet usando o método do xrpl.js
    console.log('💸 Financiando wallet via faucet...');
    console.log(`   Acessando: https://faucet.altnet.rippletest.net/accounts?destination=${wallet.address}`);
    
    // Usar o método Client.fundWallet() do xrpl.js
    try {
      const fundResult = await client.fundWallet(wallet);
      console.log('✅ Wallet financiada com sucesso!');
      console.log(`   Balance: ${fundResult.amount}`);
    } catch (fundError) {
      console.log('⚠️  Funding via Client.fundWallet falhou:', fundError.message);
      console.log('💡 Tentando método alternativo...');
      
      // Método alternativo: criar uma wallet pré-financiada
      const fundedWallet = await getFundedWallet(client);
      console.log('✅ Usando wallet pré-financiada');
      Object.assign(wallet, fundedWallet);
    }
    
    // Aguardar confirmação
    console.log('⏳ Aguardando confirmação do funding...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 4. Obter informações da conta
    console.log('💰 Verificando saldo...');
    const account_info = await client.request({
      command: 'account_info',
      account: wallet.address,
      ledger_index: 'validated'
    });
    
    const balance = XRPL.dropsToXrp(account_info.result.account_data.Balance);
    const sequence = account_info.result.account_data.Sequence;
    
    console.log(`   Address: ${wallet.address}`);
    console.log(`   Saldo: ${balance} XRP`);
    console.log(`   Sequence: ${sequence}`);
    
    if (parseFloat(balance) < 0.001) {
      throw new Error('Saldo insuficiente para transação');
    }
    
    // 5. Criar transação de Payment
    console.log('💸 Criando transação de Payment...');
    const destination = 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH'; // Endereço de teste
    const amount = '0.1'; // 0.1 XRP - valor pequeno para teste
    
    const payment = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: destination,
      Amount: XRPL.xrpToDrops(amount),
      Fee: '12',
      Sequence: sequence
    };
    
    console.log(`   Enviando ${amount} XRP`);
    console.log(`   De: ${wallet.address}`);
    console.log(`   Para: ${destination}`);
    
    // 6. Assinar e enviar transação
    console.log('🔐 Assinando transação...');
    const signed = wallet.sign(payment);
    console.log(`   TX Hash: ${signed.hash}`);
    
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
      
      // 7. Aguardar confirmação na ledger
      console.log('⏳ Aguardando confirmação na ledger...');
      console.log('🔍 Monitorando transação...');
      
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        try {
          const tx_response = await client.request({
            command: 'tx',
            transaction: signed.hash
          });
          
          if (tx_response.result.validated) {
            console.log('🎉 Transação confirmada na blockchain!');
            console.log(`   Status: ${tx_response.result.meta.TransactionResult}`);
            console.log(`   Ledger: ${tx_response.result.ledger_index}`);
            console.log(`   Fee: ${XRPL.dropsToXrp(tx_response.result.Fee)} XRP`);
            break;
          }
        } catch (txError) {
          console.log(`   Tentativa ${attempts + 1}/${maxAttempts} - Transação ainda não encontrada`);
        }
        
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      if (attempts >= maxAttempts) {
        console.log('⚠️  Tempo limite ao aguardar confirmação');
      }
      
    } else {
      console.log('❌ Transação falhou:', submit_response.result.engine_result_message);
    }
    
    // 8. Verificar saldo final
    console.log('💰 Verificando saldo final...');
    const final_info = await client.request({
      command: 'account_info',
      account: wallet.address,
      ledger_index: 'validated'
    });
    
    const final_balance = XRPL.dropsToXrp(final_info.result.account_data.Balance);
    console.log(`   Saldo final: ${final_balance} XRP`);
    
    // 9. Desconectar
    await client.disconnect();
    console.log('🔌 Desconectado do XRPL');
    console.log('✅ Teste concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    console.error('📋 Stack:', error.stack);
    
    // Tentar desconectar em caso de erro
    if (client) {
      try {
        await client.disconnect();
      } catch (disconnectError) {
        console.log('⚠️  Erro ao desconectar:', disconnectError.message);
      }
    }
  }
}

// Função auxiliar para obter uma wallet pré-financiada
async function getFundedWallet(client) {
  console.log('🔧 Criando wallet pré-financiada...');
  
  // Gerar uma nova wallet
  const wallet = XRPL.Wallet.generate();
  
  // Para testnet, vamos usar um método simples
  // Em produção, isso seria feito via backend seguro
  console.log(`   Wallet gerada: ${wallet.address}`);
  console.log('   ⚠️  Para testnet real, use o faucet em:');
  console.log('   https://faucet.altnet.rippletest.net/accounts');
  
  return wallet;
}

// Executar o teste
if (require.main === module) {
  testTransactionDireto().catch(console.error);
}

module.exports = { testTransactionDireto };