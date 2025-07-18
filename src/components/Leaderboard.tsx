'use client';

import { useGameStore } from '@/lib/gameStore';

interface LeaderboardProps {
  onNewGame: () => void;
}

export default function Leaderboard({ onNewGame }: LeaderboardProps) {
  const { leaderboard, score, username } = useGameStore();

  return (
    <div className="flex items-center justify-center min-h-[60vh] animate-slide-up">
      <div className="glass-effect rounded-2xl p-8 max-w-2xl w-full neon-glow">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-display font-bold cosmic-text mb-2">
            🏆 Galactic Leaderboard
          </h2>
          <p className="text-gray-300 font-light">
            Top explorers of the digital cosmos
          </p>
          
          {username && (
            <div className="mt-4 p-4 bg-cosmic-blue/20 rounded-lg border border-cosmic-blue/30">
              <div className="text-cosmic-blue font-semibold">
                Game Complete, {username}!
              </div>
              <div className="text-2xl font-bold text-cosmic-green mt-1">
                Final Score: {score} points
              </div>
            </div>
          )}
        </div>

        {leaderboard.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-float">🌌</div>
            <div className="text-gray-400 text-lg">
              No cosmic explorers yet. Be the first to explore the digital universe!
            </div>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {leaderboard.map((entry, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'bg-cosmic-yellow/20 border border-cosmic-yellow/30' :
                  index === 1 ? 'bg-cosmic-blue/20 border border-cosmic-blue/30' :
                  index === 2 ? 'bg-cosmic-purple/20 border border-cosmic-purple/30' :
                  'bg-space-700/50 border border-space-600'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-cosmic-yellow' :
                    index === 1 ? 'text-cosmic-blue' :
                    index === 2 ? 'text-cosmic-purple' :
                    'text-gray-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-white text-lg">
                      {entry.name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className={`text-xl font-bold ${
                  index === 0 ? 'text-cosmic-yellow' :
                  index === 1 ? 'text-cosmic-blue' :
                  index === 2 ? 'text-cosmic-purple' :
                  'text-cosmic-green'
                }`}>
                  {entry.score} pts
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <button
            onClick={onNewGame}
            className="px-8 py-3 bg-neon-gradient hover:shadow-lg hover:shadow-cosmic-blue/25 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            🚀 New Cosmic Journey
          </button>
        </div>
      </div>
    </div>
  );
}
