import React from 'react';
import { BookOpen, Compass, Quote, Shield } from 'lucide-react';
import { AnimateIn } from './AnimateIn';

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

export function DailyReading({ reading }: DailyReadingProps) {
  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Hero Card — Date, Title, Holiday */}
      <AnimateIn delay={0}>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <div className="text-center space-y-4">
            <p className="text-[12px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.2em] font-semibold font-mono">
              {reading.date}
            </p>
            <h1 className="text-[26px] sm:text-[30px] text-[#1A1A1A] dark:text-[#E8E4DD] font-medium leading-tight tracking-tight">
              {reading.title}
            </h1>
            {reading.holidayNote && (
              <p className="text-[14px] text-[#888] dark:text-[#666] leading-relaxed italic max-w-md mx-auto pt-1">
                {reading.holidayNote}
              </p>
            )}
          </div>
        </div>
      </AnimateIn>

      {/* Main Reading Card */}
      <AnimateIn delay={100}>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#D4793A]/10 dark:bg-[#E07A3A]/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#D4793A] dark:text-[#E07A3A]" />
            </div>
            <h2 className="text-[11px] text-[#999] dark:text-[#555] uppercase tracking-[0.15em] font-semibold font-mono">
              Today's Reading
            </h2>
          </div>
          <div className="space-y-5">
            {reading.somaticInvitation.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-[15px] sm:text-[16px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.85]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* Practice Card */}
      <AnimateIn delay={0}>
        <div className="bg-[#D4793A]/[0.06] dark:bg-[#E07A3A]/[0.06] rounded-2xl p-8 border border-[#D4793A]/15 dark:border-[#E07A3A]/15 transition-colors duration-500">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#D4793A]/15 dark:bg-[#E07A3A]/15 flex items-center justify-center">
              <Compass className="w-4 h-4 text-[#D4793A] dark:text-[#E07A3A]" />
            </div>
            <h2 className="text-[11px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono">
              Today's Practice
            </h2>
          </div>
          <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.8]">
            {reading.practice}
          </p>
        </div>
      </AnimateIn>

      {/* Random Quote Card */}
      <AnimateIn delay={0}>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#D4793A]/10 dark:bg-[#E07A3A]/10 flex items-center justify-center">
              <Quote className="w-4 h-4 text-[#D4793A] dark:text-[#E07A3A]" />
            </div>
            <h2 className="text-[11px] text-[#999] dark:text-[#555] uppercase tracking-[0.15em] font-semibold font-mono">
              Random Quote
            </h2>
          </div>
          <div className="space-y-2">
            <p className="text-[16px] sm:text-[17px] text-[#1A1A1A] dark:text-[#E8E4DD] leading-[1.7] italic">
              "{reading.quote}"
            </p>
            <p className="text-[12px] text-[#999] dark:text-[#555] font-medium font-mono">
              — {reading.quoteSource}
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* Tech Boundary Card */}
      <AnimateIn delay={0}>
        <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-8 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] transition-colors duration-500">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#D4793A]/10 dark:bg-[#E07A3A]/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-[#D4793A] dark:text-[#E07A3A]" />
            </div>
            <h2 className="text-[11px] text-[#999] dark:text-[#555] uppercase tracking-[0.15em] font-semibold font-mono">
              Today's Boundary
            </h2>
          </div>
          <p className="text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.8]">
            {reading.techBoundary}
          </p>
        </div>
      </AnimateIn>

      {/* Small Actions Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <AnimateIn delay={0}>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-6 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] h-full transition-colors duration-500">
            <p className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
              For You
            </p>
            <p className="text-[14px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.7]">
              {reading.niceSelf}
            </p>
          </div>
        </AnimateIn>
        <AnimateIn delay={120}>
          <div className="bg-white dark:bg-[#1A1A1A] rounded-2xl p-6 shadow-sm border border-[#E8E4DD]/60 dark:border-[#2A2A2A] h-full transition-colors duration-500">
            <p className="text-[10px] text-[#D4793A] dark:text-[#E07A3A] uppercase tracking-[0.15em] font-semibold font-mono mb-3">
              For Someone Else
            </p>
            <p className="text-[14px] text-[#3D3D3D] dark:text-[#B0ACA5] leading-[1.7]">
              {reading.niceOther}
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Day counter */}
      <AnimateIn delay={0}>
        <div className="text-center pt-4 pb-2">
          <p className="text-[11px] text-[#CCC] dark:text-[#333] font-mono tracking-wider">
            Day {reading.day} of 365
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
