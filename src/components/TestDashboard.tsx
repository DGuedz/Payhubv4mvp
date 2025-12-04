import React, { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Activity, Clock, ExternalLink, BarChart3, Shield, Zap, User, Crown, History } from 'lucide-react';
import { TestnetStatus } from './TestnetStatus';
import { LatencyIndicator } from './LatencyIndicator';
import { AuditModal } from './AuditModal';
import { TestnetQuickActions } from './TestnetQuickActions';

interface Sale {
  id: string;
  amount: string;
  txHash: string;
  timestamp: string;
  status: 'completed';
}

interface TestDashboardProps {
  sales: Sale[];
  mode: 'employee' | 'owner';
}

export function TestDashboard({ sales, mode }: TestDashboardProps) {
  const [totalSales, setTotalSales] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [estimatedYield, setEstimatedYield] = useState(0);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  useEffect(() => {
    setTotalSales(sales.length);
    const revenue = sales.reduce((acc, sale) => {
      return acc + (parseFloat(sale.amount) / 100);
    }, 0);
    setTotalRevenue(revenue);
    
    // Calculate estimated yield at 6.2% APY (daily rate)
    const dailyRate = 0.062 / 365;
    setEstimatedYield(revenue * dailyRate);
  }, [sales]);

  const formatCurrency = (value: number) => {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          {mode === 'employee' ? (
            <User className="w-6 h-6 text-[#F59E0B]" />
          ) : (
            <Crown className="w-6 h-6 text-[#00E676]" />
          )}
          <h2 className="text-white text-2xl">
            {mode === 'employee' ? 'Painel do Funcionário' : 'Painel do Dono (Tesouraria)'}
          </h2>
        </div>
        <p className="text-gray-400 text-sm">
          {mode === 'employee' 
            ? 'Controle de vendas do turno' 
            : 'Visão completa de tesouraria e rendimento'}
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Sales */}
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#2979FF]" />
            </div>
            <span className="px-2 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs">
              Teste
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Total de Vendas</p>
          <p className="text-white text-3xl">{totalSales}</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#00E676]" />
            </div>
            <span className="px-2 py-1 rounded-full bg-[#2979FF]/10 text-[#2979FF] text-xs">
              RLUSD
            </span>
          </div>
          <p className="text-gray-400 text-sm mb-1">Faturamento</p>
          <p className="text-white text-3xl">{formatCurrency(totalRevenue)}</p>
        </div>

        {/* Yield (Owner Only) */}
        {mode === 'owner' && (
          <>
            <div className="bg-gradient-to-br from-[#00E676]/10 to-[#00C766]/10 border border-[#00E676]/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#00E676]" />
                </div>
                <span className="px-2 py-1 rounded-full bg-[#00E676] text-white text-xs">
                  Ativo
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Rendimento Estimado (Diário)</p>
              <p className="text-white text-3xl">{formatCurrency(estimatedYield)}</p>
              <p className="text-[#00E676] text-xs mt-2">6.2% APY ativo</p>
            </div>

            <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#F59E0B]" />
                </div>
                <span className="px-2 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                  D+0
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-1">Liquidação Média</p>
              <p className="text-white text-3xl">3.8s</p>
              <p className="text-gray-500 text-xs mt-2">Tempo real XRPL</p>
            </div>
          </>
        )}
      </div>

      {/* New Components Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Testnet Status */}
        {sales.length > 0 && (
          <TestnetStatus
            lastTxHash={sales[0].txHash}
            lastTxAmount={`R$ ${(parseFloat(sales[0].amount) / 100).toFixed(2)}`}
            lastTxTime={new Date(sales[0].timestamp).getTime()}
            network="testnet"
          />
        )}

        {/* Latency Indicator */}
        <LatencyIndicator
          confirmationTime={3500}
          showDetails={true}
          size="md"
        />
      </div>

      {/* XRPL Connection Status */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-white">Conexão XRPL Testnet</h3>
            <span className="px-2 py-0.5 rounded text-xs bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
              Auditável
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
            <span className="text-[#00E676] text-sm">Conectado</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400 mb-1">Rede</p>
            <p className="text-white">wss://s.testnet.rippletest.net</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Carteira Teste</p>
            <p className="text-white font-mono">rMERCHANT...8bXz</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Ledger Atual</p>
            <p className="text-white">#{Math.floor(Math.random() * 1000000) + 50000000}</p>
          </div>
          <div>
            <p className="text-gray-400 mb-1">Taxa de Rede</p>
            <p className="text-white">0.00001 XRP</p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          {mode === 'owner' && (
            <>
              <a
                href="https://testnet.xrpl.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#00E676]/5 hover:bg-[#00E676]/10 border border-[#00E676]/20 hover:border-[#00E676]/40 text-[#00E676] text-sm transition-all"
              >
                <span>🔍 Explorer</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsAuditModalOpen(true)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#2979FF]/5 hover:bg-[#2979FF]/10 border border-[#2979FF]/20 hover:border-[#2979FF]/40 text-[#2979FF] text-sm transition-all"
              >
                <History className="w-4 h-4" />
                <span>Ver Auditoria</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        network="testnet"
      />

      {/* Recent Sales */}
      {sales.length > 0 && (
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <h3 className="text-white mb-4">Vendas Recentes</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {sales.slice().reverse().map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between p-3 rounded-lg bg-[#0F1218] border border-gray-800"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white">{formatCurrency(parseFloat(sale.amount) / 100)}</p>
                    <span className="px-2 py-0.5 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs">
                      Concluído
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs">{sale.timestamp}</p>
                  {mode === 'owner' && (
                    <a 
                      href={`https://testnet.xrpl.org/transactions/${sale.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[#00E676] text-xs font-mono mt-1 hover:text-[#00C766] transition-colors group"
                    >
                      <span>{sale.txHash.slice(0, 16)}...</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-[#00E676]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Access Comparison (Owner Only) */}
      {mode === 'owner' && (
        <div className="bg-gradient-to-br from-[#2979FF]/10 to-[#1E5FE0]/10 border border-[#2979FF]/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-[#2979FF]" />
            <h3 className="text-white">Privilégios de Dono</h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              <span>Acesso completo a métricas de tesouraria</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              <span>Visualização de TX Hash XRPL</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              <span>Controle de rendimento automático (Yield)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
              <span>Exportação de relatórios fiscais</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Panel */}
      {mode === 'owner' && (
        <TestnetQuickActions />
      )}

      {/* Empty State */}
      {sales.length === 0 && (
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-12 text-center">
          <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <h3 className="text-white mb-2">Nenhuma venda ainda</h3>
          <p className="text-gray-400 text-sm">
            Use o simulador ao lado para testar o fluxo completo de venda
          </p>
        </div>
      )}
    </div>
  );
}
