import React, { useState, useEffect } from 'react';
import { User, LogOut, Search, Filter, Grid, List, Trophy, BookOpen, Clock, Target } from 'lucide-react';
import { categories, gameModules } from '../data/gameModules';
import GameCard from './GameCard';
import { signOut, getCurrentUser } from '../lib/supabase';
import * as Icons from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [user, setUser] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [completedGames, setCompletedGames] = useState<Set<string>>(new Set(['heart-pump-adventure', 'lung-explorer'])); // Mock data

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const { user } = await getCurrentUser();
    setUser(user);
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const handlePlayGame = (gameId: string) => {
    // Navigate to game page - for now we'll just show an alert
    alert(`Launching game: ${gameId}\n\nThis would navigate to the WebGL game or placeholder content.`);
    
    // Mock completing the game after "playing"
    setTimeout(() => {
      setCompletedGames(prev => new Set([...prev, gameId]));
    }, 1000);
  };

  const filteredGames = gameModules.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryData = categories.find(cat => cat.id === selectedCategory);
  const completionRate = Math.round((completedGames.size / gameModules.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">SPARC_Rowan Web</h1>
                <p className="text-sm text-gray-600">Welcome back, {user?.user_metadata?.full_name || 'Explorer'}!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{completedGames.size}</div>
                  <div className="text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{completionRate}%</div>
                  <div className="text-gray-600">Progress</div>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Trophy className="w-8 h-8" />
              <div>
                <h2 className="text-xl font-bold">Your Learning Journey</h2>
                <p className="opacity-90">You've completed {completedGames.size} out of {gameModules.length} games!</p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white bg-opacity-20 rounded-full h-4 w-64">
                <div 
                  className="bg-white rounded-full h-4 transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Category Tabs */}
            <div className="flex space-x-1 overflow-x-auto pb-2 md:pb-0">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === 'all' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Games
              </button>
              {categories.map((category) => {
                const IconComponent = (Icons as any)[category.icon];
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                      selectedCategory === category.id 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {IconComponent && <IconComponent size={16} />}
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Header */}
        {selectedCategory !== 'all' && categoryData && (
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-12 h-12 ${categoryData.color} rounded-xl flex items-center justify-center`}>
                {React.createElement((Icons as any)[categoryData.icon], { 
                  size: 24, 
                  className: 'text-white' 
                })}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{categoryData.name}</h2>
                <p className="text-gray-600">{categoryData.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Games Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              isCompleted={completedGames.has(game.id)}
              onPlay={handlePlayGame}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-12">
            <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}