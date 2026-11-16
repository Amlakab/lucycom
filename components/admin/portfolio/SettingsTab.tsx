'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  Card,
  IconButton,
  CircularProgress,
  Alert,
  Snackbar,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Save,
  Refresh,
  Business,
  RocketLaunch,
  Handshake,
  SettingsInputAntenna,
  Star,
  Assessment,
  ContactPage,
  Search,
  CloudUpload,
  Close,
  Add,
  Delete,
  Language,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Info,
  OpenInNew,
  VerifiedUser,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import portfolioApi from '@/lib/api/portfolio';
import { useRouter } from 'next/navigation';

export interface Settings {
  company: {
    name: string;
    slogan: string;
    sloganAmharic: string;
    tin: string;
    capital: string;
    registrationNo: string;
    profileBrochureUrl: string;
  };
  hero: {
    title: string;
    titleAmharic?: string;
    subtitle: string;
    subtitleAmharic?: string;
    description: string;
    profileImages: string[];
    profileImagesData?: any[];
    resumeUrl: string;
  };
  about: {
    title: string;
    description: string;
    vision?: string;
    mission?: string;
    image?: string;
    imageData?: any;
  };
  solutionsSection: {
    title: string;
    titleAmharic: string;
    subtitle: string;
    subtitleAmharic: string;
  };
  partnersSection: {
    title: string;
    titleAmharic: string;
    subtitle: string;
    subtitleAmharic: string;
  };
  whyChooseUs: {
    title: string;
    titleAmharic: string;
    subtitle: string;
    subtitleAmharic: string;
  };
  contact: {
    email: string;
    phone: string;
    alternatePhone?: string;
    location: string;
    workingHours?: string;
    socialLinks: { platform: string; url: string; icon: string }[];
  };
  stats: {
    projectsCompleted: number;
    happyClients: number;
    linesOfCode: number;
    yearsExperience: number;
    qualityPassRate?: number;
    slaSupport?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
}

const initialSettings: Settings = {
  company: {
    name: 'LUCYCOM TECHNOLOGIES S.C.',
    slogan: 'Lucy the origin, LucyCom the destination',
    sloganAmharic: 'ሉሲ መገኛ፣ ሉሲኮም መዳረሻ',
    tin: '',
    capital: '',
    registrationNo: 'AACATB/14/672/50644211/2019',
    profileBrochureUrl: '/documents/LUCYCOM_Company_Profile.pdf'
  },
  hero: {
    title: "Empowering Ethiopia's Digital Future.",
    titleAmharic: 'የኢትዮጵያን ዲጂታል ሽግግር በላቀ ቴክኖሎጂ እናጸናለን',
    subtitle: 'End-to-End ICT, Telecom & Data Center Solutions.',
    subtitleAmharic: 'የተሟላ የቴሌኮም፣ የዳታ ሴንተር እና የዘመናዊ ቴክኖሎጂ ግንባታ መፍትሄዎች',
    description: 'LUCYCOM TECHNOLOGIES S.C. is an Ethiopian share company dedicated to designing, supplying, and supporting resilient, scalable, and international standards-compliant ICT infrastructure.',
    profileImages: [],
    profileImagesData: [],
    resumeUrl: '/documents/LUCYCOM_Company_Profile.pdf'
  },
  about: {
    title: 'About LUCYCOM TECHNOLOGIES S.C.',
    description: 'LUCYCOM TECHNOLOGIES S.C. is a premier Ethiopian share company dedicated to designing, supplying, installing, and supporting end-to-end ICT infrastructure solutions across civil infrastructure, telecom tower erection, Tier-standard data centers, smart classrooms, and cloud-ready Virtual Desktop Infrastructure (VDI).',
    vision: 'To be the leading ICT infrastructure & digital engineering pioneer in East Africa.',
    mission: 'Delivering resilient, world-class turnkey engineering solutions that empower Ethiopian institutions.',
    image: ''
  },
  solutionsSection: {
    title: 'Enterprise ICT & Turnkey Infrastructure Solutions',
    titleAmharic: 'የላቀ የቴሌኮም፣ ዳታ ሴንተር እና አይሲቲ መፍትሄዎች',
    subtitle: 'End-to-end design, deployment, and SLA maintenance across 6 mission-critical technology domains.',
    subtitleAmharic: 'በቴሌኮም፣ ዳታ ሴንተር፣ ስማርት ትምህርት፣ ሳይበር ደህንነት እና ኤሌክትሮ መካኒካል የተሟላ አገልግሎት'
  },
  partnersSection: {
    title: 'Global Technology Partners & OEM Alliances',
    titleAmharic: 'ዓለም አቀፍ የቴክኖሎጂ አጋሮቻችን እና አምራቾች',
    subtitle: 'Direct tier-1 integration and certified deployment with industry-leading telecommunications, data center, and security manufacturers.',
    subtitleAmharic: 'ከዓለም ታዋቂ የቴክኖሎጂ አምራቾች ጋር በመተባበር ደረጃቸውን የጠበቁ መፍትሄዎችን እናቀርባለን'
  },
  whyChooseUs: {
    title: 'Why Leading Ethiopian Enterprises Choose Lucycom',
    titleAmharic: 'ተቋማት ለምን ሉሲኮም ቴክኖሎጂስን ይመርጣሉ?',
    subtitle: 'Pairing certified local engineering capabilities with international standards and direct OEM partnerships.',
    subtitleAmharic: 'የተረጋገጠ የአገር ውስጥ የምህንድስና ብቃት ከዓለም አቀፍ የጥራት ደረጃዎች ጋር በማጣመር'
  },
  contact: {
    email: 'info@lucycomtechnologies.com',
    phone: '+251 939997612',
    alternatePhone: '+251 118220000',
    location: 'Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia',
    workingHours: 'Monday - Saturday: 8:30 AM - 5:30 PM (24/7 On-Call Technical Support)',
    socialLinks: [
      { platform: 'Website', url: 'https://www.lucycomtechnologies.com', icon: 'Language' },
      { platform: 'LinkedIn', url: 'https://www.linkedin.com/company/lucycom-technologies', icon: 'LinkedIn' },
      { platform: 'Email', url: 'mailto:info@lucycomtechnologies.com', icon: 'Email' }
    ]
  },
  stats: {
    projectsCompleted: 120,
    happyClients: 45,
    linesOfCode: 250,
    yearsExperience: 8,
    qualityPassRate: 99.8,
    slaSupport: '24/7'
  },
  seo: {
    title: 'LUCYCOM TECHNOLOGIES S.C. | ICT & Telecom Infrastructure',
    description: "Official portal of LUCYCOM TECHNOLOGIES S.C. - Empowering Ethiopia's Digital Future.",
    keywords: ['LUCYCOM', 'Telecom', 'Data Center', 'Smart Education', 'Ethiopia', 'AI CCTV'],
    ogImage: ''
  },
};

const getImageUrl = (item: any): string | null => {
  if (!item) return null;
  if (item.imageData) {
    let base64 = '';
    if (typeof item.imageData.data === 'string') {
      base64 = item.imageData.data;
    } else if (item.imageData.data?.$binary?.base64) {
      base64 = item.imageData.data.$binary.base64;
    } else if (item.imageData.data?.data) {
      try {
        if (typeof item.imageData.data.data === 'string') {
          base64 = item.imageData.data.data;
        } else if (Array.isArray(item.imageData.data.data)) {
          base64 = Buffer.from(item.imageData.data.data).toString('base64');
        }
      } catch (e) {
        console.error('Error converting imageData to base64:', e);
      }
    }
    if (base64) {
      const contentType = item.imageData.contentType || 'image/jpeg';
      return `data:${contentType};base64,${base64}`;
    }
  }
  if (item.image?.startsWith('data:image')) return item.image;
  return item.image || null;
};

const getProfileImageUrl = (img: any): string | null => {
  if (!img) return null;
  if (typeof img === 'string') return img;
  if (img.imageData) {
    let base64 = '';
    if (typeof img.imageData.data === 'string') {
      base64 = img.imageData.data;
    } else if (img.imageData.data?.$binary?.base64) {
      base64 = img.imageData.data.$binary.base64;
    } else if (img.imageData.data?.data) {
      try {
        if (typeof img.imageData.data.data === 'string') {
          base64 = img.imageData.data.data;
        } else if (Array.isArray(img.imageData.data.data)) {
          base64 = Buffer.from(img.imageData.data.data).toString('base64');
        }
      } catch (e) {
        console.error('Error converting profile image to base64:', e);
      }
    }
    if (base64) {
      const contentType = img.imageData.contentType || 'image/jpeg';
      return `data:${contentType};base64,${base64}`;
    }
  }
  return null;
};

interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  subtitle?: string;
  badge?: string;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard = ({ title, icon, subtitle, badge, actionButton, children }: SectionCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3.5 },
        mb: 3,
        borderRadius: 3,
        backgroundColor: isDark ? '#112240' : '#FFFFFF',
        border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
        boxShadow: isDark
          ? '0 4px 20px -2px rgba(0, 0, 0, 0.4)'
          : '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
          mb: 3,
          pb: 2,
          borderBottom: `1px solid ${isDark ? '#1e293b' : '#f1f5f9'}`,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isDark ? 'rgba(37, 99, 235, 0.15)' : 'rgba(37, 99, 235, 0.1)',
                color: '#2563EB',
              }}
            >
              {icon}
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '1rem', sm: '1.15rem' },
                color: isDark ? '#F8FAFC' : '#0F172A',
                letterSpacing: '-0.01em',
              }}
            >
              {title}
            </Typography>
            {badge && (
              <Chip
                label={badge}
                size="small"
                sx={{
                  height: 22,
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  backgroundColor: isDark ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.1)',
                  color: '#0EA5E9',
                  border: `1px solid ${isDark ? 'rgba(14, 165, 233, 0.3)' : 'rgba(14, 165, 233, 0.2)'}`,
                }}
              />
            )}
          </Box>
          {subtitle && (
            <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mt: 0.5, fontSize: '0.825rem' }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {actionButton}
      </Box>
      {children}
    </Paper>
  );
};

