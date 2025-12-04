import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QrCode, Shield } from 'lucide-react';
import { Dialog, DialogContent } from './ui/dialog';

export function SoftPOSXRPL() {
  const [amount, setAmount] = useState('0');
  const [showQR, setShowQR] = useState(false);

  const handleNumberClick = (num: string) => {
    if (amount === '0') {
      setAmount(num);
    } else {
      setAmount(amount + num);
    }
  };

  const handleClear = () => {
    setAmount('0');
  };

  const handleDelete = () => {
    if (amount.length === 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const formatAmount = (value: string) => {
    const num = parseFloat(value) / 100;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(num);
  };

  const formatRLUSD = (value: string) => {
    const num = parseFloat(value) / 100 / 5.2;
    return num.toFixed(2);
  };

  const generateQR = () => {
    setShowQR(true);
  };

  return (
    <div className="min-h-screen bg-[#F4F7FF] p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header with Security Badge */}
        <div className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-[#607D8B]">Terminal de Pagamento</p>
            <h1 className="text-4xl text-[#1a2a3a]">SOFT-POS</h1>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#2979FF]/10 shadow-sm">
            <Shield className="w-4 h-4 text-[#2979FF]" />
            <span className="text-sm text-[#2979FF]">Seguro</span>
          </div>
        </div>

        {/* RLUSD Card Display */}
        <Card className="p-8 rounded-3xl bg-gradient-to-br from-[#2979FF] to-[#5B9DFF] border-0 shadow-xl shadow-blue-500/30 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/10"></div>
          
          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg bg-white/30"></div>
              </div>
              <p className="text-sm text-white/80">RLUSD Wallet</p>
            </div>
            
            <div className="space-y-2">
              <p className="text-6xl text-white tracking-tight">{formatAmount(amount)}</p>
              <p className="text-xl text-white/80">≈ ${formatRLUSD(amount)} RLUSD</p>
            </div>

            <div className="pt-4 border-t border-white/20">
              <p className="text-sm text-white/60">XRP Ledger</p>
              <p className="text-xs text-white/60 font-mono mt-1">rMERCHANT...7x9K2</p>
            </div>
          </div>
        </Card>

        {/* Number Pad - Clean Design */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '←'].map((key) => (
            <button
              key={key}
              onClick={() => {
                if (key === '←') handleDelete();
                else if (key === '.') return; // Ignore decimal for now
                else handleNumberClick(key);
              }}
              className="h-16 rounded-2xl bg-white border border-[#2979FF]/10 hover:border-[#2979FF]/30 hover:shadow-md transition-all text-2xl text-[#1a2a3a] active:scale-95"
            >
              {key}
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <div className="space-y-3">
          <Button
            onClick={generateQR}
            disabled={amount === '0'}
            className="w-full h-16 bg-[#2979FF] hover:bg-[#1565C0] text-white rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all disabled:opacity-40 disabled:shadow-none"
          >
            <QrCode className="w-5 h-5 mr-3" />
            Gerar QR Code
          </Button>

          <button
            onClick={handleClear}
            className="w-full h-12 text-[#607D8B] hover:text-[#2979FF] transition-colors"
          >
            Limpar
          </button>
        </div>

        {/* QR Dialog */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent className="bg-white border-[#2979FF]/10 max-w-sm rounded-3xl">
            <div className="space-y-6 py-4">
              {/* QR Code Display */}
              <div className="w-full aspect-square bg-gradient-to-br from-[#F4F7FF] to-white rounded-2xl p-8 flex items-center justify-center border border-[#2979FF]/10">
                <div className="w-full h-full bg-gradient-to-br from-[#2979FF] to-[#5B9DFF] rounded-xl flex items-center justify-center opacity-20">
                  <QrCode className="w-32 h-32 text-white" />
                </div>
              </div>

              <div className="text-center space-y-3">
                <p className="text-3xl text-[#1a2a3a]">{formatAmount(amount)}</p>
                <p className="text-[#607D8B]">${formatRLUSD(amount)} RLUSD</p>
                <p className="text-sm text-[#607D8B]">PIX · Cartão · Cripto</p>
              </div>

              <div className="flex items-center justify-center gap-2 p-4 bg-[#00E676]/10 border border-[#00E676]/20 rounded-2xl">
                <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse"></div>
                <p className="text-sm text-[#00E676]">Aguardando pagamento...</p>
              </div>

              <p className="text-xs text-center text-[#607D8B]">
                Liquidação via XRP Ledger Escrow
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
