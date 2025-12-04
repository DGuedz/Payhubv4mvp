import React, { useState } from 'react';
import { User, Mail, Phone, Building, MapPin, Key, Bell, Shield, Save } from 'lucide-react';

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@payhub.com.br',
    phone: '+55 11 98765-4321',
    company: 'PME Comércio LTDA',
    cnpj: '12.345.678/0001-90',
    address: 'São Paulo, SP',
  });

  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    emailSecurity: true,
    emailMarketing: false,
    pushTransactions: true,
    pushSecurity: true,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNotificationToggle = (field: string) => {
    setNotifications((prev) => ({ ...prev, [field]: !prev[field as keyof typeof prev] }));
  };

  const handleSave = () => {
    // Mock save
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-3 text-sm transition-colors border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#2979FF] text-[#2979FF]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Perfil
        </button>
        <button
          onClick={() => setActiveTab('security')}
          className={`px-4 py-3 text-sm transition-colors border-b-2 ${
            activeTab === 'security'
              ? 'border-[#2979FF] text-[#2979FF]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Segurança
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-3 text-sm transition-colors border-b-2 ${
            activeTab === 'notifications'
              ? 'border-[#2979FF] text-[#2979FF]'
              : 'border-transparent text-gray-400 hover:text-white'
          }`}
        >
          Notificações
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white mb-6">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#0F1218] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2979FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#0F1218] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2979FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Telefone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-[#0F1218] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2979FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Building className="w-4 h-4 inline mr-2" />
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full bg-[#0F1218] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2979FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">CNPJ</label>
                <input
                  type="text"
                  value={formData.cnpj}
                  onChange={(e) => handleInputChange('cnpj', e.target.value)}
                  className="w-full bg-[#0F1218] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2979FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Localização
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full bg-[#0F1218] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-[#2979FF] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white mb-6">Segurança da Conta</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0F1218] rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-[#2979FF]" />
                  <div>
                    <p className="text-white">Alterar Senha</p>
                    <p className="text-sm text-gray-400">Última alteração há 30 dias</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#2979FF] text-white rounded-lg hover:bg-[#1E5FCC] transition-colors">
                  Alterar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0F1218] rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#00E676]" />
                  <div>
                    <p className="text-white">Autenticação em Dois Fatores</p>
                    <p className="text-sm text-gray-400">Segurança adicional para login</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#00E676]">Ativo</span>
                  <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                    Gerenciar
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0F1218] rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-[#F59E0B]" />
                  <div>
                    <p className="text-white">Chaves API</p>
                    <p className="text-sm text-gray-400">Gerenciar chaves de integração</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  Ver Chaves
                </button>
              </div>

              <div className="p-4 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-lg">
                <p className="text-sm text-[#F59E0B]">
                  ⚠️ Nunca compartilhe suas credenciais ou chaves API com terceiros.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="bg-[#1A1F2B] border border-gray-800 rounded-xl p-6">
            <h3 className="text-white mb-6">Preferências de Notificação</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-white mb-4 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Notificações por Email
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'emailTransactions', label: 'Transações', desc: 'Receber confirmações de pagamento' },
                    { key: 'emailSecurity', label: 'Segurança', desc: 'Alertas de atividade suspeita' },
                    { key: 'emailMarketing', label: 'Marketing', desc: 'Novidades e promoções' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-[#0F1218] rounded-lg">
                      <div>
                        <p className="text-white">{item.label}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(item.key)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'bg-[#2979FF]'
                            : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-white mb-4 flex items-center gap-2">
                  <Bell className="w-4 h-4" />
                  Notificações Push
                </h4>
                <div className="space-y-3">
                  {[
                    { key: 'pushTransactions', label: 'Transações', desc: 'Notificações em tempo real' },
                    { key: 'pushSecurity', label: 'Segurança', desc: 'Alertas críticos' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-[#0F1218] rounded-lg">
                      <div>
                        <p className="text-white">{item.label}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => handleNotificationToggle(item.key)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'bg-[#2979FF]'
                            : 'bg-gray-700'
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                            notifications[item.key as keyof typeof notifications] ? 'translate-x-6' : ''
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-3 bg-[#2979FF] text-white rounded-lg hover:bg-[#1E5FCC] transition-colors"
        >
          <Save className="w-4 h-4" />
          Salvar Alterações
        </button>
      </div>
    </div>
  );
}
