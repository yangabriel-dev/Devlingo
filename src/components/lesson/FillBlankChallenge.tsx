import React from 'react';
import { FillBlankPayload } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';

interface Props {
  payload: FillBlankPayload;
}

export const FillBlankChallenge: React.FC<Props> = ({ payload }) => {
  const { selectedOption, selectOption, answerChecked } = useGameStore();

  const parts = payload.codeTemplate.split(payload.blankPlaceholder);

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100 mb-2">
        {payload.instruction}
      </h2>
      <p className="text-gray-500 dark:text-slate-400 font-medium mb-6">
        Selecione a opção correta para preencher o espaço em branco:
      </p>

      {/* Snippet de Código com a Lacuna Interativa */}
      <div className="bg-[#1e1e2e] text-gray-100 p-6 rounded-3xl font-mono text-lg mb-8 border-2 border-gray-700 shadow-inner flex flex-wrap items-center gap-2">
        <span>{parts[0]}</span>
        <span className={`inline-flex items-center justify-center min-w-[80px] px-3 py-1 rounded-xl font-bold border-2 transition-all ${
          selectedOption
            ? 'bg-[#1cb0f6] text-white border-[#1899d6] shadow'
            : 'bg-gray-800 text-gray-400 border-dashed border-gray-500'
        }`}>
          {selectedOption || '___'}
        </span>
        {parts[1] && <span>{parts[1]}</span>}
      </div>

      {/* Opções de Tokens */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {payload.options.map((opt) => {
          const isSelected = selectedOption === opt;
          return (
            <motion.button
              key={opt}
              whileTap={!answerChecked ? { scale: 0.95, y: 2 } : {}}
              onClick={() => selectOption(opt)}
              disabled={answerChecked}
              className={`px-6 py-3 rounded-2xl font-mono font-black text-lg cursor-pointer transition-all border-2 border-b-4 ${
                isSelected
                  ? 'bg-blue-50 dark:bg-sky-950/50 text-[#1cb0f6] dark:text-[#38bdf8] border-[#1cb0f6] border-b-[#1899d6]'
                  : 'bg-white dark:bg-[#16222f] text-gray-800 dark:text-slate-100 border-gray-200 dark:border-slate-800 border-b-gray-300 dark:border-b-slate-900 hover:border-gray-400 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
