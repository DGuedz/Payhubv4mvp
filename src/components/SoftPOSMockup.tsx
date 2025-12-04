import React, { useState, useEffect } from 'react';
import { QrCode, Check, X, Loader2, ArrowLeft, Smartphone, User, Crown, Clock, AlertTriangle, FlaskConical, ExternalLink } from 'lucide-react';

interface SoftPOSMockupProps {
  onSaleComplete: (amount: string, txHash: string) => void;
  mode: 'employee' | 'owner';
}

export function SoftPOSMockup({ onSaleComplete, mode }: SoftPOSMockupProps) {
  const [amount, setAmount] = useState('');
  const [stage, setStage] = useState<'input' | 'qr' | 'processing' | 'delivered' | 'complete'>('input');
  const [devnetTx, setDevnetTx] = useState<string>('');
  const [escrowSequence, setEscrowSequence] = useState<number>(0);

  const handleNumberClick = (num: string) => {
    if (amount.length < 10) {
      setAmount(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setAmount(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setAmount('');
  };

  const formatAmount = (value: string) => {
    if (!value) return 'R$ 0,00';
    const numValue = parseFloat(value) / 100;
    return `R$ ${numValue.toFixed(2).replace('.', ',')}`;
  };

  const handleGenerateQR = () => {
    if (amount === '' || parseFloat(amount) === 0) return;
    setStage('qr');
  };

  const simulatePayment = () => {
    setStage('processing');
    
    // Simulate XRPL Testnet transaction
    setTimeout(() => {
      const mockTxHash = `TST${Math.random().toString(36).substring(2, 15).toUpperCase()}`;
      const mockSequence = Math.floor(Math.random() * 1000000) + 50000000;
      setDevnetTx(mockTxHash);
      setEscrowSequence(mockSequence);
      setStage('delivered');
    }, 2000);
  };

  const handleMarkAsDelivered = () => {
    setStage('complete');
    
    // Simulate EscrowFinish transaction
    setTimeout(() => {
      onSaleComplete(amount, devnetTx);
      // Reset after 2 seconds
      setTimeout(() => {
        setAmount('');
        setStage('input');
        setDevnetTx('');
        setEscrowSequence(0);
      }, 2000);
    }, 1500);
  };

  const handleBack = () => {
    if (stage === 'qr') {
      setStage('input');
    } else if (stage === 'delivered') {
      setStage('qr');
    }
  };

  return (
    <div className="relative">
      {/* Phone Frame */}
      <div className="w-full max-w-sm mx-auto">
        <div className="relative bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-gray-800 rounded-b-3xl z-10" />
          
          {/* Screen */}
          <div className="relative bg-[#0F1218] min-h-[680px] pt-10 pb-6 px-6">
            {/* Status Bar */}
            <div className="flex justify-between items-center text-white/60 text-xs mb-8 px-2">
              <span>9:41</span>
              <div className="flex gap-1 items-center">
                <div className="w-4 h-3 border border-white/60 rounded-sm">
                  <div className="w-2 h-full bg-white/60" />
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              {stage !== 'input' && (
                <button
                  onClick={handleBack}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
              )}
              {stage === 'input' && <div className="w-10" />}
              
              <h1 className="text-white text-lg">PAYHUB Soft-POS</h1>
              
              <div className="w-10 h-10 rounded-full bg-[#2979FF]/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#2979FF]" />
              </div>
            </div>

            {/* Mode Indicator */}
            <div className="mb-6 flex justify-center">
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs ${
                mode === 'employee' 
                  ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/30'
                  : 'bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30'
              }`}>
                {mode === 'employee' ? (
                  <>
                    <User className="w-3 h-3" />
                    <span>Modo Funcionário</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-3 h-3" />
                    <span>Modo Dono</span>
                  </>
                )}
              </div>
            </div>

            {/* Stage: Input Amount */}
            {stage === 'input' && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <p className="text-gray-400 text-sm mb-3">Valor da Venda</p>
                  <p className="text-white text-5xl font-light">{formatAmount(amount)}</p>
                </div>

                {/* Numeric Keypad */}
                <div className="grid grid-cols-3 gap-3">
                  {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'].map((key) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (key === '←') handleBackspace();
                        else if (key === '.') return; // Ignore decimal for cents-based input
                        else handleNumberClick(key);
                      }}
                      className="h-16 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xl transition-all active:scale-95 border border-white/10"
                    >
                      {key === '←' ? <ArrowLeft className="w-6 h-6 mx-auto" /> : key}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerateQR}
                  disabled={amount === '' || parseFloat(amount) === 0}
                  className="w-full py-4 rounded-xl bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 disabled:text-gray-500 text-white transition-all flex items-center justify-center gap-2"
                >
                  <QrCode className="w-5 h-5" />
                  <span>Gerar QR Code</span>
                </button>

                {amount !== '' && (
                  <button
                    onClick={handleClear}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-sm transition-all"
                  >
                    Limpar
                  </button>
                )}
              </div>
            )}

            {/* Stage: QR Code */}
            {stage === 'qr' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-sm mb-2">Valor da Venda</p>
                  <p className="text-white text-4xl">{formatAmount(amount)}</p>
                </div>

                {/* QR Code Display */}
                <div className="bg-white rounded-2xl p-6">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Simulated QR Code Pattern */}
                    <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-1 p-2">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div
                          key={i}
                          className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-white'} rounded-sm`}
                        />
                      ))}
                    </div>
                    <QrCode className="w-32 h-32 text-gray-300 relative z-10" />
                  </div>
                  <p className="text-center text-gray-600 text-xs mt-3">
                    QR Code Híbrido PIX/Cartão/Cripto
                  </p>
                </div>

                <div className="bg-[#2979FF]/10 border border-[#2979FF]/30 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-[#2979FF]" />
                    <p className="text-[#2979FF] text-sm">Aguardando pagamento do cliente...</p>
                  </div>
                </div>

                {/* Simulate Payment Button (for testing) */}
                <button
                  onClick={simulatePayment}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00E676] to-[#00C766] text-white transition-all flex items-center justify-center gap-2"
                >
                  <FlaskConical className="w-5 h-5" />
                  <span>Simular Pagamento Recebido</span>
                </button>
              </div>
            )}

            {/* Stage: Processing */}
            {stage === 'processing' && (
              <div className="space-y-6 text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#2979FF]/20 flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-[#2979FF] animate-spin" />
                </div>
                <div>
                  <h3 className="text-white text-xl mb-2">Processando na XRPL</h3>
                  <p className="text-gray-400 text-sm">Criando Escrow em Testnet...</p>
                </div>
                <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#00E676] animate-pulse" />
                    <p className="text-gray-400 text-xs">Conectando ao XRPL Testnet</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-[#2979FF] animate-pulse" />
                    <p className="text-gray-400 text-xs">Convertendo BRL → RLUSD</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#2979FF] animate-pulse" />
                    <p className="text-gray-400 text-xs">Bloqueando colateral on-chain</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stage: Delivered */}
            {stage === 'delivered' && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#00E676]/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#00E676]" />
                  </div>
                  <h3 className="text-white text-xl mb-2">Pagamento Bloqueado</h3>
                  <p className="text-gray-400 text-sm">Valor: {formatAmount(amount)}</p>
                </div>

                {/* Escrow Details */}
                <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Status</span>
                    <span className="px-2 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] text-xs">
                      Escrow Ativo
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Sequência</span>
                    <span className="text-white text-sm font-mono">{escrowSequence}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">TX Hash</span>
                    <span className="text-[#2979FF] text-xs font-mono">{devnetTx.slice(0, 12)}...</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Rede</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white text-sm">XRPL Testnet</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                        Público
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4">
                  <div className="flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />
                    <p className="text-[#F59E0B] text-sm">Aguardando confirmação de entrega do serviço</p>
                  </div>
                </div>

                <button
                  onClick={handleMarkAsDelivered}
                  className="w-full py-4 rounded-xl bg-[#00E676] hover:bg-[#00C766] text-white transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  <span>Marcar como Entregue</span>
                </button>
              </div>
            )}

            {/* Stage: Complete */}
            {stage === 'complete' && (
              <div className="space-y-6 text-center py-12">
                <div className="w-20 h-20 rounded-full bg-[#00E676]/20 flex items-center justify-center mx-auto animate-pulse">
                  <Check className="w-10 h-10 text-[#00E676]" />
                </div>
                <div>
                  <h3 className="text-white text-2xl mb-2">Liquidação D+0 Concluída!</h3>
                  <p className="text-gray-400">Valor creditado em 3-5 segundos</p>
                </div>
                <div className="bg-[#00E676]/10 border border-[#00E676]/30 rounded-xl p-6">
                  <p className="text-[#00E676] text-3xl mb-2">{formatAmount(amount)}</p>
                  <p className="text-gray-400 text-sm">adicionado ao seu saldo RLUSD</p>
                </div>
                <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 text-left space-y-2">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00E676]" />
                    <p className="text-gray-400 text-xs">EscrowFinish executado</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00E676]" />
                    <p className="text-gray-400 text-xs">RLUSD liberado da custódia</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#00E676]" />
                    <p className="text-gray-400 text-xs">Saldo atualizado on-chain</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-[#00E676]" />
                    <p className="text-gray-400 text-xs">Verificável em testnet.xrpl.org</p>
                  </div>
                  {mode === 'owner' && (
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#00E676]" />
                      <p className="text-gray-400 text-xs">Auto-Yield ativado (6.2% APY)</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
