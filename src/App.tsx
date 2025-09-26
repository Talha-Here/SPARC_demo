import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { getCurrentUser } from './lib/supabase';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { user } = await getCurrentUser();
      setIsAuthenticated(!!user);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-opacity-30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading SPARC_Rowan Web...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <LandingPage onAuthSuccess={handleAuthSuccess} />
      )}
    </div>
  );
}

export default App;