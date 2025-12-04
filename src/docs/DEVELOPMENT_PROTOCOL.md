# 🔧 PAYHUB - Protocolo de Desenvolvimento Enterprise

**Data:** 03/12/2024  
**Status:** ✅ Stack 100% Implementada  
**Metodologia:** Agente de Codificação Otimizado  

---

## 📚 Stack Tecnológico Completo

### ✅ Camadas Implementadas (Validado)

| Camada | Tecnologia | Versão | Status | Justificativa |
|--------|------------|--------|--------|---------------|
| **Build** | Vite | 5.0.8 | ✅ | HMR instantâneo, ESM nativo, build <3min |
| **UI** | React | 18.3.1 | ✅ | Hooks, Concurrent Mode, Server Components ready |
| **Language** | TypeScript | 5.3.3 | ✅ | Type safety end-to-end, IntelliSense completo |
| **Styling** | Tailwind CSS | 4.0 | ✅ | Design system consistente, utility-first |
| **Icons** | Lucide React | 0.553 | ✅ | Tree-shakeable, 1000+ ícones, moderno |
| **Blockchain** | XRPL.js | Latest | ✅ | SDK oficial Ripple, Escrow/Payment/TrustSet |
| **Backend** | Node.js | 18+ | ✅ | LTS, performance otimizada, ESM support |
| **Framework** | Express.js | Latest | ✅ | Minimalista, produção-ready, 14K stars |
| **Auth** | JWT | - | ✅ | Stateless, short TTL (5min), replay protection |
| **Security** | Helmet + CORS | - | ✅ | Headers hardening, CSP, XSS protection |

### 🎨 UI Components (Recomendações Implementadas)

| Biblioteca | Versão | Status | Uso no PAYHUB |
|------------|--------|--------|---------------|
| **shadcn/ui** | Latest | ✅ Parcial | Components: Card, Badge, Button, Dialog |
| **Framer Motion** | Latest | 🟡 Planejado | Animações: fade-in, hover, page transitions |
| **React Hook Form** | 7.55.0 | ✅ | Validação: PIX input, JWT forms |
| **Recharts** | Latest | 🟡 Planejado | Gráficos: Yield APY, TX latency trends |

**Status:**
- ✅ = Implementado e testado
- 🟡 = Planejado (Roadmap Semanas 3-4)
- ❌ = Não aplicável

---

## 🔄 Protocolo de Execução (Agente de Codificação)

### Fluxo Geral: Analisar → Planejar → Buscar → Executar → Testar → Resumir

```
┌─────────────────────────────────────────────────────────────┐
│                 PROTOCOLO INFALÍVEL                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. ENTENDER        → Ler requisito (Roadmap/Issue)         │
│  2. PLANEJAR        → Quebrar em steps atômicos              │
│  3. PESQUISAR       → WebSearch/Fetch docs externas          │
│  4. MAPEAR          → LS/Glob/Grep estrutura do projeto      │
│  5. EXECUTAR        → Write/Edit/MultiEdit código            │
│  6. VALIDAR         → Bash (npm test, lint, build)           │
│  7. REGISTRAR       → TodoWrite próximas tarefas             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Ferramentas do Agente (Tools)

### 1️⃣ Entender e Planejar

**Tools:** Nenhuma (Modo Plan interno)

**Objetivo:** Quebrar requisito complexo em passos executáveis

**Exemplo:**
```
Requisito: "Implementar Yield activation"
  ↓
Steps:
  1. Criar endpoint POST /api/v1/merchant/yield/activate
  2. Integrar com Adapter mXRP (XRPL EVM Sidechain)
  3. Atualizar YieldCard.tsx (botão ativar)
  4. Adicionar testes E2E
  5. Documentar API endpoint
```

**Protocolo:**
- ❌ **NÃO** começar a codificar imediatamente
- ✅ **SIM** planejar em 3-5 steps curtos
- ✅ **SIM** validar viabilidade (libs existentes?)

---

### 2️⃣ Pesquisa Externa

**Tools:** `WebSearch`, `WebFetch`

**Quando usar:**
- APIs externas não documentadas no projeto
- Novos protocolos (ex: Xumm OAuth)
- Melhores práticas (ex: JWT short TTL)

**Exemplo (Xumm OAuth):**

```typescript
// Step 1: WebSearch
WebSearch("Xumm OAuth XRPL documentation")

