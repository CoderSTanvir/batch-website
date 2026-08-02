'use client';

import { useEffect, useState } from 'react';

const loadingMessages = [
  'Charting the course…',
  'Weighing anchor…',
  'Setting sail…',
  'Navigating to your destination…',
  'Reviewing the case file…',
  'Hoisting the sails…',
  'Reading the compass…',
  'Adjusting the helm…',
];

export default function Loading() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Pick a random message on mount
    const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setMessage(randomMessage);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Ship Wheel Icon */}
        <div className="relative w-16 h-16">
          {/* Outer rotating circle */}
          <svg
            className="w-full h-full animate-spin text-gold-accent"
            style={{ animationDuration: '3s' }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            {/* Ship wheel spokes */}
            <line x1="12" y1="2" x2="12" y2="22" strokeLinecap="round" />
            <line x1="2" y1="12" x2="22" y2="12" strokeLinecap="round" />
            <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
            <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
          </svg>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-gold-accent" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-lg font-medium text-gold-accent">{message}</p>
          <p className="mt-2 text-sm text-text-secondary">
            Maritime Law 8th Batch
          </p>
        </div>

        {/* Pulse dots animation */}
        <div className="flex gap-2 mt-4">
          <div
            className="w-2 h-2 rounded-full bg-gold-accent"
            style={{
              animation: 'pulse 1.4s ease-in-out infinite',
              animationDelay: '0s',
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-gold-accent"
            style={{
              animation: 'pulse 1.4s ease-in-out infinite',
              animationDelay: '0.2s',
            }}
          />
          <div
            className="w-2 h-2 rounded-full bg-gold-accent"
            style={{
              animation: 'pulse 1.4s ease-in-out infinite',
              animationDelay: '0.4s',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
