import React from 'react';
import { Mail, FileText, Shield, Cookie, ExternalLink } from 'lucide-react';
import logoImage from 'figma:asset/6761fcdfd3fd44682c12fd25ffa6af6cef40dd6d.png';

export function Footer() {
  const legalLinks = [
    { icon: Shield, label: 'Política de Privacidade', href: '#' },
    { icon: FileText, label: 'Termos de Uso', href: '#' },
    { icon: Cookie, label: 'Declaração de Cookies', href: '#' },
    { icon: FileText, label: 'Política de Compliance', href: '#' },
  ];

  return (
    <footer className="bg-[#1A1F2B] border-t border-gray-800 mt-24">
      <div className="container mx-auto px-6 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
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

                {/* Logo Central */}
                <img 
                  src={logoImage} 
                  alt="PAYHUB Logo" 
                  className="w-12 h-12 rounded-full relative z-10"
                />
              </div>
              <div>
                <div className="text-white font-bold">PAYHUB</div>
                <div className="text-[10px] text-gray-400 tracking-wider">TESOURARIA ATIVA</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              O Centro de Pagamentos Simplificado para PMEs e produtores de eventos. 
              Liquidez imediata, rendimento automático e compliance institucional integrado.
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white mb-4">Legal & Compliance</h3>
            <ul className="space-y-3">
              {legalLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contato</h3>
            <div className="space-y-3">
              <a
                href="mailto:compliance@payhub.lat"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>compliance@payhub.lat</span>
              </a>
              <a
                href="mailto:support@payhub.lat"
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>support@payhub.lat</span>
              </a>
            </div>
            <div className="mt-6 p-4 rounded-lg bg-[#00E676]/5 border border-[#00E676]/20">
              <p className="text-xs text-gray-400">
                <strong className="text-white">Conformidade:</strong> CARF/OCDE (IN RFB nº 2.291/2025) + LGPD
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2025 PAYHUB. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>XRPL Testnet/Mainnet</span>
            <span>•</span>
            <span>RLUSD Stablecoin</span>
            <span>•</span>
            <span>Escrow D+0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
