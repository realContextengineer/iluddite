import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface AmbientAudioProps {
  src: string;
  musicSrc?: string;
}

export function AmbientAudio({ src, musicSrc }: AmbientAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const storedPref = typeof window !== 'undefined' ? localStorage.getItem('bitless-ambient') : null;
  const [isPlaying, setIsPlaying] = useState(storedPref !== 'off');
  const fadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const musicFadeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const FOREST_VOLUME = 0.15;
  const MUSIC_VOLUME = 0.06;
  const FADE_STEPS = 40;
  const FADE_MS = 50;

  const fadeAudio = (audio: HTMLAudioElement, target: number, intervalRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    const startVol = audio.volume;
    const stepSize = (target - startVol) / FADE_STEPS;
    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      audio.volume = Math.max(0, Math.min(1, startVol + stepSize * step));
      if (step >= FADE_STEPS) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        audio.volume = target;
        if (target === 0) audio.pause();
      }
    }, FADE_MS);
  };

  const playBoth = useCallback(() => {
    const forest = audioRef.current;
    const music = musicRef.current;

    const startForest = () => {
      if (!forest) return;
      forest.play().then(() => {
        forest.volume = 0;
        fadeAudio(forest, FOREST_VOLUME, fadeInterval);
      }).catch(() => {});
    };

    const startMusic = () => {
      if (!music) return;
      music.play().then(() => {
        music.volume = 0;
        fadeAudio(music, MUSIC_VOLUME, musicFadeInterval);
      }).catch(() => {});
    };

    startForest();
    startMusic();
    setIsPlaying(true);
  }, []);

  const stopBoth = useCallback(() => {
    if (audioRef.current) fadeAudio(audioRef.current, 0, fadeInterval);
    if (musicRef.current) fadeAudio(musicRef.current, 0, musicFadeInterval);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const forest = new Audio(src);
    forest.loop = true;
    forest.volume = 0;
    forest.preload = 'auto';
    audioRef.current = forest;

    let music: HTMLAudioElement | null = null;
    if (musicSrc) {
      music = new Audio(musicSrc);
      music.loop = true;
      music.volume = 0;
      music.preload = 'auto';
      musicRef.current = music;
    }

    const stored = localStorage.getItem('bitless-ambient');
    if (stored !== 'off') {
      const tryPlay = () => {
        forest.play().then(() => {
          setIsPlaying(true);
          forest.volume = 0;
          fadeAudio(forest, FOREST_VOLUME, fadeInterval);
          if (music) {
            music.play().then(() => {
              music!.volume = 0;
              fadeAudio(music!, MUSIC_VOLUME, musicFadeInterval);
            }).catch(() => {});
          }
        }).catch(() => {
          const startOnInteraction = () => {
            forest.play().then(() => {
              setIsPlaying(true);
              forest.volume = 0;
              fadeAudio(forest, FOREST_VOLUME, fadeInterval);
              if (music) {
                music.play().then(() => {
                  music!.volume = 0;
                  fadeAudio(music!, MUSIC_VOLUME, musicFadeInterval);
                }).catch(() => {});
              }
            }).catch(() => {});
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
          };
          document.addEventListener('click', startOnInteraction, { once: true });
          document.addEventListener('touchstart', startOnInteraction, { once: true });
        });
      };
      forest.addEventListener('canplaythrough', tryPlay, { once: true });
    }

    return () => {
      forest.pause();
      forest.src = '';
      if (music) { music.pause(); music.src = ''; }
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      if (musicFadeInterval.current) clearInterval(musicFadeInterval.current);
    };
  }, [src, musicSrc]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopBoth();
      localStorage.setItem('bitless-ambient', 'off');
    } else {
      playBoth();
      localStorage.setItem('bitless-ambient', 'on');
    }
  }, [isPlaying, playBoth, stopBoth]);

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
      aria-label={isPlaying ? 'Mute sounds' : 'Play sounds'}
      title={isPlaying ? 'Sounds on' : 'Sounds off'}
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4 text-[#6B8E5F] dark:text-[#7A9D6D] animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 text-[#8A9488] dark:text-[#4A5A4E]" />
      )}
    </button>
  );
}
