import React from 'react';
import { Unit } from '../../types';
import { BookOpen } from 'lucide-react';

interface Props {
  unit: Unit;
}

export const UnitBanner: React.FC<Props> = ({ unit }) => {
  return (
    <div
      style={{ backgroundColor: unit.color }}
      className="w-full rounded-3xl p-5 md:p-6 text-white shadow-md mb-8 flex items-center justify-between relative overflow-hidden"
    >
      <div className="z-10 max-w-md">
        <h2 className="text-xl md:text-2xl font-black mb-1">
          {unit.title}
        </h2>
        <p className="text-white/90 text-sm font-semibold">
          {unit.description}
        </p>
      </div>

      <button className="z-10 flex items-center gap-2 bg-white/20 hover:bg-white/30 active:bg-white/40 px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider backdrop-blur-sm cursor-pointer transition-all border border-white/30">
        <BookOpen className="w-4 h-4" />
        Guia
      </button>

      {/* Detalhe de fundo decorativo */}
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full pointer-events-none" />
    </div>
  );
};
