import React, { useState } from 'react';
import { GitBranch, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { createSDK } from '../sdk/payhub';

interface PathResult {
  pathsCount: number;
  status: 'idle' | 'searching' | 'found' | 'not_found' | 'error';
}

export function AMMCard() {
  const [formData, setFormData] = useState({
    sourceAccount: '',
    destinationAccount: '',
    deliverValue: '',
    deliverIssuer: '',
  });
  const [result, setResult] = useState<PathResult>({
    pathsCount: 0,
    status: 'idle',
  });

  // Initialize SDK (in production, get token from auth context)
  const sdk = createSDK({
    baseUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL || 'http://localhost:3000',
    token: 'demo-token', // Replace with actual JWT from auth
  });

  const handleSearch = async () => {
    setResult({ pathsCount: 0, status: 'searching' });
    
    try {
      // Converte RLUSD para 160-bit hex
      const deliverCurrency = sdk.currencyHex('RLUSD');
      
      // Chamada real: POST /api/amm/quote via SDK
      const quoteResult = await sdk.amm.quote({
        sourceAccount: formData.sourceAccount,
        destinationAccount: formData.destinationAccount,
        deliverCurrency,
        deliverIssuer: formData.deliverIssuer,
        deliverValue: formData.deliverValue,
      });
      
      if (quoteResult.ok) {
        setResult({
          pathsCount: quoteResult.pathsCount,
          status: quoteResult.pathsCount > 0 ? 'found' : 'not_found',
        });
      } else {
        setResult({
          pathsCount: 0,
          status: 'error',
        });
      }
    } catch (err) {
      setResult({
        pathsCount: 0,
        status: 'error',
      });
    }
  };

  return (
    <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6 h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#2979FF]/10 flex items-center justify-center">
            <GitBranch className="w-6 h-6 text-[#2979FF]" />
          </div>
          <div>
            <h3 className="text-white">Roteamento AMM</h3>
            <p className="text-sm text-gray-400">ripple_path_find</p>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-6">
        Encontre as melhores rotas de liquidez usando AMM da XRPL. Transparência total com exibição de pathsCount.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Conta Origem</label>
          <input
            type="text"
            value={formData.sourceAccount}
            onChange={(e) => setFormData({ ...formData, sourceAccount: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#0F1218] border border-gray-700 text-white text-sm focus:border-[#2979FF] focus:outline-none transition-colors"
            placeholder="rN7n7otQDd6FczFg..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Conta Destino</label>
          <input
            type="text"
            value={formData.destinationAccount}
            onChange={(e) => setFormData({ ...formData, destinationAccount: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#0F1218] border border-gray-700 text-white text-sm focus:border-[#2979FF] focus:outline-none transition-colors"
            placeholder="rDEST1NAT1ON..."
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Valor RLUSD</label>
          <input
            type="text"
            value={formData.deliverValue}
            onChange={(e) => setFormData({ ...formData, deliverValue: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#0F1218] border border-gray-700 text-white text-sm focus:border-[#2979FF] focus:outline-none transition-colors"
            placeholder="1000"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Emissor RLUSD</label>
          <input
            type="text"
            value={formData.deliverIssuer}
            onChange={(e) => setFormData({ ...formData, deliverIssuer: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#0F1218] border border-gray-700 text-white text-sm focus:border-[#2979FF] focus:outline-none transition-colors"
            placeholder="rEMISSOR..."
          />
        </div>

        {result.status === 'found' && (
          <div className="p-4 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-[#00E676]" />
              <span className="text-white">Rotas Encontradas</span>
            </div>
            <p className="text-sm text-gray-300">
              <strong className="text-white">pathsCount:</strong> {result.pathsCount}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {result.pathsCount} rota{result.pathsCount > 1 ? 's' : ''} de liquidez disponível{result.pathsCount > 1 ? 'eis' : ''} via AMM
            </p>
          </div>
        )}

        {result.status === 'not_found' && (
          <div className="p-4 rounded-lg bg-[#F59E0B]/10 border border-[#F59E0B]/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-white">Nenhuma rota encontrada</span>
            </div>
            <p className="text-xs text-gray-400">
              Não foram encontradas rotas de liquidez para os parâmetros informados.
              Verifique os endereços e tente novamente.
            </p>
          </div>
        )}

        <button
          onClick={handleSearch}
          disabled={result.status === 'searching'}
          className="w-full px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
        >
          {result.status === 'searching' ? (
            <>
              <Search className="w-5 h-5 animate-pulse" />
              <span>Buscando rotas...</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              <span>Buscar Rotas AMM</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
