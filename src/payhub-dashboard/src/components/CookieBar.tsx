import React from 'react';
import { Cookie, Settings } from 'lucide-react';

interface CookieBarProps {
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onManage: () => void;
}

export function CookieBar({ onAcceptAll, onRejectAll, onManage }: CookieBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#1A1F2B]/95 backdrop-blur-lg border-t border-gray-800">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Message */}
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="w-5 h-5 text-[#2979FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-200 mb-1">
                Para melhorar sua experiência e prover serviços personalizados, utilizamos cookies.
              </p>
              <p className="text-xs text-gray-400">
                Seguimos o padrão GOV.BR com categorias granulares e consentimento ajustável.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={onRejectAll}
              className="px-6 py-2.5 rounded-lg bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700 transition-all text-sm whitespace-nowrap"
            >
              Rejeitar cookies
            </button>
            <button
              onClick={onManage}
              className="px-6 py-2.5 rounded-lg bg-[#1A1F2B] hover:bg-[#252B3A] text-white border border-gray-700 transition-all text-sm flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Settings className="w-4 h-4" />
              <span>Gerenciar cookies</span>
            </button>
            <button
              onClick={onAcceptAll}
              className="px-6 py-2.5 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white transition-all text-sm whitespace-nowrap"
            >
              Aceitar todos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
