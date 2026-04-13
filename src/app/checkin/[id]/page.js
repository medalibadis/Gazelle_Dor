'use client';

import { useEffect, useState, use } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { getParticipantInfo, markAsPresent } from '../../actions';

export default function CheckInPage({ params }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const type = searchParams.get('type');
  
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const result = await getParticipantInfo(id, type);
        if (result.success) {
          setParticipant(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('خطأ في جلب بيانات المشارك.');
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
  }, [id, type]);

  const handleCheckIn = async () => {
    setCheckingIn(true);
    try {
      const result = await markAsPresent(id, type);
      if (result.success) {
        setSuccess(true);
        setParticipant(prev => ({ ...prev, status: 'Present' }));
      } else {
        alert(result.error || 'فشل في تحديث الحضور.');
      }
    } catch (err) {
      alert('حدث خطأ. يرجى المحاولة مرة أخرى.');
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-arabic" dir="rtl">
        <div className="bg-white/5 p-10 rounded-3xl border border-red-500/30 text-center shadow-2xl max-w-md w-full backdrop-blur-xl">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-black text-red-400 mb-4">فشل في التحقق</h1>
          <p className="text-white/60 mb-2 font-bold">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-6 w-full py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">
             إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 font-arabic" dir="rtl">
      {/* Background */}
      <div className="absolute inset-0 z-0">
         <Image src="/qamis-bg.png" alt="BG" fill className="object-cover opacity-30 blur-[4px]" />
         <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="relative z-10 bg-black/60 backdrop-blur-3xl rounded-[2.5rem] p-10 w-full max-w-[480px] shadow-2xl border border-white/10 text-center">
        <header className="mb-8">
          <div className="flex justify-center mb-6">
             <Image src="/lb-logo.png" alt="LB" width={100} height={50} className="object-contain" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">
            تأكيد الحضور (Admin)
          </h1>
          <p className="text-white/40 text-sm font-bold">معرف المشارك: <span className="text-[#d4af37]">{id}</span></p>
          <div className="mt-3 inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
             <p className="text-[#d4af37] text-xs font-black uppercase">نوع المشاركة: {type || 'عام'}</p>
          </div>
        </header>

        <div className="space-y-6">
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 text-right">
            <div className="mb-6">
              <span className="block text-xs font-black text-white/40 mb-1">الاسم الكامل</span>
              <p className="text-2xl font-black text-white">{participant.firstName} {participant.lastName}</p>
            </div>
            <div className="mb-6">
              <span className="block text-xs font-black text-white/40 mb-1">البريد الإلكتروني</span>
              <p className="text-lg font-bold text-white/80">{participant.email || 'N/A'}</p>
            </div>
            <div>
              <span className="block text-xs font-black text-white/40 mb-1">حالة الحضور</span>
              <p className={`text-xl font-black ${participant.status === 'Present' ? 'text-green-400' : 'text-orange-400'}`}>
                {participant.status === 'Present' ? '✔ تم تسجيل الحضور مسبقاً' : '❌ غائب'}
              </p>
            </div>
          </div>

          {participant.status !== 'Present' && !success ? (
            <button
              onClick={handleCheckIn}
              disabled={checkingIn}
              className="w-full py-5 bg-[#d4af37] hover:bg-[#b8952d] text-black rounded-2xl text-xl font-black transition-all shadow-[0_15px_40px_-5px_rgba(212,175,55,0.4)] disabled:opacity-50"
            >
              {checkingIn ? 'جاري التحديث...' : 'تأكيد الحضور الآن'}
            </button>
          ) : (
            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-[2rem] animate-fade-in">
              <p className="text-green-400 text-lg font-black italic">✓ تم تأكيد دخول المشارك!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
