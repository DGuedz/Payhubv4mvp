import { X, ExternalLink, Download, Filter, CheckCircle2, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { VerifiedTxBadge } from './VerifiedTxBadge';

interface Transaction {
  hash: string;
  type: 'EscrowCreate' | 'EscrowFinish' | 'Payment' | 'TrustSet';
  amount: string;
  timestamp: number;
  status: 'validated' | 'pending';
  ledgerIndex: number;
}

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  network?: 'testnet' | 'mainnet';
}

export function AuditModal({ isOpen, onClose, network = 'testnet' }: AuditModalProps) {
  const [filter, setFilter] = useState<'all' | 'EscrowCreate' | 'EscrowFinish' | 'Payment'>('all');

  // Mock data - substitua com dados reais da API
  const mockTransactions: Transaction[] = [
    {
      hash: 'TST9A8B7C6D5E4F3G2H1',
      type: 'EscrowFinish',
      amount: 'R$ 150,00',
      timestamp: Date.now() - 45000,
      status: 'validated',
      ledgerIndex: 42891234
    },
    {
      hash: 'TST8Z7Y6X5W4V3U2T1S0',
      type: 'EscrowCreate',
      amount: 'R$ 150,00',
      timestamp: Date.now() - 52000,
      status: 'validated',
      ledgerIndex: 42891220
    },
    {
      hash: 'TST7P9Q8R7S6T5U4V3W2',
      type: 'Payment',
      amount: 'R$ 89,90',
      timestamp: Date.now() - 3600000,
      status: 'validated',
      ledgerIndex: 42889100
    },
    {
      hash: 'TST6M5N4O3P2Q1R0S9T8',
      type: 'EscrowFinish',
      amount: 'R$ 89,90',
      timestamp: Date.now() - 3605000,
      status: 'validated',
      ledgerIndex: 42889090
    },
    {
      hash: 'TST5K4L3M2N1O0P9Q8R7',
      type: 'TrustSet',
      amount: '10000 RLUSD',
      timestamp: Date.now() - 86400000,
      status: 'validated',
      ledgerIndex: 42870000
    }
  ];

  const filteredTxs = filter === 'all' 
    ? mockTransactions 
    : mockTransactions.filter(tx => tx.type === filter);

  const handleDownloadCSV = () => {
    const csv = [
      ['Hash', 'Type', 'Amount', 'Timestamp', 'Status', 'Ledger Index'].join(','),
      ...filteredTxs.map(tx => [
        tx.hash,
        tx.type,
        tx.amount,
        new Date(tx.timestamp).toISOString(),
        tx.status,
        tx.ledgerIndex
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payhub-audit-${network}-${Date.now()}.csv`;
    a.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1419] border border-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-white text-xl mb-1">Auditoria de Transações</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">XRPL {network === 'testnet' ? 'Testnet' : 'Mainnet'}</span>
              <span className="px-2 py-0.5 rounded text-xs bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                Auditável Publicamente
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 p-6 border-b border-gray-800">
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
              <span className="text-xs text-gray-400">Total Validadas</span>
            </div>
            <p className="text-white text-2xl">{mockTransactions.length}</p>
          </div>
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-[#2979FF]" />
              <span className="text-xs text-gray-400">Última TX</span>
            </div>
            <p className="text-white text-2xl">45s</p>
          </div>
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#00E676]" />
              <span className="text-xs text-gray-400">Volume Total</span>
            </div>
            <p className="text-white text-2xl">R$ 479</p>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center justify-between gap-4 p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="bg-[#1A1F2B] border border-gray-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00E676] transition-colors"
            >
              <option value="all">Todas ({mockTransactions.length})</option>
              <option value="EscrowCreate">Escrow Create</option>
              <option value="EscrowFinish">Escrow Finish</option>
              <option value="Payment">Payment</option>
            </select>
          </div>
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white text-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Exportar CSV</span>
          </button>
        </div>

        {/* Transaction List */}
        <div className="overflow-y-auto max-h-[50vh] p-6 space-y-3">
          {filteredTxs.map((tx) => (
            <a
              key={tx.hash}
              href={`https://${network}.xrpl.org/transactions/${tx.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl bg-[#1A1F2B] border border-gray-800 hover:border-[#00E676]/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      tx.type === 'EscrowCreate' ? 'bg-[#2979FF]/10 text-[#2979FF] border border-[#2979FF]/30' :
                      tx.type === 'EscrowFinish' ? 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30' :
                      tx.type === 'Payment' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30' :
                      'bg-gray-700/50 text-gray-400 border border-gray-700'
                    }`}>
                      {tx.type}
                    </span>
                    <span className="text-white">{tx.amount}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-mono">{tx.hash}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-[#00E676] transition-colors" />
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Ledger #{tx.ledgerIndex}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-[#00E676]" />
                  <span>{new Date(tx.timestamp).toLocaleString('pt-BR')}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-800">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Dados sincronizados com XRPL Testnet</span>
            <a
              href={`https://${network}.xrpl.org/`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#00E676] hover:text-[#00C766] transition-colors"
            >
              <span>Ver no Explorer</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
