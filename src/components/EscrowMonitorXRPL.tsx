import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, CheckCircle, Clock, ExternalLink, Shield } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Escrow {
  id: string;
  amount: number;
  status: 'created' | 'pending' | 'finished';
  createdAt: string;
  finishAt?: string;
  txHash: string;
  nftTicket?: string;
}

export function EscrowMonitorXRPL() {
  const escrows: Escrow[] = [
    {
      id: 'ESC-2024-001',
      amount: 2500.00,
      status: 'finished',
      createdAt: '2024-11-07 14:23',
      finishAt: '2024-11-07 18:45',
      txHash: '0xA7F2...8B3D',
      nftTicket: 'NFT-EVT-7829'
    },
    {
      id: 'ESC-2024-002',
      amount: 4200.00,
      status: 'pending',
      createdAt: '2024-11-07 15:10',
      txHash: '0xB3C1...2F9A',
      nftTicket: 'NFT-EVT-7830'
    },
    {
      id: 'ESC-2024-003',
      amount: 1850.00,
      status: 'created',
      createdAt: '2024-11-07 16:05',
      txHash: '0xC8D4...5E1B'
    },
    {
      id: 'ESC-2024-004',
      amount: 6750.00,
      status: 'finished',
      createdAt: '2024-11-06 19:30',
      finishAt: '2024-11-07 02:15',
      txHash: '0xD1E9...7A4C',
      nftTicket: 'NFT-EVT-7825'
    },
    {
      id: 'ESC-2024-005',
      amount: 3300.00,
      status: 'pending',
      createdAt: '2024-11-07 12:15',
      txHash: '0xE5F2...9C8D',
      nftTicket: 'NFT-EVT-7828'
    },
  ];

  const getStatusBadge = (status: Escrow['status']) => {
    switch (status) {
      case 'finished':
        return (
          <Badge className="bg-[#00E676]/10 text-[#00E676] border-[#00E676]/20">
            <CheckCircle className="w-3 h-3 mr-1" />
            Finalizado
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        );
      case 'created':
        return (
          <Badge className="bg-[#2979FF]/10 text-[#2979FF] border-[#2979FF]/20">
            <Lock className="w-3 h-3 mr-1" />
            Criado
          </Badge>
        );
    }
  };

  const totalLocked = escrows
    .filter(e => e.status !== 'finished')
    .reduce((sum, e) => sum + e.amount, 0);

  const totalFinished = escrows
    .filter(e => e.status === 'finished')
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-[#F4F7FF] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pt-6">
          <div>
            <p className="text-sm text-[#607D8B]">Prova de Serviço On-Chain</p>
            <h1 className="text-4xl text-[#1a2a3a]">Escrow Monitor</h1>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-[#2979FF]/10 shadow-sm">
            <Shield className="w-4 h-4 text-[#2979FF]" />
            <span className="text-sm text-[#2979FF]">XRPL Secured</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#2979FF]" />
              </div>
              <div>
                <p className="text-sm text-[#607D8B] mb-1">Valor Bloqueado</p>
                <p className="text-3xl text-[#1a2a3a] tracking-tight">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(totalLocked)}
                </p>
                <p className="text-sm text-[#2979FF] mt-2">
                  {escrows.filter(e => e.status !== 'finished').length} escrows ativos
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#00E676]" />
              </div>
              <div>
                <p className="text-sm text-[#607D8B] mb-1">Liberado (30d)</p>
                <p className="text-3xl text-[#1a2a3a] tracking-tight">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 0
                  }).format(totalFinished)}
                </p>
                <p className="text-sm text-[#00E676] mt-2">
                  {escrows.filter(e => e.status === 'finished').length} finalizados
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#2979FF]" />
              </div>
              <div>
                <p className="text-sm text-[#607D8B] mb-1">Total Escrows</p>
                <p className="text-3xl text-[#1a2a3a] tracking-tight">{escrows.length}</p>
                <p className="text-sm text-[#2979FF] mt-2">Garantido na XRPL</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Escrow List */}
        <Card className="rounded-2xl bg-white border border-[#2979FF]/10 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-[#2979FF]/10">
            <h2 className="text-xl text-[#1a2a3a]">Histórico de Escrows</h2>
            <p className="text-sm text-[#607D8B] mt-1">
              Liquidações atômicas com prova on-chain
            </p>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="divide-y divide-[#2979FF]/10">
              {escrows.map((escrow) => (
                <div key={escrow.id} className="p-6 hover:bg-[#F4F7FF] transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-[#607D8B]">{escrow.id}</span>
                        {getStatusBadge(escrow.status)}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-[#607D8B]">
                        <div>
                          <span>Criado: </span>
                          <span className="text-[#1a2a3a]">{escrow.createdAt}</span>
                        </div>
                        {escrow.finishAt && (
                          <div>
                            <span>Finalizado: </span>
                            <span className="text-[#1a2a3a]">{escrow.finishAt}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1 text-[#2979FF]">
                          <span className="text-[#607D8B]">TX:</span>
                          <span className="font-mono">{escrow.txHash}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                        {escrow.nftTicket && (
                          <div className="flex items-center gap-1 text-[#2979FF]">
                            <span className="text-[#607D8B]">NFT:</span>
                            <span className="font-mono">{escrow.nftTicket}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl text-[#1a2a3a]">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 0
                        }).format(escrow.amount)}
                      </p>
                      <p className="text-sm text-[#607D8B]">
                        ${(escrow.amount / 5.2).toFixed(2)} RLUSD
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Info Card */}
        <Card className="p-5 rounded-2xl bg-[#2979FF]/5 border border-[#2979FF]/10">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#2979FF] flex-shrink-0 mt-0.5" />
            <div className="text-sm text-[#607D8B]">
              <p className="text-[#1a2a3a] mb-1">Escrow Condicional com NFToken</p>
              <p>
                Os valores ficam bloqueados no Escrow XRPL até a apresentação do NFTicket (prova de serviço). 
                Após validação, o EscrowFinish libera automaticamente o pagamento.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