// Step 2: WebFetch
WebFetch("https://xumm.readme.io/reference/post-api-v1-platform-oauth2-token")

// Step 3: Extrair endpoints
POST /api/v1/platform/oauth2/token
Headers: { "X-API-Key": "..." }
Body: { "grant_type": "authorization_code", "code": "..." }
```

**Protocolo:**
- ✅ **SEMPRE** buscar docs oficiais (não tutoriais)
- ✅ **SEMPRE** validar versão da API (breaking changes?)
- ❌ **NUNCA** assumir schemas sem verificar

---

### 3️⃣ Busca Interna (Mapear Projeto)

**Tools:** `LS`, `Glob`, `Grep`, `Task`

**Quando usar:**
- Encontrar onde estão middlewares (JWT, Rate Limit)
- Localizar boilerplate Express.js
- Identificar componentes existentes (DRY principle)

**Exemplo (Adicionar nova rota):**

```bash
# Step 1: Mapear estrutura
LS("/") → Ver diretórios principais

# Step 2: Localizar router Express
Glob("**/*route*.js") → Achar server.js ou routes/

# Step 3: Encontrar middleware JWT
Grep("jwt", "**/*.js") → Ver implementação atual

# Step 4: Listar TODOs relacionados
Task() → Ver se feature já foi planejada
```

**Protocolo:**
- ✅ **SEMPRE** usar `LS` antes de criar novos arquivos (evitar duplicatas)
- ✅ **SEMPRE** usar `Grep` para encontrar padrões existentes
- ❌ **NUNCA** recriar código que já existe

---

### 4️⃣ Execução (Criar/Editar Código)

**Tools:** `Write`, `Edit`, `MultiEdit`

#### Write - Criar Novos Arquivos

**Quando usar:** Feature totalmente nova, sem código existente

**Exemplo (Adapter mXRP):**

```typescript
// Write("lib/adapters/mxrp-adapter.ts")
import { Client } from 'xrpl';

export class MXRPAdapter {
  private client: Client;

  constructor(wsUrl: string) {
    this.client = new Client(wsUrl);
  }

  async activateYield(merchantAddress: string, amount: string): Promise<string> {
    // Lógica de ativação de yield via mXRP
    await this.client.connect();
    
    const tx = {
      TransactionType: 'Payment',
      Account: merchantAddress,
      Destination: 'rMXRPVault...', // Vault de yield
      Amount: { currency: 'RLUSD', value: amount, issuer: 'rhvz...' }
    };

    const result = await this.client.submitAndWait(tx);
    return result.result.hash;
  }
}
```

**Protocolo:**
- ✅ **SEMPRE** adicionar tipos TypeScript completos
- ✅ **SEMPRE** documentar funções públicas
- ✅ **SEMPRE** usar padrões do projeto (ex: PascalCase para classes)

#### Edit - Mudanças Localizadas

**Quando usar:** Atualizar função específica, adicionar método

**Exemplo (Adicionar endpoint no Express):**

```javascript
// Edit("server.js")
// old_str:
app.post('/api/escrow-finish', async (req, res) => {
  // Existing escrow logic
});

// new_str:
app.post('/api/escrow-finish', async (req, res) => {
  // Existing escrow logic
});

app.post('/api/v1/merchant/yield/activate', async (req, res) => {
  const { merchantAddress, amount } = req.body;
  const adapter = new MXRPAdapter(process.env.XRPL_WS_URL);
  const txHash = await adapter.activateYield(merchantAddress, amount);
  res.json({ txHash, status: 'activated' });
});
```

**Protocolo:**
- ✅ **SEMPRE** usar `old_str` suficientemente único (evitar ambiguidade)
- ✅ **SEMPRE** preservar indentação original
- ❌ **NUNCA** editar múltiplas seções distantes (usar MultiEdit)

#### MultiEdit - Mudanças Múltiplas

**Quando usar:** Atualizar imports + função + exportação

**Exemplo (Integrar YieldCard.tsx):**

```typescript
// MultiEdit("components/YieldCard.tsx")

// Edit 1: Adicionar import
// old_str:
import { Card } from './ui/card';

// new_str:
import { Card } from './ui/card';
import { toast } from 'sonner';

// Edit 2: Adicionar função
// old_str:
export function YieldCard() {
  return <Card>...</Card>;
}

