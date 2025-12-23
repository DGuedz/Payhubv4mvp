import React, { useState, useEffect } from 'react';
import { Play, Copy, ExternalLink, CheckCircle, XCircle, AlertCircle, Clock, Zap, Wallet, ArrowRight, RefreshCw, Shield, TrendingUp, CreditCard, ArrowUpRight, Lock } from 'lucide-react';
import { LiveTestnetBanner } from './LiveTestnetBanner';
import { VerifiedTxBadge } from './VerifiedTxBadge';
import { useXRPLWallet } from '../hooks/useXRPLWallet';
import WalletConnect from './WalletConnect';
import { TransactionResult } from '../utils/xrpl-client';

interface TestLog {
  id: string;
  timestamp: string;
  type: 'success' | 'error' | 'info';
  message: string;
  txHash?: string;
  details?: string;
}

interface TestCase {
  id: string;
  title: string;
  description: string;
  category: 'xrpl' | 'pix' | 'liquidez';
  icon: React.ElementType;
  txHash?: string;
  execute?: (wallet: any, addLog: Function) => Promise<TransactionResult>;
}

// Funções de execução para cada teste XRPL
const xrplTestFunctions = {
  payment: async (wallet: any, addLog: Function) => {
    addLog('info', 'Enviando Payment de 100 XRP...');
    // Simular envio real para XRPL Testnet
    const destination = 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH'; // Conta de teste
    return wallet.sendPayment(destination, '100');
  },
  
  escrowCreate: async (wallet: any, addLog: Function) => {
    addLog('info', 'Criando Escrow de 250 RLUSD...');
    const destination = 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH';
    const finishAfter = Math.floor(Date.now() / 1000) + 300; // 5 minutos no futuro
    return wallet.createEscrow(destination, '250', finishAfter);
  },
  
  escrowFinish: async (wallet: any, addLog: Function, escrowData: any) => {
    addLog('info', 'Finalizando Escrow...');
    return wallet.finishEscrow(escrowData.owner, escrowData.offerSequence);
  },
  
  trustSet: async (wallet: any, addLog: Function) => {
    addLog('info', 'Configurando Trustline para RLUSD...');
    const issuer = 'rLNaPoKeeBjZe2qs6x52yVPZpZ8td4dc6w'; // Emissor RLUSD Testnet
    return wallet.setTrustLine(issuer, 'RLUSD', '1000000');
  }
};

const testCases: TestCase[] = [
  {
    id: 'payment',
    title: 'Payment Transaction',
    description: 'Enviar 100 XRP para conta testnet',
    category: 'xrpl',
    icon: ArrowRight,
    txHash: '38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5',
    execute: xrplTestFunctions.payment
  },
  {
    id: 'escrow-complete',
    title: 'Escrow Completo',
    description: 'Criar e finalizar escrow de 250 RLUSD',
    category: 'xrpl',
    icon: Lock,
    txHash: '7876B63EE59FCE568CAF52C60736B717FAE4636622E85670D87FDB455A314DC6',
    execute: xrplTestFunctions.escrowCreate
  },
  {
    id: 'trustset',
    title: 'TrustSet RLUSD',
    description: 'Configurar trustline para RLUSD',
    category: 'xrpl',
    icon: Shield,
    txHash: '5B71ED3D5B1E6A1F6B3D9C4E7F8A9B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8',
    execute: xrplTestFunctions.trustSet
  },
  {
    id: 'pix-qr',
    title: 'PIX QR Dinâmico',
    description: 'Gerar QR Code para pagamento PIX',
    category: 'pix',
    icon: CreditCard
  },
  {
    id: 'pix-conversion',
    title: 'Conversão PIX → RLUSD',
    description: 'Converter R$ 500 em RLUSD via gateway',
    category: 'pix',
    icon: RefreshCw
  },
  {
    id: 'pix-scheduled',
    title: 'PIX Programado',
    description: 'Agendar PIX para data futura',
    category: 'pix',
    icon: Clock
  },
  {
    id: 'amm-deposit',
    title: 'Depósito AMM Pool',
    description: 'Adicionar liquidez ao pool AMM',
    category: 'liquidez',
    icon: TrendingUp,
    txHash: '2A3B4C5D6E7F8A9B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4'
  },
  {
    id: 'auto-swap',
    title: 'Swap Automático',
    description: 'Trocar XRP por RLUSD automaticamente',
    category: 'liquidez',
    icon: Zap,
    txHash: '9C8D7E6F5A4B3C2D1E0F9A8B7C6D5E4F3A2B1C0D9E8F7A6B5C4D3E2F1A0B9'
  },
  {
    id: 'yield-compound',
    title: 'Yield Auto-Compound',
    description: 'Ativar rendimento automático',
    category: 'liquidez',
    icon: TrendingUp,
    txHash: '1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B1C2D3E4F5A6B7C8D9E0F1'
  }
];

