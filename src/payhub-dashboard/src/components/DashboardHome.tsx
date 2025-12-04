import React from 'react';
import { TrendingUp, Lock, AlertTriangle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface DashboardHomeProps {
  balance: string;
  yieldStatus: 'inactive' | 'pending' | 'active';
  yieldApy?: string;
  recentEscrows: Array<{
    id: string;
    value: string;
    status: 'pending' | 'completed' | 'failed';
    timestamp: string;
  }>;
  securityAlerts: number;
  onPayClick: () => void;
  onReceiveClick: () => void;
  onEscrowClick: () => void;
  onYieldClick: () => void;
}

export function DashboardHome({
  balance,
  yieldStatus,
  yieldApy = '6.2',
  recentEscrows,
  securityAlerts,
  onPayClick,
  onReceiveClick,
  onEscrowClick,
  onYieldClick,
}: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-white mb-2">Bem-vindo ao PAYHUB</h1>
        <p className="text-gray-400">Liquidação D+0 com Escrow XRPL</p>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] rounded-2xl p-6">
        <p className="text-white/80 text-sm mb-2">Saldo Disponível</p>
        <p className="text-4xl text-white font-light mb-6">{balance} RLUSD</p>
        <div className="flex gap-3">
          <button
            onClick={onPayClick}
            className="flex-1 px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur text-white transition-all flex items-center justify-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            <span>Pagar</span>
          </button>
          <button
            onClick={onReceiveClick}
            className="flex-1 px-6 py-3 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur text-white transition-all flex items-center justify-center gap-2"
          >
            <ArrowDownRight className="w-4 h-4" />
            <span>Receber</span>
          </button>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Yield Card */}
        <button
          onClick={onYieldClick}
          className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5 hover:border-[#2979FF]/30 transition-colors text-left"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00E676]" />
            </div>
            {yieldStatus === 'active' && (
              <span className="px-2 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs">
                Ativo
              </span>
            )}
          </div>
          <h3 className="text-white mb-1">Yield</h3>
          <p className="text-sm text-gray-400">
            {yieldStatus === 'active' ? `${yieldApy}% APY` : 'Ativar rendimento'}
          </p>
        </button>

        {/* Escrow Card */}
        <button
          onClick={onEscrowClick}
          className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5 hover:border-[#2979FF]/30 transition-colors text-left"
        >
          <div className="w-10 h-10 rounded-lg bg-[#2979FF]/10 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#2979FF]" />
          </div>
          <h3 className="text-white mb-1">Escrow</h3>
          <p className="text-sm text-gray-400">Criar liquidação D+0</p>
        </button>
      </div>

      {/* Recent Escrows */}
      {recentEscrows.length > 0 && (
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white mb-4">Últimos Escrows</h3>
          <div className="space-y-3">
            {recentEscrows.map((escrow) => (
              <div
                key={escrow.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0F1218] border border-gray-800"
              >
                <div>
                  <p className="text-white text-sm">{escrow.value} RLUSD</p>
                  <p className="text-xs text-gray-500">{escrow.timestamp}</p>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs ${
                    escrow.status === 'completed'
                      ? 'bg-[#00E676]/10 text-[#00E676]'
                      : escrow.status === 'pending'
                      ? 'bg-[#F59E0B]/10 text-[#F59E0B]'
                      : 'bg-[#EF4444]/10 text-[#EF4444]'
                  }`}
                >
                  {escrow.status === 'completed'
                    ? 'Concluído'
                    : escrow.status === 'pending'
                    ? 'Pendente'
                    : 'Falhou'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Alerts */}
      {securityAlerts > 0 && (
        <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white text-sm mb-1">Alertas de Segurança</p>
            <p className="text-xs text-gray-400">
              {securityAlerts} alerta{securityAlerts > 1 ? 's' : ''} de tentativas de acesso
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
