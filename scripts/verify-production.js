const https = require('https');

// URL de produção
const TARGET_URL = 'https://payhubv4mvp.vercel.app/api/pulse';

console.log(`🔍 Iniciando verificação de produção em: ${TARGET_URL}`);
console.log('Aguardando resposta...');

https.get(TARGET_URL, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      if (res.statusCode !== 200) {
        console.error(`❌ Erro HTTP: ${res.statusCode}`);
        console.log('Resposta:', data);
        return;
      }

      const json = JSON.parse(data);
      console.log('\n✅ RESPOSTA RECEBIDA DO VERCEL:');
      console.log(JSON.stringify(json, null, 2));

      console.log('\n📊 ANÁLISE DE SAÚDE:');
      
      if (json.status === 'ONLINE') {
        console.log('✅ Status: ONLINE (Sistema operante)');
      } else {
        console.error('❌ Status: OFFLINE ou Instável');
      }

      if (json.secure_mode) {
        console.log('✅ Secure Mode: ATIVO (XRPL_SEED configurada corretamente)');
      } else {
        console.warn('⚠️  Secure Mode: INATIVO (XRPL_SEED não encontrada ou não carregada)');
        console.warn('   -> Verifique se a variável de ambiente XRPL_SEED foi salva e se o Redeploy foi concluído.');
      }

      if (json.gateway_url) {
        console.log(`✅ Gateway Configurado: ${json.gateway_url}`);
      } else {
        console.error('❌ Gateway URL ausente (VITE_API_URL não configurada)');
      }

    } catch (e) {
      console.error('❌ Erro ao processar JSON:', e.message);
      console.log('Raw data:', data);
    }
  });

}).on('error', (err) => {
  console.error('❌ Erro de conexão:', err.message);
});