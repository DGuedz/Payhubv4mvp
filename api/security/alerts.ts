import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Simulação de dados de segurança (Defesa Ativa)
  // Em produção: consulta DB de logs de firewall/WAF
  
  const mockAlerts = [
    {
      id: 'alert_001',
      type: 'HONEYPOT_TRIGGER',
      severity: 'HIGH',
      message: 'Acesso detectado em carteira isca (Honeypot Wallet #3)',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min atrás
      source_ip: '45.22.19.112',
      status: 'BLOCKED'
    },
    {
      id: 'alert_002',
      type: 'RATE_LIMIT',
      severity: 'MEDIUM',
      message: 'Excesso de requisições na rota /escrow-create',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h atrás
      source_ip: '188.21.10.55',
      status: 'THROTTLED'
    }
  ];

  const stats = {
    total_attacks_blocked: 142,
    active_threats: 0,
    uptime_days: 14,
    last_scan: new Date().toISOString()
  };

  res.status(200).json({
    ok: true,
    alerts: mockAlerts,
    stats: stats
  });
}