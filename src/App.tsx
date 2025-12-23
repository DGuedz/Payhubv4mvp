import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ValuePillars } from './components/ValuePillars';
import { ComplianceBanner } from './components/ComplianceBanner';
import { CookieBar } from './components/CookieBar';
import { CookieModal } from './components/CookieModal';
import { SecurityCard } from './components/SecurityCard';
import { EscrowWizard } from './components/EscrowWizard';
import { YieldCard } from './components/YieldCard';
import { AMMCard } from './components/AMMCard';
import { AuditTable } from './components/AuditTable';
import { Footer } from './components/Footer';
import { DashboardNav } from './components/DashboardNav';
import { DashboardHome } from './components/DashboardHome';
import { PaymentPix } from './components/PaymentPix';
import { ReceivePayment } from './components/ReceivePayment';
import { SoftPOSDownload } from './components/SoftPOSDownload';
import { TestEnvironment } from './components/TestEnvironment';
import { TestnetShowcase } from './components/TestnetShowcase';
import { TestesPage } from './components/TestesPage';
import { ToastContainer, ToastType } from './components/Toast';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { track } from '@vercel/analytics';

interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

export default function App() {
  const [cookieBarVisible, setCookieBarVisible] = useState(true);
  const [cookieModalOpen, setCookieModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [paymentPixOpen, setPaymentPixOpen] = useState(false);
  const [receivePaymentOpen, setReceivePaymentOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  // Scroll to top on mount and section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  // Listen for custom navigation events
  useEffect(() => {
    const handleNavigateToTestes = () => {
      setActiveSection('test');
    };

    window.addEventListener('navigateToTestes', handleNavigateToTestes);
    
    return () => {
      window.removeEventListener('navigateToTestes', handleNavigateToTestes);
    };
  }, []);

  const handleAcceptAllCookies = () => {
    setCookieBarVisible(false);
  };

  const handleRejectCookies = () => {
    setCookieBarVisible(false);
  };

  const handleManageCookies = () => {
    setCookieModalOpen(true);
  };

  const handleExportCSV = async () => {
    // Integração: GET /api/v1/compliance/report
    console.log('Exporting compliance CSV...');
    addToast('success', 'Relatório CSV exportado com sucesso!');
    track('csv_exported', { scope: 'compliance' });
  };

  const addToast = (type: ToastType, message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handlePaymentSuccess = () => {
    setPaymentPixOpen(false);
    addToast('success', 'Pagamento realizado com sucesso!');
    track('payment_completed', { method: 'PIX' });
  };

  const handlePaymentReceived = (amount: string, method: 'pix' | 'xrpl') => {
    setReceivePaymentOpen(false);
    const methodName = method === 'pix' ? 'PIX' : 'XRPL';
    addToast('success', `${amount} recebido via ${methodName} • Liquidação D+0 processada`);
    track('payment_received', { currency: method === 'pix' ? 'BRL' : 'RLUSD', amount, method: methodName });
  };

  const handleConnectWallet = () => {
    // Simulação de conexão - Em breve: Ledger Hardware Wallet
    addToast('info', 'Conectando wallet...');
    
    setTimeout(() => {
      // Gerar endereço simulado XRPL Testnet
      const mockAddress = 'rN7n7otQDd6FczFgLdSqtcsAUxDkw6fzRH';
      setWalletAddress(mockAddress);
      setWalletConnected(true);
      addToast('success', 'Wallet conectada com sucesso!');
      track('wallet_connected', { network: 'XRPL Testnet' });
    }, 1500);
  };

  // Mock data for dashboard
  const recentEscrows = [
    { 
      id: '1', 
      value: '250.00', 
      status: 'completed' as const, 
      timestamp: '29/11 14:32',
      txHash: '38D3ED5B09CF4C1F03651615F95E42F790ADCBCE9DD6918F272FDF1A4C0B93F5' // EscrowFinish Real Testnet
    },
    { 
      id: '2', 
      value: '500.00', 
      status: 'completed' as const, 
      timestamp: '29/11 13:15',
      txHash: '7876B63EE59FCE568CAF52C60736B717FAE4636622E85670D87FDB455A314DC6' // EscrowCreate Real Testnet
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F1218]">
      <Header 
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <DashboardNav 
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />

      <main className="relative pb-20 md:pb-0">
        {/* Home/Dashboard Section */}
        {activeSection === 'home' && (
          <section id="home" className="relative">
            <Hero 
              onExportCSV={handleExportCSV}
              onActivateODL={() => setActiveSection('softpos')}
            />
            
            {/* Pilares de Valor - Nova Copy Comercial */}
            <ValuePillars
              onNavigateSoftPOS={() => setActiveSection('softpos')}
              onNavigateYield={() => setActiveSection('yield')}
              onNavigateSecurity={() => {
                setActiveSection('home');
                setTimeout(() => {
                  document.getElementById('security')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
            
            <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
              <DashboardHome
                balance="2,450.00"
                yieldStatus="active"
                yieldApy="6.2"
                recentEscrows={recentEscrows}
                securityAlerts={0}
                walletConnected={walletConnected}
                walletAddress={walletAddress}
                onPayClick={() => setPaymentPixOpen(true)}
                onReceiveClick={() => setReceivePaymentOpen(true)}
                onEscrowClick={() => setActiveSection('escrow')}
                onYieldClick={() => setActiveSection('yield')}
                onConnectWallet={handleConnectWallet}
              />
            </div>
          </section>
        )}

        {/* Compliance Banner */}
        <section className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-7xl">
          <ComplianceBanner severity="info" />
        </section>

        {/* Escrow RLUSD Wizard */}
        {activeSection === 'escrow' && (
          <section id="escrow" className="bg-[#1A1F2B] py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-white mb-4">Escrow RLUSD - Liquidação D+0</h2>
              <p className="text-gray-400">
                Processo de criação e finalização de Escrow com colateral RLUSD
              </p>
            </div>
            <EscrowWizard />
          </div>
        </section>
        )}

        {/* Yield & AMM Section */}
        {activeSection === 'yield' && (
          <section id="yield" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl">
          <div className="mb-8 sm:mb-12">
            <h2 className="text-white mb-4">Yield e Roteamento AMM</h2>
            <p className="text-gray-400">
              Otimização de liquidez com rendimento automático e roteamento inteligente
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <YieldCard />
            <AMMCard />
          </div>
        </section>
        )}

        {/* Audit Section */}
        {activeSection === 'audit' && (
          <section id="audit" className="bg-[#1A1F2B] py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-white mb-4">Auditoria e Compliance</h2>
              <p className="text-gray-400">
                Histórico completo de transações com exportação para relatórios fiscais
              </p>
            </div>
            <AuditTable onExportCSV={handleExportCSV} />
          </div>
        </section>
        )}

        {/* Soft-POS Download Section */}
        {activeSection === 'softpos' && (
          <section id="softpos" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl">
            <SoftPOSDownload />
          </section>
        )}

        {/* Test Environment Section */}
        {activeSection === 'test' && (
          <section id="test" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl">
            <TestesPage />
          </section>
        )}

        {/* Testnet Showcase Section */}
        {activeSection === 'showcase' && (
          <TestnetShowcase />
        )}

        {/* Security & KMS Section */}
        <section id="security" className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 max-w-7xl">
          <div className="mb-8">
            <h2 className="text-white mb-2">Segurança</h2>
            <p className="text-sm text-gray-400">
              Isolamento de chaves e auditoria completa
            </p>
          </div>
          <SecurityCard />
        </section>
      </main>

      <Footer />

      {/* Cookie Bar & Modal */}
      {cookieBarVisible && (
        <CookieBar
          onAcceptAll={handleAcceptAllCookies}
          onRejectAll={handleRejectCookies}
          onManage={handleManageCookies}
        />
      )}

      {cookieModalOpen && (
        <CookieModal
          isOpen={cookieModalOpen}
          onClose={() => setCookieModalOpen(false)}
        />
      )}

      {/* Payment PIX Modal */}
      {paymentPixOpen && (
        <PaymentPix
          onClose={() => setPaymentPixOpen(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Receive Payment Modal */}
      {receivePaymentOpen && (
        <ReceivePayment
          onClose={() => setReceivePaymentOpen(false)}
          onPaymentReceived={handlePaymentReceived}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
