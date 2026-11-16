'use client';

import { useState } from 'react';
import { Box, Tabs, Tab, Typography, useMediaQuery, Paper } from '@mui/material';
import { useTheme } from '@/lib/theme-context';
import SolutionsTab from '@/components/admin/portfolio/SolutionsTab';
import PartnersTab from '@/components/admin/portfolio/PartnersTab';
import ProjectsTab from '@/components/admin/portfolio/ProjectsTab';
import CertificationsTab from '@/components/admin/portfolio/CertificationsTab';
import TestimonialsTab from '@/components/admin/portfolio/TestimonialsTab';
import BlogTab from '@/components/admin/portfolio/BlogTab';
import SettingsTab from '@/components/admin/portfolio/SettingsTab';
import { 
  Folder, FormatQuote, Article, Settings,
  Dashboard, Handshake, SettingsInputAntenna, Verified
} from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function PortfolioAdminLegacy() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [activeTab, setActiveTab] = useState(0);
  const isDark = theme === 'dark';

  const tabs = [
    { label: 'Solutions', icon: <SettingsInputAntenna />, component: <SolutionsTab /> },
    { label: 'Partners', icon: <Handshake />, component: <PartnersTab /> },
    { label: 'Projects', icon: <Folder />, component: <ProjectsTab /> },
    { label: 'Certifications', icon: <Verified />, component: <CertificationsTab /> },
    { label: 'Testimonials', icon: <FormatQuote />, component: <TestimonialsTab /> },
    { label: 'News & Blog', icon: <Article />, component: <BlogTab /> },
    { label: 'Settings', icon: <Settings />, component: <SettingsTab /> },
  ];

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
          <Box sx={{ mb: 3 }}>
            <Typography 
              variant={isMobile ? "h5" : "h4"} 
              sx={{ 
                fontWeight: 900, 
                color: isDark ? '#E2E8F0' : '#0B132B',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5
              }}
            >
              <Dashboard sx={{ color: '#0066CC' }} />
              LUCYCOM Enterprise Operations
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mt: 0.5 }}>
              Enterprise Infrastructure, Partner Ecosystem, Solutions, and Regulatory Certifications
            </Typography>
          </Box>

          {/* Navigation Tabs */}
          <Box sx={{ borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0', mb: 3 }}>
            <Tabs 
              value={activeTab} 
              onChange={(_, v) => setActiveTab(v)} 
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{ 
                '& .MuiTab-root': { 
                  color: isDark ? '#94A3B8' : '#64748B', 
                  fontWeight: 600,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  minHeight: { xs: 48, sm: 54 },
                  textTransform: 'none',
                  '&.Mui-selected': { 
                    color: '#0066CC',
                    fontWeight: 800
                  }
                }, 
                '& .MuiTabs-indicator': { 
                  backgroundColor: '#0066CC',
                  height: 3,
                }
              }}
            >
              {tabs.map((tab, i) => (
                <Tab 
                  key={i} 
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ color: getIconColor(i) }}>{tab.icon}</Box>
                      <Typography variant="body2" sx={{ fontWeight: activeTab === i ? 800 : 500 }}>
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
        </Paper>
      </motion.div>
    </Box>
  );
}