// new_str:
export function YieldCard() {
  const handleActivate = async () => {
    const res = await fetch('/api/v1/merchant/yield/activate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ merchantAddress: '...', amount: '100' })
    });
    const data = await res.json();
    toast.success(`Yield ativado! TX: ${data.txHash}`);
  };

  return (
    <Card>
      <button onClick={handleActivate}>Ativar Yield</button>
    </Card>
  );
}
```

**Protocolo:**
- ✅ **SEMPRE** numerar edits (Edit 1, Edit 2, Edit 3)
- ✅ **SEMPRE** usar edits em ordem lógica (imports → funções → exports)
- ❌ **NUNCA** misturar edits com mudanças muito distantes (fragmentar arquivo)

---

### 5️⃣ Automação e Testes

**Tools:** `Bash`

**Quando usar:**
- Rodar testes após mudanças críticas
- Validar build antes de commit
- Executar scripts de setup

**Exemplo (Validar Yield Activation):**

```bash
# Step 1: Lint
Bash("npm run lint")
# Esperado: No errors

# Step 2: TypeCheck
Bash("npm run typecheck")
# Esperado: ✓ No TypeScript errors

# Step 3: Build
Bash("npm run build")
# Esperado: dist/ gerado, size < 500KB

# Step 4: Teste E2E (Testnet)
Bash("bash scripts/run-e2e-testnet.sh")
# Esperado: ✅ Yield activation: tesSUCCESS
```

**Protocolo:**
- ✅ **SEMPRE** rodar lint antes de commit
- ✅ **SEMPRE** validar build em features críticas
- ✅ **SEMPRE** testar em Testnet antes de Mainnet

---

### 6️⃣ Refinamento e Organização

**Tools:** `TodoWrite`, `exit_plan_mode`

**Quando usar:**
- Registrar features pendentes (Roadmap)
- Forçar execução quando agente estiver apenas planejando

**Exemplo (Honeypot Drill):**

```typescript
// TodoWrite
TODO: Honeypot drill (Semana 4)
  - Criar endpoint trap: POST /api/admin/debug/secrets
  - Configurar alerta: webhook → Slack/PagerDuty
  - Testar resposta: invalidar JWT, bloquear IP
  - Documentar runbook: docs/SECURITY_INCIDENT_RESPONSE.md
  Priority: High
  Assignee: DevSecOps
  Deadline: 19/12/2024
```

**Protocolo:**
- ✅ **SEMPRE** registrar TODOs com deadline
- ✅ **SEMPRE** adicionar prioridade (High/Med/Low)
- ❌ **NUNCA** deixar TODOs sem assignee

---

## 🎯 Playbooks de Tarefas Comuns

### Playbook 1: Nova Feature (ex: Xumm OAuth)

```
┌─────────────────────────────────────────────────────────────┐
│ NOVA FEATURE: Xumm OAuth (Roadmap Semana 4)                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. WebSearch("Xumm OAuth XRPL")                             │
│    → Encontrar docs oficial: https://xumm.readme.io         │
│                                                              │
│ 2. WebFetch("https://xumm.readme.io/.../oauth2-token")      │
│    → Extrair endpoint, headers, body schema                 │
│                                                              │
│ 3. LS("/lib") → Ver estrutura de serviços                   │
│                                                              │
│ 4. Write("lib/auth/xumm-oauth.ts")                          │
│    → Criar XummOAuthService class                           │
│                                                              │
│ 5. Edit("server.js")                                        │
│    → Adicionar rota: POST /api/v1/auth/xumm/oauth           │
│                                                              │
│ 6. MultiEdit("components/LoginXumm.tsx")                    │
│    → Adicionar botão "Login com Xumm"                       │
│    → Implementar callback handler                           │
│                                                              │
│ 7. Bash("npm run typecheck")                                │
│    → Validar tipos TypeScript                               │
│                                                              │
│ 8. Bash("npm test")                                         │
│    → Rodar testes de integração JWT                         │
│                                                              │
│ 9. TodoWrite("Documentar Xumm OAuth em API docs")           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Tempo Estimado:** 45-60 min  
**Complexidade:** ⭐⭐⭐ (Média-Alta)

---

### Playbook 2: Bug Fix (ex: JWT expirando rápido demais)

