import { CheckCircle2, Copy, Code2, Layers, Rocket } from 'lucide-react';
import { useState } from 'react';

export function TestnetComponentsGuide() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const components = [
    {
      name: 'LiveTestnetBanner',
      description: 'Banner compacto para header/dashboard com status ao vivo',
      import: "import { LiveTestnetBanner } from './components/LiveTestnetBanner';",
      usage: '<LiveTestnetBanner showLatency={true} />',
      props: [
        { name: 'showLatency', type: 'boolean', default: 'true', description: 'Exibir indicador de latência' }
      ]
    },
    {
      name: 'TestnetStatus',
      description: 'Card completo mostrando última transação verificada',
      import: "import { TestnetStatus } from './components/TestnetStatus';",
      usage: `<TestnetStatus
  lastTxHash="TST9A8B7C6D5E4F3G2H1"
  lastTxAmount="R$ 150,00"
  lastTxTime={Date.now() - 45000}
  network="testnet"
/>`,
      props: [
        { name: 'lastTxHash', type: 'string', default: 'mock', description: 'Hash da última transação' },
        { name: 'lastTxAmount', type: 'string', default: 'mock', description: 'Valor formatado da TX' },
        { name: 'lastTxTime', type: 'number', default: 'Date.now()', description: 'Timestamp em ms' },
        { name: 'network', type: '"testnet" | "mainnet"', default: '"testnet"', description: 'Rede XRPL' }
      ]
    },
    {
      name: 'VerifiedTxBadge',
      description: 'Badge clicável para auditoria individual de TX',
      import: "import { VerifiedTxBadge } from './components/VerifiedTxBadge';",
      usage: `<VerifiedTxBadge
  txHash="TST9A8B7C6D5E4F3G2H1"
  timestamp={Date.now() - 45000}
  inline={true}
  network="testnet"
/>`,
      props: [
        { name: 'txHash', type: 'string', required: true, description: 'Hash da transação' },
        { name: 'timestamp', type: 'number', required: true, description: 'Timestamp em ms' },
        { name: 'inline', type: 'boolean', default: 'false', description: 'Versão compacta inline' },
        { name: 'network', type: '"testnet" | "mainnet"', default: '"testnet"', description: 'Rede XRPL' }
      ]
    },
    {
      name: 'LatencyIndicator',
      description: 'Indicador visual de performance da rede com métricas',
      import: "import { LatencyIndicator } from './components/LatencyIndicator';",
      usage: `<LatencyIndicator
  confirmationTime={3500}
  showDetails={true}
  size="md"
/>`,
      props: [
        { name: 'confirmationTime', type: 'number', default: '3500', description: 'Tempo de confirmação em ms' },
        { name: 'showDetails', type: 'boolean', default: 'true', description: 'Exibir métricas detalhadas' },
        { name: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Tamanho do componente' }
      ]
    },
    {
      name: 'AuditModal',
      description: 'Modal completo com histórico, filtros e exportação CSV',
      import: "import { AuditModal } from './components/AuditModal';",
      usage: `const [isOpen, setIsOpen] = useState(false);

<AuditModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  network="testnet"
/>`,
      props: [
        { name: 'isOpen', type: 'boolean', required: true, description: 'Estado do modal' },
        { name: 'onClose', type: '() => void', required: true, description: 'Callback para fechar' },
        { name: 'network', type: '"testnet" | "mainnet"', default: '"testnet"', description: 'Rede XRPL' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F1218] p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pb-8 border-b border-gray-800">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00E676] to-[#00C766] flex items-center justify-center">
              <Code2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-white text-4xl">📚 Guia de Componentes Testnet</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sistema completo de auditabilidade pública para PAYHUB na XRPL Testnet
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-gradient-to-br from-[#2979FF]/10 to-[#1E5FE0]/10 border border-[#2979FF]/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-[#2979FF]/20 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-5 h-5 text-[#2979FF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-lg mb-2">Quick Start</h3>
              <p className="text-gray-400 text-sm mb-4">
                Todos os componentes já estão integrados no projeto. Basta importar e usar!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  <span>5 componentes prontos</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  <span>TypeScript completo</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CheckCircle2 className="w-4 h-4 text-[#00E676]" />
                  <span>Zero dependências extras</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Components */}
        {components.map((component, index) => (
          <div key={index} className="bg-[#1A1F2B] border border-gray-800 rounded-xl overflow-hidden">
            {/* Component Header */}
            <div className="bg-gradient-to-r from-gray-800 to-transparent p-6 border-b border-gray-800">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white text-xl mb-2">{component.name}</h3>
                  <p className="text-gray-400 text-sm">{component.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs border border-[#00E676]/30">
                  v1.0
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Import */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Import</span>
                  <button
                    onClick={() => copyToClipboard(component.import, index * 2)}
                    className="flex items-center gap-1 text-xs text-[#00E676] hover:text-[#00C766] transition-colors"
                  >
                    {copiedIndex === index * 2 ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#0F1218] border border-gray-800 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
                  {component.import}
                </pre>
              </div>

              {/* Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Uso</span>
                  <button
                    onClick={() => copyToClipboard(component.usage, index * 2 + 1)}
                    className="flex items-center gap-1 text-xs text-[#00E676] hover:text-[#00C766] transition-colors"
                  >
                    {copiedIndex === index * 2 + 1 ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#0F1218] border border-gray-800 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
                  {component.usage}
                </pre>
              </div>

              {/* Props */}
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wide mb-3 block">Props</span>
                <div className="space-y-2">
                  {component.props.map((prop, propIndex) => (
                    <div key={propIndex} className="bg-[#0F1218] border border-gray-800 rounded-lg p-3">
                      <div className="flex items-start justify-between mb-1">
                        <code className="text-[#00E676] text-sm">{prop.name}</code>
                        <div className="flex items-center gap-2">
                          {'required' in prop && prop.required && (
                            <span className="px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400 border border-red-500/30">
                              required
                            </span>
                          )}
                          <code className="text-[#2979FF] text-xs">{prop.type}</code>
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mb-1">{prop.description}</p>
                      {'default' in prop && (
                        <p className="text-gray-600 text-xs">
                          Default: <code className="text-gray-500">{prop.default}</code>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Integration Example */}
        <div className="bg-gradient-to-br from-[#00E676]/5 to-[#2979FF]/5 border border-gray-800 rounded-xl p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-10 h-10 rounded-lg bg-[#00E676]/10 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-[#00E676]" />
            </div>
            <div>
              <h3 className="text-white text-lg mb-2">Exemplo de Integração Completa</h3>
              <p className="text-gray-400 text-sm">
                Como usar múltiplos componentes juntos em um dashboard real
              </p>
            </div>
          </div>

          <pre className="bg-[#0F1218] border border-gray-800 rounded-lg p-4 text-xs text-gray-300 overflow-x-auto">
{`import { useState } from 'react';
import { LiveTestnetBanner } from './components/LiveTestnetBanner';
import { TestnetStatus } from './components/TestnetStatus';
import { LatencyIndicator } from './components/LatencyIndicator';
import { AuditModal } from './components/AuditModal';

export function Dashboard() {
  const [isAuditOpen, setIsAuditOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Banner no topo */}
      <LiveTestnetBanner showLatency={true} />
      
      {/* Grid com status e latência */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TestnetStatus
          lastTxHash="TST9A8B7C6D5E4F3G2H1"
          lastTxAmount="R$ 150,00"
          lastTxTime={Date.now() - 45000}
          network="testnet"
        />
        <LatencyIndicator
          confirmationTime={3500}
          showDetails={true}
          size="md"
        />
      </div>

      {/* Botão para abrir modal */}
      <button onClick={() => setIsAuditOpen(true)}>
        Ver Auditoria Completa
      </button>

      {/* Modal de auditoria */}
      <AuditModal
        isOpen={isAuditOpen}
        onClose={() => setIsAuditOpen(false)}
        network="testnet"
      />
    </div>
  );
}`}
          </pre>
        </div>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            Todos os componentes seguem o design system PAYHUB com cores #001F3F e #00FF84
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-xs border border-[#00E676]/30">
              XRPL Testnet
            </span>
            <span className="px-3 py-1 rounded-full bg-[#2979FF]/10 text-[#2979FF] text-xs border border-[#2979FF]/30">
              TypeScript
            </span>
            <span className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-400 text-xs border border-gray-700">
              Tailwind CSS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
