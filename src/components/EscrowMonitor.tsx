import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Lock, CheckCircle, Clock, ExternalLink } from 'lucide-react';
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

export function EscrowMonitor() {
  // Mock escrow data
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
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Finalizado
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        );
      case 'created':
        return (
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
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
    <div className="min-h-screen bg-[#0a0a0f] p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="space-y-2 pt-6">
          <p className="text-sm text-gray-400">Prova de Serviço On-Chain</p>
          <h1 className="text-4xl tracking-tight">Escrow Monitor</h1>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Valor Bloqueado</p>
                <p className="text-3xl tracking-tight">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalLocked)}
                </p>
                <p className="text-sm text-blue-300 mt-1">
                  {escrows.filter(e => e.status !== 'finished').length} escrows ativos
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Liberado (30d)</p>
                <p className="text-3xl tracking-tight">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(totalFinished)}
                </p>
                <p className="text-sm text-green-300 mt-1">
                  {escrows.filter(e => e.status === 'finished').length} escrows finalizados
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-2">Total Escrows</p>
                <p className="text-3xl tracking-tight">{escrows.length}</p>
                <p className="text-sm text-purple-300 mt-1">
                  Garantido na XRPL
                </p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
              </div>
            </div>
          </Card>
        </div>

        {/* Escrow List */}
        <Card className="bg-white/5 border-white/10">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl">Histórico de Escrows</h2>
            <p className="text-sm text-gray-400 mt-1">
              Liquidações atômicas com prova on-chain
            </p>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="divide-y divide-white/10">
              {escrows.map((escrow) => (
                <div key={escrow.id} className="p-6 hover:bg-white/5 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-gray-400">{escrow.id}</span>
                        {getStatusBadge(escrow.status)}
                      </div>
                      
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Valor: </span>
                          <span>
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(escrow.amount)}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Criado: </span>
                          <span>{escrow.createdAt}</span>
                        </div>
                        {escrow.finishAt && (
                          <div>
                            <span className="text-gray-400">Finalizado: </span>
                            <span>{escrow.finishAt}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3 text-xs">
                        <div className="flex items-center gap-1 text-purple-300">
                          <span className="text-gray-400">TX:</span>
                          <span className="font-mono">{escrow.txHash}</span>
                          <ExternalLink className="w-3 h-3" />
                        </div>
                        {escrow.nftTicket && (
                          <div className="flex items-center gap-1 text-blue-300">
                            <span className="text-gray-400">NFT:</span>
                            <span className="font-mono">{escrow.nftTicket}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl">
                        {new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL'
                        }).format(escrow.amount)}
                      </p>
                      <p className="text-sm text-gray-400">
                        ${(escrow.amount / 5.2).toFixed(2)} RLUSD
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Info Footer */}
        <Card className="p-4 bg-purple-500/10 border-purple-500/20">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-purple-200">
              <p className="mb-1">Escrow Condicional com NFToken</p>
              <p className="text-xs text-purple-300/80">
                Os valores ficam bloqueados no Escrow XRPL até a apresentação do NFTicket (prova de serviço). Após validação, o EscrowFinish libera automaticamente o pagamento para o comerciante.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
