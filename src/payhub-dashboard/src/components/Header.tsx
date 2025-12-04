import React, { useState } from 'react';
import { Shield, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Header({ activeSection, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComplianceInfo, setShowComplianceInfo] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Início' },
    { id: 'escrow', label: 'Escrow' },
    { id: 'yield', label: 'Yield' },
    { id: 'audit', label: 'Auditoria' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#1A1F2B]/95 backdrop-blur-lg border-b border-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] flex items-center justify-center">
              <span className="text-white font-bold">P4Y</span>
            </div>
            <div>
              <div className="text-white font-bold">PAYHUB</div>
              <div className="text-[10px] text-gray-400 tracking-wider">P4YHU3</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-sm transition-colors ${
                  activeSection === link.id
                    ? 'text-[#2979FF]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Compliance Badge */}
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                    document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#2979FF]/10 text-[#2979FF]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => setShowComplianceInfo(!showComplianceInfo)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00E676]/10 border border-[#00E676]/20"
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
