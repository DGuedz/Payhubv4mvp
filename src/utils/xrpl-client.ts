import { Client, Wallet, Transaction, TxResponse, AccountInfoResponse } from 'xrpl';

// XRPL Testnet Configuration
const TESTNET_URL = 'wss://s.altnet.rippletest.net:51233';
const MAINNET_URL = 'wss://s1.ripple.com';

export interface XRPLConnection {
  client: Client;
  isConnected: boolean;
  network: 'testnet' | 'mainnet';
}

export interface WalletInfo {
  address: string;
  seed?: string;
  balance: string;
  sequence: number;
}

export interface TransactionResult {
  success: boolean;
  hash?: string;
  error?: string;
  result?: TxResponse;
}

class XRPLClient {
  private connection: XRPLConnection | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // Initialize connection
  async connect(network: 'testnet' | 'mainnet' = 'testnet'): Promise<XRPLConnection> {
    try {
      const url = network === 'testnet' ? TESTNET_URL : MAINNET_URL;
      const client = new Client(url);
      
      console.log(`🔌 Conectando à XRPL ${network}...`);
      await client.connect();
      
      this.connection = {
        client,
        isConnected: true,
        network
      };
      
      this.reconnectAttempts = 0;
      console.log(`✅ Conectado à XRPL ${network}`);
      
      return this.connection;
    } catch (error) {
      console.error(`❌ Erro ao conectar à XRPL ${network}:`, error);
      throw error;
    }
  }

  // Disconnect safely
  async disconnect(): Promise<void> {
    if (this.connection?.client) {
      try {
        await this.connection.client.disconnect();
        console.log('🔌 Desconectado da XRPL');
      } catch (error) {
        console.error('❌ Erro ao desconectar:', error);
      }
      this.connection = null;
    }
  }

  // Get current connection
  getConnection(): XRPLConnection | null {
    return this.connection;
  }

  // Check if connected
  isConnected(): boolean {
    return this.connection?.isConnected ?? false;
  }

  // Get network info
  getNetwork(): 'testnet' | 'mainnet' | null {
    return this.connection?.network ?? null;
  }

  // Create test wallet
  createTestWallet(): Wallet {
    const wallet = Wallet.generate();
    console.log('💳 Wallet de teste criada:', wallet.address);
    return wallet;
  }

  // Get wallet from seed
  getWalletFromSeed(seed: string): Wallet {
    return Wallet.fromSeed(seed);
  }

  // Get account info
  async getAccountInfo(address: string): Promise<AccountInfoResponse> {
    if (!this.isConnected()) {
      throw new Error('XRPL não conectada');
    }

    try {
      const response = await this.connection!.client.request({
        command: 'account_info',
        account: address,
        ledger_index: 'validated'
      });

      return response;
    } catch (error: any) {
      if (error.message?.includes('actNotFound')) {
        throw new Error('Conta não encontrada. Precisa ser financiada primeiro.');
      }
      throw error;
    }
  }

  // Get account balance
  async getBalance(address: string): Promise<string> {
    try {
      const info = await this.getAccountInfo(address);
      return info.result.account_data.Balance;
    } catch (error) {
      return '0';
    }
  }

  // Submit transaction
  async submitTransaction(wallet: Wallet, transaction: Transaction): Promise<TransactionResult> {
    if (!this.isConnected()) {
      return { success: false, error: 'XRPL não conectada' };
    }

    try {
      console.log('📤 Enviando transação:', transaction.TransactionType);
      
      // Sign transaction
      const signed = wallet.sign(transaction);
      console.log('✍️ Transação assinada, hash:', signed.hash);

      // Submit transaction
      const response = await this.connection!.client.submitAndWait(signed.tx_blob);
      
      const meta = response.result.meta;
      let transactionResult = 'unknown';
      
      if (typeof meta === 'object' && meta !== null && 'TransactionResult' in meta) {
        transactionResult = (meta as any).TransactionResult;
      }

      if (transactionResult === 'tesSUCCESS') {
        console.log('✅ Transação confirmada:', response.result.hash);
        return {
          success: true,
          hash: response.result.hash,
          result: response
        };
      } else {
        const error = transactionResult !== 'unknown' ? transactionResult : 'Transação falhou';
        console.error('❌ Transação falhou:', error);
        return {
          success: false,
          error
        };
      }
    } catch (error: any) {
      console.error('❌ Erro ao enviar transação:', error);
      return {
        success: false,
        error: error.message || 'Erro desconhecido'
      };
    }
  }

