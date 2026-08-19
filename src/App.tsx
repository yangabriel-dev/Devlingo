import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useGameStore } from './store/useGameStore';
import { AppLayout } from './components/layout/AppLayout';
import { LearnPage } from './pages/LearnPage';
import { LessonPage } from './pages/LessonPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ShopPage } from './pages/ShopPage';
import { ProfilePage } from './pages/ProfilePage';

export function App() {
  const { activeLesson } = useGameStore();

  // Se o jogador estiver dentro de uma lição ativa, exibe o player fullscreen
  if (activeLesson) {
    return <LessonPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<LearnPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
