import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { QrCode, CreditCard, Banknote, Coins } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function SoftPOS() {
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

  const generateQR = () => {
    setShowQR(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-6">
          <p className="text-sm text-gray-400">Terminal de Pagamento</p>
          <h1 className="text-5xl tracking-tight">SOFT-POS</h1>
        </div>

        {/* Amount Display */}
        <Card className="p-8 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-white/10">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">Valor da Venda</p>
            <p className="text-5xl tracking-tight">{formatAmount(amount)}</p>
            <p className="text-sm text-purple-300">≈ ${(parseFloat(amount) / 100 / 5.2).toFixed(2)} RLUSD</p>
          </div>
        </Card>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '00', '0', '←'].map((key) => (
            <Button
              key={key}
              onClick={() => {
                if (key === '←') handleDelete();
                else handleNumberClick(key);
              }}
              className="h-16 text-2xl bg-white/5 hover:bg-white/10 border border-white/10"
              variant="ghost"
            >
              {key}
            </Button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={generateQR}
            disabled={amount === '0'}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <QrCode className="w-5 h-5 mr-2" />
            Gerar QR Code Híbrido
          </Button>

          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" className="h-12 border-white/20 hover:bg-white/5">
              <CreditCard className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="h-12 border-white/20 hover:bg-white/5">
              <Banknote className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="h-12 border-white/20 hover:bg-white/5">
              <Coins className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={handleClear}
            variant="ghost"
            className="w-full h-10 text-gray-400 hover:text-white"
          >
            Limpar
          </Button>
        </div>

        {/* QR Dialog */}
        <Dialog open={showQR} onOpenChange={setShowQR}>
          <DialogContent className="bg-[#1a1a2e] border-white/10">
            <DialogHeader>
              <DialogTitle>QR Code de Pagamento</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              {/* QR Code Placeholder */}
              <div className="w-full aspect-square bg-white rounded-xl p-4 flex items-center justify-center">
                <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg opacity-20 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-black" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <p className="text-2xl">{formatAmount(amount)}</p>
                <p className="text-sm text-gray-400">PIX · Cartão · Cripto</p>
                <p className="text-xs text-purple-300">Liquidação em RLUSD via Escrow XRPL</p>
              </div>

              <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <p className="text-sm text-green-300">Aguardando pagamento...</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
