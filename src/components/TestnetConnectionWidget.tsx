import { Activity, CheckCircle2, AlertCircle, WifiOff } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TestnetConnectionWidgetProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

type ConnectionStatus = 'connected' | 'connecting' | 'disconnected' | 'error';

export function TestnetConnectionWidget({ 
  size = 'md', 
  showLabel = true 
}: TestnetConnectionWidgetProps) {
  const [status, setStatus] = useState<ConnectionStatus>('connected');
  const [ledgerIndex, setLedgerIndex] = useState(42891234);

  useEffect(() => {
    // Simulate connection monitoring
    const interval = setInterval(() => {
      // In production, this would check actual WebSocket connection
      const random = Math.random();
      if (random > 0.95) {
        setStatus('error');
        setTimeout(() => setStatus('connected'), 2000);
      } else {
        setStatus('connected');
        setLedgerIndex(prev => prev + 1);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: CheckCircle2,
          color: 'text-[#00E676]',
          bg: 'bg-[#00E676]/10',
          border: 'border-[#00E676]/30',
          label: 'Conectado',
          pulse: true
        };
      case 'connecting':
        return {
          icon: Activity,
          color: 'text-[#2979FF]',
          bg: 'bg-[#2979FF]/10',
          border: 'border-[#2979FF]/30',
          label: 'Conectando...',
          pulse: true
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-[#F59E0B]',
          bg: 'bg-[#F59E0B]/10',
          border: 'border-[#F59E0B]/30',
          label: 'Erro',
          pulse: false
        };
      case 'disconnected':
        return {
          icon: WifiOff,
          color: 'text-gray-500',
          bg: 'bg-gray-500/10',
          border: 'border-gray-500/30',
          label: 'Desconectado',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  // Size configurations
  const sizeConfig = {
    sm: {
      container: 'px-2 py-1',
      icon: 'w-3 h-3',
      dot: 'w-1.5 h-1.5',
      text: 'text-xs',
      gap: 'gap-1.5'
    },
    md: {
      container: 'px-3 py-1.5',
      icon: 'w-4 h-4',
      dot: 'w-2 h-2',
      text: 'text-sm',
      gap: 'gap-2'
    },
    lg: {
      container: 'px-4 py-2',
      icon: 'w-5 h-5',
      dot: 'w-2.5 h-2.5',
      text: 'text-base',
      gap: 'gap-3'
    }
  };

  const s = sizeConfig[size];

  if (!showLabel) {
    // Compact version - just dot
    return (
      <div className={`inline-flex items-center ${s.gap}`}>
        <div className={`${s.dot} rounded-full ${config.color.replace('text-', 'bg-')} ${config.pulse ? 'animate-pulse' : ''}`} />
        <span className={`${s.text} ${config.color}`}>XRPL</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${s.gap} ${s.container} rounded-lg ${config.bg} border ${config.border}`}>
      <div className="relative">
        <Icon className={`${s.icon} ${config.color}`} />
        {config.pulse && (
          <div className={`absolute inset-0 ${s.icon} ${config.color} animate-ping opacity-75`} />
        )}
      </div>
      <div className="flex items-center gap-2">
        <span className={`${s.text} ${config.color}`}>{config.label}</span>
        {status === 'connected' && (
          <>
            <span className={`${s.text} text-gray-600`}>•</span>
            <span className={`${s.text} text-gray-400 font-mono`}>#{ledgerIndex}</span>
          </>
        )}
      </div>
    </div>
  );
}
