import React, { useEffect, useState } from 'react';
import { Play, Volume2, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { usePracticeStore } from '../store';

const sampleTexts = {
  easy: [
    "The quick brown fox jumps over the lazy dog.",
    "A gentle breeze rustles through the autumn leaves.",
  ],
  medium: [
    "The magnificent landscape stretched endlessly before us, painted in vibrant hues of orange and purple as the sun began to set.",
    "Scientists have discovered remarkable patterns in the migration of monarch butterflies across vast distances.",
  ],
  hard: [
    "The quintessential philosophical question regarding consciousness and its relationship to quantum mechanics remains largely unexplored.",
    "The pharmaceutical company's breakthrough research in immunotherapy has revolutionized cancer treatment protocols.",
  ],
};

export const PracticeMode: React.FC = () => {
  const { 
    mode, 
    difficulty, 
    text, 
    userInput, 
    isActive,
    speechRate,
    setText,
    setUserInput,
    startPractice,
    endPractice,
    setSpeechRate 
  } = usePracticeStore();

  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState<number>(0);
  const [kpm, setKpm] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [showText, setShowText] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    if (isActive && !startTime) {
      setStartTime(Date.now());
      const id = window.setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isActive, startTime]);

  const generateNewText = () => {
    const texts = sampleTexts[difficulty];
    const randomIndex = Math.floor(Math.random() * texts.length);
    setText(texts[randomIndex]);
    setShowText(false);
  };

  useEffect(() => {
    generateNewText();
  }, [difficulty]);

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    window.speechSynthesis.speak(utterance);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = () => {
    if (!isActive || !startTime) return;

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000 / 60; // in minutes
    const words = userInput.trim().split(/\s+/).length;
    const newKpm = Math.round(words / timeElapsed);

    let errorCount = 0;
    const textWords = text.split(' ');
    const inputWords = userInput.split(' ');

    textWords.forEach((word, index) => {
      if (inputWords[index] !== word) {
        errorCount++;
      }
    });

    setErrors(errorCount);
    setKpm(newKpm);
    endPractice();

    alert(`
      Practice Complete!
      Time: ${formatTime(timer)}
      Errors: ${errorCount}
      Speed: ${newKpm} KPM
      Accuracy: ${Math.round(((textWords.length - errorCount) / textWords.length) * 100)}%
    `);
  };

  const handleStart = () => {
    setTimer(0);
    setStartTime(null);
    startPractice();
    setUserInput('');
  };

  return (
    <div className="w-full max-w-4xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {mode === 'spelling' ? 'Spelling Practice' : 'Typing Practice'}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={speakText}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Listen to text"
          >
            <Volume2 className="w-6 h-6" />
          </button>
          <button
            onClick={generateNewText}
            className="p-2 rounded-full hover:bg-gray-100"
            title="New text"
          >
            <RefreshCw className="w-6 h-6" />
          </button>
          {mode === 'spelling' && (
            <button
              onClick={() => setShowText(!showText)}
              className="p-2 rounded-full hover:bg-gray-100"
              title={showText ? "Hide text" : "Show text"}
            >
              {showText ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          )}
          <select
            value={speechRate}
            onChange={(e) => setSpeechRate(Number(e.target.value))}
            className="px-3 py-1 border rounded"
          >
            <option value={0.5}>0.5x Speed</option>
            <option value={1}>1x Speed</option>
            <option value={1.5}>1.5x Speed</option>
            <option value={2}>2x Speed</option>
          </select>
        </div>
      </div>

      <div className={`p-4 bg-gray-50 rounded-lg ${mode === 'spelling' && !showText ? 'filter blur-lg hover:blur-lg' : ''}`}>
        <p className="text-lg">{text}</p>
      </div>

      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Type or spell the text here..."
        className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      <div className="flex justify-between items-center">
        <button
          onClick={handleStart}
          className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Play className="w-5 h-5" />
          Start
        </button>
        <div className="text-xl font-mono">
          {formatTime(timer)}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isActive}
          className={`px-6 py-2 rounded-lg ${
            isActive
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </div>

      {isActive && (
        <div className="flex gap-4 text-sm text-gray-600">
          <span>Mode: {mode}</span>
          <span>Difficulty: {difficulty}</span>
          {mode === 'typing' && <span>KPM: {kpm}</span>}
        </div>
      )}
    </div>
  );
};