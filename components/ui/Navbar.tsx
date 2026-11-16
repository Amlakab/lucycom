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
  FaNetworkWired,
  FaServer,
  FaGraduationCap,
  FaShieldAlt,
  FaBolt,
  FaTools,
  FaNewspaper,
  FaAngleRight,
} from 'react-icons/fa';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, isAmharic } = useLanguage();
  const pathname = usePathname();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isLanguageOpenMobile, setIsLanguageOpenMobile] = useState(false);
  const [isRequestsOpen, setIsRequestsOpen] = useState(false);
  const [isRequestsOpenMobile, setIsRequestsOpenMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  const languageMenuRef = useRef<HTMLDivElement>(null);
  const requestsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close menus whenever the route/pathname changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsLanguageOpenMobile(false);
    setIsRequestsOpen(false);
    setIsRequestsOpenMobile(false);
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

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (isLanguageOpen && languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setIsLanguageOpen(false);
      }
      if (isRequestsOpen && requestsMenuRef.current && !requestsMenuRef.current.contains(target)) {
        setIsRequestsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLanguageOpen, isRequestsOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsLanguageOpenMobile(false);
    setIsRequestsOpenMobile(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageOpen((prev) => !prev);
    setIsRequestsOpen(false);
  };

  const toggleLanguageMobile = () => {
    setIsLanguageOpenMobile((prev) => !prev);
  };

  const toggleRequestsDropdown = () => {
    setIsRequestsOpen((prev) => !prev);
    setIsLanguageOpen(false);
  };

  const toggleRequestsMobile = () => {
    setIsRequestsOpenMobile((prev) => !prev);
  };

  const navLinks = [
    { href: '/', label: t('nav.home', 'Home') },
    { href: '/solutions', label: t('nav.solutions', 'Solutions') },
    { href: '/projects', label: t('nav.projects', 'Projects') },
    { href: '/partners', label: t('nav.partners', 'Partners') },
    { href: '/licenses', label: isAmharic ? 'ፈቃዶች' : 'Licenses' },
    { href: '/news', label: isAmharic ? 'ዜናዎች' : 'News' },
    { href: '/about', label: t('nav.about', 'About') },
    { href: '/contact', label: t('nav.contact', 'Contact') },
  ];

  const requestOptions = [
    {
      href: '/contact?service=Telecom+Infrastructure',
      label: isAmharic ? 'የቴሌኮም መሰረተ-ልማት አገልግሎት መጠየቂያ' : 'Request for Telecom Infrastructure',
      sub: isAmharic ? 'ማማ ተከላ፣ 4G/5G LTE፣ ማይክሮዌቭ' : 'Tower erection, 4G/5G LTE, RF drive testing',
      icon: FaNetworkWired,
    },
    {
      href: '/contact?service=Data+Center+%26+Datacom',
      label: isAmharic ? 'የዳታ ሴንተር እና ዳታኮም አገልግሎት መጠየቂያ' : 'Request for Data Center & Datacom',
      sub: isAmharic ? 'Tier II/III፣ ማቀዝቀዣ፣ ሞጁላር ዩፒኤስ' : 'Tier II/III facilities, precision CRAC & UPS',
      icon: FaServer,
    },
    {
      href: '/contact?service=Smart+Education',
      label: isAmharic ? 'የዘመናዊ ትምህርት አገልግሎት መጠየቂያ' : 'Request for Smart Education & VDI',
      sub: isAmharic ? 'ስማርት ቦርዶች፣ ሌክቸር ቀረጻ፣ VDI ላብ' : 'Interactive panels, lecture capture, VDI labs',
      icon: FaGraduationCap,
    },
    {
      href: '/contact?service=Enterprise+Security',
      label: isAmharic ? 'የድርጅት ደህንነት እና ሲሲቲቪ አገልግሎት መጠየቂያ' : 'Request for Enterprise Security & CCTV',
      sub: isAmharic ? 'AI ካሜራዎች፣ ዙሪያ ጥበቃ፣ NGFW' : 'AI facial IP cameras, perimeter & firewalls',
      icon: FaShieldAlt,
    },
    {
      href: '/contact?service=Electromechanical+%26+Solar',
      label: isAmharic ? 'የኤሌክትሮሜካኒካል እና የፀሐይ ሃይል መጠየቂያ' : 'Request for Electromechanical & Solar',
      sub: isAmharic ? 'ጀነሬተሮች፣ ATS እና የፀሐይ ሃይል' : 'Industrial generators, ATS & solar PV',
      icon: FaBolt,
    },
    {
      href: '/contact?service=ICT+Consultancy',
      label: isAmharic ? 'የICT ማማከር እና ኦዲት አገልግሎት መጠየቂያ' : 'Request for ICT Consultancy & Audit',
      sub: isAmharic ? 'የኔትወርክ ኦዲት፣ RFP እና 24/7 SLA' : 'Network audits, tender BOQ & SLA retainers',
      icon: FaTools,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const navLinkClasses = (href: string) => `
    relative px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 rounded-lg whitespace-nowrap
    ${isActive(href) 
      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-900/30' 
      : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
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
      {/* Fixed Top Navbar Bar */}
      <header className="fixed top-0 left-0 right-0 w-full z-[9999] h-16 sm:h-20 bg-white/95 dark:bg-[#0a192f]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 shadow-sm transition-colors duration-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            {/* Left Side: Brand Logo + Name */}
            <Link
              href="/"
              className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl overflow-hidden border border-blue-200 dark:border-blue-800 shadow-sm group-hover:scale-105 transition-transform duration-200 bg-white flex items-center justify-center">
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
                <span className="text-base sm:text-lg xl:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {isAmharic ? 'ሉሲኮም ቴክኖሎጂስ' : 'Lucycom Technologies'}
                </span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400 hidden sm:block">
                  {isAmharic ? 'ICT እና ቴሌኮም መፍትሄዎች አ.ማ' : 'ICT & Telecom Solutions S.C.'}
                </span>
              </div>
            </Link>

            {/* Right Side: Desktop Navigation Links + Requests Dropdown + Actions */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <nav aria-label="Main Navigation" className="flex items-center space-x-0.5 xl:space-x-1">
                {/* Standard Nav Links before Requests */}
                {navLinks.slice(0, 6).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClasses(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Requests Dropdown Desktop */}
                <div className="relative" ref={requestsMenuRef}>
                  <button
                    type="button"
                    onClick={toggleRequestsDropdown}
                    className={`relative px-2.5 py-1.5 text-xs xl:text-sm font-medium transition-all duration-200 rounded-lg flex items-center space-x-1 cursor-pointer whitespace-nowrap ${
                      isRequestsOpen || pathname.startsWith('/contact?service=')
                        ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-900/30'
                        : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20'
                    }`}
                    aria-expanded={isRequestsOpen}
                  >
                    <span>{isAmharic ? 'አገልግሎት ይጠይቁ' : 'Requests'}</span>
                    <FaChevronDown
                      className={`transition-transform duration-200 text-gray-500 text-[10px] ${
                        isRequestsOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isRequestsOpen && (
                    <div
                      className="absolute right-0 mt-2 w-80 xl:w-96 bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-700 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-800">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                          {isAmharic ? 'የአገልግሎት መጠየቂያዎች' : 'Service Requests & Quotations'}
                        </span>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                          {isAmharic ? 'የሚፈልጉትን አገልግሎት ይምረጡ' : 'Choose a solution to submit your project scope'}
                        </p>
                      </div>

                      <div className="py-1 max-h-[360px] overflow-y-auto">
                        {requestOptions.map((opt) => {
                          const Icon = opt.icon;
                          return (
                            <Link
                              key={opt.href}
                              href={opt.href}
                              onClick={() => setIsRequestsOpen(false)}
                              className="flex items-start space-x-3 px-4 py-2.5 hover:bg-blue-50/70 dark:hover:bg-blue-900/30 transition-colors group cursor-pointer"
                            >
                              <div className="mt-0.5 p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <Icon size={14} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-xs font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                                  {opt.label}
                                </div>
                                <div className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                  {opt.sub}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      <div className="px-3 pt-2 pb-1 border-t border-gray-100 dark:border-slate-800">
                        <Link
                          href="/contact"
                          onClick={() => setIsRequestsOpen(false)}
                          className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                        >
                          <span>{isAmharic ? 'አጠቃላይ የዋጋ መጠየቂያ' : 'Custom RFP / General Inquiry'}</span>
                          <FaFileContract size={12} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Remaining Nav Links (About, Contact) */}
                {navLinks.slice(6).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClasses(link.href)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Vertical divider */}
              <div className="h-5 w-px bg-gray-200 dark:bg-slate-700 mx-1" />

              {/* Language Selector Desktop */}
              <div className="relative" ref={languageMenuRef}>
                <button
                  type="button"
                  onClick={toggleLanguageDropdown}
                  className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-800 dark:text-gray-200 transition-all text-xs font-medium cursor-pointer"
                  aria-label="Change Language"
                  title="Change Language"
                >
                  <FaGlobe className="text-blue-600 dark:text-blue-400" size={13} />
                  <span className="font-semibold">{language.toUpperCase()}</span>
                  <FaChevronDown
                    className={`transition-transform duration-200 text-gray-500 text-[9px] ${isLanguageOpen ? 'rotate-180' : ''}`}
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
                  <FaSun size={15} className="text-yellow-400" />
                ) : (
                  <FaMoon size={15} className="text-slate-700 hover:text-blue-600" />
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
              {navLinks.slice(0, 6).map((link) => (
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

              {/* Requests Accordion in Mobile */}
              <div className="rounded-xl border border-gray-200 dark:border-slate-800 overflow-hidden">
                <button
                  type="button"
                  onClick={toggleRequestsMobile}
                  className="w-full flex items-center justify-between px-4 py-3 text-base font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-slate-800/60 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FaFileContract className="text-blue-600 dark:text-blue-400" size={15} />
                    <span>{isAmharic ? 'አገልግሎት ይጠይቁ (Requests)' : 'Requests & Quotes'}</span>
                  </span>
                  <FaChevronDown
                    className={`transition-transform duration-200 text-gray-500 text-xs ${
                      isRequestsOpenMobile ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>

                {isRequestsOpenMobile && (
                  <div className="px-2 pb-2 pt-1 space-y-1 bg-gray-50 dark:bg-[#112240]/50 border-t border-gray-200 dark:border-slate-800">
                    {requestOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <Link
                          key={opt.href}
                          href={opt.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-start space-x-3 px-3 py-2 rounded-lg hover:bg-white dark:hover:bg-slate-800 text-xs transition-colors group"
                        >
                          <div className="mt-0.5 text-blue-600 dark:text-blue-400">
                            <Icon size={13} />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600">
                              {opt.label}
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-400">
                              {opt.sub}
                            </div>
                          </div>
                        </Link>
                      );
                    })}

                    <Link
                      href="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-center mt-2 px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors"
                    >
                      {isAmharic ? 'አጠቃላይ የዋጋ መጠየቂያ' : 'Custom RFP / General Inquiry'}
                    </Link>
                  </div>
                )}
              </div>

              {/* Remaining Nav Links */}
              {navLinks.slice(6).map((link) => (
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

            {/* Quick Action Button in Mobile Menu */}
            <div className="border-t border-gray-200 dark:border-slate-800 pt-3 pb-2">
              <Link
                href="/contact"
                className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-sm transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.get_quote', 'Get a Quote')}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;