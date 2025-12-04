import React, { useState } from 'react';
import { QrCode, ArrowRight, CheckCircle, Copy, Share2, X, Info } from 'lucide-react';

interface PaymentPixProps {
  onClose?: () => void;
  onSuccess?: (receipt: PaymentReceipt) => void;
}

interface PaymentReceipt {
  id: string;
  amount: string;
  recipient: string;
  timestamp: string;
  txHash?: string;
}

type PaymentStep = 'input' | 'review' | 'auth' | 'success';

export function PaymentPix({ onClose, onSuccess }: PaymentPixProps) {
  const [step, setStep] = useState<PaymentStep>('input');
  const [pixKey, setPixKey] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [scanMode, setScanMode] = useState(false);

  const handleNumPad = (digit: string) => {
    if (digit === 'C') {
      setAmount('');
    } else if (digit === '←') {
      setAmount(amount.slice(0, -1));
    } else {
      // Format as currency (max 2 decimals)
      const newAmount = amount + digit;
      if (newAmount.length <= 10) {
        setAmount(newAmount);
      }
    }
  };

  const formatAmount = (value: string) => {
    if (!value) return 'R$ 0,00';
    const num = parseFloat(value) / 100;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleReview = () => {
    if (!pixKey || !amount) return;
    setStep('review');
  };

  const handleAuth = async () => {
    setStep('auth');
    setProcessing(true);

    // Simula autenticação biométrica + conversão R$ → RLUSD + Escrow
    await new Promise(resolve => setTimeout(resolve, 2500));

    const receiptData: PaymentReceipt = {
      id: `PIX-${Date.now()}`,
      amount: formatAmount(amount),
      recipient: pixKey,
      timestamp: new Date().toLocaleString('pt-BR'),
      txHash: 'ABC123DEF456...', // Mock - seria retornado pelo backend
    };

    setReceipt(receiptData);
    setProcessing(false);
    setStep('success');
    onSuccess?.(receiptData);
  };

  const handleScanQR = () => {
    setScanMode(true);
    // Em produção: abrir câmera e scanner QR
    // Mock: auto-preencher após 1s
    setTimeout(() => {
      setPixKey('pix@exemplo.com.br');
      setScanMode(false);
    }, 1000);
  };

  const handleCopyReceipt = () => {
    if (receipt) {
      const text = `PAYHUB - Comprovante\nID: ${receipt.id}\nValor: ${receipt.amount}\nDestino: ${receipt.recipient}\nData: ${receipt.timestamp}`;
      navigator.clipboard.writeText(text);
    }
  };

  const handleShareReceipt = async () => {
    if (receipt && navigator.share) {
      try {
        await navigator.share({
          title: 'Comprovante PAYHUB',
          text: `Pagamento de ${receipt.amount} para ${receipt.recipient}`,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-0 md:p-4">
      <div className="bg-[#1A1F2B] rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white">Pagamento PIX</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Step 1: Input */}
          {step === 'input' && (
            <div className="p-6 space-y-6">
              {/* PIX Key Input */}
              <div>
                <label className="block text-sm text-gray-300 mb-2">Chave PIX</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pixKey}
                    onChange={(e) => setPixKey(e.target.value)}
                    placeholder="CPF, e-mail, telefone ou chave aleatória"
                    className="flex-1 px-4 py-3 rounded-lg bg-[#0F1218] border border-gray-700 text-white focus:border-[#2979FF] focus:outline-none"
                  />
                  <button
                    onClick={handleScanQR}
                    disabled={scanMode}
                    className="px-4 py-3 rounded-lg bg-[#2979FF]/10 border border-[#2979FF]/30 hover:bg-[#2979FF]/20 transition-colors"
                  >
                    <QrCode className={`w-5 h-5 text-[#2979FF] ${scanMode ? 'animate-pulse' : ''}`} />
                  </button>
                </div>
                {scanMode && (
                  <p className="text-xs text-[#2979FF] mt-2">Escaneando QR Code...</p>
                )}
              </div>

              {/* Amount Display */}
              <div className="text-center py-8">
                <p className="text-sm text-gray-400 mb-2">Valor</p>
                <p className="text-4xl text-white font-light">{formatAmount(amount)}</p>
              </div>

              {/* Numeric Keypad */}
              <div className="grid grid-cols-3 gap-3">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleNumPad(key)}
                    className="h-16 rounded-lg bg-[#0F1218] hover:bg-[#252B3A] border border-gray-800 text-white text-xl transition-colors active:scale-95"
                  >
                    {key}
                  </button>
                ))}
              </div>

              <button
                onClick={handleReview}
                disabled={!pixKey || !amount || parseInt(amount) === 0}
                className="w-full px-6 py-4 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 text-white transition-all flex items-center justify-center gap-2"
              >
                <span>Continuar</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Review */}
          {step === 'review' && (
            <div className="p-6 space-y-6">
              <div className="bg-[#0F1218] border border-gray-800 rounded-xl p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Valor</p>
                  <p className="text-2xl text-white">{formatAmount(amount)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Destino</p>
                  <p className="text-white break-all">{pixKey}</p>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                    <Info className="w-3 h-3" />
                    <span>Conversão automática R$ → RLUSD + liquidação via Escrow D+0</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep('input')}
                  className="flex-1 px-6 py-4 rounded-lg bg-transparent border border-gray-700 text-white hover:bg-gray-800 transition-colors"
                >
                  Voltar
                </button>
                <button
                  onClick={handleAuth}
                  className="flex-1 px-6 py-4 rounded-lg bg-[#00E676] hover:bg-[#00C766] text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>Confirmar</span>
                  <CheckCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Auth (Biometric/Processing) */}
          {step === 'auth' && (
            <div className="p-6 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-20 h-20 rounded-full bg-[#2979FF]/10 flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full border-4 border-[#2979FF] border-t-transparent animate-spin" />
              </div>
              <p className="text-white mb-2">Processando pagamento...</p>
              <p className="text-sm text-gray-400 text-center">
                Convertendo R$ → RLUSD e criando Escrow
              </p>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 'success' && receipt && (
            <div className="p-6 space-y-6">
              <div className="flex flex-col items-center text-center py-8">
                <div className="w-20 h-20 rounded-full bg-[#00E676]/10 flex items-center justify-center mb-4">
                  <CheckCircle className="w-12 h-12 text-[#00E676]" />
                </div>
                <h3 className="text-white mb-2">Pagamento realizado!</h3>
                <p className="text-2xl text-white font-light mb-1">{receipt.amount}</p>
                <p className="text-sm text-gray-400">para {receipt.recipient}</p>
              </div>

              <div className="bg-[#0F1218] border border-gray-800 rounded-xl p-6 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">ID</span>
                  <span className="text-sm text-white font-mono">{receipt.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Data/Hora</span>
                  <span className="text-sm text-white">{receipt.timestamp}</span>
                </div>
                {receipt.txHash && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-400">txHash</span>
                    <span className="text-sm text-white font-mono">{receipt.txHash}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopyReceipt}
                  className="flex-1 px-6 py-3 rounded-lg bg-[#1A1F2B] border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copiar</span>
                </button>
                <button
                  onClick={handleShareReceipt}
                  className="flex-1 px-6 py-3 rounded-lg bg-[#1A1F2B] border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartilhar</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="w-full px-6 py-4 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white transition-all"
              >
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
