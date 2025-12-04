import React, { useState } from 'react';
import { QrCode, Copy, Check, X, ArrowDownRight, RefreshCw, Info, Loader2, CheckCircle2 } from 'lucide-react';

interface ReceivePaymentProps {
  onClose?: () => void;
  onPaymentReceived?: (amount: string, method: 'pix' | 'xrpl') => void;
}

type ReceiveMethod = 'pix' | 'xrpl';
type PaymentStatus = 'idle' | 'simulating' | 'received';

export function ReceivePayment({ onClose, onPaymentReceived }: ReceivePaymentProps) {
  const [method, setMethod] = useState<ReceiveMethod>('pix');
  const [amount, setAmount] = useState('');
  const [pixKey] = useState('pix@payhub.example.com'); // Mock - viria do backend
  const [xrplAddress] = useState('rN7n7otQDd6FczFgLdcqvcMF4JkPw3zztD'); // Mock
  const [qrCodeGenerated, setQrCodeGenerated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  const handleNumPad = (digit: string) => {
    if (digit === 'C') {
      setAmount('');
    } else if (digit === '←') {
      setAmount(amount.slice(0, -1));
    } else {
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

  const handleGenerateQR = () => {
    // Integração: POST /api/v1/pix/dynamic-qr
    // Payload: { amount, pixKey }
    setQrCodeGenerated(true);
  };

  const handleCopy = () => {
    const textToCopy = method === 'pix' ? pixKey : xrplAddress;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePayment = () => {
    setPaymentStatus('simulating');
    
    // Simula recebimento após 2 segundos
    setTimeout(() => {
      setPaymentStatus('received');
      
      // Notifica o componente pai
      if (onPaymentReceived) {
        const paymentAmount = method === 'pix' && amount ? formatAmount(amount) : 'R$ 150,00';
        onPaymentReceived(paymentAmount, method);
      }

      // Fecha o modal após 2 segundos mostrando sucesso
      setTimeout(() => {
        onClose?.();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-0 md:p-4">
      <div className="bg-[#1A1F2B] rounded-t-2xl md:rounded-2xl w-full md:max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
              <ArrowDownRight className="w-5 h-5 text-[#00E676]" />
            </div>
            <h2 className="text-white">Receber Pagamento</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Method Toggle */}
          <div className="flex gap-2 bg-[#0F1218] rounded-lg p-1">
            <button
              onClick={() => setMethod('pix')}
              className={`flex-1 px-4 py-2.5 rounded-md transition-all ${
                method === 'pix'
                  ? 'bg-[#2979FF] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              PIX
            </button>
            <button
              onClick={() => setMethod('xrpl')}
              className={`flex-1 px-4 py-2.5 rounded-md transition-all ${
                method === 'xrpl'
                  ? 'bg-[#2979FF] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              XRPL
            </button>
          </div>

          {/* Amount Input (for PIX dynamic QR) */}
          {method === 'pix' && (
            <>
              <div className="text-center py-6">
                <p className="text-sm text-gray-400 mb-2">Valor (opcional para QR dinâmico)</p>
                <p className="text-4xl text-white font-light">{formatAmount(amount)}</p>
              </div>

              {/* Numeric Keypad */}
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleNumPad(key)}
                    className="h-14 rounded-lg bg-[#0F1218] hover:bg-[#252B3A] border border-gray-800 text-white text-lg transition-colors active:scale-95"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* QR Code Display */}
          {qrCodeGenerated || method === 'xrpl' ? (
            <div className="bg-[#0F1218] border border-gray-800 rounded-xl p-8 relative">
              {/* Payment Received Overlay */}
              {paymentStatus === 'received' && (
                <div className="absolute inset-0 bg-[#00E676]/10 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <CheckCircle2 className="w-16 h-16 text-[#00E676] mx-auto mb-3 animate-bounce" />
                    <p className="text-white text-lg">Pagamento Recebido!</p>
                    <p className="text-gray-400 text-sm mt-1">Liquidação D+0 processada</p>
                  </div>
                </div>
              )}

              {/* Mock QR Code */}
              <div className="aspect-square bg-white rounded-lg flex items-center justify-center mb-4">
                <QrCode className="w-32 h-32 text-gray-800" />
              </div>

              {/* Address/Key Display */}
              <div className="bg-[#1A1F2B] border border-gray-700 rounded-lg p-4">
                <p className="text-xs text-gray-400 mb-2">
                  {method === 'pix' ? 'Chave PIX' : 'Endereço XRPL'}
                </p>
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-white font-mono truncate">
                    {method === 'pix' ? pixKey : xrplAddress}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="flex-shrink-0 p-2 rounded-lg bg-[#2979FF]/10 hover:bg-[#2979FF]/20 border border-[#2979FF]/30 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-[#00E676]" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#2979FF]" />
                    )}
                  </button>
                </div>
              </div>

              {method === 'pix' && amount && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">Valor solicitado</p>
                  <p className="text-xl text-white">{formatAmount(amount)}</p>
                </div>
              )}

              {method === 'xrpl' && (
                <div className="mt-4 space-y-2">
                  <div className="p-3 rounded-lg bg-[#2979FF]/5 border border-[#2979FF]/20">
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                      <Info className="w-3 h-3" />
                      <span>Conversão automática RLUSD → R$ com yield de 5-8% APY</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#00E676]/5 border border-[#00E676]/20">
                    <div className="flex items-center justify-center gap-1 text-xs text-[#00E676]">
                      <span>🔍 Testnet • Transações auditáveis publicamente</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Generate QR Button (PIX) */}
          {method === 'pix' && !qrCodeGenerated && (
            <button
              onClick={handleGenerateQR}
              className="w-full px-6 py-4 rounded-lg bg-[#00E676] hover:bg-[#00C766] text-white transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              <span>Gerar QR Code PIX</span>
            </button>
          )}

          {/* Simulate Payment Button */}
          {(qrCodeGenerated || method === 'xrpl') && paymentStatus === 'idle' && (
            <button
              onClick={handleSimulatePayment}
              className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#00E676] to-[#00C766] hover:from-[#00C766] hover:to-[#00A856] text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#00E676]/20"
            >
              <QrCode className="w-5 h-5" />
              <span>Simular Pagamento Recebido</span>
            </button>
          )}

          {/* Simulating Status */}
          {paymentStatus === 'simulating' && (
            <div className="w-full px-6 py-4 rounded-lg bg-[#00E676]/10 border border-[#00E676]/30 text-white flex items-center justify-center gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-[#00E676]" />
              <span>Processando na XRPL Testnet...</span>
            </div>
          )}

          {/* Regenerate Button */}
          {qrCodeGenerated && method === 'pix' && paymentStatus === 'idle' && (
            <button
              onClick={() => {
                setQrCodeGenerated(false);
                setAmount('');
              }}
              className="w-full px-6 py-3 rounded-lg bg-transparent border border-gray-700 text-white hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Gerar Novo QR Code</span>
            </button>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 gap-3">
            <div className="bg-[#0F1218] border border-gray-800 rounded-lg p-4">
              <h4 className="text-white text-sm mb-1">Liquidação D+0</h4>
              <p className="text-xs text-gray-400">
                Pagamentos recebidos são liquidados imediatamente via Escrow XRPL
              </p>
            </div>
            <div className="bg-[#0F1218] border border-gray-800 rounded-lg p-4">
              <h4 className="text-white text-sm mb-1">Yield Automático</h4>
              <p className="text-xs text-gray-400">
                Saldo em RLUSD rende automaticamente 5-8% APY via AMM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
