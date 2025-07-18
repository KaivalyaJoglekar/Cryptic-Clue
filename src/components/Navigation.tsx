'use client';

interface NavigationProps {
  currentScreen: 'registration' | 'game' | 'leaderboard';
  onScreenChange: (screen: 'registration' | 'game' | 'leaderboard') => void;
  showNavigation: boolean;
}

export default function Navigation({ currentScreen, onScreenChange, showNavigation }: NavigationProps) {
  if (!showNavigation) return null;

  return (
    <nav className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="glass-effect rounded-full p-2 neon-glow">
        <div className="flex space-x-2">
          <button
            onClick={() => onScreenChange('game')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              currentScreen === 'game'
                ? 'bg-cosmic-blue text-white shadow-lg shadow-cosmic-blue/25'
                : 'text-cosmic-blue hover:bg-cosmic-blue/10'
            }`}
          >
            🎮 Game
          </button>
          <button
            onClick={() => onScreenChange('leaderboard')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              currentScreen === 'leaderboard'
                ? 'bg-cosmic-purple text-white shadow-lg shadow-cosmic-purple/25'
                : 'text-cosmic-purple hover:bg-cosmic-purple/10'
            }`}
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </nav>
  );
}
