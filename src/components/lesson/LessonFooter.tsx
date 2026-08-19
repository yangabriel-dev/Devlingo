import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { MultipleChoicePayload, FillBlankPayload, SpotBugPayload } from '../../types';
import { DevLingoMascot } from '../mascot/DevLingoMascot';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export const LessonFooter: React.FC = () => {
  const {
    activeLesson,
    activeChallengeIndex,
    selectedOption,
    answerChecked,
    isCorrectAnswer,
    lessonHearts,
    checkAnswer,
    nextChallenge,
    exitLesson,
    refillHeartsForFree,
  } = useGameStore();

  if (!activeLesson) return null;

  const currentChallenge = activeLesson.challenges[activeChallengeIndex];
  if (!currentChallenge) return null;

  const isOptionSelected = selectedOption !== null;

  // Lógica de verificação
  const handleVerify = () => {
    if (!selectedOption || answerChecked) return;

    let isCorrect = false;

    switch (currentChallenge.type) {
      case 'MULTIPLE_CHOICE': {
        const payload = currentChallenge.payload as MultipleChoicePayload;
        const correctOpt = payload.options.find(o => o.isCorrect);
        isCorrect = selectedOption === correctOpt?.id;
        break;
      }
      case 'PARSONS': {
        isCorrect = selectedOption === 'CORRECT';
        break;
      }
      case 'FILL_BLANK': {
        const payload = currentChallenge.payload as FillBlankPayload;
        isCorrect = selectedOption === payload.correctAnswer;
        break;
      }
      case 'SPOT_BUG': {
        const payload = currentChallenge.payload as SpotBugPayload;
        isCorrect = selectedOption === String(payload.bugLineNumber);
        break;
      }
      case 'CODE_RUNNER': {
        isCorrect = selectedOption === 'CODE_PASSED';
        break;
      }
    }

    checkAnswer(isCorrect);
  };

  // Se o usuário ficou sem corações
  if (lessonHearts === 0 && answerChecked && !isCorrectAnswer) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-[#ffeeee] dark:bg-[#281318] border-t-2 border-[#ff4b4b] p-6 z-50 transition-colors duration-200">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <DevLingoMascot mood="sad" size="sm" />
            <div>
              <h3 className="text-xl font-black text-[#ea2b2b] dark:text-[#ff6b6b]">Você ficou sem vidas!</h3>
              <p className="text-sm font-medium text-gray-700 dark:text-slate-300">
                Pratique lições anteriores para recuperar corações ou use a recarga gratuita de treino.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refillHeartsForFree}
              className="px-6 py-3 rounded-2xl bg-[#58cc02] border-b-4 border-[#46a302] hover:bg-[#61e002] active:translate-y-1 active:border-b-0 text-white font-black text-sm uppercase cursor-pointer shadow-md"
            >
              Recarregar Vidas Grátis
            </button>
            <button
              onClick={exitLesson}
              className="px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 border-b-4 hover:bg-gray-100 dark:hover:bg-slate-750 text-gray-700 dark:text-slate-200 font-bold text-sm cursor-pointer shadow-sm"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer className={`fixed bottom-0 left-0 right-0 border-t-2 transition-colors duration-200 z-40 ${
      !answerChecked
        ? 'bg-white dark:bg-[#111923] border-gray-200 dark:border-slate-800 py-6'
        : isCorrectAnswer
        ? 'bg-[#d7ffb8] dark:bg-[#112d19] border-[#58cc02] dark:border-[#58cc02] py-6'
        : 'bg-[#ffdfe0] dark:bg-[#30161b] border-[#ff4b4b] dark:border-[#ff4b4b] py-6'
    }`}>
      <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Banner de Feedback (Acertou / Errou) */}
        <AnimatePresence>
          {answerChecked && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-4 w-full sm:w-auto"
            >
              {isCorrectAnswer ? (
                <>
                  <div className="p-2 bg-white dark:bg-[#1a4425] rounded-full text-[#58cc02] shadow-sm">
                    <CheckCircle className="w-8 h-8 fill-[#58cc02] text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#58a700] dark:text-[#6ee7b7]">Mandou bem!</h3>
                    <p className="text-sm font-semibold text-gray-700 dark:text-emerald-100">
                      {currentChallenge.payload.explanation || 'Resposta absolutamente correta!'}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2 bg-white dark:bg-[#4c1d24] rounded-full text-[#ff4b4b] shadow-sm">
                    <XCircle className="w-8 h-8 fill-[#ff4b4b] text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#ea2b2b] dark:text-[#fca5a5]">Não foi dessa vez</h3>
                    <p className="text-sm font-semibold text-gray-700 dark:text-rose-100">
                      {currentChallenge.payload.explanation || 'Revise a sintaxe e tente novamente!'}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botão de Ação (Verificar ou Continuar) */}
        <div className="w-full sm:w-auto flex justify-end">
          {!answerChecked ? (
            <button
              onClick={handleVerify}
              disabled={!isOptionSelected}
              className={`w-full sm:w-48 py-3.5 px-6 rounded-2xl font-black text-base uppercase tracking-wider transition-all cursor-pointer ${
                isOptionSelected
                  ? 'btn-duo-primary shadow-md'
                  : 'bg-gray-200 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border-2 border-gray-300 dark:border-slate-700 cursor-not-allowed'
              }`}
            >
              Verificar
            </button>
          ) : (
            <button
              onClick={nextChallenge}
              className={`w-full sm:w-48 py-3.5 px-6 rounded-2xl font-black text-base uppercase tracking-wider cursor-pointer shadow-md ${
                isCorrectAnswer
                  ? 'btn-duo-primary'
                  : 'btn-duo-danger'
              }`}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </footer>
  );
};
