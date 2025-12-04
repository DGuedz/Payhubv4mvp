import React from 'react';
import { Smartphone, TrendingUp, Shield, ArrowRight } from 'lucide-react';

interface ValuePillarsProps {
  onNavigateSoftPOS: () => void;
  onNavigateYield: () => void;
  onNavigateSecurity: () => void;
}

export function ValuePillars({ onNavigateSoftPOS, onNavigateYield, onNavigateSecurity }: ValuePillarsProps) {
  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl relative">
      {/* Background Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5DC264]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#2979FF]/10 rounded-full blur-3xl pointer-events-none" />

      {/* 3 Cards Principais - Estilo do Slide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-16">
        
        {/* Card 1: Verde - Soft-POS */}
        <div className="group relative overflow-hidden rounded-2xl border-2 border-[#5DC264]/50 bg-gradient-to-br from-[#5DC264]/20 to-[#4BA654]/10 p-8 transition-all hover:shadow-2xl hover:shadow-[#5DC264]/30 hover:scale-105">
          {/* Icon Container */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-white text-center text-xl mb-4 leading-tight">
            Soft-POS: Adeus Maquininhas.<br />
            <span className="text-lg">Seu Celular é o Terminal</span>
          </h3>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Zero Aluguel</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Liquidação D+0</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Custo: R$ 0,0001/transação</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onNavigateSoftPOS}
            className="w-full px-6 py-3 rounded-lg bg-[#5DC264] hover:bg-[#4BA654] text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Baixar App</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5DC264]/0 via-[#5DC264]/30 to-[#5DC264]/0 animate-pulse" />
          </div>
        </div>

        {/* Card 2: Azul - Tesouraria Ativa */}
        <div className="group relative overflow-hidden rounded-2xl border-2 border-[#2979FF]/50 bg-gradient-to-br from-[#2979FF]/20 to-[#1E5FE0]/10 p-8 transition-all hover:shadow-2xl hover:shadow-[#2979FF]/30 hover:scale-105">
          {/* Icon Container */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <TrendingUp className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-white text-center text-xl mb-4 leading-tight">
            Tesouraria Ativa: Seu Lucro<br />
            <span className="text-lg">Garantido. 5–8% APY</span>
          </h3>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Rendimento Automático</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Otimização via HUB AI</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Capital trabalhando 24/7</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onNavigateYield}
            className="w-full px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Ativar Yield</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#2979FF]/0 via-[#2979FF]/30 to-[#2979FF]/0 animate-pulse" />
          </div>
        </div>

        {/* Card 3: Azul Escuro - Segurança */}
        <div className="group relative overflow-hidden rounded-2xl border-2 border-[#1E5FE0]/50 bg-gradient-to-br from-[#1E5FE0]/20 to-[#0F3D99]/10 p-8 transition-all hover:shadow-2xl hover:shadow-[#1E5FE0]/30 hover:scale-105">
          {/* Icon Container */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-white text-center text-xl mb-4 leading-tight">
            Segurizâa Nível Banco.<br />
            <span className="text-lg">Compliance CARF/OCDE</span>
          </h3>

          {/* Features */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>KMS Enterprise-Grade</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>SOC 2 / ISO 27001</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <div className="w-1 h-1 rounded-full bg-white" />
              <span>Segregação de Acessos</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={onNavigateSecurity}
            className="w-full px-6 py-3 rounded-lg bg-[#1E5FE0] hover:bg-[#0F3D99] text-white font-medium transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <span>Ver Segurança</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Animated Border Glow */}
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#1E5FE0]/0 via-[#1E5FE0]/30 to-[#1E5FE0]/0 animate-pulse" />
          </div>
        </div>
      </div>

      {/* CTA Principal - Inspirado no Slide */}
      <div className="text-center mb-12">
        <button
          onClick={onNavigateSoftPOS}
          className="group inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-gradient-to-r from-[#2979FF] to-[#1E5FE0] hover:opacity-90 text-white text-xl font-medium transition-all shadow-2xl shadow-[#2979FF]/30 hover:scale-105"
        >
          <span>[ ATIVAR LIQUIDDED ODL AGORA ]</span>
          <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </button>
      </div>

      {/* Footer Text - Inspirado no Slide */}
      <div className="text-center space-y-2">
        <p className="text-gray-400 text-sm italic">
          Construíço on <span className="text-[#2979FF]">*backbone*</span> da Ripple. Proejegedo para do yua margne.
        </p>
        <p className="text-gray-500 text-lg">
          Sua Tesuraria Activa
        </p>
      </div>

      {/* Separator */}
      <div className="mt-16">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </div>
    </div>
  );
}
