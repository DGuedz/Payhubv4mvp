import { Button } from './ui/button';
import { Shield, Zap, TrendingUp } from 'lucide-react';
import referenceImage from 'figma:asset/cefcf0c3a9e87e7d6831c7f05b7440f49abd00c4.png';

interface OnboardingXRPLProps {
  onAuthenticate: () => void;
}

export function OnboardingXRPL({ onAuthenticate }: OnboardingXRPLProps) {
  return (
    <div className="min-h-screen bg-[#F4F7FF] flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo Circle */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#2979FF] to-[#5B9DFF] mb-4 shadow-lg shadow-blue-500/30">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#2979FF]"></div>
              </div>
            </div>
          </div>
          <h1 className="text-5xl tracking-tight text-[#1a2a3a]">PAYHUB</h1>
          <p className="text-[#607D8B]">Agente de Tesouraria Ativa</p>
          <p className="text-sm text-[#2979FF]">Powered by XRPL</p>
        </div>

        {/* Value Props - Minimal Cards */}
        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center flex-shrink-0">
                <Zap className="w-6 h-6 text-[#00E676]" />
              </div>
              <div>
                <h3 className="text-[#1a2a3a] mb-1">Liquidez Imediata</h3>
                <p className="text-sm text-[#607D8B]">D+0 em RLUSD via XRP Ledger</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-[#2979FF]" />
              </div>
              <div>
                <h3 className="text-[#1a2a3a] mb-1">5% a 8% APY</h3>
                <p className="text-sm text-[#607D8B]">Rendimento automático 24/7</p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-[#2979FF]" />
              </div>
              <div>
                <h3 className="text-[#1a2a3a] mb-1">Escrow Institucional</h3>
                <p className="text-sm text-[#607D8B]">Custódia auditável on-chain</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-4">
          <Button 
            onClick={onAuthenticate}
            className="w-full h-14 bg-[#2979FF] hover:bg-[#1565C0] text-white rounded-2xl shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40"
          >
            Conectar Carteira
          </Button>
          
          <button
            onClick={onAuthenticate}
            className="w-full h-12 rounded-2xl border border-[#2979FF]/20 bg-white hover:bg-[#F4F7FF] text-[#2979FF] transition-all"
          >
            Login Social
          </button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-[#607D8B]">
            Sua carteira XRPL gerenciada automaticamente
          </p>
          <p className="text-xs text-[#607D8B] mt-2">
            Sem seed phrases · Sem complexidade
          </p>
        </div>
      </div>
    </div>
  );
}
