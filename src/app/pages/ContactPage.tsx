import React from 'react';
import { AnimateIn } from '../components/AnimateIn';

export function ContactPage() {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      <AnimateIn delay={0}>
        <div className="rounded-2xl p-8 bg-gradient-to-br from-[#6B8E5F]/10 to-[#6B8E5F]/5 dark:from-[#7A9D6D]/10 dark:to-[#7A9D6D]/5 border border-[#6B8E5F]/20 dark:border-[#7A9D6D]/20 transition-colors duration-500">
          <div className="text-center space-y-4">
            <p className="text-[11px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.25em] font-semibold font-mono">
              Contact
            </p>
            <h1 className="text-[26px] sm:text-[30px] text-[#141A16] dark:text-[#E6EBE3] font-semibold leading-tight tracking-tight">
              Get in Touch
            </h1>
            <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-relaxed max-w-md mx-auto">
              We'd love to hear from you. Whether it's feedback, a question, or just to say hello.
            </p>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <div className="bg-white dark:bg-[#141A16] rounded-2xl p-8 shadow-sm border border-[#E2EBE0]/60 dark:border-[#202A24] transition-colors duration-500">
          <div className="space-y-6">
            <div>
              <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
                Email
              </h2>
              <a
                href="mailto:hello@bitless.app"
                className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] hover:text-[#6B8E5F] dark:hover:text-[#7A9D6D] transition-colors underline underline-offset-4 decoration-[#6B8E5F]/30"
              >
                hello@bitless.app
              </a>
            </div>

            <div>
              <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
                Response Time
              </h2>
              <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
                We're a small team. We'll get back to you within a day or two. Probably sooner. We don't have an AI answering our emails — just us.
              </p>
            </div>

            <div>
              <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
                Feedback
              </h2>
              <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
                Bitless is new. If something's not working, if a reading felt off, or if you've got an idea — tell us. We're building this in the open and your input genuinely shapes what comes next.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
