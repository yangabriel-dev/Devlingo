import React from 'react';
import { motion } from 'framer-motion';

export type MascotMood = 'happy' | 'celebrating' | 'thinking' | 'sad' | 'waving';

interface MascotProps {
  mood?: MascotMood;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const DevLingoMascot: React.FC<MascotProps> = ({
  mood = 'happy',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-36 h-36',
    xl: 'w-48 h-48',
  };

  const getAnimationProps = () => {
    switch (mood) {
      case 'celebrating':
        return {
          y: [0, -12, 0, -8, 0],
          rotate: [0, -5, 5, -3, 0],
          transition: { repeat: Infinity, duration: 1.2 }
        };
      case 'sad':
        return {
          y: [0, 4, 0],
          transition: { repeat: Infinity, duration: 2 }
        };
      case 'thinking':
        return {
          rotate: [0, 8, -4, 0],
          transition: { repeat: Infinity, duration: 2.5 }
        };
      case 'waving':
      case 'happy':
      default:
        return {
          y: [0, -4, 0],
          transition: { repeat: Infinity, duration: 2 }
        };
    }
  };

  return (
    <motion.div
      className={`inline-block select-none ${sizeMap[size]} ${className}`}
      animate={getAnimationProps()}
    >
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        {/* Antena Dev */}
        <path d="M60 20V8" stroke="#1CB0F6" strokeWidth="5" strokeLinecap="round" />
        <circle cx="60" cy="7" r="5" fill="#FFC800" />

        {/* Corpo Robô DevLingo */}
        <rect x="25" y="24" width="70" height="64" rx="20" fill="#58CC02" />
        <rect x="25" y="24" width="70" height="64" rx="20" stroke="#46A302" strokeWidth="4" />

        {/* Tela do Rosto */}
        <rect x="33" y="32" width="54" height="42" rx="12" fill="#2B3844" />

        {/* Olhos de Código & Expressão */}
        {mood === 'celebrating' && (
          <>
            {/* Olhos em estrela brilhante ^^ */}
            <path d="M42 50L48 44L54 50" stroke="#58CC02" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M66 50L72 44L78 50" stroke="#58CC02" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Sorrisão aberto */}
            <path d="M52 62C52 66 68 66 68 62" stroke="#FFC800" strokeWidth="3" strokeLinecap="round" fill="#FFC800" />
          </>
        )}

        {mood === 'sad' && (
          <>
            {/* Olhos caídos */}
            <circle cx="48" cy="50" r="4" fill="#FF4B4B" />
            <circle cx="72" cy="50" r="4" fill="#FF4B4B" />
            {/* Boca triste */}
            <path d="M52 64C56 60 64 60 68 64" stroke="#FF4B4B" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {mood === 'thinking' && (
          <>
            {/* Olho piscando e interrogação */}
            <circle cx="48" cy="50" r="4" fill="#1CB0F6" />
            <path d="M68 50H76" stroke="#1CB0F6" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M54 62H66" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          </>
        )}

        {(mood === 'happy' || mood === 'waving') && (
          <>
            {/* Olhos amigáveis em formato de tags de código < > */}
            <path d="M50 46L44 50L50 54" stroke="#58CC02" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M70 46L76 50L70 54" stroke="#58CC02" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            {/* Sorriso simpático */}
            <path d="M54 60C57 63 63 63 66 60" stroke="#58CC02" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {/* Fones de Ouvido / Orelhas de Dev */}
        <rect x="18" y="44" width="8" height="24" rx="4" fill="#1CB0F6" />
        <rect x="94" y="44" width="8" height="24" rx="4" fill="#1CB0F6" />

        {/* Patas / Suportes inferiores */}
        <rect x="40" y="88" width="12" height="12" rx="4" fill="#46A302" />
        <rect x="68" y="88" width="12" height="12" rx="4" fill="#46A302" />
      </svg>
    </motion.div>
  );
};
