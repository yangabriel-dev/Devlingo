import React from 'react';
import { NavLink } from 'react-router-dom';
import { DevLingoMascot } from '../mascot/DevLingoMascot';
import { GraduationCap, Trophy, ShoppingBag, User } from 'lucide-react';
import { soundManager } from '../../lib/audio';

export const Sidebar: React.FC = () => {
  const navItems = [
    { label: 'APRENDER', path: '/', icon: GraduationCap },
    { label: 'LIGAS', path: '/leaderboard', icon: Trophy },
    { label: 'LOJA', path: '/shop', icon: ShoppingBag },
    { label: 'PERFIL', path: '/profile', icon: User },
  ];

  return (
    <aside className="w-64 border-r-2 border-gray-200 dark:border-slate-800 bg-white dark:bg-[#111923] min-h-screen p-4 flex flex-col justify-between hidden md:flex shrink-0 transition-colors duration-200">
      <div>
        {/* Logo DevLingo */}
        <div className="flex items-center gap-3 px-4 py-4 mb-6">
          <DevLingoMascot mood="happy" size="sm" />
          <span className="text-2xl font-black tracking-tight text-[#58cc02]">
            dev<span className="text-[#1cb0f6]">lingo</span>
          </span>
        </div>

        {/* Menu de Navegação */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => soundManager.playClick()}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-black text-sm tracking-wider transition-all border-2 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-sky-950/40 border-[#1cb0f6] text-[#1cb0f6]'
                      : 'border-transparent text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-850 dark:hover:text-slate-200'
                  }`
                }
              >
                <Icon className="w-6 h-6 stroke-[2.5]" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer do Sidebar */}
      <div className="p-4 bg-gray-50 dark:bg-slate-800/60 rounded-2xl border border-gray-200 dark:border-slate-800 text-xs text-gray-500 dark:text-slate-400 font-bold text-center">
        <p>DevLingo v1.0</p>
        <p className="text-gray-400 dark:text-slate-500 font-semibold mt-1">Code every day. 🚀</p>
      </div>
    </aside>
  );
};
