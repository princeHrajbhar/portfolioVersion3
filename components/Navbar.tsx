'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Molle } from 'next/font/google';

  const molle = Molle({
  weight: '400',
  subsets: ['latin'],
});

interface NavLink {
  name: string;
  sectionId: string;
}

interface NavbarProps {
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Navbar({ activeSection, scrollToSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Home', sectionId: 'home' },
    { name: 'About', sectionId: 'about' },
    { name: 'Education', sectionId: 'education' },
    { name: 'Skills', sectionId: 'skills' },
    { name: 'Projects', sectionId: 'projects' },
   { name: 'Team', sectionId: 'team' },
    { name: 'Contact', sectionId: 'contact' },
  ];

  const hoverAnimation = {
    scale: 1.05,
    transition: { duration: 0.2 },
  };

  const tapAnimation = {
    scale: 0.95,
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 ${
        isScrolled
          ? 'bg-gradient-to-br dark:from-purple-900 dark:via-black dark:to-purple-900 bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-br dark:from-purple-900 dark:via-black dark:to-purple-900 bg-white/50 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ rotate: [-5, 5, -5], transition: { duration: 0.5 } }}>
            <button 
              onClick={() => {
                scrollToSection('home');
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-2"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold"
              >
                P
              </motion.span>
             <span className={`${molle.className} text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent`}>
  Prince.rb
</span>

            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <motion.div
                key={link.sectionId}
                whileHover={hoverAnimation}
                whileTap={tapAnimation}
              >
                <button
                  onClick={() => handleNavClick(link.sectionId)}
                  className={`relative px-2 py-1 ${
                    activeSection === link.sectionId
                      ? 'text-purple-400 font-medium'
                      : 'text-gray-700 dark:text-gray-300 hover:text-purple-300'
                  }`}
                >
                  {link.name}
                  {activeSection === link.sectionId && (
                    <motion.span
                      layoutId="activeLink"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-purple-500"
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                </button>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <motion.button
            whileHover={hoverAnimation}
            whileTap={tapAnimation}
            className="md:hidden focus:outline-none z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col space-y-1">
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: 45, y: 6, backgroundColor: '#a78bfa' }
                    : { rotate: 0, backgroundColor: isScrolled ? '#6b46c1' : '#ffffff' }
                }
                className="h-0.5 w-full"
              />
              <motion.span
                animate={
                  isMenuOpen 
                    ? { opacity: 0 } 
                    : { opacity: 1, backgroundColor: isScrolled ? '#6b46c1' : '#ffffff' }
                }
                className="h-0.5 w-full"
              />
              <motion.span
                animate={
                  isMenuOpen
                    ? { rotate: -45, y: -6, backgroundColor: '#a78bfa' }
                    : { rotate: 0, backgroundColor: isScrolled ? '#6b46c1' : '#ffffff' }
                }
                className="h-0.5 w-full"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden"
            >
              <motion.nav
                className={`mt-2 py-2 rounded-lg ${
                  isScrolled 
                    ? 'bg-white dark:bg-gray-900 shadow-lg' 
                    : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm'
                }`}
              >
                {navLinks.map((link) => (
                  <motion.div
                    key={link.sectionId}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * navLinks.indexOf(link) }}
                    className="px-2"
                  >
                    <button
                      onClick={() => {
                        // Close menu first to avoid visual glitches
                        setIsMenuOpen(false);
                        // Use setTimeout to ensure menu closes before scrolling
                        setTimeout(() => {
                          scrollToSection(link.sectionId);
                        }, 100);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-md ${
                        activeSection === link.sectionId
                          ? 'bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-900/50'
                      }`}
                    >
                      {link.name}
                      {activeSection === link.sectionId && (
                        <motion.span
                          layoutId="mobileActiveLink"
                          className="block h-0.5 bg-purple-500 mt-1"
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                      )}
                    </button>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}