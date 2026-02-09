import React from 'react';
import { AnimateIn } from '../components/AnimateIn';

export function ContactPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <AnimateIn delay={0}>
        <div className="rounded-2xl p-8 bg-gradient-to-br from-[#D4793A]/10 to-[#D4793A]/5 dark:from-[#E07A3A]/10 dark:to-[#E07A3A]/5 border border-[#D4793A]/20 dark:border-[#E07A3A]/20 transition-colors duration-500">
          <div className="text-center space-y-4">
            <p className="text-[11px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.25em] font-semibold font-mono">
              Contact
            </p>
            <h1 className="text-[26px] sm:text-[30px] text-[#1A1A1A] dark:text-[#E8E4DD] font-semibold leading-tight tracking-tight">
              Get in Touch
            </h1>
            <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-relaxed max-w-md mx-auto">
              We'd love to hear from you. Whether it's feedback, a question, or just to say hello.
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <div className="space-y-6">
            <div>
              <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
                Email
              </h2>
              <a
                href="mailto:hello@bitless.app"
                className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] hover:text-[#D4793A] dark:hover:text-[#E07A3A] transition-colors underline underline-offset-4 decoration-[#D4793A]/30"
              >
                hello@bitless.app
              </a>
            </div>

            <div>
              <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
                Response Time
              </h2>
              <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
                We're a small team. We'll get back to you within a day or two. Probably sooner. We don't have an AI answering our emails — just us.
              </p>
            </div>

            <div>
              <h2 className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
                Feedback
              </h2>
              <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
                Bitless is new. If something's not working, if a reading felt off, or if you've got an idea — tell us. We're building this in the open and your input genuinely shapes what comes next.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
