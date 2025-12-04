import { useState } from 'react';
import { TestnetStatus } from './TestnetStatus';
import { VerifiedTxBadge } from './VerifiedTxBadge';
import { LatencyIndicator } from './LatencyIndicator';
import { AuditModal } from './AuditModal';
import { LiveTestnetBanner } from './LiveTestnetBanner';
import { Code, Eye } from 'lucide-react';

export function TestnetShowcase() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="min-h-screen bg-[#0F1218] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pb-8 border-b border-gray-800">
          <h1 className="text-white text-4xl">🚀 Componentes Testnet PAYHUB</h1>
          <p className="text-gray-400 text-lg">
            Sistema completo de auditabilidade e monitoramento em tempo real
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="px-3 py-1 rounded-full bg-[#00E676]/10 text-[#00E676] text-sm border border-[#00E676]/30">
              XRPL Testnet
            </span>
            <span className="px-3 py-1 rounded-full bg-[#2979FF]/10 text-[#2979FF] text-sm border border-[#2979FF]/30">
              Real-time Updates
            </span>
          </div>
        </div>

        {/* Live Banner Component */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-2xl mb-2">1. Live Testnet Banner</h2>
              <p className="text-gray-400">Banner compacto com status ao vivo do ledger</p>
            </div>
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm transition-all"
            >
              {showCode ? <Eye className="w-4 h-4" /> : <Code className="w-4 h-4" />}
              <span>{showCode ? 'Ver UI' : 'Ver Código'}</span>
            </button>
          </div>
          {!showCode ? (
            <LiveTestnetBanner showLatency={true} />
          ) : (
            <pre className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
{`<LiveTestnetBanner showLatency={true} />`}
            </pre>
          )}
        </section>

        {/* Testnet Status Card */}
        <section className="space-y-4">
          <div>
            <h2 className="text-white text-2xl mb-2">2. Testnet Status Card</h2>
            <p className="text-gray-400">Card completo com última transação e link para explorer</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TestnetStatus
              lastTxHash="TST9A8B7C6D5E4F3G2H1"
              lastTxAmount="R$ 150,00"
              lastTxTime={Date.now() - 45000}
              network="testnet"
            />
            <TestnetStatus
              lastTxHash="TST8Z7Y6X5W4V3U2T1S0"
              lastTxAmount="R$ 89,90"
              lastTxTime={Date.now() - 3600000}
              network="testnet"
            />
          </div>
          <pre className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
{`<TestnetStatus
  lastTxHash="TST9A8B7C6D5E4F3G2H1"
  lastTxAmount="R$ 150,00"
  lastTxTime={Date.now() - 45000}
  network="testnet"
/>`}
          </pre>
        </section>

        {/* Verified TX Badge */}
        <section className="space-y-4">
          <div>
            <h2 className="text-white text-2xl mb-2">3. Verified TX Badge</h2>
            <p className="text-gray-400">Badge clicável para auditoria de transações individuais</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">Versão Block:</p>
              <VerifiedTxBadge
                txHash="TST9A8B7C6D5E4F3G2H1"
                timestamp={Date.now() - 45000}
                inline={false}
                network="testnet"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Versão Inline:</p>
              <div className="flex items-center gap-2">
                <span className="text-white">Transação concluída</span>
                <VerifiedTxBadge
                  txHash="TST9A8B7C6D5E4F3G2H1"
                  timestamp={Date.now() - 45000}
                  inline={true}
                  network="testnet"
                />
              </div>
            </div>
          </div>
          <pre className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
{`// Badge Block
<VerifiedTxBadge
  txHash="TST9A8B7C6D5E4F3G2H1"
  timestamp={Date.now() - 45000}
  inline={false}
  network="testnet"
/>

// Badge Inline
<VerifiedTxBadge
  txHash="TST9A8B7C6D5E4F3G2H1"
  timestamp={Date.now() - 45000}
  inline={true}
  network="testnet"
/>`}
          </pre>
        </section>

        {/* Latency Indicator */}
        <section className="space-y-4">
          <div>
            <h2 className="text-white text-2xl mb-2">4. Latency Indicator</h2>
            <p className="text-gray-400">Indicador visual de performance da rede com métricas em tempo real</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LatencyIndicator
              confirmationTime={3500}
              showDetails={true}
              size="md"
            />
            <LatencyIndicator
              confirmationTime={2800}
              showDetails={true}
              size="md"
            />
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Small:</span>
              <LatencyIndicator confirmationTime={3200} showDetails={false} size="sm" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Medium:</span>
              <LatencyIndicator confirmationTime={3800} showDetails={false} size="md" />
            </div>
          </div>
          <pre className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
{`<LatencyIndicator
  confirmationTime={3500}
  showDetails={true}
  size="md"
/>`}
          </pre>
        </section>

        {/* Audit Modal */}
        <section className="space-y-4">
          <div>
            <h2 className="text-white text-2xl mb-2">5. Audit Modal</h2>
            <p className="text-gray-400">Modal completo com histórico, filtros e exportação CSV</p>
          </div>
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="w-full px-6 py-4 rounded-xl bg-[#2979FF] hover:bg-[#1E5FE0] text-white transition-all flex items-center justify-center gap-2"
          >
            <span>🔍 Abrir Modal de Auditoria</span>
          </button>
          <pre className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-4 overflow-x-auto text-xs text-gray-300">
{`const [isOpen, setIsOpen] = useState(false);

<AuditModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  network="testnet"
/>`}
          </pre>
        </section>

        {/* Combined Example */}
        <section className="space-y-4">
          <div>
            <h2 className="text-white text-2xl mb-2">6. Exemplo Completo Integrado</h2>
            <p className="text-gray-400">Todos os componentes trabalhando juntos em um dashboard real</p>
          </div>
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6 space-y-6">
            <LiveTestnetBanner showLatency={true} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

            <div className="space-y-3">
              <h4 className="text-white">Últimas Transações</h4>
              <VerifiedTxBadge
                txHash="TST9A8B7C6D5E4F3G2H1"
                timestamp={Date.now() - 45000}
                inline={false}
                network="testnet"
              />
              <VerifiedTxBadge
                txHash="TST8Z7Y6X5W4V3U2T1S0"
                timestamp={Date.now() - 120000}
                inline={false}
                network="testnet"
              />
            </div>

            <button
              onClick={() => setIsAuditModalOpen(true)}
              className="w-full px-4 py-3 rounded-lg bg-[#2979FF]/10 hover:bg-[#2979FF]/20 border border-[#2979FF]/30 hover:border-[#2979FF]/50 text-[#2979FF] transition-all"
            >
              📊 Ver Auditoria Completa
            </button>
          </div>
        </section>

        {/* Component Features */}
        <section className="bg-gradient-to-br from-[#00E676]/5 to-[#2979FF]/5 border border-gray-800 rounded-xl p-6">
          <h2 className="text-white text-2xl mb-4">✨ Recursos dos Componentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-[#00E676]">Real-time Updates</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Ledger index incrementando</li>
                <li>• Latência variável (2-6s)</li>
                <li>• Countdown automático</li>
                <li>• Animações fluidas</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-[#2979FF]">Auditabilidade</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Links diretos para XRPL Explorer</li>
                <li>• TX Hash sempre visível</li>
                <li>• Exportação CSV</li>
                <li>• Filtros por tipo de TX</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-[#00E676]">UX Premium</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Hover states interativos</li>
                <li>• Badges de status dinâmicos</li>
                <li>• Responsive design</li>
                <li>• Cores semânticas</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-[#2979FF]">Performance</h3>
              <ul className="text-gray-400 text-sm space-y-1">
                <li>• Componentes modulares</li>
                <li>• Props tipadas (TypeScript)</li>
                <li>• Memoização otimizada</li>
                <li>• Zero dependências extras</li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        network="testnet"
      />
    </div>
  );
}
