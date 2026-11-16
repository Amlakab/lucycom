'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { LucyBot } from '@/components/ui/LucyBot';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import {
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaBolt,
  FaGraduationCap,
  FaTools,
  FaCheckCircle,
  FaAward,
  FaCertificate,
  FaFileContract,
  FaMicrochip
} from 'react-icons/fa';

export default function SkillsPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();

  const capabilities = [
    {
      domain: isAmharic ? 'የቴሌኮም ኢንጂነሪንግ' : 'Telecom & RF Engineering',
      icon: <FaNetworkWired />,
      badge: isAmharic ? 'የተረጋገጠ' : 'ECA Licensed',
      skills: [
        { name: isAmharic ? 'የማማ ተከላ (እስከ 60 ሜትር)' : 'Tower Mast Erection (up to 60m)', level: 98 },
        { name: isAmharic ? '4G/5G LTE እና Microwave ኮሚሽኒንግ' : '4G/5G LTE & Microwave Commissioning', level: 95 },
        { name: isAmharic ? 'RF ድራይቭ ቴስት እና ሽፋን ማሻሻል' : 'RF Drive Testing & Coverage Optimization', level: 99 },
        { name: isAmharic ? 'የፋይበር ኦፕቲክ ባክቦን እና OTDR ፍተሻ' : 'Fiber Backhaul Splicing & OTDR Testing', level: 94 },
      ],
      standards: 'TIA/EIA-222 • 3GPP 5G NR • ECA Proclamation 1148/2019',
    },
    {
      domain: isAmharic ? 'ዳታ ሴንተር እና ዳታኮም' : 'Data Center & Structured Cabling',
      icon: <FaServer />,
      badge: 'Tier II / III',
      skills: [
        { name: isAmharic ? 'ትክክለኛ ማቀዝቀዣ (Precision Cooling)' : 'In-Row CRAC Precision Climate Control', level: 96 },
        { name: isAmharic ? 'ሞጁላር ዩፒኤስ (UPS) እና ሃይል ማከፋፈያ' : 'Modular N+1 Online UPS & Static Transfer', level: 97 },
        { name: isAmharic ? 'የፋይበር እና Cat6A/7 ኔትወርክ ዝርጋታ' : 'Structured OM4/OS2 Fiber & Cat6A/Cat7', level: 98 },
        { name: isAmharic ? 'FM-200 ጸረ-እሳት እና የአካባቢ ቁጥጥር' : 'Clean Agent Fire Suppression (FM-200)', level: 92 },
      ],
      standards: 'TIA-942 • Uptime Institute • ISO/IEC 11801',
    },
    {
      domain: isAmharic ? 'የድርጅት ሳይበር ደህንነት እና AI' : 'Cybersecurity & AI Surveillance',
      icon: <FaShieldAlt />,
      badge: 'Zero-Trust',
      skills: [
        { name: isAmharic ? 'Next-Gen Firewall (Fortinet / Cisco)' : 'Next-Generation Firewalls (NGFW / FortiGate)', level: 96 },
        { name: isAmharic ? 'AI ሰው ፊት ለይቶ የሚያውቅ ካሜራ' : 'Edge AI Facial Recognition & Tripwire CCTV', level: 95 },
        { name: isAmharic ? 'ማዕከላዊ የVMS ቁጥጥር ማዕከል' : 'Central Video Wall & VMS Operations', level: 94 },
        { name: isAmharic ? 'ባለብዙ ቅርንጫፍ IPsec VPN ትስስር' : 'Redundant IPsec VPNs & SD-WAN Fabrics', level: 95 },
      ],
      standards: 'ISO 27001 • NIST Cybersecurity Framework',
    },
    {
      domain: isAmharic ? 'ዘመናዊ ትምህርት እና VDI' : 'Smart Classrooms & VDI Labs',
      icon: <FaGraduationCap />,
      badge: 'OS-Easy VDI',
      skills: [
        { name: isAmharic ? '4K በይነ-መረብ ስማርት ፓነሎች' : '4K Interactive Touch Panels & Podiums', level: 97 },
        { name: isAmharic ? 'አውቶሜትድ ሌክቸር ቀረጻ እና ስርጭት' : 'Automated Multi-Angle Lecture Recording', level: 93 },
        { name: isAmharic ? 'ደመና-ተኮር የVDI ኮምፒውተር ላብራቶሪ' : 'Centralized Virtual Desktop (VDI) Infrastructure', level: 98 },
        { name: isAmharic ? 'የካምፓስ AV እና ዲጂታል ሳይኔጅ' : 'Campus Audio-Visual & Central Scheduling', level: 92 },
      ],
      standards: 'AVIXA Standards • OS-Easy Cloud Lab Integration',
    },
    {
      domain: isAmharic ? 'ኤሌክትሮሜካኒካል እና የፀሐይ ሃይል' : 'Electromechanical & Solar Energy',
      icon: <FaBolt />,
      badge: 'Grade-5 EEA',
      skills: [
        { name: isAmharic ? 'ከባድ ኢንዱስትሪያል ዲዝል ጀነሬተሮች' : 'Heavy Industrial Diesel Generator Sync', level: 95 },
        { name: isAmharic ? 'አውቶሜትድ ATS ስዊች እና ፓነሎች' : 'Automated Transfer Switches (ATS) Panels', level: 96 },
        { name: isAmharic ? 'ሃይብሪድ የፀሐይ ሃይል ማመንጫ (Solar PV)' : 'Off-Grid & Hybrid Solar Photovoltaic Systems', level: 92 },
        { name: isAmharic ? 'የመብረቅ እና የሰርጅ መከላከያ ኤርዝንግ' : 'Copper Earthing Grids & Transient Surge Arrestors', level: 97 },
      ],
      standards: 'EEA Proclamation 686/2010 • IEEE 142 Grounding',
    },
    {
      domain: isAmharic ? 'የICT ማማከር እና ኦዲት' : 'ICT Architecture & SLA Management',
      icon: <FaTools />,
      badge: '24/7 SLA',
      skills: [
        { name: isAmharic ? 'የኔትወርክ አፈጻጸም እና ደህንነት ኦዲት' : 'Comprehensive Network & Security Audits', level: 98 },
        { name: isAmharic ? 'የRFP እና የጨረታ BOQ ዝግጅት' : 'Architectural BOQ & Tender Specification Design', level: 99 },
        { name: isAmharic ? '24/7 የመስክ ድጋፍ እና የSLA ጥገና' : '24/7 NOC Telemetry & 4-Hour On-Site SLA', level: 97 },
        { name: isAmharic ? 'የባለሙያዎች የቴክኒክ ስልጠና' : 'Engineering Personnel Capacity Certification', level: 94 },
      ],
      standards: 'ITIL Framework • Project Management Professional (PMP)',
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-[#0a192f] text-gray-100' 
        : 'bg-[#F8FAFC] text-gray-900'
    }`}>
      <Navbar />

      <main className="pt-16 sm:pt-20">
        
        {/* =========================================================================
            HERO BANNER
           ========================================================================= */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/lucycom/skills-engineering-certifications.jpg"
              alt="Lucycom Technical Capabilities"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/50" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md mb-4">
                <FaAward className="text-yellow-400" />
                <span>{isAmharic ? 'የቴክኒክ ብቃት እና ደረጃዎች' : 'Engineering Capabilities'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የተረጋገጡ የኢንጂነሪንግ ብቃቶች' : 'Certified Technical Competencies'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'በዓለም አቀፍ ደረጃዎች የተመሰከረላቸው የቴሌኮም፣ የዳታ ሴንተር እና የሳይበር ደህንነት የኢንጂነሪንግ አሰራሮች።'
                  : 'Rigorous engineering standards, certified telecom riggers, and proven delivery across civil, RF, data center, and cyber defense.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            CAPABILITIES GRID
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            
            <div className="text-center mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2.5 tracking-tight">
                {isAmharic ? 'የሉሲኮም ቴክኒካል ኢንጂነሪንግ ዘርፎች' : 'Core Engineering Pillars & Benchmarks'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {isAmharic ? 'በእያንዳንዱ ዘርፍ የካበተ ልምድ ያላቸው የተመሰከረላቸው ባለሙያዎች።' : 'Each capability is delivered under strict quality verification and operator acceptance SLAs.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        {cap.icon}
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                        {cap.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {cap.domain}
                    </h3>

                    {/* Skills Progress Bars */}
                    <div className="space-y-3 pt-2">
                      {cap.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>
                            <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{skill.level}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-gray-100 dark:bg-slate-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-gray-100 dark:border-slate-800">
                    <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                      <strong>Standards:</strong> {cap.standards}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            BOTTOM CTA
           ========================================================================= */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white text-center">
          <div className="container mx-auto max-w-3xl space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {isAmharic ? 'የኢንጂነሪንግ ፍላጎትዎን እንወያይ' : 'Discuss Your Infrastructure Engineering Requirements'}
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              {isAmharic
                ? 'የኢንጂነሪንግ ባለሙያዎቻችን ለፍላጎትዎ ትክክለኛውን የዲዛይን እና የዋጋ ዝርዝር (BOQ) ያዘጋጁልዎታል።'
                : 'Connect with our engineering specialists today for site surveys, preliminary design, and tender proposals.'}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold shadow-lg transition-all text-xs sm:text-sm"
              >
                <FaFileContract />
                <span>{isAmharic ? 'የዋጋ መጠየቂያ ያቅርቡ' : 'Request Consultation & Tender BOQ'}</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <LucyBot />
      <Footer />
    </div>
  );
}
