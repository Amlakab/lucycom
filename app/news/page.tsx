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
  FaBolt,
  FaAward,
  FaShareAlt,
  FaBuilding,
  FaCheckCircle
} from 'react-icons/fa';

interface NewsItem {
  id: string;
  title: string;
  titleAm: string;
  category: string;
  categoryAm: string;
  date: string;
  readTime: string;
  author: string;
  excerpt: string;
  excerptAm: string;
  content: string;
  contentAm: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const LUCYCOM_NEWS_ITEMS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Lucycom S.C. Completes Turnkey 4G/5G LTE Infrastructure Across 120+ Telecom Sites',
    titleAm: 'ሉሲኮም ቴክኖሎጂስ በ120+ የቴሌኮም ጣቢያዎች ላይ የ4G/5G LTE ተከላና ማሻሻያን በስኬት አጠናቀቀ',
    category: 'Telecom & 5G',
    categoryAm: 'ቴሌኮም እና 5G',
    date: 'February 20, 2026',
    readTime: '4 min read',
    author: 'Telecom Engineering Desk',
    image: '/INSA/image21.jpg',
    featured: true,
    tags: ['Telecom', '4G/5G', 'Tower Erection', 'Drive Test'],
    excerpt: 'Engineering teams celebrate the milestone completion of BTS base station installations, heavy mast erections up to 60m, and microwave alignments across regional clusters with a 99.8% quality pass rate.',
    excerptAm: 'የኢንጂነሪንግ ቡድናችን በመላው ሀገሪቱ በ120+ ጣቢያዎች ላይ የሬዲዮ ተከላ፣ የማማ ተከላ (እስከ 60ሜ) እና የማይክሮዌቭ መስመር ዝርጋታን በ99.8% የጥራት ማለፊያ ምጣኔ በስኬት አጠናቋል።',
    content: `LUCYCOM TECHNOLOGIES S.C. is proud to announce the formal completion and provisional handover of turnkey telecommunications infrastructure across more than 120 BTS sites for national network modernization.

Key Technical Highlights:
1. High-Altitude Mast Erection: Engineering civil foundations, lattice towers, and monopole masts up to 60 meters compliant with international wind-loading and TIA/EIA-222 standards.
2. 4G/5G LTE Radio Commissioning: Antenna azimuth and tilt calibration, feeder jumper routing, VSWR sweep tests, and multi-band radio commissioning (SingleRAN).
3. Microwave Transport Backhaul: Precision microwave dish alignment and high-throughput point-to-point links connecting remote rural clusters to the core network.
4. Drive Test Optimization: Field validation teams utilizing Anritsu and Rohde & Schwarz drive-test telemetry achieved an unprecedented 99.8% first-time quality pass rate.

Lucycom continues to drive carrier-grade connectivity, pairing certified local riggers with global OEM technology partners.`,
    contentAm: `ሉሲኮም ቴክኖሎጂስ አ.ማ በሀገር አቀፍ ደረጃ በ120 በላይ የቴሌኮም ጣቢያዎች ላይ ያከናወነውን የሬዲዮ ተከላና የሽፋን ማሻሻያ ስራ በስኬት ማጠናቀቁን በታላቅ ኩራት ያበስራል።

የስራው ዋና ዋና የቴክኒክ ክንውኖች፡
1. የማማ ተከላ ስራዎች፡ እስከ 60 ሜትር ከፍታ ያላቸው የማማ ተከላዎች፣ የሲቪል መሰረት ግንባታ እና የደህንነት ማረጋገጫ በዓለም አቀፍ የTIA/EIA-222 መስፈርቶች መሰረት ተከናውኗል።
2. የ4G/5G LTE ሬዲዮ ኮሚሽኒንግ፡ የአንቴና አቅጣጫ ማስተካከል፣ የፊደር ኬብል ዝርጋታ፣ የVSWR ፍተሻ እና የበርካታ ባንዶች የሬዲዮ ተከላ ስራ።
3. የማይክሮዌቭ ትራንስሚሽን፡ ሩቅ የገጠር ጣቢያዎችን ከዋናው የኔትወርክ ማዕከል ጋር የሚያገናኙ ከፍተኛ አቅም ያላቸው የማይክሮዌቭ መስመሮች ተዘርግተዋል።
4. የድራይቭ ቴስት ጥራት ማረጋገጫ፡ የመስክ የጥራት መለኪያ ቡድኖቻችን በ99.8% የማለፊያ ምጣኔ ከፍተኛ ውጤት አስመዝግበዋል።

ሉሲኮም የኢትዮጵያን የዲጂታል ትስስር ለማጠናከር አስተማማኝ የመሰረተ-ልማት ስራዎችን አጠናክሮ ይቀጥላል።`,
  },
  {
    id: 'news-2',
    title: 'Lucycom Delivers High-Availability Modular Tier-III Data Center for Academic Campus',
    titleAm: 'ሉሲኮም ለከፍተኛ ትምህርት ተቋም ደረጃውን የጠበቀ Tier-III ሞጁላር ዳታ ሴንተር አስረከበ',
    category: 'Data Center',
    categoryAm: 'ዳታ ሴንተር',
    date: 'February 08, 2026',
    readTime: '5 min read',
    author: 'Datacom Division',
    image: '/INSA/image22.jpg',
    tags: ['Data Center', 'Tier III', 'Cooling', 'UPS'],
    excerpt: 'The turnkey project features in-row precision CRAC cooling, modular N+1 online UPS, hot-aisle containment, and certified Cat6A / OM4 structured cabling.',
    excerptAm: 'የተጠናቀቀው ፕሮጀክት ትክክለኛ የኢን-ሮው CRAC ማቀዝቀዣ፣ ሞጁላር N+1 ዩፒኤስ፣ የሆት-አይል ማቆያ እና የተረጋገጠ የፋይበር ኔትወርክ ዝርጋታን ያካተተ ነው።',
    content: `Lucycom has officially commissioned a state-of-the-art Tier-III compliant modular data center facility designed to host critical institutional learning portals, student records, and digital library repositories.

Engineering Specifications:
• Precision Thermal Management: Variable-speed inverter in-row CRAC units with intelligent hot-aisle containment, achieving an energy efficiency PUE below 1.35.
• Modular N+1 Online UPS: High-density modular double-conversion UPS systems backed by automated Cummins diesel generator synchronization.
• High-Density Structured Cabling: OM4 pre-terminated MPO fiber cassettes and Cat6A shielded copper backbones ensuring 100Gbps spine-leaf readiness.
• Clean Agent Fire Protection: FM-200 / Novec automatic gaseous fire suppression with early aspirating smoke detection (VESDA).

This deployment guarantees 99.982% uptime for mission-critical academic services.`,
    contentAm: `ሉሲኮም ቴክኖሎጂስ አ.ማ ለከፍተኛ የትምህርት ተቋም ያዘጋጀውን ደረጃውን የጠበቀ Tier-III ሞጁላር ዳታ ሴንተር በስኬት ገንብቶ አስረክቧል።

የዳታ ሴንተሩ ቴክኒካዊ ዝርዝሮች፡
• ትክክለኛ የማቀዝቀዣ ስርዓት (Precision Cooling)፡ የሃይል ብክነትን በከፍተኛ ሁኔታ የሚቀንስ ኢን-ሮው CRAC እና የሆት-አይል ማቆያ ስርዓት ተገጥሟል።
• ሞጁላር N+1 ዩፒኤስ (UPS)፡ ያልተቋረጠ የኤሌክትሪክ ሃይል የሚያቀርቡ ሞጁላር ዩፒኤሶች ከአውቶሜትድ የካሚንስ ጀነሬተሮች ጋር ተገናኝተዋል።
• ከፍተኛ አቅም ያለው የፋይበር ዝርጋታ፡ እስከ 100Gbps ፍጥነት የሚደግፉ የOM4 ፋይበር እና የCat6A የመረጃ መስመሮች ተዘርግተዋል።
• የጋዝ እሳት አደጋ መከላከያ፡ የFM-200 ጋዝ እሳት ማጥፊያ እና እጅግ ስሱ የVESDA ጭስ መለያ ስርዓት ተተክሏል።

ይህ ተቋም 99.982% አስተማማኝ ያልተቋረጠ የቴክኖሎጂ አገልግሎት ዋስትና ይሰጣል።`,
  },
  {
    id: 'news-3',
    title: 'Lucycom Modernizes Higher Education with Smart Classrooms & Virtual Desktop Infrastructure (VDI)',
    titleAm: 'ሉሲኮም የዩኒቨርሲቲዎችን የኮምፒውተር ላብራቶሪዎች በስማርት ቦርዶች እና በVDI አዘመነ',
    category: 'Smart Education',
    categoryAm: 'ዘመናዊ ትምህርት',
    date: 'January 28, 2026',
    readTime: '3 min read',
    author: 'Educational Technology Team',
    image: '/INSA/image15.jpg',
    tags: ['Smart Education', 'VDI', 'Interactive Boards', 'E-Learning'],
    excerpt: 'Replacing fragile physical desktop towers with centralized cloud VDI thin clients and 86-inch 4K collaborative interactive touch displays.',
    excerptAm: 'የድሮ የዴስክቶፕ ኮምፒውተሮችን በማዕከላዊ የVDI ደመና ሰርቨሮች እና በ86 ኢንች 4K ስማርት ቦርዶች በመተካት ዘመናዊ የመማሪያ አከባቢ ተፈጠረ።',
    content: `In partnership with leading vocational colleges and universities, Lucycom has deployed innovative Smart Classroom and VDI laboratory solutions.

Impact of Modernization:
- 70% Maintenance Reduction: Centralizing 180 user desktops onto a cluster of high-density virtualization servers running OS-Easy VDI. Student desks use ultra-low-power solid-state thin clients.
- 60-Second Lab Re-imaging: Instructors can reconfigure a 60-student lab environment from computer programming to engineering AutoCAD in under one minute.
- 86-inch 4K Smart Boards: Interactive multi-touch panels featuring wireless screen projection, digital whiteboard software, and dual OS switching.
- Automated Lecture Capture: AI tracking cameras record instructor lectures for on-demand playback on university learning management systems (Moodle).`,
    contentAm: `ሉሲኮም ከከፍተኛ ትምህርት ተቋማት ጋር በመተባበር ፈጠራ የታከለባቸው ዘመናዊ የመማሪያ ክፍሎችን እና የVDI ኮምፒውተር ላብራቶሪዎችን ገንብቷል።

የፕሮጀክቱ ፋይዳዎች፡
- የ70% የጥገና ወጪ ቅነሳ፡ 180 የኮምፒውተር ዴስኮችን በማዕከላዊ የVDI ሰርቨር በማደራጀት የኮምፒውተር ብልሽቶችንና የጥገና ወጪን በ70% ቀንሷል።
- በአንድ ደቂቃ ውስጥ ላቦችን ማዘጋጀት፡ መምህራን መላውን ላብራቶሪ በአንድ ደቂቃ ውስጥ ከፕሮግራሚንግ ወደ ኢንጂነሪንግ ሶፍትዌር መቀየር ይችላሉ።
- 86 ኢንች 4K ስማርት ቦርዶች፡ በንክኪ የሚሰሩ ዘመናዊ ሰሌዳዎች፣ የገመድ አልባ ስክሪን ማጋሪያ እና የዲጂታል ማስተማሪያ መሳሪያዎች ተተክለዋል።
- አውቶሜትድ የትምህርት ቀረጻ፡ የመምህሩን እንቅስቃሴ ተከትለው የሚያስተምሩትን ትምህርት የሚቀርጹ ካሜራዎች ተገጥመዋል።`,
  },
  {
    id: 'news-4',
    title: 'Deployment of AI-Driven Facial Recognition and Perimeter Defense for Industrial Complex',
    titleAm: 'ለኢንዱስትሪ ኮምፕሌክስ በAI የሚሰሩ የፊት መለያ ካሜራዎች እና የዙሪያ ጥበቃ ስርዓት ተዘረጋ',
    category: 'Security & AI',
    categoryAm: 'ደህንነት እና AI',
    date: 'January 15, 2026',
    readTime: '4 min read',
    author: 'Enterprise Security Division',
    image: '/INSA/image1.jpg',
    tags: ['AI CCTV', 'Perimeter Defense', 'Next-Gen Firewall', 'VMS'],
    excerpt: 'Over 250 AI-enabled IP surveillance cameras integrated with automated tripwire intrusion detection and central video monitoring command centers.',
    excerptAm: '250+ የAI ካሜራዎች ከማዕከላዊ የቁጥጥር ማዕከል ጋር ተገናኝተው የድንበር ጥሰቶችን በራስ-ሰር የሚያሳውቁ ተተክለዋል።',
    content: `Lucycom has completed an extensive security modernization project for a major corporate manufacturing hub, deploying edge AI video analytics and cybersecurity hardening.

Solution Overview:
• 250+ Neural Analytics IP Cameras: Deep-learning cameras executing real-time facial recognition, license plate recognition (LPR), and perimeter loitering detection.
• Video Wall Command Operations: Real-time central monitoring room featuring multi-screen ultra-narrow bezel video walls and enterprise VMS storage.
• Zero-Trust Firewall Hardening: Multi-site Fortinet FortiGate Next-Gen Firewalls delivering encrypted IPsec VPN tunneling, deep packet SSL inspection, and intrusion prevention.
• Anti-Passback Access Control: Biometric turnstiles and RFID card access gates controlling facility entry points.`,
    contentAm: `ሉሲኮም ቴክኖሎጂስ አ.ማ ለአንድ ትልቅ የኢንዱስትሪ ማዕከል ዘመናዊ የደህንነት ካሜራዎችን እና የሳይበር ደህንነት መከላከያ ስርዓትን ዘርግቶ አጠናቋል።

የመፍትሄው ዋና ዋና ክፍሎች፡
• 250+ የAI ካሜራዎች፡ የሰዎችን ፊት፣ የተሽከርካሪ ታርጋ እና አጠራጣሪ እንቅስቃሴዎችን በቅጽበት የሚለዩ ካሜራዎች ተተክለዋል።
• ማዕከላዊ የቪዲዮ ቁጥጥር ማዕከል፡ ባለብዙ ስክሪን የቪዲዮ ግድግዳ (Video Wall) ያለው የቁጥጥር ማዕከል እና ከፍተኛ አቅም ያለው የቪዲዮ ማከማቻ ተዘርግቷል።
• ቀጣይ ትውልድ ፋየርዎል (NGFW)፡ አስተማማኝ የFortinet FortiGate ፋየርዎሎች፣ ሚስጥራዊ የVPN መስመሮች እና የሳይበር ጥቃት መከላከያ ህጎች ተዋቅረዋል።
• የባዮሜትሪክ መግቢያ ቁጥጥር፡ በጣት አሻራ እና በመታወቂያ ካርድ የሚሰሩ የመግቢያ በሮች ተተክለዋል።`,
  },
  {
    id: 'news-5',
    title: 'Lucycom S.C. Reaffirms Full Regulatory Compliance with ECA and Ethiopian Energy Authority',
    titleAm: 'ሉሲኮም ከኢትዮጵያ ኮሙኒኬሽን ባለስልጣን እና ከኢነርጂ ባለስልጣን ጋር ያለውን የብቃት ፈቃድ አደሰ',
    category: 'Corporate & Licenses',
    categoryAm: 'የድርጅቱ ፈቃዶች',
    date: 'January 05, 2026',
    readTime: '3 min read',
    author: 'Corporate Legal Desk',
    image: '/INSA/image12.jpg',
    tags: ['Licenses', 'ECA', 'Energy Authority', 'Compliance'],
    excerpt: 'Statutory accreditations renewed under Communications Service Proclamation No. 1148/2019 and Energy Proclamation No. 686/2010 affirming commercial bidding qualification.',
    excerptAm: 'በኮሙኒኬሽን አገልግሎት አዋጅ ቁጥር 1148/2011 እና በኢነርጂ አዋጅ ቁጥር 686/2002 መሰረት የተሰጡ ህጋዊ ፈቃዶች መታደሳቸው ተረጋገጠ።',
    content: `LUCYCOM TECHNOLOGIES S.C. has successfully fulfilled its annual statutory compliance audits with the Ethiopian Communications Authority (ECA) and the Ethiopian Energy Authority (EEA).

Accreditations In Force:
1. ECA License (AA/ADISM/3/0000038/2013): Outdoor Telecommunications Facilities Installation & Maintenance Works License under Proclamation No. 1148/2019.
2. EEA Competency (51213--247): Electromechanical Contractor Grade-Five Competency Certificate under Proclamation No. 686/2010.
3. City Trade Bureau Licenses: Computer Network Design (Code: 85121), ICT Consultancy (Code: 86521), Software Development (Code: 39141).
4. Capital & Tax Standing: Registered share company capital of 2,360,000.00 ETB and active tax compliance under TIN 0072480301.

This solid legal standing guarantees corporate and government clients absolute confidence in our contractual capability.`,
    contentAm: `ሉሲኮም ቴክኖሎጂስ አ.ማ ከኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA) እና ከኢትዮጵያ ኢነርጂ ባለስልጣን (EEA) ጋር ያለውን አመታዊ ህጋዊ የብቃት ማረጋገጫና ፍተሻ በስኬት አጠናቋል።

ይፋዊ ፈቃዶቻችን፡
1. የECA ፈቃድ (AA/ADISM/3/0000038/2013)፡ የውጭ ቴሌኮሙኒኬሽን መሰረተ-ልማት ተከላና ጥገና ስራ ፈቃድ (አዋጅ 1148/2011)።
2. የEEA የብቃት ማረጋገጫ (51213--247)፡ የኤሌክትሮሜካኒካል ተቋራጭ ደረጃ አምስት (Grade-5) የብቃት ማረጋገጫ (አዋጅ 686/2010)።
3. የንግድ ቢሮ ፈቃዶች፡ የኮምፒውተር ኔትወርክ ዲዛይን (ኮድ 85121)፣ የICT ማማከር (ኮድ 86521)፣ የሶፍትዌር ማበልጸግ (ኮድ 39141)።
4. ካፒታል እና ግብር፡ የተመዘገበ 2,360,000.00 ብር ካፒታል እና ህጋዊ የTIN ቁጥር (0072480301)።

ይህ ህጋዊ አቋም ለድርጅቶችና ለመንግስት ተቋማት የምንሰጠውን አገልግሎት አስተማማኝነት የሚያረጋግጥ ነው።`,
  },
  {
    id: 'news-6',
    title: 'Strengthening Direct Carrier Equipment Supply Alliances with Global Technology OEMs',
    titleAm: 'ሉሲኮም ከአለም አቀፍ የቴክኖሎጂ አምራቾች ጋር ያለውን ቀጥተኛ የአቅርቦት ትስስር አጠናከረ',
    category: 'Partnerships',
    categoryAm: 'አጋርነት',
    date: 'December 18, 2025',
    readTime: '3 min read',
    author: 'Global Partnerships Lead',
    image: '/INSA/image11.jpg',
    tags: ['OEM Partners', 'Hardware Import', 'Supply Chain', 'Huawei', 'Cisco'],
    excerpt: 'Strategic relationships with global OEMs (Huawei, Nokia, Cisco, Fortinet, Dell, OS-Easy) guarantee genuine factory hardware with direct warranties.',
    excerptAm: 'ከዓለም መሪ አምራቾች (Huawei, Nokia, Cisco, Fortinet, Dell) ጋር ያለው ቀጥተኛ ትስስር ጥራት ያላቸውን እቃዎች በዋስትና ለማቅረብ ያስችላል።',
    content: `Lucycom Technologies S.C. has expanded its technology supplier partnerships to accelerate the delivery of carrier-grade infrastructure hardware across Ethiopia.

Partnership Highlights:
• Carrier-Grade Telecommunications: Direct supplier access for Huawei SingleRAN, Nokia AirScale, and Ericsson BTS modules with manufacturer warranties.
• Enterprise Networking: Cisco Catalyst switches, Fortinet FortiGate enterprise firewalls, and Siemon Cat6A / OM4 optical fiber systems.
• Mission-Critical Power: APC Schneider and Vertiv precision cooling and modular UPS systems.
• Local Spares Inventory: Dedicated warehousing in Addis Ababa ensuring rapid 4-hour SLA emergency replacements for SLA clients.`,
    contentAm: `ሉሲኮም ቴክኖሎጂስ አ.ማ ደረጃቸውን የጠበቁ የቴሌኮም እና የICT መሳሪያዎችን በቀጥታ ለማቅረብ ከአለም አቀፍ አምራቾች ጋር ያለውን ትስስር ይበልጥ አጠናክሯል።

የትብብሩ ዋና ዋና ነጥቦች፡
• የቴሌኮም መሳሪያዎች፡ ከHuawei፣ Nokia እና Ericsson በቀጥታ የሚመጡ ትክክለኛ የፋብሪካ ዋስትና ያላቸው የሬዲዮና ማይክሮዌቭ መሳሪያዎች።
• የድርጅት ኔትወርክና ደህንነት፡ የCisco ስዊቾች፣ የFortinet ቀጣይ ትውልድ ፋየርዎሎች እና የSiemon ፋይበር ኬብሎች።
• አስተማማኝ ሃይል፡ የSchneider እና Vertiv ፕሪሲዥን ማቀዝቀዣዎች እና ሞጁላር ዩፒኤሶች።
• የመለዋወጫ እቃዎች ክምችት፡ በአዲስ አበባ የተዘጋጀ የመለዋወጫ መጋዘን ፈጣን የ4 ሰዓት የጥገና ድጋፍ ለመስጠት ያስችላል።`,
  },
];