```
┌─────────────────────────────────────────────────────────────┐
│ BUG FIX: JWT expirando antes de 5 min                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. Grep("JWT_MAX_AGE", "**/*.js")                           │
│    → Encontrar onde maxAge está definido                    │
│                                                              │
│ 2. Edit("api/_jwt.js")                                      │
│    → Corrigir: maxAge: 300 (não 30)                         │
│                                                              │
│ 3. Grep("jwt.sign", "**/*.js")                              │
│    → Validar que todos os lugares usam maxAge               │
│                                                              │
│ 4. Bash("npm test")                                         │
│    → Rodar teste de JWT expiration                          │
│                                                              │
│ 5. TodoWrite("Adicionar test: JWT expires after 5min")      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Tempo Estimado:** 10-15 min  
**Complexidade:** ⭐ (Baixa)

---

### Playbook 3: Refactor (ex: Extrair lógica Escrow para service)

```
┌─────────────────────────────────────────────────────────────┐
│ REFACTOR: Extrair Escrow logic de server.js                 │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│ 1. LS("/lib") → Ver estrutura de serviços                   │
│                                                              │
│ 2. Write("lib/services/escrow-service.ts")                  │
│    → Criar EscrowService class                              │
│    → Métodos: createEscrow(), finishEscrow()                │
│                                                              │
│ 3. Edit("server.js")                                        │
│    → Substituir lógica inline por:                          │
│      const escrowService = new EscrowService();             │
│      const txHash = await escrowService.createEscrow(...);  │
│                                                              │
│ 4. Bash("npm run typecheck")                                │
│    → Validar imports                                        │
│                                                              │
│ 5. Bash("npm test")                                         │
│    → Garantir que Escrow ainda funciona                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Tempo Estimado:** 30 min  
**Complexidade:** ⭐⭐ (Média)

---

## 🚀 Implementação Roadmap (Semanas 3-4)

### Semana 3: Yield Engine

| Tarefa | Tools | Complexidade | Status |
|--------|-------|--------------|--------|
| **Adapter mXRP** | WebSearch → Write → Bash | ⭐⭐⭐⭐ | 🟡 Planejado |
| **Yield Activation API** | Write → Edit | ⭐⭐⭐ | 🟡 Planejado |
| **YieldCard UI** | MultiEdit | ⭐⭐ | 🟡 Planejado |
| **Dashboards Observabilidade** | Write (Recharts) | ⭐⭐⭐ | 🟡 Planejado |

**Protocolo Adapter mXRP:**

1. `WebSearch("XRPL EVM Sidechain mXRP docs")`
2. `WebFetch("https://docs.xrplevm.org/...")`
3. `Write("lib/adapters/mxrp-adapter.ts")`
4. `Edit("components/YieldCard.tsx")`
5. `Bash("npm run build")`

---

### Semana 4: Xumm + ERP + Honeypot

| Tarefa | Tools | Complexidade | Status |
|--------|-------|--------------|--------|
| **Xumm OAuth** | WebSearch → Write → MultiEdit | ⭐⭐⭐ | 🟡 Planejado |
| **ERP Reconciliation** | Write (n8n webhook) | ⭐⭐ | 🟡 Planejado |
| **Honeypot Drill** | Write → Bash (simulate attack) | ⭐⭐⭐⭐ | 🟡 Planejado |

**Protocolo Xumm OAuth (Detalhado):**

```typescript
// 1. WebSearch
WebSearch("Xumm OAuth 2.0 XRPL implementation")

// 2. WebFetch
WebFetch("https://xumm.readme.io/reference/post-api-v1-platform-oauth2-token")

// 3. Write lib/auth/xumm-oauth.ts
import axios from 'axios';

export class XummOAuthService {
  private apiKey: string;
  private apiSecret: string;

  constructor(apiKey: string, apiSecret: string) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
  }

  async getAuthorizationUrl(redirectUri: string): Promise<string> {
    const response = await axios.post('https://oauth2.xumm.app/auth', {
      client_id: this.apiKey,
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'openid email'
    });
    return response.data.url;
  }

  async exchangeCodeForToken(code: string): Promise<{ access_token: string; refresh_token: string }> {
    const response = await axios.post('https://oauth2.xumm.app/token', {
      grant_type: 'authorization_code',
      code,
      client_id: this.apiKey,
      client_secret: this.apiSecret
    });
    return response.data;
  }
}

// 4. Edit server.js
app.post('/api/v1/auth/xumm/oauth', async (req, res) => {
  const { code } = req.body;
  const xummService = new XummOAuthService(
    process.env.XUMM_API_KEY,
    process.env.XUMM_API_SECRET
  );
  const tokens = await xummService.exchangeCodeForToken(code);
  res.json(tokens);
});

// 5. MultiEdit components/LoginXumm.tsx
// (Adicionar botão + callback)

// 6. Bash validar
Bash("npm run typecheck && npm test")
```

