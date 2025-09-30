import React from 'react';
import { AlertTriangle, Phone, MessageCircle, X } from 'lucide-react';

interface CrisisModalProps {
  onClose: () => void;
}

export function CrisisModal({ onClose }: CrisisModalProps) {
  const emergencyContacts = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: '24/7, free and confidential support',
      type: 'call'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis counseling via text',
      type: 'text'
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'For immediate emergency assistance',
      type: 'emergency'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Crisis Support</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 mb-4">
            I'm concerned about what you're sharing. You don't have to go through this alone. 
            Here are immediate resources that can help:
          </p>
        </div>

        <div className="space-y-4">
          {emergencyContacts.map((contact, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${
                contact.type === 'emergency'
                  ? 'border-red-200 bg-red-50'
                  : 'border-blue-200 bg-blue-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${
                  contact.type === 'text' ? 'bg-green-100' : 
                  contact.type === 'emergency' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {contact.type === 'text' ? (
                    <MessageCircle className={`w-4 h-4 ${
                      contact.type === 'emergency' ? 'text-red-600' : 'text-green-600'
                    }`} />
                  ) : (
                    <Phone className={`w-4 h-4 ${
                      contact.type === 'emergency' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-lg font-mono text-blue-600 my-1">{contact.number}</p>
                  <p className="text-sm text-gray-600">{contact.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Remember:</strong> These feelings are temporary. Professional help is available, 
            and reaching out is a sign of strength, not weakness.
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}