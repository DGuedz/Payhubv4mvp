import { Card } from './ui/card';
import { TrendingUp, DollarSign, Percent, Zap, ArrowUpRight } from 'lucide-react';
import { Progress } from './ui/progress';

export function RevenueMetrics() {
  // Mock data - Target: US$ 4M ARR
  const mrr = 285000; // Monthly Recurring Revenue in USD
  const arr = mrr * 12; // Annual Recurring Revenue
  const targetARR = 4000000; // US$ 4M target
  const performanceFeeRate = 0.15; // 15% average
  const yieldGenerated = 1900000; // Total yield generated for merchants
  const performanceFeeRevenue = yieldGenerated * performanceFeeRate;
  const serviceFeeRevenue = 520000; // Service fees (1.5-3%)
  const totalRevenue = performanceFeeRevenue + serviceFeeRevenue;
  
  const gmv = 12400000; // Gross Merchandise Value
  const activemerchants = 847;
  const avgRevenuePerMerchant = totalRevenue / activemerchants;

  return (
    <div className="space-y-6">
      {/* ARR Progress toward US$ 4M */}
      <Card className="p-6 bg-gradient-to-br from-[#00E676]/10 to-[#00E676]/5 border-[#00E676]/20 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm text-[#607D8B] mb-2">Annual Recurring Revenue (ARR)</p>
              <p className="text-4xl tracking-tight text-[#1a2a3a]">
                ${(arr / 1000000).toFixed(2)}M
              </p>
              <p className="text-sm text-[#00E676] mt-1">
                MRR: ${(mrr / 1000).toFixed(0)}K · Target: ${(targetARR / 1000000).toFixed(0)}M
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#00E676]/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#00E676]" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#607D8B]">Progresso para Series A</span>
              <span className="text-[#00E676]">{((arr / targetARR) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(arr / targetARR) * 100} className="h-3" />
            <p className="text-xs text-[#607D8B]">
              Faltam ${((targetARR - arr) / 1000000).toFixed(2)}M para o threshold de US$ 4M
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#00E676]/20">
            <div>
              <p className="text-xs text-[#607D8B]">Crescimento MoM</p>
              <p className="text-xl text-[#00E676] flex items-center gap-1">
                <ArrowUpRight className="w-4 h-4" />
                34%
              </p>
            </div>
            <div>
              <p className="text-xs text-[#607D8B]">CAC Payback</p>
              <p className="text-xl text-[#1a2a3a]">4.2 meses</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Revenue Breakdown - Performance Fee Focus */}
      <Card className="p-6 bg-white border-[#2979FF]/10 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl mb-1 text-[#1a2a3a]">Receita Recorrente Detalhada</h3>
              <p className="text-sm text-[#607D8B]">Performance Fee como Motor de Escala</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#2979FF]" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Performance Fee - Primary Revenue */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border border-[#2979FF]/20">
              <div className="flex items-center gap-2 mb-3">
                <Percent className="w-4 h-4 text-[#2979FF]" />
                <p className="text-sm text-[#1a2a3a]">Performance Fee (10-20%)</p>
              </div>
              <p className="text-3xl mb-1 text-[#1a2a3a]">${(performanceFeeRevenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-[#2979FF]">
                {((performanceFeeRevenue / totalRevenue) * 100).toFixed(1)}% da receita total
              </p>
              <div className="mt-3 pt-3 border-t border-[#2979FF]/20">
                <p className="text-xs text-[#607D8B]">Yield Gerado para Merchants</p>
                <p className="text-sm text-[#00E676]">${(yieldGenerated / 1000).toFixed(0)}K (5-8% APY)</p>
              </div>
            </div>

            {/* Service Fee - Secondary Revenue */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border border-[#2979FF]/20">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-[#2979FF]" />
                <p className="text-sm text-[#1a2a3a]">Service Fee (1.5-3%)</p>
              </div>
              <p className="text-3xl mb-1 text-[#1a2a3a]">${(serviceFeeRevenue / 1000).toFixed(0)}K</p>
              <p className="text-xs text-[#2979FF]">
                {((serviceFeeRevenue / totalRevenue) * 100).toFixed(1)}% da receita total
              </p>
              <div className="mt-3 pt-3 border-t border-[#2979FF]/20">
                <p className="text-xs text-[#607D8B]">Financiamento + Orquestração</p>
                <p className="text-sm text-[#1a2a3a]">ODL D+0 em RLUSD</p>
              </div>
            </div>
          </div>

          {/* GMV and Unit Economics */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#2979FF]/10">
            <div>
              <p className="text-xs text-[#607D8B] mb-1">GMV (TTV)</p>
              <p className="text-2xl text-[#1a2a3a]">${(gmv / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-xs text-[#607D8B] mb-1">Merchants Ativos</p>
              <p className="text-2xl text-[#1a2a3a]">{activemerchants.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs text-[#607D8B] mb-1">ARPU</p>
              <p className="text-2xl text-[#1a2a3a]">${(avgRevenuePerMerchant / 1000).toFixed(1)}K</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Scalability Proof */}
      <Card className="p-4 bg-gradient-to-r from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-5 h-5 text-[#2979FF] flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-[#1a2a3a] mb-1">Modelo de Receita Escalável</p>
            <p className="text-xs text-[#607D8B]">
              A Performance Fee sobre o Yield (5-8% APY) cria um fluxo de receita recorrente e previsível. 
              À medida que o GMV cresce, a receita cresce proporcionalmente sem aumento linear de custos operacionais.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
