import React, { useState } from 'react';
import { Wallet, Power, Plus, RefreshCw, Copy, ExternalLink, QrCode } from 'lucide-react';
import { useXRPLWallet } from '../hooks/useXRPLWallet';
import { createSDK } from '../sdk/payhub';

interface WalletConnectProps {
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
  network?: 'testnet' | 'mainnet';
}

const WalletConnect: React.FC<WalletConnectProps> = ({ 
  onConnect, 
  onDisconnect, 
  network = 'testnet' 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [xummState, setXummState] = useState<'idle' | 'loading' | 'qr_ready' | 'authenticated'>('idle');
  const [xummData, setXummData] = useState<{ auth_url?: string; qr_code?: string; uuid?: string }>({});
  
  // Initialize SDK
  const sdk = createSDK({
    baseUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL || 'http://localhost:3000',
    token: 'demo-token',
  });

  const {
    wallet,
    walletInfo,
    isConnected,
    isConnecting,
    error,
    balance,
    generateTestWallet,
    fundWallet,
    disconnect,
    connect
  } = useXRPLWallet(network);

  const handleXummLogin = async () => {
    setXummState('loading');
    try {
      const initResult = await sdk.auth.init();
      
      if (initResult.ok && initResult.qr_code) {
        setXummData({
          auth_url: initResult.auth_url,
          qr_code: initResult.qr_code,
          uuid: initResult.uuid
        });
        setXummState('qr_ready');
        
        // Em produção, aqui iniciaríamos um polling ou WebSocket para aguardar o callback
        // Para MVP, simulamos o sucesso após 5 segundos se for mock
        if (initResult.mode === 'mock') {
          setTimeout(async () => {
            if (initResult.uuid) {
              const callbackResult = await sdk.auth.callback(initResult.uuid);
              if (callbackResult.ok && callbackResult.user) {
                if (onConnect) onConnect(callbackResult.user.account);
                setXummState('authenticated');
                setIsModalOpen(false);
              }
            }
          }, 5000);
        }
      } else {
        console.error('Erro Xumm Init:', initResult.error);
        setXummState('idle');
      }
    } catch (err) {
      console.error('Erro Xumm:', err);
      setXummState('idle');
    }
  };

  const handleConnect = async () => {
    try {
      await connect();
      if (wallet && onConnect) {
        onConnect(wallet.address);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao conectar wallet:', error);
    }
  };

  const handleGenerateWallet = async () => {
    try {
      await generateTestWallet();
      if (wallet && onConnect) {
        onConnect(wallet.address);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao gerar wallet:', error);
    }
  };

  const handleFundWallet = async () => {
    if (!wallet) return;
    
    setIsFunding(true);
    try {
      const success = await fundWallet();
      if (success) {
        console.log('✅ Wallet financiada com sucesso!');
      } else {
        console.error('❌ Falha ao financiar wallet');
      }
    } catch (error) {
      console.error('Erro ao financiar wallet:', error);
    } finally {
      setIsFunding(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
      if (onDisconnect) {
        onDisconnect();
      }
    } catch (error) {
      console.error('Erro ao desconectar wallet:', error);
    }
  };

  const copyAddress = async () => {
    if (walletInfo?.address) {
      await navigator.clipboard.writeText(walletInfo.address);
      console.log('📋 Endereço copiado!');
    }
  };

  const openInExplorer = () => {
    if (walletInfo?.address) {
      const explorerUrl = network === 'testnet' 
        ? `https://testnet.xrpl.org/accounts/${walletInfo.address}`
        : `https://xrpscan.com/account/${walletInfo.address}`;
      window.open(explorerUrl, '_blank');
    }
  };

  if (isConnected && walletInfo) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#001F3F]/20 border border-[#00FF84]/30 rounded-lg px-3 py-2">
          <div className="w-2 h-2 bg-[#00FF84] rounded-full animate-pulse"></div>
          <span className="text-[#00FF84] text-sm font-medium">
            {parseFloat(balance).toFixed(2)} XRP
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-[#001F3F] border border-[#00FF84]/20 rounded-lg px-3 py-2">
          <Wallet className="w-4 h-4 text-[#00FF84]" />
          <span className="text-white text-sm font-mono">
            {walletInfo.address.slice(0, 6)}...{walletInfo.address.slice(-4)}
          </span>
          
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={copyAddress}
              className="p-1 text-[#00FF84]/60 hover:text-[#00FF84] transition-colors"
              title="Copiar endereço"
            >
              <Copy className="w-3 h-3" />
            </button>
            
            <button
              onClick={openInExplorer}
              className="p-1 text-[#00FF84]/60 hover:text-[#00FF84] transition-colors"
              title="Ver no explorer"
            >
              <ExternalLink className="w-3 h-3" />
            </button>
            
            {network === 'testnet' && parseFloat(balance) < 100 && (
              <button
                onClick={handleFundWallet}
                disabled={isFunding}
                className="p-1 text-[#00FF84]/60 hover:text-[#00FF84] transition-colors disabled:opacity-50"
                title="Financiar wallet"
              >
                <RefreshCw className={`w-3 h-3 ${isFunding ? 'animate-spin' : ''}`} />
              </button>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDisconnect}
          className="p-2 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-600/30 hover:text-red-300 transition-all"
          title="Desconectar wallet"
        >
          <Power className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        disabled={isConnecting}
        className="flex items-center gap-2 px-4 py-2 bg-[#001F3F] border border-[#00FF84]/30 rounded-lg text-[#00FF84] hover:bg-[#001F3F]/80 hover:border-[#00FF84]/50 transition-all disabled:opacity-50"
      >
        <Wallet className={`w-4 h-4 ${isConnecting ? 'animate-pulse' : ''}`} />
        <span>{isConnecting ? 'Conectando...' : 'Conectar Wallet'}</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#001F3F] border border-[#00FF84]/30 rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Conectar Wallet</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#00FF84]/60 hover:text-[#00FF84] transition-colors"
              >
                ✕
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-600/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {xummState === 'qr_ready' ? (
              <div className="text-center p-4">
                <h4 className="text-white font-semibold mb-4">Escaneie com Xumm App</h4>
                <div className="bg-white p-2 rounded-lg inline-block mb-4">
                  <img src={xummData.qr_code} alt="Xumm QR Code" className="w-48 h-48" />
                </div>
                <p className="text-gray-400 text-sm animate-pulse">Aguardando assinatura...</p>
                <button 
                  onClick={() => setXummState('idle')}
                  className="mt-4 text-sm text-[#2979FF] hover:underline"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Opção Xumm (Nova) */}
                <div className="p-4 bg-[#2979FF]/10 border border-[#2979FF]/20 rounded-lg">
                  <h4 className="text-[#2979FF] font-semibold mb-2 flex items-center gap-2">
                    <QrCode className="w-4 h-4" />
                    Xumm Wallet (Recomendado)
                  </h4>
                  <p className="text-white/80 text-sm mb-4">
                    Conecte-se de forma segura usando o app Xumm no seu celular.
                  </p>
                  
                  <button
                    onClick={handleXummLogin}
                    disabled={xummState === 'loading'}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#2979FF] text-white rounded-lg font-semibold hover:bg-[#2979FF]/90 transition-all disabled:opacity-50"
                  >
                    {xummState === 'loading' ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <QrCode className="w-4 h-4" />
                    )}
                    <span>{xummState === 'loading' ? 'Gerando QR...' : 'Login com Xumm'}</span>
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-white/60 text-sm">ou use métodos de teste</span>
                </div>

                {network === 'testnet' ? (
                  <div className="p-4 bg-[#00FF84]/10 border border-[#00FF84]/20 rounded-lg">
                    <h4 className="text-[#00FF84] font-semibold mb-2">Wallet Descartável</h4>
                    <p className="text-white/80 text-sm mb-4">
                      Gera uma nova wallet com 1000 XRP de teste instantaneamente.
                    </p>
                    
                    <button
                      onClick={handleGenerateWallet}
                      disabled={isConnecting}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#00FF84] text-[#001F3F] rounded-lg font-semibold hover:bg-[#00FF84]/90 transition-all disabled:opacity-50"
                    >
                      <Plus className={`w-4 h-4 ${isConnecting ? 'animate-spin' : ''}`} />
                      <span>{isConnecting ? 'Gerando...' : 'Gerar Wallet de Teste'}</span>
                    </button>
                  </div>
                ) : null}

                <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Importar Seed</h4>
                  <p className="text-white/80 text-sm mb-4">
                    Cole sua seed (sEd...) manualmente. Apenas para testes.
                  </p>
                  
                  <button
                    onClick={handleConnect}
                    disabled={isConnecting}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#001F3F] border border-[#00FF84]/30 text-[#00FF84] rounded-lg font-semibold hover:bg-[#001F3F]/80 hover:border-[#00FF84]/50 transition-all disabled:opacity-50"
                  >
                    <Wallet className={`w-4 h-4 ${isConnecting ? 'animate-pulse' : ''}`} />
                    <span>{isConnecting ? 'Conectando...' : 'Conectar com Seed'}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400 text-sm">
                ⚠️ <strong>Atenção:</strong> Nunca use seeds da Mainnet neste ambiente de desenvolvimento.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WalletConnect;