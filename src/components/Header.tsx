'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.slice(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false); // Close mobile menu on click
    }
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-4">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              Elite<span className="text-amber-500">Interiors</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/#home" className="text-gray-700 hover:text-blue-900 transition-colors font-medium" onClick={(e) => handleNavClick(e, '#home')}>
              Home
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-blue-900 transition-colors font-medium" onClick={(e) => handleNavClick(e, '#services')}>
              Services
            </Link>
            <Link href="/#portfolio" className="text-gray-700 hover:text-blue-900 transition-colors font-medium" onClick={(e) => handleNavClick(e, '#portfolio')}>
              Portfolio
            </Link>
            <Link href="/#process" className="text-gray-700 hover:text-blue-900 transition-colors font-medium" onClick={(e) => handleNavClick(e, '#process')}>
              Process
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-blue-900 transition-colors font-medium" onClick={(e) => handleNavClick(e, '#contact')}>
              Contact
            </Link>
            <Link href="/admin" className="text-gray-500 hover:text-blue-900 transition-colors font-medium text-sm">
              Admin
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+91 98765 43210</span>
            </div>
            <button className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium">
              Free Consultation
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <nav className="py-4 space-y-2">
              <Link href="/#home" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={(e) => handleNavClick(e, '#home')}>
                Home
              </Link>
              <Link href="/#services" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={(e) => handleNavClick(e, '#services')}>
                Services
              </Link>
              <Link href="/#portfolio" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={(e) => handleNavClick(e, '#portfolio')}>
                Portfolio
              </Link>
              <Link href="/#process" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={(e) => handleNavClick(e, '#process')}>
                Process
              </Link>
              <Link href="/#contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-50" onClick={(e) => handleNavClick(e, '#contact')}>
                Contact
              </Link>
              <div className="px-4 py-2 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 98765 43210</span>
                </div>
                <button className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors">
                  Free Consultation
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;