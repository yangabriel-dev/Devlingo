import React from 'react';
import { MultipleChoicePayload } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';

interface Props {
  payload: MultipleChoicePayload;
}

export const MultipleChoiceChallenge: React.FC<Props> = ({ payload }) => {
  const { selectedOption, selectOption, answerChecked } = useGameStore();

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100 mb-6">
        {payload.question}
      </h2>

      {payload.codeSnippet && (
        <div className="bg-[#1e1e2e] text-gray-100 p-4 rounded-2xl font-mono text-sm mb-6 border-2 border-gray-700 shadow-inner overflow-x-auto">
          <pre>{payload.codeSnippet}</pre>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {payload.options.map((option, index) => {
          const isSelected = selectedOption === option.id;
          let btnClass = 'bg-white dark:bg-[#16222f] border-2 border-gray-200 dark:border-slate-800 border-b-4 border-b-gray-300 dark:border-b-slate-900 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-800/80';

          if (isSelected) {
            btnClass = 'bg-blue-50 dark:bg-sky-950/50 border-2 border-[#1cb0f6] border-b-4 border-b-[#1899d6] text-[#1899d6] dark:text-[#38bdf8]';
          }

          return (
            <motion.button
              key={option.id}
              whileTap={!answerChecked ? { scale: 0.98, y: 2 } : {}}
              onClick={() => selectOption(option.id)}
              disabled={answerChecked}
              className={`flex items-center p-4 rounded-2xl text-left font-bold text-lg cursor-pointer transition-colors shadow-sm ${btnClass}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 text-sm font-black border ${
                isSelected ? 'bg-[#1cb0f6] text-white border-[#1899d6]' : 'bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 border-gray-300 dark:border-slate-700'
              }`}>
                {index + 1}
              </span>
              <span className="font-mono text-base">{option.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
