import React from 'react';
import { Course } from '../../types';
import { useGameStore } from '../../store/useGameStore';
import { UnitBanner } from './UnitBanner';
import { LessonNode } from './LessonNode';

interface Props {
  course: Course;
}

export const LearningPath: React.FC<Props> = ({ course }) => {
  const { user } = useGameStore();

  // Função para calcular o deslocamento horizontal em zigue-zague estilo Duolingo
  const getZigZagOffset = (index: number) => {
    const pattern = [0, 45, 65, 30, -30, -65, -45];
    return pattern[index % pattern.length];
  };

  return (
    <div className="flex flex-col items-center max-w-xl mx-auto w-full px-4 pb-24">
      {course.units.map((unit) => {
        return (
          <div key={unit.id} className="w-full flex flex-col items-center mb-12">
            <UnitBanner unit={unit} />

            <div className="flex flex-col items-center w-full relative">
              {unit.lessons.map((lesson, idx) => {
                const isCompleted = user.completedLessonIds.includes(lesson.id);
                // Uma lição é desbloqueada se for a primeira da unidade 1 ou se a anterior foi concluída
                const isUnlocked =
                  idx === 0 ||
                  user.completedLessonIds.includes(unit.lessons[idx - 1]?.id);
                const isCurrent = isUnlocked && !isCompleted;
                const xOffset = getZigZagOffset(idx);

                return (
                  <div
                    key={lesson.id}
                    style={{
                      transform: `translateX(${xOffset}px)`,
                    }}
                    className="transition-transform duration-300"
                  >
                    <LessonNode
                      lesson={lesson}
                      unitColor={unit.color}
                      isCompleted={isCompleted}
                      isUnlocked={isUnlocked}
                      isCurrent={isCurrent}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
