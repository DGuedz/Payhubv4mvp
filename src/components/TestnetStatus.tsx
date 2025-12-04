import { ExternalLink, CheckCircle2, Clock, Activity } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TestnetStatusProps {
  lastTxHash?: string;
  lastTxAmount?: string;
  lastTxTime?: number;
  network?: 'testnet' | 'mainnet';
}

export function TestnetStatus({ 
  lastTxHash = 'TST9A8B7C6D5E4F3G2H1',
  lastTxAmount = 'R$ 150,00',
  lastTxTime = Date.now() - 45000,
  network = 'testnet'
}: TestnetStatusProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const diff = Date.now() - lastTxTime;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);

      if (hours > 0) {
        setTimeAgo(`${hours}h atrás`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes}min atrás`);
      } else {
        setTimeAgo(`${seconds}s atrás`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lastTxTime]);

  const explorerUrl = network === 'testnet' 
    ? `https://testnet.xrpl.org/transactions/${lastTxHash}`
    : `https://livenet.xrpl.org/transactions/${lastTxHash}`;

  return (
    <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6 hover:border-[#00E676]/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-[#00E676]" />
          </div>
          <div>
            <h3 className="text-white mb-1">Última Transação Testnet</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
              <span className="text-xs text-gray-400">{timeAgo}</span>
            </div>
          </div>
        </div>
        <span className="px-2 py-1 rounded-lg text-xs bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
          Verificada
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Valor</span>
          <span className="text-white">{lastTxAmount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">TX Hash</span>
          <span className="text-xs text-[#00E676] font-mono">{lastTxHash.slice(0, 16)}...</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Rede</span>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm">XRPL {network === 'testnet' ? 'Testnet' : 'Mainnet'}</span>
            <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
          </div>
        </div>
      </div>

      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#00E676]/5 hover:bg-[#00E676]/10 border border-[#00E676]/20 hover:border-[#00E676]/40 text-[#00E676] text-sm transition-all group"
      >
        <span>🔍 Auditar no XRPL Explorer</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    </div>
  );
}
