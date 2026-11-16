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
  FaGraduationCap,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaArrowRight,
  FaCertificate,
  FaFileContract,
  FaMicrochip,
  FaTools,
  FaChevronRight,
  FaPhoneAlt
} from 'react-icons/fa';

const DEFAULT_SOLUTIONS = [
  {
    _id: 's1',
    title: 'Telecom Infrastructure & Mobile Network Rollout',
    titleAm: 'የቴሌኮም መሰረተ-ልማት እና የሞባይል ኔትወርክ ዝርጋታ',
    slug: 'telecom-infrastructure',
    shortDescription: 'Turnkey BTS deployment, optical fiber networking, microwave transmission, and RF site optimization.',
    shortDescriptionAm: 'የቴሌኮም ማማ ተከላ (እስከ 60ሜ)፣ 4G/5G LTE፣ ማይክሮዌቭ እና የድራይቭ ቴስት ጥራት ማረጋገጫ።',
    description: 'LUCYCOM TECHNOLOGIES S.C. delivers comprehensive telecommunications infrastructure engineering. From greenfield site surveys and mast erection up to 60 meters to 4G/5G LTE radio equipment installation, commissioning, microwave link alignment, and optical fiber backbone splicing. We guarantee SLA-backed operational handovers adhering strictly to ECA standards.',
    icon: <FaNetworkWired />,
    image: '/images/lucycom/solution-telecom-services.jpg',
    features: [
      'Telecom Tower Mast Erection (up to 60m)',
      '4G/5G LTE Radio Access Installation & Commissioning',
      'Microwave Transmission Links & Feeder Alignment',
      'Drive Test Quality Verification & RF Optimization',
      'Fiber Optic Backhaul & OTDR Acceptance Testing'
    ],
    keyTechnologies: ['Huawei SingleRAN', 'Nokia AirScale', 'Ericsson Radio System', 'Cisco Optical', 'Anritsu SiteMaster'],
  },
  {
    _id: 's2',
    title: 'Tier II/III Data Center & Structured Cabling',
    titleAm: 'ደረጃቸውን የጠበቁ Tier II/III ዳታ ሴንተሮች',
    slug: 'datacenter-infrastructure',
    shortDescription: 'Tier II/III compliant builds, precision cooling, modular UPS, and high-density fiber structured cabling.',
    shortDescriptionAm: 'ትክክለኛ ማቀዝቀዣ (Precision Cooling)፣ ሞጁላር ዩፒኤስ (UPS) እና የፋይበር ኔትወርክ ዝርጋታ።',
    description: 'We engineer turnkey mission-critical data center facilities complying with TIA-942 and Uptime Institute standards. Lucycom delivers complete physical containment, precision CRAC cooling with hot/cold aisle isolation, modular N+1 uninterruptible power systems (UPS), automated diesel backup generators, and structured Cat6A/Cat7 copper and MPO optical fiber backbone distribution.',
    icon: <FaServer />,
    image: '/images/lucycom/solution-datacenter-datacom.jpg',
    features: [
      'Tier II & Tier III Compliant Physical Architecture',
      'Precision In-Row CRAC Air Conditioning & Containment',
      'Modular N+1 Online Double-Conversion UPS Systems',
      'High-Density Server Racks & Optical Fiber Backbone',
      'FM200 / Novec Fire Suppression & Environmental Monitoring'
    ],
    keyTechnologies: ['Schneider / APC', 'Vertiv Liebert', 'Siemon / CommScope', 'Eaton Power', 'Sensaphone EMS'],
  },
  {
    _id: 's3',
    title: 'Smart Education & Campus Digitalization',
    titleAm: 'ዘመናዊ ትምህርት እና VDI የኮምፒውተር ላብራቶሪዎች',
    slug: 'smart-education',
    shortDescription: 'Interactive digital podiums, multi-angle lecture recording, and Virtual Desktop Infrastructure (VDI).',
    shortDescriptionAm: '4K በይነ-መረብ ስማርት ቦርዶች፣ አውቶሜትድ ሌክቸር ቀረጻ እና ደመና-ተኮር VDI ላብራቶሪ።',
    description: 'Empowering universities, colleges, and secondary institutions with modern smart learning environments. Our solutions feature 4K interactive smart touch panels, automated AI tracking lecture capture pods, digital speaker podiums, centralized e-learning content servers, and OS-Easy powered Virtual Desktop Infrastructure (VDI) computer laboratories that reduce PC maintenance costs by 70%.',
    icon: <FaGraduationCap />,
    image: '/images/lucycom/solution-smart-classroom.jpg',
    features: [
      'Interactive Smart Flat Panels & Digital Podiums',
      'Automated Multi-Angle Lecture Recording Systems',
      'Virtual Desktop Infrastructure (VDI) Lab Deployment',
      'Unified Audio-Visual Integration & e-Learning Portals',
      'Central Classroom Broadcast & Digital Signage'
    ],
    keyTechnologies: ['OS-Easy VDI', 'Hikvision Interactive Panels', 'HuddleCam Auto-Tracking', 'Moodle LMS', 'Crestron AV'],
  },
  {
    _id: 's4',
    title: 'Enterprise Cybersecurity & AI Surveillance',
    titleAm: 'የድርጅት ደህንነት እና AI ሲሲቲቪ ቅኝት',
    slug: 'enterprise-security',
    shortDescription: 'Facial recognition, perimeter intrusion alerts, central command rooms, and Next-Gen Firewalls (NGFW).',
    shortDescriptionAm: 'Next-Gen Firewalls፣ ፊት ለይተው የሚያውቁ AI ካሜራዎች እና የዙሪያ ጥበቃ ስርዓት።',
    description: 'Enterprise-grade physical and digital defense architectures designed for financial institutions, government complexes, and large-scale industrial facilities. We deploy high-resolution IP surveillance cameras with edge neural analytics, automated perimeter fence tripwire alerts, centralized video management walls (VMS), biometric access control gates, and Fortinet/Cisco Next-Gen Firewalls.',
    icon: <FaShieldAlt />,
    image: '/images/lucycom/solution-cctv-security.jpg',
    features: [
      'AI Face Recognition & High-Definition IP Surveillance',
      'Automated Perimeter Intrusion & Tripwire Alert Systems',
      'Central VMS Video Wall Command Operations',
      'Biometric Time-Attendance & Turnstile Access Gates',
      'Next-Generation Firewalls (NGFW) & Zero-Trust Architecture'
    ],
    keyTechnologies: ['Fortinet FortiGate', 'Cisco Firepower', 'Hikvision AI', 'Dahua Technology', 'Suprema Biometrics'],
  },
  {
    _id: 's5',
    title: 'Electromechanical, UPS & Solar Microgrids',
    titleAm: 'ኤሌክትሮሜካኒካል፣ ጀነሬተሮች እና የፀሐይ ሃይል',
    slug: 'power-and-solar',
    shortDescription: 'Industrial backup generators, ATS switches, surge grounding, and off-grid solar solutions.',
    shortDescriptionAm: 'ከባድ ኢንዱስትሪያል ጀነሬተሮች፣ አውቶሜትድ ATS ስዊች እና አስተማማኝ የፀሐይ ሃይል ስርዓቶች።',
    description: 'Uninterrupted power infrastructure is the lifeblood of critical ICT. Lucycom engineers industrial diesel generators, automated transfer switches (ATS), comprehensive lightning and copper earthing grids, and clean hybrid solar photovoltaic systems with high-cycle lithium energy storage.',
    icon: <FaBolt />,
    image: '/images/lucycom/solution-electromechanical.jpg',
    features: [
      'Heavy Industrial Diesel Generator Provisioning & Sync',
      'Automated Transfer Switches (ATS) & Main Distribution Boards',
      'Copper Earthing, Grounding & Transient Surge Protection',
      'Hybrid & Off-Grid Solar Photovoltaic (PV) Microgrids',
      'Lithium Iron Phosphate (LiFePO4) Battery Energy Storage'
    ],
    keyTechnologies: ['Cummins Power', 'Perkins', 'ABB / Schneider Switchgear', 'Victron Energy', 'Huawei Solar'],
  },
  {
    _id: 's6',
    title: 'ICT Consultancy, Audit & Turnkey Maintenance',
    titleAm: 'የICT ማማከር፣ የኔትወርክ ኦዲት እና የSLA ድጋፍ',
    slug: 'consultancy-audit',
    shortDescription: 'Technical design feasibility, RFP preparation, network security audits, and 24/7 SLA maintenance.',
    shortDescriptionAm: 'የኔትወርክ አፈጻጸም እና ደህንነት ኦዲት፣ የRFP ዝግጅት እና የ24/7 የጥገና ድጋፍ ስምምነት።',
    description: 'We guide public enterprises and corporate leaders through complex digital transformation roadmaps. Our senior consultants deliver objective network vulnerability assessments, RFP preparation, BOQ architectural reviews, and 24/7 SLA preventative maintenance agreements.',
    icon: <FaTools />,
    image: '/images/lucycom/solution-ict-infrastructure.jpg',
    features: [
      'Network Architecture & Security Vulnerability Auditing',
      'Technical Feasibility Studies & Tender BOQ Formulation',
      'Project Supervision & Quality Assurance Witness Testing',
      '24/7 SLA Preventative & Corrective Maintenance Retainers',
      'Corporate IT Personnel Capacity Building & Certification'
    ],
    keyTechnologies: ['Wireshark Network Analysis', 'Fluke Networks Certification', 'ISO 27001 Standards', 'ITIL Framework', 'TIA-942'],
  },
];

