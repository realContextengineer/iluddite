import React, { useState } from 'react';
import { AnimateIn } from '../components/AnimateIn';

export function SignUpPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Store locally for now — will wire to Supabase later
    try {
      const existing = JSON.parse(localStorage.getItem('bitless-signups') || '[]');
      existing.push({ email: email.trim(), date: new Date().toISOString() });
      localStorage.setItem('bitless-signups', JSON.stringify(existing));
      localStorage.setItem('bitless-user-email', email.trim());
    } catch {
      // Silently fail
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <AnimateIn delay={0}>
          <div className="rounded-2xl p-8 bg-gradient-to-br from-[#6B8E5F]/10 to-[#6B8E5F]/5 dark:from-[#7A9D6D]/10 dark:to-[#7A9D6D]/5 border border-[#6B8E5F]/20 dark:border-[#7A9D6D]/20 transition-colors duration-500">
            <div className="text-center space-y-4">
              <p className="text-[11px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.25em] font-semibold font-mono">
                Welcome
              </p>
              <h1 className="text-[26px] sm:text-[30px] text-[#141A16] dark:text-[#E6EBE3] font-semibold leading-tight tracking-tight">
                You're in.
              </h1>
              <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-relaxed max-w-md mx-auto">
                Your daily reading is waiting. You can now tap sections to mark them as done. Come back tomorrow for a new one.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <AnimateIn delay={0}>
        <div className="rounded-2xl p-8 bg-gradient-to-br from-[#6B8E5F]/10 to-[#6B8E5F]/5 dark:from-[#7A9D6D]/10 dark:to-[#7A9D6D]/5 border border-[#6B8E5F]/20 dark:border-[#7A9D6D]/20 transition-colors duration-500">
          <div className="text-center space-y-4">
            <p className="text-[11px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.25em] font-semibold font-mono">
              Sign Up
            </p>
            <h1 className="text-[26px] sm:text-[30px] text-[#141A16] dark:text-[#E6EBE3] font-semibold leading-tight tracking-tight">
              Track Your Practice
            </h1>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-relaxed max-w-md mx-auto">
              Sign up to mark off your daily reading, track your progress, and build a quieter relationship with your screen.
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-3"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[#F5F7F4] dark:bg-[#0F1410] border border-[#E2EBE0]/60 dark:border-[#202A24] text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] placeholder-[#B8C2B6] dark:placeholder-[#3A4A3E] focus:outline-none focus:border-[#6B8E5F]/40 dark:focus:border-[#7A9D6D]/40 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 border-2 border-[#6B8E5F] dark:border-[#7A9D6D] text-[#6B8E5F] dark:text-[#7A9D6D] rounded-xl hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors text-[14px] font-medium"
            >
              Sign up — it's free
            </button>
          </form>

          <p className="text-[12px] text-[#B8C2B6] dark:text-[#3A4A3E] text-center mt-5 leading-relaxed">
            No spam. No tracking. Just your daily reading.<br />
            We'll never share your email with anyone.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
