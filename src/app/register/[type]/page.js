'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { LBLogo, QamisBackground, RevisionBackground, EComBackground } from '../../../components/Visuals';
import { registerParticipant } from '../../actions';

const themeMap = {
  qamis: {
    title: 'معرض القميص',
    subtitle: 'سجل حضورك في المعرض العربي للقميص',
    accent: '#FBBF24', // Amber
    bg: <QamisBackground />,
    price: 'مجاني'
  },
  'e-com': {
    title: 'ورشات E.com',
    subtitle: 'انضم لخبراء التجارة الإلكترونية',
    accent: '#a855f7', // Purple
    bg: <EComBackground />,
    price: '3500 DA'
  },
  'ecom-conf': {
    title: 'مؤتمر E.com',
    subtitle: 'سجل حضورك في المؤتمر',
    accent: '#3b82f6', // Blue
    bg: <EComBackground />,
    price: 'مجاني'
  },
  dinner: {
    title: 'عشاء رجال الأعمال',
    subtitle: 'سجل لحضور عشاء وحفل الختام',
    accent: '#10b981', // Emerald
    bg: <RevisionBackground />,
    price: '13500 DA'
  }
};

export default function RegisterPage() {
  const { type } = useParams();
  const router = useRouter();
  const theme = themeMap[type] || themeMap.qamis;
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const result = await registerParticipant(formData, type);
      if (result.success) {
        setMessage({ type: 'success', text: 'تم التسجيل بنجاح! ننتظرك في الملتقى.' });
        setTimeout(() => router.push('/'), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'حدث خطأ أثناء التسجيل. حاول مرة أخرى.' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'فشل الاتصال بالخادم. يرجى مراجعة الإنترنت.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center py-10 px-4 font-arabic text-white" dir="rtl">
      {theme.bg}
      
      <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
        <header className="mb-6 animate-fade-in">
          <LBLogo />
        </header>

        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-lg">استمارة التسجيل</h1>
          <p className="text-xl font-bold mb-4" style={{ color: theme.accent }}>{theme.title}</p>
          
          {theme.price && (
            <div className={`inline-block px-6 py-2 rounded-full border ${theme.price.includes('مجاني') ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-red-500/20 border-red-500/50 text-red-500 animate-pulse'}`}>
              <span className="font-black text-lg">
                {theme.price.includes('مجاني') ? 'السعر: ' : 'هام! رسوم الدخول: '}
                {theme.price}
              </span>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="w-full bg-white/5 backdrop-blur-3xl p-8 md:p-10 rounded-[3rem] border border-white/10 space-y-6 shadow-2xl animate-fade-in">
          
          <div className="space-y-2">
            <label className="block text-lg font-bold mr-2 text-white/80">الاسم الشخصي</label>
            <input
              required
              type="text"
              name="firstName"
              placeholder="الاسم"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl font-bold focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-bold mr-2 text-white/80">الاسم العائلي</label>
            <input
              required
              type="text"
              name="lastName"
              placeholder="اللقب"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl font-bold focus:outline-none focus:border-[#d4af37] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-bold mr-2 text-white/80">البريد الإلكتروني</label>
            <input
              required
              type="email"
              name="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl font-bold focus:outline-none focus:border-[#d4af37] transition-all text-left"
              dir="ltr"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-lg font-bold mr-2 text-white/80">رقم الهاتف</label>
            <input
              required
              type="tel"
              name="phone"
              placeholder="+213"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl font-bold focus:outline-none focus:border-[#d4af37] transition-all text-left"
              dir="ltr"
            />
          </div>

          {type === 'e-com' && (
            <div className="space-y-2">
              <label className="block text-lg font-bold mr-2 text-white/80">التخصص / الورشة</label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 text-xl font-bold focus:outline-none focus:border-[#a855f7] transition-all text-white appearance-none"
              >
                <option value="" disabled className="text-black">-- اختر التخصص --</option>
                <option value="Omar fekhar marketing digital 29/04/2026" className="text-black">Omar fekhar marketing digital 29/04/2026</option>
                <option value="Madjid sedjal management des projets 30/04/2026" className="text-black">Madjid sedjal management des projets 30/04/2026</option>
                <option value="Fethi boukhros E-commerce 01/05/2026" className="text-black">Fethi boukhros E-commerce 01/05/2026</option>
              </select>
            </div>
          )}

          {message.text && (
            <div className={`p-5 rounded-2xl text-center font-black text-lg animate-pulse ${
              message.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-400/20' : 'bg-red-500/20 text-red-400 border border-red-400/20'
            }`}>
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-6 rounded-3xl font-black text-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] shadow-xl"
            style={{ 
              backgroundColor: isSubmitting ? 'transparent' : theme.accent,
              color: isSubmitting ? theme.accent : 'black',
              border: isSubmitting ? `2px solid ${theme.accent}` : 'none'
            }}
          >
            {isSubmitting ? 'جاري التسجيل...' : 'تأكيد التسجيل'}
          </button>
        </form>

        <Link 
          href="/select"
          className="mt-10 text-white/40 hover:text-white transition-colors font-bold text-lg flex items-center gap-2"
        >
          <span>تغيير الفئة</span>
          <span className="text-2xl">←</span>
        </Link>
      </div>

      <style jsx global>{`
        @font-face {
          font-family: 'GE Dinar';
          src: url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
        }
        body { font-family: 'Cairo', sans-serif; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-fade-in { animation: fade-in 1.5s ease-out; }
      `}</style>
    </div>
  );
}
