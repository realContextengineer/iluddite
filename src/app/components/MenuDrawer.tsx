import React from 'react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function MenuDrawer({ isOpen, onClose, onUpgrade }: MenuDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Drawer */}
      <div
        className="absolute right-0 top-0 h-full w-72 bg-[#F5F2ED] dark:bg-[#1A1A1A] shadow-2xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-5">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#E8E4DD]/60 dark:hover:bg-[#2A2A2A] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-[#666] dark:text-[#888]" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-6 space-y-1">
          <Link
            to="/"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] hover:text-[#D4793A] dark:hover:text-[#E07A3A] rounded-xl hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] hover:text-[#D4793A] dark:hover:text-[#E07A3A] rounded-xl hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] hover:text-[#D4793A] dark:hover:text-[#E07A3A] rounded-xl hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/sign-up"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#3D3D3D] dark:text-[#B0ACA5] hover:text-[#D4793A] dark:hover:text-[#E07A3A] rounded-xl hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors"
          >
            Sign Up
          </Link>

          {/* Divider */}
          <div className="border-t border-[#E0DCD5]/50 dark:border-[#2A2A2A] my-3" />

          <button
            onClick={() => {
              onClose();
              onUpgrade();
            }}
            className="block w-full text-left px-4 py-3 text-[15px] text-[#D4793A] dark:text-[#E07A3A] font-medium rounded-xl hover:bg-[#D4793A]/[0.06] dark:hover:bg-[#E07A3A]/[0.06] transition-colors"
          >
            Upgrade →
          </button>
        </nav>

        {/* Footer text */}
        <div className="absolute bottom-8 left-0 right-0 px-10">
          <p className="text-[11px] text-[#BBB] dark:text-[#444] text-center leading-relaxed">
            A bit less screen.<br />A bit more you.
          </p>
        </div>
      </div>
    </div>
  );
}
