import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

interface HeroProps {
  onExportCSV: () => void;
  onActivateODL?: () => void;
}

export function Hero({ onExportCSV, onActivateODL }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Array de imagens de inovação
  const innovationImages = [
    {
      url: 'https://images.unsplash.com/photo-1761293877320-d78bffe24b25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBjb25uZWN0aXZpdHklMjBuZXR3b3JrfGVufDF8fHx8MTc2NDM1MjY1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Rede Global de Conectividade'
    },
    {
      url: 'https://images.unsplash.com/photo-1666816943035-15c29931e975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQzMzQwNzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Blockchain Technology'
    },
    {
      url: 'https://images.unsplash.com/photo-1653179675238-cc722693b666?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZmluYW5jZSUyMGlubm92YXRpb258ZW58MXx8fHwxNzY0MzU1MDczfDA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Digital Finance Innovation'
    },
    {
      url: 'https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjQzMjEwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      alt: 'Futuristic Technology'
    }
  ];

  // Auto-rotate slideshow a cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % innovationImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleActivateODL = () => {
    if (onActivateODL) {
      onActivateODL();
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#1A1F2B] to-[#0F1218] pt-24 pb-32">
      {/* Slideshow Background */}
      <div className="absolute inset-0 opacity-30">
        {innovationImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
            style={{
              backgroundImage: `url("${image.url}")`,
              opacity: currentSlide === index ? 1 : 0,
              filter: 'brightness(0.6) saturate(1.2)'
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay para melhor legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2B]/80 via-[#1A1F2B]/60 to-[#0F1218]/90" />

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2979FF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5DC264]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Animated Network Dots */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20%" cy="30%" r="2" fill="#2979FF" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="25%" r="3" fill="#5DC264" opacity="0.6">
          <animate attributeName="r" values="3;5;3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="35%" r="2" fill="#2979FF" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Circular - Destaque */}
          <div className="inline-block mb-8 animate-fade-in relative">
            {/* Ondas Concêntricas Pulsantes - Fluxos de Transações LATAM */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              {/* Onda 1 - Azul */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#2979FF]/30 animate-ping" style={{ animationDuration: '6s' }}></div>
              
              {/* Onda 2 - Branco */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/20 animate-ping" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
              
              {/* Onda 3 - Azul */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#2979FF]/25 animate-ping" style={{ animationDuration: '6s', animationDelay: '4s' }}></div>

              {/* Ondas Secundárias - Mais Sutis */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-white/15 animate-ping" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-[#2979FF]/20 animate-ping" style={{ animationDuration: '7s', animationDelay: '3s' }}></div>
            </div>

            <Logo size="w-32 h-32" className="mx-auto shadow-2xl shadow-[#2979FF]/30 relative z-10" alt="PAYHUB - Tesouraria Ativa" />
          </div>

          {/* Main Title - Inspirado no Slide */}
          <h1 className="text-white mb-8 leading-tight">
            PAYHUB: O Centro de Pagamentos<br />Simplificado.
          </h1>

          {/* Subtitle Comercial */}
          <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Transforme seu celular no terminal mais rentável do mundo. 
            <strong className="text-white"> Zero Aluguel. Zero Atraso.</strong>
          </p>

          {/* Slide Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {innovationImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 bg-[#2979FF]' 
                    : 'w-1.5 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
