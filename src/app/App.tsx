import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { PricingModal } from './components/PricingModal';
import { MenuDrawer } from './components/MenuDrawer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SignUpPage } from './pages/SignUpPage';
import { AmbientAudio } from './components/AmbientAudio';
import bitlessChess from '../assets/bitless-plug.png';
import forestGif from '../assets/forest.gif';
import forestAudio from '../assets/forest-ambient.mp3';
import ambientMusic from '../assets/ambient-music.mp3';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPricing, setShowPricing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bitless-theme');
    const shouldBeDark = stored !== 'light';
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
      localStorage.setItem('bitless-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('bitless-theme', 'light');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F4] dark:bg-[#0F1410] transition-colors duration-500 relative">
      {/* Forest background image */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.25] dark:opacity-[0.20] pointer-events-none"
        style={{ backgroundImage: `url(${forestGif})` }}
      />

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#F5F7F4]/70 dark:bg-[#0F1410]/70 border-b border-[#D9E3D6]/50 dark:border-[#1A221D]/80">
        <div className="max-w-xl mx-auto px-5 relative">
          <div className="flex items-center justify-between h-24">
            {/* Left side */}
            <div className="flex items-center gap-1">
              <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
              <AmbientAudio src={forestAudio} musicSrc={ambientMusic} />
            </div>

            {/* Centre logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={bitlessChess} alt="Bitless" className="h-[72px] w-auto dark:brightness-90 animate-logo-pulse" />
            </Link>

            {/* Right side — hamburger menu */}
            <div className="flex items-center">
              <button
                onClick={() => setShowMenu(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#E2EBE0]/60 dark:hover:bg-[#202A24] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-[#5A6A5E] dark:text-[#7A8A7E]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Strapline */}
      <div className="relative z-10 max-w-xl mx-auto px-5 pt-4 pb-2 text-center pl-8">
        <p className="text-[20px] text-[#1A2A1F] dark:text-[#E8EBE6]">
          Bitless Screen. A bit more you time.
        </p>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-5 pt-4 pb-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </main>

      {/* Menu Drawer */}
      <MenuDrawer
        isOpen={showMenu}
        onClose={() => setShowMenu(false)}
        onUpgrade={() => setShowPricing(true)}
      />

      {/* Pricing Modal */}
      {showPricing && <PricingModal onClose={() => setShowPricing(false)} />}

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#D9E3D6]/50 dark:border-[#1A221D]/80">
        <div className="max-w-xl mx-auto px-5 py-10">
          <div className="text-center space-y-3">
            <p className="text-[13px] text-[#8A9488] dark:text-[#4A5A4E] leading-relaxed">
              A daily practice in unplugging.<br />
              Human-paced. Ad-free. No tracking.
            </p>
            <p className="text-[11px] text-[#B8C2B6] dark:text-[#2A3A2E]">
              © 2026 <span className="text-[#6B8E5F] dark:text-[#7A9D6D]">Bit</span>less
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
