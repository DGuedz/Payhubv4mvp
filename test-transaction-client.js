#!/usr/bin/env node

/**
 * Script para testar transações XRPL através do dapp
 * Usa o cliente XRPL já implementado no projeto
 */

const { xrplClient } = require('./src/utils/xrpl-client');

async function testTransactionComCliente() {
  console.log('🚀 Iniciando teste de transação XRPL com nosso cliente...');
  
  try {
    // 1. Conectar ao XRPL Testnet usando nosso cliente
    console.log('🔗 Conectando ao XRPL Testnet...');
    await xrplClient.connect();
    console.log('✅ Conectado ao XRPL Testnet');
    
    // 2. Criar uma wallet de teste
    console.log('👛 Criando wallet de teste...');
    const wallet = xrplClient.generateWallet();
    
    console.log('📍 Wallet criada:');
    console.log(`   Address: ${wallet.address}`);
    console.log(`   Seed: ${wallet.seed}`);
    
    // 3. Financiar a wallet via faucet usando nosso cliente
    console.log('💸 Financiando wallet via faucet...');
    const funded = await xrplClient.fundWallet(wallet.address);
    
    if (funded) {
      console.log('✅ Wallet financiada com sucesso!');
    } else {
      console.log('⚠️  Funding pode ter falhado, continuando...');
    }
    
    // Aguardar um momento para a transação ser processada
    console.log('⏳ Aguardando confirmação do funding...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // 4. Obter saldo
    console.log('💰 Verificando saldo...');
    const balance = await xrplClient.getBalance(wallet.address);
    console.log(`   Saldo: ${balance} XRP`);
    
    if (parseFloat(balance) < 0.001) {
      throw new Error('Saldo insuficiente para transação');
    }
    
    // 5. Criar uma transação de Payment
    console.log('💸 Criando transação de Payment...');
    const destination = 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH'; // Endereço de teste
    const amount = '0.5'; // 0.5 XRP
    
    console.log(`   De: ${wallet.address}`);
    console.log(`   Para: ${destination}`);
    console.log(`   Valor: ${amount} XRP`);
    
    // 6. Enviar transação usando nosso cliente
    console.log('📤 Enviando transação...');
    const result = await xrplClient.sendPayment(wallet, destination, amount);
    
    console.log('📊 Resultado do envio:');
    console.log(`   Status: ${result.status}`);
    console.log(`   TX Hash: ${result.hash}`);
    
    if (result.status === 'tesSUCCESS') {
      console.log('✅ Transação enviada com sucesso!');
      console.log(`   Explorer: https://testnet.xrpl.org/transactions/${result.hash}`);
      
      // 7. Aguardar confirmação
      console.log('⏳ Aguardando confirmação na ledger...');
      const confirmation = await xrplClient.waitForTransaction(result.hash);
      
      if (confirmation.success) {
        console.log('🎉 Transação confirmada com sucesso na blockchain!');
        console.log(`   Ledger: ${confirmation.ledger_index}`);
        console.log(`   Resultado: ${confirmation.result}`);
      } else {
        console.log('⚠️  Transação não foi confirmada:', confirmation.error);
      }
      
    } else {
      console.log('❌ Transação falhou:', result.message);
    }
    
    // 8. Desconectar
    await xrplClient.disconnect();
    console.log('🔌 Desconectado do XRPL');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    
    // Tentar desconectar em caso de erro
    try {
      await xrplClient.disconnect();
    } catch (disconnectError) {
      console.log('⚠️  Erro ao desconectar:', disconnectError.message);
    }
  }
}

// Executar o teste
if (require.main === module) {
  testTransactionComCliente().catch(console.error);
}

module.exports = { testTransactionComCliente };