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
import bitlessChess from '../assets/bitless-chess.png';

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
    <div className="min-h-screen bg-[#F5F2ED] dark:bg-[#111111] transition-colors duration-500">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#F5F2ED]/80 dark:bg-[#111111]/80 border-b border-[#E0DCD5]/50 dark:border-[#222222]/80">
        <div className="max-w-xl mx-auto px-5 relative">
          <div className="flex items-center justify-between h-24">
            {/* Left side */}
            <div className="flex items-center">
              <ThemeToggle isDark={isDarkMode} onToggle={toggleDarkMode} />
            </div>

            {/* Centre logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={bitlessChess} alt="Bitless" className="h-20 w-auto dark:brightness-90 animate-logo-pulse" />
            </Link>

            {/* Right side — hamburger menu */}
            <div className="flex items-center">
              <button
                onClick={() => setShowMenu(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#E8E4DD]/60 dark:hover:bg-[#2A2A2A] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-[#666] dark:text-[#888]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Strapline */}
      <div className="max-w-xl mx-auto px-5 pt-4 pb-2 text-center pl-8">
        <p className="text-[15px] text-[#2C2C2C] dark:text-[#E8E6E1]">
          A bit less screen. A bit more you.
        </p>
      </div>

      {/* Main Content */}
      <main className="px-5 pt-4 pb-20">
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
      <footer className="border-t border-[#E0DCD5]/50 dark:border-[#222222]/80">
        <div className="max-w-xl mx-auto px-5 py-10">
          <div className="text-center space-y-3">
            <p className="text-[13px] text-[#999] dark:text-[#555] leading-relaxed">
              A daily practice in unplugging.<br />
              Human-paced. Ad-free. No tracking.
            </p>
            <p className="text-[11px] text-[#BBB] dark:text-[#333]">
              © 2026 <span className="text-[#D4793A] dark:text-[#E07A3A]">Bit</span>less
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
