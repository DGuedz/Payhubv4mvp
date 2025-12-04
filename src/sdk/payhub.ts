/**
 * PAYHUB SDK v3 - Modular & Atomic
 * Abstrai complexidade XRPL para dapp comercial com experiência "ativar e usar"
 * Conformidade: IN RFB nº 2.291/2025 (CARF/OCDE) + LGPD
 * Segurança: XRPL_SEED apenas backend, JWT curto, rate limit, honeypot
 */

// ────────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ────────────────────────────────────────────────────────────────────────────────

export interface SDKInit {
  baseUrl: string;
  token: string;
  retryConfig?: {
    maxRetries?: number;
    initialDelay?: number;
    maxDelay?: number;
  };
}

export interface TrustlineResult {
  ok: boolean;
  txHash: string;
  sequence: number;
  error?: string;
}

export interface EscrowCreateResult {
  ok: boolean;
  txHash: string;
  offerSequence: number;
  owner: string;
  condition?: string | null;
  error?: string;
}

export interface EscrowFinishResult {
  ok: boolean;
  txHash: string;
  sequence: number;
  error?: string;
}

export interface AmmQuoteResult {
  ok: boolean;
  alternatives: any[];
  pathsCount: number;
  error?: string;
}

export interface ComplianceReport {
  ok: boolean;
  format: 'csv';
  content: string;
  error?: string;
}

export interface YieldActivateResult {
  ok: boolean;
  status?: 'INACTIVE' | 'PENDING' | 'ACTIVE';
  error?: string;
}

export interface SecurityAlertsResult {
  ok: boolean;
  alerts: any[];
  stats: Record<string, number>;
  error?: string;
}

// ────────────────────────────────────────────────────────────────────────────────
// Currency Helper
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Converte nome de currency para 160-bit hex (IOU format)
 * Ex: currencyHex('RLUSD') → '524C555344000000000000000000000000000000'
 */
export function currencyHex(name: string): string {
  if (name.length > 20) {
    throw new Error('Currency name too long (max 20 chars)');
  }
  const buf = Buffer.from(name, 'ascii');
  const hex = buf.toString('hex').toUpperCase();
  return hex.padEnd(40, '0');
}

// ────────────────────────────────────────────────────────────────────────────────
// SDK Core
// ────────────────────────────────────────────────────────────────────────────────

class PayhubSDK {
  private baseUrl: string;
  private token: string;
  private retryConfig: Required<NonNullable<SDKInit['retryConfig']>>;

