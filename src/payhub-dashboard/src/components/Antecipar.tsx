import React, { useState } from 'react';
import { X, Zap, TrendingDown, Check, AlertCircle } from 'lucide-react';

interface AnteciparProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function Antecipar({ onClose, onSuccess }: AnteciparProps) {
  const [etapa, setEtapa] = useState<'simular' | 'confirmar' | 'sucesso'>('simular');
  const [valorSelecionado, setValorSelecionado] = useState(3200.00);

  const aReceberPorData = [
    { data: 'Amanhã (28/11)', valor: 850.00, dias: 1 },
    { data: 'Sexta (29/11)', valor: 1200.00, dias: 2 },
    { data: 'Segunda (02/12)', valor: 650.00, dias: 5 },
    { data: 'Quarta (04/12)', valor: 500.00, dias: 7 },
  ];

  const calcularAntecipacao = (valor: number) => {
    const taxa = 0.05; // 5% de taxa
    const valorLiquido = valor * (1 - taxa);
    const taxaReal = valor - valorLiquido;
    return { valorLiquido, taxaReal };
  };

  const { valorLiquido, taxaReal } = calcularAntecipacao(valorSelecionado);

  const handleAntecipar = () => {
    setEtapa('confirmar');
  };

  const handleConfirmar = () => {
    setEtapa('sucesso');
    setTimeout(() => {
      onSuccess?.();
      onClose();
    }, 3000);
  };

  if (etapa === 'sucesso') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="bg-[#00E676] rounded-3xl p-8 max-w-sm w-full text-center animate-scale-up">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl text-white mb-2">Dinheiro liberado!</h2>
          <p className="text-2xl text-white mb-4">
            R$ {valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-white/70 text-sm">Já tá disponível na sua conta</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-0 md:p-4">
      <div className="bg-[#1A1F2B] rounded-t-3xl md:rounded-2xl w-full md:max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#00E676]" />
            </div>
            <h2 className="text-white text-xl">Receber Agora</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {etapa === 'simular' && (
            <>
              {/* Info */}
              <div className="bg-[#2979FF]/10 border border-[#2979FF]/20 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-300">
                  💡 <strong className="text-white">Antecipe suas vendas!</strong> Receba na hora 
                  o que só cairia nos próximos dias. Transparência total nas taxas.
                </p>
              </div>

              {/* Valor a Receber */}
              <div className="bg-[#0F1218] border border-gray-800 rounded-xl p-6 mb-6">
                <p className="text-gray-400 text-sm mb-2">Você tem a receber</p>
                <p className="text-4xl text-white mb-4">
                  R$ {valorSelecionado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                
                <div className="space-y-2">
                  {aReceberPorData.map((item, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{item.data}</span>
                      <span className="text-white">R$ {item.valor.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Simulação */}
              <div className="bg-gradient-to-br from-[#00E676]/10 to-[#2979FF]/10 border border-[#00E676]/20 rounded-xl p-6 mb-6">
                <p className="text-gray-300 text-sm mb-4">Se você antecipar tudo:</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Valor total</span>
                    <span className="text-white">R$ {valorSelecionado.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400 flex items-center gap-1">
                      <TrendingDown className="w-4 h-4" />
                      Taxa (5%)
                    </span>
                    <span className="text-[#F59E0B]">- R$ {taxaReal.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-700"></div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Você recebe agora</span>
                    <span className="text-2xl text-[#00E676]">
                      R$ {valorLiquido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 bg-[#2979FF]/10 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-[#2979FF] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-300">
                    O dinheiro cai na sua conta em menos de 1 minuto. Pode usar imediatamente.
                  </p>
                </div>
              </div>

              <button
                onClick={handleAntecipar}
                className="w-full py-4 rounded-xl bg-[#00E676] hover:bg-[#00C766] text-[#0F1218] text-lg transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                <span>Receber R$ {valorLiquido.toFixed(2)} Agora</span>
              </button>
            </>
          )}

          {etapa === 'confirmar' && (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-[#00E676]/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-10 h-10 text-[#00E676]" />
                </div>
                <h3 className="text-2xl text-white mb-2">Confirma?</h3>
                <p className="text-gray-400">Você vai receber na hora</p>
              </div>

              <div className="bg-[#0F1218] border border-gray-800 rounded-xl p-6 mb-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor a receber</span>
                  <span className="text-white">R$ {valorSelecionado.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Taxa de antecipação</span>
                  <span className="text-[#F59E0B]">- R$ {taxaReal.toFixed(2)}</span>
                </div>
                <div className="h-px bg-gray-700"></div>
                <div className="flex justify-between">
                  <span className="text-white">Vai cair na conta</span>
                  <span className="text-2xl text-[#00E676]">R$ {valorLiquido.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirmar}
                  className="w-full py-4 rounded-xl bg-[#00E676] hover:bg-[#00C766] text-[#0F1218] text-lg transition-all"
                >
                  ✓ Sim, confirmar antecipação
                </button>
                <button
                  onClick={() => setEtapa('simular')}
                  className="w-full py-4 rounded-xl bg-transparent border-2 border-gray-700 hover:border-gray-600 text-white transition-all"
                >
                  Voltar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
