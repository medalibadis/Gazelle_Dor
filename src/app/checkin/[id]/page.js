'use client';

import { useEffect, useState, use } from 'react';
import { getParticipantInfo, markAsPresent } from '../../actions';

export default function CheckInPage({ params }) {
  const { id } = use(params);
  const [participant, setParticipant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function fetchInfo() {
      try {
        const result = await getParticipantInfo(id);
        if (result.success) {
          setParticipant(result.data);
        } else {
          setError(result.error);
        }
      } catch (err) {
        setError('Error fetching participant data.');
      } finally {
        setLoading(false);
      }
    }
    fetchInfo();
  }, [id]);

  const handleCheckIn = async () => {
    setCheckingIn(true);
    try {
      const result = await markAsPresent(id);
      if (result.success) {
        setSuccess(true);
        setParticipant(prev => ({ ...prev, status: 'Present' }));
      } else {
        alert(result.error || 'Failed to check in.');
      }
    } catch (err) {
      alert('Failed to check in. Please try again.');
    } finally {
      setCheckingIn(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-accent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-brand-card p-10 rounded-2xl border border-brand-error text-center shadow-2xl">
        <h1 className="text-2xl font-bold text-brand-error mb-4">Error</h1>
        <p className="text-brand-secondary">{error}</p>
        <button onClick={() => window.location.reload()} className="mt-6 text-brand-accent hover:underline">Try Again</button>
      </div>
    );
  }

  return (
    <div className="bg-brand-card rounded-2xl p-10 w-full max-w-[480px] shadow-2xl border border-brand-border text-center">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Admin Check-in
        </h1>
        <p className="text-brand-secondary text-sm">Scan result for {id}</p>
      </header>

      <div className="space-y-6">
        <div className="bg-[#0f172a] p-6 rounded-xl border border-brand-border text-left">
          <div className="mb-4">
            <span className="block text-xs uppercase tracking-wider text-brand-secondary font-semibold">Full Name</span>
            <p className="text-xl font-medium">{participant.firstName} {participant.lastName}</p>
          </div>
          <div className="mb-4">
            <span className="block text-xs uppercase tracking-wider text-brand-secondary font-semibold">Email</span>
            <p className="text-brand-primary">{participant.email}</p>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-brand-secondary font-semibold">Status</span>
            <p className={`text-lg font-bold ${participant.status === 'Present' ? 'text-brand-success' : 'text-brand-error'}`}>
              {participant.status === 'Present' ? '✔ ALREADY CHECKED IN' : '❌ ABSENT'}
            </p>
          </div>
        </div>

        {participant.status !== 'Present' && !success ? (
          <button
            onClick={handleCheckIn}
            disabled={checkingIn}
            className="w-full py-4 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg text-lg font-bold transition-all shadow-lg shadow-sky-500/20 disabled:opacity-50"
          >
            {checkingIn ? 'Updating Sheet...' : 'MARK AS PRESENT'}
          </button>
        ) : (
          <div className="p-4 bg-brand-success/10 border border-brand-success/20 rounded-lg">
            <p className="text-brand-success font-bold">Attendee is confirmed!</p>
          </div>
        )}
      </div>
    </div>
  );
}
