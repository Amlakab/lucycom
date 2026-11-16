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
  FaQuoteLeft,
  FaStar,
  FaCheckCircle,
  FaBuilding,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaGraduationCap,
  FaArrowRight,
  FaPhoneAlt
} from 'react-icons/fa';

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  content: string;
  avatar?: string;
  avatarData?: any;
  rating: number;
  featured?: boolean;
  order?: number;
}

const DEFAULT_LUCYCOM_TESTIMONIALS: Testimonial[] = [
  {
    _id: 't1',
    name: 'National Telecom Rollout Director',
    role: 'Tier-1 Mobile Network Operator / Vendor Partner',
    content: 'LUCYCOM TECHNOLOGIES delivered our multi-region telecom infrastructure rollout with exemplary speed and engineering discipline. Their turnkey civil foundations, mast erections up to 60 meters, and antenna alignments achieved a 99.8% RF drive test pass rate on first acceptance.',
    rating: 5,
    featured: true,
  },
  {
    _id: 't2',
    name: 'Director of ICT & Campus Infrastructure',
    role: 'Leading Ethiopian Public University',
    content: 'The turnkey campus data center facility and fiber optic backbone designed and implemented by LUCYCOM transformed our university operations. Their modular precision cooling, N+1 UPS power, and 150-seat VDI computer labs provide uninterrupted service to over 12,000 students.',
    rating: 5,
    featured: true,
  },
  {
    _id: 't3',
    name: 'Chief Security Operations Officer',
    role: 'Federal Infrastructure & Commercial Compound',
    content: 'Deploying over 250 AI-enabled IP surveillance cameras with centralized ANPR vehicle access and thermal perimeter analytics was a massive undertaking. LUCYCOM engineered the entire IP network and command control room with zero operational downtime.',
    rating: 5,
    featured: true,
  },
  {
    _id: 't4',
    name: 'VP of Operations & Electrical Facilities',
    role: 'Industrial Park Manufacturing Complex',
    content: 'LUCYCOM’s Grade-5 electromechanical engineering team installed our 150kW commercial solar microgrid and synchronized it with dual diesel generators and automated transfer switches. Our factory now enjoys continuous power without voltage sags.',
    rating: 5,
    featured: true,
  },
  {
    _id: 't5',
    name: 'Chief Information Security Officer',
    role: 'Enterprise Banking & Financial Services',
    content: 'LUCYCOM helped us modernize our branch network perimeter with Fortinet Next-Gen Firewalls and encrypted IPsec VPN links. Their TIA-942 audit and cabling certifications ensured our compliance with the national financial cybersecurity directives.',
    rating: 5,
    featured: true,
  },
  {
    _id: 't6',
    name: 'Dean of Technology & Informatics',
    role: 'Regional Institute of Technology',
    content: 'Our smart classroom initiative was executed seamlessly by Lucycom. From interactive 86-inch 4K panels to digital audio matrix systems and centralized classroom management software, our lecture halls are now at international standards.',
    rating: 5,
    featured: true,
  },
];

export default function TestimonialsPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_LUCYCOM_TESTIMONIALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await portfolioApi.getTestimonials({ limit: 50 });
        const list = res.data?.data || res.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setTestimonials(list);
        }
      } catch (err) {
        // Fallback to DEFAULT_LUCYCOM_TESTIMONIALS
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-b from-blue-900/20 via-blue-950/10 to-transparent border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 mb-4">
              <FaBuilding className="text-blue-500" />
              {isAmharic ? 'የደንበኞች አስተያየት እና ምስክርነት' : 'Client Endorsements & Enterprise Feedback'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
              {isAmharic ? (
                <>የደንበኞቻችን <span className="text-blue-600 dark:text-blue-400">እውነተኛ ምስክርነት</span></>
              ) : (
                <>Trusted by Ethiopia’s <span className="text-blue-600 dark:text-blue-400">Leading Enterprises</span></>
              )}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {isAmharic
                ? 'ቴሌኮም ኦፕሬተሮች፣ ዩኒቨርሲቲዎች፣ ባንኮች እና የመንግስት ተቋማት ከሉሲኮም ቴክኖሎጂስ ጋር በነበራቸው አጋርነት ያገኙትን ውጤት ይመልከቱ።'
                : 'Discover what telecom operators, higher education institutions, financial firms, and government facilities say about partnering with LUCYCOM TECHNOLOGIES S.C.'}
            </p>
          </div>

          {/* Metric Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-[#112240] text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">120+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                {isAmharic ? 'የተጠናቀቁ ሳይቶች' : 'Turnkey Deployments'}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-[#112240] text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">99.8%</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                {isAmharic ? 'የጥራት ፍተሻ ውጤት' : 'Quality Pass Rate'}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-[#112240] text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">45+</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                {isAmharic ? 'ቋሚ ተቋማዊ ደንበኞች' : 'Enterprise Clients'}
              </div>
            </div>
            <div className="p-4 rounded-xl border border-gray-200 dark:border-slate-800 bg-white/70 dark:bg-[#112240] text-center shadow-xs">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-500">24/7</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-1">
                {isAmharic ? 'የቴክኒክ ድጋፍ' : 'SLA Technical Support'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Testimonials Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item, index) => (
              <motion.div
                key={item._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col justify-between p-6 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#112240] shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/5 rounded-bl-full pointer-events-none group-hover:bg-blue-500/10 transition-colors" />

                <div>
                  {/* Top Quote Icon & Rating */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                      <FaQuoteLeft />
                    </div>
                    <div className="flex items-center gap-1 text-amber-400 text-sm">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed italic mb-6">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-4 border-t border-gray-100 dark:border-slate-800/80 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-xs">
                    {item.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white truncate flex items-center gap-1.5">
                      {item.name}
                      <FaCheckCircle className="text-blue-500 text-xs shrink-0" title="Verified Client" />
                    </h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium truncate">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-700 to-sky-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center md:text-left">
              <h3 className="text-2xl font-bold tracking-tight mb-2">
                {isAmharic
                  ? 'ለድርጅትዎ አስተማማኝ የቴክኖሎጂ አጋር ይፈልጋሉ?'
                  : 'Ready to Experience Enterprise-Grade Infrastructure Reliability?'}
              </h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                {isAmharic
                  ? 'የኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA) እና ኢነርጂ ባለስልጣን (EEA) ፈቃድ ካለው ኢንጂነሪንግ ቡድናችን ጋር ይወያዩ።'
                  : 'Partner with LUCYCOM TECHNOLOGIES S.C. for certified turnkey telecom, Tier-compliant data center, and smart campus deployments.'}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-colors"
              >
                <span>{isAmharic ? 'ያነጋግሩን' : 'Request Consultation'}</span>
                <FaArrowRight className="text-xs" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-800/60 hover:bg-blue-800 text-white font-semibold text-sm border border-white/20 transition-colors"
              >
                <span>{isAmharic ? 'ሳይቶችን ይመልከቱ' : 'View Projects'}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <LucyBot />
    </div>
  );
}
