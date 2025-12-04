import React, { useState, useEffect } from 'react';
import { Shield, Zap, TrendingUp, FileText, Lock, CheckCircle, Activity } from 'lucide-react';
import { ToastContainer, ToastType } from './components/Toast';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface SecurityStatus {
  jwtValid: boolean;
  lastCheck: string;
  processing: 'idle' | 'processing' | 'success' | 'error';
}

interface Balance {
  rlusd: number;
  brl: number;
  yield: number;
}

type ActionState = 'idle' | 'processing' | 'success' | 'error';

export default function AppInstitucional() {
  const [securityStatus, setSecurityStatus] = useState<SecurityStatus>({
    jwtValid: true,
    lastCheck: new Date().toISOString(),
    processing: 'idle',
  });
  const [balance, setBalance] = useState<Balance>({
    rlusd: 12500.00,
    brl: 62500.00, // 1 RLUSD ≈ R$ 5.00
    yield: 6.2,
  });
  const [yieldActive, setYieldActive] = useState(false);
  const [actionStates, setActionStates] = useState<{
    liquidar: ActionState;
    yield: ActionState;
    compliance: ActionState;
    pagamento: ActionState;
  }>({
    liquidar: 'idle',
    yield: 'idle',
    compliance: 'idle',
    pagamento: 'idle',
  });
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // API: GET /api/health - Verificação JWT periódica
  useEffect(() => {
    const checkHealth = async () => {
      try {
        // const response = await fetch('/api/health', {
        //   headers: { 'Authorization': `Bearer ${localStorage.getItem('jwt')}` }
        // });
        setSecurityStatus(prev => ({
          ...prev,
          jwtValid: true,
          lastCheck: new Date().toISOString(),
        }));
      } catch {
        setSecurityStatus(prev => ({ ...prev, jwtValid: false }));
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // 30s
    return () => clearInterval(interval);
  }, []);

  // API: POST /api/escrow-finish
  // Fonte: api/escrow-finish.js:52
  const handleLiquidarD0 = async () => {
    setActionStates(prev => ({ ...prev, liquidar: 'processing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // const response = await fetch('/api/escrow-finish', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     owner: 'rN7n7otQDd6FczFgLdlmMlLh1bVPGaghzz',
      //     offerSequence: 987654,
      //   }),
      // });
      
      setActionStates(prev => ({ ...prev, liquidar: 'success' }));
      addToast('success', 'Liquidação D+0 concluída. Fundos disponíveis.');
      setBalance(prev => ({ ...prev, rlusd: prev.rlusd + 500 }));
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, liquidar: 'idle' }));
      }, 3000);
    } catch (error) {
      setActionStates(prev => ({ ...prev, liquidar: 'error' }));
      addToast('error', 'Erro na liquidação. Tente novamente.');
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, liquidar: 'idle' }));
      }, 3000);
    }
  };

  // API: POST /api/v1/merchant/yield/activate
  // Fonte: server.js:88
  const handleAtivarYield = async () => {
    setActionStates(prev => ({ ...prev, yield: 'processing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // const response = await fetch('/api/v1/merchant/yield/activate', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      
      setYieldActive(true);
      setActionStates(prev => ({ ...prev, yield: 'success' }));
      addToast('success', 'Yield automático ativado. Rendimento 5-8% APY.');
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, yield: 'idle' }));
      }, 3000);
    } catch (error) {
      setActionStates(prev => ({ ...prev, yield: 'error' }));
      addToast('error', 'Erro ao ativar yield. Tente novamente.');
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, yield: 'idle' }));
      }, 3000);
    }
  };

  // API: GET /api/v1/compliance/report
  // Fonte: server.js:92
  const handleGerarRelatorio = async () => {
    setActionStates(prev => ({ ...prev, compliance: 'processing' }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      
      // const response = await fetch('/api/v1/compliance/report', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      //   },
      // });
      
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'compliance-report.csv';
      // a.click();
      
      setActionStates(prev => ({ ...prev, compliance: 'success' }));
      addToast('success', 'Relatório CARF/OCDE gerado. Download iniciado.');
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, compliance: 'idle' }));
      }, 3000);
    } catch (error) {
      setActionStates(prev => ({ ...prev, compliance: 'error' }));
      addToast('error', 'Erro ao gerar relatório. Tente novamente.');
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, compliance: 'idle' }));
      }, 3000);
    }
  };

  // API: POST /api/escrow-create + POST /api/escrow-finish (Fluxo Atômico)
  // Fonte: api/escrow-create.js:56 + api/escrow-finish.js:52
  const handleReceberPagamento = async () => {
    setActionStates(prev => ({ ...prev, pagamento: 'processing' }));
    
    try {
      // Fluxo: Trustline RLUSD → EscrowCreate IOU → EscrowFinish
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // 1. Trustline check (GET /api/trustline-rlusd)
      // 2. EscrowCreate (POST /api/escrow-create)
      // 3. EscrowFinish (POST /api/escrow-finish) - D+0
      
      setActionStates(prev => ({ ...prev, pagamento: 'success' }));
      addToast('success', 'Pagamento recebido e liquidado D+0.');
      setBalance(prev => ({ ...prev, rlusd: prev.rlusd + 1000 }));
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, pagamento: 'idle' }));
      }, 3000);
    } catch (error) {
      setActionStates(prev => ({ ...prev, pagamento: 'error' }));
      addToast('error', 'Erro no recebimento. Tente novamente.');
      
      setTimeout(() => {
        setActionStates(prev => ({ ...prev, pagamento: 'idle' }));
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#000A14]">
      {/* Header Institucional - Soft-POS */}
      <header className="bg-[#001F3F] border-b border-[#00FF84]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#00FF84] to-[#00D66E] flex items-center justify-center shadow-lg">
              <span className="text-[#001F3F] font-bold text-base sm:text-lg">P</span>
            </div>
            <div>
              <div className="text-white font-bold tracking-tight text-sm sm:text-base">PAYHUB</div>
              <div className="text-[#00FF84] text-[10px] sm:text-xs tracking-wider uppercase">Tesouraria Ativa</div>
            </div>
          </div>

          {/* Indicador de Segurança - JWT Status */}
          <div className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl border-2 transition-all ${
            securityStatus.jwtValid
              ? 'bg-[#00FF84]/10 border-[#00FF84]'
              : 'bg-red-500/10 border-red-500'
          }`}>
            {securityStatus.jwtValid ? (
              <>
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF84]" />
                <div className="hidden sm:block">
                  <p className="text-[#00FF84] text-xs sm:text-sm font-medium">Segurança Ativa</p>
                  <p className="text-[#00FF84]/60 text-[10px] sm:text-xs">Bearer JWT</p>
                </div>
                <span className="block sm:hidden text-[#00FF84] text-xs font-medium">Seguro</span>
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#00FF84]" />
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <div className="hidden sm:block">
                  <p className="text-red-500 text-xs sm:text-sm font-medium">Sessão Expirada</p>
                  <p className="text-red-500/60 text-[10px] sm:text-xs">Reautenticar</p>
                </div>
                <span className="block sm:hidden text-red-500 text-xs font-medium">Expirado</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content - Mobile First */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Painel de Saldo (API: GET /api/trustline-rlusd - Fonte: server.js:76) */}
        <div className="bg-gradient-to-br from-[#001F3F] to-[#003366] rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 border border-[#00FF84]/20 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex-1">
              <p className="text-[#00FF84]/80 text-xs sm:text-sm mb-2 uppercase tracking-wider">Saldo Disponível</p>
              <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                <h1 className="text-4xl sm:text-5xl text-white font-light tracking-tight">
                  {balance.rlusd.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </h1>
                <span className="text-[#00FF84] text-lg sm:text-xl">RLUSD</span>
              </div>
              <p className="text-white/50 text-sm mt-2">
                R$ {balance.brl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#00FF84]" />
                <p className="text-[#00FF84]/80 text-xs sm:text-sm uppercase tracking-wider">APY Atual</p>
              </div>
              <p className="text-3xl sm:text-4xl text-[#00FF84] font-light">{balance.yield}%</p>
              <p className="text-white/50 text-xs mt-1">Rendimento automático</p>
            </div>
          </div>

          {/* Status Yield */}
          <div className={`mt-6 px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl border-2 inline-flex items-center gap-3 ${
            yieldActive
              ? 'bg-[#00FF84]/10 border-[#00FF84]'
              : 'bg-white/5 border-white/10'
          }`}>
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
              yieldActive ? 'bg-[#00FF84] animate-pulse' : 'bg-white/30'
            }`}></div>
            <span className={`text-xs sm:text-sm font-medium ${
              yieldActive ? 'text-[#00FF84]' : 'text-white/50'
            }`}>
              {yieldActive ? 'Yield Ativo' : 'Yield Inativo'}
            </span>
          </div>
        </div>

        {/* Grid de Ações Principais - Soft-POS */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Botão: RECEBER PAGAMENTO E LIQUIDAR D+0 */}
          {/* API: POST /api/escrow-create + POST /api/escrow-finish */}
          {/* Fonte: api/escrow-create.js:56 + api/escrow-finish.js:52 */}
          <button
            onClick={handleReceberPagamento}
            disabled={actionStates.pagamento === 'processing'}
            className={`group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl ${
              actionStates.pagamento === 'success'
                ? 'bg-gradient-to-br from-[#00FF84] to-[#00D66E]'
                : actionStates.pagamento === 'error'
                ? 'bg-gradient-to-br from-red-500 to-red-600'
                : 'bg-gradient-to-br from-[#00FF84] to-[#00D66E] hover:from-[#00D66E] hover:to-[#00FF84]'
            } ${actionStates.pagamento === 'idle' ? 'hover:scale-[1.02]' : ''}`}
          >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[#001F3F]/20 flex items-center justify-center group-hover:bg-[#001F3F]/30 transition-colors flex-shrink-0">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#001F3F]" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h3 className="text-[#001F3F] text-base sm:text-xl font-bold mb-0.5 sm:mb-1 leading-tight">
                  LIQUIDAR D+0
                </h3>
                <p className="text-[#001F3F]/70 text-xs sm:text-sm leading-snug">
                  Liquidação instantânea
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[#001F3F]/80 text-[10px] sm:text-sm">
              <span className="truncate">POST /api/escrow-finish</span>
              {actionStates.pagamento === 'processing' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-[#001F3F]/30 border-t-[#001F3F] rounded-full animate-spin flex-shrink-0 ml-2"></div>
              )}
            </div>
          </button>

          {/* Botão: LIQUIDAR D+0 (escrows pendentes) */}
          {/* API: POST /api/escrow-finish */}
          {/* Fonte: api/escrow-finish.js:52, server.js:72-95 */}
          <button
            onClick={handleLiquidarD0}
            disabled={actionStates.liquidar === 'processing'}
            className={`group relative rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl border-2 ${
              actionStates.liquidar === 'success'
                ? 'bg-[#003366] border-[#00FF84]'
                : actionStates.liquidar === 'error'
                ? 'bg-[#001F3F] border-red-500'
                : 'bg-[#001F3F] hover:bg-[#003366] border-[#00FF84]'
            } ${actionStates.liquidar === 'idle' ? 'hover:scale-[1.02]' : ''}`}
          >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-[#00FF84]/10 flex items-center justify-center group-hover:bg-[#00FF84]/20 transition-colors flex-shrink-0">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#00FF84]" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h3 className="text-white text-base sm:text-xl font-bold mb-0.5 sm:mb-1 leading-tight">
                  FINALIZAR ESCROWS
                </h3>
                <p className="text-white/60 text-xs sm:text-sm leading-snug">
                  Escrows pendentes
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-white/70 text-[10px] sm:text-sm">
              <span className="truncate">POST /api/escrow-finish</span>
              {actionStates.liquidar === 'processing' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0 ml-2"></div>
              )}
            </div>
          </button>
        </div>

        {/* Grid de Ações Secundárias */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Botão: ATIVAR YIELD AUTOMÁTICO */}
          {/* API: POST /api/v1/merchant/yield/activate */}
          {/* Fonte: server.js:88 */}
          <button
            onClick={handleAtivarYield}
            disabled={actionStates.yield === 'processing' || yieldActive}
            className={`group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-2 ${
              actionStates.yield === 'success' || yieldActive
                ? 'bg-[#003366] border-[#00FF84]'
                : actionStates.yield === 'error'
                ? 'bg-[#001F3F] border-red-500'
                : 'bg-[#001F3F] hover:bg-[#003366] border-white/10 hover:border-[#00FF84]/50'
            } ${actionStates.yield === 'idle' && !yieldActive ? 'hover:scale-[1.02]' : ''}`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00FF84]/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF84]" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h3 className="text-white text-sm sm:text-base mb-0.5 sm:mb-1 leading-tight">
                  {yieldActive ? 'Yield Ativo' : 'Ativar Yield Automático'}
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-snug">
                  Rentabilidade 5-8% APY
                </p>
              </div>
              {actionStates.yield === 'processing' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
              )}
              {yieldActive && (
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF84] flex-shrink-0" />
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-[10px] sm:text-xs text-white/40 truncate">POST /api/v1/merchant/yield/activate</p>
            </div>
          </button>

          {/* Botão: GERAR RELATÓRIO COMPLIANCE */}
          {/* API: GET /api/v1/compliance/report */}
          {/* Fonte: server.js:92 */}
          <button
            onClick={handleGerarRelatorio}
            disabled={actionStates.compliance === 'processing'}
            className={`group relative rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-2 ${
              actionStates.compliance === 'success'
                ? 'bg-[#003366] border-[#00FF84]'
                : actionStates.compliance === 'error'
                ? 'bg-[#001F3F] border-red-500'
                : 'bg-[#001F3F] hover:bg-[#003366] border-white/10 hover:border-[#00FF84]/50'
            } ${actionStates.compliance === 'idle' ? 'hover:scale-[1.02]' : ''}`}
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#00FF84]/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#00FF84]" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <h3 className="text-white text-sm sm:text-base mb-0.5 sm:mb-1 leading-tight">
                  Relatório Compliance
                </h3>
                <p className="text-white/50 text-xs sm:text-sm leading-snug">
                  Auditoria CARF/OCDE
                </p>
              </div>
              {actionStates.compliance === 'processing' && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
              )}
            </div>

            <div className="mt-3 pt-3 border-t border-white/10">
              <p className="text-[10px] sm:text-xs text-white/40 truncate">GET /api/v1/compliance/report</p>
            </div>
          </button>
        </div>

        {/* Info Footer - Segurança */}
        <div className="mt-6 sm:mt-8 bg-[#001F3F]/50 border border-[#00FF84]/20 rounded-xl p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#00FF84] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-white/90 text-xs sm:text-sm mb-2 leading-relaxed">
                <strong className="text-[#00FF84]">Assinatura protegida:</strong> Operação processada no servidor. Todas as rotas protegidas por Bearer JWT com TTL curto.
              </p>
              <p className="text-white/60 text-[10px] sm:text-xs leading-relaxed">
                Compliance: SOC 2 Type II · ISO 27001 · LGPD · CARF/OCDE (IN RFB nº 2.291/2025)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
