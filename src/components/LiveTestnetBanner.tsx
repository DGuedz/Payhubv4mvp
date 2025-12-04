import { Activity, ExternalLink, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LiveTestnetBannerProps {
  showLatency?: boolean;
}

export function LiveTestnetBanner({ showLatency = true }: LiveTestnetBannerProps) {
  const [ledgerIndex, setLedgerIndex] = useState(42891234);
  const [latency, setLatency] = useState(3.4);

  useEffect(() => {
    // Simulate live ledger updates
    const ledgerInterval = setInterval(() => {
      setLedgerIndex(prev => prev + 1);
    }, 3500);

    // Simulate latency variations
    const latencyInterval = setInterval(() => {
      setLatency(2.5 + Math.random() * 2);
    }, 5000);

    return () => {
      clearInterval(ledgerInterval);
      clearInterval(latencyInterval);
    };
  }, []);

  return (
    <div className="bg-gradient-to-r from-[#00E676]/10 via-[#00E676]/5 to-transparent border border-[#00E676]/20 rounded-xl p-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
            <Activity className="w-5 h-5 text-[#00E676] animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4 className="text-white text-sm">XRPL Testnet ao Vivo</h4>
              <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
            </div>
            <p className="text-xs text-gray-400">Transações auditáveis publicamente</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {showLatency && (
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#00E676]" />
              <div>
                <p className="text-xs text-gray-400">Latência</p>
                <p className="text-white text-sm">{latency.toFixed(1)}s</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#2979FF]" />
            <div>
              <p className="text-xs text-gray-400">Ledger</p>
              <p className="text-white text-sm font-mono">#{ledgerIndex}</p>
            </div>
          </div>

          <a
            href="https://testnet.xrpl.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#00E676]/10 hover:bg-[#00E676]/20 border border-[#00E676]/30 hover:border-[#00E676]/50 text-[#00E676] text-xs transition-all group"
          >
            <span>Explorer</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
}
