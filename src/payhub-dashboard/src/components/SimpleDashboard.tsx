import React, { useState } from 'react';
import { QrCode, Smartphone, TrendingUp, Clock, ChevronRight, Zap, DollarSign, Calendar } from 'lucide-react';

interface SimpleDashboardProps {
  onReceberClick: () => void;
  onAnteciparClick: () => void;
}

export function SimpleDashboard({ onReceberClick, onAnteciparClick }: SimpleDashboardProps) {
  const saldoDisponivel = 2450.00;
  const rendimentoHoje = 4.15;
  const rendimentoMes = 89.50;
  const aReceber = 3200.00;

  const vendasRecentes = [
    { cliente: 'João Silva', valor: 250.00, hora: '14:32', status: 'pago' },
    { cliente: 'Maria Santos', valor: 89.90, hora: '13:15', status: 'pago' },
    { cliente: 'Pedro Costa', valor: 450.00, hora: '11:48', status: 'a_receber' },
  ];

  return (
    <div className="space-y-6">
      {/* Saldo Principal - BEM GRANDE */}
      <div className="bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] rounded-3xl p-8 shadow-xl">
        <p className="text-white/80 text-sm mb-2">💰 Seu dinheiro disponível</p>
        <p className="text-5xl text-white mb-6">
          R$ {saldoDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-white/70 text-xs mb-1">Rendeu hoje</p>
            <p className="text-white text-lg">+ R$ {rendimentoHoje.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-3">
            <p className="text-white/70 text-xs mb-1">Rendeu este mês</p>
            <p className="text-white text-lg">+ R$ {rendimentoMes.toFixed(2)}</p>
          </div>
        </div>

        <button
          onClick={onReceberClick}
          className="w-full py-4 bg-white hover:bg-gray-100 text-[#2979FF] rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg"
        >
          <QrCode className="w-6 h-6" />
          <span className="text-lg">Receber Pagamento</span>
        </button>
      </div>

      {/* A Receber e Antecipação */}
      {aReceber > 0 && (
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">💳 A receber (próximos dias)</p>
              <p className="text-white text-2xl">R$ {aReceber.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <Clock className="w-8 h-8 text-[#F59E0B]" />
          </div>
          <button
            onClick={onAnteciparClick}
            className="w-full py-3 bg-[#00E676] hover:bg-[#00C766] text-[#0F1218] rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            <span>Receber Agora (antecipação)</span>
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Receba 95% na hora · R$ {(aReceber * 0.95).toFixed(2)} disponível
          </p>
        </div>
      )}

      {/* Ações Rápidas */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5 hover:border-[#2979FF]/30 transition-colors text-left">
          <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center mb-3">
            <TrendingUp className="w-6 h-6 text-[#00E676]" />
          </div>
          <h3 className="text-white mb-1">Meu dinheiro rende</h3>
          <p className="text-sm text-gray-400">6,2% ao ano automático</p>
          <div className="mt-2 px-2 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs inline-block">
            ✓ Ativo
          </div>
        </button>

        <button className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5 hover:border-[#2979FF]/30 transition-colors text-left">
          <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center mb-3">
            <Smartphone className="w-6 h-6 text-[#2979FF]" />
          </div>
          <h3 className="text-white mb-1">Maquininha no celular</h3>
          <p className="text-sm text-gray-400">Aproximar cartão para pagar</p>
        </button>
      </div>

      {/* Últimas Vendas */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white">📊 Vendas de hoje</h3>
          <button className="text-sm text-[#2979FF] hover:text-[#1E5FCC] flex items-center gap-1">
            Ver todas
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3">
          {vendasRecentes.map((venda, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#0F1218] border border-gray-800">
              <div className="flex-1">
                <p className="text-white mb-1">{venda.cliente}</p>
                <p className="text-xs text-gray-500">{venda.hora}</p>
              </div>
              <div className="text-right">
                <p className="text-white mb-1">R$ {venda.valor.toFixed(2)}</p>
                {venda.status === 'pago' ? (
                  <span className="text-xs text-[#00E676]">✓ Pago</span>
                ) : (
                  <span className="text-xs text-[#F59E0B]">⏳ D+2</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Rendimento */}
      <div className="bg-gradient-to-r from-[#00E676]/10 to-[#2979FF]/10 border border-[#00E676]/20 rounded-xl p-4">
        <p className="text-sm text-gray-300">
          💡 <strong className="text-white">Seu dinheiro tá trabalhando!</strong> Enquanto você vende, 
          seu saldo rende automaticamente 5-8% ao ano. Melhor que deixar parado no banco.
        </p>
      </div>
    </div>
  );
}
