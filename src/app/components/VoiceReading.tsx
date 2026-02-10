import React, { useState, useCallback, useRef } from 'react';

/* Custom speaking-head SVG — side-profile silhouette with sound waves */
function SpeakingHead({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Head silhouette — side profile */}
      <path
        d="M4 11.5C4 7.36 7.13 4 11 4c3.31 0 6 2.69 6 6v1.5c0 .83-.67 1.5-1.5 1.5H14v2c0 1.1-.9 2-2 2H9.5v2.5c0 .28-.22.5-.5.5H7.5a.5.5 0 01-.5-.5V17c-1.66 0-3-1.34-3-3v-2.5z"
        fill="currentColor"
        opacity="0.85"
      />
      {/* Sound waves */}
      <path d="M18 9.5a4 4 0 010 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 7.5a7 7 0 010 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* Global puter type — loaded via script tag in index.html */
declare const puter: {
  ai: {
    txt2speech: (text: string, options?: Record<string, unknown>) => Promise<HTMLAudioElement>;
  };
};

export function VoiceReading() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  const speak = useCallback(async () => {
    if (isSpeaking || isLoading) {
      stop();
      return;
    }

    // Gather readable text from the page
    const main = document.querySelector('main');
    if (!main) return;

    const text = (main.innerText || main.textContent || '').trim();
    if (!text) return;

    // Puter.js has a 3000 char limit — truncate gracefully at sentence boundary
    let truncated = text;
    if (truncated.length > 2900) {
      truncated = truncated.slice(0, 2900);
      const lastSentence = truncated.lastIndexOf('.');
      if (lastSentence > 2000) truncated = truncated.slice(0, lastSentence + 1);
    }

    setIsLoading(true);

    try {
      const audio = await puter.ai.txt2speech(truncated, {
        provider: 'openai',
        model: 'tts-1',
        voice: 'nova',
        instructions: 'Speak calmly and soothingly, like a gentle meditation guide reading a daily reflection. Moderate pace, warm tone.',
      });

      audioRef.current = audio;
      audio.onended = () => {
        setIsSpeaking(false);
        audioRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        setIsLoading(false);
        audioRef.current = null;
      };

      await audio.play();
      setIsLoading(false);
      setIsSpeaking(true);
    } catch {
      setIsLoading(false);
      setIsSpeaking(false);
    }
  }, [isSpeaking, isLoading, stop]);

  return (
    <button
      onClick={speak}
      className={`
        w-9 h-9 rounded-lg flex items-center justify-center
        transition-all duration-500 border
        ${isSpeaking
          ? 'bg-[#6B8E5F]/15 dark:bg-[#7A9D6D]/15 border-[#6B8E5F]/40 dark:border-[#7A9D6D]/40 shadow-[0_0_12px_rgba(107,142,95,0.4)] dark:shadow-[0_0_12px_rgba(122,157,109,0.3)]'
          : isLoading
            ? 'bg-[#6B8E5F]/10 dark:bg-[#7A9D6D]/10 border-[#6B8E5F]/25 dark:border-[#7A9D6D]/25'
            : 'bg-[#E2EBE0]/40 dark:bg-[#1A221D]/60 border-[#D9E3D6]/50 dark:border-[#202A24] hover:border-[#6B8E5F]/30 dark:hover:border-[#7A9D6D]/30 hover:shadow-[0_0_8px_rgba(107,142,95,0.2)] dark:hover:shadow-[0_0_8px_rgba(122,157,109,0.15)]'
        }
      `}
      aria-label={isSpeaking ? 'Stop reading' : isLoading ? 'Loading voice...' : 'Read aloud'}
      title={isSpeaking ? 'Stop reading' : isLoading ? 'Loading...' : 'Read aloud'}
    >
      <SpeakingHead
        className={`w-5 h-5 ${
          isSpeaking
            ? 'text-[#6B8E5F] dark:text-[#7A9D6D] animate-pulse'
            : isLoading
              ? 'text-[#6B8E5F]/50 dark:text-[#7A9D6D]/50 animate-pulse'
              : 'text-[#5A6A5E] dark:text-[#7A8A7E]'
        }`}
      />
    </button>
  );
}
