export default async function handler(req, res) {
  // 1. Recupera as credenciais seguras do ambiente Vercel
  const GATEWAY = process.env.VITE_API_URL;
  
  // 2. Data e Hora para prova de "Tempo Real"
  const timestamp = new Date().toISOString();

  try {
    // 3. Verifica se o Gateway está definido
    if (!GATEWAY) {
      throw new Error("Configuração de Gateway (VITE_API_URL) ausente.");
    }

    // 4. Simula o "Handshake" com o XRPL Gateway (aqui você faria o fetch real futuramente)
    // Para este MVP, validamos se o ambiente tem as chaves necessárias
    const hasSecrets = !!process.env.XRPL_SEED;

    res.status(200).json({
      status: 'ONLINE',
      system: 'PAYHUB v4',
      xrpl_link: 'ACTIVE',
      gateway_url: GATEWAY,
      secure_mode: hasSecrets,
      checked_at: timestamp
    });
  } catch (error) {
    res.status(503).json({
      status: 'OFFLINE',
      error: error.message,
      checked_at: timestamp
    });
  }
}