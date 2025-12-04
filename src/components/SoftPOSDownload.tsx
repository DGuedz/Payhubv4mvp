import React, { useState } from 'react';
import { Smartphone, Download, QrCode, Shield, TrendingUp, Users, CheckCircle, Apple, ExternalLink, Copy, Check } from 'lucide-react';

export function SoftPOSDownload() {
  const [qrVisible, setQrVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const appStoreUrl = 'https://apps.apple.com/br/app/payhub-soft-pos';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.payhub.softpos';
  const testflightUrl = 'https://testflight.apple.com/join/payhub-beta';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(playStoreUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#2979FF] to-[#1E5FE0] rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="px-3 py-1 rounded-full bg-[#00E676] text-white text-xs">
                NOVO
              </span>
            </div>
            <h1 className="text-white text-3xl md:text-4xl mb-4">
              Transforme Seu Celular em Maquininha
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Elimine o aluguel de equipamentos. Use o DApp Mobile PAYHUB como Soft-POS e tenha liquidação D+0 com rendimento de 5-8% APY.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 transition-all"
              >
                <Apple className="w-6 h-6" />
                <div className="text-left">
                  <p className="text-xs">Baixar na</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </a>
              <a
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 transition-all"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <div className="text-left">
                  <p className="text-xs">Disponível no</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </a>
            </div>

            <button
              onClick={() => setQrVisible(!qrVisible)}
              className="mt-4 flex items-center gap-2 text-white/90 hover:text-white text-sm transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Mostrar QR Code para download</span>
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-64 h-[480px] bg-[#0F1218] rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl" />
                
                {/* Screen Content */}
                <div className="p-6 pt-10">
                  <div className="text-center mb-8">
                    <p className="text-gray-400 text-sm mb-2">Valor da Venda</p>
                    <p className="text-white text-4xl">R$ 50,00</p>
                  </div>

                  {/* QR Code Mock */}
                  <div className="bg-white rounded-2xl p-6 mb-6">
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-gray-400" />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="bg-[#00E676]/10 border border-[#00E676]/30 rounded-xl p-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#00E676] flex-shrink-0" />
                    <p className="text-[#00E676] text-xs">Aguardando pagamento...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Overlay */}
        {qrVisible && (
          <div className="mt-8 p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col items-center">
                <p className="text-white mb-3">iOS (App Store)</p>
                <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-800" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-white mb-3">Android (Google Play)</p>
                <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-gray-800" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#00E676]/10 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-[#00E676]" />
          </div>
          <h3 className="text-white mb-2">Rendimento Automático</h3>
          <p className="text-gray-400 text-sm mb-4">
            Seu saldo em RLUSD rende 5-8% APY automaticamente. Dinheiro trabalhando 24/7.
          </p>
          <div className="flex items-center gap-2 text-[#00E676] text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Ativação em 1 clique</span>
          </div>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#2979FF]/10 flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-[#2979FF]" />
          </div>
          <h3 className="text-white mb-2">Segurança Enterprise</h3>
          <p className="text-gray-400 text-sm mb-4">
            Chaves criptográficas isoladas via KMS. Padrão SOC 2 Tipo II + ISO 27001.
          </p>
          <div className="flex items-center gap-2 text-[#2979FF] text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Auditoria contínua</span>
          </div>
        </div>

        <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
          <div className="w-12 h-12 rounded-xl bg-[#F59E0B]/10 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <h3 className="text-white mb-2">Controle Segregado</h3>
          <p className="text-gray-400 text-sm mb-4">
            Funcionários operam vendas. Dono gerencia tesouraria e relatórios.
          </p>
          <div className="flex items-center gap-2 text-[#F59E0B] text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Perfis de acesso</span>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-8">
        <h2 className="text-white text-2xl mb-6">Como Funciona</h2>
        
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2979FF] flex items-center justify-center text-white">
              1
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Baixe e Instale o DApp</h3>
              <p className="text-gray-400 text-sm">
                Acesse App Store ou Google Play e instale o PAYHUB Soft-POS no celular dos seus funcionários.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2979FF] flex items-center justify-center text-white">
              2
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Configure Perfis de Acesso</h3>
              <p className="text-gray-400 text-sm">
                No Dashboard, crie perfis para funcionários (apenas vendas) e para você (tesouraria completa).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2979FF] flex items-center justify-center text-white">
              3
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Comece a Vender</h3>
              <p className="text-gray-400 text-sm">
                Funcionário digita o valor → Gera QR Code Híbrido → Cliente paga (PIX/Cartão/Cripto) → Liquidação D+0 em 3-5s.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#00E676] flex items-center justify-center text-white">
              4
            </div>
            <div className="flex-1">
              <h3 className="text-white mb-2">Ative o Rendimento</h3>
              <p className="text-gray-400 text-sm">
                No seu Dashboard de Tesouraria, ative o Auto-Yield e veja seu saldo render 5-8% APY automaticamente.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Access Segregation Table */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-8">
        <h2 className="text-white text-2xl mb-6">Segregação de Acessos</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-3 px-4 text-gray-400 text-sm">Funcionalidade</th>
                <th className="text-center py-3 px-4 text-gray-400 text-sm">Funcionário (Vendas)</th>
                <th className="text-center py-3 px-4 text-gray-400 text-sm">Dono (Tesouraria)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-white">Iniciar venda e gerar QR Code</td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-white">Ver vendas do turno</td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-white">Ativar/Desativar Rendimento (Yield)</td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-600">—</span>
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-white">Ver saldo total e APY acumulado</td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-600">—</span>
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-white">Exportar relatórios fiscais (CSV)</td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-600">—</span>
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-3 px-4 text-white">Acesso a chaves criptográficas (KMS)</td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-600">—</span>
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-white">Configurar Financiamento Colateralizado</td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-600">—</span>
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle className="w-5 h-5 text-[#00E676] mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ / Support */}
      <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-8">
        <h2 className="text-white text-2xl mb-6">Perguntas Frequentes</h2>
        
        <div className="space-y-4">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-white py-3 border-b border-gray-800">
              <span>Preciso ter conexão com internet o tempo todo?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-400 text-sm pt-3 pb-2">
              Sim, o DApp precisa de conexão para comunicar com a blockchain XRPL e processar pagamentos em tempo real. Recomendamos 4G ou WiFi estável.
            </p>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-white py-3 border-b border-gray-800">
              <span>Quantos celulares posso usar na minha loja?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-400 text-sm pt-3 pb-2">
              Ilimitado! Você pode instalar o DApp em quantos dispositivos precisar. Cada funcionário pode ter seu próprio celular com login segregado.
            </p>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-white py-3 border-b border-gray-800">
              <span>Como funciona a liquidação D+0?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-400 text-sm pt-3 pb-2">
              Assim que o cliente paga e você marca como "Entregue", o PAYHUB executa um Escrow na XRPL. O valor em RLUSD é liberado para sua carteira em 3-5 segundos, eliminando espera.
            </p>
          </details>

          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer text-white py-3 border-b border-gray-800">
              <span>O que acontece se o celular quebrar ou for roubado?</span>
              <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <p className="text-gray-400 text-sm pt-3 pb-2">
              Seu dinheiro está seguro! As chaves criptográficas ficam no backend (KMS), não no celular. Basta instalar o app em outro dispositivo e fazer login.
            </p>
          </details>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-br from-[#00E676] to-[#00C766] rounded-2xl p-8 text-center">
        <h2 className="text-white text-2xl mb-3">Pronto para Eliminar a Maquininha?</h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Baixe agora o PAYHUB Soft-POS e transforme seus celulares em terminais de pagamento com liquidação instantânea e rendimento automático.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => window.open(appStoreUrl, '_blank')}
            className="px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Baixar para iOS</span>
          </button>
          <button
            onClick={() => window.open(playStoreUrl, '_blank')}
            className="px-8 py-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span>Baixar para Android</span>
          </button>
        </div>

        <button
          onClick={handleCopyLink}
          className="mt-4 text-white/90 hover:text-white text-sm flex items-center justify-center gap-2 mx-auto transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              <span>Link copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar link de download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
