import { Course, LeaderboardUser, ShopItem, UserProfile } from '../types';

export const initialProfile: UserProfile = {
  id: 'user_local_1',
  email: 'dev@devlingo.com',
  username: 'JuniorDev',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=JuniorDev',
  xp: 140,
  gems: 450,
  hearts: 5,
  maxHearts: 5,
  currentStreak: 3,
  highestStreak: 7,
  lastActiveDate: new Date().toISOString().split('T')[0],
  league: 'Prata',
  completedLessonIds: ['py-u1-l1'],
  streakFreezeCount: 1,
};

export const coursesData: Course[] = [
  {
    id: 'course-python',
    title: 'Python do Zero',
    slug: 'python',
    language: 'python',
    icon: '🐍',
    description: 'Aprenda a linguagem mais amigável do mundo da tecnologia, passo a passo.',
    units: [
      {
        id: 'py-unit-1',
        courseId: 'course-python',
        title: 'Unidade 1: Primeiros Passos',
        description: 'Imprima mensagens, guarde valores em variáveis e faça cálculos.',
        color: '#58CC02', // Verde
        order: 1,
        lessons: [
          {
            id: 'py-u1-l1',
            unitId: 'py-unit-1',
            title: 'O Comando print()',
            description: 'Aprenda a exibir mensagens na tela.',
            order: 1,
            xpReward: 20,
            challenges: [
              {
                id: 'ch-py-1',
                lessonId: 'py-u1-l1',
                type: 'MULTIPLE_CHOICE',
                order: 1,
                payload: {
                  question: 'Qual função em Python é usada para exibir texto no terminal?',
                  options: [
                    { id: 'opt-1', text: 'echo("Olá")', isCorrect: false },
                    { id: 'opt-2', text: 'print("Olá")', isCorrect: true },
                    { id: 'opt-3', text: 'console.log("Olá")', isCorrect: false },
                    { id: 'opt-4', text: 'display("Olá")', isCorrect: false },
                  ],
                  explanation: 'Em Python, a função nativa `print()` é responsável por enviar dados para a saída padrão (tela).'
                }
              },
              {
                id: 'ch-py-2',
                lessonId: 'py-u1-l1',
                type: 'FILL_BLANK',
                order: 2,
                payload: {
                  instruction: 'Complete o código para exibir "DevLingo" na tela.',
                  codeTemplate: '___("DevLingo")',
                  blankPlaceholder: '___',
                  options: ['print', 'input', 'show', 'write'],
                  correctAnswer: 'print',
                  explanation: 'Usamos `print` seguido de parênteses e aspas com o texto desejado.'
                }
              },
              {
                id: 'ch-py-3',
                lessonId: 'py-u1-l1',
                type: 'PARSONS',
                order: 3,
                payload: {
                  instruction: 'Ordene os blocos para exibir uma saudação completa em 2 linhas.',
                  initialBlocks: [
                    { id: 'b2', code: 'print("Bem-vindo ao DevLingo!")' },
                    { id: 'b1', code: 'print("Olá, Desenvolvedor!")' },
                  ],
                  correctOrder: ['b1', 'b2'],
                  explanation: 'O programa executa de cima para baixo. Primeiro dizemos "Olá" e depois "Bem-vindo".'
                }
              },
              {
                id: 'ch-py-4',
                lessonId: 'py-u1-l1',
                type: 'CODE_RUNNER',
                order: 4,
                payload: {
                  instruction: 'Escreva um código que imprima exatamente a mensagem "Codar é incrível!"',
                  initialCode: '# Escreva seu código abaixo:\n',
                  expectedOutput: 'Codar é incrível!',
                  testCases: [
                    { expected: 'Codar é incrível!', description: 'Exibe a mensagem esperada' }
                  ],
                  language: 'python',
                  explanation: 'Parabéns! Você usou `print("Codar é incrível!")` com sucesso!'
                }
              }
            ]
          },
          {
            id: 'py-u1-l2',
            unitId: 'py-unit-1',
            title: 'Variáveis e Dados',
            description: 'Armazene nomes, números e informações.',
            order: 2,
            xpReward: 25,
            challenges: [
              {
                id: 'ch-py-5',
                lessonId: 'py-u1-l2',
                type: 'MULTIPLE_CHOICE',
                order: 1,
                payload: {
                  question: 'Como criamos uma variável chamada `pontos` com valor 100 em Python?',
                  options: [
                    { id: 'opt-1', text: 'var pontos = 100', isCorrect: false },
                    { id: 'opt-2', text: 'pontos = 100', isCorrect: true },
                    { id: 'opt-3', text: 'int pontos := 100;', isCorrect: false },
                    { id: 'opt-4', text: 'set pontos to 100', isCorrect: false },
                  ],
                  explanation: 'Em Python, não usamos palavras-chave como `var` ou `let`. Basta o nome da variável, o sinal `=` e o valor.'
                }
              },
              {
                id: 'ch-py-6',
                lessonId: 'py-u1-l2',
                type: 'SPOT_BUG',
                order: 2,
                payload: {
                  instruction: 'Toque na linha que contém o erro de sintaxe:',
                  lines: [
                    { lineNumber: 1, code: 'nome = "Alice"', isBug: false },
                    { lineNumber: 2, code: 'idade = 25', isBug: false },
                    { lineNumber: 3, code: 'print(nome', isBug: true },
                  ],
                  bugLineNumber: 3,
                  correction: 'print(nome)',
                  explanation: 'Faltava fechar o parêntese `)` na função print!'
                }
              },
              {
                id: 'ch-py-7',
                lessonId: 'py-u1-l2',
                type: 'PARSONS',
                order: 3,
                payload: {
                  instruction: 'Ordene o código para criar a variável `nivel` e depois exibi-la.',
                  initialBlocks: [
                    { id: 'b2', code: 'print(nivel)' },
                    { id: 'b1', code: 'nivel = 5' },
                  ],
                  correctOrder: ['b1', 'b2'],
                  explanation: 'Uma variável precisa ser criada/definida antes de podermos imprimi-la.'
                }
              }
            ]
          },
          {
            id: 'py-u1-l3',
            unitId: 'py-unit-1',
            title: 'Operações Matemáticas',
            description: 'Some, subtraia e multiplique valores.',
            order: 3,
            xpReward: 30,
            challenges: [
              {
                id: 'ch-py-8',
                lessonId: 'py-u1-l3',
                type: 'FILL_BLANK',
                order: 1,
                payload: {
                  instruction: 'Complete para somar 15 + 25 e exibir o resultado.',
                  codeTemplate: 'total = 15 ___ 25\nprint(total)',
                  blankPlaceholder: '___',
                  options: ['+', '*', 'sum', '&'],
                  correctAnswer: '+',
                  explanation: 'O operador `+` realiza a soma aritmética entre números.'
                }
              },
              {
                id: 'ch-py-9',
                lessonId: 'py-u1-l3',
                type: 'CODE_RUNNER',
                order: 2,
                payload: {
                  instruction: 'Crie uma variável `vidas = 5`, subtraia 1 e imprima o novo valor de `vidas`.',
                  initialCode: 'vidas = 5\nvidas = vidas - 1\n# imprima vidas:\n',
                  expectedOutput: '4',
                  testCases: [
                    { expected: '4', description: 'Resultado 4 impresso' }
                  ],
                  language: 'python',
                  explanation: 'Excelente! 5 - 1 = 4.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'py-unit-2',
        courseId: 'course-python',
        title: 'Unidade 2: Tomando Decisões',
        description: 'Ensine o computador a escolher caminhos com if e else.',
        color: '#1CB0F6', // Azul
        order: 2,
        lessons: [
          {
            id: 'py-u2-l1',
            unitId: 'py-unit-2',
            title: 'Comparações (==, !=, >, <)',
            description: 'Verifique se valores são iguais ou diferentes.',
            order: 1,
            xpReward: 25,
            challenges: [
              {
                id: 'ch-py-10',
                lessonId: 'py-u2-l1',
                type: 'MULTIPLE_CHOICE',
                order: 1,
                payload: {
                  question: 'Qual operador verifica se dois valores são IGUAIS em Python?',
                  options: [
                    { id: 'opt-1', text: '=', isCorrect: false },
                    { id: 'opt-2', text: '==', isCorrect: true },
                    { id: 'opt-3', text: 'equals', isCorrect: false },
                    { id: 'opt-4', text: '===', isCorrect: false },
                  ],
                  explanation: 'Em Python, `=` é atribuição e `==` é comparação de igualdade.'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'course-javascript',
    title: 'JavaScript Moderno',
    slug: 'javascript',
    language: 'javascript',
    icon: '⚡',
    description: 'Domine a linguagem que move a web moderna e crie aplicações dinâmicas.',
    units: [
      {
        id: 'js-unit-1',
        courseId: 'course-javascript',
        title: 'Unidade 1: O Início no JS',
        description: 'Console, constantes, variáveis e tipos fundamentais.',
        color: '#FFC800', // Amarelo
        order: 1,
        lessons: [
          {
            id: 'js-u1-l1',
            unitId: 'js-unit-1',
            title: 'Console e Constantes',
            description: 'Envie mensagens ao console e declare valores fixos.',
            order: 1,
            xpReward: 20,
            challenges: [
              {
                id: 'ch-js-1',
                lessonId: 'js-u1-l1',
                type: 'MULTIPLE_CHOICE',
                order: 1,
                payload: {
                  question: 'Qual método imprime uma mensagem no console do navegador em JavaScript?',
                  options: [
                    { id: 'opt-1', text: 'console.log("Olá")', isCorrect: true },
                    { id: 'opt-2', text: 'print("Olá")', isCorrect: false },
                    { id: 'opt-3', text: 'System.out.println("Olá")', isCorrect: false },
                    { id: 'opt-4', text: 'echo "Olá"', isCorrect: false },
                  ],
                  explanation: 'Em JavaScript usamos `console.log()` para imprimir no terminal ou DevTools.'
                }
              },
              {
                id: 'ch-js-2',
                lessonId: 'js-u1-l1',
                type: 'CODE_RUNNER',
                order: 2,
                payload: {
                  instruction: 'Declare `const dev = "Frontend";` e imprima `dev` com `console.log(dev);`',
                  initialCode: '// Seu código JavaScript:\n',
                  expectedOutput: 'Frontend',
                  testCases: [
                    { expected: 'Frontend', description: 'Imprime Frontend' }
                  ],
                  language: 'javascript',
                  explanation: 'Muito bem! Em JS, `const` define variáveis de valor constante.'
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

export const leaderboardMock: LeaderboardUser[] = [
  { id: 'u-1', username: 'Lucas_Code', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Lucas', xp: 520, rank: 1 },
  { id: 'u-2', username: 'Beatriz_JS', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Beatriz', xp: 480, rank: 2 },
  { id: 'u-3', username: 'JuniorDev', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=JuniorDev', xp: 140, isCurrentUser: true, rank: 3 },
  { id: 'u-4', username: 'Gustavo_Py', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Gustavo', xp: 120, rank: 4 },
  { id: 'u-5', username: 'Ana_Tech', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Ana', xp: 95, rank: 5 },
  { id: 'u-6', username: 'Pedro_Fullstack', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Pedro', xp: 70, rank: 6 },
  { id: 'u-7', username: 'Mariana_Dev', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Mariana', xp: 45, rank: 7 },
];

export const shopItems: ShopItem[] = [
  {
    id: 'heart-refill',
    title: 'Recarga de Vidas',
    description: 'Restaure todos os seus 5 corações instantaneamente para não parar de codar.',
    icon: '❤️',
    costGems: 150,
    type: 'HEART_REFILL'
  },
  {
    id: 'streak-freeze',
    title: 'Bloqueio de Sequência (Freeze)',
    description: 'Protege seu streak de chamas 🔥 caso você fique 1 dia sem praticar.',
    icon: '🧊',
    costGems: 200,
    type: 'STREAK_FREEZE'
  },
  {
    id: 'dev-avatar-cyber',
    title: 'Avatar Cyber Hacker',
    description: 'Desbloqueie uma skin cibernética exclusiva para seu perfil.',
    icon: '🤖',
    costGems: 300,
    type: 'DEV_AVATAR'
  },
  {
    id: 'pro-theme-dracula',
    title: 'Tema Dracula IDE',
    description: 'Personalize o visual do seu Code Runner com o clássico tema Dracula.',
    icon: '🧛',
    costGems: 400,
    type: 'PRO_THEME'
  }
];
