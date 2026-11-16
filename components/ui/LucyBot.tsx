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

export const LucyBot: React.FC = () => {
  const { language, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize initial message on mount or language switch
  useEffect(() => {
    const welcomeText = language === 'am'
      ? 'ሰላም! እንኳን ወደ ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.) በደህና መጡ። በቴሌኮም መሰረተ-ልማት፣ ዳታ ሴንተር ግንባታ፣ ዘመናዊ ትምህርት እና የድርጅት ደህንነት ዙሪያ ማንኛውንም ጥያቄ መጠየቅ ይችላሉ። ዛሬ በምን ልርዳዎት?'
      : 'Hello and welcome to LUCYCOM TECHNOLOGIES S.C.! I am LucyBot, your corporate assistant. Ask me anything about our ICT, Telecom, Data Center, Smart Classrooms, or Enterprise Security solutions.';

    setMessages([
      {
        id: 'welcome-1',
        sender: 'bot',
        text: welcomeText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: language === 'am' ? [
          'ምን አይነት አገልግሎት ትሰጣላችሁ?',
          'ቢሮአችሁ የት ነው የሚገኘው?',
          'ስለ ቴሌኮም ፕሮጀክቶች ንገሩኝ',
          'ምን አይነት ፈቃዶች አሏችሁ?',
          'የዋጋ መጠየቂያ እንዴት ማግኘት እችላለሁ?'
        ] : [
          'What services do you provide?',
          'Where is your office located?',
          'Tell me about telecom projects',
          'What licenses do you hold?',
          'How do I get a quote?'
        ],
      },
    ]);
  }, [language]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Knowledge base matcher
  const generateResponse = (query: string, lang: 'en' | 'am'): { text: string; action?: { text: string; href: string } } => {
    const q = query.toLowerCase();

    // 1. Services & Solutions
    if (
      q.includes('service') || q.includes('solution') || q.includes('offer') ||
      q.includes('አገልግሎት') || q.includes('መስራት') || q.includes('ስራ') || q.includes('ምን')
    ) {
      if (lang === 'am') {
        return {
          text: 'ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.) በ4 ዋና ዋና የቴክኖሎጂ ዘርፎች የተሟላ መፍትሄዎችን ያቀርባል፡\n\n1. 📡 **የቴሌኮም መሰረተ-ልማት**፡ የማማ ተከላ (እስከ 60 ሜትር)፣ 4G/5G LTE፣ የሬዲዮና ማይክሮዌቭ ኮሚሽኒንግ እና የድራይቭ ቴስት ጥራት ማረጋገጫ።\n2. 🏢 **ዳታ ሴንተር እና ዳታኮም**፡ ደረጃቸውን የጠበቁ Tier II/III ዳታ ሴንተሮች፣ Precision Cooling፣ ሞጁላር ዩፒኤስ፣ እና የፋይበር ኔትወርክ።\n3. 🎓 **ዘመናዊ ትምህርት**፡ ስማርት ቦርዶች፣ የትምህርት ቀረጻ፣ ቨርቹዋል ላብራቶሪ እና ዴስክቶፕ ቨርቹዋላይዜሽን (VDI)።\n4. 🛡️ **የድርጅት ደህንነት እና ሲሲቲቪ**፡ AI ካሜራዎች፣ የዙሪያ ጥበቃ እና Next-Gen Firewalls (NGFW)።',
          action: { text: 'አገልግሎቶችን በዝርዝር ይመልከቱ', href: '#solutions' },
        };
      }
      return {
        text: 'LUCYCOM TECHNOLOGIES S.C. provides end-to-end ICT infrastructure across 4 core solution domains:\n\n1. 📡 **Telecom Infrastructure**: Tower mast erection (up to 60m), 4G/5G LTE installation, microwave commissioning, and RF drive test optimization.\n2. 🏢 **Data Center & Datacom**: Tier II/III compliant facilities, precision cooling (CRAC), modular UPS power, and fiber optic backbones.\n3. 🎓 **Smart Education**: Interactive flat panels, automated lecture capture, virtual labs, and cloud-ready VDI.\n4. 🛡️ **Enterprise Security & CCTV**: AI face-recognition cameras, central VMS command centers, and Next-Gen Firewalls (NGFW).',
        action: { text: 'Explore All Solutions', href: '#solutions' },
      };
    }

    // 2. Location / Office / Address
    if (
      q.includes('where') || q.includes('location') || q.includes('address') || q.includes('office') ||
      q.includes('አድራሻ') || q.includes('የት') || q.includes('ቢሮ') || q.includes('ቦታ')
    ) {
      if (lang === 'am') {
        return {
          text: '📍 **የዋና መስሪያ ቤት አድራሻ**፡\nአዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406፣ ኢትዮጵያ።\n\n📞 **ስልክ ቁጥሮች**፡\n• +251 939997612\n• +251 911510295\n• +251 911828830\n\n✉️ **ኢሜይል**፡ info@lucycomtechnologies.com\n🌐 **ድረ-ገጽ**፡ www.lucycomtechnologies.com',
          action: { text: 'ወደ አድራሻ ክፍል ይሂዱ', href: '#contact' },
        };
      }
      return {
        text: '📍 **Headquarters Address**:\nYeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia.\n\n📞 **Direct Contact Lines**:\n• +251 939997612\n• +251 911510295\n• +251 911828830\n\n✉️ **Official Email**: info@lucycomtechnologies.com\n🌐 **Website**: www.lucycomtechnologies.com',
        action: { text: 'View Contact Details', href: '#contact' },
      };
    }

    // 3. Projects & Track Record
    if (
      q.includes('project') || q.includes('track') || q.includes('record') || q.includes('telecom') ||
      q.includes('ፕሮጀክት') || q.includes('ቴሌኮም') || q.includes('ስራዎች')
    ) {
      if (lang === 'am') {
        return {
          text: '🏆 **በስኬት የተጠናቀቁ የሉሲኮም ቁልፍ ፕሮጀክቶች**፡\n\n• **ሀገር አቀፍ የቴሌኮም ጣቢያዎች**፡ በ120+ ጣቢያዎች ላይ የሬዲዮ ተከላ፣ የድራይቭ ቴስት እና ሽፋን ማሻሻያ በ99.8% የጥራት ማለፊያ ምጣኔ ተጠናቋል።\n• **የዩኒቨርሲቲ ዳታ ሴንተር**፡ የከፍተኛ አቅም ሰርቨር ራኮች፣ የፋይበር ጀርባ አጥንት፣ Precision Cooling እና ሞጁላር ዩፒኤስ ተከላ።\n• **ዘመናዊ የመማሪያ ክፍሎች**፡ ስማርት ቦርዶች፣ የትምህርት መቅረጫ ፖዶች እና ማዕከላዊ VDI ሰርቨሮች።\n• **ከፍተኛ ጥራት የAI ሲሲቲቪ**፡ 250+ የAI ካሜራዎች ከማዕከላዊ የቁጥጥር ማዕከል ጋር ተገናኝተው ተተክለዋል።',
          action: { text: 'ፕሮጀክቶችን ይመልከቱ', href: '#projects' },
        };
      }
      return {
        text: '🏆 **Key Completed Projects by LUCYCOM**:\n\n• **National Telecom Rollout**: Radio installation, drive testing, and coverage optimization across 120+ sites with 99.8% quality pass rate for major operators.\n• **Campus-Wide Data Center & LAN**: High-density server racks, fiber backbone, precision cooling, and modular UPS for Universities.\n• **Smart Classroom Modernization**: Interactive smart boards, lecture recording pods, and central VDI server environments.\n• **High-Definition CCTV & Perimeter AI**: 250+ AI-enabled IP cameras integrated with central command monitoring.',
        action: { text: 'View Project Portfolio', href: '#projects' },
      };
    }

    // 4. Licenses & Accreditations
    if (
      q.includes('license') || q.includes('certif') || q.includes('legal') || q.includes('tin') ||
      q.includes('ፈቃድ') || q.includes('ምስክር') || q.includes('ህጋዊ') || q.includes('ቲን')
    ) {
      if (lang === 'am') {
        return {
          text: '📜 **ህጋዊ ምዝገባዎች እና ይፋዊ ፈቃዶች**፡\n\n• **የኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA)**፡ የውጭ ቴሌኮሙኒኬሽን መገልገያዎች ተከላና ጥገና ስራዎች ፈቃድ (አዋጅ 1148/2011)።\n• **የኢትዮጵያ ኤነርጂ ባለስልጣን (EEA)**፡ የኤሌክትሮ ሜካኒካል ስራ ተቋራጭ ደረጃ-5 የሙያ ብቃት ማረጋገጫ (አዋጅ 686/2002)።\n• **የንግድ ምዝገባ (TIN)**፡ 0072480301\n• **ካፒታል**፡ 2,360,000.00 የኢትዮጵያ ብር\n• **የንግድ ፈቃዶች**፡ የኮምፒውተር ኔትወርክ ዲዛይን፣ የICT ማማከር፣ የሶፍትዌር ማበልጸግ እና የኮሙኒኬሽን እቃዎች ማስመጣት።',
          action: { text: 'ህጋዊ ሰነዶችን ይመልከቱ', href: '#licenses' },
        };
      }
      return {
        text: '📜 **Accreditations & Legal Compliance**:\n\n• **Ethiopian Communications Authority (ECA)**: Outdoor Telecommunications Facilities Installation & Maintenance Works License (Proclamation 1148/2019).\n• **Ethiopian Energy Authority (EEA)**: Electromechanical Contractor Grade-Five Competency Certificate (Proclamation 686/2010).\n• **TIN Number**: 0072480301\n• **Share Capital**: 2,360,000.00 ETB\n• **Trade Licenses**: Computer Network Design, ICT Consultancy, Software Development, and Telecom/Computer Hardware Importation.',
        action: { text: 'View Certifications', href: '#licenses' },
      };
    }

    // 5. Partners
    if (
      q.includes('partner') || q.includes('vendor') || q.includes('cisco') || q.includes('huawei') ||
      q.includes('አጋር') || q.includes('ድርጅት')
    ) {
      if (lang === 'am') {
        return {
          text: '🤝 **የሉሲኮም አለም አቀፍ የቴክኖሎጂ አጋሮች**፡\n\n• HUAWEI\n• NOKIA\n• ERICSSON\n• CISCO\n• FORTINET\n• HPE / DELL\n• HIKVISION\n• DAHUA\n• OS-EASY\n\nከእነዚህ ዓለም አቀፍ አምራቾች ጋር ቀጥተኛ ትስስር በማድረግ ጥራት ያላቸውን መሳሪያዎችና መፍትሄዎች እናቀርባለን።',
          action: { text: 'አጋሮችን ይመልከቱ', href: '#partners' },
        };
      }
      return {
        text: '🤝 **Our Global Technology Partner Ecosystem**:\n\n• HUAWEI\n• NOKIA\n• ERICSSON\n• CISCO\n• FORTINET\n• HPE / DELL\n• HIKVISION\n• DAHUA\n• OS-EASY\n\nWe maintain certified supplier channels with these industry leaders to guarantee genuine equipment and enterprise-grade SLA warranties.',
        action: { text: 'Explore Partner Ecosystem', href: '#partners' },
      };
    }

    // 6. Quote / Pricing / Estimate
    if (
      q.includes('quote') || q.includes('price') || q.includes('cost') || q.includes('estimate') ||
      q.includes('ዋጋ') || q.includes('መጠየቅ') || q.includes('ክፍያ')
    ) {
      if (lang === 'am') {
        return {
          text: '💼 **የዋጋ መጠየቂያ (Get a Quote)**፡\nየፕሮጀክትዎን ፍላጎት (የቴሌኮም፣ ዳታ ሴንተር፣ ስማርት ትምህርት ወይም የደህንነት ሲሲቲቪ) ከታች ባለው ቅጽ ላይ በመሙላት ጥያቄዎን መላክ ይችላሉ። የኢንጂነሪንግ ቡድናችን በ24 ሰዓት ውስጥ ይፋዊ ፕሮፖዛል ያዘጋጅልዎታል።',
          action: { text: 'ወደ ዋጋ መጠየቂያ ቅጽ ይሂዱ', href: '#contact' },
        };
      }
      return {
        text: '💼 **Request a Corporate Quotation**:\nYou can request an engineering estimation for your Telecom, Data Center, Smart Classroom, or Enterprise Security project. Our certified engineers will review your requirements and provide a formal proposal within 24 hours.',
        action: { text: 'Go to Quote Request Form', href: '#contact' },
      };
    }

    // Fallback general response
    if (lang === 'am') {
      return {
        text: 'ስለ ሉሲኮም ቴክኖሎጂስ አ.ማ (LUCYCOM TECHNOLOGIES S.C.) ለጠየቁት ጥያቄ አመሰግናለሁ! እኛ በኢትዮጵያ የቴሌኮም መሰረተ-ልማት፣ የዳታ ሴንተር ግንባታ፣ ዘመናዊ የመማሪያ ክፍሎች እና የደህንነት ቴክኖሎጂ መፍትሄዎችን እናቀርባለን።\n\nተጨማሪ መረጃ ከፈለጉ በስልክ ቁጥር +251 939997612 ወይም በኢሜይል info@lucycomtechnologies.com በቀጥታ ሊያገኙን ይችላሉ።',
        action: { text: 'የዋጋ መጠየቂያ ይላኩ', href: '#contact' },
      };
    }
    return {
      text: "Thank you for asking about LUCYCOM TECHNOLOGIES S.C.! As Ethiopia's premier ICT and telecom engineering share company, we deliver high-reliability turn-key solutions across Telecom Infrastructure, Tier-Standard Data Centers, Smart Classrooms, and Enterprise Security.\n\nFor custom inquiries, you can also reach our engineering desk directly at +251 939997612 or info@lucycomtechnologies.com.",
      action: { text: 'Request a Quote Now', href: '#contact' },
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

    setMessages(prev => [...prev, userMsg]);
    if (!userText) setInputMessage('');
    setIsTyping(true);

    // Simulate natural AI thinking delay
    setTimeout(() => {
      const response = generateResponse(textToSend, language);
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionLink: response.action,
      };

      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
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
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl bg-white dark:bg-[#112240] shadow-2xl border border-gray-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          
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
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
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
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
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
