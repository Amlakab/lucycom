'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import portfolioApi from '@/lib/api/portfolio';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTelegram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaAward,
  FaCheckCircle,
  FaEnvelopeOpenText,
  FaNetworkWired,
  FaServer,
  FaGraduationCap,
  FaShieldAlt,
  FaVideo,
  FaBolt,
  FaInfoCircle,
  FaProjectDiagram,
  FaHandshake,
  FaCertificate,
  FaHome,
  FaNewspaper,
  FaBox
} from 'react-icons/fa';

const Footer: React.FC = () => {
  const { t, isAmharic } = useLanguage();
  const { theme } = useTheme();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    portfolioApi.getSettings()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const solutions = [
    {
      icon: <FaNetworkWired />,
      title: isAmharic ? 'የቴሌኮም መሰረተ-ልማት' : 'Telecom Infrastructure',
      link: '/solutions'
    },
    {
      icon: <FaServer />,
      title: isAmharic ? 'ዳታ ሴንተር እና ዳታኮም' : 'Data Center & Datacom',
      link: '/solutions'
    },
    {
      icon: <FaGraduationCap />,
      title: isAmharic ? 'ዘመናዊ ትምህርት እና VDI' : 'Smart Education & VDI',
      link: '/solutions'
    },
    {
      icon: <FaShieldAlt />,
      title: isAmharic ? 'የድርጅት ደህንነት እና ፋየርዎል' : 'Enterprise Cybersecurity',
      link: '/solutions'
    },
    {
      icon: <FaVideo />,
      title: isAmharic ? 'AI ሲሲቲቪ እና ቅኝት' : 'AI CCTV & Surveillance',
      link: '/solutions'
    },
    {
      icon: <FaBolt />,
      title: isAmharic ? 'ኤሌክትሮሜካኒካል እና ሃይል' : 'Electromechanical & Solar',
      link: '/solutions'
    },
  ];

  const quickLinks = [
    { icon: <FaHome />, title: t('nav.home', 'Home'), href: '/' },
    { icon: <FaInfoCircle />, title: t('nav.about', 'About Us'), href: '/about' },
    { icon: <FaNetworkWired />, title: t('nav.solutions', 'Solutions'), href: '/solutions' },
    { icon: <FaBox />, title: isAmharic ? 'ምርቶች' : 'Products', href: '/products' },
    { icon: <FaProjectDiagram />, title: t('nav.projects', 'Projects'), href: '/projects' },
    { icon: <FaHandshake />, title: t('nav.partners', 'Partners'), href: '/partners' },
    { icon: <FaCertificate />, title: isAmharic ? 'ፈቃዶች' : 'Licenses', href: '/licenses' },
    { icon: <FaNewspaper />, title: isAmharic ? 'ዜናዎች' : 'News', href: '/news' },
    { icon: <FaPhoneAlt />, title: t('nav.contact', 'Contact Us'), href: '/contact' },
  ];

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt />,
      text: isAmharic ? 'ዋና መስሪያ ቤት' : 'Headquarters',
      detail: settings?.contact?.location || (isAmharic 
        ? 'አዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406፣ ኢትዮጵያ' 
        : 'Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia')
    },
    {
      icon: <FaPhoneAlt />,
      text: isAmharic ? 'የስልክ መስመሮች' : 'Direct Lines',
      detail: settings?.contact?.phone 
        ? `${settings.contact.phone}${settings.contact.alternatePhone ? ' / ' + settings.contact.alternatePhone : ''}` 
        : '+251 939 997 612 / +251 911 510 295'
    },
    {
      icon: <FaEnvelope />,
      text: isAmharic ? 'ኢሜይል' : 'Email Address',
      detail: settings?.contact?.email || 'info@lucycomtechnologies.com'
    },
    {
      icon: <FaClock />,
      text: isAmharic ? 'የስራ ሰዓት' : 'Working Hours',
      detail: settings?.contact?.workingHours || (isAmharic ? 'ሰኞ - አርብ፡ 2:30 - 11:30\nቅዳሜ፡ 2:30 - 6:30' : 'Mon-Fri: 8:30AM - 5:30PM\nSat: 8:30AM - 12:30PM')
    },
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTelegram />, href: 'https://t.me', label: 'Telegram' },
  ];

  return (
    <footer className={`transition-colors duration-300 border-t ${
      theme === 'dark' 
        ? 'bg-[#0a192f] border-slate-800 text-gray-300' 
        : 'bg-slate-900 border-blue-600 text-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-10 sm:py-14">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & Slogan */}
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-blue-400">
              LUCYCOM TECHNOLOGIES S.C.
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {isAmharic 
                ? 'ደረጃቸውን የጠበቁ፣ አስተማማኝና ሊያድጉ የሚችሉ የICT እና ቴሌኮም መሰረተ-ልማቶችን በመንደፍ፣ በማቅረብና በመደገፍ ላይ የተሰማራ ቀዳሚ የኢትዮጵያ አክሲዮን ማህበር።'
                : 'Premier Ethiopian share company dedicated to designing, supplying, and supporting world-class, international standards-compliant ICT and telecom infrastructure.'}
            </p>
            
            <p className="text-xs text-blue-300 font-semibold tracking-wide">
              {isAmharic 
                ? (settings?.company?.sloganAmharic || '«ሉሲ መገኛ፣ ሉሲኮም መዳረሻ»') 
                : (settings?.company?.slogan ? `«${settings.company.slogan}»` : '«Lucy the origin, LucyCom the destination»')}
            </p>

            {/* Achievements */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                <FaAward className="text-yellow-400 shrink-0" />
                <span>{isAmharic ? 'Tier-II / III የዳታ ሴንተር ደረጃዎች' : 'Tier-II / III Data Center Standards'}</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-400">
                <FaCheckCircle className="text-blue-400 shrink-0" />
                <span>{isAmharic ? '120+ የተጠናቀቁ የቴሌኮም ሳይቶች' : '120+ Telecom Sites Delivered'}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
              {t('footer.quick_links', 'Quick Links')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <span className="text-blue-500 text-xs">{link.icon}</span>
                    <span>{link.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Solutions */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
              {t('footer.solutions', 'Solutions')}
            </h4>
            <ul className="space-y-2.5 text-sm">
              {solutions.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.link}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    <span className="text-blue-500 text-xs">{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & CTA */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4 border-b border-gray-800 pb-2">
              {t('footer.contact_info', 'Contact Info')}
            </h4>
            <div className="space-y-3 text-sm text-gray-400 mb-5">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-blue-400 mt-1 shrink-0 text-sm">{info.icon}</span>
                  <div>
                    <span className="text-xs font-semibold text-gray-300 block">{info.text}</span>
                    <span className="text-xs text-gray-400 whitespace-pre-line">{info.detail}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-all shadow-sm"
            >
              <FaEnvelopeOpenText />
              <span>{isAmharic ? 'የዋጋ መጠየቂያ ይላኩ' : 'Request a Quote / Consultation'}</span>
            </Link>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} LUCYCOM TECHNOLOGIES S.C. {isAmharic ? 'መብቱ በህግ የተጠበቀ ነው። የተመዘገበ የኢትዮጵያ አክሲዮን ማህበር።' : 'All rights reserved. Registered Ethiopian Share Company.'}
          </p>
          <div className="flex items-center space-x-3">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-slate-800 hover:bg-blue-600 text-gray-300 hover:text-white transition-colors"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
