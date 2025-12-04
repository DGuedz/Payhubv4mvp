# 📐 Especificação de Design - PAYHUB Portal do Comerciante

**Versão:** 1.0 Testnet  
**Data:** 29/11/2024  
**Status:** ✅ Alinhado com Backend Institucional  

---

## 🎯 Objetivo

Garantir que o design Figma reflete **exatamente** a arquitetura backend validada na XRPL Testnet, com **credibilidade e segurança verificável**.

---

## 🎨 Paleta de Cores (Constante)

```css
/* PAYHUB Brand Colors */
--navy: #001F3F;          /* Azul Marinho - Background principal */
--neon-green: #00FF84;    /* Verde Neon - Accents e CTAs */
--dark-bg: #0a0f1a;       /* Background escuro */
--card-bg: #0f1825;       /* Cards e painéis */
--border: #1a2332;        /* Bordas sutis */
--text-primary: #ffffff;  /* Texto principal */
--text-secondary: #8b92a3; /* Texto secundário */
--success: #00FF84;       /* Status positivo */
--warning: #FFA500;       /* Avisos */
--danger: #FF4444;        /* Erros */
```

**Regra de Ouro:** Todos os CTAs primários devem usar `--neon-green` com texto `--navy` para máximo contraste.

---

## 🔐 I. Dados de Configuração Testnet

### Variáveis Globais (Visíveis no Dashboard Admin/Debug)

| Constante | Valor | Visibilidade |
|-----------|-------|--------------|
| **Network** | `XRPL Testnet` | Badge no header (sempre visível) |
| **RLUSD Issuer** | `rhvzTE7FXW88bJUE7hWvc566S3jQnErK2X` | Modal de debug ou info panel |
| **Treasury Vault** | `r3YVS16agyx8JJdcroAWCyjmW8Yoejtn5K` | Modal de debug ou info panel |
| **Merchant Wallet** | `rHHe2ha4z23RZJdPQTg11E1QuxEDjGgJz8` | Perfil do usuário |
| **WebSocket** | `wss://s.altnet.rippletest.net:51233` | Settings técnicos |
| **JSON-RPC** | `https://s.altnet.rippletest.net:51234/` | Settings técnicos |

### TX Hashes Reais (Provas D+0)

**Usar estes hashes nos componentes de auditoria/histórico:**

