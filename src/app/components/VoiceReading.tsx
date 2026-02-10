import React, { useState, useCallback, useEffect, useRef } from 'react';

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

/* Find the best available English voice */
function findBestVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  const englishVoices = voices.filter(v => v.lang.startsWith('en'));
  if (!englishVoices.length) return null;

  // Prefer premium/enhanced voices (Apple, Google, Microsoft high-quality)
  const premium = englishVoices.find(v =>
    v.name.includes('Premium') || v.name.includes('Enhanced') ||
    v.name.includes('Neural') || v.name.includes('Natural')
  );
  if (premium) return premium;

  // Fallback to known good voices
  const preferredNames = ['Daniel', 'James', 'Oliver', 'Aaron', 'Arthur', 'Rishi', 'Samantha', 'Karen', 'Moira', 'Fiona', 'Martha'];
  return preferredNames
    .map(name => englishVoices.find(v => v.name.includes(name)))
    .find(Boolean) || null;
}

export function VoiceReading() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const cachedVoice = useRef<SpeechSynthesisVoice | null>(null);

  // Pre-load voices as soon as they're available
  useEffect(() => {
    const loadVoices = () => {
      cachedVoice.current = findBestVoice();
    };

    // Try immediately (voices may already be loaded)
    loadVoices();

    // Also listen for the async voiceschanged event
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(() => {
    if (isSpeaking) {
      stop();
      return;
    }

    // Gather readable text from the page
    const main = document.querySelector('main');
    if (!main) return;

    const text = main.innerText || main.textContent || '';
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 0.95;
    utterance.lang = 'en-GB';

    // Use pre-cached voice, or try finding one now as fallback
    const voice = cachedVoice.current || findBestVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }, [isSpeaking, stop]);

  return (
    <button
      onClick={speak}
      className={`
        w-9 h-9 rounded-lg flex items-center justify-center
        transition-all duration-500 border
        ${isSpeaking
          ? 'bg-[#6B8E5F]/15 dark:bg-[#7A9D6D]/15 border-[#6B8E5F]/40 dark:border-[#7A9D6D]/40 shadow-[0_0_12px_rgba(107,142,95,0.4)] dark:shadow-[0_0_12px_rgba(122,157,109,0.3)]'
          : 'bg-[#E2EBE0]/40 dark:bg-[#1A221D]/60 border-[#D9E3D6]/50 dark:border-[#202A24] hover:border-[#6B8E5F]/30 dark:hover:border-[#7A9D6D]/30 hover:shadow-[0_0_8px_rgba(107,142,95,0.2)] dark:hover:shadow-[0_0_8px_rgba(122,157,109,0.15)]'
        }
      `}
      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
      title={isSpeaking ? 'Stop reading' : 'Read aloud'}
    >
      <SpeakingHead
        className={`w-5 h-5 ${
          isSpeaking
            ? 'text-[#6B8E5F] dark:text-[#7A9D6D] animate-pulse'
            : 'text-[#5A6A5E] dark:text-[#7A8A7E]'
        }`}
      />
    </button>
  );
}
