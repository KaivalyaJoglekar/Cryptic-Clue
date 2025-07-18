'use client';

import { useState } from 'react';
import { useGameStore } from '@/lib/gameStore';
import { GameLevel } from '@/lib/gameData';

interface UserRegistrationProps {
  onGameStart: () => void;
  levels: GameLevel[];
}

export default function UserRegistration({ onGameStart, levels }: UserRegistrationProps) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const { setUsername: setGameUsername, startGame } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim()) {
      setError('Please enter a username!');
      return;
    }
    
    if (username.trim().length < 2) {
      setError('Username must be at least 2 characters long!');
      return;
    }
    
    setError('');
    setGameUsername(username.trim());
    startGame(levels);
    onGameStart();
  };

  return (
    <div className="flex items-center justify-center animate-slide-up">
      <div className="glass-strong p-8 max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text-primary mb-3">
            Welcome Explorer!
          </h2>
          <p className="text-gray-300 font-light">
            Enter your username to begin your journey through Computer Science concepts.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-200 mb-2 uppercase tracking-wider"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg glass border-2 border-white/20 focus:border-white/40 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
              placeholder="Enter your username"
              maxLength={20}
              autoComplete="off"
            />
          </div>
          
          {error && (
            <div className="text-red-400 text-sm font-medium animate-fade-in">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg btn-gradient text-white font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
            disabled={!username.trim()}
          >
            Start Game
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
              <span>10 Levels</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></span>
              <span>CS Terms</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full"></span>
              <span>Story Mode</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
