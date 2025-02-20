export interface PracticeState {
  mode: 'spelling' | 'typing';
  difficulty: 'easy' | 'medium' | 'hard';
  text: string;
  userInput: string;
  errors: number;
  accuracy: number;
  kpm: number;
  timer: number;
  isActive: boolean;
  speechRate: number;
}

export interface PracticeStore extends PracticeState {
  setMode: (mode: PracticeState['mode']) => void;
  setDifficulty: (difficulty: PracticeState['difficulty']) => void;
  setText: (text: string) => void;
  setUserInput: (input: string) => void;
  startPractice: () => void;
  endPractice: () => void;
  setSpeechRate: (rate: number) => void;
  resetState: () => void;
}