  constructor(init: SDKInit) {
    this.baseUrl = init.baseUrl.replace(/\/$/, '');
    this.token = init.token;
    this.retryConfig = {
      maxRetries: init.retryConfig?.maxRetries ?? 3,
      initialDelay: init.retryConfig?.initialDelay ?? 1000,
      maxDelay: init.retryConfig?.maxDelay ?? 10000,
    };
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Internal: Fetch with Retry & Exponential Backoff
  // ────────────────────────────────────────────────────────────────────────────────

  private async fetchWithRetry<T>(
    endpoint: string,
    options: RequestInit = {},
    attempt = 0
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`,
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });

      // Rate limit: retry with exponential backoff
      if (response.status === 429 && attempt < this.retryConfig.maxRetries) {
        const delay = Math.min(
          this.retryConfig.initialDelay * Math.pow(2, attempt),
          this.retryConfig.maxDelay
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.fetchWithRetry<T>(endpoint, options, attempt + 1);
      }

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
      }

      return response.json();
    } catch (error) {
      if (attempt < this.retryConfig.maxRetries) {
        const delay = Math.min(
          this.retryConfig.initialDelay * Math.pow(2, attempt),
          this.retryConfig.maxDelay
        );
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.fetchWithRetry<T>(endpoint, options, attempt + 1);
      }
      throw error;
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // Trustline Module
  // ────────────────────────────────────────────────────────────────────────────────

  public trustline = {
    /**
     * Cria Trustline RLUSD
     * Endpoint: POST /api/trustline-rlusd
     * Ref: api/trustline-rlusd.js:71
     */
    create: async (limit: string): Promise<TrustlineResult> => {
      try {
        const result = await this.fetchWithRetry<TrustlineResult>(
          '/api/trustline-rlusd',
          {
            method: 'POST',
            body: JSON.stringify({ limit }),
          }
        );
        return result;
      } catch (error) {
        return {
          ok: false,
          txHash: '',
          sequence: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // Escrow Module
  // ────────────────────────────────────────────────────────────────────────────────

  public escrow = {
    /**
     * Cria Escrow RLUSD (IOU)
     * Captura owner e offerSequence ("CPF do Escrow")
     * Endpoint: POST /api/escrow-create
     * Ref: api/escrow-create.js:81
     */
    create: async (
      value: string,
      opts?: {
        finishAfterUnix?: number;
        policy?: any;
        preimageHex?: string;
      }
    ): Promise<EscrowCreateResult> => {
      try {
        const result = await this.fetchWithRetry<EscrowCreateResult>(
          '/api/escrow-create',
          {
            method: 'POST',
            body: JSON.stringify({
              value,
              finishAfterUnix: opts?.finishAfterUnix,
              policy: opts?.policy,
              preimageHex: opts?.preimageHex,
            }),
          }
        );
        return result;
      } catch (error) {
        return {
          ok: false,
          txHash: '',
          offerSequence: 0,
          owner: '',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },

    /**
     * Finaliza Escrow com owner e offerSequence
     * Endpoint: POST /api/escrow-finish
     * Ref: api/escrow-finish.js:75
     */
    finish: async (
      owner: string,
      offerSequence: number,
      opts?: {
        fulfillmentHex?: string;
        policy?: any;
      }
    ): Promise<EscrowFinishResult> => {
      try {
        const result = await this.fetchWithRetry<EscrowFinishResult>(
          '/api/escrow-finish',
          {
            method: 'POST',
            body: JSON.stringify({
              owner,
              offerSequence,
              fulfillmentHex: opts?.fulfillmentHex,
              policy: opts?.policy,
            }),
          }
        );
        return result;
      } catch (error) {
        return {
          ok: false,
          txHash: '',
          sequence: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // AMM Module
  // ────────────────────────────────────────────────────────────────────────────────

  public amm = {
    /**
     * Consulta ripple_path_find para roteamento AMM
     * Retorna pathsCount para transparência
     * Endpoint: POST /api/amm/quote
     * Ref: api/amm-quote.js:23
     */
    quote: async (params: {
      sourceAccount: string;
      destinationAccount: string;
      deliverCurrency: string;
      deliverIssuer: string;
      deliverValue: string;
      sendMaxCurrency?: string;
      sendMaxIssuer?: string;
      sendMaxValue?: string;
    }): Promise<AmmQuoteResult> => {
      try {
        const result = await this.fetchWithRetry<AmmQuoteResult>(
          '/api/amm/quote',
          {
            method: 'POST',
            body: JSON.stringify(params),
          }
        );
        return result;
      } catch (error) {
        return {
          ok: false,
          alternatives: [],
          pathsCount: 0,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // Yield Module
  // ────────────────────────────────────────────────────────────────────────────────

  public yield = {
    /**
     * Ativa yield automático (5-8% APY)
     * Endpoint: POST /api/v1/merchant/yield/activate
     */
    activate: async (): Promise<YieldActivateResult> => {
      try {
        const result = await this.fetchWithRetry<YieldActivateResult>(
          '/api/v1/merchant/yield/activate',
          {
            method: 'POST',
          }
        );
        return result;
      } catch (error) {
        return {
          ok: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // Compliance Module
  // ────────────────────────────────────────────────────────────────────────────────

  public compliance = {
    /**
     * Exporta CSV consolidado (txHash, sequence, status - sem PII)
     * Endpoint: GET /api/v1/compliance/report
     * Ref: api/v1/compliance/report.js:43
     */
    exportCSV: async (): Promise<string> => {
      try {
        const result = await this.fetchWithRetry<ComplianceReport>(
          '/api/v1/compliance/report'
        );
        if (result.ok && result.format === 'csv') {
          return result.content;
        }
        throw new Error('Invalid compliance report format');
      } catch (error) {
        throw new Error(
          `Compliance export failed: ${
            error instanceof Error ? error.message : 'Unknown error'
          }`
        );
      }
    },
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // Security Module
  // ────────────────────────────────────────────────────────────────────────────────

  public security = {
    /**
     * Obtém alertas de honeypot/defesa ativa
     * Endpoint: GET /api/security/alerts
     * Ref: api/security/alerts.js:1
     */
    alerts: async (): Promise<SecurityAlertsResult> => {
      try {
        const result = await this.fetchWithRetry<SecurityAlertsResult>(
          '/api/security/alerts'
        );
        return result;
      } catch (error) {
        return {
          ok: false,
          alerts: [],
          stats: {},
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    },
  };

  // ────────────────────────────────────────────────────────────────────────────────
  // Currency Helper (instance method)
  // ────────────────────────────────────────────────────────────────────────────────

  public currencyHex = currencyHex;
}

// ────────────────────────────────────────────────────────────────────────────────
// Factory Function
// ────────────────────────────────────────────────────────────────────────────────

/**
 * Cria instância do PayhubSDK
 * 
 * @example
 * const sdk = createSDK({ 
 *   baseUrl: 'http://localhost:3000', 
 *   token: '<JWT>' 
 * });
 * 
 * // Fluxo D+0
 * await sdk.trustline.create('1000');
 * const c = await sdk.escrow.create('250.00');
 * await sdk.escrow.finish(c.owner, c.offerSequence);
 * const csv = await sdk.compliance.exportCSV();
 * 
 * // AMM/Pathfind
 * const hex = sdk.currencyHex('RLUSD');
 * await sdk.amm.quote({ 
 *   sourceAccount, 
 *   destinationAccount, 
 *   deliverCurrency: hex, 
 *   deliverIssuer, 
 *   deliverValue: '1' 
 * });
 * 
 * // Yield
 * await sdk.yield.activate();
 */
export function createSDK(init: SDKInit): PayhubSDK {
  return new PayhubSDK(init);
}

// Export types for consumers
export type { PayhubSDK };
