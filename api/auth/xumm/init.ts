import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const XUMM_API_KEY = process.env.XUMM_API_KEY;
  
  // Em produção, isso seria obrigatório.
  // Para MVP, permitimos funcionar sem chave para demonstrar o fluxo.
  const isMockMode = !XUMM_API_KEY;

  try {
    if (isMockMode) {
      // Retorno simulado para testes sem credenciais reais da Xumm
      return res.status(200).json({
        ok: true,
        mode: 'mock',
        auth_url: 'https://xumm.app/sign-in/mock-uuid-12345',
        qr_code: 'https://placehold.co/200x200?text=Xumm+QR+Mock',
        uuid: 'mock-uuid-12345'
      });
    }

    // Código real de produção (ficaria aqui)
    // const response = await fetch('https://xumm.app/api/v1/platform/payload', ...);
    
    res.status(501).json({ 
      ok: false, 
      error: 'Production Xumm integration requires API Key configuration' 
    });

  } catch (error: any) {
    res.status(500).json({ ok: false, error: error.message });
  }
}