'use client';

import { useState } from 'react';
import { registerParticipant } from './actions';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const result = await registerParticipant(formData);
      if (result.success) {
        setStatus({ type: 'success', message: result.message || 'Registration successful!' });
        setFormData({ firstName: '', lastName: '', email: '', phone: '' });
      } else {
        setStatus({ type: 'error', message: result.error || 'Registration failed.' });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus({ 
        type: 'error', 
        message: error.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-card rounded-2xl p-10 w-full max-w-[480px] shadow-2xl border border-brand-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_25px_30px_-5px_rgba(0,0,0,0.5)]">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent tracking-tight">
          Join Our Event
        </h1>
        <p className="text-brand-secondary text-[15px]">Register below to secure your spot</p>
      </header>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label htmlFor="firstName" className="block text-sm font-medium text-brand-secondary">
            First Name
          </label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            required 
            placeholder="Jane" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-brand-border rounded-lg text-brand-primary text-[15px] outline-none transition-all focus:border-brand-accent focus:ring-3 focus:ring-sky-500/20 placeholder:text-slate-600"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="lastName" className="block text-sm font-medium text-brand-secondary">
            Last Name
          </label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            required 
            placeholder="Doe" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-brand-border rounded-lg text-brand-primary text-[15px] outline-none transition-all focus:border-brand-accent focus:ring-3 focus:ring-sky-500/20 placeholder:text-slate-600"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-brand-secondary">
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            placeholder="jane@example.com" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-brand-border rounded-lg text-brand-primary text-[15px] outline-none transition-all focus:border-brand-accent focus:ring-3 focus:ring-sky-500/20 placeholder:text-slate-600"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-brand-secondary">
            Phone
          </label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange}
            required 
            placeholder="+1 234 567 8900" 
            className="w-full px-4 py-3 bg-[#0f172a] border border-brand-border rounded-lg text-brand-primary text-[15px] outline-none transition-all focus:border-brand-accent focus:ring-3 focus:ring-sky-500/20 placeholder:text-slate-600"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full py-3.5 bg-brand-accent hover:bg-brand-accent-hover text-white rounded-lg text-base font-semibold transition-all mt-2.5 shadow-lg shadow-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-brand-border disabled:text-brand-secondary disabled:shadow-none"
        >
          {isSubmitting ? 'Registering...' : 'Register Now'}
        </button>
        
        {status.message && (
          <div className={`mt-5 text-center text-sm font-medium min-h-[20px] ${status.type === 'success' ? 'text-brand-success' : 'text-brand-error'}`}>
            {status.message}
          </div>
        )}
      </form>
    </div>
  );
}
