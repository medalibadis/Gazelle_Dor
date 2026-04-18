'use client';

import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0a09] relative flex flex-col items-center pb-32" dir="rtl">
      
      {/* Flyer Image */}
      <img 
        src="/best-bg.png" 
        alt="معرض القميص - AVA EXPO" 
        className="w-full h-auto max-w-4xl shadow-2xl"
      />

      {/* Fixed Sticky Button Container */}
      <div className="fixed bottom-0 left-0 right-0 w-full p-6 md:p-8 flex justify-center z-50 pointer-events-none bg-gradient-to-t from-black via-black/80 to-transparent">
        <Link 
          href="/select" 
          className="pointer-events-auto relative inline-flex items-center justify-center w-full max-w-[350px] md:max-w-[400px] py-4 md:py-6 bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-black text-2xl md:text-3xl font-black rounded-full shadow-[0_20px_50px_-10px_rgba(212,175,55,0.7)] transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden border-2 border-white/20"
        >
          <span className="relative z-10">سجل الآن للمشاركة</span>
          <div className="absolute inset-0 bg-white/30 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
        </Link>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'GE Dinar';
          src: url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        }
        body { font-family: 'Cairo', sans-serif; }
      `}</style>
    </div>
  );
}
