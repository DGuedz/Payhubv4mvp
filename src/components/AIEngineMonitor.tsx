import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Brain, Cpu, TrendingUp, Zap, Activity, DollarSign } from 'lucide-react';
import { Progress } from './ui/progress';

export function AIEngineMonitor() {
  // Mock AI Engine data
  const aiMetrics = {
    status: 'active',
    uptime: 99.97,
    operationsLast24h: 8427,
    yieldOptimizations: 342,
    arbitrageExecuted: 89,
    avgAPYAchieved: 6.8,
    costSaved: 12450,
    autonomyLevel: 94
  };

  const recentOperations = [
    {
      type: 'Yield Optimization',
      action: 'Realocação de R$ 45K para pool de maior APY',
      result: '+0.3% APY',
      timestamp: '2 min atrás',
      icon: TrendingUp,
      color: 'green'
    },
    {
      type: 'Arbitragem',
      action: 'Execução de swap RLUSD/BRL via ODL',
      result: 'Economia R$ 234',
      timestamp: '8 min atrás',
      icon: Zap,
      color: 'blue'
    },
    {
      type: 'Liquidez',
      action: 'Detecção de baixa liquidez - rebalanceamento automático',
      result: 'Pool reabastecido',
      timestamp: '15 min atrás',
      icon: Activity,
      color: 'blue'
    },
    {
      type: 'Custo',
      action: 'Otimização de rota de settlement - XRPL direto',
      result: 'R$ 0,0001/tx',
      timestamp: '22 min atrás',
      icon: DollarSign,
      color: 'blue'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl tracking-tight mb-1 text-[#1a2a3a]">HUB AI - Yield Engine</h2>
          <p className="text-sm text-[#607D8B]">
            Agente Autônomo de Otimização de Liquidez 24/7
          </p>
        </div>
        <Badge className="bg-[#00E676]/20 text-[#00E676] border-[#00E676]/30 text-base px-4 py-2">
          <div className="w-2 h-2 bg-[#00E676] rounded-full animate-pulse mr-2"></div>
          Online
        </Badge>
      </div>

      {/* Status Overview */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-5 bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#2979FF]/20 flex items-center justify-center">
              <Brain className="w-5 h-5 text-[#2979FF]" />
            </div>
          </div>
          <div>
            <p className="text-sm text-[#607D8B] mb-1">APY Médio Alcançado</p>
            <p className="text-3xl tracking-tight text-[#1a2a3a]">{aiMetrics.avgAPYAchieved}%</p>
            <p className="text-xs text-[#2979FF] mt-1">Meta: 5-8% APY</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#2979FF]/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-[#2979FF]" />
            </div>
          </div>
          <div>
            <p className="text-sm text-[#607D8B] mb-1">Operações (24h)</p>
            <p className="text-3xl tracking-tight text-[#1a2a3a]">{aiMetrics.operationsLast24h.toLocaleString()}</p>
            <p className="text-xs text-[#2979FF] mt-1">Autônomas</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-[#00E676]/10 to-[#00E676]/5 border-[#00E676]/20 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#00E676]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#00E676]" />
            </div>
          </div>
          <div>
            <p className="text-sm text-[#607D8B] mb-1">Yield Optimizations</p>
            <p className="text-3xl tracking-tight text-[#1a2a3a]">{aiMetrics.yieldOptimizations}</p>
            <p className="text-xs text-[#00E676] mt-1">Hoje</p>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-to-br from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#2979FF]/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-[#2979FF]" />
            </div>
          </div>
          <div>
            <p className="text-sm text-[#607D8B] mb-1">Economia Gerada</p>
            <p className="text-3xl tracking-tight text-[#1a2a3a]">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0
              }).format(aiMetrics.costSaved)}
            </p>
            <p className="text-xs text-[#2979FF] mt-1">Hoje</p>
          </div>
        </Card>
      </div>

      {/* Autonomy Level */}
      <Card className="p-6 bg-white border-[#2979FF]/10 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg mb-1 text-[#1a2a3a]">Nível de Autonomia</h3>
              <p className="text-sm text-[#607D8B]">Decisões automatizadas sem intervenção humana</p>
            </div>
            <span className="text-3xl text-[#2979FF]">{aiMetrics.autonomyLevel}%</span>
          </div>
          <Progress value={aiMetrics.autonomyLevel} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-[#607D8B] mb-1">Rebalanceamento</p>
              <p className="text-[#00E676]">100% Auto</p>
            </div>
            <div>
              <p className="text-[#607D8B] mb-1">Arbitragem</p>
              <p className="text-[#00E676]">100% Auto</p>
            </div>
            <div>
              <p className="text-[#607D8B] mb-1">Risk Management</p>
              <p className="text-[#2979FF]">90% Auto</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Operations Feed */}
      <Card className="p-6 bg-white border-[#2979FF]/10 shadow-sm">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-[#2979FF]" />
            <h3 className="text-lg text-[#1a2a3a]">Operações Recentes</h3>
          </div>

          <div className="space-y-3">
            {recentOperations.map((op, index) => {
              const Icon = op.icon;
              const colorClasses = {
                green: 'bg-[#00E676]/10 border-[#00E676]/20 text-[#00E676]',
                blue: 'bg-[#2979FF]/10 border-[#2979FF]/20 text-[#2979FF]'
              };

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg bg-[#F4F7FF] border border-[#2979FF]/10 hover:bg-white transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses[op.color as keyof typeof colorClasses]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-sm text-[#1a2a3a]">{op.type}</p>
                      <span className="text-xs text-[#607D8B] whitespace-nowrap">{op.timestamp}</span>
                    </div>
                    <p className="text-sm text-[#607D8B] mb-1">{op.action}</p>
                    <Badge className={`text-xs ${colorClasses[op.color as keyof typeof colorClasses]}`}>
                      {op.result}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* AI Competitive Advantage */}
      <Card className="p-5 bg-gradient-to-r from-[#2979FF]/10 to-[#2979FF]/5 border-[#2979FF]/20 shadow-sm">
        <div className="flex items-start gap-3">
          <Brain className="w-6 h-6 text-[#2979FF] flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-[#1a2a3a] mb-2">Diferencial Competitivo: AI-Powered</h3>
            <p className="text-sm text-[#607D8B] mb-3">
              O HUB AI é o motor que garante o yield de 5-8% APY de forma escalável e algorítmica. 
              Enquanto concorrentes dependem de processos manuais, nossa IA opera 24/7 com decisões 
              em milissegundos, garantindo a melhor alocação de capital e maximização de rendimento.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <p className="text-xs text-[#607D8B] mb-1">Latência Decisória</p>
                <p className="text-sm text-[#2979FF]">{"< 50ms"}</p>
              </div>
              <div>
                <p className="text-xs text-[#607D8B] mb-1">Uptime</p>
                <p className="text-sm text-[#2979FF]">{aiMetrics.uptime}%</p>
              </div>
              <div>
                <p className="text-xs text-[#607D8B] mb-1">Learning Rate</p>
                <p className="text-sm text-[#2979FF]">Contínuo</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
