import React from 'react';
import { ArrowRight, Download, Zap, Shield, TrendingUp } from 'lucide-react';

interface HeroProps {
  onExportCSV: () => void;
}

export function Hero({ onExportCSV }: HeroProps) {
  const scrollToEscrow = () => {
    document.getElementById('escrow')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1A1F2B] to-[#0F1218] pt-24 pb-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #2979FF 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2979FF]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00E676]/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2979FF]/10 border border-[#2979FF]/20 mb-8">
            <Zap className="w-4 h-4 text-[#2979FF]" />
            <span className="text-sm text-[#2979FF]">Liquidação Instantânea com Escrow XRPL</span>
          </div>

          {/* Main Title */}
          <h1 className="text-white mb-6 leading-tight">
            Liquide hoje, receba RLUSD com D+0
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-4">
            Conforme IN RFB nº 2.291/2025 (CARF/OCDE) e LGPD
          </p>

          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            Escrow XRPL, auditoria sem PII e yield seguro para seu saldo. Trustline RLUSD pronta em minutos,
            Escrow Create → Finish com owner e offerSequence capturados, relatório CSV com txHash e sequence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={scrollToEscrow}
              className="group w-full sm:w-auto px-8 py-4 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white transition-all flex items-center justify-center gap-2"
            >
              <span>Ativar Agora</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onExportCSV}
              className="w-full sm:w-auto px-8 py-4 rounded-lg bg-[#1A1F2B] hover:bg-[#252B3A] text-white border border-gray-700 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Exportar CSV (Compliance)</span>
            </button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-[#1A1F2B]/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[#2979FF]/10 flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-[#2979FF]" />
              </div>
              <h3 className="text-white mb-2">Liquidação D+0</h3>
              <p className="text-sm text-gray-400">
                Escrow atômico na XRPL com antecipação de 95%
              </p>
            </div>

            <div className="bg-[#1A1F2B]/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[#00E676]/10 flex items-center justify-center mb-4 mx-auto">
                <Shield className="w-6 h-6 text-[#00E676]" />
              </div>
              <h3 className="text-white mb-2">CARF/OCDE</h3>
              <p className="text-sm text-gray-400">
                Compliance com IN RFB nº 2.291/2025
              </p>
            </div>

            <div className="bg-[#1A1F2B]/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="w-12 h-12 rounded-lg bg-[#2979FF]/10 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-[#2979FF]" />
              </div>
              <h3 className="text-white mb-2">Yield 5-8%</h3>
              <p className="text-sm text-gray-400">
                Rendimento automático em saldo excedente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
