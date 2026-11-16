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
  FaCertificate,
  FaCheckCircle,
  FaAward,
  FaShieldAlt,
  FaBuilding,
  FaFileContract,
  FaBalanceScale,
  FaBarcode,
  FaArrowRight
} from 'react-icons/fa';

const LUCYCOM_DEFAULT_LICENSES = [
  {
    _id: 'c1',
    title: 'Outdoor Telecommunications Facilities Installation & Maintenance Works License',
    titleAm: 'የውጭ ቴሌኮሙኒኬሽን መሰረተ-ልማት ተከላና ጥገና ስራ ፈቃድ',
    organization: 'Ethiopian Communications Authority (ECA)',
    organizationAm: 'የኢትዮጵያ ኮሙኒኬሽን ባለስልጣን',
    description: 'Official regulatory license issued under Communications Service Proclamation No. 1148/2019 for telecommunication facilities, towers, and networks.',
    credentialId: 'AA/ADISM/3/0000038/2013',
    proclamation: 'Proclamation No. 1148/2019',
  },
  {
    _id: 'c2',
    title: 'Electromechanical Contractor Grade-Five Competency Certificate',
    titleAm: 'የኤሌክትሮሜካኒካል ተቋራጭ ደረጃ አምስት (Grade-5) የብቃት ማረጋገጫ',
    organization: 'Ethiopian Energy Authority (EEA)',
    organizationAm: 'የኢትዮጵያ ኢነርጂ ባለስልጣን',
    description: 'Authorized electro-mechanical contractor competency certificate under Proclamation No. 686/2010 for power, cooling, and data center electromechanical works.',
    credentialId: '51213--247',
    proclamation: 'Proclamation No. 686/2010',
  },
  {
    _id: 'c3',
    title: 'Computer Network Design & Cable Installation License (Code: 85121)',
    titleAm: 'የኮምፒውተር ኔትወርክ ዲዛይን እና ኬብል ዝርጋታ ንግድ ፈቃድ (ኮድ 85121)',
    organization: 'Addis Ababa City Administration Trade Bureau',
    organizationAm: 'የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ',
    description: 'Commercial business license under Proclamation No. 980/2016 for structured cabling, campus backbones, and LAN/WAN infrastructure.',
    credentialId: 'AACATB/14/672/50644059/2019',
    proclamation: 'Proclamation No. 980/2016',
  },
  {
    _id: 'c4',
    title: 'Import Trade in Communication & Computer Equipment License (Code: 65721)',
    titleAm: 'የኮሙኒኬሽንና ኮምፒውተር እቃዎች አስመጪነት ንግድ ፈቃድ (ኮድ 65721)',
    organization: 'Ministry of Trade and Regional Integration',
    organizationAm: 'የንግድ እና ቀጠናዊ ትስስር ሚኒስቴር',
    description: 'Federal business license for importing carrier-grade hardware, telecom equipment, and server appliances.',
    credentialId: 'MT/AA/14/672/50644466/2019',
    proclamation: 'Federal Commercial Code',
  },
  {
    _id: 'c5',
    title: 'Consultancy Service on ICT (Code: 86521)',
    titleAm: 'የኢንፎርሜሽን ኮሙኒኬሽን ቴክኖሎጂ (ICT) የማማከር አገልግሎት (ኮድ 86521)',
    organization: 'Addis Ababa City Administration Trade Bureau',
    organizationAm: 'የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ',
    description: 'Licensed consultancy in enterprise systems architecture, datacenter engineering, and network infrastructure.',
    credentialId: 'AACATB/14/672/50644039/2019',
    proclamation: 'Proclamation No. 980/2016',
  },
  {
    _id: 'c6',
    title: 'Software Development & Systems Implementation (Code: 39141)',
    titleAm: 'የሶፍትዌር ልማት እና ሲስተምስ ማበልጸግ ንግድ ፈቃድ (ኮድ 39141)',
    organization: 'Addis Ababa City Administration Trade Bureau',
    organizationAm: 'የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ',
    description: 'Licensed development and deployment of bespoke enterprise software solutions, digital portals, and cloud systems.',
    credentialId: 'AACATB/14/672/50644211/2019',
    proclamation: 'Proclamation No. 980/2016',
  },
];

