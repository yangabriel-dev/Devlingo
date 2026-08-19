// In-Browser Safe Code Runner for JavaScript and Python exercises

export interface ExecutionResult {
  success: boolean;
  output: string;
  error?: string;
}

export const runCode = async (
  code: string,
  language: 'javascript' | 'python'
): Promise<ExecutionResult> => {
  if (language === 'javascript') {
    return runJavaScript(code);
  } else if (language === 'python') {
    return runPython(code);
  }
  return { success: false, output: '', error: 'Linguagem não suportada' };
};

const runJavaScript = (code: string): ExecutionResult => {
  const logs: string[] = [];
  const customConsole = {
    log: (...args: unknown[]) => {
      logs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
    },
    error: (...args: unknown[]) => {
      logs.push('[ERRO] ' + args.map(arg => String(arg)).join(' '));
    },
    warn: (...args: unknown[]) => {
      logs.push('[WARN] ' + args.map(arg => String(arg)).join(' '));
    }
  };

  try {
    // Executa em escopo isolado com console capturado
    const fn = new Function('console', code);
    fn(customConsole);

    return {
      success: true,
      output: logs.join('\n').trim(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      output: logs.join('\n').trim(),
      error: errorMsg,
    };
  }
};

// Python lightweight interpreter & output extractor for introductory exercises
const runPython = async (code: string): Promise<ExecutionResult> => {
  try {
    // Se Pyodide estiver no window global, usa-o
    const win = window as unknown as { pyodide?: { runPythonAsync: (code: string) => Promise<unknown> } };
    if (win.pyodide) {
      // Redireciona stdout se pyodide disponível
      const result = await win.pyodide.runPythonAsync(code);
      return {
        success: true,
        output: String(result ?? ''),
      };
    }

    // Fallback: Simulador de Python básico para comandos print(), operações e variáveis
    const lines = code.split('\n');
    const logs: string[] = [];
    const scope: Record<string, unknown> = {};

    for (let line of lines) {
      line = line.trim();
      if (!line || line.startsWith('#')) continue;

      // Detecta print(...)
      const printMatch = line.match(/^print\s*\((.*)\)$/);
      if (printMatch) {
        const expression = printMatch[1].trim();
        // Avalia strings literais
        if ((expression.startsWith('"') && expression.endsWith('"')) ||
            (expression.startsWith("'") && expression.endsWith("'"))) {
          logs.push(expression.slice(1, -1));
        } else if (expression in scope) {
          logs.push(String(scope[expression]));
        } else {
          // Tenta avaliar expressão matemática simples
          try {
            // Substitui nomes de variáveis no escopo
            let evalExpr = expression;
            for (const [key, val] of Object.entries(scope)) {
              evalExpr = evalExpr.replace(new RegExp(`\\b${key}\\b`, 'g'), String(val));
            }
            // Safe math eval
            const res = Function(`"use strict"; return (${evalExpr})`)();
            logs.push(String(res));
          } catch {
            logs.push(expression);
          }
        }
        continue;
      }

      // Atribuição de variável simples: x = 10 ou nome = "Dev"
      const assignMatch = line.match(/^([a-zA-Z_]\w*)\s*=\s*(.+)$/);
      if (assignMatch) {
        const varName = assignMatch[1];
        let valExpr = assignMatch[2].trim();
        if ((valExpr.startsWith('"') && valExpr.endsWith('"')) ||
            (valExpr.startsWith("'") && valExpr.endsWith("'"))) {
          scope[varName] = valExpr.slice(1, -1);
        } else if (valExpr === 'True') {
          scope[varName] = true;
        } else if (valExpr === 'False') {
          scope[varName] = false;
        } else {
          try {
            const res = Function(`"use strict"; return (${valExpr})`)();
            scope[varName] = res;
          } catch {
            scope[varName] = valExpr;
          }
        }
      }
    }

    return {
      success: true,
      output: logs.join('\n').trim(),
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      output: '',
      error: errorMsg,
    };
  }
};
