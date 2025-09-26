import React from 'react';
import { Clock, Star, CheckCircle2, Lock, Play } from 'lucide-react';
import { GameModule } from '../types';

interface GameCardProps {
  game: GameModule;
  isCompleted: boolean;
  isLocked?: boolean;
  onPlay: (gameId: string) => void;
}

export default function GameCard({ game, isCompleted, isLocked = false, onPlay }: GameCardProps) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2">
      {/* Game Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay Icons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {isCompleted && (
            <div className="bg-green-500 text-white rounded-full p-1">
              <CheckCircle2 size={16} />
            </div>
          )}
          {isLocked && (
            <div className="bg-gray-500 text-white rounded-full p-1">
              <Lock size={16} />
            </div>
          )}
          {game.is_premium && (
            <div className="bg-yellow-500 text-white rounded-full p-1">
              <Star size={16} />
            </div>
          )}
        </div>

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
          <button
            onClick={() => !isLocked && onPlay(game.id)}
            disabled={isLocked}
            className="bg-white text-blue-600 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-blue-50 disabled:bg-gray-300 disabled:text-gray-500"
          >
            <Play size={24} fill="currentColor" />
          </button>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute bottom-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[game.difficulty]}`}>
            {game.difficulty}
          </span>
        </div>
      </div>

      {/* Game Info */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors">
            {game.title}
          </h3>
          <div className="flex items-center text-gray-500 text-sm ml-2">
            <Clock size={14} />
            <span className="ml-1">{game.estimated_time}m</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {game.description}
        </p>

        {/* Learning Objectives */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">You'll Learn:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            {game.learning_objectives.slice(0, 2).map((objective, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <button
          onClick={() => !isLocked && onPlay(game.id)}
          disabled={isLocked}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
            isLocked
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : isCompleted
              ? 'bg-green-100 text-green-700 hover:bg-green-200'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isLocked ? 'Locked' : isCompleted ? 'Play Again' : 'Start Game'}
        </button>
      </div>
    </div>
  );
}