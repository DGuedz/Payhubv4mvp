#!/bin/bash

# PAYHUB - Setup Testnet ENVs
# Este script ajuda a configurar as variáveis sensíveis de forma segura
# NUNCA commitar este arquivo com valores reais!

set -e

echo "🔐 PAYHUB - Setup Testnet ENVs"
echo "================================"
echo ""
echo "⚠️  IMPORTANTE: Estas variáveis são SENSÍVEIS!"
echo "   - Nunca commitar no Git"
echo "   - Nunca expor em logs"
echo "   - Usar apenas ENV ou KMS em produção"
echo ""

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Arquivo .env local (gitignored)
ENV_FILE=".env.testnet"

# Verificar se já existe
if [ -f "$ENV_FILE" ]; then
    echo -e "${YELLOW}⚠️  Arquivo $ENV_FILE já existe!${NC}"
    read -p "Deseja sobrescrever? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Operação cancelada."
        exit 1
    fi
fi

echo ""
echo "📝 Configurando variáveis..."
echo ""

# Função para solicitar input
ask_var() {
    local var_name=$1
    local var_desc=$2
    local var_example=$3
    
    echo -e "${GREEN}$var_name${NC}"
    echo "   Descrição: $var_desc"
    echo "   Exemplo: $var_example"
    read -p "   Valor: " var_value
    
    if [ -z "$var_value" ]; then
        echo -e "${RED}   ❌ Valor vazio! Usando placeholder...${NC}"
        var_value="PLACEHOLDER_$var_name"
    fi
    
    echo "$var_name=\"$var_value\"" >> $ENV_FILE
    echo ""
}

# Limpar arquivo
> $ENV_FILE

# Header
cat >> $ENV_FILE << 'EOF'
# PAYHUB - Testnet Environment Variables
# ⚠️  NUNCA COMMITAR ESTE ARQUIVO!
# Gerado em: $(date)

# Rede XRPL
XRPL_NETWORK=testnet

EOF

# Solicitar variáveis
echo "1/3 - Seed da Carteira (Tesouraria)"
ask_var "XRPL_SEED" \
    "Seed secreto da carteira XRPL (formato s...)" \
    "sXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

echo "2/3 - Endereço do Emissor RLUSD"
ask_var "RLUSD_ISSUER_ADDRESS" \
    "Endereço do emissor do token RLUSD na Testnet" \
    "rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

echo "3/3 - Endereço da Tesouraria"
ask_var "TREASURY_VAULT_ADDRESS" \
    "Endereço da carteira de tesouraria (admin)" \
    "rXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

# Adicionar outras variáveis opcionais
cat >> $ENV_FILE << 'EOF'

# JWT (desenvolvimento)
JWT_SECRET=dev

# Porta do servidor
PORT=3000

EOF

echo ""
echo -e "${GREEN}✅ Arquivo $ENV_FILE criado com sucesso!${NC}"
echo ""
echo "📋 Próximos passos:"
echo ""
echo "1. Validar valores no arquivo:"
echo "   cat $ENV_FILE"
echo ""
echo "2. Carregar no ambiente atual:"
echo "   export \$(cat $ENV_FILE | xargs)"
echo ""
echo "3. Ou iniciar servidor com envs:"
echo "   env \$(cat $ENV_FILE | xargs) node server.js"
echo ""
echo "4. Validar com QA:"
echo "   npm run qa:audit"
echo ""
echo "5. Executar testes E2E:"
echo "   npm run test:endpoints"
echo ""
echo -e "${YELLOW}⚠️  LEMBRETE: Este arquivo está em .gitignore!${NC}"
echo ""

# Validar se está no .gitignore
if ! grep -q "$ENV_FILE" .gitignore 2>/dev/null; then
    echo -e "${RED}❌ ATENÇÃO: $ENV_FILE NÃO está no .gitignore!${NC}"
    echo "   Adicione agora:"
    echo "   echo '$ENV_FILE' >> .gitignore"
    echo ""
fi

# Gerar comando para solicitar XRP do faucet
TREASURY_ADDR=$(grep TREASURY_VAULT_ADDRESS $ENV_FILE | cut -d'"' -f2)
if [[ $TREASURY_ADDR != PLACEHOLDER* ]] && [[ $TREASURY_ADDR == r* ]]; then
    echo "💰 Solicitar XRP do Faucet:"
    echo "   https://faucet.altnet.rippletest.net/"
    echo ""
    echo "   Endereço da tesouraria: $TREASURY_ADDR"
    echo ""
    echo "   Validar saldo:"
    echo "   https://testnet.xrpl.org/accounts/$TREASURY_ADDR"
    echo ""
fi

echo "🚀 Pronto para começar!"
