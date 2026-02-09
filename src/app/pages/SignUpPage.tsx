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
          <div className="rounded-2xl p-8 bg-gradient-to-br from-[#D4793A]/10 to-[#D4793A]/5 dark:from-[#E07A3A]/10 dark:to-[#E07A3A]/5 border border-[#D4793A]/20 dark:border-[#E07A3A]/20 transition-colors duration-500">
            <div className="text-center space-y-4">
              <p className="text-[11px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.25em] font-semibold font-mono">
                Welcome
              </p>
              <h1 className="text-[26px] sm:text-[30px] text-[#1A1A1A] dark:text-[#E8E4DD] font-semibold leading-tight tracking-tight">
                You're in.
              </h1>
              <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-relaxed max-w-md mx-auto">
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
        <div className="rounded-2xl p-8 bg-gradient-to-br from-[#D4793A]/10 to-[#D4793A]/5 dark:from-[#E07A3A]/10 dark:to-[#E07A3A]/5 border border-[#D4793A]/20 dark:border-[#E07A3A]/20 transition-colors duration-500">
          <div className="text-center space-y-4">
            <p className="text-[11px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.25em] font-semibold font-mono">
              Sign Up
            </p>
            <h1 className="text-[26px] sm:text-[30px] text-[#1A1A1A] dark:text-[#E8E4DD] font-semibold leading-tight tracking-tight">
              Track Your Practice
            </h1>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-relaxed max-w-md mx-auto">
              Sign up to mark off your daily reading, track your progress, and build a quieter relationship with your screen.
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-3"
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
                className="w-full px-4 py-3 rounded-xl bg-[#F5F2ED] dark:bg-[#111111] border border-[#E8E4DD]/60 dark:border-[#2A2A2A] text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] placeholder-[#BBB] dark:placeholder-[#444] focus:outline-none focus:border-[#D4793A]/40 dark:focus:border-[#E07A3A]/40 transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 border-2 border-[#D4793A] dark:border-[#E07A3A] text-[#D4793A] dark:text-[#E07A3A] rounded-xl hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors text-[14px] font-medium"
            >
              Sign up — it's free
            </button>
          </form>

          <p className="text-[12px] text-[#BBB] dark:text-[#444] text-center mt-5 leading-relaxed">
            No spam. No tracking. Just your daily reading.<br />
            We'll never share your email with anyone.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