export default function SettingsTab() {
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Image states
  const [aboutImage, setAboutImage] = useState<File | null>(null);
  const [aboutImagePreview, setAboutImagePreview] = useState<string | null>(null);
  const [existingAboutImage, setExistingAboutImage] = useState<string | null>(null);
  const [removedAboutImage, setRemovedAboutImage] = useState(false);

  const [profileImages, setProfileImages] = useState<File[]>([]);
  const [profileImagePreviews, setProfileImagePreviews] = useState<string[]>([]);
  const [existingProfileImages, setExistingProfileImages] = useState<string[]>([]);
  const [removedProfileImages, setRemovedProfileImages] = useState<number[]>([]);

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      color: isDark ? '#F8FAFC' : '#0F172A',
      backgroundColor: isDark ? '#0a192f' : '#f8fafc',
      borderRadius: 2,
      '& fieldset': { borderColor: isDark ? '#334155' : '#e2e8f0' },
      '&:hover fieldset': { borderColor: '#2563EB' },
      '&.Mui-focused fieldset': { borderColor: '#2563EB', borderWidth: '1.5px' },
    },
    '& .MuiInputLabel-root': { color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.85rem' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#2563EB' },
    '& .MuiFormHelperText-root': { color: isDark ? '#64748B' : '#94A3B8', fontSize: '0.75rem' },
  };

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true);
      const res = await portfolioApi.getSettingsAdmin();
      const data = res.data?.data || res.data;

      if (data) {
        setSettings({
          company: { ...initialSettings.company, ...(data.company || {}) },
          hero: { ...initialSettings.hero, ...(data.hero || {}) },
          about: { ...initialSettings.about, ...(data.about || {}) },
          solutionsSection: { ...initialSettings.solutionsSection, ...(data.solutionsSection || {}) },
          partnersSection: { ...initialSettings.partnersSection, ...(data.partnersSection || {}) },
          whyChooseUs: { ...initialSettings.whyChooseUs, ...(data.whyChooseUs || {}) },
          contact: { ...initialSettings.contact, ...(data.contact || {}) },
          stats: { ...initialSettings.stats, ...(data.stats || {}) },
          seo: { ...initialSettings.seo, ...(data.seo || {}) },
        });

        if (data.about?.imageData) {
          const preview = getImageUrl({ imageData: data.about.imageData });
          if (preview) {
            setExistingAboutImage(preview);
            setAboutImagePreview(preview);
          }
        } else if (data.about?.image) {
          const preview = getImageUrl({ image: data.about.image });
          if (preview) {
            setExistingAboutImage(preview);
            setAboutImagePreview(preview);
          }
        }

        if (data.hero?.profileImagesData && data.hero.profileImagesData.length > 0) {
          const previews = data.hero.profileImagesData
            .map((img: any) => getProfileImageUrl({ imageData: img }))
            .filter((p: string | null) => p !== null);
          setExistingProfileImages(previews);
          setProfileImagePreviews(previews);
        } else if (data.hero?.profileImages && data.hero.profileImages.length > 0) {
          const previews = data.hero.profileImages
            .map((img: string) => getProfileImageUrl(img))
            .filter((p: string | null) => p !== null);
          setExistingProfileImages(previews);
          setProfileImagePreviews(previews);
        }
      }
    } catch (err: any) {
      console.error('❌ Failed to load settings:', err);
      setError(err.response?.data?.message || 'Failed to load settings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleChange = (section: keyof Settings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value },
    }));
  };

  const handleSocialLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...settings.contact.socialLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setSettings((prev) => ({ ...prev, contact: { ...prev.contact, socialLinks: newLinks } }));
  };

  const addSocialLink = () => {
    setSettings((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: [...prev.contact.socialLinks, { platform: '', url: '', icon: 'Language' }],
      },
    }));
  };

  const removeSocialLink = (index: number) => {
    setSettings((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        socialLinks: prev.contact.socialLinks.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAboutImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('About image size must be less than 5MB');
        return;
      }
      setAboutImage(file);
      setAboutImagePreview(URL.createObjectURL(file));
      setRemovedAboutImage(false);
    }
  };

  const removeAboutImage = () => {
    setAboutImage(null);
    setAboutImagePreview(null);
    setExistingAboutImage(null);
    setRemovedAboutImage(true);
  };

  const handleProfileImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Each profile image must be less than 5MB');
        return;
      }
    }

    const currentTotal = profileImagePreviews.length;
    if (currentTotal + files.length > 5) {
      setError('You can have at most 5 banner images');
      return;
    }

    setProfileImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setProfileImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeProfileImage = (index: number) => {
    const existingCount = existingProfileImages.length;
    if (index < existingCount) {
      setRemovedProfileImages((prev) => [...prev, index]);
      setExistingProfileImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingCount;
      setProfileImages((prev) => prev.filter((_, i) => i !== newIndex));
    }
    setProfileImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      setError('');

      const fd = new FormData();

      const heroData = {
        ...settings.hero,
        profileImagesData: undefined,
      };

      const aboutData = {
        ...settings.about,
        imageData: undefined,
      };

      fd.append('company', JSON.stringify(settings.company));
      fd.append('hero', JSON.stringify(heroData));
      fd.append('about', JSON.stringify(aboutData));
      fd.append('solutionsSection', JSON.stringify(settings.solutionsSection));
      fd.append('partnersSection', JSON.stringify(settings.partnersSection));
      fd.append('whyChooseUs', JSON.stringify(settings.whyChooseUs));
      fd.append('contact', JSON.stringify(settings.contact));
      fd.append('stats', JSON.stringify(settings.stats));
      fd.append('seo', JSON.stringify(settings.seo));

      if (aboutImage) {
        fd.append('aboutImage', aboutImage);
      }
      if (removedAboutImage) {
        fd.append('removeAboutImage', 'true');
      }

      profileImages.forEach((file) => {
        fd.append('profileImages', file);
      });

      if (removedProfileImages.length > 0) {
        fd.append('removedProfileImages', JSON.stringify(removedProfileImages));
      }

      await portfolioApi.updateSettings(fd);

      setSuccess('All website settings and content synchronized successfully!');
      setAboutImage(null);
      setProfileImages([]);
      setRemovedProfileImages([]);
      setRemovedAboutImage(false);
      await fetchSettings();
    } catch (err: any) {
      console.error('❌ Failed to update settings:', err);
      setError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}>
        <CircularProgress sx={{ color: '#2563EB' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ pb: 6 }}>
      {/* Top Action Bar */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3,
            p: 2.5,
            borderRadius: 3,
            backgroundColor: isDark ? '#112240' : '#FFFFFF',
            border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#F8FAFC' : '#0F172A' }}>
              Public Website Content & Configuration
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.825rem' }}>
              Configure hero slides, solutions showcase, OEM partners, corporate credentials, and contact info displayed on the public pages.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Refresh />}
              onClick={fetchSettings}
              disabled={saving}
              sx={{
                borderRadius: 2,
                borderColor: isDark ? '#334155' : '#cbd5e1',
                color: isDark ? '#94A3B8' : '#64748B',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#2563EB',
                  color: '#2563EB',
                },
              }}
            >
              Reload
            </Button>
            <Button
              variant="contained"
              size="small"
              startIcon={saving ? <CircularProgress size={16} color="inherit" /> : <Save />}
              onClick={handleSubmit}
              disabled={saving}
              sx={{
                borderRadius: 2,
                backgroundColor: '#2563EB',
                color: '#fff',
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                '&:hover': { backgroundColor: '#1d4ed8' },
              }}
            >
              {saving ? 'Synchronizing...' : 'Save All Changes'}
            </Button>
          </Box>
        </Box>
      </motion.div>

      {/* Alerts */}
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
        <Alert severity="error" onClose={() => setError('')} sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => setSuccess('')}>
        <Alert severity="success" onClose={() => setSuccess('')} sx={{ borderRadius: 2 }}>
          {success}
        </Alert>
      </Snackbar>

      {/* SECTION 1: CORPORATE IDENTITY & LEGAL */}
      <SectionCard
        title="Corporate Legal Identity & Slogan"
        icon={<Business />}
        subtitle="Configures the official company name, official slogan, and business registration details displayed across Navbar and Footer."
        badge="Header & Footer"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Corporate Legal Entity Name"
            value={settings.company?.name || ''}
            onChange={(e) => handleChange('company', 'name', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. LUCYCOM TECHNOLOGIES S.C."
          />
          <TextField
            fullWidth
            label="Taxpayer Identification Number (TIN)"
            value={settings.company?.tin || ''}
            onChange={(e) => handleChange('company', 'tin', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. Tax identification number"
          />
          <TextField
            fullWidth
            label="Official Slogan (English)"
            value={settings.company?.slogan || ''}
            onChange={(e) => handleChange('company', 'slogan', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="Appears on hero badges and footer"
          />
          <TextField
            fullWidth
            label="Official Slogan (Amharic)"
            value={settings.company?.sloganAmharic || ''}
            onChange={(e) => handleChange('company', 'sloganAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. ሉሲ መገኛ፣ ሉሲኮም መዳረሻ"
          />
          <TextField
            fullWidth
            label="Registered Share Capital"
            value={settings.company?.capital || ''}
            onChange={(e) => handleChange('company', 'capital', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. Authorized Share Capital"
          />
          <TextField
            fullWidth
            label="Corporate Brochure PDF Document URL"
            value={settings.company?.profileBrochureUrl || ''}
            onChange={(e) => {
              handleChange('company', 'profileBrochureUrl', e.target.value);
              handleChange('hero', 'resumeUrl', e.target.value);
            }}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. /documents/LUCYCOM_Company_Profile.pdf"
          />
        </Box>
      </SectionCard>

      {/* SECTION 2: HERO & LANDING BANNER */}
      <SectionCard
        title="Homepage Hero Banner & Slide Content"
        icon={<RocketLaunch />}
        subtitle="Configures the main headlines, introductory description, and banner images for the landing carousel."
        badge="Homepage Top"
      >
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5, color: isDark ? '#94A3B8' : '#64748B', fontWeight: 600 }}>
            Hero Banner Images ({profileImagePreviews.length})
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {profileImagePreviews.map((preview, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  width: 120,
                  height: 80,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: `2px solid ${isDark ? '#334155' : '#e2e8f0'}`,
                }}
              >
                <img
                  src={preview}
                  alt={`Hero Banner ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/logo.png';
                  }}
                />
                <IconButton
                  size="small"
                  onClick={() => removeProfileImage(index)}
                  sx={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    '&:hover': { backgroundColor: 'rgba(239,68,68,0.9)' },
                    padding: '3px',
                  }}
                >
                  <Close sx={{ fontSize: 14, color: '#fff' }} />
                </IconButton>
              </Box>
            ))}
            <Box
              sx={{
                width: 120,
                height: 80,
                borderRadius: 2,
                border: `2px dashed ${isDark ? '#334155' : '#cbd5e1'}`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#2563EB',
                  backgroundColor: isDark ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                },
              }}
              onClick={() => document.getElementById('hero-banner-images')?.click()}
            >
              <CloudUpload sx={{ fontSize: 24, color: '#2563EB', mb: 0.5 }} />
              <Typography variant="caption" sx={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.7rem' }}>
                Add Banner
              </Typography>
            </Box>
            <input
              id="hero-banner-images"
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={handleProfileImagesChange}
            />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Hero Title (English)"
            value={settings.hero.title}
            onChange={(e) => handleChange('hero', 'title', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Hero Title (Amharic)"
            value={settings.hero.titleAmharic || ''}
            onChange={(e) => handleChange('hero', 'titleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Hero Subtitle (English)"
            value={settings.hero.subtitle}
            onChange={(e) => handleChange('hero', 'subtitle', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Hero Subtitle (Amharic)"
            value={settings.hero.subtitleAmharic || ''}
            onChange={(e) => handleChange('hero', 'subtitleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
            <TextField
              fullWidth
              label="Hero Executive Description"
              value={settings.hero.description}
              onChange={(e) => handleChange('hero', 'description', e.target.value)}
              size="small"
              sx={textFieldStyle}
              multiline
              rows={2}
            />
          </Box>
        </Box>
      </SectionCard>

      {/* SECTION 3: SOLUTIONS SHOWCASE CONTENT */}
      <SectionCard
        title="Solutions & Capabilities Section Settings"
        icon={<SettingsInputAntenna />}
        subtitle="Controls the title and descriptive caption displayed above the Solutions grid on the homepage and solutions page."
        badge="Homepage Section 3"
        actionButton={
          <Button
            size="small"
            variant="text"
            endIcon={<OpenInNew sx={{ fontSize: '1rem !important' }} />}
            onClick={() => router.push('/admin?tab=solutions')}
            sx={{
              color: '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
            }}
          >
            Manage Solutions Catalog
          </Button>
        }
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Solutions Section Heading (English)"
            value={settings.solutionsSection?.title || ''}
            onChange={(e) => handleChange('solutionsSection', 'title', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. Enterprise ICT & Turnkey Infrastructure Solutions"
          />
          <TextField
            fullWidth
            label="Solutions Section Heading (Amharic)"
            value={settings.solutionsSection?.titleAmharic || ''}
            onChange={(e) => handleChange('solutionsSection', 'titleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. የላቀ የቴሌኮም፣ ዳታ ሴንተር እና አይሲቲ መፍትሄዎች"
          />
          <TextField
            fullWidth
            label="Solutions Section Subtitle (English)"
            value={settings.solutionsSection?.subtitle || ''}
            onChange={(e) => handleChange('solutionsSection', 'subtitle', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Solutions Section Subtitle (Amharic)"
            value={settings.solutionsSection?.subtitleAmharic || ''}
            onChange={(e) => handleChange('solutionsSection', 'subtitleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={2}
          />
        </Box>
      </SectionCard>

      {/* SECTION 4: PARTNERS & OEM ECOSYSTEM CONTENT */}
      <SectionCard
        title="Technology Partners & OEM Section Settings"
        icon={<Handshake />}
        subtitle="Controls the heading and descriptions for the Global Technology Partners section displayed on the homepage and partners page."
        badge="Homepage Section 6"
        actionButton={
          <Button
            size="small"
            variant="text"
            endIcon={<OpenInNew sx={{ fontSize: '1rem !important' }} />}
            onClick={() => router.push('/admin?tab=partners')}
            sx={{
              color: '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.825rem',
            }}
          >
            Manage Partner Logos & OEM Tiers
          </Button>
        }
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Partners Section Heading (English)"
            value={settings.partnersSection?.title || ''}
            onChange={(e) => handleChange('partnersSection', 'title', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. Global Technology Partners & OEM Alliances"
          />
          <TextField
            fullWidth
            label="Partners Section Heading (Amharic)"
            value={settings.partnersSection?.titleAmharic || ''}
            onChange={(e) => handleChange('partnersSection', 'titleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. ዓለም አቀፍ የቴክኖሎጂ አጋሮቻችን እና አምራቾች"
          />
          <TextField
            fullWidth
            label="Partners Section Subtitle (English)"
            value={settings.partnersSection?.subtitle || ''}
            onChange={(e) => handleChange('partnersSection', 'subtitle', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Partners Section Subtitle (Amharic)"
            value={settings.partnersSection?.subtitleAmharic || ''}
            onChange={(e) => handleChange('partnersSection', 'subtitleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={2}
          />
        </Box>
      </SectionCard>

      {/* SECTION 5: WHY CHOOSE LUCYCOM */}
      <SectionCard
        title="Value Propositions ('Why Choose Lucycom')"
        icon={<Star />}
        subtitle="Controls the title and introduction of the 4 value pillars displayed on the homepage."
        badge="Homepage Section 5"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Section Heading (English)"
            value={settings.whyChooseUs?.title || ''}
            onChange={(e) => handleChange('whyChooseUs', 'title', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. Why Leading Ethiopian Enterprises Choose Lucycom"
          />
          <TextField
            fullWidth
            label="Section Heading (Amharic)"
            value={settings.whyChooseUs?.titleAmharic || ''}
            onChange={(e) => handleChange('whyChooseUs', 'titleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. ተቋማት ለምን ሉሲኮም ቴክኖሎጂስን ይመርጣሉ?"
          />
          <TextField
            fullWidth
            label="Section Subtitle (English)"
            value={settings.whyChooseUs?.subtitle || ''}
            onChange={(e) => handleChange('whyChooseUs', 'subtitle', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={2}
          />
          <TextField
            fullWidth
            label="Section Subtitle (Amharic)"
            value={settings.whyChooseUs?.subtitleAmharic || ''}
            onChange={(e) => handleChange('whyChooseUs', 'subtitleAmharic', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={2}
          />
        </Box>
      </SectionCard>

      {/* SECTION 6: CORPORATE IMPACT STATS */}
      <SectionCard
        title="Key Performance Indicators & Impact Counters"
        icon={<Assessment />}
        subtitle="Controls the verified numbers and metrics shown in the Impact Stats bar on the homepage."
        badge="Homepage Section 4"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Telecom Sites Built"
            type="number"
            value={settings.stats.projectsCompleted}
            onChange={(e) => handleChange('stats', 'projectsCompleted', Number(e.target.value))}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. 120+"
          />
          <TextField
            fullWidth
            label="Drive Test Quality Pass Rate (%)"
            type="number"
            value={settings.stats.qualityPassRate || 99.8}
            onChange={(e) => handleChange('stats', 'qualityPassRate', Number(e.target.value))}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. 99.8%"
          />
          <TextField
            fullWidth
            label="Enterprise & Govt Clients"
            type="number"
            value={settings.stats.happyClients}
            onChange={(e) => handleChange('stats', 'happyClients', Number(e.target.value))}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. 45+"
          />
          <TextField
            fullWidth
            label="Years of Industry Experience"
            type="number"
            value={settings.stats.yearsExperience}
            onChange={(e) => handleChange('stats', 'yearsExperience', Number(e.target.value))}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. 8+"
          />
          <TextField
            fullWidth
            label="Turnkey Deployments & Units"
            type="number"
            value={settings.stats.linesOfCode}
            onChange={(e) => handleChange('stats', 'linesOfCode', Number(e.target.value))}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. 250+"
          />
          <TextField
            fullWidth
            label="SLA Support Badge"
            value={settings.stats.slaSupport || '24/7'}
            onChange={(e) => handleChange('stats', 'slaSupport', e.target.value)}
            size="small"
            sx={textFieldStyle}
            helperText="e.g. 24/7"
          />
        </Box>
      </SectionCard>

      {/* SECTION 7: ABOUT PAGE & VISION / MISSION */}
      <SectionCard
        title="About Page & Corporate Vision"
        icon={<Info />}
        subtitle="Configures the corporate summary, long-term vision, and mission statement displayed on /about."
        badge="About Page"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box
              sx={{
                position: 'relative',
                width: 120,
                height: 120,
                borderRadius: 2,
                overflow: 'hidden',
                border: `2px dashed ${isDark ? '#334155' : '#cbd5e1'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  borderColor: '#2563EB',
                  backgroundColor: isDark ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.05)',
                },
              }}
              onClick={() => document.getElementById('about-image-input')?.click()}
            >
              {aboutImagePreview ? (
                <>
                  <img
                    src={aboutImagePreview}
                    alt="About"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/logo.png';
                    }}
                  />
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeAboutImage();
                    }}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      '&:hover': { backgroundColor: 'rgba(239,68,68,0.9)' },
                      padding: '4px',
                    }}
                  >
                    <Close sx={{ fontSize: 16, color: '#fff' }} />
                  </IconButton>
                </>
              ) : (
                <CloudUpload sx={{ fontSize: 36, color: '#2563EB' }} />
              )}
            </Box>
            <input id="about-image-input" type="file" hidden accept="image/*" onChange={handleAboutImageChange} />
            <Box>
              <Typography variant="caption" sx={{ color: isDark ? '#94A3B8' : '#64748B', display: 'block' }}>
                Upload Corporate Facility or HQ photo (Max 5MB)
              </Typography>
              {existingAboutImage && !aboutImage && !removedAboutImage && (
                <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 600 }}>
                  Current image active
                </Typography>
              )}
            </Box>
          </Box>

          <TextField
            fullWidth
            label="About Page Heading"
            value={settings.about.title}
            onChange={(e) => handleChange('about', 'title', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="Corporate Background & Overview"
            value={settings.about.description}
            onChange={(e) => handleChange('about', 'description', e.target.value)}
            size="small"
            sx={textFieldStyle}
            multiline
            rows={3}
          />
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
            <TextField
              fullWidth
              label="Corporate Vision"
              value={settings.about.vision || ''}
              onChange={(e) => handleChange('about', 'vision', e.target.value)}
              size="small"
              sx={textFieldStyle}
              multiline
              rows={2}
            />
            <TextField
              fullWidth
              label="Corporate Mission"
              value={settings.about.mission || ''}
              onChange={(e) => handleChange('about', 'mission', e.target.value)}
              size="small"
              sx={textFieldStyle}
              multiline
              rows={2}
            />
          </Box>
        </Box>
      </SectionCard>

      {/* SECTION 8: CONTACT, HEADQUARTERS & DISPATCH */}
      <SectionCard
        title="Corporate Contact, Headquarters & Dispatch"
        icon={<ContactPage />}
        subtitle="Official email addresses, customer support lines, emergency dispatch, and physical location."
        badge="Contact & Footer"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Primary Corporate Email"
            value={settings.contact.email}
            onChange={(e) => handleChange('contact', 'email', e.target.value)}
            size="small"
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Email sx={{ mr: 1, color: '#2563EB', fontSize: '1.1rem' }} />,
            }}
          />
          <TextField
            fullWidth
            label="Primary Phone Line"
            value={settings.contact.phone}
            onChange={(e) => handleChange('contact', 'phone', e.target.value)}
            size="small"
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Phone sx={{ mr: 1, color: '#2563EB', fontSize: '1.1rem' }} />,
            }}
          />
          <TextField
            fullWidth
            label="Alternate Phone / Emergency Hotline"
            value={settings.contact.alternatePhone || ''}
            onChange={(e) => handleChange('contact', 'alternatePhone', e.target.value)}
            size="small"
            sx={textFieldStyle}
            InputProps={{
              startAdornment: <Phone sx={{ mr: 1, color: '#0EA5E9', fontSize: '1.1rem' }} />,
            }}
          />
          <TextField
            fullWidth
            label="Working Hours & SLA Dispatch"
            value={settings.contact.workingHours || ''}
            onChange={(e) => handleChange('contact', 'workingHours', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
            <TextField
              fullWidth
              label="Headquarters Physical Address"
              value={settings.contact.location}
              onChange={(e) => handleChange('contact', 'location', e.target.value)}
              size="small"
              sx={textFieldStyle}
              InputProps={{
                startAdornment: <LocationOn sx={{ mr: 1, color: '#2563EB', fontSize: '1.1rem' }} />,
              }}
              helperText="e.g. Yeka Sub-City, Woreda 08, House No. 158/406, Addis Ababa, Ethiopia"
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: isDark ? '#1e293b' : '#f1f5f9' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" sx={{ color: isDark ? '#F8FAFC' : '#0F172A', fontWeight: 700 }}>
            Social Channels & External Links
          </Typography>
          <Button
            startIcon={<Add />}
            onClick={addSocialLink}
            size="small"
            sx={{
              color: '#2563EB',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: '0.8rem',
            }}
          >
            Add Channel
          </Button>
        </Box>

        {settings.contact.socialLinks.map((link, index) => (
          <Card
            key={index}
            sx={{
              mb: 1.5,
              p: 2,
              borderRadius: 2,
              backgroundColor: isDark ? '#0a192f' : '#f8fafc',
              border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1.5fr 1fr auto' }, gap: 1.5, alignItems: 'center' }}>
              <TextField
                label="Platform"
                value={link.platform}
                onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                size="small"
                sx={textFieldStyle}
              />
              <TextField
                label="URL"
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                size="small"
                sx={textFieldStyle}
              />
              <TextField
                label="Icon Name"
                value={link.icon}
                onChange={(e) => handleSocialLinkChange(index, 'icon', e.target.value)}
                size="small"
                sx={textFieldStyle}
                helperText="e.g. LinkedIn, Language, Email"
              />
              <IconButton onClick={() => removeSocialLink(index)} sx={{ color: '#ef4444' }}>
                <Delete sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Card>
        ))}
      </SectionCard>

      {/* SECTION 9: SEO & METADATA */}
      <SectionCard
        title="Search Engine Optimization (SEO) & Social Graph"
        icon={<Search />}
        subtitle="Configures meta tags, keywords, and OpenGraph social previews for search engines."
        badge="Global Meta"
      >
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5 }}>
          <TextField
            fullWidth
            label="Meta Title Tag"
            value={settings.seo.title}
            onChange={(e) => handleChange('seo', 'title', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <TextField
            fullWidth
            label="OpenGraph Image URL"
            value={settings.seo.ogImage || ''}
            onChange={(e) => handleChange('seo', 'ogImage', e.target.value)}
            size="small"
            sx={textFieldStyle}
          />
          <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
            <TextField
              fullWidth
              label="Meta Description"
              value={settings.seo.description}
              onChange={(e) => handleChange('seo', 'description', e.target.value)}
              size="small"
              sx={textFieldStyle}
              multiline
              rows={2}
            />
          </Box>
          <Box sx={{ gridColumn: { xs: '1', sm: '1 / span 2' } }}>
            <TextField
              fullWidth
              label="Search Keywords (Comma Separated)"
              value={settings.seo.keywords.join(', ')}
              onChange={(e) =>
                handleChange(
                  'seo',
                  'keywords',
                  e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                )
              }
              size="small"
              sx={textFieldStyle}
              helperText="e.g. Lucycom Technologies, Telecom Ethiopia, Tier Data Center, Smart Classrooms, Solar Microgrid"
            />
          </Box>
        </Box>
      </SectionCard>

      {/* Bottom Save Bar */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 4,
          p: 2.5,
          borderRadius: 3,
          backgroundColor: isDark ? '#112240' : '#FFFFFF',
          border: `1px solid ${isDark ? '#1e293b' : '#e2e8f0'}`,
        }}
      >
        <Button
          variant="contained"
          size="medium"
          startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <Save />}
          onClick={handleSubmit}
          disabled={saving}
          sx={{
            px: 4,
            py: 1.25,
            borderRadius: 2,
            backgroundColor: '#2563EB',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
            '&:hover': { backgroundColor: '#1d4ed8' },
          }}
        >
          {saving ? 'Synchronizing Website...' : 'Save & Publish All Settings'}
        </Button>
      </Box>
    </Box>
  );
}
