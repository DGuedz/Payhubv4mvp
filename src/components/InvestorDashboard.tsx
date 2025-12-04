import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RevenueMetrics } from './RevenueMetrics';
import { ComplianceStack } from './ComplianceStack';
import { AIEngineMonitor } from './AIEngineMonitor';
import { Card } from './ui/card';
import { TrendingUp, Shield, Brain, Target } from 'lucide-react';

export function InvestorDashboard() {
  return (
    <div className="min-h-screen bg-[#F4F7FF] p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-3 pt-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2979FF] to-[#5B9DFF] flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl tracking-tight text-[#1a2a3a]">Investor Dashboard</h1>
              <p className="text-sm text-[#607D8B]">Métricas de Escala, Compliance e Tecnologia Proprietária</p>
            </div>
          </div>
        </div>

        {/* Value Proposition Banner */}
        <Card className="p-6 bg-gradient-to-r from-[#2979FF]/10 via-[#5B9DFF]/10 to-[#2979FF]/10 border-[#2979FF]/20 shadow-sm">
          <div className="space-y-3">
            <h2 className="text-2xl tracking-tight text-[#1a2a3a]">PAYHUB: Infraestrutura ODL para LATAM</h2>
            <p className="text-[#607D8B] max-w-4xl">
              Eliminamos o D+60 com liquidação em RLUSD (3-5s) e transformamos capital parado em Tesouraria Ativa (5-8% APY). 
              Modelo de receita escalável via Performance Fee (10-20%), stack de compliance audit-ready, e HUB AI proprietário para otimização autônoma de liquidez.
            </p>
            <div className="grid md:grid-cols-4 gap-4 pt-4">
              <div className="p-3 rounded-xl bg-white border border-[#2979FF]/10">
                <p className="text-sm text-[#607D8B] mb-1">Target Market</p>
                <p className="text-lg text-[#1a2a3a]">R$ 141Bi/ano</p>
                <p className="text-xs text-[#607D8B]">Comércio LATAM</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#2979FF]/10">
                <p className="text-sm text-[#607D8B] mb-1">Timing</p>
                <p className="text-lg text-[#1a2a3a]">Optimal</p>
                <p className="text-xs text-[#607D8B]">Fintech IPO reacendendo</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#2979FF]/10">
                <p className="text-sm text-[#607D8B] mb-1">Technology</p>
                <p className="text-lg text-[#1a2a3a]">Proprietária</p>
                <p className="text-xs text-[#607D8B]">AI + Escrow Atômico</p>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#2979FF]/10">
                <p className="text-sm text-[#607D8B] mb-1">Transformation</p>
                <p className="text-lg text-[#1a2a3a]">Disruptiva</p>
                <p className="text-xs text-[#607D8B]">D+60 → D+0 + Yield</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabbed Content */}
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-3 bg-white border border-[#2979FF]/10 shadow-sm">
            <TabsTrigger value="revenue" className="data-[state=active]:bg-[#2979FF] data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-2" />
              Receita & Escala
            </TabsTrigger>
            <TabsTrigger value="compliance" className="data-[state=active]:bg-[#2979FF] data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Compliance
            </TabsTrigger>
            <TabsTrigger value="ai" className="data-[state=active]:bg-[#2979FF] data-[state=active]:text-white">
              <Brain className="w-4 h-4 mr-2" />
              HUB AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="mt-6">
            <RevenueMetrics />
          </TabsContent>

          <TabsContent value="compliance" className="mt-6">
            <ComplianceStack />
          </TabsContent>

          <TabsContent value="ai" className="mt-6">
            <AIEngineMonitor />
          </TabsContent>
        </Tabs>

        {/* 6Ts Framework Summary */}
        <Card className="p-6 bg-white border-[#2979FF]/10 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xl text-[#1a2a3a]">Alinhamento com Framework 6Ts (IPO Ventures)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-[#00E676]/5 border border-[#00E676]/20">
                <h4 className="mb-2 flex items-center gap-2 text-[#1a2a3a]">
                  <div className="w-2 h-2 bg-[#00E676] rounded-full"></div>
                  Timing + Thesis
                </h4>
                <p className="text-sm text-[#607D8B]">
                  Blockchain lending em momento de reaquecimento do mercado de Fintech IPO. Eliminação do D+60 é pain point validado.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#2979FF]/5 border border-[#2979FF]/20">
                <h4 className="mb-2 flex items-center gap-2 text-[#1a2a3a]">
                  <div className="w-2 h-2 bg-[#2979FF] rounded-full"></div>
                  Technology
                </h4>
                <p className="text-sm text-[#607D8B]">
                  Stack proprietário: Escrow Atômico (XRPL) + HUB AI + Defesa Ativa. Diferencial técnico defensável.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#2979FF]/5 border border-[#2979FF]/20">
                <h4 className="mb-2 flex items-center gap-2 text-[#1a2a3a]">
                  <div className="w-2 h-2 bg-[#2979FF] rounded-full"></div>
                  Transformation
                </h4>
                <p className="text-sm text-[#607D8B]">
                  Transformação do fluxo de caixa de PMEs: capital travado → tesouraria ativa com 5-8% APY.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
