import React from 'react';
import { Home, CreditCard, Lock, TrendingUp, FileText, User } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface DashboardNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function DashboardNav({ activeSection, onNavigate }: DashboardNavProps) {
  const navItems: NavItem[] = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'pagar', label: 'Pagar', icon: CreditCard },
    { id: 'escrow', label: 'Escrow', icon: Lock },
    { id: 'yield', label: 'Yield', icon: TrendingUp },
    { id: 'audit', label: 'Auditoria', icon: FileText },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <>
      {/* Mobile Tab Bar (Bottom) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1A1F2B]/95 backdrop-blur-lg border-t border-gray-800 z-40">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  isActive ? 'text-[#2979FF]' : 'text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-[10px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-[#1A1F2B] border-r border-gray-800 z-30">
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[#2979FF]/10 text-[#2979FF]'
                    : 'text-gray-400 hover:text-white hover:bg-[#0F1218]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
