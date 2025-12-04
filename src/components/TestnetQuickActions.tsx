import { ExternalLink, History, Zap, Activity, FileText, Code } from 'lucide-react';
import { useState } from 'react';
import { AuditModal } from './AuditModal';

interface TestnetQuickActionsProps {
  onViewShowcase?: () => void;
  onViewDocs?: () => void;
}

export function TestnetQuickActions({ onViewShowcase, onViewDocs }: TestnetQuickActionsProps) {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  const actions = [
    {
      icon: History,
      label: 'Ver Auditoria',
      description: 'Histórico completo de TXs',
      color: 'from-[#2979FF] to-[#1E5FE0]',
      onClick: () => setIsAuditModalOpen(true)
    },
    {
      icon: ExternalLink,
      label: 'XRPL Explorer',
      description: 'Testnet oficial',
      color: 'from-[#00E676] to-[#00C766]',
      onClick: () => window.open('https://testnet.xrpl.org/', '_blank')
    },
    {
      icon: Activity,
      label: 'Ver Showcase',
      description: 'Demo interativo',
      color: 'from-purple-500 to-purple-600',
      onClick: onViewShowcase
    },
    {
      icon: FileText,
      label: 'Documentação',
      description: 'Guia de componentes',
      color: 'from-gray-600 to-gray-700',
      onClick: onViewDocs
    }
  ];

  return (
    <>
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center">
            <Zap className="w-5 h-5 text-[#00E676]" />
          </div>
          <div>
            <h3 className="text-white">Quick Actions - Testnet</h3>
            <p className="text-xs text-gray-400">Acesso rápido às ferramentas de auditoria</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              disabled={!action.onClick}
              className={`group relative overflow-hidden rounded-lg p-4 bg-gradient-to-br ${action.color} hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
              <div className="relative z-10">
                <action.icon className="w-6 h-6 text-white mb-2" />
                <p className="text-white text-sm mb-1">{action.label}</p>
                <p className="text-white/70 text-xs">{action.description}</p>
              </div>
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
            </button>
          ))}
        </div>

        {/* Stats Row */}
        <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl text-white mb-1">5</p>
            <p className="text-xs text-gray-400">Componentes</p>
          </div>
          <div>
            <p className="text-2xl text-[#00E676] mb-1">100%</p>
            <p className="text-xs text-gray-400">Auditável</p>
          </div>
          <div>
            <p className="text-2xl text-[#2979FF] mb-1">3.5s</p>
            <p className="text-xs text-gray-400">Latência Média</p>
          </div>
        </div>

        {/* Code Badge */}
        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500">
          <Code className="w-3 h-3" />
          <span>TypeScript + Tailwind + Lucide Icons</span>
        </div>
      </div>

      {/* Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        network="testnet"
      />
    </>
  );
}
