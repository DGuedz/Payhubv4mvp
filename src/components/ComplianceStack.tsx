import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Shield, Lock, Eye, CheckCircle, FileCheck } from 'lucide-react';

export function ComplianceStack() {
  const securityModules = [
    {
      name: 'Key Management System (KMS)',
      status: 'active',
      description: 'Custódia institucional de chaves privadas com HSM',
      provider: 'Metaco Harmonize',
      lastAudit: '2024-10-15',
      coverage: '100%'
    },
    {
      name: 'Defesa Ativa (Honeypot)',
      status: 'active',
      description: 'Monitoramento 24/7 de ataques e tentativas de exploração',
      threatsBlocked: 2847,
      lastIncident: 'Nenhum',
      uptime: '99.98%'
    },
    {
      name: 'Escrow Auditável',
      status: 'active',
      description: 'Rastreabilidade completa on-chain via XRPL',
      transactions: 12847,
      volume: 'R$ 142M',
      immutable: true
    }
  ];

  const complianceChecks = [
    { item: 'KYC/KYB Integrado', status: 'compliant' },
    { item: 'AML Screening', status: 'compliant' },
    { item: 'Rastreabilidade de Fundos', status: 'compliant' },
    { item: 'Auditoria de Smart Contracts', status: 'compliant' },
    { item: 'Segregação de Custódia', status: 'compliant' },
    { item: 'Disaster Recovery (RTO < 4h)', status: 'compliant' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl tracking-tight mb-1 text-[#1a2a3a]">Compliance Stack (RegTech)</h2>
          <p className="text-sm text-[#607D8B]">
            Segurança Institucional e Prontidão para Auditoria
          </p>
        </div>
        <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30 text-base px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-2" />
          Audit-Ready
        </Badge>
      </div>

      {/* Security Modules */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* KMS */}
        <Card className="p-5 bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#2979FF]/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#2979FF]" />
              </div>
              <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30 text-xs">
                Ativo
              </Badge>
            </div>
            <div>
              <h3 className="mb-1 text-[#1a2a3a]">KMS</h3>
              <p className="text-xs text-[#607D8B] mb-3">
                Custódia institucional com HSM
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Provider</span>
                  <span className="text-[#2979FF]">Metaco</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Cobertura</span>
                  <span className="text-[#1a2a3a]">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Última Auditoria</span>
                  <span className="text-[#1a2a3a]">Out 2024</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Honeypot */}
        <Card className="p-5 bg-gradient-to-br from-[#FF1744]/10 to-[#FF1744]/5 border-[#FF1744]/20 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#FF1744]/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#FF1744]" />
              </div>
              <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30 text-xs">
                Ativo
              </Badge>
            </div>
            <div>
              <h3 className="mb-1 text-[#1a2a3a]">Defesa Ativa</h3>
              <p className="text-xs text-[#607D8B] mb-3">
                Honeypot com monitoramento 24/7
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Ameaças Bloqueadas</span>
                  <span className="text-[#FF1744]">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Uptime</span>
                  <span className="text-[#1a2a3a]">99.98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Último Incidente</span>
                  <span className="text-[#00E676]">Nenhum</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Escrow Auditável */}
        <Card className="p-5 bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#2979FF]/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#2979FF]" />
              </div>
              <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30 text-xs">
                Ativo
              </Badge>
            </div>
            <div>
              <h3 className="mb-1 text-[#1a2a3a]">Escrow Auditável</h3>
              <p className="text-xs text-[#607D8B] mb-3">
                Rastreabilidade on-chain (XRPL)
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Transações</span>
                  <span className="text-[#2979FF]">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Volume Total</span>
                  <span className="text-[#1a2a3a]">R$ 142M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#607D8B]">Immutability</span>
                  <span className="text-[#00E676]">100%</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Compliance Checklist */}
      <Card className="p-6 bg-white border-[#2979FF]/10 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-[#00E676]" />
            <h3 className="text-lg text-[#1a2a3a]">Compliance Checklist</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {complianceChecks.map((check) => (
              <div
                key={check.item}
                className="flex items-center justify-between p-3 rounded-lg bg-[#00E676]/5 border border-[#00E676]/20"
              >
                <span className="text-sm text-[#1a2a3a]">{check.item}</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#00E676]" />
                  <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30 text-xs">
                    Compliant
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Institutional Readiness */}
      <Card className="p-5 bg-gradient-to-r from-[#00E676]/10 to-[#00E676]/5 border-[#00E676]/20 shadow-sm">
        <div className="flex items-start gap-3">
          <Shield className="w-6 h-6 text-[#00E676] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[#1a2a3a] mb-2">Prontidão Institucional</h3>
            <p className="text-sm text-[#607D8B] mb-3">
              O Compliance Stack do PAYHUB não é apenas uma feature técnica — é um produto que demonstra 
              maturidade para parcerias com bancos, fintechs e investidores institucionais.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-[#607D8B] mb-1">Audit Trail</p>
                <p className="text-sm text-[#00E676]">100% Rastreável</p>
              </div>
              <div>
                <p className="text-xs text-[#607D8B] mb-1">Security Score</p>
                <p className="text-sm text-[#00E676]">A+ Rating</p>
              </div>
              <div>
                <p className="text-xs text-[#607D8B] mb-1">Certificações</p>
                <p className="text-sm text-[#00E676]">SOC 2 Type II Ready</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
