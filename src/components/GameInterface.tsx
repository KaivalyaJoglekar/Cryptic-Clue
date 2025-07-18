'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/lib/gameStore';
import { GameLevel } from '@/lib/gameData';

interface GameInterfaceProps {
  levels: GameLevel[];
  onGameComplete: () => void;
}

export default function GameInterface({ levels, onGameComplete }: GameInterfaceProps) {
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | 'answer' | ''>('');
  const [isTyping, setIsTyping] = useState(false);
  
  const {
    username,
    score,
    currentLevel,
    currentTries,
    maxTries,
    currentWord,
    currentScenario,
    currentHint,
    hintShown,
    previousGuesses,
    submitGuess,
    addToLeaderboard,
  } = useGameStore();

  useEffect(() => {
    if (currentScenario) {
      setIsTyping(true);
      const timer = setTimeout(() => setIsTyping(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScenario]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!guess.trim()) {
      setFeedback('Please enter a guess!');
      setFeedbackType('incorrect');
      return;
    }
    
    const result = submitGuess(guess.trim());
    setGuess('');
    
    if (result.correct) {
      const points = currentTries <= 3 ? 5 : 3;
      setFeedback(`🎉 Correct! +${points} points`);
      setFeedbackType('correct');
      
      setTimeout(() => {
        if (currentLevel >= 10) {
          addToLeaderboard(username!, score + points);
          onGameComplete();
        } else {
          const nextLevelData = levels[currentLevel];
          const randomScenario = nextLevelData.scenarios[
            Math.floor(Math.random() * nextLevelData.scenarios.length)
          ];
          
          useGameStore.setState({
            currentLevel: currentLevel + 1,
            currentTries: 0,
            currentWord: nextLevelData.word,
            currentScenario: randomScenario,
            currentHint: nextLevelData.hint,
            hintShown: false,
            previousGuesses: [],
          });
          
          setFeedback('');
          setFeedbackType('');
        }
      }, 2000);
    } else if (result.gameOver) {
      setFeedback(`💡 The answer was: ${currentWord}`);
      setFeedbackType('answer');
      
      setTimeout(() => {
        if (currentLevel >= 10) {
          addToLeaderboard(username!, score);
          onGameComplete();
        } else {
          const nextLevelData = levels[currentLevel];
          const randomScenario = nextLevelData.scenarios[
            Math.floor(Math.random() * nextLevelData.scenarios.length)
          ];
          
          useGameStore.setState({
            currentLevel: currentLevel + 1,
            currentTries: 0,
            currentWord: nextLevelData.word,
            currentScenario: randomScenario,
            currentHint: nextLevelData.hint,
            hintShown: false,
            previousGuesses: [],
          });
          
          setFeedback('');
          setFeedbackType('');
        }
      }, 3000);
    } else {
      setFeedback(`❌ Try again! ${maxTries - currentTries} tries left`);
      setFeedbackType('incorrect');
      
      setTimeout(() => {
        if (feedbackType === 'incorrect') {
          setFeedback('');
          setFeedbackType('');
        }
      }, 3000);
    }
  };

  const progressPercentage = ((currentLevel - 1) / 10) * 100;

  return (
    <div className="animate-slide-up">
      <div className="glass-strong p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/10">
          <div className="flex space-x-4">
            <div className="px-4 py-2 glass rounded-full">
              <span className="text-white font-medium">Level {currentLevel}/10</span>
            </div>
            <div className="px-4 py-2 glass rounded-full">
              <span className="text-white font-medium">Try {currentTries + 1}/{maxTries}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold gradient-text-primary">
              {score} pts
            </div>
            <div className="text-gray-400 text-sm">
              {username}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Scenario - Central Focus */}
        <div className="mb-8">
          <div className="glass p-8 border-l-4 border-gradient-to-b from-purple-400 to-blue-400">
            <p className={`text-lg md:text-xl leading-relaxed text-gray-100 ${isTyping ? 'animate-pulse' : ''}`}>
              {currentScenario}
            </p>
          </div>
        </div>

        {/* Hint */}
        {hintShown && (
          <div className="mb-6 animate-fade-in">
            <div className="glass p-4 border border-yellow-400/30 bg-yellow-400/10">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">💡</span>
                <span className="text-yellow-400 font-medium">Hint:</span>
                <span className="text-gray-200">{currentHint}</span>
              </div>
            </div>
          </div>
        )}

        {/* Input Section */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex space-x-3">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              placeholder="Your guess..."
              className="flex-1 px-4 py-3 rounded-lg glass border-2 border-white/20 focus:border-white/40 focus:outline-none text-white placeholder-gray-400 transition-all duration-300"
              maxLength={50}
              disabled={currentTries >= maxTries}
            />
            <button
              type="submit"
              disabled={!guess.trim() || currentTries >= maxTries}
              className="px-6 py-3 btn-gradient text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Previous Guesses */}
        {previousGuesses.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {previousGuesses.map((prevGuess, index) => (
                <span
                  key={index}
                  className="px-3 py-1 glass text-gray-300 rounded-full text-sm"
                >
                  {prevGuess}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Feedback */}
        {feedback && (
          <div className="text-center animate-fade-in">
            <div className={`p-4 rounded-lg font-medium text-lg glass ${
              feedbackType === 'correct' ? 'text-green-400 border-green-400/30' :
              feedbackType === 'incorrect' ? 'text-red-400 border-red-400/30' :
              feedbackType === 'answer' ? 'text-yellow-400 border-yellow-400/30' :
              ''
            }`}>
              {feedback}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
