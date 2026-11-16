'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { LucyBot } from '@/components/ui/LucyBot';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import portfolioApi from '@/lib/api/portfolio';
import {
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaArrowRight,
  FaNewspaper,
  FaTimes,
  FaEye,
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaGraduationCap,
  FaBolt
} from 'react-icons/fa';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  category: string;
  tags: string[];
  views?: number;
  publishedAt?: string;
  created_at?: string;
}

const DEFAULT_LUCYCOM_POSTS: BlogPost[] = [
  {
    _id: 'b1',
    title: "Accelerating Ethiopia's Digital Transformation with Resilient ICT Infrastructure",
    slug: 'accelerating-ethiopias-digital-transformation',
    excerpt: 'How modern telecommunication towers, fiber optic backbones, and Tier-standard data centers form the bedrock of the national digital economy.',
    content: `As Ethiopia undergoes unprecedented digital modernization across finance, government, education, and healthcare, the demand for resilient, high-bandwidth, and zero-downtime ICT infrastructure has never been greater.

LUCYCOM TECHNOLOGIES S.C. is committed to pairing certified local engineering with international standards to build the physical and digital foundations required for this transformation.

Key Pillars of National ICT Modernization:
1. Turnkey Telecom Rollouts: Rapid civil foundations, heavy mast erection (up to 60 meters), and antenna feeder alignment supporting 4G and 5G LTE network densification.
2. High-Capacity Optical Fiber Backbones: Underground and aerial OPGW/ADSS fiber deployments connecting regional clusters with high-throughput low-latency transport.
3. Sovereign Tier II/III Data Centers: Resilient modular facilities featuring N+1 UPS power redundancy, precision in-row CRAC cooling, and certified structured cabling.

Through strategic partnerships with global technology leaders (Huawei, Nokia, Cisco, Fortinet, Dell), Lucycom guarantees engineering excellence compliant with ECA regulations and international ISO standards.`,
    category: 'Telecom & ICT',
    tags: ['Telecom', 'Digital Transformation', 'Ethiopia', 'Infrastructure'],
    views: 450,
    publishedAt: '2026-02-15',
  },
  {
    _id: 'b2',
    title: 'Building Tier-Standard Modular Data Centers: Engineering Best Practices',
    slug: 'building-tier-standard-modular-data-centers',
    excerpt: 'A comprehensive technical overview of precision climate cooling (CRAC), modular UPS redundancy, and structured cabling for modern enterprise data halls.',
    content: `Modern enterprise data centers require meticulous engineering around thermal management, electrical reliability, and physical security.

Designing for High Density and PUE Optimization:
- Hot and Cold Aisle Containment: Preventing thermal mixing allows CRAC units to operate at optimal delta-T, reducing cooling energy consumption by up to 30%.
- Modular Online Double-Conversion UPS: Decentralized modular power supplies ensure seamless battery switchover without transient voltage dips during national grid fluctuations.
- Structured Cabling Standards: Deploying TIA-942 OM4 multimode and OS2 singlemode optical fiber with pre-terminated high-density MPO/MTP cassettes prevents cable congestion and ensures 100G/400G spine-leaf readiness.
- Fire Suppression & Environmental Telemetry: Utilizing FM-200 / Novec 1230 gas suppression alongside VESDA aspirating smoke detection protects mission-critical hardware without water damage.

Lucycom delivers end-to-end data hall construction from architectural layout to final commissioning.`,
    category: 'Data Center',
    tags: ['Data Center', 'Tier Standards', 'UPS', 'Precision Cooling'],
    views: 380,
    publishedAt: '2026-02-01',
  },
  {
    _id: 'b3',
    title: 'Modernizing Higher Education with Smart VDI Laboratories and Interactive Digital Classrooms',
    slug: 'modernizing-higher-education-vdi-classrooms',
    excerpt: 'Replacing fragile distributed desktop PCs with centralized virtual desktop servers and 86-inch 4K interactive collaborative touchscreens.',
    content: `Higher education institutions and vocational colleges in Ethiopia face high maintenance overheads with traditional desktop computer labs. Virtual Desktop Infrastructure (VDI) revolutionizes this paradigm.

Benefits of Campus VDI Deployments:
- Centralized Server Compute: Running VMware Horizon or OS-Easy cloud server virtualization consolidates 150+ user desktops onto centralized high-density server racks.
- Robust Low-Power Thin Clients: Student desks use solid-state thin client terminals with zero moving parts, consuming less than 15 watts of power per seat.
- Instant Lab Image Provisioning: Instructors can re-image an entire 60-seat computer lab from an engineering CAD environment to a software coding lab in under 60 seconds.
- Interactive 4K Touch Displays: Smart digital boards enable seamless screen broadcasting, remote collaboration, and automated lecture recording.

Lucycom has successfully deployed smart laboratories across universities and training institutions nationwide.`,
    category: 'Smart Education',
    tags: ['Smart Education', 'VDI', 'Virtualization', 'Interactive Classrooms'],
    views: 310,
    publishedAt: '2026-01-20',
  },
  {
    _id: 'b4',
    title: 'Enterprise Perimeter Defense: Integrating AI Video Surveillance, ANPR, and Next-Gen Firewalls',
    slug: 'enterprise-perimeter-defense-ai-surveillance',
    excerpt: 'Bridging physical perimeter security and digital cyber resilience into a unified 24/7 security operations center (SOC).',
    content: `Physical security and cybersecurity can no longer exist in silos. Modern enterprise compounds require unified defense architecture.

Integrated Defense Layers:
- AI-Powered Optical & Thermal CCTV: Deep-learning cameras automatically detect unauthorized perimeter intrusions, line crossing, and abandoned baggage in real-time.
- Automated Number Plate Recognition (ANPR): Fast-acting boom barriers integrated with optical character recognition speed up authorized fleet entry while flagging unauthorized vehicles.
- Next-Generation Firewalls (NGFW): Fortinet FortiGate and Cisco Secure appliances provide deep packet inspection, automated threat feeds, and encrypted site-to-site tunnels.
- Central Command & Control: Combining Milestone/Hikvision video management with central SIEM alerting gives security personnel full situational awareness on a centralized video wall.`,
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'AI CCTV', 'ANPR', 'Physical Security', 'SOC'],
    views: 290,
    publishedAt: '2026-01-10',
  },
  {
    _id: 'b5',
    title: 'Industrial Electromechanical & Solar Microgrids: Guaranteeing 24/7 Power Continuity',
    slug: 'industrial-solar-microgrids-power-continuity',
    excerpt: 'How Lucycom’s Grade-5 electromechanical engineering team deploys commercial solar arrays, automatic transfer switches (ATS), and synchronized diesel backups.',
    content: `Power fluctuations and grid outages represent a major challenge for telecommunication towers, data facilities, and manufacturing plants.

Hybrid Microgrid Engineering:
- Commercial Solar Photovoltaic Arrays: Tier-1 monocrystalline solar panels offset daytime base load and charge industrial battery energy storage systems (BESS).
- Automatic Transfer Switch (ATS) Synchronization: Precision switchgear transitions critical loads between grid, solar inverters, and backup generators within milliseconds.
- Lightning Protection & Earth Grounding: Installing low-impedance grounding grids (below 5 Ohms) and copper air terminals protects expensive RF radios and server equipment from atmospheric strikes.

Lucycom holds official EEA Grade-5 Electromechanical Competency accreditation.`,
    category: 'Electromechanical',
    tags: ['Solar Microgrid', 'Electromechanical', 'ATS', 'Backup Power', 'EEA'],
    views: 245,
    publishedAt: '2025-12-18',
  },
];

