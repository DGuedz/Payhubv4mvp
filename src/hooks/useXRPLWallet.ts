import { useState, useEffect, useCallback } from 'react';
import { Wallet } from 'xrpl';
import xrplClient, { WalletInfo, TransactionResult } from '../utils/xrpl-client';

export interface XRPLWalletState {
  wallet: Wallet | null;
  walletInfo: WalletInfo | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  balance: string;
  network: 'testnet' | 'mainnet';
}

export interface XRPLWalletActions {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  generateTestWallet: () => Promise<void>;
  fundWallet: () => Promise<boolean>;
  getBalance: () => Promise<string>;
  sendPayment: (destination: string, amount: string) => Promise<TransactionResult>;
  createEscrow: (destination: string, amount: string, finishAfter: number) => Promise<TransactionResult>;
  finishEscrow: (owner: string, offerSequence: number) => Promise<TransactionResult>;
  setTrustLine: (issuer: string, currency: string, limit: string) => Promise<TransactionResult>;
}

export type XRPLWalletHook = XRPLWalletState & XRPLWalletActions;

export function useXRPLWallet(network: 'testnet' | 'mainnet' = 'testnet'): XRPLWalletHook {
  const [state, setState] = useState<XRPLWalletState>({
    wallet: null,
    walletInfo: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    balance: '0',
    network
  });

  // Load wallet from localStorage on mount
  useEffect(() => {
    const loadStoredWallet = async () => {
      try {
        const storedSeed = localStorage.getItem(`xrpl_wallet_${network}`);
        if (storedSeed) {
          const wallet = xrplClient.getWalletFromSeed(storedSeed);
          setState(prev => ({
            ...prev,
            wallet,
            walletInfo: {
              address: wallet.address,
              seed: storedSeed,
              balance: '0',
              sequence: 0
            }
          }));
          
          // Connect to XRPL
          await connectWithWallet(wallet);
        }
      } catch (error) {
        console.error('Erro ao carregar wallet:', error);
        localStorage.removeItem(`xrpl_wallet_${network}`);
      }
    };

    loadStoredWallet();
  }, [network]);

  // Auto-connect to XRPL
  useEffect(() => {
    const connectXRPL = async () => {
      try {
        await xrplClient.connect(network);
        setState(prev => ({ ...prev, isConnected: true, error: null }));
      } catch (error: any) {
        setState(prev => ({ ...prev, error: error.message, isConnected: false }));
      }
    };

    connectXRPL();

    return () => {
      xrplClient.disconnect();
    };
  }, [network]);

  // Update balance when wallet changes
  useEffect(() => {
    if (state.wallet) {
      updateBalance();
    }
  }, [state.wallet]);

  const connectWithWallet = async (wallet: Wallet) => {
    try {
      if (!xrplClient.isConnected()) {
        await xrplClient.connect(network);
      }
      
      const balance = await xrplClient.getBalance(wallet.address);
      const accountInfo = await xrplClient.getAccountInfo(wallet.address);
      
      setState(prev => ({
        ...prev,
        wallet,
        walletInfo: {
          address: wallet.address,
          balance,
          sequence: accountInfo.result.account_data.Sequence
        },
        balance: (parseInt(balance) / 1000000).toFixed(6),
        isConnected: true,
        error: null
      }));
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
      throw error;
    }
  };

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      if (!xrplClient.isConnected()) {
        await xrplClient.connect(network);
      }
      
      if (state.wallet) {
        await connectWithWallet(state.wallet);
      }
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, isConnecting: false }));
    }
  }, [network, state.wallet]);

  const disconnect = useCallback(async () => {
    try {
      setState(prev => ({
        wallet: null,
        walletInfo: null,
        isConnected: false,
        isConnecting: false,
        error: null,
        balance: '0',
        network: prev.network
      }));
      
      localStorage.removeItem(`xrpl_wallet_${network}`);
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    }
  }, [network]);

  const generateTestWallet = useCallback(async () => {
    setState(prev => ({ ...prev, isConnecting: true, error: null }));
    
    try {
      const wallet = xrplClient.createTestWallet();
      
      // Store wallet seed
      localStorage.setItem(`xrpl_wallet_${network}`, wallet.seed);
      
      await connectWithWallet(wallet);
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setState(prev => ({ ...prev, isConnecting: false }));
    }
  }, [network]);

  const fundWallet = useCallback(async (): Promise<boolean> => {
    if (!state.wallet) {
      setState(prev => ({ ...prev, error: 'Nenhuma wallet conectada' }));
      return false;
    }

    try {
      const success = await xrplClient.fundViaFaucet(state.wallet.address);
      
      if (success) {
        // Wait a bit for the funding transaction to be processed
        await new Promise(resolve => setTimeout(resolve, 2000));
        await updateBalance();
      }
      
      return success;
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
      return false;
    }
  }, [state.wallet]);

  const updateBalance = useCallback(async () => {
    if (!state.wallet) return;

    try {
      const balance = await xrplClient.getBalance(state.wallet.address);
      const xrpBalance = (parseInt(balance) / 1000000).toFixed(6);
      
      setState(prev => ({ ...prev, balance: xrpBalance }));
    } catch (error: any) {
      console.error('Erro ao atualizar saldo:', error);
    }
  }, [state.wallet]);

  const getBalance = useCallback(async (): Promise<string> => {
    if (!state.wallet) return '0';
    
    try {
      const balance = await xrplClient.getBalance(state.wallet.address);
      return (parseInt(balance) / 1000000).toFixed(6);
    } catch (error) {
      return '0';
    }
  }, [state.wallet]);

  const sendPayment = useCallback(async (destination: string, amount: string): Promise<TransactionResult> => {
    if (!state.wallet) {
      return { success: false, error: 'Wallet não conectada' };
    }

    try {
      const dropsAmount = (parseFloat(amount) * 1000000).toString();
      return await xrplClient.sendPayment(state.wallet, destination, dropsAmount);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [state.wallet]);

  const createEscrow = useCallback(async (destination: string, amount: string, finishAfter: number): Promise<TransactionResult> => {
    if (!state.wallet) {
      return { success: false, error: 'Wallet não conectada' };
    }

    try {
      const dropsAmount = (parseFloat(amount) * 1000000).toString();
      return await xrplClient.createEscrow(state.wallet, destination, dropsAmount, finishAfter);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [state.wallet]);

  const finishEscrow = useCallback(async (owner: string, offerSequence: number): Promise<TransactionResult> => {
    if (!state.wallet) {
      return { success: false, error: 'Wallet não conectada' };
    }

    try {
      return await xrplClient.finishEscrow(state.wallet, owner, offerSequence);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [state.wallet]);

  const setTrustLine = useCallback(async (issuer: string, currency: string, limit: string): Promise<TransactionResult> => {
    if (!state.wallet) {
      return { success: false, error: 'Wallet não conectada' };
    }

    try {
      return await xrplClient.setTrustLine(state.wallet, issuer, currency, limit);
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  }, [state.wallet]);

  return {
    ...state,
    connect,
    disconnect,
    generateTestWallet,
    fundWallet,
    getBalance,
    sendPayment,
    createEscrow,
    finishEscrow,
    setTrustLine
  };
}