import React, { useState } from 'react';
import { X, QrCode, Smartphone, Link2, Check } from 'lucide-react';

interface ReceberPagamentoProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export function ReceberPagamento({ onClose, onSuccess }: ReceberPagamentoProps) {
  const [valor, setValor] = useState('');
  const [metodo, setMetodo] = useState<'pix' | 'cartao' | 'link'>('pix');
  const [mostrarQR, setMostrarQR] = useState(false);
  const [pagamentoConcluido, setPagamentoConcluido] = useState(false);

  const handleNumPad = (digito: string) => {
    if (digito === 'C') {
      setValor('');
    } else if (digito === '←') {
      setValor(valor.slice(0, -1));
    } else {
      if (valor.length < 8) {
        setValor(valor + digito);
      }
    }
  };

  const valorFormatado = () => {
    if (!valor || valor === '0') return 'R$ 0,00';
    const num = parseInt(valor) / 100;
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const handleGerar = () => {
    if (parseInt(valor) > 0) {
      setMostrarQR(true);
      
      // Simula recebimento após 3 segundos
      setTimeout(() => {
        setPagamentoConcluido(true);
        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 2000);
      }, 3000);
    }
  };

  if (pagamentoConcluido) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
        <div className="bg-[#00E676] rounded-3xl p-8 max-w-sm w-full text-center animate-scale-up">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl text-white mb-2">Pago!</h2>
          <p className="text-white/90 mb-4">{valorFormatado()}</p>
          <p className="text-white/70 text-sm">O dinheiro já tá na sua conta</p>
        </div>
      </div>
    );
  }

  if (mostrarQR && metodo === 'pix') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
        <div className="bg-[#1A1F2B] rounded-2xl max-w-md w-full overflow-hidden">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-white text-lg">Cliente escaneia o QR Code</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 text-center">
            <p className="text-4xl text-white mb-6">{valorFormatado()}</p>
            
            {/* QR Code Mock */}
            <div className="bg-white p-8 rounded-2xl mb-6 mx-auto w-64 h-64 flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-48 h-48 text-gray-800 mx-auto mb-2" />
                <p className="text-xs text-gray-500">QR Code PIX</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[#2979FF] animate-pulse">
              <div className="w-2 h-2 rounded-full bg-[#2979FF]"></div>
              <p className="text-sm">Aguardando pagamento...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/70 p-0 md:p-4">
      <div className="bg-[#1A1F2B] rounded-t-3xl md:rounded-2xl w-full md:max-w-lg overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-white text-xl">Receber Pagamento</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Valor */}
          <div className="text-center mb-8">
            <p className="text-gray-400 text-sm mb-2">Quanto vai receber?</p>
            <p className="text-5xl text-white mb-2">{valorFormatado()}</p>
          </div>

          {/* Teclado Numérico */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', '←'].map((num) => (
              <button
                key={num}
                onClick={() => handleNumPad(num)}
                className="h-16 rounded-xl bg-[#0F1218] hover:bg-gray-800 text-white text-xl transition-colors border border-gray-800"
              >
                {num}
              </button>
            ))}
          </div>

          {/* Métodos de Pagamento */}
          <div className="space-y-3 mb-6">
            <p className="text-sm text-gray-400 mb-3">Como o cliente vai pagar?</p>
            
            <button
              onClick={() => setMetodo('pix')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                metodo === 'pix'
                  ? 'border-[#2979FF] bg-[#2979FF]/10'
                  : 'border-gray-800 bg-[#0F1218] hover:border-gray-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                metodo === 'pix' ? 'bg-[#2979FF]' : 'bg-gray-800'
              }`}>
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white">PIX (QR Code)</p>
                <p className="text-xs text-gray-400">Cliente escaneia na hora</p>
              </div>
              {metodo === 'pix' && <Check className="w-5 h-5 text-[#2979FF]" />}
            </button>

            <button
              onClick={() => setMetodo('cartao')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                metodo === 'cartao'
                  ? 'border-[#2979FF] bg-[#2979FF]/10'
                  : 'border-gray-800 bg-[#0F1218] hover:border-gray-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                metodo === 'cartao' ? 'bg-[#2979FF]' : 'bg-gray-800'
              }`}>
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white">Aproximar Cartão</p>
                <p className="text-xs text-gray-400">Maquininha no celular</p>
              </div>
              {metodo === 'cartao' && <Check className="w-5 h-5 text-[#2979FF]" />}
            </button>

            <button
              onClick={() => setMetodo('link')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                metodo === 'link'
                  ? 'border-[#2979FF] bg-[#2979FF]/10'
                  : 'border-gray-800 bg-[#0F1218] hover:border-gray-700'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                metodo === 'link' ? 'bg-[#2979FF]' : 'bg-gray-800'
              }`}>
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-white">Link de Pagamento</p>
                <p className="text-xs text-gray-400">Enviar por WhatsApp</p>
              </div>
              {metodo === 'link' && <Check className="w-5 h-5 text-[#2979FF]" />}
            </button>
          </div>

          {/* Botão Gerar */}
          <button
            onClick={handleGerar}
            disabled={parseInt(valor) === 0 || !valor}
            className="w-full py-4 rounded-xl bg-[#2979FF] hover:bg-[#1E5FCC] disabled:bg-gray-700 disabled:cursor-not-allowed text-white text-lg transition-all"
          >
            {metodo === 'pix' && 'Gerar QR Code PIX'}
            {metodo === 'cartao' && 'Ativar Maquininha'}
            {metodo === 'link' && 'Criar Link'}
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            💰 Você recebe na hora · Taxa: R$ {(parseInt(valor || '0') * 0.02 / 100).toFixed(2)} (2%)
          </p>
        </div>
      </div>
    </div>
  );
}