  // Send payment
  async sendPayment(wallet: Wallet, destination: string, amount: string): Promise<TransactionResult> {
    const transaction: Transaction = {
      TransactionType: 'Payment',
      Account: wallet.address,
      Destination: destination,
      Amount: amount,
      NetworkID: this.connection?.network === 'testnet' ? 21338 : 0,
      Fee: '12'
    };

    return this.submitTransaction(wallet, transaction);
  }

  // Create Escrow
  async createEscrow(wallet: Wallet, destination: string, amount: string, finishAfter: number): Promise<TransactionResult> {
    const transaction: Transaction = {
      TransactionType: 'EscrowCreate',
      Account: wallet.address,
      Destination: destination,
      Amount: amount,
      FinishAfter: finishAfter,
      NetworkID: this.connection?.network === 'testnet' ? 21338 : 0,
      Fee: '12'
    };

    return this.submitTransaction(wallet, transaction);
  }

  // Finish Escrow
  async finishEscrow(wallet: Wallet, owner: string, offerSequence: number): Promise<TransactionResult> {
    const transaction: Transaction = {
      TransactionType: 'EscrowFinish',
      Account: wallet.address,
      Owner: owner,
      OfferSequence: offerSequence,
      NetworkID: this.connection?.network === 'testnet' ? 21338 : 0,
      Fee: '12'
    };

    return this.submitTransaction(wallet, transaction);
  }

  // Set Trust Line
  async setTrustLine(wallet: Wallet, issuer: string, currency: string, limit: string): Promise<TransactionResult> {
    const transaction: Transaction = {
      TransactionType: 'TrustSet',
      Account: wallet.address,
      LimitAmount: {
        currency: currency,
        issuer: issuer,
        value: limit
      },
      NetworkID: this.connection?.network === 'testnet' ? 21338 : 0,
      Fee: '12'
    };

    return this.submitTransaction(wallet, transaction);
  }

  // Fund account via faucet (testnet only)
  async fundViaFaucet(address: string): Promise<boolean> {
    if (this.connection?.network !== 'testnet') {
      throw new Error('Faucet disponível apenas na testnet');
    }

    try {
      console.log('💧 Solicitando fundos do faucet para:', address);
      
      const response = await fetch('https://faucet.altnet.rippletest.net/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: address
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('💧 Conta financiada com sucesso:', data);
        return true;
      } else {
        console.error('❌ Erro ao financiar conta:', response.status);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro ao conectar ao faucet:', error);
      return false;
    }
  }

  // Wait for transaction confirmation
  async waitForTransaction(txHash: string, maxWaitTime = 60000): Promise<TxResponse | null> {
    if (!this.isConnected()) return null;

    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWaitTime) {
      try {
        const response = await this.connection!.client.request({
          command: 'tx',
          transaction: txHash
        });

        if (response.result.validated) {
          return response;
        }
      } catch (error) {
        // Transaction not found yet, continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    return null;
  }

  // Auto-reconnect on connection loss
  private async handleReconnection(): Promise<void> {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('❌ Máximo de tentativas de reconexão atingido');
      return;
    }

    this.reconnectAttempts++;
    console.log(`🔄 Tentando reconectar... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);

    try {
      const network = this.connection?.network || 'testnet';
      await this.connect(network);
    } catch (error) {
      console.error('❌ Reconexão falhou:', error);
      
      setTimeout(() => {
        this.handleReconnection();
      }, this.reconnectDelay * this.reconnectAttempts);
    }
  }
}

// Export singleton instance
export const xrplClient = new XRPLClient();

export default xrplClient;