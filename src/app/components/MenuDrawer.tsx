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
        className="absolute right-0 top-0 h-full w-72 bg-[#F5F7F4] dark:bg-[#141A16] shadow-2xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <div className="flex justify-end p-5">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#E2EBE0]/60 dark:hover:bg-[#202A24] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 text-[#5A6A5E] dark:text-[#7A8A7E]" />
          </button>
        </div>

        {/* Menu items */}
        <nav className="px-6 space-y-1">
          <Link
            to="/"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] hover:text-[#6B8E5F] dark:hover:text-[#7A9D6D] rounded-xl hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] hover:text-[#6B8E5F] dark:hover:text-[#7A9D6D] rounded-xl hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors"
          >
            About
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] hover:text-[#6B8E5F] dark:hover:text-[#7A9D6D] rounded-xl hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors"
          >
            Contact
          </Link>
          <Link
            to="/sign-up"
            onClick={onClose}
            className="block px-4 py-3 text-[15px] text-[#2A3A2F] dark:text-[#B5BEB2] hover:text-[#6B8E5F] dark:hover:text-[#7A9D6D] rounded-xl hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors"
          >
            Sign Up
          </Link>

          {/* Divider */}
          <div className="border-t border-[#D9E3D6]/50 dark:border-[#202A24] my-3" />

          <button
            onClick={() => {
              onClose();
              onUpgrade();
            }}
            className="block w-full text-left px-4 py-3 text-[15px] text-[#6B8E5F] dark:text-[#7A9D6D] font-medium rounded-xl hover:bg-[#6B8E5F]/[0.06] dark:hover:bg-[#7A9D6D]/[0.06] transition-colors"
          >
            Upgrade →
          </button>
        </nav>

        {/* Footer text */}
        <div className="absolute bottom-8 left-0 right-0 px-10">
          <p className="text-[11px] text-[#B8C2B6] dark:text-[#3A4A3E] text-center leading-relaxed">
            A bit less screen.<br />A bit more you.
          </p>
        </div>
      </div>
    </div>
  );
}
