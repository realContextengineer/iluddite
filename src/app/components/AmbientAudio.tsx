import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AmbientAudioProps {
  src: string;
}

export function AmbientAudio({ src }: AmbientAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const stored = typeof window !== 'undefined' ? localStorage.getItem('bitless-ambient') : null;
  const [isPlaying, setIsPlaying] = useState(stored !== 'off');
  const [isLoaded, setIsLoaded] = useState(false);
  const fadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const TARGET_VOLUME = 0.15;
  const FADE_DURATION = 2000; // 2s fade
  const FADE_STEPS = 40;

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;

    audio.addEventListener('canplaythrough', () => setIsLoaded(true));

    // Auto-play on load (unless user previously turned it off)
    const stored = localStorage.getItem('bitless-ambient');
    if (stored === 'off') {
      // User explicitly turned it off — respect that
    } else {
      // Try to autoplay immediately
      const tryPlay = () => {
        audio.play().then(() => {
          setIsPlaying(true);
          audio.volume = 0;
          // Fade in
          let step = 0;
          const interval = setInterval(() => {
            step++;
            audio.volume = Math.min(0.15, (step / 40) * 0.15);
            if (step >= 40) clearInterval(interval);
          }, 50);
        }).catch(() => {
          // Browser blocked autoplay — start on first click
          const startOnInteraction = () => {
            audio.play().then(() => {
              setIsPlaying(true);
              audio.volume = 0;
              let step = 0;
              const interval = setInterval(() => {
                step++;
                audio.volume = Math.min(0.15, (step / 40) * 0.15);
                if (step >= 40) clearInterval(interval);
              }, 50);
            }).catch(() => {});
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
          };
          document.addEventListener('click', startOnInteraction, { once: true });
          document.addEventListener('touchstart', startOnInteraction, { once: true });
        });
      };
      audio.addEventListener('canplaythrough', tryPlay, { once: true });
    }

    return () => {
      audio.pause();
      audio.src = '';
      if (fadeInterval.current) clearInterval(fadeInterval.current);
    };
  }, [src]);

  const fadeTo = useCallback((target: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeInterval.current) clearInterval(fadeInterval.current);

    const startVol = audio.volume;
    const diff = target - startVol;
    const stepSize = diff / FADE_STEPS;
    let step = 0;

    fadeInterval.current = setInterval(() => {
      step++;
      const newVol = Math.max(0, Math.min(1, startVol + stepSize * step));
      audio.volume = newVol;

      if (step >= FADE_STEPS) {
        if (fadeInterval.current) clearInterval(fadeInterval.current);
        audio.volume = target;
        if (target === 0) audio.pause();
      }
    }, FADE_DURATION / FADE_STEPS);
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !isLoaded) return;

    if (isPlaying) {
      fadeTo(0);
      setIsPlaying(false);
      localStorage.setItem('bitless-ambient', 'off');
    } else {
      audio.play().then(() => {
        fadeTo(TARGET_VOLUME);
        setIsPlaying(true);
        localStorage.setItem('bitless-ambient', 'on');
      }).catch(() => {
        // Autoplay blocked — user needs to interact first
      });
    }
  }, [isPlaying, isLoaded, fadeTo]);

  return (
    <button
      onClick={toggle}
      className={`
        w-10 h-10 rounded-full flex items-center justify-center
        transition-all duration-500
        ${isPlaying
          ? 'bg-[#6B8E5F]/15 dark:bg-[#7A9D6D]/15'
          : 'hover:bg-[#E2EBE0]/60 dark:hover:bg-[#202A24]'
        }
      `}
      aria-label={isPlaying ? 'Mute forest sounds' : 'Play forest sounds'}
      title={isPlaying ? 'Forest sounds on' : 'Forest sounds off'}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-[#6B8E5F] dark:text-[#7A9D6D] animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-[#8A9488] dark:text-[#4A5A4E]" />
      )}
    </button>
  );
}
