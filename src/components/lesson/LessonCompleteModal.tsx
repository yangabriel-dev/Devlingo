import React, { useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { DevLingoMascot } from '../mascot/DevLingoMascot';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { Zap, Target, Gem, Flame } from 'lucide-react';

export const LessonCompleteModal: React.FC = () => {
  const { activeLesson, lessonMistakes, user, exitLesson } = useGameStore();

  useEffect(() => {
    // Efeito de confetes no topo da tela
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  if (!activeLesson) return null;

  const total = activeLesson.challenges.length;
  const correctCount = Math.max(0, total - lessonMistakes);
  const accuracy = Math.round((correctCount / total) * 100);

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0d1520] z-50 flex flex-col items-center justify-between p-6 overflow-y-auto transition-colors duration-200">
      <div />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center max-w-md w-full my-auto"
      >
        <DevLingoMascot mood="celebrating" size="xl" className="mb-4" />
        
        <h1 className="text-3xl md:text-4xl font-black text-[#ffc800] mb-2 drop-shadow-sm">
          Lição Concluída!
        </h1>
        <p className="text-gray-600 dark:text-slate-300 font-bold mb-8">
          Você deu mais um passo para se tornar um Dev Pro!
        </p>

        {/* Cards de Estatísticas estilo Duolingo */}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          {/* XP Total */}
          <div className="bg-[#ffc800] rounded-2xl p-4 text-white font-black flex flex-col items-center justify-center shadow">
            <span className="text-xs uppercase tracking-wider text-amber-100 mb-1">Total de XP</span>
            <div className="flex items-center gap-1.5 text-2xl">
              <Zap className="w-6 h-6 fill-white" />
              <span>+{activeLesson.xpReward}</span>
            </div>
          </div>

          {/* Precisão */}
          <div className="bg-[#58cc02] rounded-2xl p-4 text-white font-black flex flex-col items-center justify-center shadow">
            <span className="text-xs uppercase tracking-wider text-green-100 mb-1">Precisão</span>
            <div className="flex items-center gap-1.5 text-2xl">
              <Target className="w-6 h-6 stroke-[3]" />
              <span>{accuracy}%</span>
            </div>
          </div>

          {/* Gemas Ganhas */}
          <div className="bg-[#1cb0f6] rounded-2xl p-4 text-white font-black flex flex-col items-center justify-center shadow">
            <span className="text-xs uppercase tracking-wider text-blue-100 mb-1">Gemas Ganhas</span>
            <div className="flex items-center gap-1.5 text-2xl">
              <Gem className="w-6 h-6 fill-white" />
              <span>+15</span>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-[#ff9600] rounded-2xl p-4 text-white font-black flex flex-col items-center justify-center shadow">
            <span className="text-xs uppercase tracking-wider text-orange-100 mb-1">Sequência</span>
            <div className="flex items-center gap-1.5 text-2xl">
              <Flame className="w-6 h-6 fill-white" />
              <span>{user.currentStreak} dias</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Botão Final Continuar */}
      <div className="w-full max-w-md pb-6">
        <button
          onClick={exitLesson}
          className="w-full py-4 rounded-2xl btn-duo-primary font-black text-lg uppercase tracking-wider cursor-pointer shadow-lg"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
