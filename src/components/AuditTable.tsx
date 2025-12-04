import React, { useState, useEffect } from 'react';
import { Download, FileText, CheckCircle, Clock, XCircle, Search } from 'lucide-react';
import { createSDK } from '../sdk/payhub';

interface AuditRow {
  operation: string;
  txHash: string;
  sequence: number;
  owner: string;
  offerSequence?: number;
  destination?: string;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
}

interface AuditTableProps {
  onExportCSV: () => void;
}

export function AuditTable({ onExportCSV }: AuditTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Initialize SDK (in production, get token from auth context)
  const sdk = createSDK({
    baseUrl: typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL || 'http://localhost:3000',
    token: 'demo-token', // Replace with actual JWT from auth
  });

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      // Chamada real: GET /api/v1/compliance/report via SDK
      const csvContent = await sdk.compliance.exportCSV();
      
      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `payhub-compliance-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      // Also call parent callback
      onExportCSV();
    } catch (err) {
      console.error('Export failed:', err);
      alert(err instanceof Error ? err.message : 'Erro ao exportar CSV');
    } finally {
      setIsExporting(false);
    }
  };

  // Mock data - em produção viria de GET /api/v1/compliance/report
  const auditData: AuditRow[] = [
    {
      operation: 'EscrowFinish',
      txHash: 'Z9Y8X7W6V5U4T3S2R1Q0P9O8N7M6L5K4',
      sequence: 12345679,
      owner: 'rN7n7otQDd6FczFgLdll...',
      offerSequence: 987654,
      status: 'success',
      timestamp: '2025-11-27 14:32:18',
    },
    {
      operation: 'EscrowCreate',
      txHash: 'F6E5D4C3B2A1M9N8O7P6Q5R4S3T2U1V0',
      sequence: 12345678,
      owner: 'rN7n7otQDd6FczFgLdll...',
      offerSequence: 987654,
      status: 'success',
      timestamp: '2025-11-27 14:30:45',
    },
    {
      operation: 'Trustline',
      txHash: 'A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6',
      sequence: 12345677,
      owner: 'rN7n7otQDd6FczFgLdll...',
      status: 'success',
      timestamp: '2025-11-27 14:28:12',
    },
    {
      operation: 'Payment',
      txHash: 'P5O4N3M2L1K0J9I8H7G6F5E4D3C2B1A0',
      sequence: 12345676,
      owner: 'rN7n7otQDd6FczFgLdll...',
      destination: 'rDEST1NAT1ON...',
      status: 'pending',
      timestamp: '2025-11-27 14:25:33',
    },
  ];

  const filteredData = auditData.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-[#00E676]" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-[#F59E0B]" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-[#EF4444]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      success: 'bg-[#00E676]/10 text-[#00E676]',
      pending: 'bg-[#F59E0B]/10 text-[#F59E0B]',
      failed: 'bg-[#EF4444]/10 text-[#EF4444]',
    };
    return config[status as keyof typeof config] || '';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#2979FF]/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#2979FF]" />
          </div>
          <div>
            <h3 className="text-white">Histórico de Transações</h3>
            <p className="text-sm text-gray-400">
              {filteredData.length} registro{filteredData.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <button
          onClick={handleExportCSV}
          disabled={isExporting}
          className="px-6 py-3 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] disabled:bg-gray-700 text-white transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {isExporting ? (
            <>
              <Download className="w-5 h-5 animate-pulse" />
              <span>Exportando...</span>
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              <span>Exportar CSV (Compliance)</span>
            </>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por txHash, sequence, operação..."
          className="w-full pl-12 pr-4 py-3 rounded-lg bg-[#1A1F2B] border border-gray-700 text-white focus:border-[#2979FF] focus:outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0F1218] border-b border-gray-800">
              <tr>
                <th className="px-6 py-4 text-left text-xs text-gray-400 uppercase tracking-wider">
                  Operação
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-400 uppercase tracking-wider">
                  txHash
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-400 uppercase tracking-wider">
                  Sequence
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-400 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nenhum registro encontrado
                  </td>
                </tr>
              ) : (
                filteredData.map((row, index) => (
                  <tr key={index} className="hover:bg-[#0F1218] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-white">{row.operation}</span>
                      {row.offerSequence && (
                        <div className="text-xs text-gray-500 mt-1">
                          Seq: {row.offerSequence}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-gray-400 font-mono">
                        {row.txHash.substring(0, 16)}...
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-300">{row.sequence}</span>
                    </td>
                    <td className="px-6 py-4">
                      <code className="text-xs text-gray-400 font-mono">
                        {row.owner.substring(0, 16)}...
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${getStatusBadge(row.status)}`}>
                        {getStatusIcon(row.status)}
                        <span className="text-xs capitalize">{row.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {row.timestamp}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Footer */}
      <div className="p-4 rounded-lg bg-[#2979FF]/5 border border-[#2979FF]/20">
        <p className="text-xs text-gray-400">
          <strong className="text-white">Conformidade LGPD:</strong> Registramos apenas txHash e sequence
          (sem PII - Informações Pessoalmente Identificáveis). Todos os dados são exportáveis em formato CSV
          para relatórios fiscais conforme IN RFB nº 2.291/2025 (CARF/OCDE).
        </p>
      </div>
    </div>
  );
}
