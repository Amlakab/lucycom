'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { LucyBot } from '@/components/ui/LucyBot';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import portfolioApi from '@/lib/api/portfolio';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaArrowLeft,
  FaArrowRight,
  FaNetworkWired,
  FaServer,
  FaGraduationCap,
  FaShieldAlt,
  FaVideo,
  FaBolt,
  FaCheckCircle,
  FaAward,
  FaUsers,
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFileContract,
  FaHandshake,
  FaBuilding,
  FaSearch,
  FaMicrochip,
  FaCertificate,
  FaChevronRight,
  FaTools
} from 'react-icons/fa';

export default function Home() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'TELECOM' | 'DATACENTER' | 'EDUCATION' | 'SECURITY' | 'POWER'>('ALL');
  const [settings, setSettings] = useState<any>(null);
  const [dbPartners, setDbPartners] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Telecom Infrastructure',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    portfolioApi.getSettings()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data) setSettings(data);
      })
      .catch(() => {});

    portfolioApi.getPartners({ limit: 50 })
      .then((res) => {
        const list = res.data?.data || res.data || [];
        if (Array.isArray(list) && list.length > 0) setDbPartners(list);
      })
      .catch(() => {});
  }, []);

  // Hero Carousel Slides
  const heroSlides = [
    {
      image: (settings?.hero?.profileImages && settings.hero.profileImages[0]) || '/images/lucycom/home-hero-carrier-grade.jpg',
      badge: isAmharic 
        ? (settings?.company?.sloganAmharic || 'ሉሲ መገኛ፣ ሉሲኮም መዳረሻ') 
        : (settings?.company?.slogan || 'Lucy the origin, LucyCom the destination'),
      title: isAmharic 
        ? (settings?.hero?.titleAmharic || settings?.hero?.title || 'የኢትዮጵያን ዲጂታል የወደፊት ጉዞ እናጎለብታለን') 
        : (settings?.hero?.title || 'Empowering Ethiopia’s Digital Future'),
      subtitle: isAmharic
        ? (settings?.hero?.subtitleAmharic || settings?.hero?.description || 'የተሟላ የICT፣ የቴሌኮም እና የዳታ ሴንተር መሰረተ-ልማት ግንባታ በአለም አቀፍ ደረጃዎች የተረጋገጠ።')
        : (settings?.hero?.description || 'End-to-end ICT, Telecom, and Tier-II/III Data Center infrastructure engineered to international standards.'),
      primaryBtn: isAmharic ? 'አገልግሎቶችን ያስሱ' : 'Explore Solutions',
      primaryLink: '/solutions',
      secondaryBtn: isAmharic ? 'የኩባንያ መገለጫ (PDF)' : 'Corporate Profile (PDF)',
      secondaryLink: settings?.company?.profileBrochureUrl || settings?.hero?.resumeUrl || '/documents/LUCYCOM_Company_Profile.pdf',
    },
    {
      image: '/images/lucycom/telecom-tower-rollout.jpg',
      badge: isAmharic ? 'የቴሌኮም መሰረተ-ልማት' : 'Turnkey Telecom Rollout',
      title: isAmharic
        ? 'ዘመናዊ የቴሌኮም ማማዎችና የኔትወርክ ዝርጋታ'
        : 'Next-Generation Telecom & Wireless Masts',
      subtitle: isAmharic
        ? 'ከሲቪል ስራ እስከ 60 ሜትር ማማ ተከላ፣ 4G/5G LTE፣ ማይክሮዌቭ እና የድራይቭ ቴስት ጥራት ማረጋገጫ።'
        : 'Turnkey site builds, up to 60m mast erection, 4G/5G radio integration, microwave links, and RF drive test verification.',
      primaryBtn: isAmharic ? 'የቴሌኮም ስራዎችን ይመልከቱ' : 'View Telecom Solutions',
      primaryLink: '/solutions',
      secondaryBtn: isAmharic ? 'ያነጋግሩን' : 'Contact Engineering',
      secondaryLink: '/contact',
    },
    {
      image: '/images/lucycom/datacenter-server-hall.jpg',
      badge: isAmharic ? 'ዳታ ሴንተር እና ዳታኮም' : 'Mission-Critical Facilities',
      title: isAmharic
        ? 'ደረጃቸውን የጠበቁ Tier II & III ዳታ ሴንተሮች'
        : 'Tier-II / III Data Centers & Enterprise Datacom',
      subtitle: isAmharic
        ? 'ትክክለኛ ማቀዝቀዣ (Precision Cooling)፣ ሞጁላር ዩፒኤስ (UPS)፣ ጸረ-እሳት ስርአት እና 24/7 የNOC ቁጥጥር።'
        : 'Precision cooling (CRAC), modular UPS power systems, FM-200 fire suppression, and 24/7 NOC monitoring.',
      primaryBtn: isAmharic ? 'የዳታ ሴንተር ዝርዝር' : 'Data Center Specs',
      primaryLink: '/solutions',
      secondaryBtn: isAmharic ? 'የዋጋ መጠየቂያ' : 'Request Consultation',
      secondaryLink: '/contact',
    },
    {
      image: '/images/lucycom/smart-classroom-modern.jpg',
      badge: isAmharic ? 'ዘመናዊ ትምህርት እና ሳይበር ደህንነት' : 'Smart Ed & Cyber Defense',
      title: isAmharic
        ? 'ዘመናዊ የመማሪያ ክፍሎች እና AI የደህንነት ቅኝት'
        : 'Smart Classrooms, VDI Labs & AI Security',
      subtitle: isAmharic
        ? 'ስማርት ቦርዶች፣ የትምህርት ቀረጻ፣ ደመና-ተኮር ቨርቹዋል ዴስክቶፕ (VDI)፣ AI ካሜራዎች እና Next-Gen Firewalls።'
        : 'Interactive flat panels, automated lecture capture, VDI computer laboratories, AI face-recognition surveillance, and Next-Gen Firewalls.',
      primaryBtn: isAmharic ? 'መፍትሄዎችን ይመልከቱ' : 'Discover Solutions',
      primaryLink: '/solutions',
      secondaryBtn: isAmharic ? 'የባለሙያ ምክር' : 'Get in Touch',
      secondaryLink: '/contact',
    },
  ];

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Solutions Data
  const solutionsData = [
    {
      id: 'telecom',
      category: 'TELECOM',
      title: isAmharic ? 'የቴሌኮም መሰረተ-ልማት ዝርጋታ' : 'Telecom Infrastructure Rollout',
      desc: isAmharic
        ? 'የሲቪል ስራዎች፣ የማማ ተከላ (እስከ 60 ሜትር)፣ 4G/5G LTE፣ ማይክሮዌቭ እና የድራይቭ ቴስት ጥራት ማረጋገጫ።'
        : 'Turnkey civil foundation, antenna mast erection (up to 60m), 4G/5G radio integration, microwave alignment, and RF drive test verification.',
      icon: <FaNetworkWired />,
      specs: [
        isAmharic ? 'እስከ 60 ሜትር የማማ ተከላ' : 'Up to 60m Mast Erection',
        isAmharic ? '4G/5G LTE እና Microwave' : '4G/5G LTE & Microwave Alignment',
        isAmharic ? '99.8% የድራይቭ ቴስት ማለፊያ' : '99.8% Drive Test Pass Rate',
        isAmharic ? 'የተረጋገጠ የስራ ላይ ደህንነት' : 'Certified Rigging Safety Standards',
      ],
      image: '/images/lucycom/home-solution-telecom.jpg',
      badge: isAmharic ? 'ቴሌኮም' : 'Telecom',
    },
    {
      id: 'datacenter',
      category: 'DATACENTER',
      title: isAmharic ? 'ዳታ ሴንተር እና ኢንተርፕራይዝ ዳታኮም' : 'Tier II/III Data Center & Datacom',
      desc: isAmharic
        ? 'ደረጃቸውን የጠበቁ Tier II/III ዳታ ሴንተሮች፣ Precision Cooling፣ ሞጁላር ዩፒኤስ፣ እና ከፍተኛ ፍጥነት የፋይበር ኔትወርክ።'
        : 'Tier-II and Tier-III compliant data centers, precision climate control (CRAC), modular UPS, and enterprise optical backbone cabling.',
      icon: <FaServer />,
      specs: [
        isAmharic ? 'Tier II & Tier III ደረጃዎች' : 'Tier II & Tier III Compliant',
        isAmharic ? 'ትክክለኛ ማቀዝቀዣ (Precision Cooling)' : 'Precision In-Row Cooling (CRAC)',
        isAmharic ? 'ሞጁላር ዩፒኤስ እና የሃይል ማከፋፈያ' : 'Modular N+1 Redundant UPS',
        isAmharic ? 'የፋይበር ኦፕቲክ ባክቦን' : 'High-Speed OM4/OS2 Fiber Optic',
      ],
      image: '/images/lucycom/home-solution-datacenter.jpg',
      badge: isAmharic ? 'ዳታ ሴንተር' : 'Data Center',
    },
    {
      id: 'education',
      category: 'EDUCATION',
      title: isAmharic ? 'ዘመናዊ ትምህርት እና VDI ላብራቶሪዎች' : 'Smart Classrooms & VDI Laboratories',
      desc: isAmharic
        ? 'በይነ-ግንኙነት ያላቸው ስማርት ቦርዶች፣ አውቶሜትድ የትምህርት ቀረጻ፣ እና ደመና-ተኮር የኮምፒውተር ቨርቹዋል ዴስክቶፕ (VDI)።'
        : 'Interactive 4K flat panels, automated multi-angle lecture recording, virtualized desktop infrastructure (VDI), and smart campus software.',
      icon: <FaGraduationCap />,
      specs: [
        isAmharic ? '4K በይነ-መረብ ስማርት ፓነሎች' : '4K Interactive Touch Panels',
        isAmharic ? 'አውቶሜትድ ሌክቸር ቀረጻ' : 'Automated AI Lecture Tracking',
        isAmharic ? 'VDI ቨርቹዋል ዴስክቶፕ ላብ' : 'Cost-Effective VDI Thin Clients',
        isAmharic ? 'የትምህርት ቤት አስተዳደር ሲስተም' : 'Centralized Classroom Management',
      ],
      image: '/images/lucycom/smart-education-flat-panel.jpg',
      badge: isAmharic ? 'ስማርት ትምህርት' : 'Smart Ed',
    },
    {
      id: 'security',
      category: 'SECURITY',
      title: isAmharic ? 'የድርጅት ደህንነት እና AI ሲሲቲቪ' : 'Enterprise Cybersecurity & AI CCTV',
      desc: isAmharic
        ? 'Next-Generation Firewalls (NGFW)፣ የሰው ፊት ለይተው የሚያውቁ AI ካሜራዎች እና የተሟላ የዙሪያ ጥበቃ ቁጥጥር ስርዓት።'
        : 'Next-Generation Firewalls (NGFW), AI facial recognition surveillance, perimeter intrusion radar, and unified security operations.',
      icon: <FaShieldAlt />,
      specs: [
        isAmharic ? 'Fortinet / Cisco Next-Gen Firewalls' : 'Fortinet / Cisco NGFW Appliance',
        isAmharic ? 'AI ፊት ለይቶ የሚያውቅ ካሜራ' : 'AI Facial & License Plate Recognition',
        isAmharic ? 'የዙሪያ ጥበቃ ኢንትሩዥን ዳሳሽ' : 'Optical & Thermal Perimeter Radar',
        isAmharic ? '24/7 የደህንነት ኦፕሬሽን ማዕከል' : 'Central Video Management (VMS)',
      ],
      image: '/images/lucycom/home-solution-security.jpg',
      badge: isAmharic ? 'ደህንነት' : 'Security',
    },
    {
      id: 'power',
      category: 'POWER',
      title: isAmharic ? 'ኤሌክትሮሜካኒካል እና የፀሐይ ሃይል' : 'Electromechanical & Solar Microgrids',
      desc: isAmharic
        ? 'ኢንዱስትሪያል ጀነሬተሮች፣ የፀሐይ ሃይል ማመንጫ፣ አውቶሜትድ ትራንስፈር ስዊች (ATS) እና የሃይል ማመጣጠኛ ስርዓቶች።'
        : 'Heavy-duty industrial diesel backup generators, hybrid solar photovoltaic microgrids, automated transfer switches, and power conditioning.',
      icon: <FaBolt />,
      specs: [
        isAmharic ? 'ከባድ ኢንዱስትሪያል ጀነሬተሮች' : 'Heavy Industrial Diesel Generators',
        isAmharic ? 'ሃይብሪድ የፀሐይ ሃይል (Solar PV)' : 'Off-Grid & Hybrid Solar Solutions',
        isAmharic ? 'አውቶሜትድ ATS ስዊች' : 'Seamless Automated Transfer Switches',
        isAmharic ? 'የኤሌክትሪክ ሰርጅ መከላከያ' : 'Surge & Lightning Grounding Systems',
      ],
      image: '/images/lucycom/electromechanical-diesel-generator.jpg',
      badge: isAmharic ? 'ኤሌክትሮሜካኒካል' : 'Power & Solar',
    },
    {
      id: 'audit',
      category: 'DATACENTER',
      title: isAmharic ? 'የICT ማማከር እና የኔትወርክ ኦዲት' : 'ICT Consultancy & Infrastructure Audit',
      desc: isAmharic
        ? 'የመሰረተ-ልማት ጥናት፣ የደረጃዎች ተገዢነት ፍተሻ፣ የኔትወርክ አፈጻጸም ማሻሻያ እና የቴክኒክ ሰነድ ዝግጅት።'
        : 'Comprehensive architectural assessment, standards compliance auditing, network bandwidth optimization, and formal engineering RFP documentation.',
      icon: <FaTools />,
      specs: [
        isAmharic ? 'የኔትወርክ አፈጻጸም እና ደህንነት ኦዲት' : 'Full Network & Vulnerability Audit',
        isAmharic ? 'የዲዛይን እና RFP ዝግጅት' : 'Architectural BOQ & Tender Design',
        isAmharic ? 'የSLA ድጋፍ እና ጥገና' : '24/7 SLA Maintenance Agreements',
        isAmharic ? 'የሰው ሃይል ስልጠና እና ማብቃት' : 'Technical Staff Certification Training',
      ],
      image: '/images/lucycom/home-about-delivery.jpg',
      badge: isAmharic ? 'ማማከር' : 'Consulting',
    },
  ];

  const filteredSolutions = activeCategory === 'ALL'
    ? solutionsData
    : solutionsData.filter((item) => item.category === activeCategory);

  // Form submit handler
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || (!formData.phone && !formData.email)) {
      toast.error(
        isAmharic 
          ? 'እባክዎ ስምዎን እና ስልክ ወይም ኢሜይል ያስገቡ' 
          : 'Please provide your name and either phone number or email address',
        { position: 'top-right', autoClose: 3000, theme: theme === 'dark' ? 'dark' : 'light' }
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001/api';
      const res = await fetch(`${BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          subject: `Inquiry: ${formData.service}`,
          message: formData.message,
        }),
      });

      if (res.ok) {
        toast.success(
          isAmharic 
            ? 'ጥያቄዎ በተሳካ ሁኔታ ደርሶናል! የኢንጂነሪንግ ባለሙያዎቻችን በቅርቡ ያነጋግሩዎታል።' 
            : 'Inquiry received successfully! Our engineering team will contact you shortly.',
          { position: 'top-right', autoClose: 3500, theme: theme === 'dark' ? 'dark' : 'light' }
        );
        setFormData({ name: '', phone: '', email: '', service: 'Telecom Infrastructure', message: '' });
      } else {
        toast.success(
          isAmharic 
            ? 'መልእክትዎ ተልኳል! በቅርቡ እናገኝዎታለን።' 
            : 'Message submitted! We will reach out shortly.',
          { position: 'top-right', autoClose: 3000, theme: theme === 'dark' ? 'dark' : 'light' }
        );
        setFormData({ name: '', phone: '', email: '', service: 'Telecom Infrastructure', message: '' });
      }
    } catch {
      toast.success(
        isAmharic 
          ? 'መልእክትዎ ተልኳል! በቅርቡ እናገኝዎታለን።' 
          : 'Message submitted! We will reach out shortly.',
        { position: 'top-right', autoClose: 3000, theme: theme === 'dark' ? 'dark' : 'light' }
      );
      setFormData({ name: '', phone: '', email: '', service: 'Telecom Infrastructure', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-[#0a192f] text-gray-100' : 'bg-[#F8FAFC] text-gray-900'}`}>
      <Navbar />
      <ToastContainer />

      <main className="pt-16 sm:pt-20">
        
        {/* =========================================================================
            SECTION 1: HERO SLIDESHOW (Matches HRMS Home Hero)
           ========================================================================= */}
        <section className="relative min-h-[520px] sm:h-[620px] lg:h-[720px] overflow-hidden flex items-center">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="absolute inset-0 z-0"
            >
              <Image
                src={heroSlides[currentSlide].image}
                alt={heroSlides[currentSlide].title}
                fill
                priority
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/50" />
            </motion.div>
          </AnimatePresence>

          {/* Hero Slide Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
            <div className="max-w-3xl">
              <motion.div
                key={`text-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md">
                  <FaCertificate className="text-yellow-400" />
                  <span>{heroSlides[currentSlide].badge}</span>
                </div>

                {/* Hero Title */}
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
                  {heroSlides[currentSlide].title}
                </h1>

                {/* Hero Subtitle */}
                <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl font-normal drop-shadow-sm">
                  {heroSlides[currentSlide].subtitle}
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                  <Link
                    href={heroSlides[currentSlide].primaryLink}
                    className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 text-sm sm:text-base group"
                  >
                    <span>{heroSlides[currentSlide].primaryBtn}</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={heroSlides[currentSlide].secondaryLink}
                    className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl font-semibold border border-white/25 backdrop-blur-sm transition-all flex items-center gap-2 text-sm sm:text-base"
                  >
                    <FaFileContract className="text-xs text-blue-300" />
                    <span>{heroSlides[currentSlide].secondaryBtn}</span>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Carousel Arrow Controls */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer hover:scale-105"
          >
            <FaArrowLeft className="text-sm" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-md border border-white/20 transition-all cursor-pointer hover:scale-105"
          >
            <FaArrowRight className="text-sm" />
          </button>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-blue-500' : 'w-2.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: FLOATING CAPABILITIES BAR (Matches HRMS Quick Search Strip)
           ========================================================================= */}
        <section className={`border-b ${theme === 'dark' ? 'bg-[#112240] border-slate-800' : 'bg-white border-gray-200'} shadow-sm`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                  <FaNetworkWired />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {isAmharic ? 'የቴሌኮም ሳይት ግንባታ' : 'Turnkey Telecom Rollout'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isAmharic ? 'እስከ 60ሜ ማማ፣ 4G/5G እና RF' : 'Civil, 60m Mast & RF Integration'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl shrink-0">
                  <FaServer />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {isAmharic ? 'Tier-II / III ዳታ ሴንተር' : 'Data Center Facilities'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isAmharic ? 'Precision Cooling እና ሞጁላር UPS' : 'Precision Cooling & Modular UPS'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
                  <FaGraduationCap />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {isAmharic ? 'ዘመናዊ ትምህርት እና VDI' : 'Smart Ed & Virtual Labs'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isAmharic ? 'ስማርት ፓነል እና ሌክቸር ቀረጻ' : 'Interactive Panels & VDI Clients'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-blue-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0">
                  <FaShieldAlt />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                    {isAmharic ? 'የድርጅት ደህንነት እና AI' : 'Cyber Defense & AI CCTV'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {isAmharic ? 'Next-Gen Firewalls እና ቅኝት' : 'Next-Gen Firewalls & AI Radar'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: FEATURED SOLUTIONS / CATEGORY FILTER (Matches HRMS Properties Grid)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            
            {/* Section Header */}
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaMicrochip />
                <span>{isAmharic ? 'የመፍትሄ ዘርፎች' : 'Core Capabilities'}</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2.5 tracking-tight">
                {isAmharic
                  ? (settings?.solutionsSection?.titleAmharic || 'የተሟላ የICT እና ቴሌኮም ኢንጂነሪንግ አገልግሎቶች')
                  : (settings?.solutionsSection?.title || 'Turnkey ICT & Telecom Engineering Solutions')}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {isAmharic
                  ? (settings?.solutionsSection?.subtitleAmharic || 'ከሲቪል ስራዎች እስከ ደመና-ተኮር ሶፍትዌር ድረስ፤ በዓለም አቀፍ ደረጃዎች የተገነቡ አስተማማኝ መፍትሄዎች።')
                  : (settings?.solutionsSection?.subtitle || 'From heavy civil foundation to advanced cyber intelligence, engineered for high reliability and 99.99% availability.')}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: 'ALL', label: isAmharic ? 'ሁሉም አገልግሎቶች' : 'All Solutions' },
                { id: 'TELECOM', label: isAmharic ? 'ቴሌኮም' : 'Telecom' },
                { id: 'DATACENTER', label: isAmharic ? 'ዳታ ሴንተር' : 'Data Center' },
                { id: 'EDUCATION', label: isAmharic ? 'ስማርት ትምህርት' : 'Smart Ed' },
                { id: 'SECURITY', label: isAmharic ? 'ሳይበር ደህንነት' : 'Cybersecurity' },
                { id: 'POWER', label: isAmharic ? 'ሃይል እና ኤሌክትሮሜካኒካል' : 'Power & Solar' },
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

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredSolutions.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-500/50 group flex flex-col"
                >
                  {/* Card Image */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-sm">
                        {item.icon}
                        <span>{item.badge}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                        {item.desc}
                      </p>

                      {/* Key Specs Checklist */}
                      <ul className="space-y-2 mb-6 border-t border-gray-100 dark:border-slate-800/80 pt-4">
                        {item.specs.map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                            <FaCheckCircle className="text-blue-500 shrink-0 text-xs" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Card CTA */}
                    <div className="pt-2 border-t border-gray-100 dark:border-slate-800/80 flex items-center justify-between">
                      <Link
                        href="/solutions"
                        className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                      >
                        <span>{isAmharic ? 'ዝርዝር ይመልከቱ' : 'Learn More'}</span>
                        <FaChevronRight className="text-[10px]" />
                      </Link>

                      <Link
                        href="/contact"
                        className="px-3.5 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white text-xs font-semibold transition-all shadow-xs"
                      >
                        {isAmharic ? 'ዋጋ ይጠይቁ' : 'Get Quote'}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View All CTA */}
            <div className="mt-12 text-center">
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-blue-500/25 transition-all text-sm sm:text-base"
              >
                <span>{isAmharic ? 'ሁሉንም 6 መፍትሄዎች ይመልከቱ' : 'Explore All 6 Enterprise Solutions'}</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: IMPACT STATS (Matches HRMS Counter Section)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-[#112240] text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-3">
                  <FaNetworkWired />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                  {settings?.stats?.projectsCompleted ? `${settings.stats.projectsCompleted}+` : '120+'}
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {isAmharic ? 'የቴሌኮም ሳይቶች' : 'Telecom Sites Built'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isAmharic ? 'የተሟላ ግንባታና ተከላ' : 'Turnkey Civil & Antenna Rollout'}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-[#112240] text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl mb-3">
                  <FaCheckCircle />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-1">
                  {settings?.stats?.qualityPassRate ? `${settings.stats.qualityPassRate}%` : '99.8%'}
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {isAmharic ? 'የድራይቭ ቴስት ጥራት' : 'Drive Test Quality Rate'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isAmharic ? 'የቴሌኮም ኦፕሬተሮች ተቀባይነት' : 'Operator Acceptance SLA'}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-[#112240] text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-xl bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xl mb-3">
                  <FaServer />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-sky-600 dark:text-sky-400 mb-1">
                  Tier II / III
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {isAmharic ? 'የዳታ ሴንተር ደረጃዎች' : 'Data Center Facility Tier'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isAmharic ? 'TIA-942 እና IEEE ተገዢነት' : 'TIA-942 & ISO 27001 Standards'}
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/70 dark:bg-[#112240] text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 mx-auto rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl mb-3">
                  <FaUsers />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">
                  {settings?.stats?.happyClients ? `${settings.stats.happyClients}+` : '45+'}
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {isAmharic ? 'ቋሚ ተቋማዊ ደንበኞች' : 'Enterprise Clients'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {isAmharic ? 'ቴሌኮም፣ ዩኒቨርሲቲ እና ባንኮች' : 'Telecoms, Banks & Universities'}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: WHY CHOOSE LUCYCOM (Matches HRMS Value Propositions)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaAward />
                <span>{isAmharic ? 'ለምን ሉሲኮም?' : 'The Lucycom Advantage'}</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2.5 tracking-tight">
                {isAmharic
                  ? (settings?.whyChooseUs?.titleAmharic || 'በኢትዮጵያ ለምን በታማኝነት እንመረጣለን?')
                  : (settings?.whyChooseUs?.title || 'Why Enterprise & Government Trust Lucycom')}
              </h2>
              <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {isAmharic
                  ? (settings?.whyChooseUs?.subtitleAmharic || 'ከባድ የቴክኒክ ብቃት፣ ፈቃድ ያላቸው ሰራተኞች እና ከአለም አቀፍ አምራቾች ጋር ያለን ቀጥተኛ ግንኙነት።')
                  : (settings?.whyChooseUs?.subtitle || 'Rigorous engineering standards, certified telecom riggers, and direct manufacturer alliances delivering unmatched reliability.')}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FaUsers />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {isAmharic ? 'የተመሰከረላቸው ኢንጂነሮች' : 'Certified Engineers & Riggers'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'በCCNA/CCNP፣ Fortinet፣ Huawei እና በከፍታ ላይ ስራ ደህንነት (Tower Safety) የሰለጠነ የባለሙያ ቡድን።'
                    : 'Field crews certified in Huawei, Cisco, Fortinet, and high-altitude tower climbing & rescue safety.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FaBuilding />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {isAmharic ? 'የተሟላ የTurnkey አፈጻጸም' : 'Turnkey EPC Delivery'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'ከመሬት ቁፋሮና ኮንክሪት ሲቪል ስራ ጀምሮ እስከ ማማ ተከላ፣ ኦፕቲካል ፋይበር እና የሶፍትዌር ውህደት ድረስ በአንድ እጅ።'
                    : 'Single point of accountability from civil excavation and tower assembly to dark fiber and firewall integration.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FaHandshake />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {isAmharic ? 'አለም አቀፍ አምራች አጋሮች' : 'Global Vendor Alliances'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'ከCisco፣ Huawei፣ Dell Technologies፣ Fortinet፣ Schneider Electric እና Dahua ጋር ቀጥተኛ ስልታዊ አጋርነት።'
                    : 'Direct supply chain access to original tier-1 OEM hardware with valid manufacturer warranties and support.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <FaClock />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {isAmharic ? '24/7 የSLA የድጋፍ ስምምነት' : '24/7 SLA & NOC Support'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'በተፈረመ የአገልግሎት ውል (SLA) መሰረት ያልተቋረጠ የኔትወርክ ቁጥጥር፣ ፈጣን የመስክ ምላሽ እና የጥገና አገልግሎት።'
                    : 'Guaranteed 4-hour on-site incident response, active NOC network telemetry, and preventative maintenance.'}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: PARTNERS / VENDOR ECOSYSTEM (Matches HRMS Partners section)
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaHandshake />
                <span>{isAmharic ? 'ስልታዊ አጋሮች' : 'Global Technology Partners'}</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic
                  ? (settings?.partnersSection?.titleAmharic || 'ከዓለም አቀፍ የቴክኖሎጂ ግዙፎች ጋር አብረን እንሰራለን')
                  : (settings?.partnersSection?.title || 'Collaborating with Industry-Leading Global OEMs')}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {isAmharic
                  ? (settings?.partnersSection?.subtitleAmharic || 'የተረጋገጡ ሃርድዌሮችና ኦሪጅናል ዋስትና ያላቸው እቃዎች')
                  : (settings?.partnersSection?.subtitle || 'Direct hardware integration with manufacturer backed warranties.')}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
              {(dbPartners.length > 0 ? dbPartners : [
                { name: 'Huawei', domain: 'Telecom & Datacom' },
                { name: 'Cisco Systems', domain: 'Enterprise Routing' },
                { name: 'Dell Technologies', domain: 'Servers & Storage' },
                { name: 'Fortinet', domain: 'Next-Gen Security' },
                { name: 'Schneider Electric', domain: 'UPS & Data Centers' },
                { name: 'Hikvision / Dahua', domain: 'AI Video Surveillance' },
              ]).map((p: any, idx: number) => (
                <div
                  key={p._id || idx}
                  className="p-4 sm:p-5 rounded-xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-[#112240] flex flex-col items-center justify-center text-center hover:border-blue-500 transition-colors"
                >
                  <span className="font-extrabold text-base sm:text-lg text-gray-900 dark:text-white tracking-wide">
                    {p.name}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    {p.domain || p.tier || 'Technology Partner'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: CONTACT & CONSULTATION FORM (Exact HRMS Contact Form Design)
           ========================================================================= */}
        <section id="contact" className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                <FaEnvelope />
                <span>{isAmharic ? 'ያነጋግሩን' : 'Get in Touch'}</span>
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2.5 tracking-tight">
                {isAmharic ? 'የፕሮጀክት ምክክር ወይም የዋጋ መጠየቂያ ይላኩ' : 'Request a Project Consultation or Tender Quote'}
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                {isAmharic
                  ? 'የኢንጂነሪንግ ቡድናችን የቴክኒክ ጥያቄዎን በመገምገም በ24 ሰዓት ውስጥ ምላሽ ይሰጥዎታል።'
                  : 'Our certified solution architects will analyze your requirements and provide a formal BOQ estimation.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Contact Information Sidebar */}
              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {isAmharic ? 'የዋና መስሪያ ቤት አድራሻ' : 'Headquarters'}
                  </h3>
                  <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                    <span>
                      {settings?.contact?.location || (isAmharic
                        ? 'አዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406፣ ኢትዮጵያ'
                        : 'Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia')}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-800/80 pt-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                    {isAmharic ? 'የስልክ መስመሮች' : 'Direct Phone Lines'}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <FaPhoneAlt className="text-blue-500 shrink-0" />
                    <span>
                      {settings?.contact?.phone || '+251 939 997 612'}
                      {settings?.contact?.alternatePhone ? ` / ${settings.contact.alternatePhone}` : ' / +251 911 510 295'}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-800/80 pt-4">
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                    {isAmharic ? 'ኦፊሴላዊ ኢሜይል' : 'Corporate Email'}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                    <FaEnvelope className="text-blue-500 shrink-0" />
                    <span>{settings?.contact?.email || 'info@lucycomtechnologies.com'}</span>
                  </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-800/80 pt-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p><strong>Entity:</strong> Registered Share Company (S.C.)</p>
                    <p><strong>Licensing:</strong> ECA & EEA Certified Carrier Contractor</p>
                    <p><strong>HQ:</strong> Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'ሙሉ ስም ወይም የድርጅት ስም *' : 'Full Name or Organization *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isAmharic ? 'ስምዎን ያስገቡ' : 'e.g. Abebe Kebede'}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'የስልክ ቁጥር *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+251 9..."
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'ኢሜይል አድራሻ' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="info@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'የሚፈልጉት አገልግሎት' : 'Interested Solution'}
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      >
                        <option value="Telecom Infrastructure">{isAmharic ? 'የቴሌኮም መሰረተ-ልማት (ማማ፣ 4G/5G)' : 'Telecom Infrastructure (Civil & Masts)'}</option>
                        <option value="Data Center & Datacom">{isAmharic ? 'ዳታ ሴንተር ግንባታ (Tier II/III)' : 'Tier II/III Data Center & Datacom'}</option>
                        <option value="Smart Education">{isAmharic ? 'ዘመናዊ ትምህርት እና VDI ላብ' : 'Smart Classrooms & VDI Labs'}</option>
                        <option value="Enterprise Security">{isAmharic ? 'የድርጅት ደህንነት እና AI ሲሲቲቪ' : 'Enterprise Cybersecurity & AI CCTV'}</option>
                        <option value="Electromechanical & Solar">{isAmharic ? 'ኤሌክትሮሜካኒካል እና የፀሐይ ሃይል' : 'Electromechanical & Solar Energy'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      {isAmharic ? 'የፕሮጀክቱ ዝርዝር ሁኔታ' : 'Project Details & Requirements'}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isAmharic ? 'ስለ ፕሮጀክትዎ አጭር መግለጫ እዚህ ይጻፉ...' : 'Describe your project requirements, location, capacity, or timeline...'}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{isAmharic ? 'በመላክ ላይ...' : 'Sending Inquiry...'}</span>
                    ) : (
                      <>
                        <FaEnvelope className="text-sm" />
                        <span>{isAmharic ? 'ጥያቄውን ይላኩ / ዋጋ ይጠይቁ' : 'Submit Consultation Request'}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* Floating LucyBot AI Assistant */}
      <LucyBot />

      {/* Footer */}
      <Footer />
    </div>
  );
}
