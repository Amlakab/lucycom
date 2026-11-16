'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Chip, Alert, Snackbar, CircularProgress, 
  Pagination, TextField, IconButton, Switch, Dialog, DialogTitle, 
  DialogContent, DialogActions, Button, Stack, useMediaQuery,
  Card, CardContent, Avatar, Divider, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { 
  Add, Edit, Delete, CloudUpload, Visibility, VisibilityOff,
  ExpandMore, ExpandLess, Email, Phone, CalendarToday,
  Category, Tag, Description, Article, Person, AccessTime,
  Search, Refresh, FilterList, Newspaper
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import portfolioApi from '@/lib/api/portfolio';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  imageData?: any;
  category: string;
  tags: string[];
  published: boolean;
  views: number;
  publishedAt?: string;
  created_at: string;
}

const NEWS_CATEGORIES = [
  'Telecom & 5G',
  'Data Center & Datacom',
  'Smart Education & VDI',
  'Enterprise Security & AI CCTV',
  'Power & Energy',
  'Corporate & Partnerships'
];

const LUCYCOM_DEFAULT_NEWS: BlogPost[] = [
  {
    _id: 'news-1',
    title: 'Lucycom S.C. Completes Turnkey 4G/5G LTE Infrastructure Across 120+ Telecom Sites',
    slug: 'lucycom-telecom-4g-5g-rollout-120-sites',
    category: 'Telecom & 5G',
    excerpt: 'Engineering teams celebrate the milestone completion of BTS base station installations, heavy mast erections up to 60m, and microwave alignments across regional clusters with a 99.8% quality pass rate.',
    content: 'LUCYCOM TECHNOLOGIES S.C. is proud to announce the formal completion and provisional handover of turnkey telecommunications infrastructure across more than 120 BTS sites for national network modernization. Key Technical Highlights: High-Altitude Mast Erection up to 60m, 4G/5G LTE SingleRAN Radio Commissioning, Microwave Transport Backhaul, and 99.8% first-pass RF Drive Test validation.',
    image: '/images/lucycom/news-telecom-5g-milestone.jpg',
    tags: ['Telecom', '4G/5G', 'Tower Erection', 'Drive Test'],
    published: true,
    views: 1240,
    publishedAt: '2026-02-20T00:00:00.000Z',
    created_at: '2026-02-20T00:00:00.000Z',
  },
  {
    _id: 'news-2',
    title: 'Lucycom Delivers High-Availability Modular Tier-III Data Center for Academic Campus',
    slug: 'lucycom-tier3-modular-datacenter-delivery',
    category: 'Data Center & Datacom',
    excerpt: 'The turnkey project features in-row precision CRAC cooling, modular N+1 online UPS, hot-aisle containment, and certified Cat6A / OM4 structured cabling.',
    content: 'Lucycom has officially commissioned a state-of-the-art Tier-III compliant modular data center facility designed to host critical institutional learning portals, student records, and digital library repositories. Features precision in-row CRAC cooling, N+1 modular UPS systems, and FM200 fire suppression.',
    image: '/images/lucycom/news-tier3-datacenter-delivery.jpg',
    tags: ['Data Center', 'Tier III', 'Cooling', 'UPS'],
    published: true,
    views: 980,
    publishedAt: '2026-02-08T00:00:00.000Z',
    created_at: '2026-02-08T00:00:00.000Z',
  },
  {
    _id: 'news-3',
    title: 'Transforming Higher Education: 150-Seat Virtual Desktop Infrastructure (VDI) Lab Handed Over',
    slug: 'smart-education-vdi-lab-handover',
    category: 'Smart Education & VDI',
    excerpt: 'Equipped with 4K interactive smart panels, OS-Easy cloud terminals, and high-density virtualization servers, slashing hardware maintenance overhead by 70%.',
    content: 'Lucycom engineering staff successfully completed the commissioning of modern smart classroom facilities and a 150-workstation Virtual Desktop Infrastructure (VDI) computer laboratory.',
    image: '/images/lucycom/solution-smart-classroom.jpg',
    tags: ['VDI', 'Smart Education', 'Interactive Panels'],
    published: true,
    views: 850,
    publishedAt: '2026-01-28T00:00:00.000Z',
    created_at: '2026-01-28T00:00:00.000Z',
  },
  {
    _id: 'news-4',
    title: 'AI-Powered Video Surveillance and Smart Perimeter Security Deployed for Multi-Facility Complex',
    slug: 'enterprise-ai-cctv-perimeter-defense',
    category: 'Enterprise Security & AI CCTV',
    excerpt: 'Over 250 AI-enabled IP cameras integrated with high-definition video wall control rooms, automated license plate recognition (ANPR), and perimeter tripwires.',
    content: 'Lucycom turnkey electronic security division deployed high-definition AI-based video surveillance across an expansive governmental facility compound.',
    image: '/images/lucycom/solution-security-cctv.jpg',
    tags: ['AI CCTV', 'Perimeter Security', 'VMS Command Room'],
    published: true,
    views: 740,
    publishedAt: '2026-01-15T00:00:00.000Z',
    created_at: '2026-01-15T00:00:00.000Z',
  },
  {
    _id: 'news-5',
    title: 'Heavy-Duty Diesel Backup & Solar Microgrid Hybrid Commissioned for Industrial Facility',
    slug: 'electromechanical-diesel-solar-microgrid',
    category: 'Power & Energy',
    excerpt: 'Grade-5 electromechanical team delivers synchronized dual diesel generators and commercial solar PV microgrid with automated transfer switching (ATS).',
    content: 'Lucycom electro-mechanical engineering department successfully completed the delivery, installation, and load-bank stress testing of industrial backup power systems.',
    image: '/images/lucycom/solution-electromechanical-solar.jpg',
    tags: ['Generators', 'Solar Microgrid', 'ATS Panels'],
    published: true,
    views: 620,
    publishedAt: '2026-01-05T00:00:00.000Z',
    created_at: '2026-01-05T00:00:00.000Z',
  },
  {
    _id: 'news-6',
    title: 'Lucycom Signs Strategic Carrier Technology Partnership with Global Telecom OEMs',
    slug: 'lucycom-global-telecom-oem-partnership',
    category: 'Corporate & Partnerships',
    excerpt: 'Strengthens turnkey radio access network delivery, optical transport deployment, and certified enterprise hardware distribution.',
    content: 'Lucycom Technologies S.C. has formally formalized direct channel partnership and certified engineering integration agreements with tier-1 international OEMs.',
    image: '/images/lucycom/solution-ict-consultancy.jpg',
    tags: ['Partnership', 'Telecom OEMs', 'Enterprise Hardware'],
    published: true,
    views: 1110,
    publishedAt: '2025-12-22T00:00:00.000Z',
    created_at: '2025-12-22T00:00:00.000Z',
  },
];

