import React from 'react';
import { BookOpen, Compass, Quote, Shield, Check } from 'lucide-react';
import { AnimateIn } from './AnimateIn';
import { useCompletions, SectionKey } from '../hooks/useCompletions';

interface Reading {
  day: number;
  date: string;
  title: string;
  holidayNote?: string;
  somaticInvitation: string;
  practice: string;
  niceSelf: string;
  niceOther: string;
  quote: string;
  quoteSource: string;
  techBoundary: string;
  tags: string[];
}

interface DailyReadingProps {
  reading: Reading;
}

function TappableCard({
  sectionKey,
  isComplete,
  onToggle,
  children,
}: {
  sectionKey: SectionKey;
  isComplete: boolean;
  onToggle: (key: SectionKey) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(sectionKey)}
      className="w-full text-left relative group"
      aria-pressed={isComplete}
      aria-label={isComplete ? 'Marked as done. Tap to undo.' : 'Tap to mark as done.'}
    >
      {children}
      {/* Tick indicator */}
      <div
        className={`
          absolute top-4 right-4
          w-6 h-6 rounded-full flex items-center justify-center
          transition-all duration-300
          ${isComplete
            ? 'bg-[#6B8E5F]/15 dark:bg-[#7A9D6D]/15 scale-100 opacity-100'
            : 'scale-75 opacity-0 pointer-events-none'
          }
        `}
      >
        <Check
          className="w-3.5 h-3.5 text-[#6B8E5F] dark:text-[#7A9D6D]"
          strokeWidth={3}
        />
      </div>
    </button>
  );
}