| Tipo | TX Hash | Explorer Link |
|------|---------|---------------|
| **EscrowFinish (Prova)** ⭐ | `38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5` | [Ver](https://testnet.xrpl.org/transactions/38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5) |
| EscrowCreate | `7876B63EE59FCE568CAF52C60736B717FAE4636622E85670D87FDB455A314DC6` | [Ver](https://testnet.xrpl.org/transactions/7876B63EE59FCE568CAF52C60736B717FAE4636622E85670D87FDB455A314DC6) |
| Payment RLUSD | `025375A56E9C326FD03CB600809077E3F8FA07183B3B4B820DFC6513FD58F1EE` | [Ver](https://testnet.xrpl.org/transactions/025375A56E9C326FD03CB600809077E3F8FA07183B3B4B820DFC6513FD58F1EE) |
| Emissão RLUSD | `CECB0CA7C5F33116BB90E7FDC3E59E50AA5DFED1BAA2BE144D181BBFCB7332A9` | [Ver](https://testnet.xrpl.org/transactions/CECB0CA7C5F33116BB90E7FDC3E59E50AA5DFED1BAA2BE144D181BBFCB7332A9) |
| TrustSet Merchant | `527F0C5615004AF3B3C3FE12D1CECE7CD2D9CA229D3607B65210357A231836C2` | [Ver](https://testnet.xrpl.org/transactions/527F0C5615004AF3B3C3FE12D1CECE7CD2D9CA229D3607B65210357A231836C2) |
| TrustSet Treasury | `4BB99CE6611658CD22692C4A2DF550C7420DF371EE74A64CF91D1E7A88957AE4` | [Ver](https://testnet.xrpl.org/transactions/4BB99CE6611658CD22692C4A2DF550C7420DF371EE74A64CF91D1E7A88957AE4) |

**Formato de Exibição:**
- **Visual Comerciante:** NSU/AUT com link "Ver Comprovante"
- **Detalhes Técnicos:** TX Hash completo clicável abrindo explorer
- **Hover:** Tooltip mostrando status `SUCCESS` e ledger validado

---

## 🔒 II. Reforço Visual de Segurança

### 1. Security Banner (Topo da Dashboard)

**Localização:** Logo abaixo do header, sempre visível

**Elementos:**
```
┌─────────────────────────────────────────────────────────────┐
│ 🔐  Segurança Institucional Ativa                           │
│     XRPL_SEED isolada em KMS/ENV • Assinatura no servidor   │
│     JWT TTL curto • Rate Limit ativo                  ✓ OK  │
└─────────────────────────────────────────────────────────────┘
```

**Estilo:**
- Background: `linear-gradient(135deg, var(--card-bg) 0%, var(--navy) 100%)`
- Border: `1px solid var(--neon-green)`
- Badge direita: "✓ Honeypot Ativo" em verde

**Tooltip (ao clicar no 🔐):**
```
Arquitetura de Segurança:
• XRPL_SEED: Isolada em KMS/Vault (nunca em frontend/logs)
• Assinatura: Exclusiva no backend
• JWT: TTL curto (5 min) com issuer/maxAge
• Rate Limit: 100 req/min por IP
• Defesa Ativa: Honeypot monitorando 24/7
```

### 2. JWT Status Indicator

**Localização:** Header direito ou menu do usuário

**Formato:**
```
┌──────────────────┐
│ 🔑 JWT Ativo     │
│ ✓ Válido (4m)    │
└──────────────────┘
```

**Estados:**
- ✓ Válido (verde) - Token ativo, > 1min restante
- ⚠️ Expirando (amarelo) - < 1min restante
- ❌ Expirado (vermelho) - Requer re-auth

**API Mapping:** Conectado a `api/_auth.js:29-37` (validação JWT)

### 3. Rate Limit Monitor

**Localização:** Settings > Segurança

**Formato:**
```
┌────────────────────────────────────┐
│ Rate Limit (por IP)                │
│ ▓▓▓▓▓▓▓░░░░░░░░░░  45/100 req/min │
│ Status: ✓ OK                       │
└────────────────────────────────────┘
```

**API Mapping:** Conectado a `server.js:98-113` (rate limiting)

### 4. Honeypot Defense Badge

**Localização:** Security banner ou footer

**Formato:**
```
┌─────────────────────┐
│ 🛡️ Defesa Ativa     │
│ Honeypot Monitorando│
└─────────────────────┘
```

**Tooltip:**
```
Sistema de Defesa Ativa:
• Carteiras isca monitoradas 24/7
• Detecção automática de ataques
• Invalidação de sessões suspeitas
• Logs sem PII (apenas txHash)
```

**API Mapping:** Conectado a `package.json:28` (honeypot trigger)

---

## 💰 III. Componentes do Dashboard

### 1. Balance Card

**API Mapping:** `GET /api/v1/merchant/balance`

**Mock Data (Testnet):**
```json
{
  "balance": {
    "rlusd": "12500.00",
    "brl": "62500.00"
  },
  "yield": {
    "today": "4.15",
    "apy": "6.2"
  }
}
```

**Layout:**
```
┌──────────────────────────────┐
│ 💵 Saldo Disponível          │
│                              │
│ 12,500.00 RLUSD              │
│ ≈ R$ 62,500.00               │
│                              │
│ ┌──────────────────────────┐ │
│ │ Rendimento Hoje:         │ │
│ │ + R$ 4,15 (6.2% APY)     │ │
│ └──────────────────────────┘ │
│                              │
│ [ ⚡ Liquidar D+0 ]          │
│ [ 📊 Ver Histórico ]         │
└──────────────────────────────┘
```

**CTAs:**
- "Liquidar D+0" → `POST /api/escrow-finish` (verde neon)
- "Ver Histórico" → Modal de transações (outline verde)

### 2. Quick Actions Card

**API Mappings:**

| Botão | Endpoint | Método |
|-------|----------|--------|
| 💳 Receber Pagamento | `/api/payment/pix` | POST |
| 📲 Gerar PIX QR | `/api/payment/pix` | POST |
| 💰 Antecipar Recebíveis | `/api/escrow-create` | POST |
| 📄 Exportar Compliance | `/api/v1/compliance/report` | GET |

**Layout:**
```
┌──────────────────────────────┐
│ ⚡ Ações Rápidas              │
│                              │
│ [ 💳 Receber Pagamento ]     │
│ [ 📲 Gerar PIX QR ]          │
│ [ 💰 Antecipar Recebíveis ]  │
│ [ 📄 Exportar Compliance ]   │
└──────────────────────────────┘
```

### 3. Transaction History

**API Mapping:** `GET /api/v1/merchant/transactions`

**Layout com TX Hashes Reais:**
```
┌───────────────────────────────────────────────────────┐
│ 📋 Transações Recentes (Testnet)                      │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ ⭐ EscrowFinish (D+0)       + 5.00 RLUSD        │ │
│ │ 29/11/2024 14:32                    ✓ SUCCESS   │ │
│ │ TX: 38D3ED5B...4C0B93F5 [clicável]              │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ ┌─────────────────────────────────────────────────┐ │
│ │ 🔒 EscrowCreate             5.00 RLUSD          │ │
│ │ 29/11/2024 14:30                    ✓ SUCCESS   │ │
│ │ TX: 7876B63E...A314DC6 | Seq: 12860889          │ │
│ └─────────────────────────────────────────────────┘ │
│                                                       │
│ [Ver Todas]                                          │
└───────────────────────────────────────────────────────┘
```

**Interações:**
- Click no card → Abre explorer em nova aba
- Hover → Mostra tooltip com detalhes completos
- Badge SUCCESS → Verde neon

### 4. Performance Metrics

**API Mapping:** `GET /api/metrics` (mock local)

**Layout:**
```
┌────────────────────────────────────────────────────┐
│ ⚡ Métricas de Performance (Testnet)               │
│                                                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────┐ │
│ │ Latência │ │Confirm.  │ │Taxa      │ │Uptime │ │
│ │ 3.5s ✓   │ │ ~4s ✓    │ │100% ✓    │ │100% ✓ │ │
│ │(30% ↑)   │ │(60% ↑)   │ │6/6 TXs   │ │       │ │
│ └──────────┘ └──────────┘ └──────────┘ └───────┘ │
└────────────────────────────────────────────────────┘
```

---

## 🚀 IV. Roadmap Placeholders (Semanas 3-4)

### 1. Yield mXRP Card (Inativo)

**Localização:** Dashboard principal (card cinza/dashed)

**Layout:**
```
┌──────────────────────────────────────┐
│ 💎 Yield Automático (mXRP)  [EM BREVE]│
│                                      │
│ ┌──────────────────────────────────┐ │
│ │  Ativar Rendimento Passivo       │ │
│ │  APY: 5-8% sobre saldo RLUSD     │ │
│ │  XRPL EVM Sidechain (mXRP)       │ │
│ └──────────────────────────────────┘ │
│                                      │
│ [ 📈 Ativar Yield ] (disabled)       │
└──────────────────────────────────────┘
```

**Badge:** "EM BREVE" em laranja (#FFA500)

**API Future:** `POST /api/v1/merchant/yield/activate`

**Tooltip:**
```
Rendimento Passivo mXRP:
• APY: 5-8% (variável)
• Liquidez: D+0 (mantida)
• Risco: Baixo (pool institucional)
• Disponível: Semana 3 (06/12-12/12)
```

### 2. Xumm OAuth Card (Inativo)

**Localização:** Settings > Identidade ou Onboarding

**Layout:**
```
┌──────────────────────────────────────┐
│ 🔐 Identidade Xumm      [SEMANA 4]   │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │  Onboarding Seguro via Xumm      │ │
│ │  OAuth 2.0 + Wallet XRPL         │ │
│ │  Sem senha, 100% blockchain      │ │
│ └──────────────────────────────────┘ │
│                                      │
│ [ 🔗 Conectar Wallet Xumm ] (disabled)│
└──────────────────────────────────────┘
```

**Badge:** "SEMANA 4" em laranja

**API Future:** `POST /api/v1/auth/xumm/oauth`

**Tooltip:**
```
Identidade Xumm:
• OAuth 2.0 nativo XRPL
• Sem senha (Sign-in with Wallet)
• Associação automática de owner
• Disponível: Semana 4 (13/12-19/12)
```

### 3. ERP Reconciliation Card (Inativo)

**Localização:** Dashboard > Compliance ou Settings

**Layout:**
```
┌──────────────────────────────────────┐
│ 📊 Reconciliação ERP    [SEMANA 4]   │
│                                      │
│ ┌──────────────────────────────────┐ │
│ │  Integração com ERP              │ │
│ │  Export CSV diário automático    │ │
│ │  Compatível: SAP, TOTVS, etc.    │ │
│ └──────────────────────────────────┘ │
│                                      │
│ [ 📄 Configurar ERP ] (disabled)     │
└──────────────────────────────────────┘
```

**Badge:** "SEMANA 4" em laranja

**API Future:** `POST /api/v1/connect/erp/reconcile`

**Tooltip:**
```
Reconciliação ERP:
• Export CSV diário (automático)
• Estados: pendente/conciliado/erro
• Compatível: SAP, TOTVS, Protheus
• Workflow n8n para agendamento
• Disponível: Semana 4 (13/12-19/12)
```

---

## 🎨 V. Componentes Especiais

### 1. Network Badge (Header)

**Sempre Visível:** Sim  
**Posição:** Header direito

**Layout:**
```
┌──────────────────────────┐
│ 🟢 XRPL Testnet Live     │
└──────────────────────────┘
```

**Estados:**
- 🟢 Verde pulsante → Conectado
- 🟡 Amarelo → Conectando...
- 🔴 Vermelho → Desconectado

**API:** WebSocket status via `wss://s.altnet.rippletest.net:51233`

### 2. Testnet Info Panel (Collapsible)

**Localização:** Dashboard > Info ou Settings > Network

**Layout:**
```
┌────────────────────────────────────────────────────┐
│ 🔍 Configuração XRPL Testnet (Verificável)  [−]    │
├────────────────────────────────────────────────────┤
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ RLUSD Issuer     │ │ Treasury Vault   │         │
│ │ rhvzTE7FX...     │ │ r3YVS16ag...     │         │
│ └──────────────────┘ └──────────────────┘         │
│                                                    │
│ ┌──────────────────┐ ┌──────────────────┐         │
│ │ Merchant Wallet  │ │ Network          │         │
│ │ rHHe2ha4z...     │ │ wss://s.altn...  │         │
│ └──────────────────┘ └──────────────────┘         │
└────────────────────────────────────────────────────┘
```

**Todos os valores:** Clicáveis, copiam para clipboard com toast "Copiado!"

### 3. Compliance Export Modal

**Trigger:** Botão "Exportar Compliance CSV"

**Layout:**
```
┌────────────────────────────────────────────────┐
│ 📄 Exportar Relatório de Compliance            │
│                                                │
│ Período:                                       │
│ [ De: 01/11/2024 ] [ Até: 30/11/2024 ]        │
│                                                │
│ Formato:                                       │
│ ( ) CSV Padrão                                 │
│ (•) CSV CARF/OCDE                              │
│ ( ) JSON                                       │
│                                                │
│ Incluir:                                       │
│ [✓] TX Hashes                                  │
│ [✓] Explorer URLs                              │
│ [✓] Valores em BRL                             │
│ [✓] Status de confirmação                      │
│ [ ] Dados técnicos (sequence, ledger)          │
│                                                │
│ [ Cancelar ]  [ 📥 Exportar (6 transações) ]   │
└────────────────────────────────────────────────┘
```

**API Mapping:** `GET /api/v1/compliance/report?from=...&to=...&format=csv`

**Output:** CSV com colunas:
```csv
txHash,type,status,amount_rlusd,amount_brl,timestamp,explorer_url
38D3ED5B...,EscrowFinish,tesSUCCESS,5.00,25.00,2024-11-29T14:32:00Z,https://testnet.xrpl.org/transactions/...
```

---

## 📐 VI. Responsividade e Mobile-First

### Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | < 768px | Stack vertical, cards 100% |
| Tablet | 768-1024px | Grid 2 colunas |
| Desktop | > 1024px | Grid 3 colunas |

### Mobile Adjustments

**Header:**
- Stack logo + network badge vertical
- Collapse menu em hamburger

**Cards:**
- 100% width
- Padding reduzido (1rem)
- Font sizes 90% do desktop

**Transações:**
- TX Hash truncado (primeiros 8 + últimos 6 caracteres)
- Tooltip mostra hash completo

**Buttons:**
- Touch-friendly (min 44px height)
- Margin aumentado (0.75rem)

---

## 🔗 VII. API Mapping Completo

| Componente UI | Endpoint | Método | Dados Mockados Testnet |
|---------------|----------|--------|------------------------|
| Balance Card | `/api/v1/merchant/balance` | GET | `{ rlusd: "12500", brl: "62500", yield: {...} }` |
| Receber Pagamento | `/api/payment/pix` | POST | Gera QR code PIX |
| Gerar PIX QR | `/api/payment/pix` | POST | QR code dinâmico |
| Antecipar | `/api/escrow-create` | POST | Cria escrow IOU RLUSD |
| Liquidar D+0 | `/api/escrow-finish` | POST | Finaliza escrow (owner+sequence) |
| Compliance Export | `/api/v1/compliance/report` | GET | CSV com TXs auditáveis |
| TX History | `/api/v1/merchant/transactions` | GET | Lista de 6 TXs Testnet |
| Security Status | `/api/metrics/security` | GET | JWT status, rate limit |
| Yield Activate | `/api/v1/merchant/yield/activate` | POST | (Future - Semana 3) |
| Xumm OAuth | `/api/v1/auth/xumm/oauth` | POST | (Future - Semana 4) |
| ERP Reconcile | `/api/v1/connect/erp/reconcile` | POST | (Future - Semana 4) |

---

## 🎯 VIII. Checklist de Implementação

### ✅ Fase 1: Dados Testnet (Completo)

- [x] Network badge "XRPL Testnet Live"
- [x] Endereços reais (Issuer, Treasury, Merchant)
- [x] 6 TX Hashes reais com links funcionando
- [x] Métricas de performance (3.5s, ~4s, 100%)

### ✅ Fase 2: Segurança Visual (Completo)

- [x] Security banner com KMS/JWT/Rate Limit
- [x] Honeypot badge
- [x] JWT status indicator
- [x] Rate limit monitor

### 🟡 Fase 3: Roadmap Placeholders (Parcial)

- [x] Yield mXRP card (disabled)
- [x] Xumm OAuth card (disabled)
- [x] ERP Reconciliation card (disabled)
- [ ] Tooltips explicativos
- [ ] Badge "EM BREVE" / "SEMANA 4"

### ⏳ Fase 4: Interatividade (Pendente)

- [ ] Integração com APIs reais
- [ ] Modal de Compliance Export
- [ ] Confirmação de ações críticas
- [ ] Toast notifications

---

## 📊 IX. Métricas de Validação

### Performance

| Métrica | Target | Alcançado | Exibir no UI |
|---------|--------|-----------|--------------|
| Latência TX | < 5s | 3.5s | ✓ "30% melhor" |
| Confirmação | < 10s | ~4s | ✓ "60% melhor" |
| Taxa Sucesso | 95% | 100% | ✓ "6/6 TXs SUCCESS" |
| Uptime | 99% | 100% | ✓ Badge verde |

### Segurança

| Check | Status | Badge |
|-------|--------|-------|
| KMS Isolation | ✓ | Verde |
| JWT Ativo | ✓ | Verde |
| Rate Limit OK | ✓ | Verde |
| Honeypot Mon. | ✓ | Verde |

---

## 🎨 X. Assets e Ícones

### Ícones Sugeridos

| Elemento | Emoji/SVG | Cor |
|----------|-----------|-----|
| Saldo | 💵 | Verde neon |
| Escrow | 🔒 | Amarelo |
| Success | ✓ | Verde |
| Testnet | 🟢 | Verde pulsante |
| Security | 🔐 | Verde neon |
| Honeypot | 🛡️ | Verde |
| TX Hash | 🔗 | Verde neon (link) |
| Yield | 💎 | Verde |
| Xumm | 🔐 | Azul claro |
| ERP | 📊 | Cinza |

### Animações

| Elemento | Animação | Duração |
|----------|----------|---------|
| Network badge pulse | Opacidade 1 → 0.5 → 1 | 2s loop |
| Card hover | TranslateY -2px | 0.3s |
| Button hover | Scale 1.02 | 0.3s |
| Toast slide | TranslateX 400px → 0 | 0.3s |

---

## 📝 XI. Observações Finais

### Prioridades

1. **Testnet Badge** - CRÍTICO: Usuários devem saber que é ambiente de testes
2. **TX Hashes Reais** - CRÍTICO: Provas de D+0 devem ser clicáveis e funcionais
3. **Security Badges** - ALTA: Demonstrar arquitetura institucional
4. **Roadmap Placeholders** - MÉDIA: Mostrar evolução futura

### Evitar

❌ **NÃO usar** dados fictícios onde há TX reais disponíveis  
❌ **NÃO ocultar** o badge Testnet (transparência total)  
❌ **NÃO usar** termos técnicos excessivos no comerciante view  
❌ **NÃO habilitar** botões roadmap antes da implementação  

### Manter

✅ **SEMPRE exibir** network status no header  
✅ **SEMPRE linkar** TX Hash para explorer  
✅ **SEMPRE usar** cores da paleta oficial  
✅ **SEMPRE validar** API mapping antes de habilitar feature  

---

## 🔗 Referências

- [Backend Architecture](/docs/BACKEND_ARCHITECTURE.md)
- [QA Final Report](/docs/QA_FINAL_REPORT.md)
- [Roadmap Weeks 3-4](/docs/ROADMAP_WEEKS_3_4.md)
- [Artifacts Testnet](/docs/ARTIFACTS_TESTNET_REAL.json)

---

**Versão:** 1.0 Testnet  
**Última Atualização:** 29/11/2024  
**Próxima Revisão:** Após implementação Roadmap Semana 3  

---

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║           🎨 DESIGN SPEC - 100% ALINHADO COM BACKEND          ║
║                                                               ║
║   • Testnet Badge: ✓                                         ║
║   • TX Hashes Reais: ✓ (6 transações)                        ║
║   • Security Badges: ✓ (KMS/JWT/Honeypot)                    ║
║   • Roadmap Placeholders: ✓ (Yield/Xumm/ERP)                 ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```