export default function LicensesPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const [licenses, setLicenses] = useState(LUCYCOM_DEFAULT_LICENSES);

  useEffect(() => {
    portfolioApi.getCertifications()
      .then(res => {
        const responseData = res?.data?.data ?? res?.data;
        const list = Array.isArray(responseData?.data)
          ? responseData.data
          : Array.isArray(responseData)
            ? responseData
            : [];
        if (list.length > 0) {
          setLicenses(list);
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
              src="/INSA/image12.jpg"
              alt="Lucycom Licenses & Accreditations"
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
                <FaCertificate className="text-yellow-400" />
                <span>{isAmharic ? 'ህጋዊ ፈቃዶች እና የብቃት ማረጋገጫዎች' : 'Official Accreditations & Licenses'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የንግድ ፈቃዶች እና የብቃት ማረጋገጫዎች' : 'Official Licenses & Accreditations'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'በኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA)፣ በኢነርጂ ባለስልጣን እና በንግድ ሚኒስቴር ሙሉ ፈቃድ የተሰጠው ህጋዊ ተቋም።'
                  : 'Licensed and compliant with the Ethiopian Communications Authority (ECA) and Federal Ministry of Trade regulations.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            LICENSES GRID
           ========================================================================= */}
        <section className={`py-12 sm:py-20 px-4 ${theme === 'dark' ? 'bg-[#112240]/60' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-7xl">
            
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                {isAmharic ? 'የተረጋገጡ የቴክኒክ ፈቃዶች' : 'Statutory Licenses & Competency Certificates'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                {isAmharic ? 'ለቴንደር፣ ለጨረታዎች እና ለመንግስት ፕሮጀክቶች ብቁ የሚያደርጉ ህጋዊ ፈቃዶች።' : 'Fully authorized to bid, contract, and execute nationwide telecommunication and electromechanical works.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {licenses.map((item: any, idx: number) => (
                <div
                  key={item._id || idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/50 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        <FaAward />
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <FaCheckCircle className="text-[10px]" />
                        <span>Active & Valid</span>
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {isAmharic && item.titleAm ? item.titleAm : item.title}
                    </h3>

                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {isAmharic && item.organizationAm ? item.organizationAm : item.organization}
                    </div>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-gray-100 dark:border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                      <span>License ID:</span>
                      <span className="font-mono font-bold text-gray-900 dark:text-white">{item.credentialId}</span>
                    </div>
                    {item.proclamation && (
                      <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
                        <span>Basis:</span>
                        <span className="font-medium text-gray-700 dark:text-gray-300">{item.proclamation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            CORPORATE TAX & LEGAL DETAILS
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="p-8 sm:p-10 rounded-2xl bg-gray-50 dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm">
              <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
                <FaBalanceScale className="text-3xl text-blue-600 dark:text-blue-400 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'የህጋዊ ምዝገባ እና የግብር ተገዢነት ማረጋገጫ' : 'Corporate Registration & Tax Compliance Verification'}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {isAmharic ? 'ከሚመለከታቸው የመንግስት አካላት የተሰጡ ሙሉ ህጋዊ ሰነዶች።' : 'Verified credentials registered under the commercial laws of the Federal Democratic Republic of Ethiopia.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-slate-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Company Name</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-1">LUCYCOM TECHNOLOGIES S.C.</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-slate-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Authorized Capital</p>
                  <p className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 mt-1">2,360,000.00 ETB</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-slate-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Tax Identification (TIN)</p>
                  <p className="text-xs sm:text-sm font-mono font-bold text-gray-900 dark:text-white mt-1">0072480301</p>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-[#0a192f] border border-gray-200 dark:border-slate-800">
                  <p className="text-xs text-gray-500 dark:text-gray-400">Headquarters</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white mt-1">Addis Ababa, Ethiopia</p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md"
                >
                  <span>{isAmharic ? 'የፈቃድ ማረጋገጫ ወይም የጨረታ ሰነድ ይጠይቁ' : 'Request License Copies / Tender Pack'}</span>
                  <FaArrowRight size={12} />
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