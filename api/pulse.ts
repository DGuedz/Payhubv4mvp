import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const GATEWAY = process.env.VITE_API_URL;
  const timestamp = new Date().toISOString();
  const hasSecrets = !!process.env.XRPL_SEED;

  if (!GATEWAY) {
    return res.status(500).json({
      status: 'ERROR',
      error: 'Gateway configuration missing',
      checked_at: timestamp
    });
  }

  return res.status(200).json({
    status: 'ONLINE',
    system: 'PAYHUB v4',
    gateway_url: GATEWAY,
    secure_mode: hasSecrets,
    runtime: 'Vercel Serverless (TS)',
    checked_at: timestamp
  });
}