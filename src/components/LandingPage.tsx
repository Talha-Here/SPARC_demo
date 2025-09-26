import React, { useState, useEffect } from 'react';
import { Rocket, Play, Users, Trophy, BookOpen, ChevronRight } from 'lucide-react';
import AuthModal from './AuthModal';

interface LandingPageProps {
  onAuthSuccess: () => void;
}

export default function LandingPage({ onAuthSuccess }: LandingPageProps) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Interactive Adventures',
      description: 'Explore the human body through engaging games and simulations',
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Track Progress',
      description: 'Earn badges and certificates as you master each body system',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Learn Together',
      description: 'Join thousands of students on their scientific journey',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Curriculum Aligned',
      description: 'Games designed to support science education standards',
    },
  ];

  const bodyParts = [
    { name: 'Heart', color: 'bg-red-500', delay: 0 },
    { name: 'Lungs', color: 'bg-blue-500', delay: 0.5 },
    { name: 'Brain', color: 'bg-purple-500', delay: 1 },
    { name: 'Muscles', color: 'bg-orange-500', delay: 1.5 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <nav className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="text-white font-bold text-xl">SPARC_Rowan Web</span>
          </div>
          <button
            onClick={() => setShowAuthModal(true)}
            className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-opacity-30 transition-all duration-200 flex items-center space-x-2"
          >
            <span>Get Started</span>
            <ChevronRight size={16} />
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero Title with Animation */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Explore the
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {' '}Human Body
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Embark on an incredible journey through science! Discover how your body works 
              through interactive games, simulations, and adventures.
            </p>
          </div>

          {/* Animated Body Systems */}
          <div className="relative mb-12">
            <div className="flex justify-center items-center space-x-8 md:space-x-16 mb-8">
              {bodyParts.map((part, index) => (
                <div
                  key={part.name}
                  className={`relative transition-all duration-1000 transform ${
                    animationStep === index ? 'scale-125 rotate-12' : 'scale-100 rotate-0'
                  }`}
                  style={{ animationDelay: `${part.delay}s` }}
                >
                  <div className={`w-16 h-16 md:w-24 md:h-24 ${part.color} rounded-full shadow-lg flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping" />
                    <span className="text-white font-bold text-sm md:text-lg relative z-10">
                      {part.name}
                    </span>
                  </div>
                  {animationStep === index && (
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce">
                      ✨
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={() => setShowAuthModal(true)}
              className="group bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
            >
              <Play className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Start Your Adventure</span>
            </button>
            <a 
              href="https://drive.google.com/file/d/1BfP8yjFTlFW12xd07xTDff34N4lkErCh/view?usp=sharing" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-30 transition-all duration-200 border border-white border-opacity-30 inline-block"
            >
              Watch Demo
            </a>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 text-white hover:bg-opacity-20 transition-all duration-300 transform hover:-translate-y-2 border border-white border-opacity-20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-yellow-400 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <div className="relative z-10 px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white">
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">12+</div>
              <div className="text-blue-100">Interactive Games</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">6</div>
              <div className="text-blue-100">Body Systems</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-blue-100">Students Learning</div>
            </div>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={onAuthSuccess}
      />
    </div>
  );
}