export default function BlogPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();

  const [posts, setPosts] = useState<BlogPost[]>(DEFAULT_LUCYCOM_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [readingPost, setReadingPost] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: isAmharic ? 'ሁሉም' : 'All Topics' },
    { id: 'Telecom & ICT', label: isAmharic ? 'ቴሌኮም እና አይሲቲ' : 'Telecom & ICT' },
    { id: 'Data Center', label: isAmharic ? 'ዳታ ሴንተር' : 'Data Center' },
    { id: 'Smart Education', label: isAmharic ? 'ዘመናዊ ትምህርት' : 'Smart Education' },
    { id: 'Cybersecurity', label: isAmharic ? 'የሳይበር ደህንነት' : 'Cybersecurity' },
    { id: 'Electromechanical', label: isAmharic ? 'ኤሌክትሮ መካኒካል' : 'Electromechanical' },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await portfolioApi.getBlogPosts({ limit: 50 });
        const list = res.data?.data || res.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setPosts(list);
        }
      } catch (err) {
        // Fallback to DEFAULT_LUCYCOM_POSTS
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0a192f] text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-14 bg-gradient-to-b from-blue-900/20 via-blue-950/10 to-transparent border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50 mb-4">
              <FaNewspaper className="text-blue-500" />
              {isAmharic ? 'የቴክኒክ ጽሑፎች እና የኢንዱስትሪ ዜናዎች' : 'Corporate Insights & Technical Whitepapers'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
              {isAmharic ? (
                <>የሉሲኮም <span className="text-blue-600 dark:text-blue-400">የቴክኖሎጂ መረጃዎች</span></>
              ) : (
                <>LUCYCOM <span className="text-blue-600 dark:text-blue-400">Knowledge & Insights</span></>
              )}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              {isAmharic
                ? 'ስለ ቴሌኮም ኢንፍራስትራክቸር፣ የዳታ ሴንተር ደረጃዎች፣ ስማርት ላቦራቶሪዎች እና የሳይበር ደህንነት የምህንድስና ትንታኔዎች።'
                : 'Engineering insights, industry standards, and regulatory blueprints shaping ICT and telecommunication across Ethiopia.'}
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={isAmharic ? 'በርዕስ ወይም በቁልፍ ቃላት ይፈልጉ...' : 'Search whitepapers by topic, keyword, or standard...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#112240] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-white dark:bg-[#112240] text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Cards Grid */}
      <section className="py-14 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-2xl text-gray-400 mb-4">
                <FaSearch />
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {isAmharic ? 'ምንም ጽሑፍ አልተገኘም' : 'No technical briefs found'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isAmharic ? 'እባክዎ ሌላ ቃል ወይም ምድብ ይሞክሩ።' : 'Try searching for different keywords or select another domain.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, idx) => (
                <motion.article
                  key={post._id || idx}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#112240] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6">
                    {/* Meta Header */}
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200/50 dark:border-blue-800/40">
                        {post.category}
                      </span>
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <FaCalendarAlt className="text-gray-400 text-[10px]" />
                          {post.publishedAt.substring(0, 10)}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-3">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {post.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-800/80 px-2 py-0.5 rounded"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-50/70 dark:bg-slate-800/40 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <FaClock className="text-[10px]" />
                      5 min read
                    </span>
                    <button
                      onClick={() => setReadingPost(post)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      <span>{isAmharic ? 'ሙሉውን አንብብ' : 'Read Brief'}</span>
                      <FaArrowRight className="text-[10px]" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reader Modal */}
      <AnimatePresence>
        {readingPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-700 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 dark:border-slate-800 flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-2">
                    {readingPost.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                    {readingPost.title}
                  </h2>
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {readingPost.publishedAt && (
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        {readingPost.publishedAt.substring(0, 10)}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaClock className="text-xs" /> 5 min read
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                      LUCYCOM Technical Engineering Brief
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {readingPost.content}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-gray-50 dark:bg-slate-800/60 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {readingPost.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-gray-500 dark:text-gray-400 bg-gray-200/70 dark:bg-slate-700 px-2 py-0.5 rounded"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => setReadingPost(null)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  {isAmharic ? 'ዝጋ' : 'Close'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <LucyBot />
    </div>
  );
}
