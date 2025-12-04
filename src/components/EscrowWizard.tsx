import React, { useState } from 'react';
import { CheckCircle, ArrowRight, Loader2, Link2, Lock, Coins, Unlock } from 'lucide-react';
import { createSDK } from '../sdk/payhub';

type Step = 'trustline' | 'create' | 'advance' | 'finish';

interface StepData {
  trustline?: { limit: string; txHash?: string; sequence?: number };
  create?: { value: string; owner?: string; offerSequence?: number; txHash?: string };
  advance?: { financedAmount?: string; destination?: string };
  finish?: { txHash?: string; sequence?: number };
}

export function EscrowWizard() {
  const [currentStep, setCurrentStep] = useState<Step>('trustline');
  const [processing, setProcessing] = useState(false);
  const [stepData, setStepData] = useState<StepData>({});
  const [formData, setFormData] = useState({
    trustlineLimit: '10000',
    escrowValue: '5000',
    owner: '',
    offerSequence: '',
  });
  const [error, setError] = useState<string | null>(null);

  // Initialize SDK (in production, get token from auth context)
  const sdk = createSDK({
    baseUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL || 'http://localhost:3000',
    token: 'demo-token', // Replace with actual JWT from auth
  });

  const steps = [
    { id: 'trustline' as Step, label: 'Trustline RLUSD', icon: Link2 },
    { id: 'create' as Step, label: 'Criar Escrow', icon: Lock },
    { id: 'advance' as Step, label: 'Antecipação 95%', icon: Coins },
    { id: 'finish' as Step, label: 'Finalizar Escrow', icon: Unlock },
  ];

  const getCurrentStepIndex = () => steps.findIndex(s => s.id === currentStep);

  const handleTrustlineSubmit = async () => {
    setProcessing(true);
    setError(null);
    try {
      // Chamada real: POST /api/trustline-rlusd via SDK
      const result = await sdk.trustline.create(formData.trustlineLimit);
      
      if (result.ok) {
        setStepData({
          ...stepData,
          trustline: {
            limit: formData.trustlineLimit,
            txHash: result.txHash,
            sequence: result.sequence,
          },
        });
        setCurrentStep('create');
      } else {
        setError(result.error || 'Erro ao criar Trustline');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setProcessing(false);
    }
  };

  const handleCreateSubmit = async () => {
    setProcessing(true);
    setError(null);
    try {
      // Chamada real: POST /api/escrow-create via SDK
      const result = await sdk.escrow.create(formData.escrowValue);
      
      if (result.ok) {
        setStepData({
          ...stepData,
          create: {
            value: formData.escrowValue,
            owner: result.owner,
            offerSequence: result.offerSequence,
            txHash: result.txHash,
          },
        });
        setFormData({ 
          ...formData, 
          owner: result.owner, 
          offerSequence: String(result.offerSequence) 
        });
        setCurrentStep('advance');
      } else {
        setError(result.error || 'Erro ao criar Escrow');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setProcessing(false);
    }
  };

  const handleAdvanceContinue = () => {
    const financedAmount = (parseFloat(formData.escrowValue) * 0.95).toFixed(2);
    setStepData({
      ...stepData,
      advance: {
        financedAmount,
        destination: 'rDEST1NAT1ON...', // Mock
      },
    });
    setCurrentStep('finish');
  };

  const handleFinishSubmit = async () => {
    setProcessing(true);
    setError(null);
    try {
      // Chamada real: POST /api/escrow-finish via SDK
      const result = await sdk.escrow.finish(
        formData.owner, 
        parseInt(formData.offerSequence)
      );
      
      if (result.ok) {
        setStepData({
          ...stepData,
          finish: {
            txHash: result.txHash,
            sequence: result.sequence,
          },
        });
      } else {
        setError(result.error || 'Erro ao finalizar Escrow');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index < getCurrentStepIndex();
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-[#00E676] border-[#00E676]'
                        : isCurrent
                        ? 'bg-[#2979FF] border-[#2979FF]'
                        : 'bg-[#1A1F2B] border-gray-700'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <Icon className={`w-6 h-6 ${isCurrent ? 'text-white' : 'text-gray-500'}`} />
                    )}
                  </div>
                  <span className={`mt-2 text-xs text-center ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      isCompleted ? 'bg-[#00E676]' : 'bg-gray-700'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20">
          <p className="text-sm text-[#EF4444]">{error}</p>
        </div>
      )}

      {/* Step Content */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-8">
        {/* Trustline Step */}
        {currentStep === 'trustline' && (
          <div>
            <h3 className="text-white mb-2">Configure a Trustline RLUSD</h3>
            <p className="text-sm text-gray-400 mb-6">
              Estabeleça confiança com o emissor RLUSD definindo um limite.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Limite RLUSD</label>
                <input
                  type="text"
                  value={formData.trustlineLimit}
                  onChange={(e) => setFormData({ ...formData, trustlineLimit: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F1218] border border-gray-700 text-white focus:border-[#2979FF] focus:outline-none transition-colors"
                  placeholder="10000"
                />
              </div>
              {stepData.trustline?.txHash && (
                <div className="p-4 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20">
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-white">txHash:</strong> {stepData.trustline.txHash}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Sequence:</strong> {stepData.trustline.sequence}
                  </p>
                </div>
              )}
              <button
                onClick={handleTrustlineSubmit}
                disabled={processing}
                className="w-full px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processando...</span>
                  </>
                ) : (
                  <>
                    <span>Criar Trustline</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Create Escrow Step */}
        {currentStep === 'create' && (
          <div>
            <h3 className="text-white mb-2">Criar Escrow RLUSD</h3>
            <p className="text-sm text-gray-400 mb-6">
              Defina o valor e capture o <strong className="text-white">offerSequence</strong> (o "CPF do Escrow").
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Valor RLUSD</label>
                <input
                  type="text"
                  value={formData.escrowValue}
                  onChange={(e) => setFormData({ ...formData, escrowValue: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-[#0F1218] border border-gray-700 text-white focus:border-[#2979FF] focus:outline-none transition-colors"
                  placeholder="5000"
                />
              </div>
              {stepData.create?.owner && (
                <div className="p-4 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20 space-y-2">
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Owner:</strong> {stepData.create.owner}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">offerSequence:</strong> {stepData.create.offerSequence}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">txHash:</strong> {stepData.create.txHash}
                  </p>
                </div>
              )}
              <button
                onClick={handleCreateSubmit}
                disabled={processing}
                className="w-full px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Criando Escrow...</span>
                  </>
                ) : (
                  <>
                    <span>Criar Escrow</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Advance Step */}
        {currentStep === 'advance' && (
          <div>
            <h3 className="text-white mb-2">Antecipação 95%</h3>
            <p className="text-sm text-gray-400 mb-6">
              Receba 95% do valor do Escrow como adiantamento (Payment RLUSD).
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-[#2979FF]/10 border border-[#2979FF]/20">
                <p className="text-sm text-gray-300 mb-1">
                  <strong className="text-white">Valor Financiado:</strong> {stepData.advance?.financedAmount} RLUSD
                </p>
                <p className="text-sm text-gray-300">
                  <strong className="text-white">Destino:</strong> {stepData.advance?.destination}
                </p>
              </div>
              <button
                onClick={handleAdvanceContinue}
                className="w-full px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Continuar para Finalização</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Finish Step */}
        {currentStep === 'finish' && (
          <div>
            <h3 className="text-white mb-2">Finalizar Escrow</h3>
            <p className="text-sm text-gray-400 mb-6">
              Use o <strong className="text-white">owner</strong> e <strong className="text-white">offerSequence</strong> para finalizar.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Owner</label>
                <input
                  type="text"
                  value={formData.owner}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-[#0F1218] border border-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">offerSequence</label>
                <input
                  type="text"
                  value={formData.offerSequence}
                  readOnly
                  className="w-full px-4 py-3 rounded-lg bg-[#0F1218] border border-gray-700 text-gray-400 cursor-not-allowed"
                />
              </div>
              {stepData.finish?.txHash && (
                <div className="p-4 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20">
                  <p className="text-sm text-white mb-2 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#00E676]" />
                    Escrow Finalizado com Sucesso!
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <strong className="text-white">txHash:</strong> {stepData.finish.txHash}
                  </p>
                  <p className="text-sm text-gray-300">
                    <strong className="text-white">Sequence:</strong> {stepData.finish.sequence}
                  </p>
                </div>
              )}
              <button
                onClick={handleFinishSubmit}
                disabled={processing || !!stepData.finish?.txHash}
                className="w-full px-6 py-3 rounded-lg bg-[#00E676] hover:bg-[#00C766] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Finalizando...</span>
                  </>
                ) : stepData.finish?.txHash ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Concluído</span>
                  </>
                ) : (
                  <>
                    <span>Finalizar Escrow</span>
                    <Unlock className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
