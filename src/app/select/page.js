'use client';

import Link from 'next/link';
import { LBLogo, QamisBackground } from '../../components/Visuals';

const categories = [
  {
    id: 'ecom',
    title: 'ورشات E.com',
    description: 'ورشات التجارة الإلكترونية والعمل الحر',
    href: '/register/e-com',
    accent: 'purple'
  },
  {
    id: 'qamis',
    title: 'معرض القميص',
    description: 'عرض القميص العربي الطبعة الثانية',
    href: '/register/qamis',
    accent: 'amber'
  }
];

export default function SelectPage() {
  return (
    <div className="min-h-screen bg-[#0c0a09] relative overflow-hidden flex flex-col items-center py-10 px-4 font-arabic text-white" dir="rtl">
      <QamisBackground />
      
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center">
        <header className="mb-12">
          <LBLogo />
        </header>

        <h1 className="text-[clamp(1.5rem,5vw,3rem)] font-black text-[#d4af37] mb-12 text-center drop-shadow-lg">
          اختر فئة التسجيل
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {categories.map((category) => (
            <Link 
              key={category.id}
              href={category.href}
              className="group relative bg-white/5 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:border-[#d4af37]/50 flex flex-col items-center text-center overflow-hidden"
            >
              <h2 className="text-3xl font-black text-white mb-4 group-hover:text-[#d4af37] transition-colors">
                {category.title}
              </h2>
              <p className="text-white/60 font-bold leading-relaxed mb-8">
                {category.description}
              </p>
              
              <div className="mt-auto px-8 py-3 bg-white/10 rounded-full text-sm font-black tracking-widest uppercase transition-all duration-500 group-hover:bg-[#d4af37] group-hover:text-black">
                سجل الآن
              </div>

              {/* Decorative gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </div>

        <Link 
          href="/"
          className="mt-16 text-white/40 hover:text-[#d4af37] transition-colors font-black text-lg border-b border-transparent hover:border-[#d4af37] pb-1"
        >
          العودة للرئيسية
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
