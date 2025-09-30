import React, { useState } from 'react';
import { Trophy, TrendingUp, Calendar, Medal } from 'lucide-react';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
}

interface LeaderboardProps {
  user: User;
}

interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  streak: number;
  entries: number;
  rank: number;
}

export function Leaderboard({ user }: LeaderboardProps) {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly');

  const leaderboardData: LeaderboardEntry[] = [
    { id: '1', username: 'WellnessWarrior', score: 95, streak: 14, entries: 28, rank: 1 },
    { id: '2', username: 'MindfulMaven', score: 89, streak: 10, entries: 25, rank: 2 },
    { id: '3', username: 'SereneSeeker', score: 87, streak: 8, entries: 24, rank: 3 },
    { id: '4', username: 'You', score: 78, streak: 7, entries: 12, rank: 4 },
    { id: '5', username: 'CalmCrusader', score: 76, streak: 5, entries: 20, rank: 5 },
    { id: '6', username: 'PeacefulPioneer', score: 74, streak: 12, entries: 18, rank: 6 },
    { id: '7', username: 'HappyHunter', score: 72, streak: 3, entries: 16, rank: 7 },
    { id: '8', username: 'ZenZealot', score: 70, streak: 9, entries: 15, rank: 8 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Medal className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white';
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white';
      default:
        return 'bg-white border border-gray-200 text-gray-900';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <span>Community Leaderboard</span>
        </h1>
        <p className="text-gray-600 mt-2">See how you're doing compared to other wellness warriors</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-8">
        <div className="flex border-b border-gray-200">
          {(['weekly', 'monthly', 'all'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 text-center font-medium capitalize transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab} Rankings
            </button>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4th</div>
              <div className="text-sm text-gray-600">Your Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">78</div>
              <div className="text-sm text-gray-600">Wellness Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">7</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Leaders
        </h2>
        
        <div className="space-y-3">
          {leaderboardData.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-4 rounded-lg transition-all duration-200 ${
                entry.username === 'You'
                  ? 'bg-blue-50 border-2 border-blue-200 shadow-sm'
                  : getRankColor(entry.rank)
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12">
                  {getRankIcon(entry.rank)}
                </div>
                
                <div>
                  <h3 className={`font-semibold ${entry.username === 'You' ? 'text-blue-700' : ''}`}>
                    {entry.username}
                    {entry.username === 'You' && (
                      <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">You</span>
                    )}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{entry.streak} day streak</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{entry.entries} entries</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-2xl font-bold ${entry.username === 'You' ? 'text-blue-700' : ''}`}>
                  {entry.score}
                </div>
                <div className="text-sm text-gray-600">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How Scoring Works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How Wellness Scoring Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Earn Points For:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Daily mood tracking (+5 points)</li>
              <li>• Chat sessions (+3 points)</li>
              <li>• Maintaining streaks (+2 bonus points/day)</li>
              <li>• Completing wellness activities (+10 points)</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Privacy Notice:</h3>
            <p className="text-sm text-gray-600">
              Only anonymized wellness metrics are shared. Your personal conversations and specific mood details remain completely private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}