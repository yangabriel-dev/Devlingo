import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { Flame, Gem, Heart, Volume2, VolumeX, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export const Header: React.FC = () => {
  const {
    courses,
    currentCourseId,
    setCourse,
    user,
    soundEnabled,
    toggleSound,
    theme,
    toggleTheme,
  } = useGameStore();

  return (
    <header className="sticky top-0 bg-white/90 dark:bg-[#111923]/90 backdrop-blur-md border-b-2 border-gray-200 dark:border-slate-800 z-30 px-4 py-3 transition-colors duration-200">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        
        {/* Seletor de Curso / Linguagem */}
        <div className="flex items-center gap-2">
          <select
            value={currentCourseId}
            onChange={(e) => setCourse(e.target.value)}
            className="bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-750 text-gray-800 dark:text-gray-100 font-black text-sm py-2 px-3 rounded-2xl border-2 border-gray-300 dark:border-slate-700 outline-none cursor-pointer transition-colors shadow-sm"
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id} className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100">
                {course.icon} {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Status e Economia (Streak, Gemas, Vidas, Modo Dark, Som) */}
        <div className="flex items-center gap-3 sm:gap-5 font-black text-sm">
          
          {/* Streak Fogo */}
          <div className="flex items-center gap-1.5 text-[#ff9600]">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Flame className="w-6 h-6 fill-[#ff9600]" />
            </motion.div>
            <span>{user.currentStreak}</span>
          </div>

          {/* Gemas */}
          <div className="flex items-center gap-1.5 text-[#1cb0f6]">
            <Gem className="w-5 h-5 fill-[#1cb0f6]" />
            <span>{user.gems}</span>
          </div>

          {/* Vidas / Corações */}
          <div className="flex items-center gap-1.5 text-[#ff4b4b]">
            <Heart className="w-5 h-5 fill-[#ff4b4b]" />
            <span>{user.hearts}</span>
          </div>

          <div className="h-5 w-px bg-gray-200 dark:bg-slate-700 hidden sm:block" />

          {/* Botão de Alternância de Tema (Dark / Light) */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-xl text-gray-400 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
            title={theme === 'dark' ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro (Conforto Visual)'}
            aria-label="Alternar Modo Escuro"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -45, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </motion.div>
          </button>

          {/* Botão de Som */}
          <button
            onClick={toggleSound}
            className="text-gray-400 hover:text-gray-600 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 p-1.5 rounded-xl transition-all cursor-pointer"
            title={soundEnabled ? 'Silenciar Áudio' : 'Ativar Efeitos Sonoros'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-gray-600 dark:text-slate-200" />
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400 dark:text-slate-500" />
            )}
          </button>

        </div>
      </div>
    </header>
  );
};
