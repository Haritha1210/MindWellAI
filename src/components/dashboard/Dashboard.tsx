import React from 'react';
import { MessageCircle, TrendingUp, Trophy, BarChart3, Heart, Zap } from 'lucide-react';

type View = 'chat' | 'mood' | 'leaderboard';

interface DashboardProps {
  onNavigate: (view: View) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = [
    { label: 'Days Active', value: '7', icon: Zap, color: 'text-blue-600' },
    { label: 'Mood Entries', value: '12', icon: Heart, color: 'text-green-600' },
    { label: 'Chat Sessions', value: '5', icon: MessageCircle, color: 'text-purple-600' },
    { label: 'Wellness Score', value: '78', icon: BarChart3, color: 'text-orange-600' },
  ];

  const quickActions = [
    {
      title: 'Chat with AI Counselor',
      description: 'Get personalized support and guidance',
      icon: MessageCircle,
      color: 'from-blue-500 to-blue-600',
      action: () => onNavigate('chat'),
    },
    {
      title: 'Track Your Mood',
      description: 'Log how you\'re feeling today',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
      action: () => onNavigate('mood'),
    },
    {
      title: 'Community Board',
      description: 'See how others are doing',
      icon: Trophy,
      color: 'from-purple-500 to-purple-600',
      action: () => onNavigate('leaderboard'),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
        <p className="text-gray-600 mt-2">Here's how you're doing on your wellness journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-gray-600 text-sm">{action.description}</p>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Completed mood check-in</p>
              <p className="text-xs text-gray-600">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Had a chat session with AI counselor</p>
              <p className="text-xs text-gray-600">Yesterday</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Completed wellness assessment</p>
              <p className="text-xs text-gray-600">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}