import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { GraduationCap, Trophy, ShoppingBag, User } from 'lucide-react';
import { soundManager } from '../../lib/audio';

export const AppLayout: React.FC = () => {
  const mobileNav = [
    { label: 'Aprender', path: '/', icon: GraduationCap },
    { label: 'Ligas', path: '/leaderboard', icon: Trophy },
    { label: 'Loja', path: '/shop', icon: ShoppingBag },
    { label: 'Perfil', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#0d1520] flex flex-col md:flex-row transition-colors duration-200 text-gray-800 dark:text-slate-100">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Bottom Navigation Bar Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#111923] border-t-2 border-gray-200 dark:border-slate-800 flex justify-around py-2 z-40 transition-colors duration-200">
        {mobileNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => soundManager.playClick()}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-3 rounded-xl font-bold text-xs transition-colors ${
                  isActive ? 'text-[#1cb0f6]' : 'text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300'
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
  );
};
