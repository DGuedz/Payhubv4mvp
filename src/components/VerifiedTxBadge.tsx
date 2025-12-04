import { CheckCircle2, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VerifiedTxBadgeProps {
  txHash: string;
  timestamp: number;
  inline?: boolean;
  network?: 'testnet' | 'mainnet';
}

export function VerifiedTxBadge({ 
  txHash, 
  timestamp, 
  inline = false,
  network = 'testnet'
}: VerifiedTxBadgeProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const diff = Date.now() - timestamp;
      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        setTimeAgo(`${days}d`);
      } else if (hours > 0) {
        setTimeAgo(`${hours}h`);
      } else if (minutes > 0) {
        setTimeAgo(`${minutes}m`);
      } else {
        setTimeAgo(`${seconds}s`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timestamp]);

  const explorerUrl = network === 'testnet'
    ? `https://testnet.xrpl.org/transactions/${txHash}`
    : `https://livenet.xrpl.org/transactions/${txHash}`;

  if (inline) {
    return (
      <a
        href={explorerUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#00E676]/10 hover:bg-[#00E676]/20 border border-[#00E676]/30 hover:border-[#00E676]/50 text-[#00E676] text-xs transition-all group"
      >
        <CheckCircle2 className="w-3 h-3" />
        <span>Verificada {timeAgo}</span>
        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  }

  return (
    <a
      href={explorerUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#00E676]/5 hover:bg-[#00E676]/10 border border-[#00E676]/20 hover:border-[#00E676]/40 transition-all group"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
        </div>
        <div>
          <p className="text-white text-sm">TX Verificada</p>
          <p className="text-xs text-gray-400 font-mono">{txHash.slice(0, 12)}...</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-[#00E676]">{timeAgo} atrás</span>
        <ExternalLink className="w-4 h-4 text-[#00E676] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </a>
  );
}
