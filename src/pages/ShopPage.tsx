import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { shopItems } from '../data/mockData';
import { Gem, Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const ShopPage: React.FC = () => {
  const { user, buyHeartRefill, buyStreakFreeze } = useGameStore();
  const [notification, setNotification] = useState<string | null>(null);

  const handleBuy = (itemId: string) => {
    let success = false;

    if (itemId === 'heart-refill') {
      if (user.hearts >= user.maxHearts) {
        setNotification('Seus corações já estão cheios! ❤️');
        return;
      }
      success = buyHeartRefill();
    } else if (itemId === 'streak-freeze') {
      success = buyStreakFreeze();
    } else {
      setNotification('Item cosmético em breve!');
      return;
    }

    if (success) {
      setNotification('Compra realizada com sucesso! 🎉');
    } else {
      setNotification('Gemas insuficientes! Complete mais lições para ganhar gemas. 💎');
    }

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Saldo de Gemas */}
      <div className="bg-gradient-to-r from-blue-400 to-[#1cb0f6] rounded-3xl p-6 text-white flex items-center justify-between shadow-lg mb-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-blue-100">Seu Saldo DevLingo</span>
          <h1 className="text-3xl font-black flex items-center gap-2 mt-1">
            <Gem className="w-8 h-8 fill-white" />
            {user.gems} Gemas
          </h1>
        </div>
        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
          <Sparkles className="w-8 h-8 text-yellow-300" />
        </div>
      </div>

      {/* Notificação Temporária */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 text-white font-bold text-sm px-4 py-3 rounded-2xl mb-6 text-center shadow-lg"
        >
          {notification}
        </motion.div>
      )}

      {/* Itens da Loja */}
      <div className="flex flex-col gap-4">
        {shopItems.map((item) => {
          const isHeartItem = item.type === 'HEART_REFILL';
          const isFullHearts = isHeartItem && user.hearts >= user.maxHearts;

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#16222f] rounded-3xl p-5 border-2 border-gray-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-200"
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="text-4xl p-3 bg-gray-50 dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-slate-700 shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 dark:text-slate-100 text-lg">{item.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-xs font-semibold max-w-sm mt-0.5">
                    {item.description}
                  </p>
                  {item.type === 'STREAK_FREEZE' && user.streakFreezeCount > 0 && (
                    <span className="inline-block mt-2 text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-sky-950/60 px-2 py-0.5 rounded-md">
                      Você possui: {user.streakFreezeCount} ativo
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleBuy(item.id)}
                disabled={isFullHearts}
                className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-black text-sm uppercase flex items-center justify-center gap-2 cursor-pointer transition-all shadow-sm ${
                  isFullHearts
                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 border-2 border-gray-200 dark:border-slate-700 cursor-not-allowed'
                    : 'btn-duo-secondary'
                }`}
              >
                {isFullHearts ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    Cheio
                  </>
                ) : (
                  <>
                    <Gem className="w-4 h-4 fill-white" />
                    <span>{item.costGems}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
