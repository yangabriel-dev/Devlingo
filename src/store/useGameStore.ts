import { create } from 'zustand';
import { Course, Lesson, UserProfile, LeaderboardUser } from '../types';
import { coursesData, initialProfile, leaderboardMock } from '../data/mockData';
import { soundManager } from '../lib/audio';

interface GameState {
  // Usuário & Progresso
  user: UserProfile;
  courses: Course[];
  currentCourseId: string;
  leaderboard: LeaderboardUser[];
  soundEnabled: boolean;
  theme: 'light' | 'dark';

  // Estado da Lição Ativa
  activeLesson: Lesson | null;
  activeChallengeIndex: number;
  lessonHearts: number;
  lessonMistakes: number;
  isLessonComplete: boolean;
  selectedOption: string | null;
  answerChecked: boolean;
  isCorrectAnswer: boolean;

  // Ações de Navegação & Configuração
  setCourse: (courseId: string) => void;
  toggleSound: () => void;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;

  // Ações de Lição
  startLesson: (lesson: Lesson) => void;
  selectOption: (optionId: string | null) => void;
  checkAnswer: (isCorrect: boolean) => void;
  nextChallenge: () => void;
  exitLesson: () => void;

  // Ações de Loja & Economia
  buyHeartRefill: () => boolean;
  buyStreakFreeze: () => boolean;
  refillHeartsForFree: () => void;
}

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('devlingo-theme') as 'light' | 'dark' | null;
    if (saved === 'light' || saved === 'dark') {
      if (saved === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return saved;
    }
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      return 'dark';
    }
  }
  return 'light';
};

const initialTheme = getInitialTheme();

export const useGameStore = create<GameState>((set, get) => ({
  user: initialProfile,
  courses: coursesData,
  currentCourseId: 'course-python',
  leaderboard: leaderboardMock,
  soundEnabled: true,
  theme: initialTheme,

  activeLesson: null,
  activeChallengeIndex: 0,
  lessonHearts: 5,
  lessonMistakes: 0,
  isLessonComplete: false,
  selectedOption: null,
  answerChecked: false,
  isCorrectAnswer: false,

  setCourse: (courseId) => set({ currentCourseId: courseId }),

  toggleSound: () => {
    const current = get().soundEnabled;
    soundManager.enabled = !current;
    set({ soundEnabled: !current });
  },

  toggleTheme: () => {
    const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
    soundManager.playClick();
    if (typeof window !== 'undefined') {
      localStorage.setItem('devlingo-theme', nextTheme);
      if (nextTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme: nextTheme });
  },

  setTheme: (theme: 'light' | 'dark') => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devlingo-theme', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    set({ theme });
  },

  startLesson: (lesson) => {
    soundManager.playClick();
    set({
      activeLesson: lesson,
      activeChallengeIndex: 0,
      lessonHearts: get().user.hearts,
      lessonMistakes: 0,
      isLessonComplete: false,
      selectedOption: null,
      answerChecked: false,
      isCorrectAnswer: false,
    });
  },

  selectOption: (optionId) => {
    if (!get().answerChecked) {
      soundManager.playClick();
      set({ selectedOption: optionId });
    }
  },

  checkAnswer: (isCorrect) => {
    if (get().answerChecked) return;

    if (isCorrect) {
      soundManager.playCorrect();
      set({
        answerChecked: true,
        isCorrectAnswer: true,
      });
    } else {
      soundManager.playIncorrect();
      const newHearts = Math.max(0, get().lessonHearts - 1);
      
      // Atualiza também os corações no perfil do usuário
      set((state) => ({
        answerChecked: true,
        isCorrectAnswer: false,
        lessonHearts: newHearts,
        lessonMistakes: state.lessonMistakes + 1,
        user: { ...state.user, hearts: newHearts },
      }));
    }
  },

  nextChallenge: () => {
    const { activeLesson, activeChallengeIndex, user } = get();
    if (!activeLesson) return;

    const nextIndex = activeChallengeIndex + 1;

    if (nextIndex < activeLesson.challenges.length) {
      soundManager.playClick();
      set({
        activeChallengeIndex: nextIndex,
        selectedOption: null,
        answerChecked: false,
        isCorrectAnswer: false,
      });
    } else {
      // Lição Concluída com Sucesso!
      soundManager.playVictory();
      const xpGained = activeLesson.xpReward;
      const gemsGained = 15;
      
      const alreadyCompleted = user.completedLessonIds.includes(activeLesson.id);
      const updatedCompleted = alreadyCompleted
        ? user.completedLessonIds
        : [...user.completedLessonIds, activeLesson.id];

      const newXP = user.xp + xpGained;
      const newGems = user.gems + gemsGained;

      // Atualiza ranking local
      const updatedLeaderboard = get().leaderboard.map((u) =>
        u.isCurrentUser ? { ...u, xp: newXP } : u
      ).sort((a, b) => b.xp - a.xp).map((u, i) => ({ ...u, rank: i + 1 }));

      set({
        isLessonComplete: true,
        user: {
          ...user,
          xp: newXP,
          gems: newGems,
          completedLessonIds: updatedCompleted,
        },
        leaderboard: updatedLeaderboard,
      });
    }
  },

  exitLesson: () => {
    soundManager.playClick();
    set({
      activeLesson: null,
      activeChallengeIndex: 0,
      isLessonComplete: false,
      selectedOption: null,
      answerChecked: false,
      isCorrectAnswer: false,
    });
  },

  buyHeartRefill: () => {
    const { user } = get();
    const cost = 150;
    if (user.gems >= cost && user.hearts < user.maxHearts) {
      soundManager.playVictory();
      set({
        user: {
          ...user,
          gems: user.gems - cost,
          hearts: user.maxHearts,
        }
      });
      return true;
    }
    return false;
  },

  buyStreakFreeze: () => {
    const { user } = get();
    const cost = 200;
    if (user.gems >= cost) {
      soundManager.playVictory();
      set({
        user: {
          ...user,
          gems: user.gems - cost,
          streakFreezeCount: user.streakFreezeCount + 1,
        }
      });
      return true;
    }
    return false;
  },

  refillHeartsForFree: () => {
    const { user } = get();
    set({
      user: {
        ...user,
        hearts: user.maxHearts,
      }
    });
  }
}));
