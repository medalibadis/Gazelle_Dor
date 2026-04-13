'use client';

import Link from 'next/link';
import { LBLogo, AVALogo, QamisBackground } from '../components/Visuals';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0c0a09] relative overflow-hidden flex flex-col font-arabic text-white" dir="rtl">
      {/* Dynamic Visual Background */}
      <QamisBackground />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center py-6 px-4 md:py-10">
        
        {/* Header */}
        <header className="w-full flex justify-center animate-fade-in-down mb-8">
          <LBLogo />
        </header>

        {/* Hero Section */}
        <section className="flex flex-col items-center text-center w-full max-w-5xl mx-auto py-12 md:py-20">
          <div className="animate-float w-full flex justify-center mb-8">
            <AVALogo />
          </div>

          <div className="space-y-6 animate-fade-in bg-black/20 backdrop-blur-md p-8 rounded-[3rem] border border-white/5 shadow-2xl">
            <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#d4af37] leading-tight drop-shadow-2xl">
              معرض القميص
            </h2>
            <div className="space-y-4">
              <p className="text-white text-[clamp(1.1rem,3.5vw,2rem)] font-bold">
                 الطبعة الثانية - ولاية واد سوف
              </p>
              <p className="text-[#d4af37] text-[clamp(1rem,3vw,1.4rem)] font-black tracking-widest">
                 من 29 أفريل إلى 02 ماي 2026
              </p>
              <p className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
                حدث مهني من نوع خاص مخصص للتجار، الموردين، وأصحاب المشاريع من مختلف ولايات الوطن، يجمع بين الأعمال، التبادل التجاري، والتطوير المهني في فضاء Palm Garden.
              </p>
            </div>
          </div>

          <div className="mt-12 group w-full flex justify-center">
            <Link 
              href="/select" 
              className="relative inline-flex items-center justify-center w-full max-w-[320px] md:max-w-none md:px-24 py-5 md:py-7 bg-gradient-to-r from-[#d4af37] to-[#f9d423] text-black text-2xl md:text-4xl font-black rounded-full shadow-[0_20px_50px_-10px_rgba(212,175,55,0.7)] transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden border-2 border-white/30"
            >
              <span className="relative z-10">سجل الآن للمشاركة</span>
              <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </Link>
          </div>
        </section>

        {/* Program Highlights */}
        <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
           <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 hover:border-[#d4af37]/50 transition-all duration-500">
              <div className="text-3xl mb-4">🗓️</div>
              <h3 className="text-[#d4af37] text-xl font-black mb-4">برنامج الفعالية</h3>
              <ul className="space-y-3 text-white/60 font-bold leading-relaxed">
                 <li>• معرض تجاري (Exposition) واتصال B2B.</li>
                 <li>• ورشات وندوات (E-commerce & Digital).</li>
                 <li>• عشاء اختتامي رسمي يوم 01 ماي.</li>
              </ul>
           </div>

           <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 hover:border-[#d4af37]/50 transition-all duration-500">
              <h3 className="text-[#d4af37] text-xl font-black mb-4">عرض العارضين</h3>
              <ul className="space-y-3 text-white/60 font-bold leading-relaxed">
                 <li>• مساحة عرض مجهزة (Chapiteau).</li>
                 <li>• الإقامة الكاملة لمدة 4 أيام في الموقع.</li>
                 <li>• الاستفادة من مرافق Palm Garden.</li>
              </ul>
           </div>

           <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 hover:border-[#d4af37]/50 transition-all duration-500 text-center">
              <div className="text-3xl mb-4">⏳</div>
              <h3 className="text-red-500 text-xl font-black mb-2 animate-pulse">عدد الأماكن محدود</h3>
              <p className="text-white/80 font-black mb-4">آخر أجل للحجز:</p>
              <div className="bg-red-500/20 border border-red-500/30 py-4 rounded-2xl text-red-500 font-black text-2xl">
                 18 أفريل 2026
              </div>
           </div>
        </section>

        {/* Contact Info Footer */}
        <footer className="w-full max-w-6xl mx-auto bg-gradient-to-b from-white/5 to-transparent border-t border-white/5 py-12 px-6 rounded-t-[4rem]">
           <div className="flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-center md:text-right">
                 <h4 className="text-[#d4af37] font-black text-2xl mb-6">للاستفسار والتواصل</h4>
                 <div className="space-y-4">
                    <p className="text-2xl md:text-3xl font-black bg-[#d4af37]/10 py-3 px-8 rounded-full border border-[#d4af37]/20">
                      0676.25.47.54 / 0798.34.98.32
                    </p>
                    <p className="text-xl font-black text-white/60">
                      lovingbrothersagency@gmail.com
                    </p>
                 </div>
              </div>
              <div className="opacity-40 font-black tracking-[0.2em] uppercase text-sm border-r-2 border-[#d4af37] pr-4">
                 Palm Garden - El Oued <br /> Powered by Loving Brother's
              </div>
           </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(0.5deg); }
        }
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-float { animation: float 6s infinite ease-in-out; }
        .animate-fade-in-down { animation: fade-in-down 1.2s ease-out; }
        .animate-fade-in { animation: fade-in 2s ease-out; }

        @font-face {
          font-family: 'GE Dinar';
          src: url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        }
        body { font-family: 'Cairo', sans-serif; }
      `}</style>
    </div>
  );
}
