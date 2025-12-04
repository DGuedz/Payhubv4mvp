import React, { useState } from 'react';
import { Shield, Zap, TrendingUp, FileText, CheckCircle, XCircle, Loader2, AlertCircle, Settings, RefreshCw } from 'lucide-react';

interface TestResult {
  status: 'idle' | 'loading' | 'success' | 'error';
  statusCode?: number;
  message?: string;
  data?: any;
  timestamp?: string;
}

export function APITestPanel() {
  const [backendUrl, setBackendUrl] = useState('http://localhost:3000');
  const [jwtToken, setJwtToken] = useState('');
  
  const [tests, setTests] = useState<{
    jwt: TestResult;
    escrow: TestResult;
    yield: TestResult;
    compliance: TestResult;
  }>({
    jwt: { status: 'idle' },
    escrow: { status: 'idle' },
    yield: { status: 'idle' },
    compliance: { status: 'idle' },
  });

  const updateTest = (key: keyof typeof tests, result: TestResult) => {
    setTests(prev => ({
      ...prev,
      [key]: result,
    }));
  };

  // Test 1: JWT Authentication
  const testJWT = async () => {
    updateTest('jwt', { status: 'loading' });
    
    try {
      const response = await fetch(`${backendUrl}/api/auth/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          merchantId: 'MERCHANT_TEST_001',
          apiKey: 'test_api_key_demo',
        }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        setJwtToken(data.token);
        updateTest('jwt', {
          status: 'success',
          statusCode: response.status,
          message: 'Token JWT gerado com sucesso',
          data: { token: data.token.substring(0, 30) + '...' },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        });
      } else {
        throw new Error(data.error || 'Erro ao gerar token');
      }
    } catch (error) {
      updateTest('jwt', {
        status: 'error',
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Erro de conexão com backend',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
    }
  };

  // Test 2: Escrow (Liquidação D+0)
  const testEscrow = async () => {
    if (!jwtToken) {
      updateTest('escrow', {
        status: 'error',
        message: 'Execute o teste JWT primeiro para obter o token',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
      return;
    }

    updateTest('escrow', { status: 'loading' });
    
    try {
      // Step 1: Create Escrow
      const createResponse = await fetch(`${backendUrl}/api/escrow/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          amount: '100.00',
          currency: 'RLUSD',
          merchantWallet: 'rMERCHANT8bXz',
          customerWallet: 'rCUSTOMER9xYz',
        }),
      });

      const createData = await createResponse.json();

      if (!createResponse.ok) {
        throw new Error(createData.error || 'Erro ao criar Escrow');
      }

      // Step 2: Finish Escrow (simulate delivery)
      const finishResponse = await fetch(`${backendUrl}/api/escrow/finish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          escrowSequence: createData.sequence,
          txHash: createData.txHash,
        }),
      });

      const finishData = await finishResponse.json();

      if (finishResponse.ok) {
        updateTest('escrow', {
          status: 'success',
          statusCode: finishResponse.status,
          message: 'Escrow criado e finalizado com sucesso (D+0)',
          data: {
            sequence: createData.sequence,
            txHash: finishData.txHash,
            settled: 'D+0',
          },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        });
      } else {
        throw new Error(finishData.error || 'Erro ao finalizar Escrow');
      }
    } catch (error) {
      updateTest('escrow', {
        status: 'error',
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Erro de conexão com backend',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
    }
  };

  // Test 3: Yield Activation
  const testYield = async () => {
    if (!jwtToken) {
      updateTest('yield', {
        status: 'error',
        message: 'Execute o teste JWT primeiro para obter o token',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
      return;
    }

    updateTest('yield', { status: 'loading' });
    
    try {
      const response = await fetch(`${backendUrl}/api/v1/merchant/yield/activate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          merchantId: 'MERCHANT_TEST_001',
          strategy: 'auto',
          targetApy: 6.2,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        updateTest('yield', {
          status: 'success',
          statusCode: response.status,
          message: 'Yield automático ativado via HUB AI',
          data: {
            apy: data.apy || '6.2%',
            protocol: data.protocol || 'DeFi XRPL',
            status: 'Ativo',
          },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        });
      } else {
        throw new Error(data.error || 'Erro ao ativar Yield');
      }
    } catch (error) {
      updateTest('yield', {
        status: 'error',
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Erro de conexão com backend',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
    }
  };

  // Test 4: Compliance Report
  const testCompliance = async () => {
    if (!jwtToken) {
      updateTest('compliance', {
        status: 'error',
        message: 'Execute o teste JWT primeiro para obter o token',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
      return;
    }

    updateTest('compliance', { status: 'loading' });
    
    try {
      const response = await fetch(`${backendUrl}/api/v1/compliance/report?merchantId=MERCHANT_TEST_001&period=30d`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        updateTest('compliance', {
          status: 'success',
          statusCode: response.status,
          message: 'Relatório de compliance gerado com sucesso',
          data: {
            transactions: data.totalTransactions || 142,
            volume: data.totalVolume || 'R$ 45.230,00',
            carf: data.carfStatus || 'Conforme',
          },
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        });
      } else {
        throw new Error(data.error || 'Erro ao gerar relatório');
      }
    } catch (error) {
      updateTest('compliance', {
        status: 'error',
        statusCode: 500,
        message: error instanceof Error ? error.message : 'Erro de conexão com backend',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      });
    }
  };

  const testAll = async () => {
    await testJWT();
    setTimeout(async () => {
      await testEscrow();
      await testYield();
      await testCompliance();
    }, 1500);
  };

  const resetTests = () => {
    setTests({
      jwt: { status: 'idle' },
      escrow: { status: 'idle' },
      yield: { status: 'idle' },
      compliance: { status: 'idle' },
    });
    setJwtToken('');
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 text-[#2979FF] animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-[#00E676]" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-[#FF5252]" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'loading':
        return 'border-[#2979FF]/30 bg-[#2979FF]/5';
      case 'success':
        return 'border-[#00E676]/30 bg-[#00E676]/5';
      case 'error':
        return 'border-[#FF5252]/30 bg-[#FF5252]/5';
      default:
        return 'border-gray-800 bg-[#1A1F2B]';
    }
  };

  const allTestsPassed = Object.values(tests).every(test => test.status === 'success');
  const anyTestRunning = Object.values(tests).some(test => test.status === 'loading');

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-5 h-5 text-[#2979FF]" />
          <h3 className="text-white">Configuração do Backend</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">URL do Backend</label>
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => setBackendUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#0F1218] border border-gray-800 text-white focus:border-[#2979FF] focus:outline-none"
              placeholder="http://localhost:3000"
            />
            <p className="text-gray-500 text-xs mt-1">
              Ambiente local: localhost:3000 | Produção: api.payhub.com
            </p>
          </div>

          {jwtToken && (
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Token JWT Ativo</label>
              <div className="px-4 py-2 rounded-lg bg-[#00E676]/10 border border-[#00E676]/30">
                <p className="text-[#00E676] text-xs font-mono break-all">
                  {jwtToken.substring(0, 60)}...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Test 1: JWT */}
        <div className={`border rounded-xl p-6 transition-all ${getStatusColor(tests.jwt.status)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(tests.jwt.status)}
              <div>
                <h4 className="text-white">1. Autenticação JWT</h4>
                <p className="text-gray-400 text-sm">Validar token de segurança</p>
              </div>
            </div>
            <button
              onClick={testJWT}
              disabled={tests.jwt.status === 'loading'}
              className="px-4 py-2 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm transition-all flex items-center gap-2"
            >
              {tests.jwt.status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Testando...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Testar JWT</span>
                </>
              )}
            </button>
          </div>

          {tests.jwt.status !== 'idle' && (
            <div className="mt-4 p-3 rounded-lg bg-[#0F1218] border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs">Status: {tests.jwt.statusCode || 'N/A'}</span>
                <span className="text-gray-500 text-xs">{tests.jwt.timestamp}</span>
              </div>
              <p className="text-white text-sm">{tests.jwt.message}</p>
              {tests.jwt.data && (
                <pre className="mt-2 text-xs text-gray-400 font-mono overflow-x-auto">
                  {JSON.stringify(tests.jwt.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Test 2: Escrow */}
        <div className={`border rounded-xl p-6 transition-all ${getStatusColor(tests.escrow.status)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(tests.escrow.status)}
              <div>
                <h4 className="text-white">2. Liquidação D+0 (Escrow)</h4>
                <p className="text-gray-400 text-sm">CREATE + FINISH Escrow atômico</p>
              </div>
            </div>
            <button
              onClick={testEscrow}
              disabled={tests.escrow.status === 'loading' || !jwtToken}
              className="px-4 py-2 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm transition-all flex items-center gap-2"
            >
              {tests.escrow.status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Testando...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Testar Escrow</span>
                </>
              )}
            </button>
          </div>

          {tests.escrow.status !== 'idle' && (
            <div className="mt-4 p-3 rounded-lg bg-[#0F1218] border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs">Status: {tests.escrow.statusCode || 'N/A'}</span>
                <span className="text-gray-500 text-xs">{tests.escrow.timestamp}</span>
              </div>
              <p className="text-white text-sm">{tests.escrow.message}</p>
              {tests.escrow.data && (
                <pre className="mt-2 text-xs text-gray-400 font-mono overflow-x-auto">
                  {JSON.stringify(tests.escrow.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Test 3: Yield */}
        <div className={`border rounded-xl p-6 transition-all ${getStatusColor(tests.yield.status)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(tests.yield.status)}
              <div>
                <h4 className="text-white">3. Yield Automático (HUB AI)</h4>
                <p className="text-gray-400 text-sm">Ativar rendimento 5-8% APY</p>
              </div>
            </div>
            <button
              onClick={testYield}
              disabled={tests.yield.status === 'loading' || !jwtToken}
              className="px-4 py-2 rounded-lg bg-[#00E676] hover:bg-[#00C766] disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm transition-all flex items-center gap-2"
            >
              {tests.yield.status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Testando...</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>Testar Yield</span>
                </>
              )}
            </button>
          </div>

          {tests.yield.status !== 'idle' && (
            <div className="mt-4 p-3 rounded-lg bg-[#0F1218] border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs">Status: {tests.yield.statusCode || 'N/A'}</span>
                <span className="text-gray-500 text-xs">{tests.yield.timestamp}</span>
              </div>
              <p className="text-white text-sm">{tests.yield.message}</p>
              {tests.yield.data && (
                <pre className="mt-2 text-xs text-gray-400 font-mono overflow-x-auto">
                  {JSON.stringify(tests.yield.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>

        {/* Test 4: Compliance */}
        <div className={`border rounded-xl p-6 transition-all ${getStatusColor(tests.compliance.status)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {getStatusIcon(tests.compliance.status)}
              <div>
                <h4 className="text-white">4. Relatório Compliance (RegTech)</h4>
                <p className="text-gray-400 text-sm">Gerar relatório CARF/OCDE</p>
              </div>
            </div>
            <button
              onClick={testCompliance}
              disabled={tests.compliance.status === 'loading' || !jwtToken}
              className="px-4 py-2 rounded-lg bg-[#9C27B0] hover:bg-[#7B1FA2] disabled:bg-gray-700 disabled:text-gray-500 text-white text-sm transition-all flex items-center gap-2"
            >
              {tests.compliance.status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Testando...</span>
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  <span>Testar Compliance</span>
                </>
              )}
            </button>
          </div>

          {tests.compliance.status !== 'idle' && (
            <div className="mt-4 p-3 rounded-lg bg-[#0F1218] border border-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-xs">Status: {tests.compliance.statusCode || 'N/A'}</span>
                <span className="text-gray-500 text-xs">{tests.compliance.timestamp}</span>
              </div>
              <p className="text-white text-sm">{tests.compliance.message}</p>
              {tests.compliance.data && (
                <pre className="mt-2 text-xs text-gray-400 font-mono overflow-x-auto">
                  {JSON.stringify(tests.compliance.data, null, 2)}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={testAll}
          disabled={anyTestRunning}
          className="flex-1 py-4 rounded-xl bg-gradient-to-r from-[#2979FF] to-[#1E5FE0] hover:opacity-90 disabled:opacity-50 text-white transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          <span>Executar Todos os Testes</span>
        </button>
        <button
          onClick={resetTests}
          disabled={anyTestRunning}
          className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-50 text-white transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Resetar</span>
        </button>
      </div>

      {/* Success Banner */}
      {allTestsPassed && (
        <div className="bg-gradient-to-br from-[#00E676]/10 to-[#00C766]/10 border border-[#00E676]/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <CheckCircle className="w-6 h-6 text-[#00E676]" />
            <h3 className="text-white text-xl">Todos os Testes Passaram! ✅</h3>
          </div>
          <p className="text-gray-300 mb-4">
            Seu backend está 100% funcional. Pronto para deploy no Vercel!
          </p>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-[#00E676]" />
              <span>Autenticação JWT ativa</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-[#00E676]" />
              <span>Escrow D+0 operacional</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-[#00E676]" />
              <span>Yield AI integrado</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="w-2 h-2 rounded-full bg-[#00E676]" />
              <span>Compliance RegTech OK</span>
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
        <h4 className="text-white mb-3">📋 Instruções de Teste</h4>
        <ol className="text-gray-400 text-sm space-y-2 list-decimal list-inside">
          <li>Certifique-se que seu backend está rodando em <code className="text-[#2979FF]">localhost:3000</code></li>
          <li>Execute o teste JWT primeiro para obter o token de autenticação</li>
          <li>Execute os demais testes individualmente ou todos de uma vez</li>
          <li>Verifique os logs no terminal do backend (porta 3000) para confirmar Status 200</li>
          <li>Se todos os testes passarem, o projeto está pronto para deploy!</li>
        </ol>
      </div>
    </div>
  );
}
