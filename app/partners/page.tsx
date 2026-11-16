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
  FaHandshake,
  FaExternalLinkAlt,
  FaAward,
  FaCheckCircle,
  FaShieldAlt,
  FaServer,
  FaNetworkWired,
  FaBuilding,
  FaFileContract
} from 'react-icons/fa';

const DEFAULT_PARTNERS = [
  { _id: 'p1', name: 'HUAWEI', domain: 'Telecom & SingleRAN', description: 'World leader in telecommunications, 4G/5G radio infrastructure, SingleRAN, and carrier microwave links.', tier: 'Global OEM Partner', website: 'https://www.huawei.com' },
  { _id: 'p2', name: 'NOKIA', domain: 'Optical & Mobile Infrastructure', description: 'Global technology pioneer in carrier routing, AirScale 5G mobile RAN, and optical DWDM transport.', tier: 'Global OEM Partner', website: 'https://www.nokia.com' },
  { _id: 'p3', name: 'ERICSSON', domain: '5G Radio & Transmission', description: 'Industry-standard 4G/5G cellular systems, antenna arrays, and high-capacity carrier transmission systems.', tier: 'Strategic Technology Partner', website: 'https://www.ericsson.com' },
  { _id: 'p4', name: 'CISCO', domain: 'Enterprise Switching & Routing', description: 'Global standard for enterprise routing, core switching backbones, and zero-trust software-defined networks.', tier: 'Certified Solution Provider', website: 'https://www.cisco.com' },
  { _id: 'p5', name: 'FORTINET', domain: 'Next-Gen Cybersecurity & NGFW', description: 'Industry-leading Next-Generation Firewalls (FortiGate), secure SD-WAN, and synchronized security fabric.', tier: 'Authorized Security Partner', website: 'https://www.fortinet.com' },
  { _id: 'p6', name: 'DELL TECHNOLOGIES', domain: 'Data Center Compute & Storage', description: 'Tier-standard rackmount compute servers, modular hyper-converged SAN/NAS storage, and high-availability virtualization.', tier: 'Hardware Infrastructure Partner', website: 'https://www.dell.com' },
  { _id: 'p7', name: 'SCHNEIDER ELECTRIC', domain: 'Modular UPS & In-Row Cooling', description: 'World leader in precision data center climate cooling, hot-aisle containment, and online double-conversion UPS systems.', tier: 'Data Center Facilities Partner', website: 'https://www.se.com' },
  { _id: 'p8', name: 'HIKVISION', domain: 'AI Video Surveillance & CCTV', description: 'High-definition IP surveillance cameras, central command operations, and intelligent video neural analytics.', tier: 'Security Solutions Partner', website: 'https://www.hikvision.com' },
  { _id: 'p9', name: 'DAHUA', domain: 'Perimeter Security & Analytics', description: 'AI face recognition, automated perimeter intrusion alerts, and integrated command room video walls.', tier: 'Surveillance & Access Partner', website: 'https://www.dahuasecurity.com' },
  { _id: 'p10', name: 'OS-EASY', domain: 'Virtual Desktop Infrastructure (VDI)', description: 'Enterprise-grade desktop virtualization for educational universities, high schools, and smart computer laboratories.', tier: 'Smart Education Partner', website: 'https://www.os-easy.com' },
];

export default function PartnersPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const [partners, setPartners] = useState(DEFAULT_PARTNERS);

  useEffect(() => {
    portfolioApi.getPartners({ limit: 50 })
      .then(res => {
        const responseData = res?.data?.data ?? res?.data;
        const list = Array.isArray(responseData?.data)
          ? responseData.data
          : Array.isArray(responseData)
            ? responseData
            : [];
        if (list.length > 0) {
          setPartners(list);
        }
      })
      .catch(() => {});
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
              src="/INSA/image11.jpg"
              alt="Lucycom Global Partners"
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
                <FaHandshake className="text-yellow-400" />
                <span>{isAmharic ? 'ስልታዊ አጋሮች' : 'Global Technology Alliances'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የአለም አቀፍ የቴክኖሎጂ አጋሮቻችን' : 'Our Strategic Partner Ecosystem'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'ከአለም መሪ አምራቾች ጋር በመተባበር ኦሪጅናል እቃዎችን፣ የተረጋገጠ ጥራት እና አስተማማኝ ዋስትና እናቀርባለን።'
                  : 'Delivering genuine tier-1 OEM hardware with direct manufacturer warranties and certified engineering support across Ethiopia.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            PARTNERS GRID
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isAmharic ? 'የተረጋገጡ የቴክኖሎጂ አምራቾች' : 'Tier-1 Hardware & Software Partners'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {isAmharic ? 'ከሲቪል እስከ ሶፍትዌር ድረስ በዓለም አቀፍ ደረጃ የተረጋገጡ ምርቶች።' : 'Strictly verified original equipment manufacturer direct integrations.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner: any, idx: number) => (
                <div
                  key={partner._id || idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wider group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {partner.name}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {partner.tier || 'Certified Partner'}
                      </span>
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {partner.domain}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      <FaCheckCircle className="text-[11px]" />
                      <span>{isAmharic ? 'የተረጋገጠ አጋር' : 'Authorized Delivery'}</span>
                    </span>

                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                      >
                        <span>Official Website</span>
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            PARTNERSHIP COMMITMENT BANNER
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="p-8 sm:p-10 rounded-2xl bg-blue-50 dark:bg-[#112240] border border-blue-200 dark:border-slate-700 text-center space-y-4">
              <FaAward className="text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {isAmharic ? 'የዋስትና እና የጥራት ማረጋገጫ ቃል' : 'Direct Manufacturer Warranties & SLA Protection'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {isAmharic
                  ? 'በሉሲኮም ቴክኖሎጂስ በኩል የሚቀርቡ ሁሉም የቴሌኮም፣ የኔትወርክ እና የዳታ ሴንተር እቃዎች ኦሪጅናል የፋብሪካ ማረጋገጫ ያላቸው ሲሆን፤ በሰለጠኑ ኢንጂነሮች ሙሉ የድጋፍ ዋስትና ይሰጣቸዋል።'
                  : 'All equipment supplied by Lucycom Technologies S.C. carries full manufacturer warranties, legitimate license entitlements, and factory certified installation validation.'}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs sm:text-sm shadow-sm transition-all"
                >
                  <FaFileContract />
                  <span>{isAmharic ? 'የእቃ አቅርቦት ዋጋ ይጠይቁ' : 'Inquire Hardware Procurement'}</span>
                </Link>
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
