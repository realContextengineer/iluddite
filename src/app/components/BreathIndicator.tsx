import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export function BreathIndicator() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');

  useEffect(() => {
    // 4 seconds inhale, 1 second hold, 6 seconds exhale
    const cycle = () => {
      setPhase('inhale');
      setTimeout(() => {
        setPhase('hold');
        setTimeout(() => {
          setPhase('exhale');
        }, 1000);
      }, 4000);
    };

    cycle();
    const interval = setInterval(cycle, 11000);

    return () => clearInterval(interval);
  }, []);

  const getText = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Breathe out';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'inhale':
        return 1.3;
      case 'hold':
        return 1.3;
      case 'exhale':
        return 1;
    }
  };

  const getDuration = () => {
    switch (phase) {
      case 'inhale':
        return 4;
      case 'hold':
        return 1;
      case 'exhale':
        return 6;
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <motion.div
        className="w-24 h-24 rounded-full bg-[#8B9B7C] dark:bg-[#7A8A6B] opacity-30"
        animate={{ scale: getScale() }}
        transition={{
          duration: getDuration(),
          ease: 'easeInOut',
        }}
      />
      <p className="text-[#8B7355] dark:text-[#B5A896] text-[14px] tracking-wide">
        {getText()}
      </p>
    </div>
  );
}