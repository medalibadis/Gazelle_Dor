'use client';

import React, { useEffect, useState } from 'react';

export const LBLogo = () => {
  return (
    <div className="flex items-center transition-all hover:scale-[1.02] duration-500 cursor-pointer">
      <img src="/logob.png" alt="Loving Brothers" className="h-[70px] md:h-[90px] w-auto object-contain drop-shadow-2xl rounded-2xl" />
    </div>
  );
};

export const AVALogo = () => (
    <div className="flex flex-col items-center">
       <img src="/ava.png" alt="AVA EXPO" className="h-[250px] md:h-[320px] w-auto object-cover md:object-contain drop-shadow-2xl rounded-3xl" />
    </div>
);

export const QamisBackground = () => {
    const [stars, setStars] = useState([]);
    useEffect(() => {
        setStars(Array.from({ length: 150 }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            dur: Math.random() * 3 + 2
        })));
    }, []);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-[#0c0a09]">
            {stars.map((s, i) => (
                <div key={i} className="absolute rounded-full bg-white opacity-40 animate-pulse"
                     style={{ top: s.top, left: s.left, width: s.size, height: s.size, animationDuration: `${s.dur}s` }} />
            ))}
            <div className="absolute bottom-0 w-full h-[60%] z-10">
                <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full opacity-30 h-auto">
                    <path fill="#080706" d="M0,192L48,176C96,160,192,128,288,144C384,160,480,224,576,218.7C672,213,768,139,864,133.3C960,128,1056,192,1152,213.3C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
                </svg>
            </div>
            <div className="absolute bottom-[10%] right-[10%] z-20 opacity-80 scale-75 md:scale-100">
                <svg width="120" height="100" viewBox="0 0 120 100" fill="#000">
                    <path d="M10,80 Q20,75 30,80 L40,80 Q45,60 60,60 L80,60 Q100,60 110,40 L115,20 L120,20 L110,50 L100,70 L80,85 L40,85 L35,95 L25,95 L30,80 Z" />
                </svg>
            </div>
            <div className="absolute bottom-[12%] left-[25%] z-20 flex items-end">
                <div className="w-4 h-4 rounded-full bg-[#f97316] blur-xl animate-pulse" />
            </div>
        </div>
    );
};

export const RevisionBackground = () => (
  <div className="absolute inset-0 z-0 bg-[#064e3b] overflow-hidden pointer-events-none">
     <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 to-transparent italic opacity-20 text-[20vw] font-black pointer-events-none select-none">
        FORUM
     </div>
  </div>
);

export const EComBackground = () => (
  <div className="absolute inset-0 z-0 bg-[#1e1b4b] overflow-hidden pointer-events-none">
     <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 to-transparent italic opacity-20 text-[15vw] font-black pointer-events-none select-none">
        E.COM
     </div>
  </div>
);
