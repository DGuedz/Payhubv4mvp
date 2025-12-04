import React from 'react';
import { Shield, Key, Clock, AlertTriangle, Eye, CheckCircle } from 'lucide-react';

export function SecurityCard() {
  const securityFeatures = [
    {
      icon: Key,
      title: 'Isolamento de Chaves',
      description: 'A XRPL_SEED é carregada exclusivamente via KMS/ambiente seguro, nunca exposta em logs ou front-end.',
      status: 'active',
    },
    {
      icon: Shield,
      title: 'Assinatura Backend',
      description: 'Todas as assinaturas (EscrowCreate/Finish) ocorrem exclusivamente no backend com validação rigorosa.',
      status: 'active',
    },
    {
      icon: Clock,
      title: 'JWT de Curta Duração',
      description: 'Tokens JWT com TTL reduzido protegem rotas críticas contra replay attacks.',
      status: 'active',
    },
    {
      icon: AlertTriangle,
      title: 'Rate Limiting & Honeypot',
      description: 'Proteção contra abuse com rate limiting ativo e honeypot para detectar ataques.',
      status: 'active',
    },
    {
      icon: Eye,
      title: 'Auditoria sem PII',
      description: 'Registramos apenas txHash e sequence (sem dados pessoais), garantindo conformidade LGPD.',
      status: 'active',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {securityFeatures.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <div
            key={index}
            className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6 hover:border-[#2979FF]/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#2979FF]/10 flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#2979FF]" />
              </div>
              {feature.status === 'active' && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#00E676]/10">
                  <CheckCircle className="w-3.5 h-3.5 text-[#00E676]" />
                  <span className="text-xs text-[#00E676]">Ativo</span>
                </div>
              )}
            </div>
            <h3 className="text-white mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
          </div>
        );
      })}

      {/* Summary Card */}
      <div className="bg-gradient-to-br from-[#2979FF]/10 to-[#00E676]/5 border border-[#2979FF]/20 rounded-xl p-6 md:col-span-2 lg:col-span-3">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#00E676]/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-6 h-6 text-[#00E676]" />
          </div>
          <div className="flex-1">
            <h3 className="text-white mb-2">Arquitetura de Segurança Enterprise</h3>
            <p className="text-sm text-gray-400 mb-4">
              Nossa stack de segurança combina isolamento de chaves via KMS, assinatura exclusiva backend,
              autenticação JWT com TTL curto, proteção contra abuse (rate limiting + honeypot) e auditoria
              completa sem PII. Todas as operações críticas são rastreáveis via txHash e sequence na XRPL.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-[#1A1F2B] border border-gray-700 text-xs text-gray-300">
                KMS/Environment Variables
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#1A1F2B] border border-gray-700 text-xs text-gray-300">
                Backend-Only Signing
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#1A1F2B] border border-gray-700 text-xs text-gray-300">
                JWT Short TTL
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#1A1F2B] border border-gray-700 text-xs text-gray-300">
                Rate Limiting
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#1A1F2B] border border-gray-700 text-xs text-gray-300">
                Honeypot Active
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-[#1A1F2B] border border-gray-700 text-xs text-gray-300">
                PII-Free Audit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
