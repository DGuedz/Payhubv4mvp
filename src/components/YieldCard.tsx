import React, { useState } from 'react';
import { TrendingUp, Loader2, CheckCircle, Info } from 'lucide-react';
import { createSDK } from '../sdk/payhub';

type YieldStatus = 'inactive' | 'pending' | 'active';

export function YieldCard() {
  const [status, setStatus] = useState<YieldStatus>('inactive');
  const [error, setError] = useState<string | null>(null);

  // Initialize SDK (in production, get token from auth context)
  const sdk = createSDK({
    baseUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL || 'http://localhost:3000',
    token: 'demo-token', // Replace with actual JWT from auth
  });

  const handleActivate = async () => {
    setStatus('pending');
    setError(null);
    try {
      // Chamada real: POST /api/v1/merchant/yield/activate via SDK
      const result = await sdk.yield.activate();
      
      if (result.ok) {
        setStatus(result.status || 'active');
      } else {
        setError(result.error || 'Erro ao ativar yield');
        setStatus('inactive');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setStatus('inactive');
    }
  };

  return (
    <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            status === 'active' ? 'bg-[#00E676]/10' : 'bg-[#2979FF]/10'
          }`}>
            <TrendingUp className={`w-6 h-6 ${
              status === 'active' ? 'text-[#00E676]' : 'text-[#2979FF]'
            }`} />
          </div>
          <div>
            <h3 className="text-white">Yield Automático</h3>
            <p className="text-sm text-gray-400">5-8% APY</p>
          </div>
        </div>
        {status === 'active' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E676]/10">
            <CheckCircle className="w-3.5 h-3.5 text-[#00E676]" />
            <span className="text-xs text-[#00E676]">Ativo</span>
          </div>
        )}
        {status === 'pending' && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F59E0B]/10">
            <Loader2 className="w-3.5 h-3.5 text-[#F59E0B] animate-spin" />
            <span className="text-xs text-[#F59E0B]">Ativando</span>
          </div>
        )}
      </div>

      <p className="text-sm text-gray-400 mb-6">
        Ative o yield e otimize saldo excedente com estratégia segura na XRPL EVM Sidechain.
        Rendimento automático sem bloqueio de liquidez.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
          <p className="text-xs text-[#EF4444]">{error}</p>
        </div>
      )}

      {status === 'active' ? (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-[#00E676]/5 border border-[#00E676]/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Saldo em Yield</span>
              <span className="text-white">2,450.00 RLUSD</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">APY Atual</span>
              <span className="text-[#00E676]">6.2%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Rendimento (30d)</span>
              <span className="text-white">+12.35 RLUSD</span>
            </div>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[#2979FF]/5 border border-[#2979FF]/20">
            <Info className="w-4 h-4 text-[#2979FF] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400">
              Saldo disponível para saque a qualquer momento. Rendimento calculado diariamente.
            </p>
          </div>
        </div>
      ) : (
        <button
          onClick={handleActivate}
          disabled={status === 'pending'}
          className="w-full px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
        >
          {status === 'pending' ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Ativando Yield...</span>
            </>
          ) : (
            <>
              <TrendingUp className="w-5 h-5" />
              <span>Ativar Yield</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
