import React, { useState } from 'react';
import { Calendar, TrendingUp, Smile, Meh, Frown } from 'lucide-react';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
}

interface MoodTrackerProps {
  user: User;
}

interface MoodEntry {
  id: string;
  date: string;
  mood: number;
  notes: string;
}

export function MoodTracker({ user }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([
    { id: '1', date: '2024-12-18', mood: 4, notes: 'Had a great day!' },
    { id: '2', date: '2024-12-17', mood: 3, notes: 'Feeling okay' },
    { id: '3', date: '2024-12-16', mood: 2, notes: 'Bit stressed with work' },
    { id: '4', date: '2024-12-15', mood: 5, notes: 'Excellent mood today' },
  ]);

  const moods = [
    { value: 1, label: 'Very Low', emoji: '😢', color: 'bg-red-500' },
    { value: 2, label: 'Low', emoji: '😕', color: 'bg-orange-500' },
    { value: 3, label: 'Neutral', emoji: '😐', color: 'bg-yellow-500' },
    { value: 4, label: 'Good', emoji: '😊', color: 'bg-blue-500' },
    { value: 5, label: 'Excellent', emoji: '😄', color: 'bg-green-500' },
  ];

  const handleSaveMood = () => {
    if (selectedMood === null) return;

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood,
      notes: notes
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    setSelectedMood(null);
    setNotes('');
  };

  const getMoodIcon = (mood: number) => {
    if (mood >= 4) return <Smile className="w-5 h-5 text-green-600" />;
    if (mood === 3) return <Meh className="w-5 h-5 text-yellow-600" />;
    return <Frown className="w-5 h-5 text-red-600" />;
  };

  const averageMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
    : '0';

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <TrendingUp className="w-8 h-8 text-blue-600" />
          <span>Mood Tracker</span>
        </h1>
        <p className="text-gray-600 mt-2">Track your daily mood and see patterns over time</p>
      </div>

      {/* Today's Mood Entry */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How are you feeling today?</h2>
        
        <div className="grid grid-cols-5 gap-3 mb-6">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => setSelectedMood(mood.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedMood === mood.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="text-3xl mb-2">{mood.emoji}</div>
              <div className="text-sm font-medium text-gray-700">{mood.label}</div>
            </button>
          ))}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Any notes about your mood today? (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={3}
            placeholder="What contributed to your mood today?"
          />
        </div>

        <button
          onClick={handleSaveMood}
          disabled={selectedMood === null}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Save Mood Entry
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{averageMood}/5</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Entries This Month</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{moodHistory.length}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Streak</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7 days</p>
            </div>
            <div className="text-yellow-500">
              🔥
            </div>
          </div>
        </div>
      </div>

      {/* Mood History */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Mood History</h2>
        
        {moodHistory.length === 0 ? (
          <p className="text-gray-600 text-center py-8">No mood entries yet. Start by tracking your mood today!</p>
        ) : (
          <div className="space-y-3">
            {moodHistory.map((entry) => (
              <div key={entry.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  {getMoodIcon(entry.mood)}
                  <span className="text-2xl">{moods.find(m => m.value === entry.mood)?.emoji}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900">
                      {moods.find(m => m.value === entry.mood)?.label}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                  {entry.notes && (
                    <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                  )}
                </div>
                
                <div className={`w-3 h-3 rounded-full ${moods.find(m => m.value === entry.mood)?.color}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}