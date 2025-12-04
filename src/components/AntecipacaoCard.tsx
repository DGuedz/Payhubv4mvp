import React, { useState } from 'react';
import { Zap, TrendingUp, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface AntecipacaoCardProps {
  escrowValue?: string;
  owner?: string;
  offerSequence?: number;
  onAntecipate?: (amount: string) => Promise<void>;
}

export function AntecipacaoCard({
  escrowValue,
  owner,
  offerSequence,
  onAntecipate,
}: AntecipacaoCardProps) {
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const calculateAntecipacao = (value: string) => {
    const num = parseFloat(value);
    return {
      total: num,
      antecipado: (num * 0.95).toFixed(2),
      taxa: (num * 0.05).toFixed(2),
      percentual: '5%',
    };
  };

  const handleAntecipate = async () => {
    if (!escrowValue || !onAntecipate) return;

    setProcessing(true);
    try {
      const calc = calculateAntecipacao(escrowValue);
      await onAntecipate(calc.antecipado);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Erro na antecipação:', error);
    } finally {
      setProcessing(false);
    }
  };

  const calc = escrowValue ? calculateAntecipacao(escrowValue) : null;

  return (
    <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
            <Zap className="w-6 h-6 text-[#00E676]" />
          </div>
          <div>
            <h3 className="text-white">Antecipação de Recebíveis</h3>
            <p className="text-sm text-gray-400">Receba 95% hoje</p>
          </div>
        </div>
        {success && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E676]/10">
            <CheckCircle className="w-3.5 h-3.5 text-[#00E676]" />
            <span className="text-xs text-[#00E676]">Antecipado</span>
          </div>
        )}
      </div>

      {escrowValue && calc ? (
        <div className="space-y-4">
          {/* Calculation Breakdown */}
          <div className="bg-[#0F1218] border border-gray-800 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Valor do Escrow</span>
              <span className="text-white">{calc.total} RLUSD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Você recebe (95%)</span>
              <span className="text-xl text-[#00E676]">{calc.antecipado} RLUSD</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-gray-800">
              <span className="text-xs text-gray-500">Taxa de antecipação</span>
              <span className="text-xs text-gray-400">{calc.taxa} RLUSD ({calc.percentual})</span>
            </div>
          </div>

          {/* Escrow Info */}
          {owner && offerSequence && (
            <div className="p-3 rounded-lg bg-[#2979FF]/5 border border-[#2979FF]/20">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-[#2979FF] flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Escrow vinculado:</p>
                  <p className="text-xs text-white font-mono">
                    offerSequence: {offerSequence}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleAntecipate}
            disabled={processing || success}
            className="w-full px-6 py-4 rounded-lg bg-[#00E676] hover:bg-[#00C766] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processando...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>Antecipado com Sucesso</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-5 h-5" />
                <span>Antecipar 95% Agora</span>
              </>
            )}
          </button>

          {/* Info */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-[#2979FF]/5 border border-[#2979FF]/20">
            <Calendar className="w-4 h-4 text-[#2979FF] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400">
              Liquidação D+0 • Sem burocracia • Compliance CARF/OCDE
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-gray-600" />
          </div>
          <p className="text-gray-400 text-sm mb-2">Nenhum Escrow disponível</p>
          <p className="text-xs text-gray-500">
            Crie um Escrow RLUSD primeiro para antecipar recebíveis
          </p>
        </div>
      )}
    </div>
  );
}
