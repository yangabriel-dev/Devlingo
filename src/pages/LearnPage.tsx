import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { LearningPath } from '../components/roadmap/LearningPath';
import { DevLingoMascot } from '../components/mascot/DevLingoMascot';
import { Flame, Shield, Sparkles } from 'lucide-react';

export const LearnPage: React.FC = () => {
  const { courses, currentCourseId, user } = useGameStore();

  const currentCourse = courses.find((c) => c.id === currentCourseId) || courses[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8 items-start justify-center">
      {/* Coluna Central: Trilha de Aprendizado */}
      <div className="w-full lg:w-2/3 flex flex-col items-center">
        <LearningPath course={currentCourse} />
      </div>

      {/* Coluna Direita: Widgets de Gamificação e Metas */}
      <div className="w-full lg:w-1/3 flex flex-col gap-5 sticky top-20">
        
        {/* Card de Dica do Mascote Devy */}
        <div className="bg-white dark:bg-[#16222f] rounded-3xl p-5 border-2 border-gray-200 dark:border-slate-800 shadow-sm flex items-center gap-4 transition-colors duration-200">
          <DevLingoMascot mood="waving" size="md" />
          <div>
            <h4 className="font-black text-gray-800 dark:text-slate-100 text-base mb-1">Dica do Devy</h4>
            <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold">
              Pratique 5 minutos todos os dias para fixar a sintaxe na memória de longo prazo!
            </p>
          </div>
        </div>

        {/* Card de Missão Diária */}
        <div className="bg-white dark:bg-[#16222f] rounded-3xl p-5 border-2 border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-black text-gray-800 dark:text-slate-100 text-base flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ffc800]" />
              Missões do Dia
            </h4>
            <span className="text-xs font-bold text-gray-400 dark:text-slate-500">12h restantes</span>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-gray-200 dark:border-slate-700/60">
              <div className="flex justify-between text-xs font-black text-gray-700 dark:text-slate-300 mb-1.5">
                <span>Ganhe 50 XP em lições</span>
                <span>{user.xp}/50 XP</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#ffc800] h-full rounded-full transition-all"
                  style={{ width: `${Math.min(100, (user.xp / 50) * 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-gray-200 dark:border-slate-700/60">
              <div className="flex justify-between text-xs font-black text-gray-700 dark:text-slate-300 mb-1.5">
                <span>Complete 1 desafio de código</span>
                <span>1/1</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#58cc02] h-full rounded-full w-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Card da Liga Atual */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 rounded-3xl p-5 border-2 border-amber-200 dark:border-amber-900/50 shadow-sm transition-colors duration-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 font-black text-amber-900 dark:text-amber-300 text-base">
              <Shield className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Liga {user.league}</span>
            </div>
            <span className="text-xs font-black text-amber-700 dark:text-amber-200 bg-amber-200 dark:bg-amber-900/60 px-2 py-0.5 rounded-full">
              Top 3
            </span>
          </div>
          <p className="text-xs font-bold text-amber-800 dark:text-amber-300/90">
            Você está na zona de promoção! Continue praticando para subir para a Liga Ouro no domingo.
          </p>
        </div>

        {/* Card de Streak Flame */}
        <div className="bg-white dark:bg-[#16222f] rounded-3xl p-5 border-2 border-gray-200 dark:border-slate-800 shadow-sm flex items-center justify-between transition-colors duration-200">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-950/50 rounded-2xl text-[#ff9600]">
              <Flame className="w-6 h-6 fill-[#ff9600]" />
            </div>
            <div>
              <div className="font-black text-gray-800 dark:text-slate-100 text-sm">Sequência Ativa</div>
              <div className="text-xs font-bold text-gray-400 dark:text-slate-500">{user.currentStreak} dias consecutivos</div>
            </div>
          </div>
          <span className="font-mono font-black text-xl text-[#ff9600]">{user.currentStreak} 🔥</span>
        </div>

      </div>
    </div>
  );
};
