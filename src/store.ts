import { create } from 'zustand';
import { PracticeStore } from './types';

const initialState = {
  mode: 'spelling' as const,
  difficulty: 'medium' as const,
  text: '',
  userInput: '',
  errors: 0,
  accuracy: 0,
  kpm: 0,
  timer: 0,
  isActive: false,
  speechRate: 1,
};

export const usePracticeStore = create<PracticeStore>((set) => ({
  ...initialState,
  setMode: (mode) => set({ mode }),
  setDifficulty: (difficulty) => set({ difficulty }),
  setText: (text) => set({ text }),
  setUserInput: (userInput) => set({ userInput }),
  startPractice: () => set({ isActive: true }),
  endPractice: () => set({ isActive: false }),
  setSpeechRate: (speechRate) => set({ speechRate }),
  resetState: () => set(initialState),
}));