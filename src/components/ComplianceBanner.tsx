import React from 'react';
import { Shield, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

interface ComplianceBannerProps {
  severity?: 'info' | 'warning' | 'success';
}

export function ComplianceBanner({ severity = 'info' }: ComplianceBannerProps) {
  const config = {
    info: {
      icon: Shield,
      bgColor: 'bg-[#2979FF]/10',
      borderColor: 'border-[#2979FF]/20',
      iconColor: 'text-[#2979FF]',
      textColor: 'text-gray-200',
      title: 'Conformidade Regulatória',
      message: 'O PAYHUB está alinhado ao padrão internacional CARF da OCDE (IN RFB nº 2.291/2025) para reporte de criptoativos.',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-[#F59E0B]/10',
      borderColor: 'border-[#F59E0B]/20',
      iconColor: 'text-[#F59E0B]',
      textColor: 'text-gray-200',
      title: 'Serviço com Degradação',
      message: 'Alguns serviços externos podem estar temporariamente indisponíveis. Operações críticas continuam funcionando.',
    },
    success: {
      icon: CheckCircle,
      bgColor: 'bg-[#00E676]/10',
      borderColor: 'border-[#00E676]/20',
      iconColor: 'text-[#00E676]',
      textColor: 'text-gray-200',
      title: 'Certificação Ativa',
      message: 'Todos os sistemas estão em conformidade e auditados conforme padrões CARF/OCDE e LGPD.',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor, title, message } = config[severity];

  return (
    <div className={`rounded-xl border ${borderColor} ${bgColor} p-6`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <h3 className={`${textColor} mb-2`}>{title}</h3>
          <p className="text-sm text-gray-400 mb-4">{message}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#2979FF] hover:text-[#1E5FE0] transition-colors"
            >
              <span>Política de Compliance</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#2979FF] hover:text-[#1E5FE0] transition-colors"
            >
              <span>Declaração de Cookies</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
