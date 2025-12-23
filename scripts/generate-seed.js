const xrpl = require('xrpl');

async function generateCredentials() {
  console.log('Gerando credenciais XRPL Testnet...');
  const wallet = xrpl.Wallet.generate();
  console.log('\n✅ NOVAS CREDENCIAIS GERADAS:');
  console.log('--------------------------------------------------');
  console.log(`Seed (XRPL_SEED): ${wallet.seed}`);
  console.log(`Address:          ${wallet.address}`);
  console.log('--------------------------------------------------');
  console.log('⚠️  Copie o valor de "Seed" para a variável XRPL_SEED no Vercel.');
}

generateCredentials();