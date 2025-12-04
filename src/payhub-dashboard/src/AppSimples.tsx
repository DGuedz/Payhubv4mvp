import React, { useState } from 'react';
import { Settings, Menu, X } from 'lucide-react';
import { SimpleDashboard } from './components/SimpleDashboard';
import { ReceberPagamento } from './components/ReceberPagamento';
import { Antecipar } from './components/Antecipar';
import { ExtratoSimples } from './components/ExtratoSimples';
import { ToastContainer, ToastType } from './components/Toast';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

export default function AppSimples() {
  const [receberAberto, setReceberAberto] = useState(false);
  const [anteciparAberto, setAnteciparAberto] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [telaAtiva, setTelaAtiva] = useState<'inicio' | 'extrato' | 'config'>('inicio');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handlePagamentoRecebido = () => {
    addToast('success', '✅ Pagamento recebido! O dinheiro já tá na sua conta.');
  };

  const handleAntecipacaoSucesso = () => {
    addToast('success', '⚡ Antecipação confirmada! Saldo atualizado.');
  };

  const trocarTela = (tela: 'inicio' | 'extrato' | 'config') => {
    setTelaAtiva(tela);
    setMenuAberto(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1218]">
      {/* Header Simples */}
      <header className="sticky top-0 z-40 bg-[#1A1F2B]/95 backdrop-blur-lg border-b border-gray-800">
        <div className="px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] flex items-center justify-center">
              <span className="text-white font-bold text-sm">PAY</span>
            </div>
            <div>
              <div className="text-white">PAYHUB</div>
              <div className="text-[10px] text-gray-400">Sua tesouraria</div>
            </div>
          </div>

          {/* Menu Mobile */}
          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="text-gray-400 hover:text-white"
          >
            {menuAberto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Menu Dropdown */}
        {menuAberto && (
          <div className="border-t border-gray-800 bg-[#1A1F2B]">
            <button
              onClick={() => trocarTela('inicio')}
              className={`w-full text-left px-4 py-3 transition-colors ${
                telaAtiva === 'inicio'
                  ? 'bg-[#2979FF]/10 text-[#2979FF]'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              🏠 Início
            </button>
            <button
              onClick={() => trocarTela('extrato')}
              className={`w-full text-left px-4 py-3 transition-colors ${
                telaAtiva === 'extrato'
                  ? 'bg-[#2979FF]/10 text-[#2979FF]'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              📊 Extrato
            </button>
            <button
              onClick={() => trocarTela('config')}
              className={`w-full text-left px-4 py-3 transition-colors ${
                telaAtiva === 'config'
                  ? 'bg-[#2979FF]/10 text-[#2979FF]'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              ⚙️ Configurações
            </button>
          </div>
        )}
      </header>

      {/* Conteúdo */}
      <main className="p-4 pb-20 max-w-2xl mx-auto">
        {telaAtiva === 'inicio' && (
          <SimpleDashboard
            onReceberClick={() => setReceberAberto(true)}
            onAnteciparClick={() => setAnteciparAberto(true)}
          />
        )}

        {telaAtiva === 'extrato' && (
          <div>
            <div className="mb-6">
              <h1 className="text-white text-2xl mb-2">Extrato</h1>
              <p className="text-gray-400 text-sm">Todas as suas movimentações</p>
            </div>
            <ExtratoSimples />
          </div>
        )}

        {telaAtiva === 'config' && (
          <div>
            <div className="mb-6">
              <h1 className="text-white text-2xl mb-2">Configurações</h1>
              <p className="text-gray-400 text-sm">Gerencie sua conta</p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5">
                <h3 className="text-white mb-4">Meus Dados</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Nome</p>
                    <p className="text-white">João da Silva</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">CPF/CNPJ</p>
                    <p className="text-white">123.456.789-00</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Telefone</p>
                    <p className="text-white">(62) 99999-9999</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5">
                <h3 className="text-white mb-4">Rendimento Automático</h3>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white mb-1">Ativar rendimento</p>
                    <p className="text-sm text-gray-400">Seu saldo rende 5-8% ao ano</p>
                  </div>
                  <div className="relative w-12 h-6 rounded-full bg-[#2979FF] cursor-pointer">
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white"></div>
                  </div>
                </div>
                <div className="p-3 bg-[#00E676]/10 rounded-lg">
                  <p className="text-xs text-[#00E676]">
                    ✓ Ativo · Você tá ganhando automaticamente
                  </p>
                </div>
              </div>

              <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-5">
                <h3 className="text-white mb-4">Notificações</h3>
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Pagamentos recebidos</span>
                    <div className="relative w-12 h-6 rounded-full bg-[#2979FF]">
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </label>
                  <label className="flex items-center justify-between">
                    <span className="text-gray-300">Rendimento diário</span>
                    <div className="relative w-12 h-6 rounded-full bg-[#2979FF]">
                      <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white"></div>
                    </div>
                  </label>
                </div>
              </div>

              <button className="w-full py-3 rounded-xl bg-transparent border-2 border-gray-700 hover:border-gray-600 text-white transition-all">
                Sair da Conta
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer Fixo */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#1A1F2B]/95 backdrop-blur-lg border-t border-gray-800 p-4 z-30">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-gray-500">
          <span>PAYHUB</span>
          <span>•</span>
          <span>Receba, antecipe e renda</span>
        </div>
      </footer>

      {/* Modals */}
      {receberAberto && (
        <ReceberPagamento
          onClose={() => setReceberAberto(false)}
          onSuccess={handlePagamentoRecebido}
        />
      )}

      {anteciparAberto && (
        <Antecipar
          onClose={() => setAnteciparAberto(false)}
          onSuccess={handleAntecipacaoSucesso}
        />
      )}

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