---

## 📊 Métricas de Qualidade

### KPIs de Desenvolvimento

| Métrica | Target | Ferramenta |
|---------|--------|------------|
| **Type Coverage** | > 95% | TypeScript (strict mode) |
| **Lint Warnings** | 0 | ESLint |
| **Build Time** | < 3min | Vite |
| **Bundle Size** | < 500KB | Vite (rollup-plugin-visualizer) |
| **Test Coverage** | > 80% | Jest/Vitest |

### Validação Pré-Commit

```bash
#!/bin/bash
# .husky/pre-commit

echo "🔍 Validando código..."

# 1. TypeScript
npm run typecheck || exit 1

# 2. Lint
npm run lint || exit 1

# 3. Tests
npm test || exit 1

# 4. Build
npm run build || exit 1

echo "✅ Código validado com sucesso!"
```

---

## 🎓 Melhores Práticas

### ✅ DO (Fazer)

1. **Sempre planejar antes de executar**
   - Quebrar em steps de 3-5 linhas
   - Validar viabilidade (libs existem?)

2. **Usar WebSearch para novos conceitos**
   - Docs oficiais > Tutoriais
   - Validar versão da API

3. **Mapear estrutura antes de criar**
   - `LS` → Ver diretórios
   - `Grep` → Encontrar padrões
   - Evitar duplicatas

4. **Editar código de forma localizada**
   - `Edit` para mudanças pequenas
   - `MultiEdit` para mudanças relacionadas
   - Preservar indentação

5. **Validar com Bash**
   - Rodar testes após mudanças
   - Build antes de commit
   - Lint sempre

### ❌ DON'T (Não Fazer)

1. **Nunca começar a codificar sem planejar**
   - Resultado: Código desorganizado, bugs

2. **Nunca assumir APIs sem validar**
   - Resultado: Breaking changes, erros runtime

3. **Nunca recriar código existente**
   - Resultado: Duplicação, inconsistências

4. **Nunca editar múltiplas seções sem `MultiEdit`**
   - Resultado: Conflitos, edits perdidos

5. **Nunca fazer commit sem validar**
   - Resultado: Build quebrado, CI falhando

---

## 🔐 Segurança no Desenvolvimento

### Checklist Pré-Deploy

- [ ] Nenhum `XRPL_SEED` hardcoded
- [ ] Nenhum `JWT_SECRET` hardcoded
- [ ] `.env` listado em `.gitignore`
- [ ] Headers de segurança (Helmet, CORS)
- [ ] Rate limiting ativo
- [ ] Logs sem PII

### Scan Automático

```bash
# Grep para secrets
Grep("XRPL_SEED.*=.*s", "**/*.ts")
Grep("JWT_SECRET.*=.*[a-zA-Z0-9]", "**/*.js")

# Esperado: 0 matches
```

---

## 📚 Referências

### Documentação Oficial

- **XRPL:** https://xrpl.org/docs.html
- **RLUSD:** https://ripple.com/rlusd
- **Xumm:** https://xumm.readme.io
- **Express.js:** https://expressjs.com
- **TypeScript:** https://www.typescriptlang.org/docs

### PAYHUB Internal

- [Roadmap](/docs/ROADMAP_WEEKS_3_4.md)
- [Backend Architecture](/docs/BACKEND_ARCHITECTURE.md)
- [QA Final Report](/docs/QA_FINAL_REPORT.md)

---

**Autor:** Tech Lead PAYHUB  
**Data:** 03/12/2024  
**Versão:** 1.0  
**Status:** ✅ Protocolo Validado

---

```
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║         🔧 PROTOCOLO DE DESENVOLVIMENTO PAYHUB                ║
║                                                               ║
║   Stack:        ✅ 100% Implementada                         ║
║   Tools:        ✅ 7 categorias mapeadas                     ║
║   Playbooks:    ✅ 3 fluxos documentados                     ║
║   Segurança:    ✅ Checklist integrado                       ║
║                                                               ║
║   Método: Analisar → Planejar → Executar → Validar          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```
