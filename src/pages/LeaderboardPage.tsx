import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { Trophy, Crown, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export const LeaderboardPage: React.FC = () => {
  const { leaderboard, user } = useGameStore();

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-8 h-8 rounded-full bg-[#ffc800] text-white flex items-center justify-center font-black shadow">
            <Crown className="w-5 h-5 fill-white" />
          </div>
        );
      case 2:
        return (
          <div className="w-8 h-8 rounded-full bg-[#afafaf] text-white flex items-center justify-center font-black shadow">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-8 h-8 rounded-full bg-[#cd7f32] text-white flex items-center justify-center font-black shadow">
            3
          </div>
        );
      default:
        return (
          <span className="w-8 text-center font-black text-gray-400 text-sm">
            {rank}
          </span>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Banner da Liga */}
      <div className="bg-gradient-to-r from-amber-400 to-yellow-500 rounded-3xl p-6 text-white text-center shadow-lg mb-8 relative overflow-hidden">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-white/20 rounded-full backdrop-blur-md">
            <Trophy className="w-10 h-10 text-white fill-white" />
          </div>
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-1">
          Liga {user.league}
        </h1>
        <p className="text-amber-100 font-bold text-sm">
          Os 3 primeiros colocados sobem para a próxima divisão aos domingos!
        </p>
      </div>

      {/* Lista de Ranking */}
      <div className="bg-white dark:bg-[#16222f] rounded-3xl border-2 border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-200">
        {leaderboard.map((item, index) => {
          const isMe = item.isCurrentUser;
          const isPromotionZone = index < 3;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center justify-between p-4 border-b border-gray-100 dark:border-slate-800/80 transition-colors ${
                isMe ? 'bg-blue-50/80 dark:bg-sky-950/40 border-l-4 border-l-[#1cb0f6]' : 'hover:bg-gray-50 dark:hover:bg-slate-800/40'
              }`}
            >
              <div className="flex items-center gap-3">
                {getRankBadge(item.rank)}

                <img
                  src={item.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${item.username}`}
                  alt={item.username}
                  className="w-11 h-11 rounded-2xl bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
                />

                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-black text-base ${isMe ? 'text-[#1899d6] dark:text-[#38bdf8]' : 'text-gray-800 dark:text-slate-100'}`}>
                      {item.username}
                    </span>
                    {isMe && (
                      <span className="text-[10px] font-black uppercase bg-[#1cb0f6] text-white px-2 py-0.5 rounded-full">
                        Você
                      </span>
                    )}
                  </div>
                  {isPromotionZone && (
                    <span className="text-[11px] font-bold text-green-600 dark:text-green-400">
                      Zona de Promoção ⬆️
                    </span>
                  )}
                </div>
              </div>

              <div className="font-black text-gray-700 dark:text-slate-200 text-sm">
                {item.xp} <span className="text-gray-400 dark:text-slate-500 font-bold">XP</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 mt-6 text-gray-400 dark:text-slate-500 font-bold text-xs">
        <ShieldAlert className="w-4 h-4" />
        <span>Ranking reinicia em 3 dias, 14 horas</span>
      </div>
    </div>
  );
};
