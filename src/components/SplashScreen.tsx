import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { Zap, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { LatamMapLogo } from './LatamMapLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Start showing content after brief delay
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F7FF] via-[#E3EEFF] to-[#F4F7FF] relative overflow-hidden flex items-center justify-center p-6">
      {/* Animated Background Elements - Fluid Wave Effect */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Flowing circles */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-[#2979FF]/10 to-transparent blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-gradient-to-tl from-[#00E676]/10 to-transparent blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#2979FF]/5 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Flowing lines - Data stream concept */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-[#2979FF]/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              x: ['-100%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="max-w-2xl w-full space-y-12 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={showContent ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Logo Circle - PAYHUB Brand */}
        <motion.div
          className="text-center space-y-6"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={showContent ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* LATAM Map Logo */}
          <div className="flex justify-center mb-4">
            <LatamMapLogo />
          </div>

          <motion.h1
            className="text-6xl md:text-7xl tracking-tight text-[#1a2a3a]"
            initial={{ opacity: 0, y: 10 }}
            animate={showContent ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            PAYHUB
          </motion.h1>
          
          <motion.p
            className="text-sm text-[#607D8B] tracking-wide"
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Revolucionando o Comércio na América Latina
          </motion.p>
        </motion.div>

        {/* Value Proposition - ODL Focus */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {/* Main Title - ODL */}
          <div className="space-y-3">
            <h2 className="text-5xl md:text-6xl text-[#2979FF] tracking-tight">
              Liquidez Sob Demanda
            </h2>
            <p className="text-lg md:text-xl text-[#1a2a3a]">
              <span className="text-[#2979FF]">ODL</span> – On-Demand Liquidity
            </p>
          </div>

          {/* Proof Points */}
          <div className="space-y-2 text-lg md:text-xl text-[#607D8B]">
            <p>Faturamento <span className="text-[#00E676]">D+0</span></p>
            <p>Liquidação em <span className="text-[#2979FF]">RLUSD</span> (Stablecoin)</p>
            <p>Rendimento de <span className="text-[#00E676]">5% a 8% APY</span></p>
          </div>

          {/* Tagline */}
          <div className="pt-6 max-w-xl mx-auto">
            <p className="text-lg text-[#1a2a3a]">
              <span className="text-[#2979FF]">Acesso Simplificado:</span> O Soft-POS que transforma seu celular na Tesouraria Ativa.
            </p>
          </div>
        </motion.div>

        {/* Value Icons */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#00E676]/10 flex items-center justify-center mx-auto">
              <Zap className="w-7 h-7 text-[#00E676]" />
            </div>
            <p className="text-sm text-[#607D8B]">D+0</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#2979FF]/10 flex items-center justify-center mx-auto">
              <TrendingUp className="w-7 h-7 text-[#2979FF]" />
            </div>
            <p className="text-sm text-[#607D8B]">5-8% APY</p>
          </div>
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#2979FF]/10 flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7 text-[#2979FF]" />
            </div>
            <p className="text-sm text-[#607D8B]">Escrow</p>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <Button
            onClick={onComplete}
            className="w-full h-16 bg-gradient-to-r from-[#2979FF] to-[#5B9DFF] hover:from-[#1565C0] hover:to-[#2979FF] text-white rounded-2xl shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all text-lg group"
          >
            Ativar Tesouraria PAYHUB
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>

          <button
            onClick={onComplete}
            className="w-full text-[#607D8B] hover:text-[#2979FF] transition-colors underline"
          >
            Já tenho uma conta
          </button>
        </motion.div>

        {/* Footer - XRPL Powered */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={showContent ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <p className="text-sm text-[#607D8B]">
            Powered by <span className="text-[#2979FF]">XRP Ledger</span>
          </p>
          <p className="text-xs text-[#607D8B] mt-1">
            Liquidação em 3-5 segundos • Custo de R$ 0,0001/tx
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
