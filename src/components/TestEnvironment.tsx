import React, { useState } from 'react';
import { SoftPOSMockup } from './SoftPOSMockup';
import { TestDashboard } from './TestDashboard';
import { APITestPanel } from './APITestPanel';
import { RotateCcw, Users, Crown, Info, ExternalLink, FlaskConical, Shield, Zap, BarChart3, Smartphone, X, Code } from 'lucide-react';

interface Sale {
  id: string;
  amount: string;
  txHash: string;
  timestamp: string;
  status: 'completed';
}

export function TestEnvironment() {
  const [sales, setSales] = useState<Sale[]>([]);
  const [mode, setMode] = useState<'employee' | 'owner'>('employee');
  const [showTutorial, setShowTutorial] = useState(true);
  const [activeTab, setActiveTab] = useState<'simulator' | 'api'>('simulator');

  const handleSaleComplete = (amount: string, txHash: string) => {
    const newSale: Sale = {
      id: `sale-${Date.now()}`,
      amount,
      txHash,
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      status: 'completed',
    };
    setSales(prev => [...prev, newSale]);
  };

  const handleReset = () => {
    if (confirm('Resetar todas as vendas de teste?')) {
      setSales([]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-white text-3xl">Ambiente de Teste - Soft-POS</h1>
                <span className="px-3 py-1 rounded-lg text-sm bg-[#00E676]/10 text-[#00E676] border border-[#00E676]/30">
                  XRPL Testnet • Auditável
                </span>
              </div>
              <p className="text-white/90">
                Transações reais verificáveis em testnet.xrpl.org antes de baixar o app
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Resetar</span>
            </button>
            <a
              href="https://test.xrplexplorer.com/faucet"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-white hover:bg-gray-100 text-gray-900 transition-all flex items-center gap-2"
            >
              <span>Faucet Testnet</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-xl bg-[#1A1F2B] border border-gray-800 p-1">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'simulator'
                ? 'bg-[#2979FF] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span>Simulador Soft-POS</span>
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === 'api'
                ? 'bg-[#00E676] text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Code className="w-5 h-5" />
            <span>Testes de API E2E</span>
          </button>
        </div>
      </div>

      {/* Tutorial Banner - Simulator Only */}
      {showTutorial && activeTab === 'simulator' && (
        <div className="bg-[#1A1F2B] border border-[#2979FF]/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2979FF]/20 flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-[#2979FF]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Como Testar o Soft-POS</h3>
              <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                <li>Digite um valor de venda no celular simulado (ex: R$ 50,00)</li>
                <li>Clique em "Gerar QR Code" para criar o QR híbrido PIX/Cartão/Cripto</li>
                <li>Use o botão "Simular Pagamento Recebido" para testar o fluxo</li>
                <li>Marque como "Entregue" para finalizar o Escrow e ver a liquidação D+0</li>
                <li>Alterne entre Modo Funcionário e Modo Dono para ver as diferenças de acesso</li>
              </ol>
            </div>
            <button
              onClick={() => setShowTutorial(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* API Tutorial Banner */}
      {activeTab === 'api' && (
        <div className="bg-gradient-to-br from-[#00E676]/10 to-[#00C766]/10 border border-[#00E676]/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00E676]/20 flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-[#00E676]" />
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Protocolo Final de Conexão E2E</h3>
              <p className="text-gray-300 text-sm mb-3">
                Teste todos os endpoints do backend antes do deploy no Vercel. Garanta que não haverá erros 404/500 em produção.
              </p>
              <div className="grid grid-cols-1 gap-3 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                    <span className="font-medium">XRPL Testnet WebSocket</span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3.5 font-mono">wss://s.altnet.rippletest.net:51233/</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-300 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E676]" />
                    <span className="font-medium">XRPL Testnet JSON-RPC</span>
                  </div>
                  <div className="text-xs text-gray-500 ml-3.5 font-mono">https://s.altnet.rippletest.net:51234/</div>
                </div>
                <div className="pt-2 border-t border-gray-800">
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <span>Local: Frontend :3001 | Backend :3000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content - Conditional based on active tab */}
      {activeTab === 'simulator' ? (
        <>
          {/* Mode Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex rounded-xl bg-[#1A1F2B] border border-gray-800 p-1">
              <button
                onClick={() => setMode('employee')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  mode === 'employee'
                    ? 'bg-[#F59E0B] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Modo Funcionário</span>
              </button>
              <button
                onClick={() => setMode('owner')}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  mode === 'owner'
                    ? 'bg-[#00E676] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Crown className="w-5 h-5" />
                <span>Modo Dono (Tesouraria)</span>
              </button>
            </div>
          </div>

          {/* Main Testing Area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Phone Mockup */}
            <div>
              <div className="bg-[#1A1F2B] border border-gray-800 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-[#2979FF]" />
                    <h2 className="text-white text-xl">Soft-POS Simulado</h2>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Interface real do DApp Mobile
                  </p>
                </div>
                <SoftPOSMockup onSaleComplete={handleSaleComplete} mode={mode} />
              </div>
            </div>

            {/* Right: Dashboard */}
            <div>
              <TestDashboard sales={sales} mode={mode} />
            </div>
          </div>
        </>
      ) : (
        /* API Testing Panel */
        <APITestPanel />
      )}

      {/* Info Cards - Only show on simulator tab */}
      {activeTab === 'simulator' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-5 h-5 text-[#2979FF]" />
            <h3 className="text-white">Segurança</h3>
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Todas as transações são executadas na XRPL Testnet com Escrow atômico.
          </p>
          <ul className="text-gray-500 text-xs space-y-1">
            <li>• Chaves isoladas via KMS</li>
            <li>• Escrow trustless on-chain</li>
            <li>• Sem valor monetário real</li>
          </ul>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-5 h-5 text-[#F59E0B]" />
            <h3 className="text-white">Performance</h3>
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Liquidação instantânea em 3-5 segundos na XRPL Testnet.
          </p>
          <ul className="text-gray-500 text-xs space-y-1">
            <li>• Consenso XRPL (não PoW)</li>
            <li>• Finality imediata</li>
            <li>• Taxa: ~0,00001 XRP</li>
          </ul>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-5 h-5 text-[#00E676]" />
            <h3 className="text-white">Tesouraria Ativa</h3>
          </div>
          <p className="text-gray-400 text-sm mb-3">
            Saldo rende automaticamente 5-8% APY em protocolos DeFi.
          </p>
          <ul className="text-gray-500 text-xs space-y-1">
            <li>• Yield automático</li>
            <li>• Colateralização mXRP</li>
            <li>• Sem lock-up</li>
          </ul>
        </div>
        </div>
      )}

      {/* CTA - Only show on simulator tab */}
      {activeTab === 'simulator' && (
        <div className="bg-gradient-to-br from-[#00E676]/10 to-[#00C766]/10 border border-[#00E676]/30 rounded-xl p-8 text-center">
          <h3 className="text-white text-2xl mb-3">Pronto para usar de verdade?</h3>
          <p className="text-gray-300 mb-6">
            Baixe o DApp Mobile PAYHUB e elimine maquininhas da sua loja
          </p>
          <a
            href="#softpos"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00E676] hover:bg-[#00C766] text-white transition-all"
          >
            <span>Baixar Soft-POS Agora</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      )}
    </div>
  );
}
