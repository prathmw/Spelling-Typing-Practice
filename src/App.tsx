import React from 'react';
import { usePracticeStore } from './store';
import { PracticeMode } from './components/PracticeMode';
import { Type, Pencil } from 'lucide-react';

function App() {
  const { mode, difficulty, setMode, setDifficulty } = usePracticeStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-center mb-8">
              Spelling & Typing Practice
            </h1>

            <div className="flex flex-col gap-6 mb-8">
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setMode('spelling')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                    mode === 'spelling'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Pencil className="w-5 h-5" />
                  Spelling Mode
                </button>
                <button
                  onClick={() => setMode('typing')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg ${
                    mode === 'typing'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <Type className="w-5 h-5" />
                  Typing Mode
                </button>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setDifficulty('easy')}
                  className={`px-4 py-2 rounded ${
                    difficulty === 'easy'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Easy
                </button>
                <button
                  onClick={() => setDifficulty('medium')}
                  className={`px-4 py-2 rounded ${
                    difficulty === 'medium'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setDifficulty('hard')}
                  className={`px-4 py-2 rounded ${
                    difficulty === 'hard'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  Hard
                </button>
              </div>
            </div>

            <PracticeMode />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;