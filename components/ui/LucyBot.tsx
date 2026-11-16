'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Minimize2
} from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
  actionLink?: {
    text: string;
    href: string;
  };
}

interface BotResponse {
  text: string;
  action?: { text: string; href: string };
  options?: string[];
}

export const LucyBot: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message on mount or language switch
  useEffect(() => {
    const welcomeText = language === 'am'
      ? 'ሰላም! 👋 እንኳን ወደ ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.) በደህና መጡ።\nእኔ ሉሲቦት ነኝ፤ የድርጅቱ ረዳት AI። ዛሬ በምን ልርዳዎት?'
      : 'Hello! 👋 Welcome to LUCYCOM TECHNOLOGIES S.C.\nI am LucyBot, your corporate assistant. How can I help you today? Ask me any question about our services, projects, licenses, or requests.';

    const initialOptions = language === 'am' ? [
      'ስለ ሉሲኮም ንገሩኝ',
      'ምን አይነት አገልግሎት ትሰጣላችሁ?',
      'የቴሌኮም ስራዎች',
      'ደረጃቸውን የጠበቁ ዳታ ሴንተሮች',
      'ምን አይነት ፈቃዶች አሏችሁ?',
      'ቢሮአችሁ የት ነው?',
      'የዋጋ መጠየቂያ እንዴት ማግኘት እችላለሁ?'
    ] : [
      'Tell me about Lucycom',
      'What services do you provide?',
      'Telecom infrastructure',
      'Tier II/III Data Centers',
      'What licenses do you hold?',
      'Where is your office located?',
      'How do I request a quote?'
    ];

    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: initialOptions,
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  /**
   * Comprehensive, contextual question-answering engine for Lucycom Technologies S.C.
   */
  const generateResponse = (query: string, lang: 'en' | 'am'): BotResponse => {
    const q = query.toLowerCase().trim();

    // -------------------------------------------------------------
    // 1. GREETINGS (Pure greetings or casual salutations)
    // -------------------------------------------------------------
    const isPureGreeting = (
      /^(hi|hello|hey|hiya|howdy|greetings|good\s*(morning|afternoon|evening|day)|yo|sup|what'?s\s*up)\b/i.test(q) ||
      /^(ሰላም|ሰላምታ|ጤና\s*ይስጥልኝ|እንደምን\s*(አለህ|አለሽ|አላችሁ|አደርክ|አመሸህ)|እንዴት\s*(ነህ|ነሽ|ናችሁ)|ሀይ|ሃይ|ሰላም\s*ነው)/i.test(q)
    );

    // Check if greeting doesn't contain a domain question (like "hi, where is your office?")
    const hasSpecificDomainKeyword = (
      q.includes('telecom') || q.includes('data') || q.includes('service') || q.includes('license') ||
      q.includes('where') || q.includes('address') || q.includes('price') || q.includes('quote') ||
      q.includes('project') || q.includes('education') || q.includes('security') || q.includes('partner') ||
      q.includes('news') || q.includes('ማማ') || q.includes('ቢሮ') || q.includes('አድራሻ') || q.includes('ፈቃድ') ||
      q.includes('ዋጋ') || q.includes('ትምህርት') || q.includes('ደህንነት') || q.includes('ስራ')
    );

    if (isPureGreeting && !hasSpecificDomainKeyword) {
      if (lang === 'am') {
        return {
          text: 'ሰላም! 👋 እንኳን ወደ ሉሲኮም ቴክኖሎጂስ አ.ማ በደህና መጡ። ዛሬ በምን ልርዳዎት?\n\nስለ ድርጅታችን ማንኛውንም መረጃ መጠየቅ ይችላሉ፦\n• 📡 የቴሌኮም እና 4G/5G መሰረተ-ልማት\n• 🏢 ደረጃቸውን የጠበቁ Tier II/III ዳታ ሴንተሮች\n• 🎓 ዘመናዊ ትምህርት እና VDI ላብራቶሪዎች\n• 🛡️ የድርጅት ደህንነት እና AI ሲሲቲቪ\n• 📜 ህጋዊ ፈቃዶች (ECA፣ EEA፣ ንግድ ቢሮ)\n• 🏆 የተከናወኑ ቁልፍ ፕሮጀክቶች\n• 💼 አገልግሎት ወይም የዋጋ መጠየቂያ ማቅረብ',
          options: [
            'ስለ ሉሲኮም ንገሩኝ',
            'ምን አይነት አገልግሎት ትሰጣላችሁ?',
            'የቴሌኮም ስራዎች',
            'ቢሮአችሁ የት ነው?',
            'ምን አይነት ፈቃዶች አሏችሁ?',
            'አገልግሎት እንዴት ማዘዝ እችላለሁ?'
          ],
        };
      }
      return {
        text: 'Hello! 👋 Welcome to LUCYCOM TECHNOLOGIES S.C. How can I assist you today?\n\nI can provide you with detailed information about:\n• 📡 Telecom & Mobile Network Infrastructure (Towers, 4G/5G, RF)\n• 🏢 Tier II/III Data Center Design & Construction\n• 🎓 Smart Classrooms & OS-Easy VDI Computer Labs\n• 🛡️ Enterprise Security, AI IP CCTV & Next-Gen Firewalls\n• 📜 Official Statutory Licenses (ECA, EEA, Trade Bureau)\n• 🏆 Completed Corporate Projects & Track Record\n• 💼 Submitting a Service Request or RFP Quotation',
        options: [
          'Tell me about Lucycom',
          'What services do you provide?',
          'Telecom infrastructure',
          'Where is your office located?',
          'What licenses do you hold?',
          'How do I request a quote?'
        ],
      };
    }

    // -------------------------------------------------------------
    // 2. GRATITUDE / COURTESY
    // -------------------------------------------------------------
    if (
      q.includes('thank') || q.includes('thanks') || q.includes('thx') || q.includes('appreciate') ||
      q.includes('አመሰግናለሁ') || q.includes('እግዜር ይስጥልኝ') || q.includes('ተባረክ') || q.includes('ምስጋና')
    ) {
      if (lang === 'am') {
        return {
          text: 'ምንም አይደል! 😊 ስላነጋገሩን ደስ ብሎናል። ስለ ሉሲኮም ቴክኖሎጂስ ተጨማሪ ጥያቄ ካለዎት ወይም የቴክኒክ ድጋፍ ከፈለጉ በማንኛውም ሰዓት እዚህ ነኝ። መልካም ቀን ይሁንልዎ!',
          options: ['ስለ ሉሲኮም ንገሩኝ', 'አገልግሎቶችን ይመልከቱ', 'ያግኙን'],
        };
      }
      return {
        text: "You're very welcome! 😊 It's our absolute pleasure to assist you. If you have any more questions about Lucycom Technologies or need engineering consultation, feel free to ask anytime. Have a wonderful day!",
        options: ['Tell me about Lucycom', 'View all services', 'Contact details'],
      };
    }

    // -------------------------------------------------------------
    // 3. GOODBYE / CLOSING
    // -------------------------------------------------------------
    if (
      q.includes('bye') || q.includes('goodbye') || q.includes('see you') || q.includes('cya') ||
      q.includes('ደህና ሁን') || q.includes('ደህና ሁኚ') || q.includes('ደህና ሁኑ') || q.includes('ቻው')
    ) {
      if (lang === 'am') {
        return {
          text: 'ደህና ሁኑ! 👋 ሉሲኮም ቴክኖሎጂስን ስላነጋገሩ እናመሰግናለን። ለቴሌኮም ወይም ለICT መሰረተ-ልማት ስራዎች በማንኛውም ሰዓት በ +251 939997612 ወይም info@lucycomtechnologies.com ሊያገኙን ይችላሉ።',
          action: { text: 'ያግኙን', href: '/contact' },
        };
      }
      return {
        text: 'Goodbye! 👋 Thank you for connecting with Lucycom Technologies S.C. If you ever need carrier-grade telecom or ICT engineering solutions, our team is just a call or email away: +251 939997612 or info@lucycomtechnologies.com.',
        action: { text: 'Contact Us', href: '/contact' },
      };
    }

    // -------------------------------------------------------------
    // 4. ABOUT LUCYCOM / WHO IS LUCYCOM / MOTTO / CAPITAL
    // -------------------------------------------------------------
    if (
      q.includes('who is lucycom') || q.includes('about lucycom') || q.includes('what is lucycom') ||
      q.includes('tell me about lucycom') || q.includes('who are you') || q.includes('company profile') ||
      q.includes('about company') || q.includes('motto') || q.includes('slogan') || q.includes('capital') ||
      q.includes('ስለ ሉሲኮም') || q.includes('ሉሲኮም ማን ነው') || q.includes('ስለ ኩባንያው') || q.includes('ስለ ድርጅቱ') ||
      q.includes('መፈክር') || q.includes('ካፒታል')
    ) {
      if (lang === 'am') {
        return {
          text: '🏛️ **ስለ ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.)**፡\n\nሉሲኮም በኢትዮጵያ ዓለም አቀፍ ደረጃቸውን የጠበቁ፣ አስተማማኝ የICT፣ የቴሌኮም እና የዳታ ሴንተር መሰረተ-ልማቶችን በመንደፍ፣ በማቅረብና በመገንባት ላይ የተሰማራ ቀዳሚ የአክሲዮን ማህበር ነው።\n\n• **መፈክር**፦ «ሉሲ መገኛ፣ ሉሲኮም መዳረሻ»\n• **የህጋዊ ምዝገባ አይነት**፦ የአክሲዮን ማህበር (Share Company)\n• **ዋና መስሪያ ቤት**፦ አዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406\n• **አለም አቀፍ አጋሮች**፦ HUAWEI፣ NOKIA፣ ERICSSON፣ CISCO፣ FORTINET፣ HPE/DELL',
          action: { text: 'ስለ ድርጅቱ በዝርዝር ይመልከቱ', href: '/about' },
          options: ['ምን አይነት አገልግሎት ትሰጣላችሁ?', 'የተጠናቀቁ ፕሮጀክቶች', 'ህጋዊ ፈቃዶች', 'ቢሮአችሁ የት ነው?'],
        };
      }
      return {
        text: '🏛️ **About LUCYCOM TECHNOLOGIES S.C.**:\n\nLUCYCOM TECHNOLOGIES S.C. is a premier Ethiopian share company dedicated to designing, supplying, building, and maintaining resilient, scalable, and carrier-grade ICT and telecom infrastructure across Ethiopia.\n\n• **Corporate Motto**: *"Lucy the origin, LucyCom the destination"*\n• **Entity Type**: Registered Share Company (S.C.)\n• **Corporate Headquarters**: Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia\n• **OEM Partners**: HUAWEI, NOKIA, ERICSSON, CISCO, FORTINET, HPE/DELL, OS-EASY\n\nWe pair certified local engineers with global standard technologies compliant with ECA regulations and IEEE/TIA-942 specifications.',
        action: { text: 'Learn More About Us', href: '/about' },
        options: ['What services do you provide?', 'Completed projects', 'What licenses do you hold?', 'Where is your office?'],
      };
    }

    // -------------------------------------------------------------
    // 5. TELECOM INFRASTRUCTURE SPECIFIC
    // -------------------------------------------------------------
    if (
      q.includes('telecom') || q.includes('tower') || q.includes('mast') || q.includes('bts') ||
      q.includes('4g') || q.includes('5g') || q.includes('lte') || q.includes('microwave') ||
      q.includes('rf') || q.includes('drive test') || q.includes('antenna') || q.includes('feeder') ||
      q.includes('ቴሌኮም') || q.includes('ማማ') || q.includes('ተከላ') || q.includes('ድራይቭ ቴስት') ||
      q.includes('ሬዲዮ') || q.includes('ማይክሮዌቭ')
    ) {
      if (lang === 'am') {
        return {
          text: '📡 **የቴሌኮም መሰረተ-ልማት እና የሞባይል ኔትወርክ ዝርጋታ**፦\n\nሉሲኮም በኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA) ፍቃድ የተሰጠው የቴሌኮም ተቋራጭ ሲሆን የሚከተሉትን ያከናውናል፡\n\n1. **የማማ ተከላ ስራዎች (እስከ 60ሜ)**፦ የሲቪል መሰረት ግንባታ፣ የላቲስ እና የሞኖፖል ማማዎች ተከላ።\n2. **4G/5G LTE ሬዲዮ ኮሚሽኒንግ**፦ የአንቴና አቅጣጫ ማስተካከል፣ የፊደር ዝርጋታ፣ VSWR ፍተሻ እና የSingleRAN ተከላ።\n3. **የማይክሮዌቭ ትራንስሚሽን**፦ የሩቅ ጣቢያዎችን የሚያገናኙ አስተማማኝ የማይክሮዌቭ መስመሮች።\n4. **የድራይቭ ቴስት ጥራት ማረጋገጫ**፦ በ120+ ጣቢያዎች ላይ 99.8% የጥራት ማለፊያ ምጣኔ የተመዘገበበት የመስክ ጥራት ፍተሻ።\n5. **የፋይበር መስመር ዝርጋታ**፦ የመሬት ውስጥ እና የአየር ላይ የፋይበር መስመሮች እና የOTDR ፍተሻ።',
          action: { text: 'የቴሌኮም አገልግሎት ይጠይቁ', href: '/contact?service=Telecom+Infrastructure' },
          options: ['ስለ 120+ ጣቢያዎች ዜና ያንብቡ', 'ምን አይነት ፈቃዶች አሏችሁ?', 'ሌሎች አገልግሎቶች'],
        };
      }
      return {
        text: '📡 **Telecom Infrastructure & Mobile Network Rollout**:\n\nLucycom is an ECA-licensed telecom engineering contractor delivering turnkey cellular and transport infrastructure:\n\n• **Mast & Tower Erection**: Civil foundations, heavy lattice towers, and monopole masts up to 60 meters built to TIA/EIA-222 wind-loading standards.\n• **4G/5G LTE Commissioning**: Antenna azimuth/tilt calibration, feeder jumper routing, VSWR sweep testing, and multi-band radio base station commissioning.\n• **Microwave Backhaul**: High-throughput point-to-point microwave dish transmission connecting remote clusters.\n• **RF Drive Test Optimization**: Rigorous field telemetry achieving an outstanding 99.8% quality pass rate across 120+ national sites.\n• **Optical Fiber Backhaul**: Aerial ADSS/OPGW and underground trenching, splicing, and OTDR acceptance.',
        action: { text: 'Request Telecom Solution', href: '/contact?service=Telecom+Infrastructure' },
        options: ['Read 120+ sites rollout news', 'What licenses do you hold?', 'Explore other services'],
      };
    }

    // -------------------------------------------------------------
    // 6. DATA CENTER & CABLING SPECIFIC
    // -------------------------------------------------------------
    if (
      q.includes('data center') || q.includes('datacenter') || q.includes('server room') ||
      q.includes('cooling') || q.includes('crac') || q.includes('ups') || q.includes('tier 2') ||
      q.includes('tier 3') || q.includes('tier ii') || q.includes('tier iii') || q.includes('cabling') ||
      q.includes('cat6a') || q.includes('fiber backbone') || q.includes('fm200') ||
      q.includes('ዳታ ሴንተር') || q.includes('ማቀዝቀዣ') || q.includes('ዩፒኤስ') || q.includes('ሰርቨር') || q.includes('ፕሪሲዥን')
    ) {
      if (lang === 'am') {
        return {
          text: '🏢 **ደረጃቸውን የጠበቁ Tier II/III ዳታ ሴንተሮች እና ዳታኮም**፦\n\nሉሲኮም የTIA-942 እና የUptime Institute መስፈርቶችን የጠበቁ አስተማማኝ ዳታ ሴንተሮችን ይገነባል፡\n\n• **ፕሪሲዥን ማቀዝቀዣ (Precision CRAC)**፦ የሃይል ብክነትን የሚቀንሱ ኢን-ሮው ማቀዝቀዣዎች እና የሆት/ኮልድ አይል ማቆያ ስርዓቶች (PUE < 1.35)።\n• **ያልተቋረጠ ሃይል (Modular UPS)**፦ N+1 ሞጁላር የመስመር ላይ ዩፒኤሶች እና ከአውቶሜትድ የካሚንስ ጀነሬተሮች ጋር የተገናኙ ስርዓቶች።\n• **የፋይበር እና የኮፐር ኔትወርክ ዝርጋታ**፦ እስከ 100Gbps የሚያስተላልፉ Cat6A እና OM4/OS2 MPO የፋይበር መስመሮች።\n• **የእሳት አደጋ መከላከያ**፦ በጋዝ የሚሰሩ FM-200/Novec እሳት ማጥፊያዎች እና እጅግ ስሱ የVESDA ጭስ መለያ መሳሪያዎች።',
          action: { text: 'የዳታ ሴንተር አገልግሎት ይጠይቁ', href: '/contact?service=Data+Center+%26+Datacom' },
          options: ['ስለ ዩኒቨርሲቲ ዳታ ሴንተር ፕሮጀክት', 'የዋጋ መጠየቂያ', 'ሌሎች አገልግሎቶች'],
        };
      }
      return {
        text: '🏢 **Tier II & Tier III Data Center Infrastructure**:\n\nLucycom delivers turn-key mission-critical data center facilities complying with TIA-942 and Uptime Institute standards:\n\n• **Precision Thermal Control**: In-row CRAC units with hot/cold aisle containment, maintaining optimal delta-T and delivering PUE < 1.35.\n• **Modular N+1 Online UPS**: High-efficiency online double-conversion UPS clusters synchronized with industrial Cummins diesel generators.\n• **Structured Fiber & Copper Cabling**: TIA-942 OM4 multimode / OS2 singlemode MPO fiber backbones and shielded Cat6A copper networks (100G/400G ready).\n• **Clean Agent Fire Suppression**: Automated FM-200 / Novec gaseous fire suppression paired with VESDA air-sampling detection.',
        action: { text: 'Request Data Center Build', href: '/contact?service=Data+Center+%26+Datacom' },
        options: ['View campus data center project', 'Get a data center quote', 'Other services'],
      };
    }

    // -------------------------------------------------------------
    // 7. SMART EDUCATION & VDI SPECIFIC
    // -------------------------------------------------------------
    if (
      q.includes('smart education') || q.includes('smart classroom') || q.includes('interactive') ||
      q.includes('smart board') || q.includes('flat panel') || q.includes('lecture capture') ||
      q.includes('vdi') || q.includes('virtual lab') || q.includes('computer lab') || q.includes('podium') ||
      q.includes('ትምህርት') || q.includes('ስማርት ቦርድ') || q.includes('ላብራቶሪ') || q.includes('ሌክቸር') || q.includes('ላብ')
    ) {
      if (lang === 'am') {
        return {
          text: '🎓 **ዘመናዊ ትምህርት እና VDI የኮምፒውተር ላብራቶሪዎች**፦\n\nሉሲኮም ዩኒቨርሲቲዎችን፣ ኮሌጆችን እና ትምህርት ቤቶችን ወደ ዘመናዊ የዲጂታል ማዕከልነት ይለውጣል፡\n\n• **4K ስማርት ቦርዶች (65" - 86")**፦ በንክኪ የሚሰሩ ሰሌዳዎች፣ ገመድ አልባ ስክሪን ማጋሪያ እና ባለሁለት ኦፕሬቲንግ ሲስተም (Android + Windows)።\n• **አውቶሜትድ ሌክቸር ቀረጻ**፦ የመምህሩን እንቅስቃሴ በAI ተከትለው የሚያስተምሩትን ትምህርት በራስ-ሰር የሚቀርጹ ካሜራዎች።\n• **OS-Easy VDI የኮምፒውተር ላብራቶሪ**፦ 150+ የኮምፒውተር ዴስኮችን በማዕከላዊ ሰርቨር በማደራጀት የኮምፒውተር ጥገና ወጪን በ70% የሚቀንስ ዘመናዊ ሲስተም።\n• **ዘመናዊ ዲጂታል ፖዲየሞች**፦ የተቀናጀ ድምጽ፣ ማይክሮፎን እና የንክኪ ስክሪን መቆጣጠሪያ ያላቸው የመድረክ ፖዲየሞች።',
          action: { text: 'የዘመናዊ ትምህርት አገልግሎት ይጠይቁ', href: '/contact?service=Smart+Education' },
          options: ['VDI እንዴት ይሰራል?', 'የዋጋ መጠየቂያ', 'ሌሎች አገልግሎቶች'],
        };
      }
      return {
        text: '🎓 **Smart Education & Campus Digitalization**:\n\nWe modernize universities, colleges, and schools into state-of-the-art interactive digital campuses:\n\n• **4K Interactive Flat Panels**: High-precision 65" to 86" collaborative multi-touch displays with wireless screen broadcasting and dual OS.\n• **Automated Lecture Capture**: AI-powered auto-tracking PTZ cameras that follow the lecturer and record multi-angle audio-visual sessions for LMS (Moodle).\n• **OS-Easy VDI Computer Labs**: Virtual Desktop Infrastructure that consolidates 150+ physical desktops onto centralized servers, slashing hardware maintenance by 70% and enabling 60-second lab re-imaging.\n• **Smart Digital Podiums**: Ergonomic presenter podiums integrating touch controls, audio amplification, and interactive tablets.',
        action: { text: 'Request Smart Education Solution', href: '/contact?service=Smart+Education' },
        options: ['How does VDI reduce costs?', 'Request classroom quote', 'Other services'],
      };
    }

    // -------------------------------------------------------------
    // 8. ENTERPRISE SECURITY / CCTV / FIREWALL SPECIFIC
    // -------------------------------------------------------------
    if (
      q.includes('security') || q.includes('cctv') || q.includes('camera') || q.includes('surveillance') ||
      q.includes('firewall') || q.includes('ngfw') || q.includes('fortinet') || q.includes('facial recognition') ||
      q.includes('perimeter') || q.includes('intrusion') || q.includes('access control') || q.includes('turnstile') ||
      q.includes('ደህንነት') || q.includes('ሲሲቲቪ') || q.includes('ካሜራ') || q.includes('ፋየርዎል') ||
      q.includes('መግቢያ ቁጥጥር') || q.includes('ዙሪያ ጥበቃ')
    ) {
      if (lang === 'am') {
        return {
          text: '🛡️ **የድርጅት ደህንነት እና AI ሲሲቲቪ ቅኝት**፦\n\nሉሲኮም ለባንኮች፣ ለፋብሪካዎችና ለመንግስት ተቋማት የተሟላ አካላዊና ዲጂታል የደህንነት ስርዓቶችን ይዘረጋል፡\n\n• **የAI ካሜራዎች እና የፊት መለያ**፦ የሰዎችን ፊት፣ የተሽከርካሪ ታርጋ እና አጠራጣሪ እንቅስቃሴዎችን በቅጽበት የሚለዩ 4K IP ካሜራዎች።\n• **የዙሪያ ጥበቃ (Perimeter Tripwire)**፦ በግቢው አጥር ዙሪያ የሚደረጉ ድንገተኛ ጥሰቶችን በራስ-ሰር ለቁጥጥር ማዕከሉ የሚያሳውቁ ስርዓቶች።\n• **ማዕከላዊ የቪዲዮ ቁጥጥር (VMS Video Wall)**፦ 250+ ካሜራዎችን በአንድ ላይ የሚያሳዩ ባለብዙ ስክሪን የኮማንድ ማዕከላት።\n• **ቀጣይ ትውልድ ፋየርዎል (NGFW)**፦ የFortinet FortiGate እና የCisco ፋየርዎሎች፣ ሚስጥራዊ የVPN መስመሮች እና የZero-Trust ደህንነት።\n• **የባዮሜትሪክ መግቢያ በሮች**፦ የጣት አሻራ እና የፊት ገጽታ የሚያነቡ የTurnstile መግቢያ በሮች።',
          action: { text: 'የደህንነት አገልግሎት ይጠይቁ', href: '/contact?service=Enterprise+Security' },
          options: ['ስለ 250+ AI ካሜራዎች ፕሮጀክት', 'የዋጋ መጠየቂያ', 'ሌሎች አገልግሎቶች'],
        };
      }
      return {
        text: '🛡️ **Enterprise Cybersecurity & AI Surveillance**:\n\nLucycom deploys integrated physical and cyber defense architectures for financial complexes, government sites, and industrial parks:\n\n• **AI IP Video Surveillance**: 4K cameras featuring edge neural facial recognition, vehicle LPR, and unauthorized loitering alerts.\n• **Perimeter Intrusion Alerts**: Automated digital tripwires generating instant alerts across long-span perimeter boundaries.\n• **Central Command Video Walls**: Enterprise Video Management System (VMS) multi-screen video walls for 24/7 security dispatch.\n• **Next-Generation Firewalls (NGFW)**: Redundant Fortinet FortiGate and Cisco Firepower architectures with encrypted multi-site VPNs, SSL deep inspection, and zero-trust controls.\n• **Biometric Access Control**: Optical turnstiles and biometric time-attendance gates.',
        action: { text: 'Request Enterprise Security', href: '/contact?service=Enterprise+Security' },
        options: ['Read industrial park security case', 'Request a security quote', 'Other services'],
      };
    }

    // -------------------------------------------------------------
    // 9. ELECTROMECHANICAL & SOLAR SPECIFIC
    // -------------------------------------------------------------
    if (
      q.includes('electromechanical') || q.includes('solar') || q.includes('generator') ||
      q.includes('diesel') || q.includes('ats') || q.includes('grounding') || q.includes('battery') ||
      q.includes('power') || q.includes('ኤሌክትሮሜካኒካል') || q.includes('ጀነሬተር') || q.includes('ፀሐይ') ||
      q.includes('መብራት') || q.includes('ሃይል') || q.includes('ባትሪ')
    ) {
      if (lang === 'am') {
        return {
          text: '⚡ **ኤሌክትሮሜካኒካል፣ ጀነሬተሮች እና የፀሐይ ሃይል ማይክሮግሪድ**፦\n\nሉሲኮም የኢትዮጵያ ኢነርጂ ባለስልጣን የደረጃ-5 የኤሌክትሮሜካኒካል ተቋራጭ ፈቃድ ያለው ሲሆን የሚከተሉትን ያከናውናል፡\n\n• **ኢንዱስትሪያል ጀነሬተሮች**፦ ድምጽ አልባ የከባድ ናፍጣ ጀነሬተሮች እና አውቶሜትድ ATS ስዊቾች።\n• **የመሬት ዝውውር እና መብረቅ መከላከያ**፦ የኮፐር የመሬት ጉድጓዶች እና የኤሌክትሪክ ጫና መከላከያ ስርዓቶች።\n• **የፀሐይ ሃይል ማይክሮግሪዶች**፦ የጣሪያ ላይ የፀሐይ ኃይል ስርዓቶች እና ረጅም እድሜ ያላቸው የሊቲየም (LiFePO4) ባትሪዎች ለ24/7 ያልተቋረጠ ሃይል።',
          action: { text: 'የሃይልና የፀሐይ አገልግሎት ይጠይቁ', href: '/contact?service=Electromechanical+%26+Solar' },
          options: ['ስለ ፈቃዳችን ይመልከቱ', 'የዋጋ መጠየቂያ', 'ሌሎች አገልግሎቶች'],
        };
      }
      return {
        text: '⚡ **Electromechanical, Generators & Solar Microgrids**:\n\nCertified as an EEA Grade-5 Electromechanical Contractor (Proclamation 686/2010):\n\n• **Industrial Diesel Generators**: Heavy-duty Cummins / Perkins synchronized generators with acoustic canopies and automated transfer switches (ATS).\n• **Surge Protection & Earthing Grids**: Low-resistance copper grounding pits and transient voltage surge suppression (TVSS).\n• **Hybrid & Off-Grid Solar PV Microgrids**: Commercial rooftop photovoltaic arrays paired with high-cycle Lithium Iron Phosphate (LiFePO4) battery energy storage for off-grid enterprise resilience.',
        action: { text: 'Request Power & Solar Solution', href: '/contact?service=Electromechanical+%26+Solar' },
        options: ['View electromechanical license', 'Request power quote', 'Other services'],
      };
    }

    // -------------------------------------------------------------
    // 10. CONSULTANCY, AUDIT & SLA SPECIFIC
    // -------------------------------------------------------------
    if (
      q.includes('consult') || q.includes('consultancy') || q.includes('audit') || q.includes('sla') ||
      q.includes('maintenance') || q.includes('support') || q.includes('rfp') || q.includes('boq') ||
      q.includes('ማማከር') || q.includes('ኦዲት') || q.includes('ጥገና') || q.includes('ድጋፍ')
    ) {
      if (lang === 'am') {
        return {
          text: '🛠️ **የICT ማማከር፣ የኔትወርክ ኦዲት እና 24/7 SLA ድጋፍ**፦\n\n• **የኔትወርክ እና የደህንነት ኦዲት**፦ የመሰረተ-ልማት ክፍተቶችን መለየት እና የTIA-942/ISO ደረጃዎችን ማረጋገጥ።\n• **የጨረታ እና የBOQ ዝግጅት**፦ የፕሮጀክት ዝርዝር መመሪያዎችን (RFP) እና የቴክኒክ ሰነዶችን ማዘጋጀት።\n• **የ24/7 SLA የጥገና ስምምነት**፦ የ4 ሰዓት የመስክ ጥገና ፈጣን ምላሽ ዋስትና እና ቀጣይ የNOC ክትትል።',
          action: { text: 'የማማከር አገልግሎት ይጠይቁ', href: '/contact?service=ICT+Consultancy' },
          options: ['ያግኙን', 'የዋጋ መጠየቂያ', 'ሌሎች አገልግሎቶች'],
        };
      }
      return {
        text: '🛠️ **ICT Consultancy, Network Auditing & 24/7 SLA Support**:\n\n• **Network & Cybersecurity Auditing**: Vulnerability scans, Wireshark traffic analysis, and TIA-942 compliance reviews.\n• **Tender & BOQ Engineering**: Vendor-neutral RFP preparation, architectural reviews, and feasibility studies.\n• **24/7 SLA Preventative Maintenance**: Continuous NOC telemetry with guaranteed 4-hour on-site dispatch across Ethiopia for mission-critical operations.',
        action: { text: 'Request ICT Consultancy', href: '/contact?service=ICT+Consultancy' },
        options: ['Contact our consultants', 'Request SLA retainer quote', 'Other services'],
      };
    }

    // -------------------------------------------------------------
    // 11. GENERAL SERVICES LIST / WHAT DO YOU DO
    // -------------------------------------------------------------
    if (
      q.includes('service') || q.includes('solution') || q.includes('offer') ||
      q.includes('what do you do') || q.includes('what do you provide') || q.includes('what do you sell') ||
      q.includes('አገልግሎት') || q.includes('ስራ') || q.includes('ምን ትሰራላችሁ') || q.includes('ምን ትሰጣላችሁ')
    ) {
      if (lang === 'am') {
        return {
          text: 'ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.) በ6 ዋና ዋና ዘርፎች የተሟሉ አገልግሎቶችን ያቀርባል፦\n\n1. 📡 **የቴሌኮም መሰረተ-ልማት**፦ የማማ ተከላ (እስከ 60ሜ)፣ 4G/5G LTE፣ ማይክሮዌቭ እና የድራይቭ ቴስት ማረጋገጫ።\n2. 🏢 **ደረጃቸውን የጠበቁ ዳታ ሴንተሮች**፦ Tier II/III፣ ፕሪሲዥን ማቀዝቀዣ፣ ሞጁላር ዩፒኤስ እና የፋይበር ኔትወርክ።\n3. 🎓 **ዘመናዊ ትምህርት**፦ 4K ስማርት ቦርዶች፣ አውቶሜትድ ሌክቸር ቀረጻ እና OS-Easy VDI ላብራቶሪዎች።\n4. 🛡️ **የድርጅት ደህንነት እና AI ሲሲቲቪ**፦ የፊት ለይቶ የሚያውቁ ካሜራዎች፣ የዙሪያ ጥበቃ እና Next-Gen Firewalls።\n5. ⚡ **ኤሌክትሮሜካኒካል እና የፀሐይ ሃይል**፦ ከባድ ጀነሬተሮች፣ ATS ስዊቾች እና የፀሐይ ሃይል ማይክሮግሪዶች።\n6. 🛠️ **የICT ማማከር እና 24/7 SLA**፦ የኔትወርክ ኦዲት፣ RFP ዝግጅት እና ፈጣን የመስክ ድጋፍ።',
          action: { text: 'አገልግሎቶችን በዝርዝር ይመልከቱ', href: '/solutions' },
          options: ['የቴሌኮም ስራዎች', 'ዳታ ሴንተር ግንባታ', 'ዘመናዊ ትምህርት', 'የድርጅት ደህንነት', 'አገልግሎት እንዴት ማዘዝ እችላለሁ?'],
        };
      }
      return {
        text: 'LUCYCOM TECHNOLOGIES S.C. provides turnkey solutions across 6 specialized engineering domains:\n\n1. 📡 **Telecom Infrastructure**: Tower/mast erection (up to 60m), 4G/5G LTE, microwave backhaul & RF drive testing.\n2. 🏢 **Data Center & Datacom**: Tier II/III builds, precision in-row CRAC cooling, modular UPS & structured cabling.\n3. 🎓 **Smart Education**: 4K interactive touch panels, automated lecture capture & OS-Easy VDI labs.\n4. 🛡️ **Enterprise Security & CCTV**: AI face recognition, perimeter intrusion alerts & Next-Gen Firewalls (NGFW).\n5. ⚡ **Electromechanical & Solar**: Heavy diesel generators, ATS switches & lithium solar PV microgrids.\n6. 🛠️ **ICT Consultancy & 24/7 SLA**: Vulnerability audits, tender BOQ preparation & 4-hour dispatch SLA.',
        action: { text: 'Explore All Solutions', href: '/solutions' },
        options: ['Telecom infrastructure', 'Data center builds', 'Smart classrooms', 'Enterprise security', 'How do I request a quote?'],
      };
    }

    // -------------------------------------------------------------
    // 12. HOW TO REQUEST A SERVICE / ORDER / HIRE
    // -------------------------------------------------------------
    if (
      q.includes('request') || q.includes('how to request') || q.includes('how to order') ||
      q.includes('how to hire') || q.includes('order') || q.includes('book') ||
      q.includes('አገልግሎት መጠየቅ') || q.includes('ማዘዝ') || q.includes('እንዴት ማዘዝ') || q.includes('መጠየቅ')
    ) {
      if (lang === 'am') {
        return {
          text: '💼 **አገልግሎት እንዴት መጠየቅ ይቻላል? (How to Request a Service)**፦\n\nከሉሲኮም አገልግሎት ለማዘዝ ወይም የዋጋ መጠየቂያ ለማግኘት የሚከተሉትን ቀላል መንገዶች መጠቀም ይችላሉ፡\n\n1. **በላይኛው ማውጫ (Navbar) ላይ «አገልግሎት ይጠይቁ (Requests)» የሚለውን ይጫኑ**፦ ለቴሌኮም፣ ለዳታ ሴንተር፣ ለስማርት ትምህርት፣ ለደህንነት ወዘተ የተዘጋጁትን አማራጮች ያገኛሉ።\n2. **የኦንላይን የዋጋ መጠየቂያ ቅጽ**፦ የፕሮጀክትዎን ፍላጎት በኮንታክት ገጻችን ላይ በመሙላት ይላኩልን፤ የኢንጂነሪንግ ቡድናችን በ24 ሰዓት ውስጥ ይፋዊ ፕሮፖዛል ያዘጋጃል።\n3. **በቀጥታ በስልክ መደወል**፦ በ +251 939997612 ወይም +251 911510295 በመደወል የቴክኒክ ክፍላችንን ያነጋግሩ።\n4. **በኢሜይል መላክ**፦ የጨረታ ሰነድዎን ወይም BOQ ወደ info@lucycomtechnologies.com ይላኩልን።',
          action: { text: 'ወደ አገልግሎት መጠየቂያ ቅጽ ይሂዱ', href: '/contact' },
          options: ['የዋጋ መጠየቂያ ቅጽ', 'የስልክ ቁጥሮች', 'ህጋዊ ፈቃዶች'],
        };
      }
      return {
        text: '💼 **How to Request a Solution from Lucycom**:\n\nYou can request any of our services through several convenient channels:\n\n1. **Top Navbar "Requests" Dropdown**: Click on the new **Requests** dropdown in our navbar to select your exact solution (Telecom, Data Center, Smart Education, Security, Solar, or Consultancy) and jump directly into the pre-filled inquiry form.\n2. **Online Consultation Form**: Fill in your project specifications on our Contact page — our engineering desk responds within 24 hours.\n3. **Direct Telephone Call**: Call our technical desks at **+251 939997612** or **+251 911510295**.\n4. **Official Email**: Send your RFP, tender document, or BOQ directly to **info@lucycomtechnologies.com**.',
        action: { text: 'Open Service Request Form', href: '/contact' },
        options: ['Open quote form', 'Direct contact numbers', 'Our licenses'],
      };
    }

    // -------------------------------------------------------------
    // 13. LICENSES / ACCREDITATIONS / LEGAL COMPLIANCE
    // -------------------------------------------------------------
    if (
      q.includes('license') || q.includes('certif') || q.includes('legal') || q.includes('tin') ||
      q.includes('proclamation') || q.includes('eca') || q.includes('eea') || q.includes('accreditation') ||
      q.includes('ፈቃድ') || q.includes('ምስክር') || q.includes('ህጋዊ') || q.includes('ቲን') || q.includes('ብቃት')
    ) {
      if (lang === 'am') {
        return {
          text: '📜 **ህጋዊ ምዝገባዎች እና ይፋዊ ፈቃዶች (Official Licenses)**፦\n\nሉሲኮም ቴክኖሎጂስ አ.ማ ሙሉ በሙሉ በኢትዮጵያ ህግ መሰረት የተመዘገበና ፍቃድ ያለው ተቋም ነው፡\n\n1. **የኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA)**፦ የውጭ ቴሌኮሙኒኬሽን መገልገያዎች ተከላና ጥገና ስራ ፈቃድ (አዋጅ 1148/2011)።\n2. **የኢትዮጵያ ኤነርጂ ባለስልጣን (EEA)**፦ የኤሌክትሮሜካኒካል ስራ ተቋራጭ ደረጃ-5 የሙያ ብቃት ማረጋገጫ (አዋጅ 686/2002)።\n3. **የአዲስ አበባ ንግድ ቢሮ ፈቃዶች**፦ የኮምፒውተር ኔትወርክ ዲዛይን (ኮድ 85121)፣ የICT ማማከር (ኮድ 86521)፣ የሶፍትዌር ማበልጸግ (ኮድ 39141)።\n4. **የንግድና ቀጠናዊ ትስስር ሚኒስቴር**፦ የኮሙኒኬሽንና ኮምፒውተር እቃዎች አስመጪነት ፈቃድ (ኮድ 65721)።',
          action: { text: 'ህጋዊ ፈቃዶችን በሙሉ ይመልከቱ', href: '/licenses' },
          options: ['ስለ ሉሲኮም ንገሩኝ', 'የተጠናቀቁ ፕሮጀክቶች', 'የዋጋ መጠየቂያ'],
        };
      }
      return {
        text: '📜 **Statutory Accreditations & Official Licenses**:\n\nLUCYCOM TECHNOLOGIES S.C. operates with full statutory compliance under the commercial laws of Ethiopia:\n\n1. **Ethiopian Communications Authority (ECA)**: Outdoor Telecommunications Facilities Installation & Maintenance Works License (Proclamation No. 1148/2019).\n2. **Ethiopian Energy Authority (EEA)**: Electromechanical Contractor Grade-Five Competency Certificate (Proclamation No. 686/2010).\n3. **City Administration Trade Bureau**: Computer Network Design & Cable Installation (Code: 85121), ICT Consultancy (Code: 86521), Software Development (Code: 39141).\n4. **Ministry of Trade and Regional Integration**: Import Trade in Communication & Computer Equipment (Code: 65721).',
        action: { text: 'View Official Licenses', href: '/licenses' },
        options: ['Tell me about Lucycom', 'Completed projects', 'Request tender pack'],
      };
    }

    // -------------------------------------------------------------
    // 14. PROJECTS & TRACK RECORD
    // -------------------------------------------------------------
    if (
      q.includes('project') || q.includes('track') || q.includes('record') || q.includes('portfolio') ||
      q.includes('work') || q.includes('client') || q.includes('past work') ||
      q.includes('ፕሮጀክት') || q.includes('ስራዎች') || q.includes('ተሞክሮ') || q.includes('የተሰሩ ስራዎች')
    ) {
      if (lang === 'am') {
        return {
          text: '🏆 **በስኬት የተጠናቀቁ የሉሲኮም ቁልፍ ፕሮጀክቶች**፦\n\n• **ሀገር አቀፍ የቴሌኮም ጣቢያዎች (120+ ጣቢያዎች)**፦ የሬዲዮ ተከላ፣ የማይክሮዌቭ ዝርጋታ እና የድራይቭ ቴስት ሽፋን ማሻሻያ በ99.8% የጥራት ማለፊያ ምጣኔ ተጠናቋል።\n• **የዩኒቨርሲቲ ግቢ ዳታ ሴንተር እና LAN**፦ Tier-II/III ሰርቨር ራኮች፣ የፋይበር ጀርባ አጥንት፣ Precision Cooling እና ሞጁላር ዩፒኤስ ተከላ።\n• **ዘመናዊ የትምህርት ክፍሎች እና VDI**፦ ስማርት ቦርዶች፣ የትምህርት መቅረጫ ፖዶች እና ማዕከላዊ የVDI ኮምፒውተር ላብራቶሪዎች።\n• **ከፍተኛ ጥራት የAI ሲሲቲቪ (250+ ካሜራዎች)**፦ በAI የሚሰሩ ካሜራዎች ከማዕከላዊ የቁጥጥር ማዕከል እና ከNext-Gen Firewalls ጋር ተገናኝተው ተተክለዋል።',
          action: { text: 'ፕሮጀክቶችን ይመልከቱ', href: '/projects' },
          options: ['ስለ 120+ ጣቢያዎች ዜና ያንብቡ', 'ምን አይነት ፈቃዶች አሏችሁ?', 'የዋጋ መጠየቂያ'],
        };
      }
      return {
        text: '🏆 **Key Completed Projects by LUCYCOM**:\n\n• **National Telecom Rollout (120+ Sites)**: BTS radio commissioning, antenna rigging, and drive test optimization with a 99.8% quality pass rate for major operators.\n• **Campus-Wide Data Center & Fiber LAN**: Turnkey Tier-II/III server facility, precision CRAC cooling, modular UPS, and fiber backbone for leading higher education institutions.\n• **Smart Classrooms & VDI Modernization**: Interactive 4K touchscreens, automated lecture recording, and 60-seat OS-Easy VDI computer laboratories.\n• **High-Definition CCTV & Perimeter AI (250+ Cameras)**: Deep-learning IP cameras with automated intrusion tripwires and central command monitoring walls.',
        action: { text: 'View Project Portfolio', href: '/projects' },
        options: ['Read telecom news article', 'What licenses do you hold?', 'Request a quote'],
      };
    }

    // -------------------------------------------------------------
    // 15. PARTNERS & OEM ECOSYSTEM
    // -------------------------------------------------------------
    if (
      q.includes('partner') || q.includes('vendor') || q.includes('cisco') || q.includes('huawei') ||
      q.includes('nokia') || q.includes('ericsson') || q.includes('fortinet') || q.includes('dell') ||
      q.includes('hikvision') || q.includes('dahua') || q.includes('os-easy') ||
      q.includes('አጋር') || q.includes('ድርጅት') || q.includes('ኩባንያዎች')
    ) {
      if (lang === 'am') {
        return {
          text: '🤝 **የሉሲኮም አለም አቀፍ የቴክኖሎጂ አጋሮች (Global OEM Partners)**፦\n\n• 📡 **ቴሌኮም**፦ HUAWEI • NOKIA • ERICSSON\n• 🌐 **የድርጅት ኔትወርክ እና ደህንነት**፦ CISCO • FORTINET\n• 🖥️ **ሰርቨሮች እና ማከማቻ**፦ HPE • DELL Technologies\n• 📹 **AI ሲሲቲቪ እና ቅኝት**፦ HIKVISION • DAHUA\n• 🎓 **ዘመናዊ ትምህርት እና VDI**፦ OS-EASY • SEEYOO\n\nከእነዚህ ዓለም አቀፍ አምራቾች ጋር ቀጥተኛ ትስስር በማድረግ ኦሪጅናል እቃዎችን ከፋብሪካ ዋስትና ጋር እናቀርባለን።',
          action: { text: 'አጋሮችን ይመልከቱ', href: '/partners' },
          options: ['አገልግሎቶች', 'ህጋዊ ፈቃዶች', 'የዋጋ መጠየቂያ'],
        };
      }
      return {
        text: '🤝 **Our Global Technology Partner Ecosystem**:\n\n• 📡 **Telecom Equipment**: HUAWEI • NOKIA • ERICSSON\n• 🌐 **Enterprise Networking & Firewalls**: CISCO • FORTINET\n• 🖥️ **Enterprise Servers & Storage**: HPE • DELL Technologies\n• 📹 **AI Surveillance & CCTV**: HIKVISION • DAHUA\n• 🎓 **Smart Classrooms & VDI**: OS-EASY • SEEYOO\n\nWe maintain direct certified supplier channels with these industry leaders to guarantee genuine equipment and factory-backed SLA warranties.',
        action: { text: 'Explore Partner Ecosystem', href: '/partners' },
        options: ['Explore solutions', 'View licenses', 'Request equipment quote'],
      };
    }

    // -------------------------------------------------------------
    // 16. LOCATION / OFFICE / ADDRESS
    // -------------------------------------------------------------
    if (
      q.includes('where') || q.includes('location') || q.includes('address') || q.includes('office') ||
      q.includes('headquarters') || q.includes('map') || q.includes('building') ||
      q.includes('አድራሻ') || q.includes('የት') || q.includes('ቢሮ') || q.includes('ቦታ')
    ) {
      if (lang === 'am') {
        return {
          text: '📍 **የሉሲኮም ዋና መስሪያ ቤት አድራሻ**፦\n\n**ሉሲኮም ቴክኖሎጂስ አ.ማ**\nአዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406፣ ኢትዮጵያ።\n\n• **የስራ ሰዓት**፦ ሰኞ – ቅዳሜ፡ 2:30 – 11:30 (ቀን)\n• **የNOC ቁጥጥር**፦ 24/7 ያልተቋረጠ ድጋፍ ለውል ደንበኞች\n• ለይፋዊ የፕሮጀክት ውይይቶች ቢሮአችንን መጎብኘት ይችላሉ።',
          action: { text: 'ወደ አድራሻ ክፍል ይሂዱ', href: '/contact' },
          options: ['የስልክ ቁጥሮች', 'የዋጋ መጠየቂያ', 'ስለ ሉሲኮም'],
        };
      }
      return {
        text: '📍 **Corporate Headquarters Address**:\n\n**LUCYCOM TECHNOLOGIES S.C.**\nYeka Sub-City, Woreda 08, House No. 158/406\nAddis Ababa, Ethiopia\n\n• **Business Hours**: Monday – Saturday: 8:30 AM – 5:30 PM (EAT)\n• **NOC Support**: 24/7 continuous telemetry for contracted SLA clients\n• You are welcome to schedule a visit to our corporate office for consultations.',
        action: { text: 'View Location & Map', href: '/contact' },
        options: ['Phone & direct lines', 'Request a quote', 'About Lucycom'],
      };
    }

    // -------------------------------------------------------------
    // 17. CONTACT / PHONE / EMAIL
    // -------------------------------------------------------------
    if (
      q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('email') ||
      q.includes('reach') || q.includes('website') || q.includes('mobile') ||
      q.includes('ስልክ') || q.includes('ኢሜይል') || q.includes('መደወል') || q.includes('ያግኙን')
    ) {
      if (lang === 'am') {
        return {
          text: '📞 **የሉሲኮም ይፋዊ አድራሻዎች**፦\n\n• **የቀጥታ ስልክ መስመሮች**፦\n  +251 939 997 612\n  +251 911 510 295\n  +251 911 828 830\n• **ይፋዊ ኢሜይል**፦ info@lucycomtechnologies.com\n• **ድረ-ገጽ**፦ www.lucycomtechnologies.com\n• **ዋና መስሪያ ቤት**፦ አዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406',
          action: { text: 'ያግኙን', href: '/contact' },
          options: ['የዋጋ መጠየቂያ ቅጽ', 'አገልግሎቶች', 'ህጋዊ ፈቃዶች'],
        };
      }
      return {
        text: '📞 **Contact Lucycom Technologies S.C.**:\n\n• **Direct Telephone Lines**:\n  +251 939 997 612\n  +251 911 510 295\n  +251 911 828 830\n• **Corporate Email**: info@lucycomtechnologies.com\n• **Official Website**: www.lucycomtechnologies.com\n• **Headquarters**: Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia.',
        action: { text: 'Get in Touch', href: '/contact' },
        options: ['Open quote form', 'Our services', 'Official licenses'],
      };
    }

    // -------------------------------------------------------------
    // 18. QUOTE / PRICING / ESTIMATE / TENDER
    // -------------------------------------------------------------
    if (
      q.includes('quote') || q.includes('price') || q.includes('cost') || q.includes('estimate') ||
      q.includes('tender') || q.includes('how much') ||
      q.includes('ዋጋ') || q.includes('መጠየቅ') || q.includes('ክፍያ') || q.includes('ጨረታ')
    ) {
      if (lang === 'am') {
        return {
          text: '💼 **የኮርፖሬት ዋጋ መጠየቂያ (Request a Quote)**፦\n\nሉሲኮም የቴሌኮም ማማ ተከላ፣ የዳታ ሴንተር ግንባታ፣ የVDI ላብራቶሪዎች እና የAI ሲሲቲቪ ስራዎችን የሚያከናውን በመሆኑ የፕሮጀክት ዋጋ የሚወሰነው በቦታው ሁኔታ፣ በBOQ ዝርዝር እና በሚፈለገው የሃርድዌር አይነት ነው።\n\n• **የዋጋ ፕሮፖዛል ለማግኘት**፦ የፍላጎትዎን ዝርዝር በኦንላይን ቅጻችን ይላኩልን፤ የኢንጂነሪንግ ክፍላችን በ24 ሰዓት ውስጥ ይፋዊ ፕሮፖዛል ያዘጋጅልዎታል።',
          action: { text: 'ወደ ዋጋ መጠየቂያ ቅጽ ይሂዱ', href: '/contact' },
          options: ['አገልግሎት እንዴት ማዘዝ ይቻላል?', 'የስልክ ቁጥሮች', 'ህጋዊ ፈቃዶች'],
        };
      }
      return {
        text: '💼 **Request a Corporate Quotation / RFP**:\n\nBecause Lucycom handles commercial-scale turn-key engineering projects (Telecom towers, Data Centers, VDI computer labs, and Enterprise CCTV), pricing is tailored to your site Bill of Quantities (BOQ), hardware specifications, and SLA coverage.\n\n• **How to get an official estimate**: Submit your project requirements via our Contact form or email info@lucycomtechnologies.com. Our engineering desk prepares a formal technical proposal and quotation within 24 hours.',
        action: { text: 'Go to Quote Request Form', href: '/contact' },
        options: ['How to request a service', 'Call our sales desk', 'View licenses'],
      };
    }

    // -------------------------------------------------------------
    // 19. NEWS & ANNOUNCEMENTS
    // -------------------------------------------------------------
    if (
      q.includes('news') || q.includes('announcement') || q.includes('press') || q.includes('update') ||
      q.includes('latest') || q.includes('ዜና') || q.includes('ዜናዎች') || q.includes('መግለጫ') || q.includes('አዲስ')
    ) {
      if (lang === 'am') {
        return {
          text: '📰 **የቅርብ ጊዜ የሉሲኮም ዜናዎች እና መግለጫዎች**፦\n\n• **የቴሌኮም ስኬት**፦ በ120+ ጣቢያዎች ላይ የ4G/5G LTE ማማና የኔትወርክ ተከላ በ99.8% የጥራት ማለፊያ ምጣኔ ተጠናቀቀ።\n• **የዳታ ሴንተር ግንባታ**፦ ለዩኒቨርሲቲ ካምፓስ ደረጃውን የጠበቀ Tier-III ሞጁላር ዳታ ሴንተር ተገንብቶ ተረከበ።\n• **ስማርት ትምህርት**፦ የዩኒቨርሲቲ ላብራቶሪዎች በVDI እና በ4K ስማርት ቦርዶች ዘመኑ።\n• **ይፋዊ ፈቃዶች**፦ ከECA እና ከኢነርጂ ባለስልጣን ጋር አመታዊ የብቃት ፈቃድ ታደሰ።',
          action: { text: 'ወደ ዜናዎች ገጽ ይሂዱ', href: '/news' },
          options: ['ሙሉውን ዜና ያንብቡ', 'ስለ ሉሲኮም', 'የዋጋ መጠየቂያ'],
        };
      }
      return {
        text: '📰 **Latest Lucycom News & Announcements**:\n\n• **Telecom Rollout Milestone**: Completed 4G/5G LTE infrastructure across 120+ sites nationwide with 99.8% quality pass rate.\n• **Tier-III Data Center Delivery**: Commissioned high-availability modular data center for an Ethiopian academic campus.\n• **Smart Campus VDI Modernization**: Digitalized vocational and university computer labs cutting maintenance overheads by 70%.\n• **Regulatory License Renewal**: Re-affirmed full accreditation with Ethiopian Communications Authority (ECA) and Energy Authority.\n\nVisit our newly added News page for full articles and press statements.',
        action: { text: 'Visit News Page', href: '/news' },
        options: ['Read full news articles', 'About Lucycom', 'Request a quote'],
      };
    }

    // -------------------------------------------------------------
    // 20. LEADERSHIP / CEO / FOUNDER
    // -------------------------------------------------------------
    if (
      q.includes('ceo') || q.includes('leader') || q.includes('founder') || q.includes('management') ||
      q.includes('solomon') || q.includes('አመራር') || q.includes('ዋና ስራ አስፈፃሚ') || q.includes('መስራች')
    ) {
      if (lang === 'am') {
        return {
          text: '👥 **የሉሲኮም አመራር እና የኢንጂነሪንግ ቡድን**፦\n\nሉሲኮም ቴክኖሎጂስ አ.ማ በኢትዮጵያ የቴሌኮም እና የICT ኢንጂነሪንግ ዘርፍ ከ18 ዓመታት በላይ የስራ ልምድ ባላቸው በኢንጂነር ሰሎሞን ታደሰ (ዋና ስራ አስፈፃሚ) እና በተመሰከረላቸው ከፍተኛ የኢንጂነሪንግ ዳይሬክተሮች ይመራል።',
          action: { text: 'የአመራር ቡድኑን ይመልከቱ', href: '/about' },
          options: ['ስለ ሉሲኮም', 'አገልግሎቶች', 'ያግኙን'],
        };
      }
      return {
        text: '👥 **Leadership & Engineering Management**:\n\nLUCYCOM TECHNOLOGIES S.C. is led by veteran executive engineering professionals:\n• **Chief Executive Officer (CEO)**: Eng. Solomon Tadesse — bringing over 18 years of turnkey telecommunications, microwave, and enterprise network leadership across Ethiopia.\n• Backed by licensed electro-mechanical engineers, certified rigging managers, and Cisco/Fortinet network security architects.',
        action: { text: 'View Executive Team', href: '/about' },
        options: ['About Lucycom', 'Our services', 'Contact us'],
      };
    }

    // -------------------------------------------------------------
    // 21. FALLBACK (Contextual Clarification)
    // -------------------------------------------------------------
    if (lang === 'am') {
      return {
        text: 'ስለ **ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.)** ትክክለኛውን መረጃ መስጠት እፈልጋለሁ።\n\nእባክዎ ማወቅ የሚፈልጉትን ርዕስ ይጥቀሱልኝ ወይም ከታች ካሉት አማራጮች አንዱን ይጫኑ፦',
        action: { text: 'የዋጋ መጠየቂያ ይላኩ', href: '/contact' },
        options: [
          'ምን አይነት አገልግሎት ትሰጣላችሁ?',
          'የቴሌኮም ስራዎች',
          'ዳታ ሴንተር ግንባታ',
          'ዘመናዊ ትምህርት እና VDI',
          'የድርጅት ደህንነት እና AI ሲሲቲቪ',
          'ህጋዊ ፈቃዶች',
          'ቢሮአችሁ የት ነው?',
          'አገልግሎት እንዴት ማዘዝ እችላለሁ?'
        ],
      };
    }
    return {
      text: "I want to make sure I give you the exact details you need about **LUCYCOM TECHNOLOGIES S.C.**\n\nCould you please specify which area you'd like to explore, or select one of the quick topics below?",
      action: { text: 'Request a Quote Now', href: '/contact' },
      options: [
        'What services do you provide?',
        'Telecom infrastructure',
        'Data Center builds',
        'Smart Classrooms & VDI',
        'Enterprise Security & CCTV',
        'What licenses do you hold?',
        'Where is your office located?',
        'How do I request a quote?'
      ],
    };
  };

  const handleSend = (userText?: string) => {
    const textToSend = userText || inputMessage;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!userText) setInputMessage('');
    setIsTyping(true);

    // Natural assistant response delay
    setTimeout(() => {
      const response = generateResponse(textToSend, language);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink: response.action,
        options: response.options,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleActionClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const id = href.substring(1);
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.location.href = href;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          aria-label="Open LucyBot AI Assistant"
          className="relative group p-3.5 sm:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-xl hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center border-2 border-white/30 cursor-pointer"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8">
            <Image
              src="/logo.png"
              alt="LucyBot"
              fill
              sizes="32px"
              className="object-contain"
            />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-400 border-2 border-white"></span>
          </span>
          <span className="hidden md:inline-block ml-3 pr-1 text-sm font-bold tracking-wide">
            LucyBot
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[430px] h-[600px] max-h-[85vh] rounded-2xl bg-white dark:bg-[#112240] shadow-2xl border border-gray-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-blue-600 text-white flex items-center justify-between border-b border-blue-700">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-white/20 p-1 flex items-center justify-center border border-white/30">
                <Image
                  src="/logo.png"
                  alt="LucyBot"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                    {t('chatbot.title')}
                  </h3>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 animate-pulse" />
                    {t('chatbot.online')}
                  </span>
                </div>
                <p className="text-[11px] text-blue-100">
                  {t('chatbot.subtitle')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-blue-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50 dark:bg-[#0a192f]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                      : 'bg-white dark:bg-[#112240] text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-slate-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Action Link button */}
                  {msg.actionLink && (
                    <button
                      onClick={() => handleActionClick(msg.actionLink!.href)}
                      className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold text-xs hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-200 cursor-pointer"
                    >
                      <span>{msg.actionLink.text}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1">
                  {msg.timestamp}
                </span>

                {/* Suggested prompt chips */}
                {msg.options && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                    {msg.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(option)}
                        className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-[#112240] border border-gray-300 dark:border-slate-700 text-blue-600 dark:text-blue-400 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left shadow-xs font-medium cursor-pointer"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs italic p-2">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]"></span>
                </div>
                <span>LucyBot is answering...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white dark:bg-[#112240] border-t border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t('chatbot.ask_placeholder')}
                className="flex-1 px-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-[#0a192f] text-gray-800 dark:text-white border border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:outline-none transition-colors"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputMessage.trim()}
                type="button"
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white shadow-md transition-all active:scale-95 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};