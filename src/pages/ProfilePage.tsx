import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { isSupabaseConfigured } from '../lib/supabase';
import { Flame, Zap, Shield, Heart, Award, Database, CheckCircle2 } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user } = useGameStore();

  const achievements = [
    {
      id: 'ach-1',
      title: 'Primeiro Hello World',
      description: 'Concluiu seu primeiro desafio de código com sucesso.',
      icon: '🎉',
      unlocked: user.completedLessonIds.length >= 1,
    },
    {
      id: 'ach-2',
      title: 'Chama Eterna',
      description: 'Manteve uma sequência de 3 dias de estudo.',
      icon: '🔥',
      unlocked: user.currentStreak >= 3,
    },
    {
      id: 'ach-3',
      title: 'Colecionador de Gemas',
      description: 'Acumulou mais de 200 gemas.',
      icon: '💎',
      unlocked: user.gems >= 200,
    },
    {
      id: 'ach-4',
      title: 'Mestre da Sintaxe',
      description: 'Conclua todas as lições da Unidade 1 de Python.',
      icon: '🐍',
      unlocked: user.completedLessonIds.length >= 3,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header do Perfil */}
      <div className="bg-white dark:bg-[#16222f] rounded-3xl p-6 border-2 border-gray-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-6 mb-8 transition-colors duration-200">
        <img
          src={user.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
          alt={user.username}
          className="w-24 h-24 rounded-3xl bg-blue-50 dark:bg-slate-800 border-2 border-[#1cb0f6] shadow-sm"
        />

        <div className="text-center sm:text-left flex-1">
          <h1 className="text-2xl font-black text-gray-800 dark:text-slate-100">{user.username}</h1>
          <p className="text-gray-400 dark:text-slate-500 font-semibold text-sm">{user.email}</p>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-3">
            <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 border border-transparent dark:border-amber-900/40">
              <Shield className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              Liga {user.league}
            </span>
            <span className="bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 border border-transparent dark:border-green-900/40">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              {user.completedLessonIds.length} lições feitas
            </span>
          </div>
        </div>
      </div>

      {/* Estatísticas Gerais */}
      <h2 className="text-xl font-black text-gray-800 dark:text-slate-100 mb-4">Estatísticas</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <div className="bg-white dark:bg-[#16222f] p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <Flame className="w-6 h-6 fill-[#ff9600] text-[#ff9600] mb-1" />
          <span className="text-xl font-black text-gray-800 dark:text-slate-100">{user.currentStreak}</span>
          <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500">Dias de Fogo</span>
        </div>

        <div className="bg-white dark:bg-[#16222f] p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <Zap className="w-6 h-6 fill-[#ffc800] text-[#ffc800] mb-1" />
          <span className="text-xl font-black text-gray-800 dark:text-slate-100">{user.xp}</span>
          <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500">Total de XP</span>
        </div>

        <div className="bg-white dark:bg-[#16222f] p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <Shield className="w-6 h-6 fill-amber-500 text-amber-500 mb-1" />
          <span className="text-xl font-black text-gray-800 dark:text-slate-100">{user.league}</span>
          <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500">Divisão</span>
        </div>

        <div className="bg-white dark:bg-[#16222f] p-4 rounded-2xl border-2 border-gray-200 dark:border-slate-800 flex flex-col items-center text-center transition-colors">
          <Heart className="w-6 h-6 fill-[#ff4b4b] text-[#ff4b4b] mb-1" />
          <span className="text-xl font-black text-gray-800 dark:text-slate-100">{user.hearts}/5</span>
          <span className="text-[11px] font-bold text-gray-400 dark:text-slate-500">Vidas Atuais</span>
        </div>
      </div>

      {/* Conquistas / Badges */}
      <h2 className="text-xl font-black text-gray-800 dark:text-slate-100 mb-4 flex items-center gap-2">
        <Award className="w-6 h-6 text-[#ffc800]" />
        Conquistas Desbloqueadas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {achievements.map((ach) => (
          <div
            key={ach.id}
            className={`p-4 rounded-2xl border-2 flex items-center gap-3.5 transition-all ${
              ach.unlocked
                ? 'bg-white dark:bg-[#16222f] border-gray-200 dark:border-slate-800 shadow-sm'
                : 'bg-gray-100/70 dark:bg-slate-800/40 border-gray-200 dark:border-slate-800/60 opacity-60'
            }`}
          >
            <div className={`text-3xl p-2 rounded-2xl ${ach.unlocked ? 'bg-amber-50 dark:bg-amber-950/40' : 'bg-gray-200 dark:bg-slate-800 grayscale'}`}>
              {ach.icon}
            </div>
            <div>
              <h4 className="font-black text-gray-800 dark:text-slate-100 text-sm">{ach.title}</h4>
              <p className="text-gray-500 dark:text-slate-400 text-xs font-medium">{ach.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Informações do Supabase */}
      <div className="bg-emerald-50 dark:bg-emerald-950/30 rounded-3xl p-5 border-2 border-emerald-200 dark:border-emerald-900/50 transition-colors">
        <div className="flex items-center gap-3 mb-2">
          <Database className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h3 className="font-black text-emerald-900 dark:text-emerald-300 text-sm">Status do Supabase</h3>
        </div>
        <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300/90 mb-3">
          {isSupabaseConfigured
            ? 'Conectado com sucesso à nuvem Supabase (Autenticação e PostgreSQL ativos).'
            : 'Modo Offline/Local ativo. As variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY podem ser configuradas no arquivo .env.'}
        </p>
      </div>
    </div>
  );
};