export function DailyReading({ reading }: DailyReadingProps) {
  const { completions, toggle } = useCompletions(reading.date);

  return (
    <div className="max-w-xl mx-auto space-y-4">
      {/* Hero Card — Title */}
      <AnimateIn delay={0}>
        <div className="animate-card-breathe">
          <div className="organic-1 p-8 bg-gradient-to-br from-[#6B8E5F]/10 to-[#6B8E5F]/5 dark:from-[#7A9D6D]/10 dark:to-[#7A9D6D]/5 border border-[#6B8E5F]/20 dark:border-[#7A9D6D]/20 backdrop-blur-sm transition-colors duration-500">
            <div className="text-center space-y-3">
              <p className="text-[11px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.25em] font-semibold font-mono">
                {reading.date}
              </p>
              <h1 className="text-[22px] sm:text-[26px] text-[#141A16] dark:text-[#E6EBE3] font-light leading-tight tracking-tight">
                {reading.title}
              </h1>
              {reading.holidayNote && (
                <p className="text-[13px] text-[#6B8E5F] dark:text-[#7A9D6D] leading-relaxed max-w-md mx-auto">
                  {reading.holidayNote}
                </p>
              )}
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Main Reading Card — NOT tappable */}
      <AnimateIn delay={100}>
        <div className="animate-card-breathe-delayed">
          <div className="bg-white/90 dark:bg-[#141A16]/85 backdrop-blur-sm organic-2 p-8 shadow-sm border border-[#E6EBE3]/60 dark:border-[#202A24] transition-colors duration-500">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-7 h-7 rounded-full bg-[#6B8E5F]/10 dark:bg-[#7A9D6D]/10 flex items-center justify-center">
                <BookOpen className="w-3.5 h-3.5 text-[#6B8E5F] dark:text-[#7A9D6D]" />
              </div>
              <h2 className="text-[10px] text-[#8A9488] dark:text-[#4A5A4E] uppercase tracking-[0.15em] font-semibold font-mono">
                Today's Reading
              </h2>
            </div>
            <div className="space-y-5">
              {reading.somaticInvitation.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-[15px] sm:text-[16px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.85]">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Practice Card — TAPPABLE */}
      <AnimateIn delay={0}>
        <div className="animate-card-breathe-delayed-2">
          <TappableCard sectionKey="practice" isComplete={completions.practice} onToggle={toggle}>
            <div className={`bg-[#6B8E5F]/[0.06] dark:bg-[#7A9D6D]/[0.06] backdrop-blur-sm organic-3 p-7 border transition-colors duration-500 ${completions.practice ? 'border-[#6B8E5F]/40 dark:border-[#7A9D6D]/40' : 'border-[#6B8E5F]/15 dark:border-[#7A9D6D]/15'}`}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#6B8E5F]/15 dark:bg-[#7A9D6D]/15 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5 text-[#6B8E5F] dark:text-[#7A9D6D]" />
                </div>
                <h2 className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono">
                  Today's Practice
                </h2>
              </div>
              <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.8]">
                {reading.practice}
              </p>
            </div>
          </TappableCard>
        </div>
      </AnimateIn>

      {/* Random Quote Card — NOT tappable */}
      <AnimateIn delay={0}>
        <div className="animate-card-breathe-delayed-3">
          <div className="bg-white/90 dark:bg-[#141A16]/85 backdrop-blur-sm organic-4 p-7 shadow-sm border border-[#E6EBE3]/60 dark:border-[#202A24] transition-colors duration-500">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-full bg-[#6B8E5F]/10 dark:bg-[#7A9D6D]/10 flex items-center justify-center">
                <Quote className="w-3.5 h-3.5 text-[#6B8E5F] dark:text-[#7A9D6D]" />
              </div>
              <h2 className="text-[10px] text-[#8A9488] dark:text-[#4A5A4E] uppercase tracking-[0.15em] font-semibold font-mono">
                Random Quote
              </h2>
            </div>
            <div className="space-y-2">
              <p className="text-[16px] sm:text-[17px] text-[#141A16] dark:text-[#E6EBE3] leading-[1.7]">
                "{reading.quote}"
              </p>
              <p className="text-[12px] text-[#8A9488] dark:text-[#4A5A4E] font-medium font-mono">
                — {reading.quoteSource}
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Tech Boundary Card — TAPPABLE */}
      <AnimateIn delay={0}>
        <div className="animate-card-breathe">
          <TappableCard sectionKey="techBoundary" isComplete={completions.techBoundary} onToggle={toggle}>
            <div className={`bg-white/90 dark:bg-[#141A16]/85 backdrop-blur-sm organic-5 p-7 shadow-sm border transition-colors duration-500 ${completions.techBoundary ? 'border-[#6B8E5F]/40 dark:border-[#7A9D6D]/40' : 'border-[#E6EBE3]/60 dark:border-[#202A24]'}`}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-full bg-[#6B8E5F]/10 dark:bg-[#7A9D6D]/10 flex items-center justify-center">
                  <Shield className="w-3.5 h-3.5 text-[#6B8E5F] dark:text-[#7A9D6D]" />
                </div>
                <h2 className="text-[10px] text-[#8A9488] dark:text-[#4A5A4E] uppercase tracking-[0.15em] font-semibold font-mono">
                  Today's Boundary
                </h2>
              </div>
              <p className="text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.8]">
                {reading.techBoundary}
              </p>
            </div>
          </TappableCard>
        </div>
      </AnimateIn>

      {/* Small Actions Row — BOTH TAPPABLE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <AnimateIn delay={0}>
          <div className="animate-card-breathe-delayed">
            <TappableCard sectionKey="niceSelf" isComplete={completions.niceSelf} onToggle={toggle}>
              <div className={`bg-white/90 dark:bg-[#141A16]/85 backdrop-blur-sm organic-6 p-5 shadow-sm border h-full transition-colors duration-500 ${completions.niceSelf ? 'border-[#6B8E5F]/40 dark:border-[#7A9D6D]/40' : 'border-[#E6EBE3]/60 dark:border-[#202A24]'}`}>
                <p className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-2.5">
                  For You
                </p>
                <p className="text-[14px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.7]">
                  {reading.niceSelf}
                </p>
              </div>
            </TappableCard>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="animate-card-breathe-delayed-2">
            <TappableCard sectionKey="niceOther" isComplete={completions.niceOther} onToggle={toggle}>
              <div className={`bg-white/90 dark:bg-[#141A16]/85 backdrop-blur-sm organic-3 p-5 shadow-sm border h-full transition-colors duration-500 ${completions.niceOther ? 'border-[#6B8E5F]/40 dark:border-[#7A9D6D]/40' : 'border-[#E6EBE3]/60 dark:border-[#202A24]'}`}>
                <p className="text-[10px] text-[#6B8E5F] dark:text-[#7A9D6D] uppercase tracking-[0.15em] font-semibold font-mono mb-2.5">
                  For Someone Else
                </p>
                <p className="text-[14px] text-[#2A3A2F] dark:text-[#B5BEB2] leading-[1.7]">
                  {reading.niceOther}
                </p>
              </div>
            </TappableCard>
          </div>
        </AnimateIn>
      </div>

      {/* Day counter */}
      <AnimateIn delay={0}>
        <div className="text-center pt-2 pb-2">
          <p className="text-[11px] text-[#C8D2C6] dark:text-[#2A3A2E] font-mono tracking-wider">
            Day {reading.day} of 365
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
