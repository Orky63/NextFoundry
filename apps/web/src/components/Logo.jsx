import React, { useState } from 'react';

function FlameIcon({ size }) {
  const [seed] = useState(() => Math.random());

  return (
    <svg width={size} height={size} viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0 0 10px hsl(24 100% 62% / 0.7))' }}>
      <style>{`
        @keyframes flicker-a { 0%,100% { opacity: 0.3; } 33% { opacity: 0.5; } 66% { opacity: 0.2; } }
        @keyframes flicker-b { 0%,100% { opacity: 0.5; } 50% { opacity: 0.8; } 25% { opacity: 0.4; } }
        @keyframes flicker-c { 0%,100% { opacity: 1; } 50% { opacity: 0.6; } 75% { opacity: 0.9; } }
        @keyframes flicker-d { 0%,100% { opacity: 1; } 40% { opacity: 0.5; } 60% { opacity: 0.8; } }
        @keyframes ember1 { 0% { opacity: 0; transform: translate(0,0) scale(0); } 20% { opacity: 0.8; } 100% { opacity: 0; transform: translate(-4px,-20px) scale(0.5); } }
        @keyframes ember2 { 0% { opacity: 0; transform: translate(0,0) scale(0); } 30% { opacity: 0.6; } 100% { opacity: 0; transform: translate(5px,-16px) scale(0.3); } }
        @keyframes ember3 { 0% { opacity: 0; transform: translate(0,0) scale(0); } 15% { opacity: 0.7; } 100% { opacity: 0; transform: translate(2px,-24px) scale(0.4); } }
        .flame-outer { animation: flicker-a ${1.5 + (seed % 0.5)}s ease-in-out infinite; }
        .flame-mid { animation: flicker-b ${1.2 + (seed % 0.3)}s ease-in-out infinite; }
        .flame-inner { animation: flicker-c ${0.9 + (seed % 0.2)}s ease-in-out infinite; }
        .flame-base { animation: flicker-d ${1.1 + (seed % 0.4)}s ease-in-out infinite; }
        .ember { animation: ember1 2s ease-out infinite; }
        .ember:nth-child(2) { animation-name: ember2; animation-delay: 0.7s; }
        .ember:nth-child(3) { animation-name: ember3; animation-delay: 1.3s; }
      `}</style>
      <path className="flame-outer" d="M18 2C18 2 8 14 8 24C8 30.627 12.477 36 18 36C23.523 36 28 30.627 28 24C28 14 18 2 18 2Z" fill="currentColor" />
      <path className="flame-mid" d="M18 8C18 8 12 17 12 24C12 28.418 14.686 32 18 32C21.314 32 24 28.418 24 24C24 17 18 8 18 8Z" fill="currentColor" />
      <path className="flame-inner" d="M18 14C18 14 16 20 16 24C16 26.209 16.895 28 18 28C19.105 28 20 26.209 20 24C20 20 18 14 18 14Z" fill="currentColor" />
      <path className="flame-base" d="M18 30L22 38H14L18 30Z" fill="currentColor" />
      <circle className="ember" cx="18" cy="12" r="1" fill="hsl(40 95% 66%)" />
      <circle className="ember" cx="18" cy="16" r="0.8" fill="hsl(28 96% 62%)" />
      <circle className="ember" cx="18" cy="10" r="0.6" fill="hsl(18 92% 54%)" />
    </svg>
  );
}

const sizeMap = {
  sm: { box: 32, icon: 18, text: 'text-lg' },
  md: { box: 56, icon: 40, text: 'text-2xl' },
  lg: { box: 64, icon: 36, text: 'text-4xl' },
};

export default function Logo({ className = '', size = 'sm' }) {
  const s = sizeMap[size];

  return (
    <a href="#top" className={`flex items-center gap-3 font-display font-bold tracking-tight ${s.text} ${className}`}>
      <span
        className="grid place-items-center rounded-lg bg-primary/15 text-primary"
        style={{ width: s.box, height: s.box, animation: 'glow-pulse 2s ease-in-out infinite' }}
      >
        <FlameIcon size={s.icon} />
      </span>
      Next<span className="ember-text">Foundry</span>
    </a>
  );
}
