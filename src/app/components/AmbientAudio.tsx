import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Volume2, VolumeOff } from 'lucide-react';

interface AmbientAudioProps {
  src: string;
  musicSrc?: string;
}

export function AmbientAudio({ src, musicSrc }: AmbientAudioProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicRef = useRef<HTMLAudioElement | null>(null);
  const getStoredPref = () => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem('bitless-ambient');
    } catch {
      return null;
    }
  };
  const setStoredPref = (value: 'on' | 'off') => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('bitless-ambient', value);
    } catch {
      // Ignore storage write failures (e.g. private mode)
    }
  };

  const [isPlaying, setIsPlaying] = useState(false);
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

    let started = false;

    const startForest = () => {
      if (!forest) return;
      forest.muted = false;
      forest.play().then(() => {
        forest.volume = 0;
        fadeAudio(forest, FOREST_VOLUME, fadeInterval);
        if (!started) {
          started = true;
          setIsPlaying(true);
        }
      }).catch(() => {
        if (!started) setIsPlaying(false);
      });
    };

    const startMusic = () => {
      if (!music) return;
      music.muted = false;
      music.play().then(() => {
        music.volume = 0;
        fadeAudio(music, MUSIC_VOLUME, musicFadeInterval);
        if (!started) {
          started = true;
          setIsPlaying(true);
        }
      }).catch(() => {
        if (!started) setIsPlaying(false);
      });
    };

    startForest();
    startMusic();
  }, []);

  const stopBoth = useCallback(() => {
    if (audioRef.current) fadeAudio(audioRef.current, 0, fadeInterval);
    if (musicRef.current) fadeAudio(musicRef.current, 0, musicFadeInterval);
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    const forest = audioRef.current;
    const music = musicRef.current;
    if (!forest) return;

    forest.loop = true;
    forest.volume = 0;
    forest.preload = 'auto';
    forest.playsInline = true;
    forest.load();

    if (music) {
      music.loop = true;
      music.volume = 0;
      music.preload = 'auto';
      music.playsInline = true;
      music.load();
    }

    const stored = getStoredPref();
    if (stored !== 'off') {
      const startBoth = () => {
        forest.volume = 0;
        forest.muted = false;
        forest.play().then(() => {
          fadeAudio(forest, FOREST_VOLUME, fadeInterval);
          setIsPlaying(true);
        }).catch(() => {});
        if (music) {
          music.volume = 0;
          music.muted = false;
          music.play().then(() => {
            fadeAudio(music!, MUSIC_VOLUME, musicFadeInterval);
            setIsPlaying(true);
          }).catch(() => {});
        }
      };

      const tryPlay = () => {
        forest.muted = true;
        if (music) music.muted = true;

        const playForest = forest.play();
        const playMusic = music ? music.play() : Promise.resolve();

        Promise.allSettled([playForest, playMusic]).then((results) => {
          const anyStarted = results.some((r) => r.status === 'fulfilled');
          if (anyStarted) {
            setIsPlaying(true);
            requestAnimationFrame(() => {
              forest.muted = false;
              forest.volume = 0;
              fadeAudio(forest, FOREST_VOLUME, fadeInterval);
              if (music) {
                music.muted = false;
                music.volume = 0;
                fadeAudio(music!, MUSIC_VOLUME, musicFadeInterval);
              }
            });
            return;
          }

          setIsPlaying(false);
          // Browser blocked — start on first interaction
          const startOnInteraction = () => {
            startBoth();
            document.removeEventListener('click', startOnInteraction);
            document.removeEventListener('touchstart', startOnInteraction);
          };
          document.addEventListener('click', startOnInteraction, { once: true });
          document.addEventListener('touchstart', startOnInteraction, { once: true });
        });
      };
      forest.addEventListener('canplaythrough', tryPlay, { once: true });
    } else {
      setIsPlaying(false);
    }

    return () => {
      forest.pause();
      forest.currentTime = 0;
      if (music) { music.pause(); music.currentTime = 0; }
      if (fadeInterval.current) clearInterval(fadeInterval.current);
      if (musicFadeInterval.current) clearInterval(musicFadeInterval.current);
    };
  }, [src, musicSrc]);

  const toggle = useCallback(() => {
    if (isPlaying) {
      stopBoth();
      setStoredPref('off');
    } else {
      playBoth();
      setStoredPref('on');
    }
  }, [isPlaying, playBoth, stopBoth]);

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" loop playsInline />
      {musicSrc ? <audio ref={musicRef} src={musicSrc} preload="auto" loop playsInline /> : null}
      <button
        onClick={toggle}
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          transition-all duration-500
          ${isPlaying
            ? 'bg-[#6B8E5F]/15 dark:bg-[#7A9D6D]/15'
            : 'hover:bg-[#E2EBE0]/60 dark:hover:bg-[#202A24] animate-audio-prompt'
          }
        `}
        aria-label={isPlaying ? 'Mute sounds' : 'Play sounds'}
        title={isPlaying ? 'Sounds on' : 'Sounds off'}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4 text-[#6B8E5F] dark:text-[#7A9D6D] animate-pulse" />
        ) : (
          <VolumeOff className="w-4 h-4 text-[#8A9488] dark:text-[#4A5A4E]" />
        )}
      </button>
    </>
  );
}