const getImageUrl = (item: BlogPost): string | null => {
  if (item.imageData?.data) {
    let base64 = '';
    if (typeof item.imageData.data === 'string') base64 = item.imageData.data;
    else if (item.imageData.data?.$binary?.base64) base64 = item.imageData.data.$binary.base64;
    else if (item.imageData.data?.data) base64 = Buffer.from(item.imageData.data.data).toString('base64');
    if (base64) return `data:${item.imageData.contentType || 'image/jpeg'};base64,${base64}`;
  }
  if (item.image?.startsWith('data:image')) return item.image;
  return item.image || null;
};

export default function BlogTab() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isDark = theme === 'dark';

  const [items, setItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<BlogPost | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // View Dialog
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewItem, setViewItem] = useState<BlogPost | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    page: 1,
    limit: 10
  });
  
  const [formData, setFormData] = useState({
    title: '', slug: '', excerpt: '', content: '', category: '', tags: [] as string[], published: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Theme styles
  const themeStyles = {
    background: isDark 
      ? 'linear-gradient(135deg, #0a192f, #112240)' 
      : 'linear-gradient(135deg, #f0f0f0, #ffffff)',
    textColor: isDark ? '#ccd6f6' : '#333333',
    primaryColor: isDark ? '#00ffff' : '#007bff',
    borderColor: isDark ? '#00ffff' : '#007bff',
    surface: isDark ? '#1e293b' : '#ffffff',
    cardBg: isDark ? '#0f172a80' : '#ffffff',
    cardBorder: isDark ? '#334155' : '#e5e7eb',
    headerBg: isDark 
      ? 'linear-gradient(135deg, #00ffff, #00b3b3)' 
      : 'linear-gradient(135deg, #007bff, #0056b3)',
    hoverBg: isDark ? '#1e293b' : '#f8fafc',
    disabledBg: isDark ? '#334155' : '#e5e7eb',
    disabledText: isDark ? '#94a3b8' : '#94a3b8',
  };

  // Form field styles
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: isDark ? '#1e293b' : 'white',
      color: isDark ? '#ccd6f6' : '#333',
      '& fieldset': { borderColor: isDark ? '#334155' : '#e5e7eb' },
      '&:hover fieldset': { borderColor: isDark ? '#00ffff' : '#007bff' },
      '&.Mui-focused fieldset': { borderColor: isDark ? '#00ffff' : '#007bff' },
    },
    '& .MuiInputLabel-root': { color: isDark ? '#a8b2d1' : '#666' },
    '& .MuiInputLabel-root.Mui-focused': { color: isDark ? '#00ffff' : '#007bff' },
  };

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await portfolioApi.getBlogPostsAdmin({ 
        page: filters.page, 
        limit: filters.limit,
        search: filters.search,
        category: filters.category,
        status: filters.status
      });
      const list = res.data?.data?.data || res.data?.data || [];
      if (Array.isArray(list) && list.length > 0) {
        setItems(list);
        setPagination(res.data.data.pagination || { currentPage: 1, totalPages: 1, totalItems: list.length });
      } else {
        let fallback = LUCYCOM_DEFAULT_NEWS;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          fallback = fallback.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q));
        }
        if (filters.category) {
          fallback = fallback.filter(n => n.category.toLowerCase().includes(filters.category.toLowerCase()));
        }
        setItems(fallback);
        setPagination({ currentPage: 1, totalPages: 1, totalItems: fallback.length });
      }
    } catch (err: any) {
      let fallback = LUCYCOM_DEFAULT_NEWS;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        fallback = fallback.filter(n => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q));
      }
      if (filters.category) {
        fallback = fallback.filter(n => n.category.toLowerCase().includes(filters.category.toLowerCase()));
      }
      setItems(fallback);
      setPagination({ currentPage: 1, totalPages: 1, totalItems: fallback.length });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const resetForm = () => setFormData({ title: '', slug: '', excerpt: '', content: '', category: '', tags: [], published: false });

  const openCreate = () => { resetForm(); setImageFile(null); setImagePreview(null); setDialogMode('create'); setSelected(null); setOpenDialog(true); };
  
  const openEdit = (item: BlogPost) => {
    setSelected(item);
    setFormData({
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      tags: item.tags || [],
      published: item.published || false,
    });
    setImagePreview(getImageUrl(item));
    setImageFile(null);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const openView = (item: BlogPost) => {
    setViewItem(item);
    setOpenViewDialog(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (k === 'tags') fd.append(k, JSON.stringify(v));
        else fd.append(k, String(v));
      });
      if (imageFile) fd.append('image', imageFile);

      if (dialogMode === 'create') {
        await portfolioApi.createBlogPost(fd);
      } else if (selected?._id) {
        await portfolioApi.updateBlogPost(selected._id, fd);
      }

      setSuccess(`Blog post ${dialogMode === 'create' ? 'created' : 'updated'}`);
      setOpenDialog(false);
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleDelete = async (item: BlogPost) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try {
      await portfolioApi.deleteBlogPost(item._id);
      setSuccess('Blog post deleted');
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  const togglePublish = async (item: BlogPost) => {
    try {
      await portfolioApi.togglePublish(item._id);
      setSuccess(`Published ${item.published ? 'disabled' : 'enabled'}`);
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to toggle');
    }
  };

  const toggleExpandItem = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const handleFilterChange = (field: string, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
      ...(field !== 'page' && { page: 1 })
    }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      status: '',
      page: 1,
      limit: 10
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' | 'default' } = {
      'Telecom & 5G': 'primary',
      'Telecom & ICT': 'primary',
      'Data Center & Datacom': 'info',
      'Data Center': 'info',
      'Smart Education & VDI': 'success',
      'Smart Education': 'success',
      'Enterprise Security & AI CCTV': 'warning',
      'Enterprise Security': 'warning',
      'Power & Energy': 'secondary',
      'Corporate & Partnerships': 'default',
    };
    return colors[category] || 'default';
  };

  // Render form section
  const renderFormSection = (title: string, icon: React.ReactNode, content: React.ReactNode) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" sx={{ 
        color: isDark ? '#00ffff' : '#007bff', 
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        {icon} {title}
      </Typography>
      {content}
      <Divider sx={{ mt: 2 }} />
    </Box>
  );

  return (
    <Box>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between', 
          alignItems: { xs: 'stretch', sm: 'center' },
          mb: 3, 
          gap: 2 
        }}>
          <Box>
            <Typography variant={isMobile ? "h6" : "h5"} sx={{ 
              fontWeight: 'bold', 
              color: isDark ? '#ccd6f6' : '#333333',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <Newspaper /> News & Press Releases ({pagination.totalItems})
            </Typography>
            <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
              Official corporate news, press releases, project milestones, and whitepapers
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={openCreate}
            sx={{ 
              background: isDark 
                ? 'linear-gradient(135deg, #00ffff, #00b3b3)' 
                : 'linear-gradient(135deg, #007bff, #0056b3)',
              borderRadius: 1,
              boxShadow: isDark 
                ? '0 2px 4px rgba(0, 255, 255, 0.2)'
                : '0 2px 4px rgba(37, 99, 235, 0.2)',
              '&:hover': {
                background: isDark 
                  ? 'linear-gradient(135deg, #00b3b3, #008080)'
                  : 'linear-gradient(135deg, #0056b3, #004080)',
                boxShadow: isDark 
                  ? '0 4px 8px rgba(0, 255, 255, 0.3)'
                  : '0 4px 8px rgba(37, 99, 235, 0.3)'
              }
            }}
          >
            New Press Release
          </Button>
        </Box>
      </motion.div>

      {/* Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Paper sx={{ 
          mb: 3, 
          p: 3,
          borderRadius: 2,
          backgroundColor: isDark ? '#0f172a80' : 'white',
          border: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
          boxShadow: isDark 
            ? '0 2px 8px rgba(0,0,0,0.3)' 
            : '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', md: 'center' },
            gap: 2,
            mb: 2
          }}>
            <Typography variant="subtitle1" sx={{ 
              fontWeight: 'bold',
              color: isDark ? '#ccd6f6' : '#333333',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}>
              <FilterList /> Filters
            </Typography>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={resetFilters}
              size="small"
              sx={{ 
                borderRadius: 1,
                borderColor: isDark ? '#00ffff' : '#007bff',
                color: isDark ? '#00ffff' : '#007bff',
                '&:hover': {
                  borderColor: isDark ? '#00b3b3' : '#0056b3',
                  backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                }
              }}
            >
              Reset
            </Button>
          </Box>
          
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 2
          }}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by title..."
              InputProps={{
                startAdornment: <Search sx={{ color: isDark ? '#a8b2d1' : '#666666', mr: 1 }} />,
              }}
              sx={textFieldStyle}
            />
            
            <TextField
              fullWidth
              size="small"
              label="Category"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              placeholder="Filter by category"
              sx={textFieldStyle}
            />
            
            <TextField
              fullWidth
              size="small"
              select
              label="Status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              sx={textFieldStyle}
              SelectProps={{
                native: true,
              }}
            >
              <option value="">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </TextField>
          </Box>
        </Paper>
      </motion.div>

      {/* Content */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: isDark ? '#00ffff' : '#007bff' }} />
        </Box>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Mobile View - Cards */}
          {isMobile ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {items.map((item) => {
                const isExpanded = expandedItem === item._id;
                
                return (
                  <Card 
                    key={item._id} 
                    sx={{ 
                      borderRadius: 2,
                      boxShadow: isDark 
                        ? '0 2px 8px rgba(0,0,0,0.3)' 
                        : '0 2px 8px rgba(0,0,0,0.1)',
                      border: isDark 
                        ? '1px solid #334155' 
                        : '1px solid #e5e7eb',
                      backgroundColor: isDark ? '#0f172a80' : 'white',
                      backdropFilter: isDark ? 'blur(10px)' : 'none'
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'flex-start',
                        mb: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ 
                            width: 50, 
                            height: 50, 
                            borderRadius: 1, 
                            overflow: 'hidden',
                            flexShrink: 0,
                            backgroundColor: isDark ? '#1e293b' : '#f8fafc'
                          }}>
                            <img 
                              src={getImageUrl(item) || '/api/placeholder/50/50'} 
                              alt={item.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              onError={(e) => { (e.target as HTMLImageElement).src = '/api/placeholder/50/50'; }} 
                            />
                          </Box>
                          <Box>
                            <Typography variant="subtitle1" sx={{ 
                              fontWeight: 'bold',
                              color: isDark ? '#ccd6f6' : '#333333',
                              mb: 0.5
                            }}>
                              {item.title}
                            </Typography>
                            <Chip
                              label={item.category}
                              color={getCategoryColor(item.category)}
                              size="small"
                              sx={{ height: 24, fontSize: '0.7rem' }}
                            />
                          </Box>
                        </Box>
                        <IconButton 
                          size="small" 
                          onClick={() => toggleExpandItem(item._id)}
                          sx={{ color: isDark ? '#a8b2d1' : '#666666' }}
                        >
                          {isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                      </Box>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1.5, 
                        mb: 1.5,
                        flexWrap: 'wrap'
                      }}>
                        <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                          Status:
                        </Typography>
                        <Chip
                          label={item.published ? 'Published' : 'Draft'}
                          color={item.published ? 'success' : 'default'}
                          size="small"
                          sx={{ height: 24, fontSize: '0.7rem' }}
                        />
                        {item.tags && item.tags.length > 0 && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {item.tags.slice(0, 2).map((tag, i) => (
                              <Chip key={i} label={tag} size="small" sx={{ height: 20, fontSize: '0.6rem' }} />
                            ))}
                            {item.tags.length > 2 && (
                              <Chip label={`+${item.tags.length - 2}`} size="small" sx={{ height: 20, fontSize: '0.6rem' }} />
                            )}
                          </Box>
                        )}
                      </Box>

                      <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <Typography variant="caption" color={isDark ? '#94a3b8' : '#999999'}>
                          Views: {item.views || 0}
                        </Typography>
                        <Typography variant="caption" color={isDark ? '#94a3b8' : '#999999'}>
                          {formatDate(item.created_at)}
                        </Typography>
                      </Box>

                      {isExpanded && (
                        <Box sx={{ 
                          pt: 2,
                          borderTop: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                          mt: 2
                        }}>
                          <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'} sx={{ mb: 1 }}>
                            <strong>Excerpt:</strong> {item.excerpt}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: 1,
                            mt: 2
                          }}>
                            <Button
                              variant="outlined"
                              startIcon={<Visibility />}
                              onClick={() => openView(item)}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                borderColor: isDark ? '#00ffff' : '#007bff',
                                color: isDark ? '#00ffff' : '#007bff',
                                '&:hover': {
                                  backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                                }
                              }}
                            >
                              View
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={item.published ? <VisibilityOff /> : <Visibility />}
                              onClick={() => togglePublish(item)}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                borderColor: item.published ? 
                                  (isDark ? '#ff0000' : '#dc3545') : 
                                  (isDark ? '#00ff00' : '#28a745'),
                                color: item.published ? 
                                  (isDark ? '#ff0000' : '#dc3545') : 
                                  (isDark ? '#00ff00' : '#28a745'),
                                '&:hover': {
                                  backgroundColor: item.published ? 
                                    (isDark ? '#ff000020' : '#dc354510') : 
                                    (isDark ? '#00ff0020' : '#28a74510')
                                }
                              }}
                            >
                              {item.published ? 'Unpublish' : 'Publish'}
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Edit />}
                              onClick={() => openEdit(item)}
                              size="small"
                              sx={{
                                borderRadius: 1,
                                borderColor: isDark ? '#00ffff' : '#007bff',
                                color: isDark ? '#00ffff' : '#007bff',
                                '&:hover': {
                                  backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                                }
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Delete />}
                              onClick={() => handleDelete(item)}
                              size="small"
                              color="error"
                              sx={{ 
                                borderRadius: 1,
                                borderColor: isDark ? '#ff0000' : '#dc3545',
                                color: isDark ? '#ff0000' : '#dc3545',
                                '&:hover': {
                                  backgroundColor: isDark ? '#ff000020' : '#dc354510'
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </Box>
          ) : (
            /* Desktop/Tablet View - Table */
            <TableContainer component={Paper} sx={{ 
              borderRadius: 2,
              backgroundColor: isDark ? '#0f172a80' : 'white',
              border: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
              boxShadow: isDark 
                ? '0 4px 12px rgba(0,0,0,0.3)' 
                : '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ 
                    background: isDark 
                      ? 'linear-gradient(135deg, #00ffff, #00b3b3)' 
                      : 'linear-gradient(135deg, #007bff, #0056b3)'
                  }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Title / Category</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Tags</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Views</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((item) => (
                    <TableRow 
                      key={item._id} 
                      hover 
                      sx={{ 
                        '&:hover': { 
                          backgroundColor: isDark ? '#1e293b' : '#f8fafc' 
                        } 
                      }}
                    >
                      <TableCell sx={{ py: 2.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Box sx={{ 
                            width: 50, 
                            height: 40, 
                            borderRadius: 1, 
                            overflow: 'hidden', 
                            flexShrink: 0,
                            backgroundColor: isDark ? '#1e293b' : '#f8fafc'
                          }}>
                            <img 
                              src={getImageUrl(item) || '/api/placeholder/50/40'} 
                              alt={item.title} 
                              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                              onError={(e) => { (e.target as HTMLImageElement).src = '/api/placeholder/50/40'; }} 
                            />
                          </Box>
                          <Box>
                            <Typography variant="body2" sx={{ 
                              fontWeight: 500, 
                              color: isDark ? '#ccd6f6' : '#333333' 
                            }}>
                              {item.title}
                            </Typography>
                            <Chip 
                              label={item.category} 
                              color={getCategoryColor(item.category)} 
                              size="small" 
                              sx={{ height: 20, fontSize: '0.65rem', mt: 0.5 }} 
                            />
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {item.tags?.map((t, i) => (
                            <Chip key={i} label={t} size="small" sx={{ height: 20, fontSize: '0.65rem' }} />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip 
                          label={item.published ? 'Published' : 'Draft'} 
                          color={item.published ? 'success' : 'default'} 
                          size="small" 
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                          {item.views || 0}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => openView(item)}
                            sx={{ 
                              color: isDark ? '#00ffff' : '#007bff',
                              '&:hover': {
                                backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                              }
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => togglePublish(item)}
                            sx={{ 
                              color: item.published ? 
                                (isDark ? '#ff0000' : '#dc3545') : 
                                (isDark ? '#00ff00' : '#28a745'),
                              '&:hover': {
                                backgroundColor: item.published ? 
                                  (isDark ? '#ff000020' : '#dc354510') : 
                                  (isDark ? '#00ff0020' : '#28a74510')
                              }
                            }}
                          >
                            {item.published ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => openEdit(item)}
                            sx={{ 
                              color: isDark ? '#00ffff' : '#007bff',
                              '&:hover': {
                                backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                              }
                            }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(item)}
                            sx={{ 
                              color: isDark ? '#ff0000' : '#dc3545',
                              '&:hover': {
                                backgroundColor: isDark ? '#ff000020' : '#dc354510'
                              }
                            }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {items.length === 0 && !loading && (
            <Box sx={{ 
              textAlign: 'center', 
              py: 8,
              px: 2
            }}>
              <Article sx={{ 
                fontSize: 64, 
                color: isDark ? '#334155' : '#cbd5e1',
                mb: 2
              }} />
              <Typography variant="h6" color={isDark ? '#a8b2d1' : '#666666'} sx={{ mb: 1 }}>
                No blog posts found
              </Typography>
              <Typography variant="body2" color={isDark ? '#94a3b8' : '#999999'}>
                Try adjusting your filters or create a new post
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              mt: 4,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2
            }}>
              <Pagination 
                count={pagination.totalPages} 
                page={filters.page} 
                onChange={(_, v) => handleFilterChange('page', v)} 
                color="primary" 
                size={isMobile ? "small" : "medium"}
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 1,
                    color: isDark ? '#ccd6f6' : '#333333',
                    '&.Mui-selected': {
                      backgroundColor: isDark ? '#00ffff' : '#007bff',
                      color: isDark ? '#0a192f' : 'white',
                    },
                    '&:hover': {
                      backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                    }
                  }
                }}
              />
              <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                Showing {((filters.page - 1) * filters.limit) + 1} to {Math.min(filters.page * filters.limit, pagination.totalItems)} of {pagination.totalItems} posts
              </Typography>
            </Box>
          )}
        </motion.div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="md" 
        fullWidth 
        fullScreen={isMobile}
        PaperProps={{
          sx: { 
            borderRadius: 2,
            backgroundColor: isDark ? '#0f172a' : 'white',
            color: isDark ? '#ccd6f6' : '#333333'
          }
        }}
      >
        <DialogTitle sx={{ 
          backgroundColor: isDark ? '#0f172a' : 'white',
          borderBottom: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
          py: 3
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: isDark ? '#ccd6f6' : '#333333' }}>
            {dialogMode === 'create' ? 'Publish News / Press Release' : 'Edit News / Press Release'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Image Upload */}
            {renderFormSection(
              "Featured Image",
              <CloudUpload />,
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ 
                  position: 'relative', 
                  width: '100%', 
                  maxWidth: 400,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }} onClick={() => document.getElementById('blog-image')?.click()}>
                  <Box sx={{ 
                    width: '100%', 
                    height: 200, 
                    borderRadius: 2, 
                    overflow: 'hidden', 
                    border: `2px dashed ${isDark ? '#334155' : '#e5e7eb'}`,
                    backgroundColor: isDark ? '#1e293b' : '#f8fafc',
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Stack alignItems="center" spacing={1}>
                        <CloudUpload sx={{ fontSize: 48, color: isDark ? '#a8b2d1' : '#666' }} />
                        <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666'}>
                          Click to upload image
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                  <input id="blog-image" type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Box>
              </Box>
            )}

            {/* Content Information */}
            {renderFormSection(
              "Content Information",
              <Description />,
              <>
                <TextField
                  fullWidth
                  label="Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  size="small"
                  sx={textFieldStyle}
                />
                <TextField
                  fullWidth
                  label="Slug (auto-generated if empty)"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  size="small"
                  sx={textFieldStyle}
                  helperText="Leave blank to auto-generate from title"
                />
                <TextField
                  fullWidth
                  label="Excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  multiline
                  rows={2}
                  required
                  size="small"
                  sx={textFieldStyle}
                />
                <TextField
                  fullWidth
                  label="Full Content / Press Release Article"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  multiline
                  rows={4}
                  required
                  size="small"
                  sx={textFieldStyle}
                />
              </>
            )}

            {/* Category & Tags */}
            {renderFormSection(
              "Category & Tags",
              <Category />,
              <>
                <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                  <InputLabel sx={{ color: isDark ? '#a8b2d1' : '#666' }}>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    sx={{
                      backgroundColor: isDark ? '#1e293b' : 'white',
                      color: isDark ? '#ccd6f6' : '#333',
                      '& .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? '#334155' : '#e5e7eb' },
                      '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? '#00ffff' : '#007bff' },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: isDark ? '#00ffff' : '#007bff' },
                    }}
                  >
                    {NEWS_CATEGORIES.map((cat) => (
                      <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Tags (comma separated)"
                  value={formData.tags.join(', ')}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) 
                  })}
                  size="small"
                  sx={textFieldStyle}
                  helperText="e.g. Telecom, 5G, Data Center, Precision Cooling, Smart Education, VDI, AI CCTV, Solar"
                />
              </>
            )}

            {/* Publishing Status */}
            {renderFormSection(
              "Publishing Status",
              <Visibility />,
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                  Published:
                </Typography>
                <Switch 
                  checked={formData.published} 
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: isDark ? '#00ffff' : '#007bff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: isDark ? '#00ffff' : '#007bff',
                    },
                  }}
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 3,
          borderTop: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
          backgroundColor: isDark ? '#0f172a' : 'white'
        }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{
              color: isDark ? '#00ffff' : '#007bff',
              '&:hover': {
                backgroundColor: isDark ? '#00ffff20' : '#007bff10'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit} 
            disabled={!formData.title || !formData.excerpt || !formData.content || !formData.category}
            sx={{
              background: isDark 
                ? 'linear-gradient(135deg, #00ffff, #00b3b3)' 
                : 'linear-gradient(135deg, #007bff, #0056b3)',
              borderRadius: 1,
              '&:hover': {
                background: isDark 
                  ? 'linear-gradient(135deg, #00b3b3, #008080)'
                  : 'linear-gradient(135deg, #0056b3, #004080)'
              },
              '&.Mui-disabled': {
                background: isDark ? '#334155' : '#e5e7eb',
                color: isDark ? '#94a3b8' : '#94a3b8'
              }
            }}
          >
            {dialogMode === 'create' ? 'Create' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Dialog */}
      <Dialog 
        open={openViewDialog} 
        onClose={() => setOpenViewDialog(false)} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: { 
            borderRadius: 2,
            backgroundColor: isDark ? '#0f172a' : 'white',
            color: isDark ? '#ccd6f6' : '#333333',
            maxHeight: '90vh',
            overflow: 'hidden'
          }
        }}
      >
        {viewItem && (
          <>
            <DialogTitle sx={{ 
              background: isDark
                ? 'linear-gradient(135deg, #00ffff, #00b3b3)'
                : 'linear-gradient(135deg, #007bff, #0056b3)',
              color: 'white',
              py: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                  sx={{ 
                    width: 50, 
                    height: 50,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    fontSize: '1.2rem',
                    fontWeight: 'bold'
                  }}
                >
                  {viewItem.title.charAt(0).toUpperCase()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {viewItem.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                    <Chip 
                      label={viewItem.category} 
                      color={getCategoryColor(viewItem.category)} 
                      size="small" 
                      sx={{ height: 20, fontSize: '0.65rem' }}
                    />
                    <Chip 
                      label={viewItem.published ? 'Published' : 'Draft'} 
                      color={viewItem.published ? 'success' : 'default'} 
                      size="small" 
                      sx={{ height: 20, fontSize: '0.65rem' }}
                    />
                  </Box>
                </Box>
              </Box>
            </DialogTitle>
            <DialogContent sx={{ p: 3, overflowY: 'auto' }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box sx={{ pt: 2, pb: 2 }}>
                  {/* Featured Image */}
                  {getImageUrl(viewItem) && (
                    <Card sx={{ 
                      mb: 3, 
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundColor: isDark ? '#1e293b' : '#f8fafc'
                    }}>
                      <img 
                        src={getImageUrl(viewItem) || '/api/placeholder/800/400'} 
                        alt={viewItem.title} 
                        style={{ width: '100%', maxHeight: 400, objectFit: 'cover' }}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/api/placeholder/800/400'; }}
                      />
                    </Card>
                  )}

                  {/* Content */}
                  <Card sx={{ 
                    mb: 3, 
                    borderRadius: 2,
                    boxShadow: isDark 
                      ? '0 2px 8px rgba(0,0,0,0.3)' 
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    backgroundColor: isDark ? '#0f172a80' : 'white'
                  }}>
                    <CardContent>
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 'bold',
                        color: isDark ? '#ccd6f6' : '#333333',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Description /> Excerpt
                      </Typography>
                      <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'} sx={{ mb: 2, lineHeight: 1.8 }}>
                        {viewItem.excerpt}
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle1" sx={{ 
                        fontWeight: 'bold',
                        color: isDark ? '#ccd6f6' : '#333333',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <Description /> Time
                      </Typography>
                      <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'} sx={{ lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>
                        {viewItem.content}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Details */}
                  <Card sx={{ 
                    borderRadius: 2,
                    boxShadow: isDark 
                      ? '0 2px 8px rgba(0,0,0,0.3)' 
                      : '0 2px 8px rgba(0,0,0,0.1)',
                    backgroundColor: isDark ? '#0f172a80' : 'white'
                  }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ 
                        mb: 2, 
                        fontWeight: 'bold',
                        color: isDark ? '#ccd6f6' : '#333333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                      }}>
                        <AccessTime /> Details
                      </Typography>
                      <Box sx={{ 
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 3
                      }}>
                        <Box>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Slug
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {viewItem.slug}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Views
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {viewItem.views || 0}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Created
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {formatDate(viewItem.created_at)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Published At
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {viewItem.publishedAt ? formatDate(viewItem.publishedAt) : 'Not published'}
                          </Typography>
                        </Box>
                      </Box>
                      {viewItem.tags && viewItem.tags.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Tags
                          </Typography>
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                            {viewItem.tags.map((tag, i) => (
                              <Chip key={i} label={tag} size="small" sx={{ height: 24 }} />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Box>
              </motion.div>
            </DialogContent>
            <DialogActions sx={{ 
              p: 3,
              borderTop: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
              backgroundColor: isDark ? '#0f172a' : 'white'
            }}>
              <Button 
                onClick={() => setOpenViewDialog(false)}
                sx={{
                  color: isDark ? '#00ffff' : '#007bff',
                  '&:hover': {
                    backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                  }
                }}
              >
                Close
              </Button>
              <Button 
                onClick={() => {
                  setOpenViewDialog(false);
                  openEdit(viewItem);
                }}
                variant="contained"
                sx={{
                  background: isDark
                    ? 'linear-gradient(135deg, #00ffff, #00b3b3)'
                    : 'linear-gradient(135deg, #007bff, #0056b3)',
                  borderRadius: 1,
                  '&:hover': {
                    background: isDark
                      ? 'linear-gradient(135deg, #00b3b3, #008080)'
                      : 'linear-gradient(135deg, #0056b3, #004080)'
                  }
                }}
              >
                Edit Post
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Notifications */}
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="error" 
          onClose={() => setError('')}
          sx={{ 
            borderRadius: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: isDark ? '#0f172a' : 'white',
            color: isDark ? '#ff0000' : '#dc3545'
          }}
        >
          {error}
        </Alert>
      </Snackbar>
      
      <Snackbar 
        open={!!success} 
        autoHideDuration={6000} 
        onClose={() => setSuccess('')} 
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          severity="success" 
          onClose={() => setSuccess('')}
          sx={{ 
            borderRadius: 1,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            backgroundColor: isDark ? '#0f172a' : 'white',
            color: isDark ? '#00ff00' : '#28a745'
          }}
        >
          {success}
        </Alert>
      </Snackbar>
    </Box>
  );
}