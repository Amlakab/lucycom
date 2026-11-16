'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/language-context';
import { useTheme } from '@/lib/theme-context';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import {
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaGraduationCap,
  FaBolt,
  FaSearch,
  FaArrowRight,
  FaCheckCircle,
  FaFilePdf,
  FaMicrochip,
  FaIndustry,
  FaBroadcastTower,
  FaDesktop,
  FaCamera,
  FaFilter
} from 'react-icons/fa';
import { ProductItem, PRODUCTS_CATALOG } from '@/lib/data/products';

export default function ProductsPage() {
  const { theme } = useTheme();
  const { isAmharic } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const categories = [
    { key: 'ALL', label: isAmharic ? 'ሁሉም ምርቶች' : 'All Products', icon: FaFilter },
    { key: 'TELECOM', label: isAmharic ? 'ቴሌኮም' : 'Telecom & RF', icon: FaBroadcastTower },
    { key: 'DATACENTER', label: isAmharic ? 'ዳታ ሴንተር' : 'Data Center', icon: FaServer },
    { key: 'SECURITY', label: isAmharic ? 'ደህንነት & ፋየርዎል' : 'Security & Firewall', icon: FaShieldAlt },
    { key: 'NETWORKING', label: isAmharic ? 'ኔትወርኪንግ' : 'Networking', icon: FaNetworkWired },
    { key: 'EDUCATION', label: isAmharic ? 'ስማርት ትምህርት' : 'Smart Ed & VDI', icon: FaGraduationCap },
    { key: 'POWER', label: isAmharic ? 'ሃይል & ጀነሬተሮች' : 'Power & Generators', icon: FaBolt },
  ];

  const filteredProducts = PRODUCTS_CATALOG.filter((item) => {
    const matchesCategory = activeCategory === 'ALL' || item.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      item.name.toLowerCase().includes(query) ||
      item.nameAm.toLowerCase().includes(query) ||
      item.brand.toLowerCase().includes(query) ||
      item.shortDesc.toLowerCase().includes(query) ||
      item.shortDescAm.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0a192f] text-gray-100' : 'bg-[#F8FAFC] text-gray-900'
    }`}>
      <Navbar />

      <main className="pt-16 sm:pt-20">
        
        {/* =========================================================================
            HERO BANNER
           ========================================================================= */}
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/lucycom/products-hero-banner.jpg"
              alt="Lucycom Products & Equipment Portfolio"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/55" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4 backdrop-blur-md">
                <FaIndustry size={11} />
                {isAmharic ? 'ዓለም አቀፍ ደረጃቸውን የጠበቁ መሳሪያዎች' : 'Tier-1 Certified Hardware Portfolio'}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                {isAmharic 
                  ? 'የላቁ የቴሌኮም፣ የዳታ ሴንተር እና የደህንነት ምርቶች' 
                  : 'Enterprise Hardware & Carrier Equipment'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {isAmharic
                  ? 'ሉሲኮም ከዓለም ታዋቂ የቴክኖሎጂ አምራቾች (Huawei, Nokia, Cisco, Fortinet, Dell, OS-Easy) ጋር በመተባበር ኦሪጅናልና ዋስትና ያላቸውን እቃዎች ያቀርባል እንዲሁም ይተክላል።'
                  : 'Direct tier-1 integration with global OEM leaders providing genuine carrier-grade telecommunications, Tier-standard data center systems, and AI security infrastructure across Ethiopia.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            FILTER & SEARCH TOOLBAR
           ========================================================================= */}
        <section className={`sticky top-16 sm:top-20 z-20 border-b backdrop-blur-md transition-colors ${
          theme === 'dark' 
            ? 'bg-[#0a192f]/95 border-slate-800' 
            : 'bg-white/95 border-gray-200'
        } shadow-sm`}>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isCurrent = activeCategory === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => setActiveCategory(cat.key)}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                        isCurrent
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                          : theme === 'dark'
                            ? 'bg-slate-800/80 text-gray-300 hover:bg-slate-700/80 hover:text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <Icon size={12} />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="text"
                  placeholder={isAmharic ? 'ምርቶችን ወይም ብራንዶችን ይፈልጉ...' : 'Search products or OEMs...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border transition-all outline-none ${
                    theme === 'dark'
                      ? 'bg-slate-900/80 border-slate-700 text-white placeholder-gray-500 focus:border-blue-500'
                      : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-600'
                  }`}
                />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            PRODUCTS GRID
           ========================================================================= */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <FaSearch className="text-4xl text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {isAmharic ? 'ምንም ምርት አልተገኘም' : 'No products found'}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {isAmharic ? 'እባክዎ የተለየ ቃል ወይም ምድብ ይሞክሩ።' : 'Try searching with different keywords or clear filters.'}
                </p>
                <button
                  onClick={() => { setActiveCategory('ALL'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                >
                  {isAmharic ? 'ሁሉንም ምርቶች አሳይ' : 'Reset All Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((prod, idx) => (
                  <motion.div
                    key={prod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className={`group rounded-2xl overflow-hidden border flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                      theme === 'dark'
                        ? 'bg-[#112240] border-slate-800 hover:border-blue-500/50'
                        : 'bg-white border-gray-200 hover:border-blue-400 shadow-sm'
                    }`}
                  >
                    {/* Image Header */}
                    <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Brand Badge */}
                      <div className="absolute top-3.5 left-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-white/95 text-blue-900 shadow-md">
                          {prod.brand}
                        </span>
                      </div>

                      {/* Feature Badge */}
                      <div className="absolute top-3.5 right-3.5">
                        <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-blue-600/90 text-white backdrop-blur-sm shadow-md">
                          {isAmharic ? prod.badgeAm : prod.badge}
                        </span>
                      </div>

                      {/* Category Label at bottom of image */}
                      <div className="absolute bottom-3 left-3.5 right-3.5">
                        <p className="text-[11px] font-semibold text-blue-300 uppercase tracking-wider">
                          {isAmharic ? prod.categoryLabelAm : prod.categoryLabel}
                        </p>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-blue-500 transition-colors">
                          {isAmharic ? prod.nameAm : prod.name}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 leading-relaxed">
                          {isAmharic ? prod.shortDescAm : prod.shortDesc}
                        </p>

                        {/* Specs Bullets */}
                        <div className="space-y-1.5 mb-5 border-t border-gray-100 dark:border-slate-800/80 pt-3">
                          {(isAmharic ? prod.specsAm : prod.specs).slice(0, 3).map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
                              <FaCheckCircle className="text-blue-500 shrink-0 mt-0.5" size={10} />
                              <span className="line-clamp-1">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 flex items-center gap-2 border-t border-gray-100 dark:border-slate-800/80">
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200"
                        >
                          {isAmharic ? 'ዝርዝር መግለጫ' : 'Specifications'}
                        </button>

                        <Link
                          href={`/contact?service=${encodeURIComponent(prod.contactService)}`}
                          className="flex-1 py-2.5 px-3 rounded-xl text-xs font-bold text-center bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm hover:shadow flex items-center justify-center gap-1.5 group/btn"
                        >
                          <span>{isAmharic ? 'ዋጋ ይጠይቁ' : 'Request Quote'}</span>
                          <FaArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bottom Inquiries CTA */}
            <div className={`mt-16 p-8 sm:p-10 rounded-3xl border text-center relative overflow-hidden ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-blue-950/60 to-slate-900 border-blue-900/40' 
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'
            }`}>
              <div className="max-w-2xl mx-auto space-y-3 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/40">
                  {isAmharic ? 'የጅምላ አቅርቦት እና ጨረታ' : 'Enterprise Procurement & Tenders'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                  {isAmharic ? 'ለፕሮጀክትዎ የተለየ የሃርድዌር ዝርዝር ይፈልጋሉ?' : 'Need Custom Hardware Specifications or Tender Packs?'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {isAmharic
                    ? 'የሉሲኮም የሽያጭ እና የምህንድስና ቡድን ለቴሌኮም ኦፕሬተሮች፣ ለባንኮች እና ለመንግስት ተቋማት የBOQ ዝግጅት እና የቴክኒክ ሰነዶችን ያዘጋጃል።'
                    : 'Our engineering and procurement desks provide full tender Bill of Quantities (BOQ), manufacturer compliance certificates, and fast turn-around quotations.'}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href="/contact"
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-blue-500/30 transition-all inline-flex items-center gap-2"
                  >
                    <span>{isAmharic ? 'ከሽያጭ ክፍል ጋር ይነጋገሩ' : 'Contact Procurement Desk'}</span>
                    <FaArrowRight size={11} />
                  </Link>
                  <Link
                    href="/documents/LUCYCOM_Company_Profile.pdf"
                    target="_blank"
                    className="px-6 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 text-xs sm:text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-all inline-flex items-center gap-2"
                  >
                    <FaFilePdf className="text-red-500" />
                    <span>{isAmharic ? 'የኩባንያ መገለጫ አውርድ' : 'Download Catalog PDF'}</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* =========================================================================
          PRODUCT SPECS MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-2xl rounded-2xl overflow-hidden border shadow-2xl flex flex-col max-h-[90vh] ${
                theme === 'dark' ? 'bg-[#112240] border-slate-700 text-white' : 'bg-white border-gray-200 text-gray-900'
              }`}
            >
              {/* Modal Header Image */}
              <div className="relative h-48 w-full bg-slate-900 shrink-0">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center text-sm cursor-pointer"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-blue-600 text-white">
                    {selectedProduct.brand}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                    {isAmharic ? selectedProduct.nameAm : selectedProduct.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                    {isAmharic ? 'የምርት ማብራሪያ' : 'Product Overview'}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {isAmharic ? selectedProduct.shortDescAm : selectedProduct.shortDesc}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                    {isAmharic ? 'የቴክኒክ ዝርዝሮች' : 'Technical Specifications'}
                  </h4>
                  <div className="space-y-2">
                    {(isAmharic ? selectedProduct.specsAm : selectedProduct.specs).map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm"
                      >
                        <FaCheckCircle className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-end gap-3 bg-slate-50 dark:bg-slate-900/60">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {isAmharic ? 'ዝጋ' : 'Close'}
                </button>
                <Link
                  href={`/contact?service=${encodeURIComponent(selectedProduct.contactService)}`}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  <span>{isAmharic ? 'የዋጋ ዝርዝር ይጠይቁ' : 'Inquire for Quote'}</span>
                  <FaArrowRight size={10} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
