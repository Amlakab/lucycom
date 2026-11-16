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
  FaCheckCircle,
  FaNetworkWired,
  FaServer,
  FaGraduationCap,
  FaShieldAlt,
  FaBolt,
  FaArrowRight,
  FaFileContract,
  FaAward,
  FaChevronRight,
  FaFolderOpen
} from 'react-icons/fa';

const LUCYCOM_DEFAULT_PROJECTS = [
  {
    _id: 'p1',
    title: 'National Telecom Rollout & Acceptance',
    titleAm: 'ሀገር አቀፍ የቴሌኮም ሳይት ግንባታና ተከላ',
    description: 'Executed turnkey radio installation, mast erection up to 60m, microwave alignment, and drive test optimization across 120+ sites with 99.8% quality pass rate.',
    descriptionAm: 'በ120+ ሳይቶች ላይ የሲቪል ስራዎች፣ የማማ ተከላ (እስከ 60ሜ)፣ 4G/5G እና የድራይቭ ቴስት ጥራት ማረጋገጫ በ99.8% ማለፊያ ውጤት ተከናውኗል።',
    tags: ['4G/5G LTE', 'RF Optimization', 'Microwave', 'Mast Erection'],
    category: 'TELECOM',
    image: '/INSA/image21.jpg',
    client: 'National Telecom Operators & OEMs',
  },
  {
    _id: 'p2',
    title: 'Campus-Wide Tier II/III Data Center & LAN',
    titleAm: 'የዩኒቨርሲቲ Tier II/III ዳታ ሴንተር እና ኔትወርክ',
    description: 'Turn-key delivery of high-density server racks, OM4 fiber optic backbone, precision in-row CRAC cooling, and centralized modular UPS power systems.',
    descriptionAm: 'ከፍተኛ ፍጥነት ያለው የፋይበር ኦፕቲክ ኔትወርክ፣ የትክክለኛ ማቀዝቀዣ (CRAC) እና ሞጁላር የዩፒኤስ ሃይል አቅርቦት ተከላ።',
    tags: ['Tier II/III', 'Structured Cabling', 'CRAC Cooling', 'Modular UPS'],
    category: 'DATACENTER',
    image: '/INSA/image22.jpg',
    client: 'Higher Education & Research Institutes',
  },
  {
    _id: 'p3',
    title: 'Smart Classrooms & VDI Lab Modernization',
    titleAm: 'ዘመናዊ የመማሪያ ክፍሎች እና የVDI ኮምፒውተር ላብራቶሪ',
    description: 'Deployed 4K interactive smart flat panels, automated lecture recording tracking pods, and central VDI server environments reducing maintenance by 70%.',
    descriptionAm: '4K በይነ-መረብ ስማርት ፓነሎች፣ አውቶሜትድ የትምህርት ቀረጻ እና ደመና-ተኮር ቨርቹዋል ዴስክቶፕ (VDI) ላብራቶሪ ተከላ።',
    tags: ['VDI Thin Clients', '4K Smart Panels', 'Lecture Capture', 'Campus AV'],
    category: 'EDUCATION',
    image: '/INSA/image15.jpg',
    client: 'Educational & Vocational Colleges',
  },
  {
    _id: 'p4',
    title: 'High-Definition AI CCTV & Perimeter Defense',
    titleAm: 'AI የሲሲቲቪ ካሜራዎች እና የዙሪያ ጥበቃ ስርዓት',
    description: 'Installed 250+ AI-enabled IP video surveillance cameras connected to a central command room with automated intrusion tripwire alerts and biometric turnstiles.',
    descriptionAm: 'ከ250 በላይ ሰው ለይተው የሚያውቁ AI ካሜራዎች፣ ማዕከላዊ የቁጥጥር ክፍል እና አውቶሜትድ የደህንነት ስርዓት ዝርጋታ።',
    tags: ['AI CCTV', 'VMS Video Wall', 'Perimeter Radar', 'Facial Recognition'],
    category: 'SECURITY',
    image: '/INSA/image1.jpg',
    client: 'Government Complexes & Financial Facilities',
  },
  {
    _id: 'p5',
    title: 'Enterprise Next-Gen Firewall (NGFW) & Zero-Trust',
    titleAm: 'የኢንተርፕራይዝ Next-Gen Firewall እና የሳይበር ጥበቃ',
    description: 'Hardened corporate data perimeters with redundant Fortinet/Cisco Next-Gen Firewalls, multi-branch IPsec VPNs, and real-time threat intelligence filtering.',
    descriptionAm: 'የተሟላ የNext-Gen Firewall ደህንነት፣ ባለብዙ ቅርንጫፍ የVPN ትስስር እና የጸረ-ጥቃት ቁጥጥር ስርዓት።',
    tags: ['NGFW', 'Zero-Trust', 'Fortinet / Cisco', 'IPSec VPN'],
    category: 'SECURITY',
    image: '/INSA/image11.jpg',
    client: 'Financial & Enterprise Institutions',
  },
  {
    _id: 'p6',
    title: 'Electromechanical Backup Power & Solar Microgrids',
    titleAm: 'ኢንዱስትሪያል ጀነሬተሮች እና የፀሐይ ሃይል ማመንጫ',
    description: 'Supplied and integrated heavy-duty diesel generators, ATS automated switching panels, transient surge protection, and hybrid solar photovoltaic microgrids.',
    descriptionAm: 'ከባድ የዲዝል ጀነሬተሮች፣ አውቶሜትድ የትራንስፈር ስዊች እና የፀሐይ ሃይል ማመንጫ ስርዓቶች ተከላ።',
    tags: ['Industrial Generators', 'ATS Panels', 'Surge Earthing', 'Solar PV'],
    category: 'POWER',
    image: '/INSA/image18.jpg',
    client: 'Telecom Hubs & Enterprise Campuses',
  },
];

