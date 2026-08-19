import React from 'react';
import { SpotBugPayload } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface Props {
  payload: SpotBugPayload;
}

export const SpotBugChallenge: React.FC<Props> = ({ payload }) => {
  const { selectedOption, selectOption, answerChecked } = useGameStore();

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full px-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-red-100 dark:bg-rose-950/60 text-red-500 dark:text-rose-400 rounded-xl">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100">
          {payload.instruction}
        </h2>
      </div>

      <p className="text-gray-500 dark:text-slate-400 font-medium mb-6">
        Identifique a linha que impede o código de funcionar corretamente:
      </p>

      {/* Editor Interativo de Linhas */}
      <div className="bg-[#1e1e2e] text-gray-100 p-4 rounded-3xl font-mono text-base mb-6 border-2 border-gray-700 shadow-inner flex flex-col gap-2">
        {payload.lines.map((line) => {
          const isSelected = selectedOption === String(line.lineNumber);
          
          return (
            <motion.div
              key={line.lineNumber}
              whileHover={!answerChecked ? { x: 4 } : {}}
              onClick={() => {
                if (!answerChecked) {
                  selectOption(String(line.lineNumber));
                }
              }}
              className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border ${
                isSelected
                  ? 'bg-red-500/20 border-red-400 text-red-200'
                  : 'hover:bg-gray-800/80 border-transparent text-gray-300'
              }`}
            >
              <span className="text-xs text-gray-500 w-6 select-none font-sans font-bold">
                {line.lineNumber}
              </span>
              <span className="flex-1 font-semibold">{line.code}</span>
              {isSelected && (
                <span className="text-xs bg-red-500 text-white font-bold px-2 py-0.5 rounded-full font-sans">
                  Bug aqui?
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
