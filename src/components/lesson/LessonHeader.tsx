import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { X, Heart, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const LessonHeader: React.FC = () => {
  const { activeLesson, activeChallengeIndex, lessonHearts, exitLesson, theme, toggleTheme } = useGameStore();

  if (!activeLesson) return null;

  const total = activeLesson.challenges.length;
  const progressPercent = ((activeChallengeIndex) / total) * 100;

  return (
    <header className="max-w-4xl mx-auto w-full px-4 pt-6 pb-4 flex items-center gap-3 sm:gap-4">
      {/* Botão Fechar */}
      <button
        onClick={exitLesson}
        className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors cursor-pointer"
        aria-label="Sair da Lição"
      >
        <X className="w-7 h-7 stroke-[2.5]" />
      </button>

      {/* Barra de Progresso Arredondada Verde Estilo Duolingo */}
      <div className="flex-1 bg-gray-200 dark:bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 relative transition-colors duration-200">
        <motion.div
          className="bg-[#58cc02] h-full rounded-full transition-all duration-300 relative shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
        >
          {/* Brilho no topo da barra */}
          <div className="absolute top-0.5 left-2 right-2 h-1 bg-white/30 rounded-full" />
        </motion.div>
      </div>

      {/* Botão Alternar Tema */}
      <button
        onClick={toggleTheme}
        className="text-gray-400 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-gray-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-colors cursor-pointer"
        title={theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
        aria-label="Alternar Tema"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-amber-400" />
        ) : (
          <Moon className="w-5 h-5 text-gray-500" />
        )}
      </button>

      {/* Contador de Vidas / Corações */}
      <div className="flex items-center gap-1.5 font-black text-lg text-[#ff4b4b] select-none">
        <Heart className="w-6 h-6 fill-[#ff4b4b] stroke-none" />
        <span>{lessonHearts}</span>
      </div>
    </header>
  );
};
