import React, { useState } from 'react';
import { CodeRunnerPayload } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { runCode } from '../../lib/codeRunner';
import { Play, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  payload: CodeRunnerPayload;
}

export const CodeRunnerChallenge: React.FC<Props> = ({ payload }) => {
  const { selectOption, answerChecked } = useGameStore();
  const [code, setCode] = useState(payload.initialCode);
  const [consoleOutput, setConsoleOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [executionPassed, setExecutionPassed] = useState<boolean | null>(null);

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const res = await runCode(code, payload.language);
      setConsoleOutput(res.output || (res.error ? `Erro: ${res.error}` : 'Nenhuma saída gerada.'));
      
      const normalizedOutput = res.output.trim();
      const expected = payload.expectedOutput.trim();
      const passed = normalizedOutput === expected;

      setExecutionPassed(passed);
      selectOption(passed ? 'CODE_PASSED' : 'CODE_FAILED');
    } catch {
      setConsoleOutput('Erro na execução do código.');
      setExecutionPassed(false);
      selectOption('CODE_FAILED');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full px-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-extrabold text-gray-800 dark:text-slate-100">
          {payload.instruction}
        </h2>
        <span className="text-xs uppercase tracking-wider font-extrabold px-2.5 py-1 bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-lg">
          {payload.language}
        </span>
      </div>

      <div className="text-sm font-semibold text-gray-500 dark:text-slate-400 mb-4">
        Saída esperada: <code className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded text-gray-800 dark:text-slate-200 font-mono font-bold border border-transparent dark:border-slate-750">{payload.expectedOutput}</code>
      </div>

      {/* Editor de Código */}
      <div className="bg-[#1e1e2e] rounded-2xl border-2 border-gray-700 overflow-hidden shadow-lg mb-4">
        <div className="bg-[#181825] px-4 py-2 flex items-center justify-between border-b border-gray-700 text-xs text-gray-400 font-mono">
          <span>main.{payload.language === 'python' ? 'py' : 'js'}</span>
          <span>Editor DevLingo</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setExecutionPassed(null);
            selectOption(null);
          }}
          disabled={answerChecked}
          rows={6}
          className="w-full bg-transparent text-gray-100 font-mono text-sm p-4 outline-none resize-none"
          spellCheck={false}
          placeholder="Digite seu código aqui..."
        />
        
        <div className="bg-[#181825] px-4 py-3 border-t border-gray-700 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleRun}
            disabled={isRunning || answerChecked}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#58cc02] hover:bg-[#61e002] active:bg-[#46a302] text-white font-bold text-sm cursor-pointer shadow transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            {isRunning ? 'Executando...' : 'Testar Código'}
          </motion.button>

          {executionPassed !== null && (
            <div className="flex items-center gap-1.5 text-sm font-bold">
              {executionPassed ? (
                <span className="flex items-center gap-1 text-green-400">
                  <CheckCircle2 className="w-4 h-4" /> Testes Aprovados
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-400">
                  <XCircle className="w-4 h-4" /> Saída Incorreta
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Saída de Console */}
      {consoleOutput && (
        <div className="bg-gray-900 text-gray-200 p-3.5 rounded-2xl border border-gray-800 font-mono text-xs">
          <div className="text-gray-400 font-bold mb-1">Terminal de Saída:</div>
          <pre className="whitespace-pre-wrap">{consoleOutput}</pre>
        </div>
      )}
    </div>
  );
};
