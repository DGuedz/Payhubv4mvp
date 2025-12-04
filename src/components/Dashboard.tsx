import { Card } from './ui/card';
import { TrendingUp, ArrowUpRight, Percent, Wallet, Zap, PiggyBank } from 'lucide-react';
import { Progress } from './ui/progress';

export function Dashboard() {
  // Mock data
  const balance = 45280.50;
  const accruedYield = 1842.35;
  const totalWithYield = balance + accruedYield;
  const apyRate = 6.8;
  const feesSaved = 8456.20;
  const traditionalCost = 15280.00;

  return (
    <div className="min-h-screen bg-[#0a0a0f] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2 pt-6">
          <p className="text-sm text-gray-400">Merchant Portal</p>
          <h1 className="text-4xl tracking-tight">Dashboard</h1>
          <p className="text-sm text-purple-300">rMERCHANT...7x9K2</p>
        </div>

        {/* Main Balance Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Total Balance */}
          <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Saldo Total + Rendimento</p>
                  <p className="text-4xl tracking-tight">
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(totalWithYield)}
                  </p>
                  <p className="text-sm text-purple-300 mt-1">
                    ${(totalWithYield / 5.2).toFixed(2)} RLUSD
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-purple-400" />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Saldo Base</span>
                  <span>{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(balance)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Rendimento Acumulado</span>
                  <span className="text-green-400 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(accruedYield)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* APY Performance */}
          <Card className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">APY Atual</p>
                  <p className="text-4xl tracking-tight">{apyRate}%</p>
                  <p className="text-sm text-green-300 mt-1">
                    ~R$ {((balance * apyRate / 100) / 12).toFixed(2)}/mês
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Meta Mínima</span>
                  <span>5.0%</span>
                </div>
                <Progress value={68} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Meta Máxima</span>
                  <span>8.0%</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <Zap className="w-4 h-4" />
                  <span>Yield Engine Ativo 24/7</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Fee Savings Comparison */}
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl mb-1">Economia de Taxas</h3>
                <p className="text-sm text-gray-400">Comparação vs. Métodos Tradicionais</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-gray-400 mb-1">Custo Tradicional</p>
                <p className="text-2xl text-red-400">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(traditionalCost)}
                </p>
                <p className="text-xs text-gray-500 mt-1">10% - 20% MDR</p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <p className="text-sm text-gray-400 mb-1">Custo PAYHUB</p>
                <p className="text-2xl text-blue-400">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(traditionalCost - feesSaved)}
                </p>
                <p className="text-xs text-gray-500 mt-1">1.5% - 3% Taxa</p>
              </div>

              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-sm text-gray-400 mb-1">Margem Salva</p>
                <p className="text-2xl text-green-400 flex items-center gap-2">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(feesSaved)}
                </p>
                <p className="text-xs text-green-300 mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {((feesSaved / traditionalCost) * 100).toFixed(1)}% economia
                </p>
              </div>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
              <p className="text-sm text-purple-300 flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Custo de Liquidação XRPL: ~R$ 0,0001 por transação
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white/5 border-white/10">
            <p className="text-sm text-gray-400 mb-1">Volume (30d)</p>
            <p className="text-2xl">R$ 342K</p>
          </Card>
          <Card className="p-4 bg-white/5 border-white/10">
            <p className="text-sm text-gray-400 mb-1">Transações</p>
            <p className="text-2xl">1,247</p>
          </Card>
          <Card className="p-4 bg-white/5 border-white/10">
            <p className="text-sm text-gray-400 mb-1">Liquidações D+0</p>
            <p className="text-2xl">100%</p>
          </Card>
          <Card className="p-4 bg-white/5 border-white/10">
            <p className="text-sm text-gray-400 mb-1">Escrows Ativos</p>
            <p className="text-2xl">23</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