export default function SolutionsPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const [solutions, setSolutions] = useState(DEFAULT_SOLUTIONS);

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        const res = await portfolioApi.getSolutions();
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((item: any, idx: number) => ({
            ...item,
            icon: DEFAULT_SOLUTIONS[idx % DEFAULT_SOLUTIONS.length].icon,
            image: DEFAULT_SOLUTIONS[idx % DEFAULT_SOLUTIONS.length].image,
          }));
          setSolutions(merged);
        }
      } catch {
        // Fallback to default
      }
    };
    fetchSolutions();
  }, []);

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
              src="/images/lucycom/solutions-hero-banner.jpg"
              alt="Lucycom Enterprise Solutions"
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
                <FaMicrochip className="text-yellow-400" />
                <span>{isAmharic ? 'የቴክኖሎጂ መፍትሄዎች' : 'Integrated Solution Portfolio'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የተሟላ የICT እና ቴሌኮም ኢንጂነሪንግ' : 'Turnkey ICT & Telecom Engineering Solutions'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'ከሲቪል ስራዎች እስከ ደመና-ተኮር ቨርቹዋል ዴስክቶፕ ድረስ፤ በዓለም አቀፍ ደረጃዎች የተገነቡ አስተማማኝ መፍትሄዎች።'
                  : 'Mission-critical engineering delivering 99.99% availability across civil, optical, electrical, and cybersecurity domains.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            SOLUTIONS GRID (Matches HRMS Services / Properties Grid)
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {solutions.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    {/* Header with Icon and Image */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        {item.icon}
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                        {isAmharic ? 'የተረጋገጠ ደረጃ' : 'ISO & TIA Standards'}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {isAmharic && item.titleAm ? item.titleAm : item.title}
                    </h2>

                    <p className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
                      {isAmharic && item.shortDescriptionAm ? item.shortDescriptionAm : item.shortDescription}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Deliverables Checklist */}
                    {item.features && item.features.length > 0 && (
                      <div className="pt-4 border-t border-gray-100 dark:border-slate-800 space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {isAmharic ? 'ዋና ዋና አገልግሎቶች' : 'Key Deliverables & Specifications'}
                        </p>
                        <ul className="space-y-2 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          {item.features.map((feat: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-center gap-2">
                              <FaCheckCircle className="text-blue-500 shrink-0 text-xs" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technologies Pills */}
                    {item.keyTechnologies && item.keyTechnologies.length > 0 && (
                      <div className="pt-2">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                          {isAmharic ? 'የአምራች ቴክኖሎጂዎች' : 'Vendor Technologies'}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.keyTechnologies.map((tech: string, tIdx: number) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-[#0a192f] text-gray-800 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Action */}
                  <div className="pt-6 mt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 group-hover:translate-x-1 transition-all"
                    >
                      <span>{isAmharic ? 'የዋጋ መጠየቂያ ያቅርቡ' : 'Request Technical BOQ'}</span>
                      <FaChevronRight className="text-[10px]" />
                    </Link>
                    <span className="text-[11px] text-gray-400 dark:text-gray-500">
                      SLA Guarantee
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            BOTTOM CONSULTATION CTA
           ========================================================================= */}
        <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 text-white text-center">
          <div className="container mx-auto max-w-3xl space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              {isAmharic ? 'የቴክኖሎጂ ፕሮጀክትዎን በጋራ እናሳካ' : 'Need a Custom Turn-Key Architecture?'}
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              {isAmharic
                ? 'የኢንጂነሪንግ ባለሙያዎቻችን ለፍላጎትዎ ትክክለኛውን የዲዛይን እና የዋጋ ዝርዝር (BOQ) ያዘጋጁልዎታል።'
                : 'Our certified solution architects provide free preliminary technical feasibility and design review.'}
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-blue-600 hover:bg-blue-50 rounded-xl font-bold shadow-lg transition-all"
              >
                <FaFileContract />
                <span>{isAmharic ? 'የዋጋ መጠየቂያ ያቅርቡ' : 'Request Proposal & Tender Estimation'}</span>
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
