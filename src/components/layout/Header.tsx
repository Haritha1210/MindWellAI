import React from 'react';
import { Heart, MessageCircle, TrendingUp, Trophy, Home, LogOut } from 'lucide-react';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  hasCompletedQuiz: boolean;
}

type View = 'dashboard' | 'chat' | 'mood' | 'leaderboard';

interface HeaderProps {
  user: User;
  currentView: View | 'quiz';
  onNavigate: (view: View) => void;
  onLogout: () => void;
}

export function Header({ user, currentView, onNavigate, onLogout }: HeaderProps) {
  const navItems = [
    { id: 'dashboard' as View, label: 'Dashboard', icon: Home },
    { id: 'chat' as View, label: 'AI Counselor', icon: MessageCircle },
    { id: 'mood' as View, label: 'Mood Tracker', icon: TrendingUp },
    { id: 'leaderboard' as View, label: 'Community', icon: Trophy },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-blue-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              MindWell AI
            </h1>
          </div>

          {user.hasCompletedQuiz && (
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    currentView === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              {user.isAnonymous ? 'Anonymous Session' : user.email}
            </div>
            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}