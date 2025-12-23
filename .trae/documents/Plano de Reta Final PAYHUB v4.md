# Plano de Reta Final PAYHUB v4 - Consolidação e Entrega

## 🎯 Objetivo
Transformar o estado atual ("Ready for Deploy") em um produto de produção polido e totalmente funcional, garantindo que todas as funcionalidades críticas da Semana 4 (Segurança, Identidade, Compliance) estejam não apenas implementadas, mas integradas e operacionais.

## 📅 Timeline: Sprint Final (48 Horas)

### Fase 1: Integração e Conectividade (Imediato - 4h)
**Foco:** Garantir que o Frontend converse com os novos Backends criados.
1.  **SDK Security:** Conectar `sdk.security.alerts` ao endpoint `api/security/alerts.js`.
2.  **SDK Auth:** Conectar `WalletConnect.tsx` aos endpoints `api/auth/xumm/*`.
3.  **Deploy Update:** Atualizar script de deploy para incluir novos endpoints.

### Fase 2: Polimento de UI e Experiência (Próximas 8h)
**Foco:** Feedback visual para o usuário final.
1.  **Dashboard de Segurança:** Criar componente visual para exibir os alertas do Honeypot (consumindo o SDK).
2.  **UX de Login:** Melhorar o modal de login Xumm com QR Code real (ou simulado visualmente rico).
3.  **Relatórios:** Testar o fluxo de exportação CSV end-to-end com dados simulados realistas.

### Fase 3: Validação e Documentação (Final - 4h)
**Foco:** Garantia de qualidade e entrega.
1.  **Smoke Test Final:** Validar fluxo completo: Login -> Escrow -> Yield -> Export -> Logout.
2.  **Documentação:** Atualizar `README.md` com instruções de configuração das novas variáveis (`XUMM_API_KEY`, etc).
3.  **Handover:** Relatório final de entrega.

## 🛠️ Tarefas Técnicas Detalhadas

### 1. Integração Frontend-Backend
- [ ] Atualizar `src/sdk/payhub.ts` para garantir que as chamadas de segurança e auth apontem para as rotas corretas.
- [ ] Criar componente `src/components/SecurityDashboard.tsx` para visualizar os alertas.
- [ ] Atualizar `WalletConnect.tsx` para usar o fluxo de backend em vez de apenas local.

### 2. Infraestrutura
- [ ] Atualizar `deploy-live-pulse.sh` para incluir a pasta `api/security` e `api/auth`.
- [ ] Criar arquivo `.env.example` atualizado com todas as chaves necessárias.

### 3. Validação
- [ ] Executar script de teste de carga (simples) nos novos endpoints para garantir resiliência.

## 🚀 Próxima Ação Imediata
Iniciar a **Fase 1**, conectando os componentes de UI aos novos endpoints de backend criados, começando pelo Dashboard de Segurança.