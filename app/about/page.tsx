'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { LucyBot } from '@/components/ui/LucyBot';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import portfolioApi from '@/lib/api/portfolio';
import {
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaAward,
  FaUsers,
  FaClock,
  FaHandshake,
  FaCheckCircle,
  FaStar,
  FaGlobe,
  FaCertificate,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaBuilding,
  FaFileContract,
  FaSitemap,
  FaCogs,
  FaBriefcase,
  FaUserTie,
  FaLaptopCode,
  FaVideo,
  FaGraduationCap,
  FaSearch,
  FaHammer,
  FaVial,
  FaClipboardCheck,
  FaHeadset
} from 'react-icons/fa';

export default function AboutPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    portfolioApi.getSettings()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  // Section 3: Core Pillars of Expertise (from PDF Section 3)
  const corePillars = [
    {
      icon: <FaNetworkWired />,
      title: isAmharic ? 'የICT መሰረተ-ልማት' : 'ICT Infrastructure',
      description: isAmharic
        ? 'የድርጅት ራውቲንግ፣ ስዊቺንግ፣ የተዋቀረ ኬብሊንግ (Structured Cabling)፣ ዩኒፋይድ ኮሙኒኬሽን እና የዋይ-ፋይ ኔትወርኮች።'
        : 'Enterprise routing, switching, structured cabling, unified communications, and enterprise Wi-Fi networks.',
    },
    {
      icon: <FaServer />,
      title: isAmharic ? 'ዳታ ሴንተር እና ዳታኮም' : 'Data Center & Datacom',
      description: isAmharic
        ? 'ደረጃቸውን የጠበቁ የዳታ ሴንተር ግንባታዎች፣ ትክክለኛ ማቀዝቀዣ (Precision Cooling)፣ ዩፒኤስ፣ ራኮች እና የኮር ኔትወርክ ፍልሰት።'
        : 'Tier-standard physical facility construction, precision cooling, modular UPS, server racks, and core network migration.',
    },
    {
      icon: <FaNetworkWired />,
      title: isAmharic ? 'የቴሌኮም አገልግሎቶች' : 'Telecom Services',
      description: isAmharic
        ? 'የማማ ተከላ፣ የሬዲዮ አክሰስ ተከላ፣ ኮሚሽኒንግ፣ የመስክ ድራይቭ ቴስት እና የRF ሽፋን ማሻሻያ።'
        : 'Tower erection, radio access installation, commissioning, drive testing, and RF coverage optimization.',
    },
    {
      icon: <FaVideo />,
      title: isAmharic ? 'ሲሲቲቪ እና ደህንነት' : 'CCTV & Security',
      description: isAmharic
        ? 'በAI የሚሰሩ የIP ቪዲዮ ካሜራዎች፣ ማዕከላዊ የቁጥጥር ማዕከላት (Command Rooms) እና አውቶሜትድ የመረጃ ትንተና።'
        : 'AI-enabled IP video surveillance, central command rooms, and automated neural analytics.',
    },
    {
      icon: <FaGraduationCap />,
      title: isAmharic ? 'ዘመናዊ የመማሪያ ክፍሎች' : 'Smart Classrooms',
      description: isAmharic
        ? 'ተግባራዊ ስማርት ቦርዶች፣ የትምህርት ቀረጻ፣ የርቀት ትምህርት እና የኦዲዮ-ቪዥዋል ቅንጅት።'
        : 'Interactive smart boards, automated lecture capture, remote e-learning, and audio-visual integration.',
    },
    {
      icon: <FaShieldAlt />,
      title: isAmharic ? 'VDI እና ፋየርዎል' : 'VDI & Firewall',
      description: isAmharic
        ? 'ማዕከላዊ የዴስክቶፕ ቨርቹዋል አሰራር (VDI)፣ ቀጣይ ትውልድ ፋየርዎል (NGFW)፣ VPNs እና የZero-Trust ደህንነት።'
        : 'Centralized desktop virtualization, Next-Gen firewalls, secure VPNs, and zero-trust security architecture.',
    },
  ];

  // Section 4: Core Values & Operational Standards (from PDF Section 4)
  const values = [
    {
      icon: <FaHandshake />,
      title: isAmharic ? 'ቀዳሚ ታማኝነት (Integrity)' : 'Integrity',
      description: isAmharic 
        ? 'ግልፅ የስራ ውል እና ቅን የቴክኒክ ምክር መስጠት።' 
        : 'Transparent contracting and honest technical advice built on mutual trust.',
    },
    {
      icon: <FaAward />,
      title: isAmharic ? 'የላቀ ጥራት (Excellence)' : 'Excellence',
      description: isAmharic 
        ? 'የIEEE፣ TIA/EIA እና የISO የቴሌኮሙኒኬሽን ደረጃዎችን በጥብቅ መከተል።' 
        : 'Strict adherence to IEEE, TIA/EIA, and ISO telecommunications standards.',
    },
    {
      icon: <FaShieldAlt />,
      title: isAmharic ? 'ለደህንነት ቅድሚያ (Safety First)' : 'Safety First',
      description: isAmharic 
        ? 'ከፍተኛ የማማ ተከላ ስራዎች ላይ የተረጋገጡ የደህንነት እና የPPE ህጎችን ተግባራዊ ማድረግ።' 
        : 'Certified safety procedures and specialized rigging protocols for high-altitude mast work.',
    },
    {
      icon: <FaUsers />,
      title: isAmharic ? 'ደንበኛ ተኮር (Customer Centricity)' : 'Customer Centricity',
      description: isAmharic 
        ? 'በእውነተኛ የስራ እና የተቋማት ፍላጎቶች ዙሪያ የተገነቡ ብጁ መፍትሄዎችን ማቅረብ።' 
        : 'Solutions custom-built around real institutional needs and operational budgets.',
    },
  ];

  // Section 4 Lifecycle: Figure 1 Standardized Project Delivery Lifecycle (from PDF Page 3)
  const deliveryLifecycle = [
    { step: '01', title: isAmharic ? 'ቅኝትና ዲዛይን' : 'Survey & Design', icon: <FaSearch />, desc: isAmharic ? 'የቦታ ጥናት፣ CAD እና RF ካርታ' : 'Site surveys, CAD drawings, RF heat-mapping' },
    { step: '02', title: isAmharic ? 'አቅርቦትና ግንባታ' : 'Supply & Build', icon: <FaHammer />, desc: isAmharic ? 'ትክክለኛ እቃዎችና የተረጋገጠ ግንባታ' : 'OEM procurement & certified field erection' },
    { step: '03', title: isAmharic ? 'ፍተሻና ድራይቭ ቴስት' : 'Testing & Drive', icon: <FaVial />, desc: isAmharic ? 'የድራይቭ ቴስትና የጥራት ማረጋገጫ' : 'RF drive tests, VSWR sweep & load testing' },
    { step: '04', title: isAmharic ? 'ርክክብና ስራ ማስጀመር' : 'Commissioning', icon: <FaClipboardCheck />, desc: isAmharic ? 'የርክክብ ሰነዶችና ስራ ማስጀመር' : 'Formal client acceptance & system live cutover' },
    { step: '05', title: isAmharic ? 'የ24/7 SLA ድጋፍ' : 'SLA & Support', icon: <FaHeadset />, desc: isAmharic ? 'የ4 ሰዓት የመስክ ጥገናና የNOC ቁጥጥር' : 'Continuous NOC monitoring & 4-hr on-site SLA' },
  ];

  // Section 8: Organizational Leadership & Structure (from PDF Section 8)
  const directorates = [
    {
      name: isAmharic ? 'የቴክኒክ ዳይሬክቶሬት' : 'Technical Directorate',
      icon: <FaCogs />,
      role: isAmharic ? 'የኢንጂነሪንግና የፕሮጀክት ስራዎች' : 'Engineering, Solutions & Field Rollouts',
      responsibilities: isAmharic 
        ? ['የቴሌኮም ማማ ተከላና RF ኦፕቲማይዜሽን', 'የዳታ ሴንተር ግንባታ እና ፕሪሲዥን ማቀዝቀዣ', 'የICT ኔትወርክ፣ ሳይበር ደህንነት እና VDI']
        : ['Telecom mast erection & RF drive optimization', 'Data center facilities & precision cooling builds', 'Enterprise routing, cybersecurity & VDI labs'],
    },
    {
      name: isAmharic ? 'የንግድና ኮሜርሻል ዳይሬክቶሬት' : 'Commercial Directorate',
      icon: <FaBriefcase />,
      role: isAmharic ? 'ሽያጭ፣ ግዥ እና ግንኙነት' : 'Client Relations, Procurement & Tenders',
      responsibilities: isAmharic
        ? ['የኮርፖሬት ሽያጭ እና የዋጋ ፕሮፖዛል (BOQ)', 'ከዓለም አቀፍ አምራቾች (OEMs) እቃዎችን ማቅረብ', 'የህዝብ ግንኙነት እና የደንበኞች አጋርነት']
        : ['Corporate sales & tender BOQ engineering', 'Direct tier-1 OEM procurement channels', 'Public relations & partner ecosystem alliances'],
    },
    {
      name: isAmharic ? 'የአስተዳደር ዳይሬክቶሬት' : 'Admin Directorate',
      icon: <FaBuilding />,
      role: isAmharic ? 'ሰው ሃይል፣ ፋይናንስ እና ሎጂስቲክስ' : 'Human Resources, Finance & Field Logistics',
      responsibilities: isAmharic
        ? ['የሰው ሃይል አስተዳደር እና የስራ ላይ ስልጠና', 'የፋይናንስ አስተዳደር እና የፕሮጀክት በጀት', 'የመስክ ሎጂስቲክስ፣ የደህንነት እቃዎች እና መጋዘን']
        : ['Certified rigger & personnel capacity building', 'Project financial controls & accounting', 'Field fleet logistics, warehousing & rigging PPE'],
    },
  ];

  const keyAchievements = [
    { number: '120+', label: isAmharic ? 'የቴሌኮም ጣቢያዎች ተከላ' : 'Telecom Sites Built', icon: <FaNetworkWired /> },
    { number: '99.8%', label: isAmharic ? 'የድራይቭ ቴስት ጥራት ማለፊያ' : 'Drive Test Quality Pass', icon: <FaCheckCircle /> },
    { number: 'Tier II/III', label: isAmharic ? 'የዳታ ሴንተር ግንባታ ደረጃ' : 'Data Center Facility Tier', icon: <FaServer /> },
    { number: '250+', label: isAmharic ? 'የተተከሉ AI ካሜራዎች' : 'AI Cameras Deployed', icon: <FaShieldAlt /> },
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
              src="/images/lucycom/about-banner-hero.jpg"
              alt="Lucycom Corporate Profile"
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
                <span>{isAmharic ? 'ስለ ሉሲኮም ቴክኖሎጂስ አ.ማ' : 'About Lucycom Technologies S.C.'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የኢትዮጵያን ዲጂታል የወደፊት ጉዞ ማጎልበት' : 'Pioneering Critical ICT & Telecom Infrastructure'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'ደረጃቸውን የጠበቁ፣ አስተማማኝና ሊያድጉ የሚችሉ የICT መሰረተ-ልማቶችን በመንደፍ፣ በማቅረብና በመደገፍ ላይ የተሰማራ ቀዳሚ የኢትዮጵያ አክሲዮን ማህበር።'
                  : 'A leading Ethiopian share company dedicated to designing, supplying, installing, and supporting end-to-end ICT infrastructure solutions.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 1: COMPANY OVERVIEW (from PDF Page 2)
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
              
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-72 sm:h-96 md:h-[460px] w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-800"
              >
                <Image
                  src="/images/lucycom/about-company-story.jpg"
                  alt="Lucycom Engineering Excellence"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {isAmharic ? 'የኮርፖሬት መረጃ' : 'Corporate Identity'}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    LUCYCOM TECHNOLOGIES S.C.
                  </p>
                  <p className="text-xs text-gray-300">
                    {isAmharic ? '«ሉሲ መገኛ፣ ሉሲኮም መዳረሻ»' : '«Lucy the origin, LucyCom the destination»'}
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="w-full lg:w-1/2 space-y-5"
              >
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  <FaBuilding />
                  <span>{isAmharic ? '1. የኩባንያው አጠቃላይ መረጃ' : '1. Company Overview'}</span>
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                  {isAmharic 
                    ? 'በሀገራዊ የዲጂታል ትራንስፎርሜሽን ግንባር ቀደም ተሳታፊ' 
                    : 'Leading the Charge in National Digital Modernization'}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.) የተሟላ የኢንፎርሜሽን እና ኮሙኒኬሽን ቴክኖሎጂ መሰረተ-ልማት መፍትሄዎችን በማዘጋጀት፣ በማቅረብ፣ በመትከል እና በመደገፍ ላይ ያተኮረ ቀዳሚ የኢትዮጵያ አክሲዮን ማህበር ነው። የስራ ልምዳችን ከሲቪል መሰረተ-ልማት፣ የቴሌኮም ማማ ተከላ እና የዳታ ሴንተር ግንባታ ጀምሮ እስከ ከፍተኛ የኔትወርክ ደህንነት፣ ዘመናዊ የመማሪያ ክፍሎች እና የደመና ዝግጁ ቨርቹዋል ዴስክቶፕ (VDI) ድረስ የተሟላ ነው።'
                    : 'LUCYCOM TECHNOLOGIES S.C. is a leading Ethiopian information and communication technology share company dedicated to designing, supplying, installing, and supporting end-to-end ICT infrastructure solutions. Our experience spans the complete technology spectrum: from civil infrastructure, telecom tower erection, and data center build-outs, to advanced network security, smart classrooms, and cloud-ready Virtual Desktop Infrastructure (VDI).'}
                </p>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'ብቁና የተረጋገጡ የኢንጂነሪንግ አቅማችንን ከዓለም አቀፍ የቴክኖሎጂ አምራቾች ጋር በማስተሳሰር የኢትዮጵያን ፈጣን የዲጂታል ትራንስፎርሜሽን የሚያሳኩ ደረጃቸውን የጠበቁ መፍትሄዎችን እናቀርባለን።'
                    : 'We pair certified engineering capabilities with strategic partnerships among world-class global technology manufacturers to deliver resilient, scalable, and international standards-compliant solutions tailored to Ethiopia’s rapid digital transformation.'}
                </p>

                {/* Proven Execution Box (from PDF) */}
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 text-xs sm:text-sm text-gray-800 dark:text-gray-200 space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">
                    {isAmharic ? 'የተረጋገጠ የስራ አፈጻጸም ብቃት (Proven Excellence in Execution):' : 'Proven Excellence in Execution:'}
                  </span>
                  <p>
                    {isAmharic
                      ? 'ሉሲኮም በመላው ኢትዮጵያ በርካታ ቁልፍ ፕሮጀክቶችን በስኬት በማጠናቀቅ የመንግስት ሚኒስቴሮችን፣ የከፍተኛ ትምህርት ተቋማትን፣ የቴሌኮም ኦፕሬተሮችን እና የኢንተርፕራይዝ መሪዎችን አጠናክሯል።'
                      : 'LUCYCOM has successfully completed numerous turn-key projects across Ethiopia, empowering government ministries, higher education institutions, major telecom operators, and enterprise leaders with robust digital foundations.'}
                  </p>
                </div>

                {/* Key Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{isAmharic ? 'ህጋዊ አቋም' : 'Entity Type'}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{isAmharic ? 'አክሲዮን ማህበር (S.C.)' : 'Share Company (S.C.)'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{isAmharic ? 'ዋና መስሪያ ቤት' : 'Headquarters'}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">Addis Ababa, Ethiopia</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{isAmharic ? 'አገልግሎት' : 'Scope'}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">Turnkey Infrastructure</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: VISION & MISSION (from PDF Page 2)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {isAmharic ? '2. ራዕይ እና ተልዕኮ' : '2. Vision & Mission'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                {isAmharic ? 'የመንገዳችን መሪ መርሆች' : 'Guiding Our Technological Horizon'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
                  <FaGlobe />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'ራዕያችን (Vision Statement)' : 'Vision Statement'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'በኢንጂነሪንግ ጥራትና ተቋማት በዘመናዊው የዲጂታል ዘመን እንዲበለጽጉ በማብቃት በኢትዮጵያ እጅግ ታማኝ እና ፈጠራ የታከለበት የICT እና የቴሌኮም መሰረተ-ልማት አጋር መሆን።'
                    : 'To be Ethiopia\'s most trusted and innovative ICT and telecom infrastructure partner, recognized for engineering excellence and for empowering institutions to thrive in the modern digital age.'}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
                  <FaCertificate />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'ተልዕኮአችን (Mission Statement)' : 'Mission Statement'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'በሰለጠኑ ባለሙያዎች፣ በተረጋገጡ አሰራሮች እና በአለም አቀፍ አጋርነቶች አማካኝነት ደህንነታቸው የተጠበቁ፣ አስተማማኝ እና ወጪ ቆጣቢ የቴክኖሎጂ መፍትሄዎችን በማቅረብ በሁሉም ዘርፎች የዲጂታል ዘመናዊነትን መደገፍ።'
                    : 'To deliver secure, reliable, and cost-effective technology solutions through skilled professionals, proven methodologies, and global partnerships, supporting digital modernization across all sectors.'}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: CORE PILLARS OF EXPERTISE (from PDF Page 2)
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaStar />
                <span>{isAmharic ? '3. የሙያ እና የክህሎት ምሰሶዎች' : '3. Core Pillars of Expertise'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic ? 'ስድስቱ የሉሲኮም የቴክኖሎጂ ምሰሶዎች' : 'Six Specialized Engineering Domains'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {isAmharic
                  ? 'ከቴሌኮም ማማዎች እስከ ደመና-ተኮር ቨርቹዋል ላብራቶሪዎች የተዘረጉ የተሟሉ የኢንጂነሪንግ ዘርፎች።'
                  : 'Turnkey capabilities spanning physical, optical, civil, electrical, and cybersecurity domains.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      {pillar.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: CORE VALUES & PROJECT LIFECYCLE (from PDF Page 3)
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl space-y-14">
            
            <div className="text-center">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaAward />
                <span>{isAmharic ? '4. እሴቶች እና የስራ ደረጃዎች' : '4. Core Values & Operational Standards'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic ? 'ጥብቅ የጥራትና የመስክ ደህንነት መርሆች' : 'Quality Assurance & Field Safety Protocols'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {isAmharic 
                  ? 'የ60-ሜትር የቴሌኮም ማማዎችን ስንተክልም ሆነ የዳታ ሴንተር ፋየርዎሎችን ስናዋቅር ከፍተኛ ጥራትን ለማረጋገጥ ደረጃቸውን የጠበቁ አሰራሮችን እንከተላለን።'
                  : 'Whether erecting 60-meter telecom masts or configuring zero-trust data center firewalls, our teams follow standardized workflows to ensure maximum availability and longevity.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            {/* 4 Values Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    {v.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Standardized Project Delivery Lifecycle (Figure 1 from PDF Page 3) */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'ደረጃውን የጠበቀ የፕሮጀክት አፈጻጸም ሂደት (Project Lifecycle)' : 'LUCYCOM Standardized Project Delivery Lifecycle'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isAmharic ? 'ከቅኝት እስከ 24/7 ቀጣይ ድጋፍ የተዘረጋ የተቀናጀ የስራ ፍሰት' : 'Proven end-to-end milestone workflow from initial survey to ongoing SLA management'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
                {deliveryLifecycle.map((stage) => (
                  <div
                    key={stage.step}
                    className="p-5 rounded-2xl bg-gray-50 dark:bg-[#0a192f] border border-gray-200 dark:border-slate-800 text-center space-y-2 hover:border-blue-500 transition-colors"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm shadow-sm mb-1">
                      {stage.icon}
                    </div>
                    <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                      PHASE {stage.step}
                    </div>
                    <div className="text-sm font-bold text-gray-900 dark:text-white">
                      {stage.title}
                    </div>
                    <div className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                      {stage.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 8: ORGANIZATIONAL LEADERSHIP & STRUCTURE (from PDF Page 4)
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaSitemap />
                <span>{isAmharic ? '8. ድርጅታዊ መዋቅር እና አመራር' : '8. Organizational Leadership & Structure'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic ? 'የሉሲኮም ቴክኖሎጂስ አ.ማ የኮርፖሬት አስተዳደር መዋቅር' : 'Corporate Governance & Directorate Hierarchy'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                {isAmharic 
                  ? 'ኩባንያችን ግልፅ የሆነ የውሳኔ አሰጣጥና የተቀላጠፈ የአሰራር ስርዓት እንዲኖረው የተዋቀረ ይፋዊ ድርጅታዊ መዋቅር።'
                  : 'Structured governance ensuring executive oversight, engineering rigor, transparent procurement, and nationwide field coordination.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            {/* Visual Hierarchy Diagram matching PDF Section 8 */}
            <div className="max-w-5xl mx-auto space-y-6">
              
              {/* Top Tier: Board & CEO */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-lg flex items-center space-x-4 border border-blue-800">
                  <div className="p-3.5 rounded-xl bg-white/10 text-xl text-blue-300">
                    <FaUsers />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-blue-300 uppercase block">Supreme Governance</span>
                    <h3 className="text-base sm:text-lg font-bold">General Assembly & Board</h3>
                    <p className="text-xs text-blue-200 mt-0.5">Shareholder assembly and strategic oversight board</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-700 to-sky-700 text-white shadow-lg flex items-center space-x-4 border border-blue-600">
                  <div className="p-3.5 rounded-xl bg-white/10 text-xl text-sky-200">
                    <FaUserTie />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-sky-200 uppercase block">Executive Desk</span>
                    <h3 className="text-base sm:text-lg font-bold">CEO & Legal Advisory</h3>
                    <p className="text-xs text-blue-100 mt-0.5">Corporate leadership, strategy, and statutory legal counsel</p>
                  </div>
                </div>
              </div>

              {/* Connecting Line */}
              <div className="flex justify-center my-2">
                <div className="w-1 h-8 bg-blue-400 dark:bg-blue-600 rounded-full" />
              </div>

              {/* Three Operational Directorates from PDF */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {directorates.map((d, idx) => (
                  <div
                    key={idx}
                    className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#112240] border-2 border-gray-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-md transition-all space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xl">
                        {d.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-gray-900 dark:text-white">
                          {d.name}
                        </h4>
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 block font-medium">
                          {d.role}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 dark:border-slate-800 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 block">
                        {isAmharic ? 'የስራ ዘርፎች' : 'Functional Responsibilities'}
                      </span>
                      <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-300">
                        {d.responsibilities.map((r, rIdx) => (
                          <li key={rIdx} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Leadership Overview Banner */}
              <div className="mt-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 relative h-64 sm:h-72 shadow-lg">
                <Image
                  src="/images/lucycom/about-org-structure.jpg"
                  alt="Lucycom Executive Leadership"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent flex items-center p-6 sm:p-10">
                  <div className="max-w-lg text-white space-y-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-600">
                      Engineering Leadership
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {isAmharic ? 'የላቀ የቴክኒክና የፕሮጀክት አስተዳደር' : 'Driven by Seasoned Infrastructure Leadership'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {isAmharic
                        ? 'በቴሌኮም፣ በዳታ ሴንተር እና በሳይበር ደህንነት ዘርፍ ከ18 ዓመታት በላይ ባካበቱ ከፍተኛ የኢንጂነሪንግ ባለሙያዎች የተመራ ቡድን።'
                        : 'Over 18 years driving turnkey telecommunications, microwave backhaul, and enterprise network modernization across Ethiopia.'}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            ACHIEVEMENTS METRICS (from PDF Section 7)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/40' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {keyAchievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#112240] text-center hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-3">
                    {item.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                    {item.number}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: CONTACT & PARTNER WITH US (from PDF Page 4)
           ========================================================================= */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white text-center">
          <div className="container mx-auto max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
              <FaPhoneAlt />
              <span>{isAmharic ? '9. አብረውን ይስሩ' : '9. Contact & Partner With Us'}</span>
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {isAmharic ? 'የቴክኖሎጂ ፕሮጀክትዎን ከእኛ ጋር ይጀምሩ' : 'Ready to Collaborate on National Digital Infrastructure?'}
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              {isAmharic
                ? 'ሉሲኮም በሀገር አቀፍ የዲጂታል መሰረተ-ልማት ግንባታ፣ በቴሌኮም የመስክ ስራዎች እና በተቋማት ዘመናዊነት ላይ በትብብር ለመስራት ሁሌም ዝግጁ ነው።'
                : 'LUCYCOM TECHNOLOGIES S.C. welcomes opportunities to collaborate on national digital infrastructure programs, telecom field operations, and enterprise modernization projects.'}
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold shadow-lg transition-all"
              >
                <FaFileContract />
                <span>{isAmharic ? 'የዋጋ መጠየቂያ ያቅርቡ' : 'Submit Project Inquiry'}</span>
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-800/80 hover:bg-blue-800 text-white rounded-xl font-bold border border-white/20 transition-all"
              >
                <span>{isAmharic ? 'ምርቶቻችንን ይመልከቱ' : 'Explore Product Catalog'}</span>
                <FaArrowRight size={12} />
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