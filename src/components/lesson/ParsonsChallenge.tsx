import React, { useState, useEffect } from 'react';
import { ParsonsPayload } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { soundManager } from '../../lib/audio';

interface Props {
  payload: ParsonsPayload;
}

export const ParsonsChallenge: React.FC<Props> = ({ payload }) => {
  const { selectOption, answerChecked } = useGameStore();

  // Banco de blocos disponíveis e blocos colocados na resposta
  const [availableBlocks, setAvailableBlocks] = useState(payload.initialBlocks);
  const [placedBlocks, setPlacedBlocks] = useState<{ id: string; code: string }[]>([]);

  // Quando os blocos montados mudam, envia a resposta serializada para a store
  useEffect(() => {
    if (placedBlocks.length === payload.correctOrder.length) {
      const isCorrect = placedBlocks.map(b => b.id).join(',') === payload.correctOrder.join(',');
      selectOption(isCorrect ? 'CORRECT' : 'INCORRECT');
    } else {
      selectOption(null);
    }
  }, [placedBlocks, payload.correctOrder, selectOption]);

  const handlePickBlock = (block: { id: string; code: string }) => {
    if (answerChecked) return;
    soundManager.playClick();
    setAvailableBlocks(prev => prev.filter(b => b.id !== block.id));
    setPlacedBlocks(prev => [...prev, block]);
  };

  const handleRemoveBlock = (block: { id: string; code: string }) => {
    if (answerChecked) return;
    soundManager.playClick();
    setPlacedBlocks(prev => prev.filter(b => b.id !== block.id));
    setAvailableBlocks(prev => [...prev, block]);
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full px-4">
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-slate-100 mb-2">
        {payload.instruction}
      </h2>
      <p className="text-gray-500 dark:text-slate-400 font-medium mb-6">
        Toque nos blocos abaixo para colocá-los na ordem de execução correta:
      </p>

      {/* Área de Resposta (Código montado) */}
      <div className="min-h-[160px] bg-gray-100 dark:bg-slate-900/80 rounded-3xl p-4 border-2 border-dashed border-gray-300 dark:border-slate-700 mb-6 flex flex-col gap-2 transition-colors">
        {placedBlocks.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 dark:text-slate-500 font-bold text-sm">
            Toque nos blocos abaixo para montar o código aqui
          </div>
        ) : (
          <AnimatePresence>
            {placedBlocks.map((block, idx) => (
              <motion.button
                key={block.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => handleRemoveBlock(block)}
                disabled={answerChecked}
                className="w-full text-left bg-white dark:bg-slate-800 border-2 border-[#1cb0f6] border-b-4 border-b-[#1899d6] text-[#1899d6] dark:text-[#38bdf8] font-mono font-bold text-base px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer"
              >
                <span>{block.code}</span>
                <span className="text-xs bg-blue-100 dark:bg-sky-950 text-blue-700 dark:text-sky-300 px-2 py-0.5 rounded-full font-sans border border-transparent dark:border-sky-800">
                  Linha {idx + 1}
                </span>
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </div>

      <div className="flex items-center justify-center mb-4 text-gray-400 dark:text-slate-500">
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </div>

      {/* Banco de blocos disponíveis */}
      <div className="flex flex-col gap-2.5">
        {availableBlocks.map((block) => (
          <motion.button
            key={block.id}
            whileTap={!answerChecked ? { scale: 0.98, y: 2 } : {}}
            onClick={() => handlePickBlock(block)}
            disabled={answerChecked}
            className="w-full text-left bg-white dark:bg-[#16222f] border-2 border-gray-200 dark:border-slate-800 border-b-4 border-b-gray-300 dark:border-b-slate-900 hover:border-gray-400 dark:hover:border-slate-700 text-gray-800 dark:text-slate-100 font-mono font-bold text-base px-4 py-3 rounded-2xl cursor-pointer shadow-sm transition-all"
          >
            {block.code}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
