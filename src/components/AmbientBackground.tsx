import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10 select-none">
      {/* Soft colorful glowing orbs */}
      <div className="absolute -top-32 -left-28 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl animate-pulse-glow" />
      <div
        className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-pink-600/15 blur-3xl animate-pulse-glow"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute -bottom-32 left-1/4 w-[30rem] h-[30rem] rounded-full bg-indigo-600/20 blur-3xl animate-pulse-glow"
        style={{ animationDelay: '4s' }}
      />

      {/* Floating ambient subtle emojis */}
      <div className="absolute top-[12%] left-[8%] text-2xl opacity-25 animate-float-slow">
        ✨
      </div>
      <div className="absolute top-[28%] right-[10%] text-3xl opacity-20 animate-float-reverse">
        🌸
      </div>
      <div className="absolute top-[52%] left-[5%] text-2xl opacity-20 animate-float-slow" style={{ animationDelay: '1.5s' }}>
        🍕
      </div>
      <div className="absolute top-[68%] right-[8%] text-3xl opacity-20 animate-float-reverse" style={{ animationDelay: '3s' }}>
        💖
      </div>
      <div className="absolute bottom-[10%] left-[12%] text-2xl opacity-25 animate-float-slow" style={{ animationDelay: '2.5s' }}>
        🧸
      </div>
      <div className="absolute bottom-[15%] right-[14%] text-2xl opacity-20 animate-float-reverse" style={{ animationDelay: '1s' }}>
        🌈
      </div>
    </div>
  );
};
