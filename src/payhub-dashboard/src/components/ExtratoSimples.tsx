import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign, Filter } from 'lucide-react';

export function ExtratoSimples() {
  const [filtro, setFiltro] = useState<'todos' | 'entradas' | 'saidas'>('todos');
  const [periodo, setPeriodo] = useState<'hoje' | 'semana' | 'mes'>('semana');

  const movimentacoes = [
    {
      tipo: 'entrada',
      descricao: 'Venda - João Silva',
      valor: 250.00,
      data: '27/11',
      hora: '14:32',
      metodo: 'PIX',
      status: 'concluído'
    },
    {
      tipo: 'entrada',
      descricao: 'Venda - Maria Santos',
      valor: 89.90,
      data: '27/11',
      hora: '13:15',
      metodo: 'Cartão',
      status: 'concluído'
    },
    {
      tipo: 'entrada',
      descricao: 'Rendimento automático',
      valor: 4.15,
      data: '27/11',
      hora: '00:00',
      metodo: 'Rendimento',
      status: 'concluído'
    },
    {
      tipo: 'saida',
      descricao: 'Transferência para conta bancária',
      valor: 500.00,
      data: '26/11',
      hora: '16:45',
      metodo: 'PIX',
      status: 'concluído'
    },
    {
      tipo: 'entrada',
      descricao: 'Venda - Pedro Costa',
      valor: 450.00,
      data: '26/11',
      hora: '11:48',
      metodo: 'Link Pagamento',
      status: 'a_receber'
    },
    {
      tipo: 'entrada',
      descricao: 'Antecipação de recebíveis',
      valor: 1900.00,
      data: '25/11',
      hora: '10:22',
      metodo: 'Antecipação',
      status: 'concluído'
    },
  ];

  const movimentacoesFiltradas = movimentacoes.filter(m => {
    if (filtro === 'entradas') return m.tipo === 'entrada';
    if (filtro === 'saidas') return m.tipo === 'saida';
    return true;
  });

  const totalEntradas = movimentacoes
    .filter(m => m.tipo === 'entrada' && m.status === 'concluído')
    .reduce((acc, m) => acc + m.valor, 0);

  const totalSaidas = movimentacoes
    .filter(m => m.tipo === 'saida' && m.status === 'concluído')
    .reduce((acc, m) => acc + m.valor, 0);

  const saldo = totalEntradas - totalSaidas;

  return (
    <div className="space-y-6">
      {/* Resumo do Período */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Entradas</p>
          <p className="text-2xl text-[#00E676]">
            + R$ {totalEntradas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Saídas</p>
          <p className="text-2xl text-[#F59E0B]">
            - R$ {totalSaidas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">Saldo</p>
          <p className="text-2xl text-white">
            R$ {saldo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filtro === 'todos'
                ? 'bg-[#2979FF] text-white'
                : 'bg-[#1A1F2B] text-gray-400 hover:text-white'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltro('entradas')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filtro === 'entradas'
                ? 'bg-[#00E676] text-[#0F1218]'
                : 'bg-[#1A1F2B] text-gray-400 hover:text-white'
            }`}
          >
            Entradas
          </button>
          <button
            onClick={() => setFiltro('saidas')}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              filtro === 'saidas'
                ? 'bg-[#F59E0B] text-[#0F1218]'
                : 'bg-[#1A1F2B] text-gray-400 hover:text-white'
            }`}
          >
            Saídas
          </button>
        </div>

        <div className="flex gap-2">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-[#1A1F2B] border border-gray-800 text-white text-sm focus:border-[#2979FF] focus:outline-none"
          >
            <option value="hoje">Hoje</option>
            <option value="semana">Esta semana</option>
            <option value="mes">Este mês</option>
          </select>
          
          <button className="px-4 py-2 rounded-lg bg-[#2979FF] hover:bg-[#1E5FCC] text-white text-sm flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Exportar</span>
          </button>
        </div>
      </div>

      {/* Lista de Movimentações */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-800">
          <h3 className="text-white">Movimentações</h3>
        </div>

        <div className="divide-y divide-gray-800">
          {movimentacoesFiltradas.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Nenhuma movimentação encontrada
            </div>
          ) : (
            movimentacoesFiltradas.map((mov, i) => (
              <div key={i} className="p-4 hover:bg-[#0F1218] transition-colors">
                <div className="flex items-center justify-between gap-4">
                  {/* Ícone e Descrição */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      mov.tipo === 'entrada' ? 'bg-[#00E676]/10' : 'bg-[#F59E0B]/10'
                    }`}>
                      {mov.tipo === 'entrada' ? (
                        <TrendingUp className={`w-6 h-6 ${
                          mov.metodo === 'Rendimento' ? 'text-[#2979FF]' : 'text-[#00E676]'
                        }`} />
                      ) : (
                        <TrendingDown className="w-6 h-6 text-[#F59E0B]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white mb-1">{mov.descricao}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span>{mov.data} às {mov.hora}</span>
                        <span>•</span>
                        <span>{mov.metodo}</span>
                      </div>
                    </div>
                  </div>

                  {/* Valor e Status */}
                  <div className="text-right">
                    <p className={`text-lg mb-1 ${
                      mov.tipo === 'entrada' 
                        ? mov.metodo === 'Rendimento' ? 'text-[#2979FF]' : 'text-[#00E676]'
                        : 'text-[#F59E0B]'
                    }`}>
                      {mov.tipo === 'entrada' ? '+' : '-'} R$ {mov.valor.toFixed(2)}
                    </p>
                    {mov.status === 'concluído' ? (
                      <span className="text-xs text-gray-500">✓ Concluído</span>
                    ) : (
                      <span className="text-xs text-[#F59E0B]">⏳ A receber</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#2979FF]/10 border border-[#2979FF]/20 rounded-xl p-4">
        <p className="text-sm text-gray-300">
          💡 Todas as movimentações são atualizadas em tempo real. Seu dinheiro rende 
          automaticamente enquanto fica na conta.
        </p>
      </div>
    </div>
  );
}
