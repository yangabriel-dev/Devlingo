import React from 'react';
import { Lesson } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';
import { Check, Lock, Play, Star } from 'lucide-react';

interface Props {
  lesson: Lesson;
  unitColor: string;
  isCompleted: boolean;
  isUnlocked: boolean;
  isCurrent: boolean;
}

export const LessonNode: React.FC<Props> = ({
  lesson,
  unitColor,
  isCompleted,
  isUnlocked,
  isCurrent,
}) => {
  const { startLesson, theme } = useGameStore();

  const handleClick = () => {
    if (isUnlocked) {
      startLesson(lesson);
    }
  };

  const isDark = theme === 'dark';

  const lockedBg = isDark ? '#222f3e' : '#e5e5e5';
  const lockedBorder = isDark ? '#17202a' : '#cfcfcf';

  return (
    <div className="relative flex flex-col items-center group my-3">
      {/* Tooltip flutuante com título da lição */}
      {isUnlocked && (
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-gray-800 dark:bg-slate-900 dark:border dark:border-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap pointer-events-none shadow-lg z-20">
          {lesson.title} ({lesson.xpReward} XP)
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800 dark:border-t-slate-900" />
        </div>
      )}

      {/* Botão circular 3D da Fase */}
      <motion.button
        whileHover={isUnlocked ? { scale: 1.06 } : {}}
        whileTap={isUnlocked ? { scale: 0.94, y: 4 } : {}}
        onClick={handleClick}
        disabled={!isUnlocked}
        style={{
          backgroundColor: isCompleted ? '#ffc800' : isUnlocked ? unitColor : lockedBg,
          borderColor: isCompleted ? '#e5b400' : isUnlocked ? '#3a8700' : lockedBorder,
        }}
        className={`w-20 h-20 rounded-full border-b-[6px] flex items-center justify-center relative shadow-lg cursor-pointer transition-transform ${
          !isUnlocked ? 'cursor-not-allowed opacity-80' : ''
        }`}
      >
        {/* Animação pulsante se for o nó atual */}
        {isCurrent && !isCompleted && (
          <span className="absolute -inset-2 rounded-full border-4 border-[#58cc02] animate-ping opacity-30" />
        )}

        {/* Ícones de Estado */}
        {isCompleted ? (
          <div className="flex flex-col items-center">
            <Check className="w-9 h-9 text-white stroke-[4]" />
            <div className="flex gap-0.5 -mt-1">
              <Star className="w-3 h-3 fill-white text-white" />
              <Star className="w-3.5 h-3.5 fill-white text-white" />
              <Star className="w-3 h-3 fill-white text-white" />
            </div>
          </div>
        ) : isUnlocked ? (
          <Play className="w-8 h-8 text-white fill-white ml-1" />
        ) : (
          <Lock className="w-7 h-7 text-gray-400 dark:text-slate-500" />
        )}
      </motion.button>

      {/* Rótulo da lição abaixo do nó */}
      <span className={`mt-2 text-xs font-black uppercase tracking-wider transition-colors ${
        isUnlocked ? 'text-gray-700 dark:text-slate-200' : 'text-gray-400 dark:text-slate-500'
      }`}>
        {lesson.title}
      </span>
    </div>
  );
};
