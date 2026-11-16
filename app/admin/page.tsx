'use client';

import { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, useMediaQuery, Paper } from '@mui/material';
import { useTheme } from '@/lib/theme-context';
import { useSearchParams, useRouter } from 'next/navigation';
import SolutionsTab from '@/components/admin/portfolio/SolutionsTab';
import ProductsTab from '@/components/admin/portfolio/ProductsTab';
import PartnersTab from '@/components/admin/portfolio/PartnersTab';
import ProjectsTab from '@/components/admin/portfolio/ProjectsTab';
import CertificationsTab from '@/components/admin/portfolio/CertificationsTab';
import TestimonialsTab from '@/components/admin/portfolio/TestimonialsTab';
import BlogTab from '@/components/admin/portfolio/BlogTab';
import SettingsTab from '@/components/admin/portfolio/SettingsTab';
import { 
  Folder, FormatQuote, Article, Settings,
  Dashboard, Handshake, SettingsInputAntenna, Verified, Category
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function PortfolioAdmin() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState(0);
  const isDark = theme === 'dark';

  const tabMap: { [key: string]: number } = {
    'solutions': 0,
    'products': 1,
    'projects': 2,
    'partners': 3,
    'licenses': 4,
    'certifications': 4,
    'news': 5,
    'blog': 5,
    'testimonials': 6,
    'settings': 7,
    // Fallbacks
    'experiences': 2,
    'educations': 2,
    'skills': 0,
  };

  const tabNames = ['solutions', 'products', 'projects', 'partners', 'licenses', 'news', 'testimonials', 'settings'];

  const tabs = [
    { label: 'Solutions', icon: <SettingsInputAntenna />, component: <SolutionsTab /> },
    { label: 'Products', icon: <Category />, component: <ProductsTab /> },
    { label: 'Projects', icon: <Folder />, component: <ProjectsTab /> },
    { label: 'Partners', icon: <Handshake />, component: <PartnersTab /> },
    { label: 'Licenses & Accreditations', icon: <Verified />, component: <CertificationsTab /> },
    { label: 'News & Press Releases', icon: <Article />, component: <BlogTab /> },
    { label: 'Testimonials', icon: <FormatQuote />, component: <TestimonialsTab /> },
    { label: 'Corporate Settings', icon: <Settings />, component: <SettingsTab /> },
  ];

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabMap[tabParam] !== undefined) {
      setActiveTab(tabMap[tabParam]);
    }
  }, [searchParams]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    const tabName = tabNames[newValue];
    router.push(`/admin?tab=${tabName}`, { scroll: false });
  };

  const getIconColor = (index: number) => {
    return activeTab === index ? '#0066CC' : (isDark ? '#94A3B8' : '#64748B');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: isDark ? '#0B132B' : '#F1F5F9', 
      p: { xs: 1, sm: 2, md: 3 }, 
      transition: 'background-color 0.3s ease' 
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ 
          p: { xs: 2, md: 3 }, 
          borderRadius: 3, 
          backgroundColor: isDark ? '#1C2541' : '#FFFFFF', 
          border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
          boxShadow: isDark 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.5)' 
            : '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.3s ease'
        }}>
          {/* Header */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between', 
            alignItems: { xs: 'flex-start', sm: 'center' },
            mb: 3,
            gap: 2
          }}>
            <Box>
              <Typography 
                variant={isMobile ? "h5" : "h4"} 
                sx={{ 
                  fontWeight: 900, 
                  color: isDark ? '#E2E8F0' : '#0B132B',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  letterSpacing: '-0.02em'
                }}
              >
                <Dashboard sx={{ color: '#0066CC', fontSize: { xs: 28, sm: 36 } }} />
                LUCYCOM TECHNOLOGIES S.C.
              </Typography>
              <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mt: 0.5 }}>
                Executive Content & Enterprise Infrastructure Management Portal
              </Typography>
            </Box>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ 
            borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
            mb: 3
          }}>
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange} 
              variant={isMobile ? 'scrollable' : 'scrollable'} 
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ 
                '& .MuiTab-root': { 
                  color: isDark ? '#94A3B8' : '#64748B', 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  minHeight: { xs: 48, sm: 54 },
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: '#0066CC',
                    backgroundColor: isDark ? 'rgba(0, 102, 204, 0.08)' : 'rgba(0, 102, 204, 0.04)',
                  },
                  '&.Mui-selected': { 
                    color: '#0066CC',
                    fontWeight: 800
                  }
                }, 
                '& .MuiTabs-indicator': { 
                  backgroundColor: '#0066CC',
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                },
                '& .MuiTabs-scrollButtons': {
                  color: isDark ? '#94A3B8' : '#64748B',
                }
              }}
            >
              {tabs.map((tab, i) => (
                <Tab 
                  key={i} 
                  label={
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 1,
                    }}>
                      <Box sx={{ 
                        color: getIconColor(i),
                        display: 'flex',
                        alignItems: 'center',
                        '& svg': {
                          fontSize: { xs: '1.1rem', sm: '1.25rem' }
                        }
                      }}>
                        {tab.icon}
                      </Box>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: activeTab === i ? 800 : 500,
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {tab.label}
                      </Typography>
                    </Box>
                  }
                />
              ))}
            </Tabs>
          </Box>

          {/* Active Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Box sx={{ mt: 2 }}>
              {tabs[activeTab].component}
            </Box>
          </motion.div>

          {/* Footer Bar */}
          <Box sx={{ 
            mt: 4,
            pt: 3,
            borderTop: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}>
            <Typography variant="caption" sx={{ color: isDark ? '#94A3B8' : '#64748B' }}>
              LUCYCOM TECHNOLOGIES S.C. Portal v2.0 • Addis Ababa, Ethiopia
            </Typography>
            <Typography variant="caption" sx={{ color: '#0EA5E9', fontWeight: 600 }}>
              Carrier-Grade ICT & Telecom Infrastructure • ECA & EEA Certified
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
