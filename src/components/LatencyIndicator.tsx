import { Activity, Zap, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LatencyIndicatorProps {
  confirmationTime?: number; // in milliseconds
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function LatencyIndicator({ 
  confirmationTime = 3500, 
  showDetails = true,
  size = 'md'
}: LatencyIndicatorProps) {
  const [currentLatency, setCurrentLatency] = useState(confirmationTime);
  const [trend, setTrend] = useState<'stable' | 'improving' | 'degrading'>('stable');

  useEffect(() => {
    // Simulate real-time latency updates
    const interval = setInterval(() => {
      const variation = (Math.random() - 0.5) * 1000;
      const newLatency = Math.max(2000, Math.min(6000, confirmationTime + variation));
      
      if (newLatency < currentLatency - 200) setTrend('improving');
      else if (newLatency > currentLatency + 200) setTrend('degrading');
      else setTrend('stable');
      
      setCurrentLatency(newLatency);
    }, 5000);

    return () => clearInterval(interval);
  }, [confirmationTime, currentLatency]);

  const latencyMs = Math.round(currentLatency);
  const latencySeconds = (latencyMs / 1000).toFixed(1);
  
  const getStatusColor = () => {
    if (latencyMs < 3000) return { bg: 'bg-[#00E676]/10', text: 'text-[#00E676]', border: 'border-[#00E676]/30', label: 'Excelente' };
    if (latencyMs < 5000) return { bg: 'bg-[#2979FF]/10', text: 'text-[#2979FF]', border: 'border-[#2979FF]/30', label: 'Bom' };
    return { bg: 'bg-[#F59E0B]/10', text: 'text-[#F59E0B]', border: 'border-[#F59E0B]/30', label: 'Aceitável' };
  };

  const status = getStatusColor();

  if (size === 'sm' && !showDetails) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md ${status.bg} border ${status.border}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${status.text} animate-pulse`} />
        <span className={`text-xs ${status.text}`}>{latencySeconds}s</span>
      </div>
    );
  }

  if (size === 'md' && !showDetails) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${status.bg} border ${status.border}`}>
        <Zap className={`w-4 h-4 ${status.text}`} />
        <span className={`text-sm ${status.text}`}>{latencySeconds}s</span>
        <span className="text-xs text-gray-400">{status.label}</span>
      </div>
    );
  }

  return (
    <div className={`bg-[#1A1F2B] border border-gray-800 rounded-xl p-${size === 'lg' ? '6' : '4'} hover:border-[#00E676]/20 transition-all`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg ${status.bg} flex items-center justify-center`}>
            <Zap className={`w-5 h-5 ${status.text}`} />
          </div>
          <div>
            <p className="text-white text-sm">Latência de Confirmação</p>
            <p className="text-xs text-gray-400">XRPL Testnet</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-lg ${status.bg} border ${status.border}`}>
          <div className={`w-2 h-2 rounded-full ${status.text} animate-pulse`} />
        </div>
      </div>

      <div className="flex items-baseline gap-2 mb-4">
        <span className={`text-3xl ${status.text}`}>{latencySeconds}</span>
        <span className="text-gray-400 text-sm">segundos</span>
        {trend === 'improving' && (
          <span className="text-xs text-[#00E676]">↓ melhorando</span>
        )}
        {trend === 'degrading' && (
          <span className="text-xs text-[#F59E0B]">↑ degradando</span>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Status</span>
          <span className={status.text}>{status.label}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Objetivo</span>
          <span className="text-white">{'< 5s'}</span>
        </div>
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-400">Média 24h</span>
          <span className="text-white">3.2s</span>
        </div>
      </div>

      {/* Visual Bar */}
      <div className="mt-4 pt-4 border-t border-gray-800">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400">Performance</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className={`h-full ${
              latencyMs < 3000 ? 'bg-[#00E676]' : 
              latencyMs < 5000 ? 'bg-[#2979FF]' : 
              'bg-[#F59E0B]'
            } transition-all duration-500`}
            style={{ width: `${Math.min(100, (latencyMs / 6000) * 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 text-[10px] text-gray-500">
          <span>0s</span>
          <span>3s</span>
          <span>6s+</span>
        </div>
      </div>
    </div>
  );
}
