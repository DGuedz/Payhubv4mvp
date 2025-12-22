import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, Activity, Lock, RefreshCw } from 'lucide-react';
import { createSDK } from '../sdk/payhub';

interface Alert {
  id: string;
  type: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  message: string;
  timestamp: string;
  source_ip: string;
  status: string;
}

interface SecurityStats {
  total_attacks_blocked: number;
  active_threats: number;
  uptime_days: number;
  last_scan: string;
}

export function SecurityDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [stats, setStats] = useState<SecurityStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize SDK
  const sdk = createSDK({
    baseUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL || 'http://localhost:3000',
    token: 'demo-token',
  });

  const fetchSecurityData = async () => {
    setLoading(true);
    try {
      const result = await sdk.security.alerts();
      if (result.ok) {
        setAlerts(result.alerts);
        setStats(result.stats as SecurityStats);
        setError(null);
      } else {
        setError(result.error || 'Falha ao carregar dados de segurança');
      }
    } catch (err) {
      setError('Erro de conexão com servidor de segurança');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityData();
    // Auto-refresh a cada 30s
    const interval = setInterval(fetchSecurityData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'MEDIUM': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'LOW': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-gray-400 text-sm">Ameaças Bloqueadas</span>
          </div>
          <p className="text-2xl text-white font-mono">
            {stats?.total_attacks_blocked || 0}
          </p>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <Activity className="w-5 h-5 text-blue-500" />
            <span className="text-gray-400 text-sm">Uptime (Dias)</span>
          </div>
          <p className="text-2xl text-white font-mono">
            {stats?.uptime_days || 0}
          </p>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <span className="text-gray-400 text-sm">Ameaças Ativas</span>
          </div>
          <p className="text-2xl text-white font-mono">
            {stats?.active_threats || 0}
          </p>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 flex items-center justify-between">
           <div>
            <div className="flex items-center gap-3 mb-2">
              <Lock className="w-5 h-5 text-purple-500" />
              <span className="text-gray-400 text-sm">Status do Sistema</span>
            </div>
            <p className="text-sm text-emerald-400 font-bold">PROTEGIDO</p>
           </div>
           <button 
             onClick={fetchSecurityData}
             disabled={loading}
             className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 transition-colors"
           >
             <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
           </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          <h3 className="text-white font-semibold flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Alertas de Segurança (Honeypot & WAF)
          </h3>
          <span className="text-xs text-gray-500">
            Último scan: {stats ? new Date(stats.last_scan).toLocaleTimeString() : '-'}
          </span>
        </div>

        <div className="divide-y divide-gray-800">
          {loading && alerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              Carregando dados de segurança...
            </div>
          ) : error ? (
            <div className="p-8 text-center text-red-400">
              <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
              {error}
            </div>
          ) : alerts.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <ShieldCheck className="w-8 h-8 mx-auto mb-2 text-emerald-500/50" />
              Nenhum alerta de segurança recente. Sistema seguro.
            </div>
          ) : (
            alerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-[#0F1218] transition-colors flex items-start gap-4">
                <div className={`px-2 py-1 rounded text-xs font-bold border ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium">{alert.type}</span>
                    <span className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
                    <span>IP: {alert.source_ip}</span>
                    <span className={alert.status === 'BLOCKED' ? 'text-red-400' : 'text-yellow-400'}>
                      STATUS: {alert.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}