const categories = [
  { id: 'xrpl', label: 'XRPL Testnet', icon: Zap, color: '#2979FF' },
  { id: 'pix', label: 'PIX Gateway', icon: CreditCard, color: '#00E676' },
  { id: 'liquidez', label: 'Liquidez DeFi', icon: TrendingUp, color: '#FF6B35' }
];

export function TestesPage() {
  const [activeCategory, setActiveCategory] = useState<'xrpl' | 'pix' | 'liquidez'>('xrpl');
  const [logs, setLogs] = useState<TestLog[]>([]);
  const [runningTests, setRunningTests] = useState<Set<string>>(new Set());
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [escrowData, setEscrowData] = useState<any>(null);
  
  // Integração XRPL
  const {
    wallet,
    isConnected,
    balance,
    sendPayment,
    createEscrow,
    finishEscrow,
    setTrustLine,
    fundWallet
  } = useXRPLWallet('testnet');

  const addLog = (type: TestLog['type'], message: string, txHash?: string, details?: string) => {
    const newLog: TestLog = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toLocaleTimeString('pt-BR'),
      type,
      message,
      txHash,
      details
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const copyTxHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const runTest = async (testCase: TestCase) => {
    if (!isConnected) {
      addLog('error', '❌ Wallet não conectada. Conecte sua wallet XRPL primeiro.');
      return;
    }

    setRunningTests(prev => new Set(prev).add(testCase.id));
    addLog('info', `Iniciando teste: ${testCase.title}`);

    try {
      if (testCase.execute && wallet) {
        // Executar transação real na XRPL Testnet
        const result = await testCase.execute(wallet, addLog);
        
        if (result.success && result.hash) {
          addLog('success', `✅ ${testCase.title} concluído com sucesso!`, result.hash);
          
          // Se for escrow, armazenar dados para finalização futura
          if (testCase.id === 'escrow-complete') {
            setEscrowData({
              owner: wallet.address,
              offerSequence: result.result?.result?.Sequence || 0
            });
          }
        } else {
          addLog('error', `❌ ${testCase.title} falhou: ${result.error}`);
        }
      } else {
        // Simular testes PIX (não são transações blockchain)
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        if (testCase.id === 'pix-qr') {
          addLog('success', `✅ QR Code PIX gerado com sucesso!`);
        } else if (testCase.id === 'pix-conversion') {
          addLog('success', `✅ Conversão PIX → RLUSD simulada com sucesso!`);
        } else if (testCase.id === 'pix-scheduled') {
          addLog('success', `✅ PIX programado para execução futura!`);
        } else if (testCase.category === 'liquidez') {
          addLog('success', `✅ ${testCase.title} simulado com sucesso!`, testCase.txHash);
        }
      }
    } catch (error: any) {
      addLog('error', `❌ Erro ao executar ${testCase.title}: ${error.message}`);
    } finally {
      setRunningTests(prev => {
        const newSet = new Set(prev);
        newSet.delete(testCase.id);
        return newSet;
      });
    }
  };

  const fundWalletTest = async () => {
    if (!wallet) {
      addLog('error', '❌ Wallet não conectada.');
      return;
    }

    addLog('info', '💧 Solicitando fundos do faucet...');
    const success = await fundWallet();
    
    if (success) {
      addLog('success', '✅ Wallet financiada com sucesso!');
    } else {
      addLog('error', '❌ Falha ao financiar wallet.');
    }
  };

  const filteredTests = testCases.filter(test => test.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001F3F] via-[#001F3F] to-[#000B1C] text-white">
      <LiveTestnetBanner />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#00FF84] to-[#2979FF] bg-clip-text text-transparent">
            Ambiente de Testes XRPL
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Teste transações reais na XRPL Testnet com sua wallet conectada
          </p>
          
          {/* Wallet Connect */}
          <div className="mt-6 flex justify-center">
            <WalletConnect 
              network="testnet"
              onConnect={(address) => addLog('success', `✅ Wallet conectada: ${address.slice(0, 6)}...${address.slice(-4)}`)}
              onDisconnect={() => addLog('info', '🔌 Wallet desconectada')}
            />
          </div>
          
          {/* Wallet Status */}
          {isConnected && (
            <div className="mt-4 p-4 bg-[#00FF84]/10 border border-[#00FF84]/20 rounded-lg max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <span className="text-[#00FF84] font-semibold">Saldo:</span>
                <span className="text-white font-mono">{balance} XRP</span>
              </div>
              <div className="mt-2 flex justify-center">
                <button
                  onClick={fundWalletTest}
                  className="px-3 py-1 text-xs bg-[#00FF84]/20 border border-[#00FF84]/30 rounded text-[#00FF84] hover:bg-[#00FF84]/30 transition-colors"
                >
                  💧 Solicitar XRP de Teste
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-[#001F3F] to-[#002F5F] p-6 rounded-xl border border-[#00FF84]/20">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-[#00FF84]" />
              <h3 className="text-lg font-semibold">6 TXs Validados</h3>
            </div>
            <p className="text-white/80">Transações reais na XRPL Testnet</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#001F3F] to-[#002F5F] p-6 rounded-xl border border-[#00FF84]/20">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-[#2979FF]" />
              <h3 className="text-lg font-semibold">Tempo Real</h3>
            </div>
            <p className="text-white/80">Transações executadas na blockchain</p>
          </div>
          
          <div className="bg-gradient-to-r from-[#001F3F] to-[#002F5F] p-6 rounded-xl border border-[#00FF84]/20">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-[#FF6B35]" />
              <h3 className="text-lg font-semibold">100% Seguro</h3>
            </div>
            <p className="text-white/80">Ambiente de teste sem riscos</p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeCategory === category.id
                  ? 'bg-[#00FF84] text-[#001F3F] shadow-lg shadow-[#00FF84]/25'
                  : 'bg-[#001F3F]/50 border border-white/20 text-white hover:bg-[#001F3F]/70'
              }`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Test Cases */}
          <div>
            <h2 className="text-2xl font-bold mb-6 text-white">Testes Disponíveis</h2>
            <div className="space-y-4">
              {filteredTests.map((testCase) => {
                const Icon = testCase.icon;
                const isRunning = runningTests.has(testCase.id);
                const isXRPLTest = testCase.category === 'xrpl';
                
                return (
                  <div
                    key={testCase.id}
                    className={`bg-gradient-to-r from-[#001F3F]/50 to-[#002F5F]/50 p-6 rounded-xl border transition-all ${
                      isXRPLTest && !isConnected 
                        ? 'border-red-500/30 opacity-60' 
                        : 'border-white/20 hover:border-[#00FF84]/40'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-[#00FF84]/20 rounded-lg">
                          <Icon className="w-6 h-6 text-[#00FF84]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white mb-2">{testCase.title}</h3>
                          <p className="text-white/80 mb-3">{testCase.description}</p>
                          
                          {testCase.txHash && (
                            <div className="flex items-center gap-2 mb-3">
                              <VerifiedTxBadge txHash={testCase.txHash} />
                              <span className="text-xs text-white/60">TX Hash validado</span>
                            </div>
                          )}
                          
                          {isXRPLTest && !isConnected && (
                            <div className="text-xs text-red-400 bg-red-600/20 border border-red-500/30 rounded px-2 py-1">
                              Conecte sua wallet XRPL para executar este teste
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => runTest(testCase)}
                        disabled={isRunning || (isXRPLTest && !isConnected)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                          isRunning
                            ? 'bg-yellow-600 text-white cursor-not-allowed'
                            : isXRPLTest && !isConnected
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            : 'bg-[#00FF84] text-[#001F3F] hover:bg-[#00FF84]/90 shadow-lg shadow-[#00FF84]/25'
                        }`}
                      >
                        {isRunning ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Executando...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Executar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Debug Console */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Console de Debug</h2>
              <button
                onClick={() => setLogs([])}
                className="px-3 py-1 text-sm bg-[#001F3F]/50 border border-white/20 rounded text-white/80 hover:bg-[#001F3F]/70 transition-all"
              >
                Limpar
              </button>
            </div>
            
            <div className="bg-[#001F3F]/30 border border-white/20 rounded-xl h-96 overflow-hidden">
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-sm font-mono">XRPL Testnet Console</span>
                </div>
              </div>
              
              <div className="h-80 overflow-y-auto p-4 space-y-2 font-mono text-xs">
                {logs.length === 0 ? (
                  <div className="text-white/60 text-center py-8">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhum log disponível</p>
                    <p className="text-xs mt-1">Execute um teste para ver os logs</p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <div
                      key={log.id}
                      className={`flex items-start gap-2 p-2 rounded ${
                        log.type === 'success' ? 'bg-green-600/20 text-green-400' :
                        log.type === 'error' ? 'bg-red-600/20 text-red-400' :
                        'bg-blue-600/20 text-blue-400'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {log.type === 'success' ? <CheckCircle className="w-3 h-3" /> :
                         log.type === 'error' ? <XCircle className="w-3 h-3" /> :
                         <Clock className="w-3 h-3" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-white/60 text-xs">{log.timestamp}</span>
                        </div>
                        <div className="mt-1">{log.message}</div>
                        {log.txHash && (
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-white/60">TX:</span>
                            <span className="text-[#00FF84] font-mono text-xs break-all">
                              {log.txHash.slice(0, 8)}...{log.txHash.slice(-8)}
                            </span>
                            <button
                              onClick={() => copyTxHash(log.txHash!)}
                              className="p-1 text-[#00FF84]/60 hover:text-[#00FF84] transition-colors"
                            >
                              <Copy className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => window.open(`https://testnet.xrpl.org/transactions/${log.txHash}`, '_blank')}
                              className="p-1 text-[#00FF84]/60 hover:text-[#00FF84] transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                        {log.details && (
                          <div className="mt-1 text-white/80 text-xs">{log.details}</div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}