export default function NewsPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const categories = useMemo(() => [
    { key: 'all', labelEn: 'All News', labelAm: 'ሁሉም ዜናዎች' },
    { key: 'Telecom & 5G', labelEn: 'Telecom & 5G', labelAm: 'ቴሌኮም እና 5G' },
    { key: 'Data Center', labelEn: 'Data Center', labelAm: 'ዳታ ሴንተር' },
    { key: 'Smart Education', labelEn: 'Smart Education', labelAm: 'ዘመናዊ ትምህርት' },
    { key: 'Security & AI', labelEn: 'Security & AI', labelAm: 'ደህንነት እና AI' },
    { key: 'Corporate & Licenses', labelEn: 'Licenses & Corporate', labelAm: 'ፈቃዶች እና ድርጅቱ' },
    { key: 'Partnerships', labelEn: 'Partnerships', labelAm: 'አጋርነት' },
  ], []);

  const filteredNews = useMemo(() => {
    return LUCYCOM_NEWS_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || (
        item.title.toLowerCase().includes(q) ||
        item.titleAm.toLowerCase().includes(q) ||
        item.excerpt.toLowerCase().includes(q) ||
        item.excerptAm.toLowerCase().includes(q) ||
        item.tags.some(tag => tag.toLowerCase().includes(q))
      );
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredNews = useMemo(() => {
    return LUCYCOM_NEWS_ITEMS.find((item) => item.featured) || LUCYCOM_NEWS_ITEMS[0];
  }, []);

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
              src="/INSA/image21.jpg"
              alt="Lucycom News & Press Releases"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/75 to-black/55" />
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <motion.div
              initial={{ y: 25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mx-auto"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 backdrop-blur-md mb-4">
                <FaNewspaper className="text-blue-300" />
                <span>{isAmharic ? 'የኩባንያ ዜናዎች እና መግለጫዎች' : 'Corporate News & Announcements'}</span>
              </span>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 text-white drop-shadow-md tracking-tight">
                {isAmharic ? 'የቅርብ ጊዜ ዜናዎች እና የፕሮጀክት ስኬቶች' : 'Latest Updates & Industry Milestones'}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl mx-auto px-2 leading-relaxed drop-shadow">
                {isAmharic
                  ? 'የሉሲኮም ቴክኖሎጂስ አ.ማ የቅርብ ጊዜ የስራ ስኬቶች፣ ይፋዊ መግለጫዎች እና የቴክኖሎጂ ዜናዎች።'
                  : 'Follow the latest engineering achievements, project deployments, and corporate milestones from Lucycom Technologies S.C.'}
              </p>
            </motion.div>
          </div>
        </section>

        {/* =========================================================================
            FEATURED BREAKING STORY
           ========================================================================= */}
        {featuredNews && (
          <section className="py-8 sm:py-12 px-4 -mt-8 relative z-20">
            <div className="container mx-auto max-w-6xl">
              <div className="rounded-3xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all hover:border-blue-500/40">
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px]">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md flex items-center gap-1.5">
                      <FaAward size={11} />
                      <span>Featured Milestone</span>
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-bold">
                        {isAmharic ? featuredNews.categoryAm : featuredNews.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt size={11} />
                        <span>{featuredNews.date}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock size={11} />
                        <span>{featuredNews.readTime}</span>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                      {isAmharic ? featuredNews.titleAm : featuredNews.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {isAmharic ? featuredNews.excerptAm : featuredNews.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {featuredNews.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-[#0a192f] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-700"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedArticle(featuredNews)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>{isAmharic ? 'ሙሉውን ዜና ያንብቡ' : 'Read Full Story'}</span>
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================================
            FILTER & SEARCH BAR
           ========================================================================= */}
        <section className="py-6 px-4">
          <div className="container mx-auto max-w-6xl space-y-4">
            
            {/* Search Input */}
            <div className="relative max-w-xl mx-auto">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAmharic ? 'ዜናዎችን፣ መግለጫዎችን ወይም ቃላትን ይፈልጉ...' : 'Search news, press releases, keywords...'}
                className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#112240] text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                  }`}
                >
                  {isAmharic ? cat.labelAm : cat.labelEn}
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* =========================================================================
            NEWS GRID
           ========================================================================= */}
        <section className={`py-8 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#112240]/40' : 'bg-slate-50'}`}>
          <div className="container mx-auto max-w-6xl">
            
            {filteredNews.length === 0 ? (
              <div className="text-center py-16">
                <FaNewspaper className="text-4xl text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {isAmharic ? 'ምንም ዜና አልተገኘም' : 'No news found'}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isAmharic ? 'እባክዎ ሌላ ቃል ይፈልጉ ወይም ፊልተሩን ይቀይሩ' : 'Try adjusting your search terms or filter selection'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredNews.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all hover:border-blue-500/40 overflow-hidden group"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-slate-800">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-600/90 text-white backdrop-blur-xs">
                          {isAmharic ? item.categoryAm : item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2.5 text-[11px] text-gray-400 dark:text-gray-500">
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt size={10} />
                            <span>{item.date}</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <FaClock size={10} />
                            <span>{item.readTime}</span>
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {isAmharic ? item.titleAm : item.title}
                        </h3>

                        <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3 leading-relaxed">
                          {isAmharic ? item.excerptAm : item.excerpt}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium truncate max-w-[140px]">
                          {item.author}
                        </span>
                        <button
                          type="button"
                          onClick={() => setSelectedArticle(item)}
                          className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                        >
                          <span>{isAmharic ? 'ያንብቡ' : 'Read Article'}</span>
                          <FaArrowRight size={10} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

        {/* =========================================================================
            NEWSLETTER / MEDIA CONTACT CTA
           ========================================================================= */}
        <section className={`py-12 sm:py-16 px-4 ${theme === 'dark' ? 'bg-[#0a192f]' : 'bg-white'}`}>
          <div className="container mx-auto max-w-4xl">
            <div className="p-8 sm:p-10 rounded-3xl bg-blue-600 text-white shadow-xl text-center space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-md">
                <FaBuilding />
                <span>Lucycom Press & Media Desk</span>
              </span>
              <h3 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                {isAmharic ? 'የሚዲያ እና ይፋዊ መግለጫ ጥያቄዎች' : 'Media Inquiries & Official Press Releases'}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                {isAmharic
                  ? 'ስለ ሉሲኮም ቴክኖሎጂስ አ.ማ ፕሮጀክቶች፣ ጋዜጣዊ መግለጫዎች ወይም የትብብር ጥያቄዎች ካሉዎት በ info@lucycomtechnologies.com ያግኙን።'
                  : 'For journalist inquiries, tender partnership proposals, or corporate statements, contact our corporate communications desk.'}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 font-bold text-sm hover:bg-blue-50 transition-colors shadow-md"
                >
                  <span>{isAmharic ? 'ከሚዲያ ክፍላችን ጋር ይገናኙ' : 'Contact Communications Desk'}</span>
                  <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* =========================================================================
          FULL ARTICLE READER MODAL
         ========================================================================= */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-3xl max-h-[90vh] bg-white dark:bg-[#112240] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 dark:border-slate-800"
            >
              {/* Modal Header */}
              <div className="relative h-48 sm:h-64 w-full shrink-0">
                <Image
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors cursor-pointer"
                  aria-label="Close Article"
                >
                  <FaTimes size={16} />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-blue-600">
                    {isAmharic ? selectedArticle.categoryAm : selectedArticle.category}
                  </span>
                  <h2 className="text-base sm:text-xl md:text-2xl font-bold mt-2 leading-tight">
                    {isAmharic ? selectedArticle.titleAm : selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-slate-800 pb-3">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {selectedArticle.author}
                  </span>
                  <div className="flex items-center gap-3">
                    <span>{selectedArticle.date}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                </div>

                <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                  {isAmharic ? selectedArticle.contentAm : selectedArticle.content}
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedArticle.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="/contact"
                    onClick={() => setSelectedArticle(null)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors"
                  >
                    <span>{isAmharic ? 'የዋጋ መጠየቂያ ይላኩ' : 'Request a Quote'}</span>
                    <FaArrowRight size={11} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <LucyBot />
      <Footer />
    </div>
  );
}