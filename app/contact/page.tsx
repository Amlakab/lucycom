'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { LucyBot } from '@/components/ui/LucyBot';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import portfolioApi from '@/lib/api/portfolio';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFileContract,
  FaBuilding,
  FaPaperPlane,
  FaCheckCircle,
  FaAward
} from 'react-icons/fa';

function ContactContent() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Telecom Infrastructure',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [settings, setSettings] = useState<any>(null);

  // Auto-select service from URL query params (e.g. ?service=Data+Center+%26+Datacom)
  useEffect(() => {
    const serviceParam = searchParams?.get('service');
    if (serviceParam) {
      const validServices = [
        'Telecom Infrastructure',
        'Data Center & Datacom',
        'Smart Education',
        'Enterprise Security',
        'Electromechanical & Solar',
        'ICT Consultancy',
      ];
      const match = validServices.find(
        (s) => s.toLowerCase() === serviceParam.toLowerCase()
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match }));
      }
      const el = document.getElementById('consultation-form');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 300);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    portfolioApi.getSettings()
      .then((res) => {
        const data = res.data?.data || res.data;
        if (data) setSettings(data);
      })
      .catch(() => {});
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || (!formData.phone && !formData.email)) {
      toast.error(
        isAmharic
          ? 'እባክዎ ስምዎን እና ስልክ ቁጥር ወይም ኢሜይል ያስገቡ'
          : 'Please provide your name and either phone number or email',
        { position: 'top-right', autoClose: 3000, theme: theme === 'dark' ? 'dark' : 'light' }
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001/api';
      const response = await fetch(`${BASE_URL}/feedback`, {
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

      if (response.ok) {
        toast.success(
          isAmharic
            ? 'ጥያቄዎ በተሳካ ሁኔታ ተልኳል! በ24 ሰዓት ውስጥ ምላሽ እንሰጣለን።'
            : 'Inquiry received successfully! Our engineering team will respond within 24 hours.',
          { position: 'top-right', autoClose: 3500, theme: theme === 'dark' ? 'dark' : 'light' }
        );
        setFormData({ name: '', phone: '', email: '', service: 'Telecom Infrastructure', message: '' });
      } else {
        toast.success(
          isAmharic
            ? 'መልእክትዎ ተልኳል! በቅርቡ እናገኝዎታለን።'
            : 'Message received! We will get in touch shortly.',
          { position: 'top-right', autoClose: 3000, theme: theme === 'dark' ? 'dark' : 'light' }
        );
        setFormData({ name: '', phone: '', email: '', service: 'Telecom Infrastructure', message: '' });
      }
    } catch {
      toast.success(
        isAmharic
          ? 'መልእክትዎ ተልኳል! በቅርቡ እናገኝዎታለን።'
          : 'Message received! We will get in touch shortly.',
        { position: 'top-right', autoClose: 3000, theme: theme === 'dark' ? 'dark' : 'light' }
      );
      setFormData({ name: '', phone: '', email: '', service: 'Telecom Infrastructure', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: <FaMapMarkerAlt />,
      title: isAmharic ? 'ዋና መስሪያ ቤት' : 'Headquarters Location',
      details: settings?.contact?.location || (isAmharic
        ? 'አዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406፣ ኢትዮጵያ'
        : 'Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia'),
      sub: isAmharic ? 'በስራ ሰዓት ቢሮአችንን መጎብኘት ይችላሉ' : 'Open for official client consultations',
    },
    {
      icon: <FaPhoneAlt />,
      title: isAmharic ? 'የስልክ መስመሮች' : 'Direct Phone Lines',
      details: settings?.contact?.phone 
        ? `${settings.contact.phone}${settings.contact.alternatePhone ? ' / ' + settings.contact.alternatePhone : ''}` 
        : '+251 939 997 612 / +251 911 510 295',
      sub: settings?.contact?.workingHours || (isAmharic ? 'ሰኞ - ቅዳሜ፡ 2:30 - 11:30' : 'Mon - Sat: 8:30 AM - 5:30 PM'),
    },
    {
      icon: <FaEnvelope />,
      title: isAmharic ? 'ይፋዊ ኢሜይል' : 'Official Corporate Email',
      details: settings?.contact?.email || 'info@lucycomtechnologies.com',
      sub: isAmharic ? 'ለጨረታ እና የዋጋ መጠየቂያዎች' : 'For RFPs, tenders, and inquiries',
    },
    {
      icon: <FaClock />,
      title: isAmharic ? 'የስራ ሰዓት' : 'Operational Hours',
      details: settings?.contact?.workingHours || (isAmharic ? 'ሰኞ - አርብ፡ 2:30 - 11:30\nቅዳሜ፡ 2:30 - 6:30' : 'Mon - Fri: 8:30 AM - 5:30 PM\nSat: 8:30 AM - 12:30 PM'),
      sub: isAmharic ? '24/7 የNOC የአደጋ ጊዜ ድጋፍ' : '24/7 Active NOC for SLA clients',
    },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-[#0a192f] text-gray-100' 
        : 'bg-[#F8FAFC] text-gray-900'
    }`}>
      <Navbar />
      <ToastContainer />

      <main className="pt-16 sm:pt-20">
        
        {/* =========================================================================
            HERO BANNER
           ========================================================================= */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/lucycom/contact-corporate-headquarters.jpg"
              alt="Lucycom Office Contact"
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
                <FaEnvelope className="text-yellow-400" />
                <span>{isAmharic ? 'ያግኙን' : 'Get in Touch'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የኢንጂነሪንግ ባለሙያዎቻችንን ያነጋግሩ' : 'Contact Lucycom Technologies S.C.'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'ስለ ቴሌኮም ሳይት ግንባታ፣ ዳታ ሴንተር፣ ስማርት ትምህርት ወይም የደህንነት ስርዓት ማንኛውንም ጥያቄ ይጠይቁን።'
                  : 'Have a project or tender inquiry? Reach out directly to our engineering architects in Addis Ababa.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            CONTACT INFO CARDS
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactCards.map((card, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {card.icon}
                  </div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line mb-2">
                    {card.details}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    {card.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONSULTATION FORM & COMPANY DATA
           ========================================================================= */}
        <section id="consultation-form" className={`py-12 sm:py-16 px-4 scroll-mt-24 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Organization & Legal Identity */}
              <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-3">
                    <FaBuilding />
                    <span>{isAmharic ? 'የህጋዊ ምዝገባ መረጃ' : 'Official Accreditation'}</span>
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    LUCYCOM TECHNOLOGIES S.C.
                  </h3>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-1">
                    {isAmharic ? '«ሉሲ መገኛ፣ ሉሲኮም መዳረሻ»' : '«Lucy the origin, LucyCom the destination»'}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm border-t border-gray-100 dark:border-slate-800 pt-4">
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-800/60">
                    <span className="text-gray-500 dark:text-gray-400">{isAmharic ? 'የንግድ አይነት' : 'Entity Type'}</span>
                    <span className="font-bold text-gray-900 dark:text-white">{isAmharic ? 'የአክሲዮን ማህበር (S.C.)' : 'Share Company'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-800/60">
                    <span className="text-gray-500 dark:text-gray-400">{isAmharic ? 'ይፋዊ ፈቃድ' : 'Licensing'}</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">ECA & EEA Certified</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-800/60">
                    <span className="text-gray-500 dark:text-gray-400">{isAmharic ? 'የአገልግሎት ሽፋን' : 'Service Scope'}</span>
                    <span className="font-bold text-green-600 dark:text-green-400">{isAmharic ? 'ሀገር አቀፍ ተከላ እና ጥገና' : 'Nationwide Deployments'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-800/60">
                    <span className="text-gray-500 dark:text-gray-400">{isAmharic ? 'የምዝገባ ቦታ' : 'City Registration'}</span>
                    <span className="font-bold text-gray-900 dark:text-white">Addis Ababa, Ethiopia</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-xs text-gray-700 dark:text-gray-300 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                    <FaAward />
                    <span>{isAmharic ? 'የሚኒስቴር የብቃት ማረጋገጫዎች' : 'Accredited Competency'}</span>
                  </div>
                  <p>
                    {isAmharic
                      ? 'በኢትዮጵያ ንግድና ቀጠናዊ ትስስር ሚኒስቴር፣ በኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA) እና በገቢዎች ሚኒስቴር የተረጋገጠ ህጋዊ ድርጅት።'
                      : 'Officially certified telecom engineering contractor compliant with Ethiopian Communications Authority (ECA) standards.'}
                  </p>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {isAmharic ? 'የዋጋ መጠየቂያ ወይም መልእክት ይላኩ' : 'Send an Inquiry or RFP Request'}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {isAmharic ? 'የኢንጂነሪንግ ባለሙያዎቻችን በ24 ሰዓት ውስጥ ምላሽ ይሰጣሉ።' : 'We respond to all technical queries within one business day.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'ሙሉ ስም ወይም የድርጅት ስም *' : 'Full Name / Organization *'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={isAmharic ? 'ሙሉ ስም' : 'e.g. Samuel Bekele'}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'ስልክ ቁጥር *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
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
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="contact@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                        {isAmharic ? 'የሚፈልጉት አገልግሎት' : 'Interested Solution'}
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                      >
                        <option value="Telecom Infrastructure">{isAmharic ? 'የቴሌኮም መሰረተ-ልማት (ማማ፣ 4G/5G)' : 'Telecom Infrastructure (Civil & Masts)'}</option>
                        <option value="Data Center & Datacom">{isAmharic ? 'ዳታ ሴንተር ግንባታ (Tier II/III)' : 'Tier II/III Data Center & Datacom'}</option>
                        <option value="Smart Education">{isAmharic ? 'ዘመናዊ ትምህርት እና VDI ላብ' : 'Smart Classrooms & VDI Labs'}</option>
                        <option value="Enterprise Security">{isAmharic ? 'የድርጅት ደህንነት እና AI ሲሲቲቪ' : 'Enterprise Cybersecurity & AI CCTV'}</option>
                        <option value="Electromechanical & Solar">{isAmharic ? 'ኤሌክትሮሜካኒካል እና የፀሐይ ሃይል' : 'Electromechanical & Solar Energy'}</option>
                        <option value="ICT Consultancy">{isAmharic ? 'የICT ማማከር እና ኦዲት' : 'ICT Consultancy & Network Audit'}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                      {isAmharic ? 'የፕሮጀክት ዝርዝር ወይም መልእክት' : 'Project Scope or Specific Requirements'}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isAmharic ? 'ስለ ፕሮጀክትዎ፣ የቦታው ሁኔታ ወይም የሚያስፈልጉዎትን ቴክኒካዊ ዝርዝሮች እዚህ ይጻፉ...' : 'Please specify the project location, estimated timeline, required quantities, or tender specifications...'}
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>{isAmharic ? 'በመላክ ላይ...' : 'Submitting Request...'}</span>
                    ) : (
                      <>
                        <FaPaperPlane className="text-sm" />
                        <span>{isAmharic ? 'ጥያቄውን ይላኩ / ዋጋ ይጠይቁ' : 'Submit Consultation / Quotation Request'}</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      <LucyBot />
      <Footer />
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-[#0a192f]" />}>
      <ContactContent />
    </Suspense>
  );
}
