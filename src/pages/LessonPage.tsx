import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { LessonHeader } from '../components/lesson/LessonHeader';
import { LessonFooter } from '../components/lesson/LessonFooter';
import { LessonCompleteModal } from '../components/lesson/LessonCompleteModal';
import { MultipleChoiceChallenge } from '../components/lesson/MultipleChoiceChallenge';
import { ParsonsChallenge } from '../components/lesson/ParsonsChallenge';
import { FillBlankChallenge } from '../components/lesson/FillBlankChallenge';
import { CodeRunnerChallenge } from '../components/lesson/CodeRunnerChallenge';
import { SpotBugChallenge } from '../components/lesson/SpotBugChallenge';
import { MultipleChoicePayload, ParsonsPayload, FillBlankPayload, CodeRunnerPayload, SpotBugPayload } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const LessonPage: React.FC = () => {
  const { activeLesson, activeChallengeIndex, isLessonComplete } = useGameStore();

  if (!activeLesson) return null;
  if (isLessonComplete) return <LessonCompleteModal />;

  const currentChallenge = activeLesson.challenges[activeChallengeIndex];
  if (!currentChallenge) return null;

  const renderChallengeContent = () => {
    switch (currentChallenge.type) {
      case 'MULTIPLE_CHOICE':
        return <MultipleChoiceChallenge payload={currentChallenge.payload as MultipleChoicePayload} />;
      case 'PARSONS':
        return <ParsonsChallenge payload={currentChallenge.payload as ParsonsPayload} />;
      case 'FILL_BLANK':
        return <FillBlankChallenge payload={currentChallenge.payload as FillBlankPayload} />;
      case 'CODE_RUNNER':
        return <CodeRunnerChallenge payload={currentChallenge.payload as CodeRunnerPayload} />;
      case 'SPOT_BUG':
        return <SpotBugChallenge payload={currentChallenge.payload as SpotBugPayload} />;
      default:
        return <div className="text-center text-gray-500 dark:text-slate-400 font-bold">Tipo de desafio não suportado.</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-[#0d1520] text-gray-800 dark:text-slate-100 z-50 flex flex-col justify-between overflow-y-auto pb-32 transition-colors duration-200">
      {/* Header com barra de progresso e vidas */}
      <LessonHeader />

      {/* Conteúdo Central do Desafio Animado */}
      <main className="flex-1 flex items-center justify-center py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChallenge.id}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {renderChallengeContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer com botão Verificar / Continuar e Feedbacks */}
      <LessonFooter />
    </div>
  );
};
