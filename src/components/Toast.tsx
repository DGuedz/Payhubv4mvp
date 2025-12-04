import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-[#00E676]/10',
      borderColor: 'border-[#00E676]/30',
      iconColor: 'text-[#00E676]',
      textColor: 'text-white',
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-[#EF4444]/10',
      borderColor: 'border-[#EF4444]/30',
      iconColor: 'text-[#EF4444]',
      textColor: 'text-white',
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-[#F59E0B]/10',
      borderColor: 'border-[#F59E0B]/30',
      iconColor: 'text-[#F59E0B]',
      textColor: 'text-white',
    },
    info: {
      icon: Info,
      bgColor: 'bg-[#2979FF]/10',
      borderColor: 'border-[#2979FF]/30',
      iconColor: 'text-[#2979FF]',
      textColor: 'text-white',
    },
  };

  const { icon: Icon, bgColor, borderColor, iconColor, textColor } = config[type];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 max-w-md animate-slide-up ${bgColor} ${borderColor} border rounded-xl p-4 shadow-2xl backdrop-blur-lg`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <p className={`text-sm ${textColor} flex-1`}>{message}</p>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Toast Container for managing multiple toasts
interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => onRemove(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}
