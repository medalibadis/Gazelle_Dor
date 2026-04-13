import React, { useState, useEffect } from 'react';
import Image from 'next/image';

/**
 * 🏆 Fine-tuned "LB" Monogram
 */
export const LBLogo = ({ className = "" }) => (
  <div className={`flex flex-col items-center ${className} scale-90 md:scale-110 transition-transform`}>
    <div className="relative w-36 h-28">
      <svg viewBox="0 0 120 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBDF93" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#8A6E2F" />
          </linearGradient>
        </defs>
        
        <g fill="url(#goldGradient)">
          <rect x="33" y="5" width="8" height="35" rx="1" />
          <rect x="33" y="40" width="25" height="5" rx="1" />
        </g>

        <g stroke="url(#goldGradient)" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <line x1="58" y1="15" x2="58" y2="70" />
          <path d="M58,15 L82,15 C92,15 97,23 97,30 C97,37 92,42.5 82,42.5 L58,42.5" />
          <path d="M58,42.5 L88,42.5 C100,42.5 106,50 106,57.5 C106,65 100,72.5 88,72.5 L58,72.5" />
        </g>
      </svg>
    </div>
    <div className="mt-[-12px] text-center">
      <p className="text-[#D4AF37] font-black text-xs tracking-[0.3em] uppercase">Loving Brother's</p>
      <div className="inline-block px-1.5 py-0.5 bg-[#D4AF37] text-black text-[10px] font-black rounded-sm mt-1">DZ</div>
    </div>
  </div>
);

/**
 * 🚀 Modern Geometric "AVA EXPO" Logo
 */
export const AVALogo = ({ className = "" }) => (
  <div className={`relative ${className} w-full max-w-[320px] md:max-w-[480px]`}>
    <div className="flex flex-col items-center select-none w-full">
      <div className="flex items-end justify-center">
         <div className="text-[clamp(4.5rem,15vw,9rem)] font-thin tracking-[-0.15em] text-white leading-none">
            A<span className="font-black text-[#d4af37] mx-[-0.17em] drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]">V</span>A
         </div>
      </div>
      <div className="w-full flex items-center justify-center gap-4 mt-2">
        <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-[#d4af37]/30"></div>
        <h2 className="text-[clamp(1.2rem,4vw,2.2rem)] font-black text-white/90 tracking-[0.6em] uppercase">
          E X P O
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-[#d4af37]/30"></div>
      </div>
    </div>
  </div>
);

/**
 * 🏜️ Full Desert Theme Background
 * Fixed Hydration Error by using useEffect for random stars
 */
export const QamisBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate star data ONLY on the client
    const starData = [...Array(50)].map(() => ({
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      opacity: Math.random()
    }));
    setStars(starData);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#0c0a09]">
      {/* Sky with stars */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e3a8a]/20 to-[#f59e0b]/20"></div>
      
      {/* Twinkling Stars (Client-side only) */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div 
            key={i} 
            className="absolute w-[1px] h-[1px] bg-white rounded-full animate-pulse"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              opacity: star.opacity
            }}
          />
        ))}
      </div>

      <svg className="absolute bottom-0 w-full h-[65%]" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice">
        <path d="M0,400 Q360,300 720,400 T1440,400 V600 H0 Z" fill="#1c1917" opacity="0.8" />
        <path d="M-100,500 Q400,400 900,500 T1700,500 V600 H-100 Z" fill="#292524" />
        <path d="M0,550 Q500,450 1000,550 T1800,550 V600 H0 Z" fill="#44403c" />

        {/* Camel Silhouettes */}
        <g transform="translate(200, 480) scale(0.6)">
           <path d="M0,0 Q10,-10 30,-10 T50,0 Q60,10 70,0 T90,0 T110,-10 T130,0" stroke="black" strokeWidth="15" fill="none" strokeLinecap="round" />
           <rect x="35" y="-30" width="15" height="25" rx="5" fill="black" />
           <rect x="40" y="0" width="8" height="30" fill="black" />
           <rect x="40" y="0" width="8" height="30" fill="black" />
           <rect x="80" y="0" width="8" height="30" fill="black" />
           <rect x="120" y="0" width="8" height="30" fill="black" />
        </g>

        <g transform="translate(1100, 520) scale(0.5)">
           <path d="M0,0 Q10,-10 30,-10 T50,0 Q60,10 70,0 T90,0 T110,-10 T130,0" stroke="black" strokeWidth="15" fill="none" strokeLinecap="round" />
           <rect x="35" y="-30" width="15" height="25" rx="5" fill="black" />
           <rect x="0" y="0" width="8" height="30" fill="black" />
           <rect x="120" y="0" width="8" height="30" fill="black" />
        </g>
        
        <path d="M400,500 L500,450 L600,500 Z" fill="black" />
        <g transform="translate(500, 510)" className="animate-fire">
          <path d="M-10,0 Q0,-40 10,0 Z" fill="#f59e0b" />
          <path d="M-5,0 Q0,-20 5,0 Z" fill="#ef4444" />
        </g>
      </svg>
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent"></div>
    </div>
  );
};

export const RevisionBackground = () => (
  <div className="absolute inset-0 z-0 overflow-hidden bg-black">
    <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-900/10 to-orange-900/20"></div>
    <svg className="absolute bottom-0 w-full h-full opacity-40" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMax slice">
       <rect y="600" width="1440" height="200" fill="#064e3b" />
       <path d="M520,600 A200,200 0 0,1 920,600 Z" fill="white" />
    </svg>
  </div>
);

export const EComBackground = () => (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0c4a6e] to-black opacity-30"></div>
      <div className="absolute w-full h-[40vh] bottom-0 perspective-[800px]">
        <div className="w-[200%] h-full -left-1/2 bg-[linear-gradient(rgba(14,165,233,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.1)_1px,transparent_1px)] bg-[size:40px_40px] rotateX-[60deg]"></div>
      </div>
    </div>
);
