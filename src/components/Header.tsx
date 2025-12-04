import React, { useState } from 'react';
import { Shield, Menu, X, Home, CreditCard, Lock, TrendingUp, FileText, User, Smartphone, FlaskConical } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComplianceInfo, setShowComplianceInfo] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'test', label: 'Testar DApp', icon: FlaskConical },
    { id: 'softpos', label: 'Baixar App', icon: Smartphone },
    { id: 'escrow', label: 'Escrow', icon: Lock },
    { id: 'yield', label: 'Yield', icon: TrendingUp },
    { id: 'audit', label: 'Auditoria', icon: FileText },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1A1F2B]/95 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Ondas Concêntricas Pulsantes - Fluxos de Transações LATAM */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                {/* Onda 1 - Azul */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#2979FF]/30 animate-ping" style={{ animationDuration: '6s' }}></div>
                
                {/* Onda 2 - Branco */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                
                {/* Onda 3 - Azul */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#2979FF]/25 animate-ping" style={{ animationDuration: '6s', animationDelay: '4s' }}></div>

                {/* Ondas Secundárias - Mais Sutis */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/15 animate-ping" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
                
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#2979FF]/20 animate-ping" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
              </div>

              <Logo size="w-12 h-12" className="relative z-10" alt="PAYHUB Logo" />
            </div>
            <div>
              <div className="text-white font-bold">PAYHUB</div>
              <div className="text-[10px] text-gray-400 tracking-wider">TESOURARIA ATIVA</div>
            </div>
          </div>

          {/* Desktop Navigation - Horizontal com Ícones */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-[#2979FF]/10 text-[#2979FF]'
                      : 'text-gray-400 hover:text-white hover:bg-[#0F1218]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Compliance Badge & Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowComplianceInfo(!showComplianceInfo)}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20 hover:bg-[#00E676]/20 transition-colors"
            >
              <Shield className="w-4 h-4 text-[#00E676]" />
              <span className="text-xs text-[#00E676]">CARF/OCDE</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Hamburger Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => {
                      onNavigate(link.id);
                      setMobileMenuOpen(false);
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#2979FF]/10 text-[#2979FF]'
                        : 'text-gray-400 hover:text-white hover:bg-[#0F1218]'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-sm">{link.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  setShowComplianceInfo(!showComplianceInfo);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20 mt-2"
              >
                <Shield className="w-4 h-4 text-[#00E676]" />
                <span className="text-xs text-[#00E676]">CARF/OCDE - IN RFB nº 2.291/2025</span>
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Compliance Info Modal */}
      {showComplianceInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-[#1A1F2B] rounded-xl border border-gray-800 p-6 max-w-2xl w-full">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-[#00E676]" />
                <h3 className="text-white">Conformidade Regulatória</h3>
              </div>
              <button
                onClick={() => setShowComplianceInfo(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 text-sm text-gray-300">
              <p>
                <strong className="text-white">IN RFB nº 2.291/2025:</strong> Instrução Normativa que alinha
                o Brasil ao padrão internacional CARF (Crypto-Asset Reporting Framework) da OCDE para
                reporte de criptoativos.
              </p>
              <p>
                O PAYHUB está em total conformidade com esta regulamentação, garantindo transparência
                e rastreabilidade de todas as operações com criptoativos na XRPL.
              </p>
              <div className="pt-4 border-t border-gray-800">
                <p className="text-xs text-gray-400">
                  Todas as transações são auditáveis e exportáveis em formato CSV para fins de
                  compliance fiscal e regulatório.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
