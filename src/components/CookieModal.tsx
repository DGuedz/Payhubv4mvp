import React, { useState } from 'react';
import { X, Cookie, Shield, BarChart } from 'lucide-react';

interface CookieModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CookieCategory {
  id: string;
  label: string;
  description: string;
  required: boolean;
  enabled: boolean;
  icon: React.ElementType;
}

export function CookieModal({ isOpen, onClose }: CookieModalProps) {
  const [categories, setCategories] = useState<CookieCategory[]>([
    {
      id: 'necessary',
      label: 'Estritamente Necessários',
      description: 'Garantem segurança, autenticação e funcionamento da plataforma. Não podem ser desativados.',
      required: true,
      enabled: true,
      icon: Shield,
    },
    {
      id: 'analytics',
      label: 'Desempenho/Analytics',
      description: 'Coletam dados anonimizados para melhoria da plataforma. Você decide se deseja compartilhar.',
      required: false,
      enabled: true,
      icon: BarChart,
    },
  ]);

  const [hasChanges, setHasChanges] = useState(false);

  const toggleCategory = (id: string) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id && !cat.required
          ? { ...cat, enabled: !cat.enabled }
          : cat
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    console.log('Saving cookie preferences:', categories);
    onClose();
  };

  const handleReset = () => {
    setCategories(prev =>
      prev.map(cat => ({
        ...cat,
        enabled: cat.required ? true : false,
      }))
    );
    setHasChanges(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-[#1A1F2B] rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Cookie className="w-6 h-6 text-[#2979FF]" />
            <h2 className="text-white">Gerenciar Cookies</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-gray-400 mb-6">
            Seguindo o padrão GOV.BR, você pode gerenciar suas preferências de cookies por categoria.
            Cookies estritamente necessários são obrigatórios para o funcionamento da plataforma.
          </p>

          <div className="space-y-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-[#0F1218] border border-gray-800 rounded-xl p-5"
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        category.required ? 'bg-[#00E676]/10' : 'bg-[#2979FF]/10'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          category.required ? 'text-[#00E676]' : 'text-[#2979FF]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white mb-2 flex items-center gap-2">
                          {category.label}
                          {category.required && (
                            <span className="px-2 py-0.5 rounded text-xs bg-[#00E676]/10 text-[#00E676]">
                              Obrigatório
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-400">{category.description}</p>
                      </div>
                    </div>
                    {/* Toggle */}
                    <button
                      onClick={() => toggleCategory(category.id)}
                      disabled={category.required}
                      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${
                        category.enabled
                          ? 'bg-[#2979FF]'
                          : 'bg-gray-700'
                      } ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div
                        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          category.enabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t border-gray-800">
          <button
            onClick={handleReset}
            className="px-6 py-2.5 rounded-lg bg-transparent hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-700 transition-all text-sm"
          >
            Resetar
          </button>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-xs text-gray-400">
                Alterações pendentes
              </span>
            )}
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-[#2979FF] hover:bg-[#1E5FE0] text-white transition-all text-sm"
            >
              Salvar preferências
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
