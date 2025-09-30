import React, { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Login } from './components/auth/Login';
import { Quiz } from './components/quiz/Quiz';
import { Dashboard } from './components/dashboard/Dashboard';
import { Chat } from './components/chat/Chat';
import { MoodTracker } from './components/mood/MoodTracker';
import { Leaderboard } from './components/leaderboard/Leaderboard';
import { CrisisModal } from './components/crisis/CrisisModal';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
  hasCompletedQuiz: boolean;
  sessionExpiry: number;
}

type View = 'login' | 'quiz' | 'dashboard' | 'chat' | 'mood' | 'leaderboard';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('login');
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('mentalHealthUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (Date.now() < parsedUser.sessionExpiry) {
        setUser(parsedUser);
        setCurrentView(parsedUser.hasCompletedQuiz ? 'dashboard' : 'quiz');
      } else {
        localStorage.removeItem('mentalHealthUser');
      }
    }
  }, []);

  const handleLogin = (userData: Omit<User, 'sessionExpiry'>) => {
    const userWithSession = {
      ...userData,
      sessionExpiry: Date.now() + (60 * 60 * 1000) // 60 minutes
    };
    setUser(userWithSession);
    localStorage.setItem('mentalHealthUser', JSON.stringify(userWithSession));
    setCurrentView(userData.hasCompletedQuiz ? 'dashboard' : 'quiz');
  };

  const handleQuizComplete = () => {
    if (user) {
      const updatedUser = { ...user, hasCompletedQuiz: true };
      setUser(updatedUser);
      localStorage.setItem('mentalHealthUser', JSON.stringify(updatedUser));
      setCurrentView('dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mentalHealthUser');
    setCurrentView('login');
  };

  const handleCrisisDetection = () => {
    setShowCrisisModal(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header 
        user={user} 
        currentView={currentView} 
        onNavigate={setCurrentView}
        onLogout={handleLogout}
      />
      
      <main className="pt-16">
        {currentView === 'quiz' && (
          <Quiz onComplete={handleQuizComplete} />
        )}
        {currentView === 'dashboard' && (
          <Dashboard onNavigate={setCurrentView} />
        )}
        {currentView === 'chat' && (
          <Chat user={user} onCrisisDetection={handleCrisisDetection} />
        )}
        {currentView === 'mood' && (
          <MoodTracker user={user} />
        )}
        {currentView === 'leaderboard' && (
          <Leaderboard user={user} />
        )}
      </main>

      {showCrisisModal && (
        <CrisisModal onClose={() => setShowCrisisModal(false)} />
      )}
    </div>
  );
}

export default App;