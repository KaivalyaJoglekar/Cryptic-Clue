import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameLevel } from './gameData';

interface GameState {
  // User state
  username: string | null;
  score: number;
  
  // Game state
  currentLevel: number;
  currentTries: number;
  maxTries: number;
  
  // Current word state
  currentWord: string;
  currentScenario: string;
  currentHint: string;
  hintShown: boolean;
  
  // Game history
  previousGuesses: string[];
  
  // Leaderboard
  leaderboard: Array<{
    name: string;
    score: number;
    date: string;
  }>;
  
  // Actions
  setUsername: (username: string) => void;
  startGame: (levels: GameLevel[]) => void;
  submitGuess: (guess: string) => { correct: boolean; gameOver: boolean; showHint: boolean };
  nextLevel: () => void;
  showHint: () => void;
  resetGame: () => void;
  addToLeaderboard: (name: string, score: number) => void;
}

export const useGameStore = create<GameState>()(  persist(
    (set, get) => ({
      // Initial state
      username: null,
      score: 0,
      currentLevel: 1,
      currentTries: 0,
      maxTries: 5,
      currentWord: '',
      currentScenario: '',
      currentHint: '',
      hintShown: false,
      previousGuesses: [],
      leaderboard: [],
      
      // Actions
      setUsername: (username: string) => set({ username }),
      
      startGame: (levels: GameLevel[]) => {
        const firstLevel = levels[0];
        const randomScenario = firstLevel.scenarios[
          Math.floor(Math.random() * firstLevel.scenarios.length)
        ];
        
        set({
          currentLevel: 1,
          currentTries: 0,
          score: 0,
          currentWord: firstLevel.word,
          currentScenario: randomScenario,
          currentHint: firstLevel.hint,
          hintShown: false,
          previousGuesses: [],
        });
      },
      
      submitGuess: (guess: string) => {
        const state = get();
        const newTries = state.currentTries + 1;
        const correct = guess.toLowerCase().trim() === state.currentWord.toLowerCase().trim();
        const gameOver = newTries >= state.maxTries;
        const showHint = newTries === 3 && !state.hintShown;
        
        set({
          currentTries: newTries,
          previousGuesses: [...state.previousGuesses, guess],
          hintShown: showHint ? true : state.hintShown,
        });
        
        if (correct) {
          const points = newTries <= 3 ? 5 : 3;
          set({ score: state.score + points });
        }
        
        return { correct, gameOver, showHint };
      },
      
      nextLevel: () => {
        const state = get();
        set({
          currentLevel: state.currentLevel + 1,
          currentTries: 0,
          hintShown: false,
          previousGuesses: [],
        });
      },
      
      showHint: () => set({ hintShown: true }),
      
      resetGame: () => set({
        username: null,
        score: 0,
        currentLevel: 1,
        currentTries: 0,
        currentWord: '',
        currentScenario: '',
        currentHint: '',
        hintShown: false,
        previousGuesses: [],
      }),
      
      addToLeaderboard: (name: string, score: number) => {
        const state = get();
        const newEntry = {
          name,
          score,
          date: new Date().toISOString(),
        };
        
        const newLeaderboard = [...state.leaderboard, newEntry]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        
        set({ leaderboard: newLeaderboard });
      },
    }),
    {
      name: 'cryptic-clue-game',
      partialize: (state) => ({ leaderboard: state.leaderboard }),
    }
  )
);
