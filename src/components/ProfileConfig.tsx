import React, { useState } from 'react';
import { User, Shield, Key, Bell, FileText, LogOut, Copy, Check } from 'lucide-react';

interface ProfileConfigProps {
  merchantId?: string;
  walletAddress?: string;
  onLogout?: () => void;
}

export function ProfileConfig({
  merchantId = 'merchant_demo',
  walletAddress,
  onLogout,
}: ProfileConfigProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };

  const sections = [
    {
      title: 'Segurança',
      icon: Shield,
      items: [
        {
          label: 'Chaves XRPL',
          value: 'Isoladas via KMS/ENV',
          description: 'XRPL_SEED nunca exposta no front-end',
        },
        {
          label: 'Autenticação',
          value: 'JWT curto (10 min)',
          description: 'Token renovado automaticamente',
        },
        {
          label: 'Assinatura',
          value: 'Backend-only',
          description: 'Transações assinadas exclusivamente no servidor',
        },
      ],
    },
    {
      title: 'Configurações',
      icon: Key,
      items: [
        {
          label: 'Merchant ID',
          value: merchantId,
          description: 'Identificador único da conta',
        },
        {
          label: 'Rede XRPL',
          value: 'Testnet',
          description: 'Rede pública de testes (auditável)',
        },
      ],
    },
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Declaração de Cookies', href: '#' },
    { label: 'Compliance CARF/OCDE', href: '#' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-white mb-1">Perfil Merchant</h2>
            <p className="text-white/80 text-sm font-mono">{merchantId}</p>
          </div>
        </div>

        {walletAddress && (
          <div className="bg-white/10 backdrop-blur rounded-lg p-3 flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/60 mb-1">Endereço XRPL</p>
              <p className="text-sm text-white font-mono truncate">{walletAddress}</p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="ml-3 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors flex items-center gap-2"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="text-xs">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copiar</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Security & Config Sections */}
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#2979FF]/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#2979FF]" />
              </div>
              <h3 className="text-white">{section.title}</h3>
            </div>

            <div className="space-y-4">
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[#0F1218] border border-gray-800"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-gray-400">{item.label}</span>
                    <span className="text-sm text-white font-mono">{item.value}</span>
                  </div>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Legal Links */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[#2979FF]/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-[#2979FF]" />
          </div>
          <h3 className="text-white">Legal & Compliance</h3>
        </div>

        <div className="space-y-2">
          {legalLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block px-4 py-3 rounded-lg bg-[#0F1218] hover:bg-[#252B3A] border border-gray-800 text-sm text-gray-300 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-[#00E676]/5 border border-[#00E676]/20">
          <p className="text-xs text-gray-400">
            <strong className="text-white">Conformidade:</strong> IN RFB nº 2.291/2025 (CARF/OCDE) + LGPD
          </p>
        </div>
      </div>

      {/* Logout */}
      {onLogout && (
        <button
          onClick={onLogout}
          className="w-full px-6 py-4 rounded-lg bg-[#1A1F2B] hover:bg-[#252B3A] border border-gray-700 text-white transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair da Conta</span>
        </button>
      )}
    </div>
  );
}
