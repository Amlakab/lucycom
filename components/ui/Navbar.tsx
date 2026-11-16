'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import {
  FaSun,
  FaMoon,
  FaGlobe,
  FaChevronDown,
  FaCheck,
  FaFileContract,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, isAmharic } = useLanguage();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLanguageOpenMobile, setIsLanguageOpenMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu whenever the route/pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpenMobile(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close desktop language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (isLanguageOpen && languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen]);

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageOpenMobile(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen((prev) => !prev);
  };

  const toggleLanguageMobile = () => {
    setIsLanguageOpenMobile((prev) => !prev);
  };

  const navLinks = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/solutions', label: t('nav.solutions', 'Solutions') },
    { href: '/projects', label: t('nav.projects', 'Projects') },
    { href: '/partners', label: t('nav.partners', 'Partners') },
    { href: '/certification', label: isAmharic ? 'የብቃት ማረጋገጫ' : 'Certifications' },
    { href: '/about', label: t('nav.about', 'About') },
    { href: '/contact', label: t('nav.contact', 'Contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinkClasses = (href: string) => `
    relative px-3 py-2 text-sm lg:text-base font-medium transition-all duration-200 rounded-lg
    ${isActive(href) 
      ? 'text-blue-600 dark:text-blue-400 font-semibold' 
      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
    }
  `;

  const mobileNavLinkClasses = (href: string) => `
    flex items-center justify-between px-4 py-3 text-base font-semibold rounded-xl transition-all duration-200
    ${isActive(href) 
      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-600 shadow-xs' 
      : 'text-gray-800 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-slate-800/80 active:bg-gray-200 dark:active:bg-slate-800'
    }
  `;

  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 w-full z-[9999] h-16 sm:h-20 bg-white dark:bg-[#0a192f] border-b border-gray-200 dark:border-slate-800" />
    );
  }

  return (
    <>
      {/* Fixed Top Navbar Bar matching HRMS */}
      <header className="fixed top-0 left-0 right-0 w-full z-[9999] h-16 sm:h-20 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="container mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Logo + Brand Name */}
            <Link
  href="/"
  className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0 relative -left-12 sm:-left-14 lg:-left-16"
>
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl overflow-hidden border border-blue-200 dark:border-blue-800 shadow-sm group-hover:scale-105 transition-transform duration-200 bg-white flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Lucycom Technologies S.C. Logo"
                  fill
                  className="object-contain p-1"
                  sizes="(max-width: 640px) 36px, 48px"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {isAmharic ? 'ሉሲኮም ቴክኖሎጂስ' : 'Lucycom Technologies'}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:block">
                  {isAmharic ? 'ICT እና ቴሌኮም መፍትሄዎች አ.ማ' : 'ICT & Telecom Solutions S.C.'}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={navLinkClasses(link.href)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Section: Auth, Language, Theme (Desktop) */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              {/* User Section */}
                

              {/* Language Selector Desktop */}
              <div className="relative" ref={languageMenuRef}>
                <button
                  type="button"
                  onClick={toggleLanguageDropdown}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 transition-all text-xs xl:text-sm font-medium cursor-pointer"
                  aria-label="Change Language"
                  title="Change Language"
                >
                  <FaGlobe className="text-blue-600 dark:text-blue-400" size={14} />
                  <span className="font-semibold">{language.toUpperCase()}</span>
                  <FaChevronDown
                    className={`transition-transform duration-200 text-gray-500 ${isLanguageOpen ? 'rotate-180' : ''}`}
                    size={10}
                  />
                </button>

                {isLanguageOpen && (
                  <div
                    className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl py-1.5 z-50 animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                        language === 'en'
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>English</span>
                      {language === 'en' && <FaCheck size={12} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('am');
                        setIsLanguageOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                        language === 'am'
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>አማርኛ</span>
                      {language === 'am' && <FaCheck size={12} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle Desktop */}
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <FaSun size={16} className="text-yellow-400 animate-spin-slow" />
                ) : (
                  <FaMoon size={16} className="text-slate-700 hover:text-blue-600" />
                )}
              </button>
            </div>

            {/* Mobile Controls (Theme Toggle + Hamburger) */}
            <div className="flex lg:hidden items-center space-x-1.5 sm:space-x-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <FaSun size={15} className="text-yellow-400" />
                ) : (
                  <FaMoon size={15} className="text-slate-700" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleMenu}
                className="p-2 rounded-lg border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
                aria-expanded={isMenuOpen}
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out ${
                      isMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-current transform transition duration-300 ease-in-out ${
                      isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                    }`}
                  />
                </div>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] lg:hidden animate-fadeIn"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="fixed top-16 sm:top-20 left-0 right-0 w-full z-[9999] lg:hidden bg-white dark:bg-[#0a192f] border-b border-gray-200 dark:border-slate-800 shadow-2xl max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto animate-slideDown"
        >
          <div className="container mx-auto px-4 py-4 space-y-3">
            {/* Navigation Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={mobileNavLinkClasses(link.href)}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{link.label}</span>
                  {isActive(link.href) && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  )}
                </Link>
              ))}
            </div>

            {/* Language Selector Mobile */}
            <div className="border-t border-gray-200 dark:border-slate-800 pt-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-1 mb-2 block">
                {language === 'am' ? 'ቋንቋ ይምረጡ' : 'Select Language'}
              </span>
              <div className="relative">
                <button
                  type="button"
                  onClick={toggleLanguageMobile}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-gray-50 dark:bg-[#112240] text-gray-800 dark:text-gray-200 font-medium text-sm cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <FaGlobe className="text-blue-600 dark:text-blue-400" size={16} />
                    <span>{language === 'en' ? 'English (EN)' : 'አማርኛ (AM)'}</span>
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-200 text-gray-500 ${isLanguageOpenMobile ? 'rotate-180' : ''}`}
                    size={12}
                  />
                </button>

                {isLanguageOpenMobile && (
                  <div className="mt-2 space-y-1 bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-700 rounded-xl p-1 shadow-lg">
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('en');
                        setIsLanguageOpenMobile(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        language === 'en'
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>English</span>
                      {language === 'en' && <FaCheck size={14} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLanguage('am');
                        setIsLanguageOpenMobile(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                        language === 'am'
                          ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>አማርኛ (Amharic)</span>
                      {language === 'am' && <FaCheck size={14} className="text-blue-600 dark:text-blue-400" />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Account / User Section in Mobile Menu */}
            <div className="border-t border-gray-200 dark:border-slate-800 pt-4 pb-2">
                <div className="space-y-2.5">
                  
                  <Link
                    href="/contact"
                    className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.get_quote', 'Get a Quote')}
                  </Link>
                </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
