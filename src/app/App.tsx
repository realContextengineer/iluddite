import React, { useState, useEffect } from 'react';
import { DailyReading } from './components/DailyReading';
import { ThemeToggle } from './components/ThemeToggle';
import readingsData from '../data/readings.json';
import promptsData from '../data/prompts.json';
import hammerLogo from '../assets/hammer.jpg';
import iludditeLogo from '../assets/iluddite-logo.png';

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

function App() {
  const [reading, setReading] = useState<Reading | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark by default

  // Initialize dark mode — default to dark
  useEffect(() => {
    const stored = localStorage.getItem('dailyluddite-theme');
    const shouldBeDark = stored !== 'light'; // Dark unless explicitly set to light
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dailyluddite-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dailyluddite-theme', 'light');
    }
  };

  // Fetch today's reading
  useEffect(() => {
    const fetchReading = async () => {
      try {
        const response = await fetch('/api/today');
        if (response.ok) {
          const data = await response.json();
          setReading(data as Reading);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log('API not available, using fallback readings');
      }

      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const diff = now.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      const dayOfYear = Math.floor(diff / oneDay);

      const localReading = readingsData.find((r) => r.day === dayOfYear);
      if (localReading) {
        setReading(localReading as Reading);
      } else {
        const todayPrompt = promptsData.find((p) => p.day === dayOfYear);
        if (todayPrompt) {
          setReading({
            day: todayPrompt.day,
            date: todayPrompt.date,
            title: todayPrompt.title,
            somaticInvitation: "Today's reading is being prepared. In the meantime, take a breath. Look away from this screen for a moment. Notice what's around you — the light, the sounds, the temperature of the air. That's the practice. You're already doing it.",
            practice: "Close your eyes for one minute. Just one. See what your mind does when it's not being fed.",
            niceSelf: "Make yourself a cup of something warm and drink it without looking at a screen.",
            niceOther: "Send a short message to someone you haven't spoken to in a while. No reason needed.",
            quote: "The greatest thing in the world is to know how to belong to oneself.",
            quoteSource: "Michel de Montaigne",
            techBoundary: "Put your phone in another room for the next hour. It'll survive. So will you.",
            tags: ["presence", "rest", "awareness"],
          });
        } else {
          setReading(readingsData[0] as Reading);
        }
      }
      setLoading(false);
    };

    fetchReading();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F2ED] dark:bg-[#111111] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#F5F2ED]/80 dark:bg-[#111111]/80 border-b border-[#E0DCD5]/50 dark:border-[#222222]/80">
        <div className="max-w-xl mx-auto px-5">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={iludditeLogo} alt="iLuddite" className="h-10 w-auto" />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
              <button
                className="px-4 py-1.5 bg-[#D4793A] dark:bg-[#E07A3A] text-white rounded-full hover:opacity-90 transition-opacity text-[13px] font-medium"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-5 pt-10 pb-20">
        {loading ? (
          <div className="max-w-xl mx-auto text-center py-24">
            <div className="inline-flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-[#E07A3A]/30 border-t-[#E07A3A] rounded-full animate-spin" />
              <p className="text-[#888] dark:text-[#666] text-[14px]">
                Loading today's reading...
              </p>
            </div>
          </div>
        ) : reading ? (
          <DailyReading reading={reading} />
        ) : (
          <div className="max-w-xl mx-auto text-center py-24">
            <p className="text-[#888] dark:text-[#666] text-[14px]">
              No reading available. Check back soon.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0DCD5]/50 dark:border-[#222222]/80">
        <div className="max-w-xl mx-auto px-5 py-10">
          <div className="text-center space-y-3">
            <p className="text-[13px] text-[#999] dark:text-[#555] leading-relaxed">
              A daily practice in unplugging.<br />
              Human-paced. Ad-free. No tracking.
            </p>
            <p className="text-[11px] text-[#BBB] dark:text-[#333]">
              © 2026 <span className="text-[#D4793A] dark:text-[#E07A3A]">i</span>Luddite
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
