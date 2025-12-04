import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
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
import { PaymentsPage } from './components/PaymentsPage';
import { ProfilePage } from './components/ProfilePage';
import { ToastContainer, ToastType } from './components/Toast';

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
  };

  // Mock data for dashboard
  const recentEscrows = [
    { id: '1', value: '250.00', status: 'completed' as const, timestamp: '27/11 14:32' },
    { id: '2', value: '500.00', status: 'pending' as const, timestamp: '27/11 13:15' },
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

      <main className="relative md:ml-64 pb-20 md:pb-0">
        {/* Home/Dashboard Section */}
        {activeSection === 'home' && (
          <section id="home" className="relative">
            <Hero onExportCSV={handleExportCSV} />
            
            <div className="container mx-auto px-6 py-8 max-w-7xl">
              <DashboardHome
                balance="2,450.00"
                yieldStatus="active"
                yieldApy="6.2"
                recentEscrows={recentEscrows}
                securityAlerts={0}
                onPayClick={() => setPaymentPixOpen(true)}
                onReceiveClick={() => setReceivePaymentOpen(true)}
                onEscrowClick={() => setActiveSection('escrow')}
                onYieldClick={() => setActiveSection('yield')}
              />
            </div>
          </section>
        )}

        {/* Payments Section */}
        {activeSection === 'pagar' && (
          <section id="pagar" className="container mx-auto px-6 py-16 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-white mb-4">Pagamentos</h2>
              <p className="text-gray-400">
                Gerencie seus métodos de pagamento e visualize transações recentes
              </p>
            </div>
            <PaymentsPage onOpenPixPayment={() => setPaymentPixOpen(true)} />
          </section>
        )}

        {/* Security & KMS Section */}
        {activeSection === 'security' && (
          <section id="security" className="container mx-auto px-6 py-16 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-white mb-4">Segurança e Gestão de Chaves</h2>
              <p className="text-gray-400">
                Arquitetura de segurança enterprise com isolamento de chaves e auditoria completa
              </p>
            </div>
            <SecurityCard />
          </section>
        )}

        {/* Escrow RLUSD Wizard */}
        {activeSection === 'escrow' && (
          <section id="escrow" className="bg-[#1A1F2B] py-16">
            <div className="container mx-auto px-6 max-w-7xl">
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
          <section id="yield" className="container mx-auto px-6 py-16 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-white mb-4">Yield e Roteamento AMM</h2>
              <p className="text-gray-400">
                Otimização de liquidez com rendimento automático e roteamento inteligente
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <YieldCard />
              <AMMCard />
            </div>
          </section>
        )}

        {/* Audit Section */}
        {activeSection === 'audit' && (
          <section id="audit" className="bg-[#1A1F2B] py-16">
            <div className="container mx-auto px-6 max-w-7xl">
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

        {/* Profile Section */}
        {activeSection === 'profile' && (
          <section id="profile" className="container mx-auto px-6 py-16 max-w-7xl">
            <div className="mb-12">
              <h2 className="text-white mb-4">Perfil e Configurações</h2>
              <p className="text-gray-400">
                Gerencie suas informações pessoais, segurança e preferências
              </p>
            </div>
            <ProfilePage />
          </section>
        )}

        {/* Compliance Banner - Visible on all pages */}
        {activeSection === 'home' && (
          <section className="container mx-auto px-6 py-8 max-w-7xl">
            <ComplianceBanner severity="info" />
          </section>
        )}
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
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
