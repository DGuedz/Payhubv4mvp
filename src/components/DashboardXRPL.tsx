import { Card } from './ui/card';
import { TrendingUp, ArrowUpRight, PiggyBank, Wallet, Zap } from 'lucide-react';
import { Progress } from './ui/progress';

export function DashboardXRPL() {
  // Mock data
  const balance = 45280.50;
  const accruedYield = 1842.35;
  const totalWithYield = balance + accruedYield;
  const apyRate = 6.8;
  const feesSaved = 8456.20;
  const traditionalCost = 15280.00;

  return (
    <div className="min-h-screen bg-[#F4F7FF] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#607D8B]">Dashboard</p>
              <h1 className="text-4xl text-[#1a2a3a]">Tesouraria Ativa</h1>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white border border-[#2979FF]/10 shadow-sm">
              <p className="text-xs text-[#607D8B]">XRPL Address</p>
              <p className="text-sm text-[#2979FF] font-mono">rMERC...7x9K2</p>
            </div>
          </div>
        </div>

        {/* Main Balance Card - Styled like reference image */}
        <Card className="p-8 rounded-3xl bg-gradient-to-br from-[#2979FF] to-[#5B9DFF] border-0 shadow-xl shadow-blue-500/30 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10"></div>
          
          <div className="relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-white/70">Saldo Total</p>
                <p className="text-white/90">RLUSD Wallet</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-6xl text-white tracking-tight">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0
                }).format(totalWithYield)}
              </p>
              <p className="text-xl text-white/80">
                ${(totalWithYield / 5.2).toFixed(2)} RLUSD
              </p>
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-white/20">
              <div>
                <p className="text-sm text-white/70 mb-1">Saldo Base</p>
                <p className="text-xl text-white">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(balance)}
                </p>
              </div>
              <div>
                <p className="text-sm text-white/70 mb-1">Rendimento</p>
                <p className="text-xl text-[#00E676] flex items-center gap-1">
                  <ArrowUpRight className="w-4 h-4" />
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(accruedYield)}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* APY and Stats Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* APY Card */}
          <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#00E676]" />
                </div>
              </div>
              <div>
                <p className="text-sm text-[#607D8B] mb-1">APY Atual</p>
                <p className="text-4xl text-[#1a2a3a] tracking-tight">{apyRate}%</p>
                <p className="text-sm text-[#00E676] mt-2">
                  ~{new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format((balance * apyRate / 100) / 12)}/mês
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#607D8B]">
                  <span>Meta</span>
                  <span>5.0% - 8.0%</span>
                </div>
                <Progress value={68} className="h-2" />
              </div>
            </div>
          </Card>

          {/* Yield Engine Status */}
          <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-[#2979FF]" />
                </div>
              </div>
              <div>
                <p className="text-sm text-[#607D8B] mb-1">HUB AI</p>
                <p className="text-2xl text-[#1a2a3a]">Ativo</p>
                <p className="text-sm text-[#2979FF] mt-2">24/7 Otimização</p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse"></div>
                <span className="text-[#607D8B]">342 operações hoje</span>
              </div>
            </div>
          </Card>

          {/* Savings */}
          <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-[#00E676]" />
                </div>
              </div>
              <div>
                <p className="text-sm text-[#607D8B] mb-1">Economia</p>
                <p className="text-4xl text-[#1a2a3a] tracking-tight">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(feesSaved)}
                </p>
                <p className="text-sm text-[#00E676] mt-2">
                  vs. Métodos Tradicionais
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Cost Comparison */}
        <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl text-[#1a2a3a] mb-1">Comparação de Custos</h3>
              <p className="text-sm text-[#607D8B]">XRPL vs. Métodos Tradicionais</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-[#FF1744]/5 border border-[#FF1744]/20">
                <p className="text-sm text-[#607D8B] mb-2">Tradicional (MDR)</p>
                <p className="text-3xl text-[#FF1744]">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(traditionalCost)}
                </p>
                <p className="text-xs text-[#607D8B] mt-2">10% - 20% por transação</p>
              </div>

              <div className="p-5 rounded-xl bg-[#2979FF]/5 border border-[#2979FF]/20">
                <p className="text-sm text-[#607D8B] mb-2">PAYHUB (XRPL)</p>
                <p className="text-3xl text-[#2979FF]">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(traditionalCost - feesSaved)}
                </p>
                <p className="text-xs text-[#607D8B] mt-2">1.5% - 3% taxa de serviço</p>
              </div>

              <div className="p-5 rounded-xl bg-[#00E676]/5 border border-[#00E676]/20">
                <p className="text-sm text-[#607D8B] mb-2">Economia Total</p>
                <p className="text-3xl text-[#00E676] flex items-center gap-2">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(feesSaved)}
                </p>
                <p className="text-xs text-[#00E676] mt-2">
                  {((feesSaved / traditionalCost) * 100).toFixed(0)}% margem salva
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#2979FF]/5 border border-[#2979FF]/10 rounded-xl">
              <p className="text-sm text-[#607D8B]">
                <span className="text-[#2979FF]">Custo XRPL:</span> ~R$ 0,0001 por transação
              </p>
            </div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <p className="text-sm text-[#607D8B] mb-2">Volume 30d</p>
            <p className="text-2xl text-[#1a2a3a]">R$ 342K</p>
          </Card>
          <Card className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <p className="text-sm text-[#607D8B] mb-2">Transações</p>
            <p className="text-2xl text-[#1a2a3a]">1,247</p>
          </Card>
          <Card className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <p className="text-sm text-[#607D8B] mb-2">Liquidações D+0</p>
            <p className="text-2xl text-[#00E676]">100%</p>
          </Card>
          <Card className="p-5 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <p className="text-sm text-[#607D8B] mb-2">Escrows</p>
            <p className="text-2xl text-[#1a2a3a]">23</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
