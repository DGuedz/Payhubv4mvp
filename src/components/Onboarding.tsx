import { Button } from './ui/button';
import { Wallet, Zap, TrendingUp, Shield } from 'lucide-react';

interface OnboardingProps {
  onAuthenticate: () => void;
}

export function Onboarding({ onAuthenticate }: OnboardingProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#1a1a2e] to-[#0a0a0f] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Brand */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 mb-4">
            <Wallet className="w-10 h-10" />
          </div>
          <h1 className="text-4xl tracking-tight">PAYHUB</h1>
          <p className="text-purple-300">P4YHU3 · Agente de Tesouraria Ativa</p>
        </div>

        {/* Value Props */}
        <div className="space-y-4 py-6">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="mb-1">Liquidez Imediata</h3>
              <p className="text-sm text-gray-400">Receba à vista em RLUSD, sem esperar D+30 a D+60</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="mb-1">Rendimento Automático</h3>
              <p className="text-sm text-gray-400">5% a 8% APY no saldo disponível</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="mb-1">Escrow Atômico</h3>
              <p className="text-sm text-gray-400">Garantia on-chain na XRP Ledger</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button 
            onClick={onAuthenticate}
            className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg"
          >
            Conectar Carteira
          </Button>
          
          <button
            onClick={onAuthenticate}
            className="w-full h-12 rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
          >
            Login Social
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Sua carteira XRPL (rMERCHANT...) é gerenciada automaticamente.<br />
          Sem seed phrases. Sem complexidade.
        </p>
      </div>
    </div>
  );
}
