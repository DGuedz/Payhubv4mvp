import { QrCode, LayoutDashboard, FileText, Target } from 'lucide-react';

interface NavigationProps {
  currentView: 'pos' | 'dashboard' | 'escrow' | 'investor';
  onViewChange: (view: 'pos' | 'dashboard' | 'escrow' | 'investor') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'pos' as const, label: 'POS', icon: QrCode },
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'escrow' as const, label: 'Escrow', icon: FileText },
    { id: 'investor' as const, label: 'Investor', icon: Target },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#2979FF]/10 md:relative md:border-0 md:bg-transparent backdrop-blur-lg shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? 'bg-[#2979FF] text-white shadow-lg shadow-blue-500/30'
                    : 'text-[#607D8B] hover:text-[#2979FF] hover:bg-[#F4F7FF]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs md:text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
