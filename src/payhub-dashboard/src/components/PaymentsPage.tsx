import React, { useState } from 'react';
import { CreditCard, QrCode, Wallet, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react';

interface PaymentsPageProps {
  onOpenPixPayment: () => void;
}

export function PaymentsPage({ onOpenPixPayment }: PaymentsPageProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  // Mock data para transações recentes
  const recentTransactions = [
    {
      id: 'tx-001',
      type: 'pix',
      amount: '250.00',
      status: 'completed',
      timestamp: '27/11 14:32',
      recipient: 'João Silva',
    },
    {
      id: 'tx-002',
      type: 'card',
      amount: '500.00',
      status: 'pending',
      timestamp: '27/11 13:15',
      recipient: 'Maria Santos',
    },
    {
      id: 'tx-003',
      type: 'crypto',
      amount: '1,250.00',
      status: 'completed',
      timestamp: '27/11 10:45',
      recipient: 'XRPL Wallet',
    },
    {
      id: 'tx-004',
      type: 'pix',
      amount: '89.90',
      status: 'failed',
      timestamp: '26/11 18:20',
      recipient: 'Pedro Costa',
    },
  ];

  const paymentMethods = [
    {
      id: 'pix',
      name: 'PIX',
      description: 'Pagamento instantâneo 24/7',
      icon: QrCode,
      available: true,
    },
    {
      id: 'card',
      name: 'Cartão',
      description: 'Crédito ou débito',
      icon: CreditCard,
      available: true,
    },
    {
      id: 'crypto',
      name: 'Cripto',
      description: 'RLUSD via XRPL',
      icon: Wallet,
      available: true,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-[#00E676]" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-[#F59E0B]" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-[#EF4444]" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Concluído';
      case 'pending':
        return 'Pendente';
      case 'failed':
        return 'Falhou';
      default:
        return status;
    }
  };

  const handleMethodClick = (methodId: string) => {
    setSelectedMethod(methodId);
    if (methodId === 'pix') {
      onOpenPixPayment();
    }
  };

  return (
    <div className="space-y-8">
      {/* Payment Methods */}
      <div>
        <h3 className="text-white mb-4">Métodos de Pagamento</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => handleMethodClick(method.id)}
                disabled={!method.available}
                className={`bg-[#1A1F2B] border border-gray-800 rounded-xl p-6 text-left transition-all hover:border-[#2979FF] ${
                  selectedMethod === method.id ? 'border-[#2979FF] ring-2 ring-[#2979FF]/20' : ''
                } ${!method.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#2979FF]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#2979FF]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white mb-1">{method.name}</h4>
                    <p className="text-sm text-gray-400">{method.description}</p>
                    {!method.available && (
                      <span className="inline-block mt-2 text-xs text-[#F59E0B]">
                        Em breve
                      </span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#00E676]" />
            <span className="text-sm text-gray-400">Volume Hoje</span>
          </div>
          <p className="text-2xl text-white">R$ 2.089,90</p>
          <p className="text-sm text-[#00E676] mt-1">+18% vs ontem</p>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-5 h-5 text-[#2979FF]" />
            <span className="text-sm text-gray-400">Transações</span>
          </div>
          <p className="text-2xl text-white">24</p>
          <p className="text-sm text-gray-400 mt-1">4 transações/hora</p>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-sm text-gray-400">Taxa de Sucesso</span>
          </div>
          <p className="text-2xl text-white">96.8%</p>
          <p className="text-sm text-[#00E676] mt-1">+2.1% este mês</p>
        </div>
      </div>

      {/* Recent Transactions */}
      <div>
        <h3 className="text-white mb-4">Transações Recentes</h3>
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-4 text-sm text-gray-400">ID</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-400">Tipo</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-400">Valor</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-400">Destinatário</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-400">Status</th>
                  <th className="text-left px-6 py-4 text-sm text-gray-400">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-800 last:border-0 hover:bg-[#0F1218]">
                    <td className="px-6 py-4 text-sm text-gray-400 font-mono">{tx.id}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 px-2 py-1 bg-[#2979FF]/10 text-[#2979FF] rounded text-xs uppercase">
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">R$ {tx.amount}</td>
                    <td className="px-6 py-4 text-gray-400">{tx.recipient}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(tx.status)}
                        <span className="text-sm text-gray-400">{getStatusText(tx.status)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
