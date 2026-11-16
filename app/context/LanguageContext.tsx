'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'am';

export interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  isAmharic: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.solutions': 'Solutions',
    'nav.sol_telecom': 'Telecom Infrastructure',
    'nav.sol_datacenter': 'Data Center & Datacom',
    'nav.sol_education': 'Smart Education',
    'nav.sol_security': 'Enterprise Security',
    'nav.sol_cctv': 'AI CCTV & Surveillance',
    'nav.sol_vdi': 'VDI & Next-Gen Firewall',
    'nav.projects': 'Projects',
    'nav.partners': 'Partners',
    'nav.licenses': 'Licenses',
    'nav.products': 'Products',
    'nav.news': 'News',
    'nav.requests': 'Requests',
    'nav.contact': 'Contact',
    'nav.get_quote': 'Get a Quote',
    'nav.quote_sub': 'Fast B2B Estimation',

    // Requests
    'requests.title': 'Request a Solution',
    'requests.subtitle': 'Select a specialized engineering solution to submit your inquiry or RFP',
    'requests.telecom': 'Request for Telecom Infrastructure',
    'requests.telecom_sub': 'Towers, BTS, 4G/5G LTE & Microwave',
    'requests.datacenter': 'Request for Data Center & Datacom',
    'requests.datacenter_sub': 'Tier II/III Builds, Cooling & Power',
    'requests.education': 'Request for Smart Education',
    'requests.education_sub': 'Smart Boards, Lecture Capture & VDI',
    'requests.security': 'Request for Enterprise Security & CCTV',
    'requests.security_sub': 'AI Surveillance, Perimeter & Firewalls',
    'requests.solar': 'Request for Electromechanical & Solar',
    'requests.solar_sub': 'Generators, ATS & Solar Microgrids',
    'requests.consultancy': 'Request for ICT Consultancy & Audit',
    'requests.consultancy_sub': 'Network Audits, RFP & 24/7 SLA',
    'requests.custom': 'Custom RFP / General Inquiry',

    // News
    'news.badge': 'Corporate News & Announcements',
    'news.title': 'Latest Updates & Industry Milestones',
    'news.subtitle': 'Follow the latest engineering achievements, project deployments, and corporate news from Lucycom Technologies S.C.',
    'news.search_placeholder': 'Search news, press releases, keywords...',
    'news.read_more': 'Read Full Story',
    'news.all_categories': 'All News',

    // Hero
    'hero.badge': 'Lucy the origin, LucyCom the destination',
    'hero.title_start': "Empowering Ethiopia's ",
    'hero.title_highlight': 'Digital Future.',
    'hero.subtitle': 'End-to-End ICT, Telecom & Data Center Solutions.',
    'hero.description': 'LUCYCOM TECHNOLOGIES S.C. is a leading Ethiopian share company dedicated to designing, supplying, and supporting resilient, scalable, and international standards-compliant ICT infrastructure.',
    'hero.explore_solutions': 'Explore Solutions',
    'hero.contact_us': 'Contact Us',
    'hero.get_quote': 'Request a Quote',
    'hero.share_capital': 'Carrier-Grade Infrastructure Partner',
    'hero.registered_in': 'Registered in Addis Ababa, Ethiopia',

    // Stats
    'stats.sites': '120+ Telecom Sites',
    'stats.sites_sub': 'Turnkey Rollout & Acceptance',
    'stats.pass_rate': '99.8%',
    'stats.pass_rate_sub': 'Quality Drive Test Pass Rate',
    'stats.cameras': '250+ AI Cameras',
    'stats.cameras_sub': 'Integrated Perimeter Protection',
    'stats.standards': 'Tier II / III',
    'stats.standards_sub': 'Data Center Construction Standards',

    // About
    'about.badge': 'About LucyCom Technologies',
    'about.title': "Pioneering Ethiopia's Critical ICT & Telecom Infrastructure",
    'about.desc1': 'LUCYCOM TECHNOLOGIES S.C. is a premier Ethiopian information and communication technology share company dedicated to designing, supplying, installing, and supporting end-to-end ICT infrastructure solutions.',
    'about.desc2': 'Our experience spans the complete technology spectrum: from civil infrastructure, telecom tower erection, and data center build-outs, to advanced network security, smart classrooms, and cloud-ready Virtual Desktop Infrastructure (VDI).',
    'about.desc3': 'We pair certified engineering capabilities with strategic partnerships among world-class global technology manufacturers to deliver resilient, scalable, and international standards-compliant solutions tailored to Ethiopia’s rapid digital transformation.',
    'about.vision_title': 'Vision Statement',
    'about.vision_desc': "To be Ethiopia's most trusted and innovative ICT and telecom infrastructure partner, recognized for engineering excellence and for empowering institutions to thrive in the modern digital age.",
    'about.mission_title': 'Mission Statement',
    'about.mission_desc': 'To deliver secure, reliable, and cost-effective technology solutions through skilled professionals, proven methodologies, and global partnerships, supporting digital modernization across all sectors.',
    
    // Values
    'values.title': 'Core Values & Operational Standards',
    'values.subtitle': 'Our operation is anchored in strict quality assurance and field safety protocols to ensure maximum availability and longevity.',
    'values.integrity': 'Integrity',
    'values.integrity_desc': 'Transparent contracting and honest technical advice.',
    'values.excellence': 'Excellence',
    'values.excellence_desc': 'Adherence to IEEE, TIA/EIA, and ISO standards.',
    'values.safety': 'Safety First',
    'values.safety_desc': 'Certified safety procedures for high-altitude mast work.',
    'values.customer': 'Customer Centricity',
    'values.customer_desc': 'Solutions custom-built around real operational needs.',

    // Solutions
    'solutions.badge': 'Integrated Solution Portfolio',
    'solutions.title': 'High-Impact Engineering for Enterprise & Government',
    'solutions.subtitle': 'Turn-key execution across civil, optical, electrical, and cybersecurity domains.',
    'solutions.telecom_title': 'Telecom Infrastructure',
    'solutions.telecom_desc': 'Civil works, mast erection, feeder alignment, radio/microwave commissioning, and drive test quality verification.',
    'solutions.telecom_tags': '4G/5G LTE • RF Optimization • Microwave • Mast Erection',
    'solutions.datacenter_title': 'Data Center & Datacom',
    'solutions.datacenter_desc': 'Tier-standard physical facility construction, precision cooling, cold/hot aisle containment, modular UPS, fire suppression, and fiber backbones.',
    'solutions.datacenter_tags': 'Tier II/III • Precision Cooling • UPS • Structured Cabling',
    'solutions.education_title': 'Smart Education & Classrooms',
    'solutions.education_desc': 'Interactive flat panels, podium integration, lecture recording, virtual lab platforms, and centralized desktop virtualization.',
    'solutions.education_tags': 'Smart Boards • Lecture Capture • VDI • Virtual Labs',
    'solutions.security_title': 'Enterprise Security & CCTV',
    'solutions.security_desc': 'AI face recognition cameras, perimeter intrusion alerts, central VMS control centers, Next-Gen firewalls, and zero-trust security.',
    'solutions.security_tags': 'AI CCTV • NGFW • Perimeter AI • Access Control',

    // Lifecycle
    'lifecycle.title': 'Standardized Project Delivery Lifecycle',
    'lifecycle.s1_title': 'Survey & Design',
    'lifecycle.s1_desc': 'In-depth site survey, CAD designs, RF heat mapping, and structural engineering.',
    'lifecycle.s2_title': 'Supply & Build',
    'lifecycle.s2_desc': 'Procurement of genuine hardware from global OEM partners and certified site construction.',
    'lifecycle.s3_title': 'Testing & Drive',
    'lifecycle.s3_desc': 'Comprehensive field validation, RF drive testing, load testing, and security scans.',
    'lifecycle.s4_title': 'Commissioning',
    'lifecycle.s4_desc': 'Rigorous handover, acceptance documentation, and operational integration.',
    'lifecycle.s5_title': 'SLA & Support',
    'lifecycle.s5_desc': '24/7 technical monitoring, preventive maintenance, and SLA-backed support.',

    // Projects
    'projects.badge': 'Track Record',
    'projects.title': 'Successfully Completed Projects & Deployments',
    'projects.subtitle': 'Representative turn-key projects successfully delivered by our engineering teams across Ethiopia.',
    'projects.p1_title': 'National Telecom Rollout & Acceptance',
    'projects.p1_client': 'Telecom Operators & Global Vendors',
    'projects.p1_desc': 'Executed radio installation, drive testing, and coverage optimization across 120+ sites with a 99.8% quality pass rate.',
    'projects.p2_title': 'Campus-Wide Data Center & LAN Infrastructure',
    'projects.p2_client': 'Higher Education Institutions / Universities',
    'projects.p2_desc': 'Turn-key installation of high-density server racks, fiber optic backbone, precision CRAC cooling, and centralized modular UPS.',
    'projects.p3_title': 'Smart Classroom & Campus Modernization',
    'projects.p3_client': 'Educational Institutions & Colleges',
    'projects.p3_desc': 'Deployed interactive smart boards, lecture recording pods, and central VDI server environments for modern computer labs.',
    'projects.p4_title': 'High-Definition CCTV & Perimeter AI Surveillance',
    'projects.p4_client': 'Government & Commercial Facilities',
    'projects.p4_desc': 'Installed 250+ AI-enabled IP surveillance cameras connected to a central command room with automated intrusion alerts.',
    'projects.p5_title': 'Enterprise NGFW & Zero-Trust Security Hardening',
    'projects.p5_client': 'Financial & Enterprise Clients',
    'projects.p5_desc': 'Configured redundant Next-Gen Firewalls, multi-site encrypted VPNs, and intrusion prevention rules for enterprise data protection.',

    // Partners
    'partners.badge': 'Global Technology Ecosystem',
    'partners.title': 'World-Class Technology Partners',
    'partners.subtitle': 'We maintain active integration capabilities and supplier channels with global technology pioneers to deliver genuine, certified hardware.',

    // Licenses
    'licenses.badge': 'Legal & Regulatory Accreditations',
    'licenses.title': 'Official Ethiopian Certifications & Licenses',
    'licenses.subtitle': 'LUCYCOM TECHNOLOGIES S.C. operates under full commercial registration and specialized regulatory licenses.',
    'licenses.l1': 'Ethiopian Communications Authority (ECA) License',
    'licenses.l1_desc': 'Outdoor Telecommunications Facilities Installation and Maintenance Works License under Proclamation No. 1148/2019.',
    'licenses.l2': 'Ethiopian Energy Authority (EEA) Certificate',
    'licenses.l2_desc': 'Electromechanical Contractor Grade-Five Competency Certificate under Proclamation No. 686/2010.',
    'licenses.l3': 'Computer Network Design & Cable Installation',
    'licenses.l3_desc': 'Addis Ababa City Administration Trade Bureau License (Code: 85121).',
    'licenses.l4': 'Import Trade in Communication & Computer Equipment',
    'licenses.l4_desc': 'Ministry of Trade and Regional Integration License (Code: 65721).',
    'licenses.l5': 'Consultancy on Information & Communication Technology',
    'licenses.l5_desc': 'Addis Ababa City Administration Trade Bureau License (Code: 86521).',
    'licenses.l6': 'Software Development & Systems Implementation',
    'licenses.l6_desc': 'Addis Ababa City Administration Trade Bureau License (Code: 39141).',

    // Quote Modal / Contact
    'quote.title': 'Request a Corporate Quotation',
    'quote.subtitle': 'Tell us about your project requirements. Our engineering team will prepare a formal proposal within 24 hours.',
    'contact.title': 'Contact & Partner With Us',
    'contact.subtitle': 'LUCYCOM welcomes opportunities to collaborate on national digital infrastructure programs, telecom field operations, and enterprise modernization projects.',
    'contact.office_label': 'Head Office Address',
    'contact.office_val': 'Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia',
    'contact.phone_label': 'Direct Phone Lines',
    'contact.phone_val': '+251 939997612 / +251 911510295 / +251 911828830',
    'contact.email_label': 'Official Email Enquiries',
    'contact.email_val': 'info@lucycomtechnologies.com',
    'contact.web_label': 'Official Website',
    'contact.web_val': 'www.lucycomtechnologies.com',
    'contact.tin_label': 'Statutory Licensing',
    'contact.tin_val': 'ECA & EEA Certified',
    'contact.form_name': 'Your Name or Company Name',
    'contact.form_contact': 'Email Address or Phone Number',
    'contact.form_service': 'Select Solution of Interest',
    'contact.form_service_opt_default': 'Select a Solution Category...',
    'contact.form_service_opt1': 'Telecom Infrastructure (Towers, RF, Fiber)',
    'contact.form_service_opt2': 'Data Center Builds (Tier II/III, Cooling, Power)',
    'contact.form_service_opt3': 'Smart Education & VDI Laboratories',
    'contact.form_service_opt4': 'Enterprise Security & AI CCTV Surveillance',
    'contact.form_service_opt5': 'ICT Consultancy & Electromechanical Works',
    'contact.form_message': 'Project Scope & Requirements',
    'contact.form_send': 'Send Message / Quote Request',

    // Footer
    'footer.company_desc': 'A leading Ethiopian share company dedicated to designing, supplying, installing, and supporting resilient, scalable, and international standards-compliant ICT infrastructure.',
    'footer.slogan': 'Lucy the origin, LucyCom the destination',
    'footer.quick_links': 'Quick Navigation',
    'footer.solutions': 'Our Solutions',
    'footer.contact_info': 'Corporate Headquarters',
    'footer.rights': 'All Rights Reserved. Registered Ethiopian Share Company.',

    // Chatbot
    'chatbot.title': 'LucyBot - Corporate AI',
    'chatbot.subtitle': 'Instant answers about Lucycom Technologies',
    'chatbot.online': 'Online',
    'chatbot.welcome': 'Hello! Welcome to LUCYCOM TECHNOLOGIES S.C. How can I assist you with our ICT, Telecom, or Data Center solutions today?',
    'chatbot.ask_placeholder': 'Ask LucyBot anything...',
    'chatbot.q1': 'What services do you provide?',
    'chatbot.q2': 'Where is your office located?',
    'chatbot.q3': 'Tell me about telecom projects',
    'chatbot.q4': 'What licenses do you hold?',
    'chatbot.q5': 'How do I get a quote?',
  },
  am: {
    // Nav
    'nav.home': 'ዋና ገጽ',
    'nav.about': 'ስለ እኛ',
    'nav.solutions': 'አገልግሎቶች',
    'nav.sol_telecom': 'የቴሌኮም መሰረተ-ልማት',
    'nav.sol_datacenter': 'ዳታ ሴንተር እና ዳታኮም',
    'nav.sol_education': 'ዘመናዊ ትምህርት',
    'nav.sol_security': 'የድርጅት ደህንነት',
    'nav.sol_cctv': 'ሲሲቲቪ እና የAI ቅኝት',
    'nav.sol_vdi': 'VDI እና ፋየርዎል',
    'nav.projects': 'ፕሮጀክቶች',
    'nav.partners': 'አጋሮች',
    'nav.licenses': 'ፈቃዶች',
    'nav.products': 'ምርቶች',
    'nav.news': 'ዜናዎች',
    'nav.requests': 'አገልግሎት ይጠይቁ',
    'nav.contact': 'አድራሻ',
    'nav.get_quote': 'የዋጋ መጠየቂያ',
    'nav.quote_sub': 'ፈጣን የዋጋ ስሌት',

    // Requests
    'requests.title': 'አገልግሎት ይጠይቁ',
    'requests.subtitle': 'የሚፈልጉትን የኢንጂነሪንግ አገልግሎት መርጠው የዋጋ ወይም የፕሮጀክት ጥያቄዎን ያስገቡ',
    'requests.telecom': 'የቴሌኮም መሰረተ-ልማት አገልግሎት መጠየቂያ',
    'requests.telecom_sub': 'የማማ ተከላ፣ 4G/5G LTE እና ማይክሮዌቭ',
    'requests.datacenter': 'የዳታ ሴንተር እና ዳታኮም አገልግሎት መጠየቂያ',
    'requests.datacenter_sub': 'Tier II/III ግንባታ፣ ማቀዝቀዣ እና ሃይል',
    'requests.education': 'የዘመናዊ ትምህርት አገልግሎት መጠየቂያ',
    'requests.education_sub': 'ስማርት ቦርድ፣ ሌክቸር ቀረጻ እና VDI ላብ',
    'requests.security': 'የድርጅት ደህንነት እና ሲሲቲቪ አገልግሎት መጠየቂያ',
    'requests.security_sub': 'AI ካሜራዎች፣ ዙሪያ ጥበቃ እና ፋየርዎል',
    'requests.solar': 'የኤሌክትሮሜካኒካል እና የፀሐይ ሃይል አገልግሎት መጠየቂያ',
    'requests.solar_sub': 'ጀነሬተሮች፣ ATS እና የፀሐይ ሃይል ማከማቻ',
    'requests.consultancy': 'የICT ማማከር እና ኦዲት አገልግሎት መጠየቂያ',
    'requests.consultancy_sub': 'የኔትወርክ ኦዲት፣ RFP እና 24/7 SLA ድጋፍ',
    'requests.custom': 'አጠቃላይ የዋጋ ወይም የፕሮጀክት መጠየቂያ',

    // News
    'news.badge': 'የኩባንያ ዜናዎች እና መግለጫዎች',
    'news.title': 'የቅርብ ጊዜ ዜናዎች እና የፕሮጀክት ስኬቶች',
    'news.subtitle': 'የሉሲኮም ቴክኖሎጂስ አ.ማ የቅርብ ጊዜ የስራ ስኬቶች፣ ይፋዊ መግለጫዎች እና የቴክኖሎጂ ዜናዎች።',
    'news.search_placeholder': 'ዜናዎችን፣ መግለጫዎችን ወይም ቃላትን ይፈልጉ...',
    'news.read_more': 'ሙሉውን ዜና ያንብቡ',
    'news.all_categories': 'ሁሉም ዜናዎች',

    // Hero
    'hero.badge': 'ሉሲ መገኛ፣ ሉሲኮም መዳረሻ',
    'hero.title_start': 'የኢትዮጵያን ',
    'hero.title_highlight': 'ዲጂታል የወደፊት ጉዞ ማጎልበት።',
    'hero.subtitle': 'የተሟላ የICT፣ የቴሌኮም እና የዳታ ሴንተር መፍትሄዎች።',
    'hero.description': 'ሉሲኮም ቴክኖሎጂስ አ.ማ ዓለም አቀፍ ደረጃቸውን የጠበቁ፣ አስተማማኝና ሊያድጉ የሚችሉ የኢንፎርሜሽንና ኮሙኒኬሽን ቴክኖሎጂ መሰረተ-ልማቶችን በመንደፍ፣ በማቅረብና በመደገፍ ላይ የተሰማራ ቀዳሚ የኢትዮጵያ አክሲዮን ማህበር ነው።',
    'hero.explore_solutions': 'አገልግሎቶችን ያስሱ',
    'hero.contact_us': 'ያግኙን',
    'hero.get_quote': 'የዋጋ መጠየቂያ ይጠይቁ',
    'hero.share_capital': 'ደረጃውን የጠበቀ የመሰረተ-ልማት አጋር',
    'hero.registered_in': 'አዲስ አበባ፣ ኢትዮጵያ የተመዘገበ',

    // Stats
    'stats.sites': '120+ የቴሌኮም ጣቢያዎች',
    'stats.sites_sub': 'የተሟላ ተከላና ርክክብ',
    'stats.pass_rate': '99.8%',
    'stats.pass_rate_sub': 'የድራይቭ ቴስት ጥራት ማለፊያ ምጣኔ',
    'stats.cameras': '250+ የAI ካሜራዎች',
    'stats.cameras_sub': 'የተቀናጀ የዙሪያ ጥበቃ ስርዓት',
    'stats.standards': 'Tier II / III',
    'stats.standards_sub': 'የዳታ ሴንተር ግንባታ ደረጃዎች',

    // About
    'about.badge': 'ስለ ሉሲኮም ቴክኖሎጂስ',
    'about.title': 'በኢትዮጵያ ወሳኝ የICT እና ቴሌኮም መሰረተ-ልማት ግንባር ቀደም መሪ',
    'about.desc1': 'ሉሲኮም ቴክኖሎጂስ አ.ማ የተሟላ የኢንፎርሜሽን እና ኮሙኒኬሽን ቴክኖሎጂ መሰረተ-ልማት መፍትሄዎችን በማዘጋጀት፣ በማቅረብ፣ በመትከል እና በመደገፍ ላይ ያተኮረ ቀዳሚ የኢትዮጵያ አክሲዮን ማህበር ነው።',
    'about.desc2': 'የስራ ልምዳችን ሁሉንም የቴክኖሎጂ ዘርፎች ያካትታል፡ ከሲቪል መሰረተ-ልማት፣ የቴሌኮም ማማ ተከላ እና የዳታ ሴንተር ግንባታ ጀምሮ እስከ ከፍተኛ የኔትወርክ ደህንነት፣ ዘመናዊ የመማሪያ ክፍሎች እና የደመና ዝግጁ ቨርቹዋል ዴስክቶፕ (VDI) ድረስ።',
    'about.desc3': 'የኢትዮጵያን ፈጣን የዲጂታል ትራንስፎርሜሽን ለማሳካት ብቁና የተረጋገጡ የኢንጂነሪንግ አቅማችንን ከዓለም አቀፍ የቴክኖሎጂ አምራቾች ጋር በማስተሳሰር ደረጃቸውን የጠበቁ መፍትሄዎችን እናቀርባለን።',
    'about.vision_title': 'ራዕይ',
    'about.vision_desc': 'በኢንጂነሪንግ ጥራትና ተቋማት በዘመናዊው የዲጂታል ዘመን እንዲበለጽጉ በማብቃት በኢትዮጵያ እጅግ ታማኝ እና ፈጠራ የታከለበት የICT እና የቴሌኮም መሰረተ-ልማት አጋር መሆን።',
    'about.mission_title': 'ተልዕኮ',
    'about.mission_desc': 'በሰለጠኑ ባለሙያዎች፣ በተረጋገጡ አሰራሮች እና በአለም አቀፍ አጋርነቶች አማካኝነት ደህንነታቸው የተጠበቁ፣ አስተማማኝ እና ወጪ ቆጣቢ የቴክኖሎጂ መፍትሄዎችን በማቅረብ በሁሉም ዘርፎች የዲጂታል ዘመናዊነትን መደገፍ።',

    // Values
    'values.title': 'መሰረታዊ እሴቶች እና የስራ ደረጃዎች',
    'values.subtitle': 'አሰራራችን ከፍተኛ ጥራትን እና የመስክ ደህንነትን ባገናዘበ ሁኔታ የተዋቀረ ሲሆን ዘላቂነት ያለው አገልግሎት ማረጋገጥ ዋና ግባችን ነው።',
    'values.integrity': 'ታማኝነት',
    'values.integrity_desc': 'ግልጽ የስራ ውል እና ቅን የቴክኒክ ምክር መስጠት።',
    'values.excellence': 'የላቀ ጥራት',
    'values.excellence_desc': 'የIEEE፣ TIA/EIA እና ISO ደረጃዎችን በጥብቅ መከተል።',
    'values.safety': 'ለደህንነት ቅድሚያ',
    'values.safety_desc': 'ከፍታ ላይ ለሚሰሩ የማማ ስራዎች የተረጋገጡ የደህንነት ሂደቶችን ተግባራዊ ማድረግ።',
    'values.customer': 'ደንበኛ ተኮር',
    'values.customer_desc': 'በእውነተኛ የስራ ፍላጎቶች ዙሪያ የተገነቡ ብጁ መፍትሄዎችን ማቅረብ።',

    // Solutions
    'solutions.badge': 'የተቀናጁ መፍትሄዎች ዝርዝር',
    'solutions.title': 'ለድርጅቶችና ለመንግስት ተቋማት የተዘጋጁ ከፍተኛ የቴክኖሎጂ መፍትሄዎች',
    'solutions.subtitle': 'በሲቪል፣ ኦፕቲካል፣ ኤሌክትሪካል እና ሳይበር ደህንነት ዘርፎች የተሟላ የፕሮጀክት አፈጻጸም።',
    'solutions.telecom_title': 'የቴሌኮም መሰረተ-ልማት',
    'solutions.telecom_desc': 'የሲቪል ስራዎች፣ የማማ ተከላ፣ የፊደር ዝርጋታ፣ የሬዲዮና ማይክሮዌቭ ኮሚሽኒንግ እና የድራይቭ ቴስት ጥራት ማረጋገጫ።',
    'solutions.telecom_tags': '4G/5G LTE • RF ማመቻቸት • ማይክሮዌቭ • የማማ ተከላ',
    'solutions.datacenter_title': 'ዳታ ሴንተር ግንባታ እና ዳታኮም',
    'solutions.datacenter_desc': 'ደረጃቸውን የጠበቁ የዳታ ሴንተር ህንፃ ግንባታዎች፣ ቅዝቃዜ ማስተካከያ (precision cooling)፣ ሞጁላር ዩፒኤስ፣ የእሳት አደጋ መከላከያ እና የፋይበር ኔትወርክ።',
    'solutions.datacenter_tags': 'Tier II/III • ፕሪሲዥን ኩሊንግ • ዩፒኤስ • ኬብሊንግ',
    'solutions.education_title': 'ዘመናዊ የትምህርት ክፍሎች',
    'solutions.education_desc': 'ተግባራዊ ስማርት ቦርዶች፣ የፖዲየም ቅንጅት፣ የትምህርት ቀረጻ፣ ቨርቹዋል ላብራቶሪ እና ማዕከላዊ የVDI ሲስተሞች።',
    'solutions.education_tags': 'ስማርት ቦርድ • የትምህርት ቀረጻ • VDI • ቨርቹዋል ላብ',
    'solutions.security_title': 'የድርጅት ደህንነት እና ሲሲቲቪ',
    'solutions.security_desc': 'የሰው ፊት ለይተው የሚያውቁ የAI ካሜራዎች፣ የዙሪያ ድንበር ጥበቃ፣ ማዕከላዊ የቁጥጥር ማዕከላት እና ቀጣይ ትውልድ ፋየርዎል (NGFW)።',
    'solutions.security_tags': 'AI ሲሲቲቪ • NGFW ፋየርዎል • ፔሪሜትር AI • የመግቢያ ቁጥጥር',

    // Lifecycle
    'lifecycle.title': 'ደረጃውን የጠበቀ የፕሮጀክት አፈጻጸም ሂደት',
    'lifecycle.s1_title': 'ቅኝትና ዲዛይን',
    'lifecycle.s1_desc': 'የቦታ ቅኝት፣ CAD ንድፍ፣ የRF ሙቀት ካርታ እና የመዋቅር ኢንጂነሪንግ ማዘጋጀት።',
    'lifecycle.s2_title': 'አቅርቦትና ግንባታ',
    'lifecycle.s2_desc': 'ከዓለም አቀፍ አጋሮች ትክክለኛ እቃዎችን ማቅረብና የተረጋገጠ የመስክ ግንባታ ማካሄድ።',
    'lifecycle.s3_title': 'ምርመራና ድራይቭ ቴስት',
    'lifecycle.s3_desc': 'የመስክ ጥራት ፍተሻ፣ የድራይቭ ቴስት፣ የጫና መቋቋም እና የደህንነት ምርመራዎች።',
    'lifecycle.s4_title': 'ስራ ማስጀመር',
    'lifecycle.s4_desc': 'ጥብቅ የርክክብ ሰነዶች ማዘጋጀት፣ ስራ ማስጀመር እና ወደ አገልግሎት ማስገባት።',
    'lifecycle.s5_title': 'ቀጣይ ድጋፍና ጥገና',
    'lifecycle.s5_desc': 'የ24/7 የቴክኒክ ክትትል፣ መደበኛ ጥገና እና አስተማማኝ የSLA ድጋፍ።',

    // Projects
    'projects.badge': 'የስራ ታሪክ',
    'projects.title': 'በስኬት የተጠናቀቁ ፕሮጀክቶች',
    'projects.subtitle': 'በሉሲኮም የኢንጂነሪንግ ቡድን በመላው ኢትዮጵያ በስኬት ከተከናወኑ ፕሮጀክቶች መካከል የተመረጡ።',
    'projects.p1_title': 'ሀገር አቀፍ የቴሌኮም ጣቢያዎች ዝርጋታና ርክክብ',
    'projects.p1_client': 'የቴሌኮም ኦፕሬተሮችና ዓለም አቀፍ አቅራቢዎች',
    'projects.p1_desc': 'በ120+ ጣቢያዎች ላይ የሬዲዮ ተከላ፣ የድራይቭ ቴስት እና ሽፋን ማሻሻያ በ99.8% የጥራት ማለፊያ ደረጃ ተከናውኗል።',
    'projects.p2_title': 'የግቢ አቀፍ ዳታ ሴንተር እና የLAN መሰረተ-ልማት',
    'projects.p2_client': 'የከፍተኛ ትምህርት ተቋማት / ዩኒቨርሲቲዎች',
    'projects.p2_desc': 'የከፍተኛ አቅም ሰርቨር ራኮች፣ የፋይበር መስመር ዝርጋታ፣ ፕሪሲዥን ማቀዝቀዣ እና ማዕከላዊ ሞጁላር ዩፒኤስ ተከላ።',
    'projects.p3_title': 'ዘመናዊ የመማሪያ ክፍሎች እና የቴክኖሎጂ አደረጃጀት',
    'projects.p3_client': 'የትምህርት ተቋማትና ኮሌጆች',
    'projects.p3_desc': 'ተግባራዊ ስማርት ቦርዶች፣ የትምህርት መቅረጫ ፖዶች እና ማዕከላዊ የVDI ሰርቨር ኮምፒውተር ላቦች ተዘርግተዋል።',
    'projects.p4_title': 'ከፍተኛ ጥራት ያለው የሲሲቲቪ እና የAI ዙሪያ ጥበቃ',
    'projects.p4_client': 'የመንግስትና የንግድ ተቋማት',
    'projects.p4_desc': '250+ የAI ካሜራዎች ከማዕከላዊ የቁጥጥር ማዕከል ጋር ተገናኝተው ድንገተኛ ጥሰቶችን በራስ-ሰር የሚያሳውቁ ተተክለዋል።',
    'projects.p5_title': 'የድርጅት ቀጣይ ትውልድ ፋየርዎልና የደህንነት ማጠናከሪያ',
    'projects.p5_client': 'የፋይናንስና የንግድ ተቋማት',
    'projects.p5_desc': 'አስተማማኝ ቀጣይ ትውልድ ፋየርዎሎች (NGFW)፣ ባለብዙ ጣቢያ ሚስጥራዊ የVPN መስመሮች እና የመረጃ ጥበቃ ህጎች ተዋቅረዋል።',

    // Partners
    'partners.badge': 'የዓለም አቀፍ ቴክኖሎጂ አጋሮች',
    'partners.title': 'ከፍተኛ ደረጃ ያላቸው ዓለም አቀፍ አጋሮቻችን',
    'partners.subtitle': 'ትክክለኛና ጥራት ያላቸውን የቴክኖሎጂ መሳሪያዎች ለማቅረብ ከዓለም መሪ አምራቾች ጋር ቀጥተኛ ግንኙነት አለን።',

    // Licenses
    'licenses.badge': 'ህጋዊ ምዝገባዎችና ፈቃዶች',
    'licenses.title': 'የኢትዮጵያ ይፋዊ የንግድና የብቃት ፈቃዶች',
    'licenses.subtitle': 'ሉሲኮም ቴክኖሎጂስ አ.ማ ሙሉ በሙሉ ህጋዊ የንግድ ምዝገባና ልዩ የሙያ ፈቃዶች ያሉት ኩባንያ ነው።',
    'licenses.l1': 'የኢትዮጵያ ኮሙኒኬሽን ባለስልጣን (ECA) ፈቃድ',
    'licenses.l1_desc': 'የውጭ የቴሌኮሙኒኬሽን መገልገያዎች ተከላ እና ጥገና ስራዎች ፈቃድ (በአዋጅ ቁጥር 1148/2011 መሰረት)።',
    'licenses.l2': 'የኢትዮጵያ ኤነርጂ ባለስልጣን (EEA) ምስክር ወረቀት',
    'licenses.l2_desc': 'የኤሌክትሮ ሜካኒካል ስራ ተቋራጭ ደረጃ-5 የሙያ ብቃት ማረጋገጫ (በአዋጅ ቁጥር 686/2002 መሰረት)።',
    'licenses.l3': 'የኮምፒውተር ኔትወርክ ዲዛይንና ኬብል ተከላ',
    'licenses.l3_desc': 'የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ ፈቃድ (የስራ ኮድ፡ 85121)።',
    'licenses.l4': 'የኮሙኒኬሽንና የኮምፒውተር እቃዎች አስመጪነት ንግድ',
    'licenses.l4_desc': 'የንግድና ቀጣናዊ ትስስር ሚኒስቴር ፈቃድ (የስራ ኮድ፡ 65721)።',
    'licenses.l5': 'የኢንፎርሜሽንና ኮሙኒኬሽን ቴክኖሎጂ የማማከር አገልግሎት',
    'licenses.l5_desc': 'የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ ፈቃድ (የስራ ኮድ፡ 86521)።',
    'licenses.l6': 'የሶፍትዌር ማበልጸግና ሲስተምስ ትግበራ',
    'licenses.l6_desc': 'የአዲስ አበባ ከተማ አስተዳደር ንግድ ቢሮ ፈቃድ (የስራ ኮድ፡ 39141)።',

    // Quote Modal / Contact
    'quote.title': 'የኮርፖሬት ዋጋ መጠየቂያ',
    'quote.subtitle': 'የፕሮጀክትዎን ዝርዝር ፍላጎት ያሳውቁን። የኢንጂነሪንግ ቡድናችን በ24 ሰዓት ውስጥ ዝርዝር ፕሮፖዛል ያዘጋጅልዎታል።',
    'contact.title': 'ያግኙንና አብረውን ይስሩ',
    'contact.subtitle': 'ሉሲኮም በሀገር አቀፍ የዲጂታል መሰረተ-ልማት ግንባታ፣ በቴሌኮም የመስክ ስራዎች እና በተቋማት ዘመናዊነት ላይ በትብብር ለመስራት ሁሌም ዝግጁ ነው።',
    'contact.office_label': 'የዋና መስሪያ ቤት አድራሻ',
    'contact.office_val': 'አዲስ አበባ፣ የካ ክፍለ ከተማ፣ ወረዳ 08፣ የቤት ቁጥር 158/406፣ ኢትዮጵያ',
    'contact.phone_label': 'የስልክ መስመሮች',
    'contact.phone_val': '+251 939997612 / +251 911510295 / +251 911828830',
    'contact.email_label': 'ይፋዊ የኢሜይል አድራሻ',
    'contact.email_val': 'info@lucycomtechnologies.com',
    'contact.web_label': 'ይፋዊ ድረ-ገጽ',
    'contact.web_val': 'www.lucycomtechnologies.com',
    'contact.tin_label': 'ይፋዊ ፈቃድ',
    'contact.tin_val': 'ECA & EEA የተረጋገጠ',
    'contact.form_name': 'ሙሉ ስም ወይም የድርጅቱ ስም',
    'contact.form_contact': 'የኢሜይል አድራሻ ወይም የስልክ ቁጥር',
    'contact.form_service': 'የሚፈልጉትን አገልግሎት ይምረጡ',
    'contact.form_service_opt_default': 'የአገልግሎት ዘርፍ ይምረጡ...',
    'contact.form_service_opt1': 'የቴሌኮም መሰረተ-ልማት (ማማ፣ RF፣ ፋይበር)',
    'contact.form_service_opt2': 'ዳታ ሴንተር ግንባታ (Tier II/III፣ ማቀዝቀዣ፣ ሃይል)',
    'contact.form_service_opt3': 'ዘመናዊ ትምህርት እና VDI ላብራቶሪዎች',
    'contact.form_service_opt4': 'የድርጅት ደህንነት እና AI ሲሲቲቪ ቅኝት',
    'contact.form_service_opt5': 'የICT ማማከር እና ኤሌክትሮሜካኒካል ስራዎች',
    'contact.form_message': 'የፕሮጀክቱ ዝርዝር ሁኔታ',
    'contact.form_send': 'ጥያቄውን ይላኩ / ዋጋ ይጠይቁ',

    // Footer
    'footer.company_desc': 'ደረጃቸውን የጠበቁ፣ አስተማማኝና ሊያድጉ የሚችሉ የICT መሰረተ-ልማቶችን በመንደፍ፣ በማቅረብና በመደገፍ ላይ የተሰማራ ቀዳሚ የኢትዮጵያ አክሲዮን ማህበር።',
    'footer.slogan': 'ሉሲ መገኛ፣ ሉሲኮም መዳረሻ',
    'footer.quick_links': 'ፈጣን ማውጫ',
    'footer.solutions': 'አገልግሎቶቻችን',
    'footer.contact_info': 'የዋና መስሪያ ቤት መረጃ',
    'footer.rights': 'መብቱ በህግ የተጠበቀ ነው። የተመዘገበ የኢትዮጵያ አክሲዮን ማህበር።',

    // Chatbot
    'chatbot.title': 'ሉሲቦት - የኩባንያ ረዳት AI',
    'chatbot.subtitle': 'ስለ ሉሲኮም ቴክኖሎጂስ ፈጣን ምላሾች',
    'chatbot.online': 'ዝግጁ',
    'chatbot.welcome': 'ሰላም! ወደ ሉሲኮም ቴክኖሎጂስ አ.ማ እንኳን በደህና መጡ። በICT፣ ቴሌኮም ወይም ዳታ ሴንተር መፍትሄዎቻችን ዛሬ እንዴት ልርዳዎት?',
    'chatbot.ask_placeholder': 'ሉሲቦትን ማንኛውንም ነገር ይጠይቁ...',
    'chatbot.q1': 'ምን አይነት አገልግሎት ትሰጣላችሁ?',
    'chatbot.q2': 'ቢሮአችሁ የት ነው የሚገኘው?',
    'chatbot.q3': 'ስለ ቴሌኮም ፕሮጀክቶች ንገሩኝ',
    'chatbot.q4': 'ምን አይነት ፈቃዶች አሏችሁ?',
    'chatbot.q5': 'የዋጋ መጠየቂያ እንዴት ማግኘት እችላለሁ?',
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  isAmharic: false,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('lucycom_lang') as Language;
    if (saved && (saved === 'en' || saved === 'am')) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('lucycom_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'am' : 'en';
    setLanguage(nextLang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = translations[language];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to English
    if (translations.en && translations.en[key]) {
      return translations.en[key];
    }
    return fallback || key;
  };

  const isAmharic = language === 'am';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t, isAmharic }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
