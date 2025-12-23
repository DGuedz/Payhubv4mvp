import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { payload_uuid } = req.query;

  if (!payload_uuid) {
    return res.status(400).json({ ok: false, error: 'Missing payload_uuid' });
  }

  // Simulação de troca de token
  if (typeof payload_uuid === 'string' && payload_uuid.startsWith('mock-')) {
    return res.status(200).json({
      ok: true,
      token: 'jwt-mock-token-xumm-user',
      user: {
        account: 'rTestUserWalletAddress123456',
        name: 'Test User',
        source: 'xumm-mock'
      }
    });
  }

  // Em produção: verificar status do payload na API da Xumm
  res.status(501).json({ ok: false, error: 'Production callback not implemented yet' });
}