export default function WorkPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();

  const [projects, setProjects] = useState(LUCYCOM_DEFAULT_PROJECTS);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'TELECOM' | 'DATACENTER' | 'EDUCATION' | 'SECURITY' | 'POWER'>('ALL');

  useEffect(() => {
    portfolioApi.getProjects({ limit: 12 })
      .then(res => {
        const resp = res?.data?.data ?? res?.data;
        const list = Array.isArray(resp?.data) ? resp.data : Array.isArray(resp) ? resp : [];
        if (list.length > 0) {
          const merged = list.map((item: any, idx: number) => ({
            ...item,
            image: LUCYCOM_DEFAULT_PROJECTS[idx % LUCYCOM_DEFAULT_PROJECTS.length].image,
            category: item.category ? item.category.toUpperCase() : LUCYCOM_DEFAULT_PROJECTS[idx % LUCYCOM_DEFAULT_PROJECTS.length].category,
          }));
          setProjects(merged);
        }
      })
      .catch(() => {});
  }, []);

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter((p: any) => p.category === activeCategory);

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
              src="/INSA/image21.jpg"
              alt="Lucycom Projects Showcase"
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
                <FaFolderOpen className="text-yellow-400" />
                <span>{isAmharic ? 'የስራ ልምዶችና ፕሮጀክቶች' : 'Proven Track Record'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የተሳኩ የቴሌኮም እና የICT ፕሮጀክቶች' : 'Delivered Engineering Projects'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'በመላው ኢትዮጵያ ለቴሌኮም ኦፕሬተሮች፣ ለዩኒቨርሲቲዎች እና ለፋይናንስ ተቋማት በጥራት የተጠናቀቁ ስራዎች።'
                  : 'Demonstrated turn-key excellence delivering telecommunication sites, Tier II/III data centers, and campus digital infrastructure.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            PROJECTS SHOWCASE SECTION
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: 'ALL', label: isAmharic ? 'ሁሉም ፕሮጀክቶች' : 'All Projects' },
                { id: 'TELECOM', label: isAmharic ? 'ቴሌኮም' : 'Telecom' },
                { id: 'DATACENTER', label: isAmharic ? 'ዳታ ሴንተር' : 'Data Center' },
                { id: 'EDUCATION', label: isAmharic ? 'ስማርት ትምህርት' : 'Smart Ed' },
                { id: 'SECURITY', label: isAmharic ? 'ሳይበር ደህንነት' : 'Cybersecurity' },
                { id: 'POWER', label: isAmharic ? 'ሃይል' : 'Power' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'bg-white dark:bg-[#112240] text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-800 hover:border-blue-500'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((proj: any, idx: number) => (
                <motion.div
                  key={proj._id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Project Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <Image
                        src={proj.image || '/INSA/image21.jpg'}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs">
                          {proj.category || 'Turnkey'}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-xs">
                          <FaCheckCircle className="text-[10px]" />
                          <span>{isAmharic ? 'የተጠናቀቀ' : 'Delivered'}</span>
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {isAmharic && proj.titleAm ? proj.titleAm : proj.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {isAmharic && proj.descriptionAm ? proj.descriptionAm : proj.description}
                      </p>

                      {proj.client && (
                        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 pt-1">
                          <span className="text-blue-600 dark:text-blue-400">Sector: </span>
                          <span>{proj.client}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="p-6 pt-0 border-t border-gray-100 dark:border-slate-800 mt-4">
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {proj.tags?.map((tag: string, tIdx: number) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-gray-50 dark:bg-[#0a192f] text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                      >
                        <span>{isAmharic ? 'ተመሳሳይ ስራ ይጠይቁ' : 'Inquire Similar Scope'}</span>
                        <FaChevronRight className="text-[10px]" />
                      </Link>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        100% SLA Handover
                      </span>
                    </div>
                  </div>
                </motion.div>
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
              {isAmharic ? 'የእርስዎን ፕሮጀክት በጥራት እናስረክባለን' : 'Plan Your Next Turnkey Engineering Deployment'}
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              {isAmharic
                ? 'በኢንጂነሪንግ ጥራት እና በፈጣን አፈጻጸም የታገዘ አስተማማኝ አጋርነት።'
                : 'Connect with our project managers for comprehensive feasibility, timeline scheduling, and technical documentation.'}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold shadow-lg transition-all"
              >
                <FaFileContract />
                <span>{isAmharic ? 'የዋጋ መጠየቂያ ያቅርቡ' : 'Request Consultation & Estimate'}</span>
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
