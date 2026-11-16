export interface ProductItem {
  id: string;
  name: string;
  nameAm: string;
  category: 'TELECOM' | 'DATACENTER' | 'SECURITY' | 'NETWORKING' | 'EDUCATION' | 'POWER';
  categoryLabel: string;
  categoryLabelAm: string;
  brand: string;
  image: string;
  badge: string;
  badgeAm: string;
  shortDesc: string;
  shortDescAm: string;
  specs: string[];
  specsAm: string[];
  contactService: string;
}

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Huawei SingleRAN Multi-Mode Macro BTS Base Station',
    nameAm: 'Huawei SingleRAN ባለብዙ-ሞድ ማክሮ BTS ቤዝ ስቴሽን',
    category: 'TELECOM',
    categoryLabel: 'Telecom & Wireless',
    categoryLabelAm: 'ቴሌኮም እና ገመድ-አልባ',
    brand: 'HUAWEI',
    image: '/images/lucycom/product-telecom-bts.jpg',
    badge: 'Carrier Grade',
    badgeAm: 'የቴሌኮም ደረጃ',
    shortDesc: 'Multi-standard radio base station supporting GSM, 3G, 4G LTE, and 5G NR on a unified energy-efficient platform.',
    shortDescAm: 'በአንድ ወጥ ሃይል ቆጣቢ መድረክ ላይ GSM፣ 3G፣ 4G LTE እና 5G NR የሚደግፍ ዘመናዊ ቤዝ ስቴሽን።',
    specs: [
      'Multi-Band Frequency: 700MHz to 3.5GHz',
      '4T4R to 64T64R Massive MIMO readiness',
      'Operating Temp: -40°C to +55°C (IP65 Outdoor)',
      'Energy saving AI-driven dynamic power shutdown'
    ],
    specsAm: [
      'የድግግሞሽ ባንድ፡ ከ700MHz እስከ 3.5GHz',
      '4T4R እስከ 64T64R Massive MIMO ዝግጁነት',
      'የአየር ሙቀት መቋቋም፡ -40°C እስከ +55°C (IP65)',
      'በAI የሚሰራ የሃይል ፍጆታ ቆጣቢ ስርአት'
    ],
    contactService: 'Telecom Infrastructure',
  },
  {
    id: 'prod-2',
    name: 'Nokia AirScale High-Capacity Microwave Dish Antenna & ODU',
    nameAm: 'Nokia AirScale ከፍተኛ አቅም ያለው ማይክሮዌቭ አንቴና እና ODU',
    category: 'TELECOM',
    categoryLabel: 'Telecom & Wireless',
    categoryLabelAm: 'ቴሌኮም እና ገመድ-አልባ',
    brand: 'NOKIA',
    image: '/images/lucycom/product-microwave-antenna.jpg',
    badge: 'High Throughput',
    badgeAm: 'ከፍተኛ ፍጥነት',
    shortDesc: 'Carrier-grade point-to-point microwave transmission system delivering up to 10Gbps wireless backhaul.',
    shortDescAm: 'እስከ 10Gbps ፍጥነት ድረስ የሚያስተላልፍ ከፍተኛ ጥራት ያለው የነጥብ-ለነጥብ ማይክሮዌቭ ስርዓት።',
    specs: [
      'Throughput: Up to 10Gbps with XPIC and Carrier Aggregation',
      'Frequency: 6GHz to 42GHz spectrum support',
      'Modulation: Up to 4096 QAM adaptive modulation',
      'Latency: Ultra-low sub-millisecond transmission'
    ],
    specsAm: [
      'የመረጃ ማስተላለፍ ፍጥነት፡ እስከ 10Gbps',
      'የድግግሞሽ ሽፋን፡ ከ6GHz እስከ 42GHz',
      'ሞጁሌሽን፡ እስከ 4096 QAM',
      'የማስተላለፍ መዘግየት፡ ከ1 ሚሊሰከንድ በታች'
    ],
    contactService: 'Telecom Infrastructure',
  },
  {
    id: 'prod-3',
    name: 'Modular Scalable Online Double-Conversion UPS (30kVA-500kVA)',
    nameAm: 'ሞጁላር ኦንላይን ዳብል-ኮንቨርሽን ዩፒኤስ (30kVA-500kVA)',
    category: 'DATACENTER',
    categoryLabel: 'Data Center & Datacom',
    categoryLabelAm: 'ዳታ ሴንተር እና ዳታኮም',
    brand: 'SCHNEIDER / VERTIV',
    image: '/images/lucycom/product-modular-ups.jpg',
    badge: 'Tier III Ready',
    badgeAm: 'ለTier III ዝግጁ',
    shortDesc: 'Hot-swappable modular online double-conversion UPS guaranteeing continuous clean power for Tier-standard data halls.',
    shortDescAm: 'ለዳታ ሴንተሮች አስተማማኝና ያልተቋረጠ ንጹህ የኤሌክትሪክ ሃይል የሚያቀርብ ሞጁላር ዩፒኤስ።',
    specs: [
      'Capacity: Scalable from 30kVA up to 500kVA N+1',
      'Efficiency: Up to 99% in ECO mode (96% online double conversion)',
      'Hot-Swappable power modules without downtime',
      'Lithium-Ion / VRLA battery compatibility with smart BMS'
    ],
    specsAm: [
      'የሃይል አቅም፡ ከ30kVA እስከ 500kVA N+1',
      'የስራ ቅልጥፍና፡ በECO ሁነታ እስከ 99%',
      'ስራ ሳያቋርጡ ሞጁሎችን የመቀየር እድል (Hot-Swappable)',
      'ከሊቲየም-አዮን ባትሪ ጋር የሚሰራና ስማርት BMS ያለው'
    ],
    contactService: 'Data Center & Datacom',
  },
  {
    id: 'prod-4',
    name: 'High-Density 42U / 48U Server Rack Enclosures',
    nameAm: 'ከፍተኛ አቅም ያላቸው 42U / 48U የሰርቨር ራክ ካቢኔቶች',
    category: 'DATACENTER',
    categoryLabel: 'Data Center & Datacom',
    categoryLabelAm: 'ዳታ ሴንተር እና ዳታኮም',
    brand: 'SIEMON / APC',
    image: '/images/lucycom/product-server-rack.jpg',
    badge: 'Cold-Aisle Ready',
    badgeAm: 'ለኮልድ-አይል የተመቻቸ',
    shortDesc: 'Heavy-duty steel server enclosures engineered for high-density compute, structured fiber backbones, and cold/hot aisle containment.',
    shortDescAm: 'ለከፍተኛ ጥግግት ሰርቨሮች እና ለፋይበር ኔትወርክ ተብለው የተሰሩ ጠንካራ የብረት ካቢኔቶች።',
    specs: [
      'Dimensions: 42U / 48U (600/800mm W x 1000/1200mm D)',
      'Static Load Rating: Up to 1,500 kg',
      'Perforated mesh doors with 80% open ventilation area',
      'Integrated vertical cable managers and PDU toolless mounting'
    ],
    specsAm: [
      'መጠኖች፡ 42U / 48U (600/800ሚሜ ወርድ x 1000/1200ሚሜ ጥልቀት)',
      'የመሸከም አቅም፡ እስከ 1,500 ኪሎግራም',
      '80% አየር የሚያሳልፉ የተቦረቦሩ የፊትና የኋላ በሮች',
      'የተገነባ የገመድ ማስተካከያ እና የPDU መስቀያ'
    ],
    contactService: 'Data Center & Datacom',
  },
  {
    id: 'prod-5',
    name: 'Fortinet FortiGate Enterprise Next-Generation Firewall (NGFW)',
    nameAm: 'Fortinet FortiGate የድርጅት Next-Gen ፋየርዎል',
    category: 'SECURITY',
    categoryLabel: 'Security & Cyber Defense',
    categoryLabelAm: 'ደህንነት እና የሳይበር ጥበቃ',
    brand: 'FORTINET',
    image: '/images/lucycom/product-ngfw-firewall.jpg',
    badge: 'AI Cyber Defense',
    badgeAm: 'በAI የሚመራ ጥበቃ',
    shortDesc: 'Industry-leading network security firewall delivering ultra-fast SSL inspection, IPS threat prevention, and Zero-Trust network access.',
    shortDescAm: 'የላቀ የSSL ፍተሻ፣ የጥቃት መከላከያ እና የZero-Trust መዳረሻ ያለው መሪ የሳይበር ደህንነት ፋየርዎል።',
    specs: [
      'Firewall Throughput: Up to 36Gbps enterprise filtering',
      'IPS Throughput: 5.2Gbps deep packet inspection',
      'SSL/TLS Inspection: 4Gbps line-rate decryption',
      'Integrated SD-WAN and automated FortiGuard threat intelligence'
    ],
    specsAm: [
      'የፋየርዎል ማጣራት ፍጥነት፡ እስከ 36Gbps',
      'የጥቃት መከላከያ (IPS) ፍጥነት፡ 5.2Gbps',
      'የSSL/TLS ፍተሻ፡ 4Gbps',
      'የተዋቀረ ደህንነቱ የተጠበቀ SD-WAN እና FortiGuard AI'
    ],
    contactService: 'Enterprise Security',
  },
  {
    id: 'prod-6',
    name: 'Cisco Catalyst Core & Aggregation Managed Layer 3 Switch',
    nameAm: 'Cisco Catalyst ኮር እና አግሪጌሽን ሌየር-3 ማኔጅድ ስዊች',
    category: 'NETWORKING',
    categoryLabel: 'Enterprise Networking',
    categoryLabelAm: 'የኢንተርፕራይዝ ኔትወርክ',
    brand: 'CISCO',
    image: '/images/lucycom/product-core-switch.jpg',
    badge: 'Core Backbone',
    badgeAm: 'የኔትወርክ የጀርባ አጥንት',
    shortDesc: 'Resilient campus core switch featuring 100G/40G spine-leaf uplinks, StackWise-480 redundancy, and granular micro-segmentation.',
    shortDescAm: '100G/40G ከፍተኛ ፍጥነት ያላቸው ወደቦች፣ የሃርድዌር ድግግሞሽ እና ከፍተኛ ደህንነት ያለው ኮር ስዊች።',
    specs: [
      'Switching Capacity: Up to 3.2Tbps / 2.4Bpps forwarding',
      'Uplinks: Modular 100G QSFP28, 40G QSFP+, and 10G SFP+ slots',
      'StackWise-480 stacking with 480Gbps backplane bandwidth',
      'Dual redundant platinum-rated modular power supplies'
    ],
    specsAm: [
      'የስዊቺንግ አቅም፡ እስከ 3.2Tbps / 2.4Bpps',
      'ከፍተኛ ፍጥነት ወደቦች፡ 100G QSFP28 እና 40G QSFP+',
      'StackWise-480 ስታኪንግ በ480Gbps ፍጥነት',
      'ሁለት ተለዋዋጭ ፕላቲነም የሃይል አቅርቦቶች'
    ],
    contactService: 'Data Center & Datacom',
  },
  {
    id: 'prod-7',
    name: '86-Inch 4K UHD Collaborative Interactive Flat Panel Display',
    nameAm: '86 ኢንች 4K UHD በይነ-መረብ ስማርት ፓነል',
    category: 'EDUCATION',
    categoryLabel: 'Smart Classroom & VDI',
    categoryLabelAm: 'ስማርት ትምህርት እና VDI',
    brand: 'HIKVISION / OS-EASY',
    image: '/images/lucycom/product-interactive-smartboard.jpg',
    badge: 'Interactive 4K',
    badgeAm: 'በንክኪ የሚሰራ 4K',
    shortDesc: 'Ultra-HD interactive flat panel equipped with 40-point multi-touch, zero-gap optical bonding, dual Android/Windows OS, and wireless screen projection.',
    shortDescAm: 'በ40 የጣት ንክኪዎች በአንድ ጊዜ የሚሰራ፣ ሁለት ኦፕሬቲንግ ሲስተሞች ያሉት እና ገመድ አልባ ስክሪን ማጋሪያ ያለው ስማርት ቦርድ።',
    specs: [
      'Screen Size: 86" Anti-Glare 4K UHD (3840 x 2160 @ 60Hz)',
      'Touch Precision: 40-point multi-touch with 1mm writing accuracy',
      'Dual OS: Built-in Android 13 + modular Windows 11 Pro OPS PC',
      'Integrated 4K AI Auto-Framing Camera & 8-Array Microphone'
    ],
    specsAm: [
      'የስክሪን መጠን፡ 86 ኢንች ጸረ-ነጸብራቅ 4K UHD',
      'የንክኪ ትክክለኛነት፡ ባለ 40 ነጥብ ንክኪ በ1ሚሜ የጽሁፍ ትክክለኛነት',
      'ሁለት ሲስተሞች፡ አንድሮይድ 13 + ዊንዶውስ 11 ፕሮ OPS PC',
      'የተገጠመ 4K AI ካሜራ እና ባለ 8 ማይክሮፎን አሬይ'
    ],
    contactService: 'Smart Education',
  },
  {
    id: 'prod-8',
    name: 'OS-Easy Cloud VDI Thin Client Desktop Terminal',
    nameAm: 'OS-Easy ደመና-ተኮር VDI ቨርቹዋል ዴስክቶፕ ተርሚናል',
    category: 'EDUCATION',
    categoryLabel: 'Smart Classroom & VDI',
    categoryLabelAm: 'ስማርት ትምህርት እና VDI',
    brand: 'OS-EASY',
    image: '/images/lucycom/product-vdi-terminal.jpg',
    badge: 'Zero Maintenance',
    badgeAm: 'ጥገና የማይፈልግ',
    shortDesc: 'Solid-state low-power desktop virtualization terminal consolidating university lab maintenance into central hypervisor servers.',
    shortDescAm: 'የዩኒቨርሲቲ ላብራቶሪዎችን የኮምፒውተር ጥገና ወጪ በ70% የሚቀንስ ደመና-ተኮር የVDI ተርሚናል መሳሪያ።',
    specs: [
      'Power Consumption: 5W average (cuts electric bills by 85%)',
      'Display: Dual 4K HDMI multi-monitor output support',
      'Re-imaging: Central lab instant boot-up under 60 seconds',
      'Zero local moving parts (solid-state fanless metal chassis)'
    ],
    specsAm: [
      'የሃይል ፍጆታ፡ 5 ዋት ብቻ (የመብራት ወጪን በ85% ይቀንሳል)',
      'ስክሪን፡ ሁለት 4K HDMI ስክሪኖችን በአንድ ጊዜ የማገናኘት አቅም',
      'ዳግም ማስነሳት፡ መላውን ላብራቶሪ ከ60 ሰከንድ ባነሰ ጊዜ ውስጥ ማዘጋጀት',
      'ተንቀሳቃሽ ክፍሎች የሌሉት ጸጥተኛ ጠንካራ የብረት አካል'
    ],
    contactService: 'Smart Education',
  },
  {
    id: 'prod-9',
    name: 'Hikvision DeepinView 4K AI Auto-Tracking PTZ Surveillance Camera',
    nameAm: 'Hikvision DeepinView 4K AI አውቶ-ትራኪንግ PTZ የደህንነት ካሜራ',
    category: 'SECURITY',
    categoryLabel: 'Security & Cyber Defense',
    categoryLabelAm: 'ደህንነት እና የሳይበር ጥበቃ',
    brand: 'HIKVISION',
    image: '/images/lucycom/product-ai-ptz-camera.jpg',
    badge: 'Neural AI',
    badgeAm: 'የላቀ AI',
    shortDesc: 'High-speed 4K PTZ dome camera featuring 42x optical zoom, real-time facial recognition, license plate capture, and long-range laser IR.',
    shortDescAm: 'ባለ 42x ኦፕቲካል ማጉያ ያለው፣ ፊትና ታርጋ የሚለይ እና እስከ 300 ሜትር በጨለማ የሚያሳይ 4K PTZ ካሜራ።',
    specs: [
      'Resolution: 8MP / 4K UHD @ 30fps with DarkFighter technology',
      'Optical Zoom: 42x optical, 16x digital zoom lens',
      'IR Distance: Up to 300 meters smart adaptive infrared',
      'Deep learning perimeter defense with vehicle & human classification'
    ],
    specsAm: [
      'ጥራት፡ 8 ሜጋፒክሰል / 4K UHD በDarkFighter ቴክኖሎጂ',
      'ማጉላት፡ ባለ 42x ኦፕቲካል እና ባለ 16x ዲጂታል ማጉያ',
      'የኢንፍራሬድ ርቀት፡ በጨለማ እስከ 300 ሜትር የማየት አቅም',
      'ሰዎችንና ተሽከርካሪዎችን ለይቶ የማወቅ ጥልቅ AI ትንተና'
    ],
    contactService: 'Enterprise Security',
  },
  {
    id: 'prod-10',
    name: 'Dahua 64-Channel Ultra-HD Enterprise Network Video Recorder (NVR)',
    nameAm: 'Dahua 64-ቻናል Ultra-HD የድርጅት ቪዲዮ መቅረጫ (NVR)',
    category: 'SECURITY',
    categoryLabel: 'Security & Cyber Defense',
    categoryLabelAm: 'ደህንነት እና የሳይበር ጥበቃ',
    brand: 'DAHUA',
    image: '/images/lucycom/product-enterprise-nvr.jpg',
    badge: 'Enterprise VMS',
    badgeAm: 'የድርጅት ደረጃ',
    shortDesc: 'Carrier-scale enterprise NVR capable of managing 64 IP camera streams with RAID 5/6 storage redundancy and instant AI search.',
    shortDescAm: '64 ካሜራዎችን በአንድ ጊዜ የሚቀዳ፣ የሃርድ ድራይቭ ድግግሞሽ ጥበቃ ያለው እና ፈጣን የAI ፍለጋ ያለው NVR።',
    specs: [
      'Channels: 64 IP camera inputs up to 32MP resolution each',
      'Bandwidth: 384Mbps incoming / 384Mbps recording',
      'Storage: 8 SATA HDDs up to 128TB with hot-swap RAID 0/1/5/6/10',
      'Smart Search: Face recognition, vehicle attribute, and heat map'
    ],
    specsAm: [
      'የካሜራ ብዛት፡ 64 ካሜራዎች እስከ 32MP ጥራት',
      'የመረጃ ፍጥነት፡ 384Mbps የመቅዳት ፍጥነት',
      'ማከማቻ፡ 8 ሃርድ ድራይቮች እስከ 128TB በRAID ጥበቃ',
      'ዘመናዊ ፍለጋ፡ የፊት መለያ፣ የተሽከርካሪ ቀለምና ታርጋ ፍለጋ'
    ],
    contactService: 'Enterprise Security',
  },
  {
    id: 'prod-11',
    name: 'Cummins / Perkins Heavy-Duty Industrial Diesel Generator Set',
    nameAm: 'Cummins / Perkins ከባድ ኢንዱስትሪያል የዲዝል ጀነሬተር',
    category: 'POWER',
    categoryLabel: 'Electromechanical & Power',
    categoryLabelAm: 'ኤሌክትሮሜካኒካል እና ሃይል',
    brand: 'CUMMINS / PERKINS',
    image: '/images/lucycom/product-industrial-generator.jpg',
    badge: 'Continuous Duty',
    badgeAm: 'ቀጣይነት ያለው ሃይል',
    shortDesc: 'Turnkey industrial prime power diesel generator sets with automatic transfer switch (ATS), sound attenuation, and remote telemetry.',
    shortDescAm: 'የመብራት መቋረጥን በቅጽበት ተክቶ የሚሰራ አውቶሜትድ ATS ስዊች ያለው አስተማማኝ ከባድ ጀነሬተር።',
    specs: [
      'Power Rating: Available from 100kVA up to 1250kVA prime power',
      'Controller: Deep Sea Electronics (DSE) smart auto-start panel',
      'Acoustic Enclosure: Soundproof weather-resistant canopy (< 72dB @ 7m)',
      'Integrated heavy-duty ATS switch with 5-second automatic changeover'
    ],
    specsAm: [
      'የሃይል መጠን፡ ከ100kVA እስከ 1250kVA ቀጣይነት ያለው ሃይል',
      'መቆጣጠሪያ፡ Deep Sea Electronics (DSE) ስማርት አውቶ-ስታርት',
      'የድምጽ መከላከያ፡ ከባድ ዝናብና ድምጽ የሚከላከል ካኖፒ (< 72dB)',
      'አውቶሜትድ ATS ስዊች በ5 ሰከንድ ውስጥ ሃይል የሚያስተላልፍ'
    ],
    contactService: 'Electromechanical & Solar',
  },
];
