import React from 'react';
import { TrendingUp, Lock, AlertTriangle, ArrowUpRight, ArrowDownRight, FlaskConical, Smartphone, Wallet } from 'lucide-react';
import { LiveTestnetBanner } from './LiveTestnetBanner';
import { VerifiedTxBadge } from './VerifiedTxBadge';

interface DashboardHomeProps {
  balance: string;
  yieldStatus: 'inactive' | 'pending' | 'active';
  yieldApy?: string;
  recentEscrows: Array<{
    id: string;
    value: string;
    status: 'pending' | 'completed' | 'failed';
    timestamp: string;
    txHash?: string;
  }>;
  securityAlerts: number;
  walletConnected: boolean;
  walletAddress?: string;
  onPayClick: () => void;
  onReceiveClick: () => void;
  onEscrowClick: () => void;
  onYieldClick: () => void;
  onConnectWallet: () => void;
}

export function DashboardHome({
  balance,
  yieldStatus,
  yieldApy = '6.2',
  recentEscrows,
  securityAlerts,
  walletConnected,
  walletAddress,
  onPayClick,
  onReceiveClick,
  onEscrowClick,
  onYieldClick,
  onConnectWallet,
}: DashboardHomeProps) {
  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-white mb-2">Bem-vindo ao PAYHUB</h1>
        <p className="text-gray-400">Liquidação D+0 com Escrow XRPL</p>
      </div>

      {/* Live Testnet Banner */}
      <LiveTestnetBanner showLatency={true} />

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] rounded-2xl p-4 sm:p-6 relative overflow-hidden">
        {/* SVG Animated Background */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="balance-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#balance-grid)" />
          <circle cx="90%" cy="20%" r="60" fill="white" opacity="0.05">
            <animate attributeName="r" values="60;80;60" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>

        {!walletConnected ? (
          // Wallet Disconnected State
          <div className="relative z-10 text-center py-4 sm:py-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <p className="text-white/80 text-sm mb-4 px-4">Conecte sua wallet para visualizar saldo</p>
            <button
              onClick={onConnectWallet}
              className="px-6 sm:px-8 py-3 rounded-lg bg-white hover:bg-white/90 text-[#2979FF] transition-all flex items-center justify-center gap-2 mx-auto text-sm sm:text-base"
            >
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Conectar Wallet</span>
            </button>
            <p className="text-white/60 text-xs mt-3">
              Simulação • Em breve: Ledger Hardware Wallet
            </p>
          </div>
        ) : (
          // Wallet Connected State
          <>
            <div className="relative z-10">
              {walletAddress && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                  <p className="text-white/60 text-xs font-mono break-all sm:break-normal">
                    {walletAddress.slice(0, 8)}...{walletAddress.slice(-6)}
                  </p>
                </div>
              )}
              <p className="text-white/80 text-sm mb-2">Saldo Disponível</p>
              <p className="text-3xl sm:text-4xl text-white font-light mb-4 sm:mb-6">{balance} RLUSD</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 relative z-10">
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
          </>
        )}
      </div>

      {/* Test DApp Banner */}
      <div className="bg-gradient-to-br from-[#2979FF]/10 to-[#1E5FE0]/10 border border-[#2979FF]/30 rounded-xl p-4 sm:p-6 relative overflow-hidden">
        {/* Animated Circuit Pattern */}
        <svg className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,16 L20,16 L24,12 L40,12 L44,8 L60,8" stroke="#2979FF" strokeWidth="1" fill="none">
            <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="3s" repeatCount="indefinite" />
          </path>
          <path d="M0,32 L15,32 L19,28 L35,28 L39,24 L60,24" stroke="#2979FF" strokeWidth="1" fill="none">
            <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="4s" repeatCount="indefinite" />
          </path>
          <circle cx="20" cy="16" r="2" fill="#2979FF">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#2979FF]/20 flex items-center justify-center flex-shrink-0">
            <FlaskConical className="w-6 h-6 text-[#2979FF]" />
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-white text-base sm:text-lg">Teste o Soft-POS Agora (XRPL Testnet)</h3>
              <span className="px-2 py-0.5 rounded text-xs bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                Auditável Publicamente
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Transações reais verificáveis em testnet.xrpl.org. Veja a diferença entre Modo Funcionário e Modo Dono.
            </p>
            <a
              href="#test"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white text-sm transition-all"
            >
              <span>Testar Agora</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Soft-POS Download Banner */}
      <div className="bg-gradient-to-br from-[#00E676]/10 to-[#00C766]/10 border border-[#00E676]/30 rounded-xl p-4 sm:p-6 relative overflow-hidden">
        {/* Animated Mobile Waves */}
        <svg className="absolute bottom-0 left-0 w-full h-20 sm:h-24 opacity-20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C300,80 600,40 900,60 C1050,70 1200,50 1200,50 L1200,120 L0,120 Z" fill="#00E676" opacity="0.3">
            <animate attributeName="d" 
              values="M0,60 C300,80 600,40 900,60 C1050,70 1200,50 1200,50 L1200,120 L0,120 Z;
                      M0,50 C300,40 600,70 900,50 C1050,40 1200,60 1200,60 L1200,120 L0,120 Z;
                      M0,60 C300,80 600,40 900,60 C1050,70 1200,50 1200,50 L1200,120 L0,120 Z" 
              dur="8s" 
              repeatCount="indefinite" />
          </path>
        </svg>
        <div className="flex flex-col sm:flex-row items-start gap-4 relative z-10">
          <div className="w-12 h-12 rounded-xl bg-[#00E676]/20 flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-6 h-6 text-[#00E676]" />
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <h3 className="text-white mb-2 text-base sm:text-lg">Transforme Celulares em Maquininhas</h3>
            <p className="text-gray-300 text-sm mb-4">
              Baixe o DApp Mobile (Soft-POS) e elimine o aluguel de equipamentos. Liquidação D+0 em qualquer celular.
            </p>
            <a
              href="#softpos"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E676] hover:bg-[#00C766] text-white text-sm transition-all"
            >
              <span>Baixar Agora</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Yield Card */}
        <button
          onClick={onYieldClick}
          className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-[#2979FF]/30 transition-colors text-left relative overflow-hidden group"
        >
          {/* Animated Growth Line */}
          <svg className="absolute bottom-0 left-0 w-full h-12 opacity-0 group-hover:opacity-20 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20">
            <path d="M0,15 L20,12 L40,8 L60,5 L80,3 L100,2" stroke="#00E676" strokeWidth="1.5" fill="none">
              <animate attributeName="stroke-dasharray" from="0,150" to="150,0" dur="2s" repeatCount="indefinite" />
            </path>
          </svg>
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
          className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 sm:p-5 hover:border-[#2979FF]/30 transition-colors text-left relative overflow-hidden group"
        >
          {/* Animated Lock Security Pattern */}
          <svg className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-10 transition-opacity" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path d="M25,10 L35,15 L35,30 Q35,40 25,45 Q15,40 15,30 L15,15 Z" stroke="#2979FF" strokeWidth="1" fill="none">
              <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
            </path>
            <circle cx="25" cy="25" r="4" fill="#2979FF">
              <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <div className="w-10 h-10 rounded-lg bg-[#2979FF]/10 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-[#2979FF]" />
          </div>
          <h3 className="text-white mb-1">Escrow</h3>
          <p className="text-sm text-gray-400">Criar liquidação D+0</p>
        </button>
      </div>

      {/* Recent Escrows */}
      {recentEscrows.length > 0 && (
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 sm:p-6">
          <h3 className="text-white mb-4">Últimos Escrows</h3>
          <div className="space-y-3">
            {recentEscrows.map((escrow) => (
              <div key={escrow.id} className="space-y-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0F1218] border border-gray-800 gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm">{escrow.value} RLUSD</p>
                    <p className="text-xs text-gray-500">{escrow.timestamp}</p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs whitespace-nowrap ${
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
                {escrow.status === 'completed' && escrow.txHash && (
                  <VerifiedTxBadge
                    txHash={escrow.txHash}
                    timestamp={new Date(escrow.timestamp).getTime()}
                    inline={true}
                    network="testnet"
                  />
                )}
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
