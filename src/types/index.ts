export type ChallengeType = 
  | 'MULTIPLE_CHOICE'
  | 'PARSONS'
  | 'FILL_BLANK'
  | 'CODE_RUNNER'
  | 'SPOT_BUG';

export interface MultipleChoicePayload {
  question: string;
  codeSnippet?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface ParsonsPayload {
  instruction: string;
  initialBlocks: {
    id: string;
    code: string;
    indent?: number;
  }[];
  correctOrder: string[]; // array de IDs na ordem correta
  explanation: string;
}

export interface FillBlankPayload {
  instruction: string;
  codeTemplate: string; // Ex: 'def somar(a, b):\n    return a ___ b'
  blankPlaceholder: string;
  options: string[]; // Ex: ['+', '-', '*', '/']
  correctAnswer: string;
  explanation: string;
}

export interface CodeRunnerPayload {
  instruction: string;
  initialCode: string;
  solutionCode?: string;
  expectedOutput: string;
  testCases: {
    input?: string;
    expected: string;
    description: string;
  }[];
  language: 'javascript' | 'python';
  explanation: string;
}

export interface SpotBugPayload {
  instruction: string;
  lines: {
    lineNumber: number;
    code: string;
    isBug: boolean;
  }[];
  bugLineNumber: number;
  correction: string;
  explanation: string;
}

export interface Challenge {
  id: string;
  lessonId: string;
  type: ChallengeType;
  order: number;
  payload: MultipleChoicePayload | ParsonsPayload | FillBlankPayload | CodeRunnerPayload | SpotBugPayload;
}

export interface Lesson {
  id: string;
  unitId: string;
  title: string;
  description: string;
  order: number;
  xpReward: number;
  challenges: Challenge[];
}

export interface Unit {
  id: string;
  courseId: string;
  title: string;
  description: string;
  color: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  language: 'python' | 'javascript' | 'typescript' | 'sql' | 'rust';
  icon: string;
  description: string;
  units: Unit[];
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  currentStreak: number;
  highestStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  league: 'Bronze' | 'Prata' | 'Ouro' | 'Safira' | 'Diamante';
  completedLessonIds: string[];
  streakFreezeCount: number;
}

export interface LeaderboardUser {
  id: string;
  username: string;
  avatarUrl?: string;
  xp: number;
  isCurrentUser?: boolean;
  rank: number;
}

export interface ShopItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  costGems: number;
  type: 'HEART_REFILL' | 'STREAK_FREEZE' | 'DEV_AVATAR' | 'PRO_THEME';
}
