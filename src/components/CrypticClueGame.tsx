'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/gameStore';
import { levelsData } from '@/lib/gameData';
import UserRegistration from './UserRegistration';
import GameInterface from './GameInterface';
import Leaderboard from './Leaderboard';
import Navigation from './Navigation';

type GameScreen = 'registration' | 'game' | 'leaderboard';

export default function CrypticClueGame() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('registration');
  const { username, resetGame } = useGameStore();

  useEffect(() => {
    if (username) {
      setCurrentScreen('game');
    }
  }, [username]);

  const handleNewGame = () => {
    resetGame();
    setCurrentScreen('registration');
  };

  return (
    <div className="min-h-screen relative z-10">
      <header className="text-center py-16 relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold gradient-text-primary mb-4 animate-pulse-gentle">
          Cryptic Clue
        </h1>
        <p className="text-lg md:text-xl text-gray-300 font-light animate-fade-in">
          Story-Driven CS Word Guessing Game
        </p>
      </header>

      <main className="relative z-10 flex items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-4xl">
          {currentScreen === 'registration' && (
            <UserRegistration 
              onGameStart={() => setCurrentScreen('game')}
              levels={levelsData.levels}
            />
          )}
          
          {currentScreen === 'game' && (
            <GameInterface 
              levels={levelsData.levels}
              onGameComplete={() => setCurrentScreen('leaderboard')}
            />
          )}
          
          {currentScreen === 'leaderboard' && (
            <Leaderboard onNewGame={handleNewGame} />
          )}
        </div>
      </main>

      <Navigation 
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        showNavigation={username !== null}
      />
    </div>
  );
}
