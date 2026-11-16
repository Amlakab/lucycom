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
  FaFileContract
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

  const values = [
    {
      icon: <FaHandshake />,
      title: isAmharic ? 'ቀዳሚ ታማኝነት' : 'Integrity & Ethics',
      description: isAmharic 
        ? 'በእምነት እና በስነ-ምግባር ላይ የተመሰረተ ግልፅ እና ሐቀኛ አሰራርን እንከተላለን።' 
        : 'Transparent technical advisory and honest contracting built on trust and ethical engineering practices.',
    },
    {
      icon: <FaAward />,
      title: isAmharic ? 'የላቀ ጥራት' : 'Engineering Excellence',
      description: isAmharic 
        ? 'የIEEE፣ TIA/EIA እና የISO ደረጃዎችን የተከተለ የላቀ የኢንጂነሪንግ ስራ እናከናውናለን።' 
        : 'Strict adherence to IEEE, TIA/EIA, and ISO telecommunication standards for highest availability.',
    },
    {
      icon: <FaShieldAlt />,
      title: isAmharic ? 'የስራ ላይ ደህንነት' : 'Rigorous Safety First',
      description: isAmharic 
        ? 'በከፍተኛ የማማ ተከላ ስራዎች ላይ የተረጋገጡ የደህንነት (PPE & Rigging) ህጎችን እንተገብራለን።' 
        : 'Zero-compromise high-altitude mast climbing, rigging safety protocols, and certified PPE deployment.',
    },
    {
      icon: <FaUsers />,
      title: isAmharic ? 'ደንበኛ ተኮር' : 'Client Centricity',
      description: isAmharic 
        ? 'የደንበኞቻችንን የቴክኖሎጂ ፍላጎት በትክክል ተረድተን ዘላቂ መፍትሄዎችን እናቀርባለን።' 
        : 'Custom-tailored solutions designed specifically around real institutional needs and budget.',
    },
    {
      icon: <FaCertificate />,
      title: isAmharic ? 'ደረጃቸውን የጠበቁ እቃዎች' : 'Genuine Tier-1 Hardware',
      description: isAmharic 
        ? 'ኦሪጅናል የፋብሪካ ዋስትና ያላቸውን ከአለም አቀፍ አምራቾች በቀጥታ የሚመጡ እቃዎችን እናቀርባለን።' 
        : 'Direct relationships with global OEMs delivering genuine, brand-new equipment with factory warranties.',
    },
    {
      icon: <FaClock />,
      title: isAmharic ? '24/7 ፈጣን ድጋፍ' : '24/7 SLA Commitment',
      description: isAmharic 
        ? 'ያልተቋረጠ የNOC ቁጥጥር እና የ4 ሰዓት የመስክ ፈጣን ጥገና ምላሽ ዋስትና።' 
        : 'Continuous NOC telemetry and guaranteed 4-hour on-site dispatch SLA for mission-critical facilities.',
    },
  ];

  const leadershipTeam = [
    {
      name: 'Eng. Solomon Tadesse',
      role: isAmharic ? 'ዋና ሥራ አስፈፃሚ እና መስራች' : 'Chief Executive Officer (CEO)',
      bio: isAmharic 
        ? 'በቴሌኮም እና በዳታ ሴንተር ኢንጂነሪንግ ዘርፍ ከ18 ዓመታት በላይ ልምድ ያላቸው መሪ።' 
        : 'Over 18 years driving turnkey telecommunications, microwave, and enterprise network modernization.',
      image: '/images/profile1.jpg',
    },
    {
      name: 'Eng. Ermias Haile',
      role: isAmharic ? 'የቴክኒክና ኦፕሬሽን ዳይሬክተር' : 'Director of Engineering & Ops',
      bio: isAmharic 
        ? 'የማማ ተከላ፣ RF ድራይቭ ቴስት እና የዳታ ሴንተር ግንባታዎችን በበላይነት የሚመሩ።' 
        : 'Expert in mast erection, fiber transmission backbones, and Tier-II/III data center design.',
      image: '/images/bezab1.jpg',
    },
    {
      name: 'Hanan Mohammed',
      role: isAmharic ? 'የሳይበር ደህንነት እና ሶፍትዌር ኃላፊ' : 'Head of Cyber Defense & VDI',
      bio: isAmharic 
        ? 'በFortinet፣ Cisco NGFW እና በSmart Classroom ቴክኖሎጂዎች የካበተ ልምድ ያላቸው።' 
        : 'Certified cyber architect specializing in next-generation firewalls, surveillance, and smart classrooms.',
      image: '/images/profile2.jpg',
    },
    {
      name: 'Dawit Getachew',
      role: isAmharic ? 'የፕሮጀክት አስተዳደር ኃላፊ' : 'Senior Project Manager',
      bio: isAmharic 
        ? 'በመላው ኢትዮጵያ የሚከናወኑ የቴሌኮም ግንባታዎችን በታቀደው ጊዜ እና ጥራት የሚያስረክቡ።' 
        : 'PMP certified managing countrywide telecom rollouts with strict quality and on-time milestones.',
      image: '/images/bezabh2.jpg',
    },
  ];

  const achievements = [
    { number: '120+', label: isAmharic ? 'የተጠናቀቁ ሳይቶች' : 'Telecom Sites Built', icon: <FaNetworkWired /> },
    { number: '99.8%', label: isAmharic ? 'የድራይቭ ቴስት ጥራት' : 'Drive Test Quality', icon: <FaCheckCircle /> },
    { number: 'Tier II/III', label: isAmharic ? 'የዳታ ሴንተር ደረጃ' : 'Data Center Facility Tier', icon: <FaServer /> },
    { number: '2.36M ETB', label: isAmharic ? 'የተመዘገበ ካፒታል' : 'Registered Share Capital', icon: <FaCertificate /> },
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
            HERO BANNER (Matches HRMS About Hero)
           ========================================================================= */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/INSA/image22.jpg"
              alt="Lucycom Technologies Headquarters"
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
                  : 'A premier Ethiopian share company dedicated to designing, supplying, and supporting world-class, international standards-compliant ICT infrastructure.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            COMPANY OVERVIEW & HERITAGE (Matches HRMS Our Story)
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-14 items-center">
              
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative h-72 sm:h-96 md:h-[450px] w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-800"
              >
                <Image
                  src="/INSA/image11.jpg"
                  alt="Modern ICT Installation"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-white">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                    {isAmharic ? 'የኮርፖሬት መረጃ' : 'Corporate Identity'}
                  </p>
                  <p className="text-sm font-semibold mt-1">
                    {settings?.company?.name || 'LUCYCOM TECHNOLOGIES SHARE COMPANY'}
                  </p>
                  <p className="text-xs text-gray-300">
                    {isAmharic 
                      ? (settings?.company?.sloganAmharic || '«ሉሲ መገኛ፣ ሉሲኮም መዳረሻ»') 
                      : (settings?.company?.slogan ? `«${settings.company.slogan}»` : '«Lucy the origin, LucyCom the destination»')}
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
                  <span>{isAmharic ? 'የኩባንያው ታሪክና አቋም' : 'Corporate Profile'}</span>
                </span>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {isAmharic 
                    ? 'በሀገራዊ የዲጂታል ትራንስፎርሜሽን ግንባር ቀደም ተሳታፊ' 
                    : 'Leading the Charge in National Digital Modernization'}
                </h2>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {settings?.about?.description || (isAmharic
                    ? 'ሉሲኮም ቴክኖሎጂስ አ.ማ በኢትዮጵያ ንግድ ህግ መሰረት የተመዘገበና በካፒታል 2,360,000.00 ብር የተቋቋመ ህጋዊ የአክሲዮን ማህበር ነው። ከቴሌኮም ማማ ተከላ እና ከሲቪል ስራዎች ጀምሮ እስከ Tier II/III ዳታ ሴንተር ግንባታ፣ ዘመናዊ ትምህርት እና የሳይበር ደህንነት ድረስ የተሟላ አገልግሎት ይሰጣል።'
                    : 'LUCYCOM TECHNOLOGIES S.C. is an Ethiopian share company registered under the Ministry of Trade & Industry with an authorized capital of 2,360,000.00 ETB. We provide end-to-end solutions covering civil infrastructure, telecom mast erection, data center buildouts, smart classroom automation, and enterprise cybersecurity.')}
                </p>

                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'ከCisco፣ Huawei፣ Dell፣ Fortinet እና Schneider Electric ካሉ ዓለም አቀፍ አምራቾች ጋር ባለን ስልታዊ አጋርነት ኦሪጅናል እቃዎችንና አስተማማኝ አገልግሎት ለደንበኞቻችን እናቀርባለን።'
                    : 'We pair certified engineering capabilities with strategic partnerships among world-class global technology manufacturers to deliver resilient, scalable, and international standards-compliant solutions.'}
                </p>

                {/* Key Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{isAmharic ? 'ህጋዊ አቋም' : 'Legal Form'}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white mt-0.5">{isAmharic ? 'አክሲዮን ማህበር (S.C.)' : 'Share Company (S.C.)'}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{isAmharic ? 'የተመዘገበ ካፒታል' : 'Share Capital'}</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{settings?.company?.capital || '2,360,000.00 ETB'}</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800">
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{isAmharic ? 'የግብር ቁጥር (TIN)' : 'TIN Number'}</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white font-mono mt-0.5">{settings?.company?.tin || '0072480301'}</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            VISION & MISSION CARDS
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
                  <FaGlobe />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'ራዕያችን (Our Vision)' : 'Our Vision Statement'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'በኢንጂነሪንግ ጥራት፣ በታማኝነት እና በፈጠራ በመታወቅ፤ ተቋማት በዲጂታል ዘመን እንዲበለጽጉ የሚያስችል ቀዳሚና ተመራጭ የICT እና የቴሌኮም መሰረተ-ልማት አጋር መሆን።'
                    : 'To be Ethiopia’s most trusted and innovative ICT and telecom infrastructure partner, recognized for engineering excellence and for empowering institutions to thrive in the modern digital age.'}
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl">
                  <FaCertificate />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'ተልዕኮአችን (Our Mission)' : 'Our Mission Statement'}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'ደረጃቸውን የጠበቁ፣ አስተማማኝና ወጪ ቆጣቢ የቴክኖሎጂ መፍትሄዎችን ብቃት ባላቸው ባለሙያዎች፣ በተረጋገጡ አሰራሮች እና በአለም አቀፍ አጋርነቶች በማቅረብ ሀገራዊ የዲጂታል እድገትን ማፋጠን።'
                    : 'To deliver secure, reliable, and cost-effective technology solutions through skilled professionals, proven methodologies, and global partnerships, supporting digital modernization across all sectors.'}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            CORE VALUES GRID (Matches HRMS Values)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaStar />
                <span>{isAmharic ? 'የስራ መርሆቻችን' : 'Our Guiding Principles'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic ? 'ዋና ዋና እሴቶች እና የስራ ደረጃዎች' : 'Core Values & Operational Standards'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {isAmharic 
                  ? 'ለተጠቃሚዎቻችን አስተማማኝና ከፍተኛ ጥራት ያለው አገልግሎት ለመስጠት የምንመራባቸው መርሆች።' 
                  : 'Anchored in strict quality assurance and rigorous field safety protocols.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            LEADERSHIP & ENGINEERING TEAM
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaUsers />
                <span>{isAmharic ? 'የአመራር ቡድን' : 'Executive Leadership'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic ? 'ኩባንያችንን የሚመሩ የዘርፉ ከፍተኛ ባለሙያዎች' : 'Meet Our Certified Leadership & Engineering Team'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {isAmharic ? 'ከፍተኛ ልምድና አለም አቀፍ ሰርተፊኬቶች ያሏቸው መሪዎች።' : 'Years of hands-on expertise building mission-critical networks across Ethiopia.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipTeam.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl overflow-hidden bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {member.role}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            ACHIEVEMENTS ROW
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-[#112240] text-center hover:shadow-lg transition-shadow"
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
            BOTTOM CTA
           ========================================================================= */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white text-center">
          <div className="container mx-auto max-w-3xl space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {isAmharic ? 'የቴክኖሎጂ ፕሮጀክትዎን ከእኛ ጋር ይጀምሩ' : 'Ready to Modernize Your ICT & Telecom Infrastructure?'}
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              {isAmharic
                ? 'የኢንጂነሪንግ ባለሙያዎቻችን ለፍላጎትዎ ትክክለኛውን የዲዛይን እና የዋጋ ዝርዝር (BOQ) ያዘጋጁልዎታል።'
                : 'Connect with our engineering specialists today for technical feasibility, architectural design, and competitive estimation.'}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold shadow-lg transition-all"
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
