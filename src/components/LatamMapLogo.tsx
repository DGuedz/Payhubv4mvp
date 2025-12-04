import { motion } from 'motion/react';

export function LatamMapLogo() {
  return (
    <div className="relative w-40 h-48">
      {/* Pulsing rings background */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut"
        }}
      >
        <div className="w-32 h-32 rounded-full border-4 border-[#2979FF]/40"></div>
      </motion.div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.3
        }}
      >
        <div className="w-28 h-28 rounded-full border-3 border-[#00E676]/40"></div>
      </motion.div>

      {/* LATAM Map SVG */}
      <motion.svg
        viewBox="0 0 200 300"
        className="relative z-10 w-full h-full drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="mapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2979FF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#5B9DFF" stopOpacity="0.9" />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Simplified LATAM Map - Mexico to Argentina */}
        <motion.path
          d="M 100 20 
             L 110 25 L 120 35 L 125 50 
             L 130 70 L 135 85 L 140 100
             L 138 120 L 135 140 L 130 160
             L 125 180 L 118 200 L 110 220
             L 105 240 L 100 260 L 95 275
             L 90 265 L 85 250 L 82 235
             L 80 220 L 78 205 L 75 190
             L 70 175 L 68 160 L 65 145
             L 62 130 L 60 115 L 58 100
             L 60 85 L 65 70 L 70 55
             L 75 45 L 82 35 L 90 28
             Z"
          fill="url(#mapGradient)"
          stroke="#2979FF"
          strokeWidth="2"
          filter="url(#glow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />

        {/* Key Market Points with Animation */}
        {/* Mexico */}
        <motion.circle
          cx="100"
          cy="40"
          r="4"
          fill="#00E676"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, 1, 1, 1]
          }}
          transition={{ 
            duration: 1,
            delay: 1.5,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        <motion.circle
          cx="100"
          cy="40"
          r="6"
          fill="none"
          stroke="#00E676"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 2, 2.5],
            opacity: [0.8, 0.3, 0]
          }}
          transition={{ 
            duration: 2,
            delay: 1.5,
            repeat: Infinity
          }}
        />

        {/* Brazil - Main Market */}
        <motion.circle
          cx="110"
          cy="150"
          r="5"
          fill="#00E676"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, 1, 1, 1]
          }}
          transition={{ 
            duration: 1,
            delay: 1.7,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        <motion.circle
          cx="110"
          cy="150"
          r="7"
          fill="none"
          stroke="#00E676"
          strokeWidth="1.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 2, 2.5],
            opacity: [0.8, 0.3, 0]
          }}
          transition={{ 
            duration: 2,
            delay: 1.7,
            repeat: Infinity
          }}
        />

        {/* Argentina */}
        <motion.circle
          cx="95"
          cy="250"
          r="4"
          fill="#00E676"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, 1, 1, 1]
          }}
          transition={{ 
            duration: 1,
            delay: 1.9,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        <motion.circle
          cx="95"
          cy="250"
          r="6"
          fill="none"
          stroke="#00E676"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [1, 2, 2.5],
            opacity: [0.8, 0.3, 0]
          }}
          transition={{ 
            duration: 2,
            delay: 1.9,
            repeat: Infinity
          }}
        />

        {/* Colombia */}
        <motion.circle
          cx="75"
          cy="95"
          r="3.5"
          fill="#00E676"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, 1, 1, 1]
          }}
          transition={{ 
            duration: 1,
            delay: 2.1,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />

        {/* Chile */}
        <motion.circle
          cx="85"
          cy="230"
          r="3.5"
          fill="#00E676"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 1.2, 1],
            opacity: [0, 1, 1, 1]
          }}
          transition={{ 
            duration: 1,
            delay: 2.3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />

        {/* Connecting lines - data flow */}
        <motion.path
          d="M 100 40 Q 105 95 75 95"
          stroke="#2979FF"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 2,
            delay: 2.5,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
        
        <motion.path
          d="M 75 95 Q 92 122 110 150"
          stroke="#2979FF"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 2,
            delay: 2.7,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />

        <motion.path
          d="M 110 150 Q 100 200 95 250"
          stroke="#2979FF"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
          opacity="0.4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ 
            duration: 2,
            delay: 2.9,
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      </motion.svg>

      {/* PAYHUB text overlay */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <div className="text-[#2979FF] text-xs tracking-widest opacity-70">
          LATAM
        </div>
      </motion.div>
    </div>
  );
}
