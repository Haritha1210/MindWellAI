import React, { useState, useRef, useEffect } from 'react';
import { Send, AlertTriangle, Bot } from 'lucide-react';

interface User {
  id: string;
  email?: string;
  isAnonymous: boolean;
}

interface ChatProps {
  user: User;
  onCrisisDetection: () => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isCrisis?: boolean;
}

export function Chat({ user, onCrisisDetection }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI wellness counselor. I'm here to listen and support you. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const crisisKeywords = [
    'suicide', 'kill myself', 'end it all', 'hurt myself', 'self harm',
    'don\'t want to live', 'better off dead', 'hopeless', 'can\'t go on'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCrisis = (message: string): boolean => {
    const lowerMessage = message.toLowerCase();
    return crisisKeywords.some(keyword => lowerMessage.includes(keyword));
  };

  const generateAIResponse = (userMessage: string): string => {
    // Simple AI response logic (placeholder for Claude integration)
    if (detectCrisis(userMessage)) {
      return "I'm really concerned about what you're sharing. Your feelings are valid, but please know that you don't have to go through this alone. Let me connect you with immediate help resources.";
    }

    if (userMessage.toLowerCase().includes('anxious') || userMessage.toLowerCase().includes('anxiety')) {
      return "I hear that you're feeling anxious. That must be really difficult. Can you tell me more about what's contributing to these feelings? Sometimes it helps to break down what's happening.";
    }

    if (userMessage.toLowerCase().includes('stressed') || userMessage.toLowerCase().includes('stress')) {
      return "Stress can feel overwhelming. You're taking a positive step by talking about it. What are some of the main sources of stress in your life right now?";
    }

    if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depressed')) {
      return "I'm sorry you're feeling this way. Your feelings are important and valid. Would you like to explore what might be contributing to these feelings, or would you prefer to talk about coping strategies?";
    }

    return "Thank you for sharing that with me. I'm here to listen and support you. Can you tell me more about how you're feeling, or is there something specific you'd like to talk through together?";
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    const isCrisis = detectCrisis(inputValue);
    if (isCrisis) {
      userMessage.isCrisis = true;
    }

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(userMessage.content),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      if (isCrisis) {
        setTimeout(() => {
          onCrisisDetection();
        }, 2000);
      }
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 h-screen flex flex-col">
      <div className="bg-white rounded-t-2xl shadow-sm border border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">AI Wellness Counselor</h2>
            <p className="text-sm text-gray-600">Always here to listen and support you</p>
          </div>
        </div>
      </div>

      <div className="bg-white flex-1 overflow-y-auto p-6 border-x border-gray-200">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? message.isCrisis
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.isCrisis && (
                  <div className="flex items-center space-x-1 mb-2">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-xs font-medium">Crisis detected</span>
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <p className="text-xs mt-1 opacity-70">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white rounded-b-2xl shadow-sm border border-gray-200 p-4 flex-shrink-0">
        <div className="flex space-x-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 resize-none border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            rows={1}
            style={{ maxHeight: '120px' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Remember: This is AI support. For immediate crisis help, please contact emergency services.
        </p>
      </div>
    </div>
  );
}