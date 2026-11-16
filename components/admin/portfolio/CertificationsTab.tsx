// app/admin/components/CertificationsTab.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Alert, Snackbar, CircularProgress,
  Pagination, TextField, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Stack, useMediaQuery,
  Card, CardContent, Avatar, Divider, MenuItem, FormControl,
  InputLabel, Select, SelectChangeEvent,
  Switch
} from '@mui/material';
import {
  Add, Edit, Delete, CloudUpload, Visibility, VisibilityOff,
  ExpandMore, ExpandLess, CalendarToday, Category, Description,
  School, Star, StarBorder, Verified, Bolt, Business
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import portfolioApi from '@/lib/api/portfolio';

interface Certification {
  _id: string;
  title: string;
  organization?: string;
  description?: string;
  startDate: string;
  endDate?: string;
  image?: string;
  imageData?: any;
  category: string;
  credentialId?: string;
  credentialUrl?: string;
  featured: boolean;
  created_at: string;
}

const CATEGORIES = [
  'ECA Regulatory & Telecom Contractor Licenses',
  'EEA Electromechanical & Power Competency (Grade-5)',
  'Commercial Trade & Engineering Licenses',
  'Federal Import & Distribution Accreditations',
  'OEM Partner Accreditations & ISO Compliance',
  'Consultancy & Professional Engineering Accreditations',
];

const LUCYCOM_DEFAULT_LICENSES: Certification[] = [
  {
    _id: 'c1',
    title: 'Outdoor Telecommunications Facilities Installation & Maintenance Works License',
    organization: 'Ethiopian Communications Authority (ECA)',
    description: 'Official regulatory license issued under Communications Service Proclamation No. 1148/2019 for telecommunication facilities, towers, and networks.',
    credentialId: 'AA/ADISM/3/0000038/2013',
    credentialUrl: 'https://eca.et',
    category: 'ECA Regulatory & Telecom Contractor Licenses',
    startDate: '2021-01-01T00:00:00.000Z',
    featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: 'c2',
    title: 'Electromechanical Contractor Grade-Five Competency Certificate',
    organization: 'Ethiopian Energy Authority (EEA)',
    description: 'Authorized electro-mechanical contractor competency certificate under Proclamation No. 686/2010 for power, cooling, and data center electromechanical works.',
    credentialId: '51213--247',
    credentialUrl: 'https://eea.gov.et',
    category: 'EEA Electromechanical & Power Competency (Grade-5)',
    startDate: '2021-06-01T00:00:00.000Z',
    featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: 'c3',
    title: 'Computer Network Design & Cable Installation License (Code: 85121)',
    organization: 'Addis Ababa City Administration Trade Bureau',
    description: 'Commercial business license under Proclamation No. 980/2016 for structured cabling, campus backbones, and LAN/WAN infrastructure.',
    credentialId: 'AACATB/14/672/50644059/2019',
    credentialUrl: '',
    category: 'Commercial Trade & Engineering Licenses',
    startDate: '2020-03-01T00:00:00.000Z',
    featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: 'c4',
    title: 'Import Trade in Communication & Computer Equipment License (Code: 65721)',
    organization: 'Ministry of Trade and Regional Integration',
    description: 'Federal business license for importing carrier-grade hardware, telecom equipment, and server appliances.',
    credentialId: 'MT/AA/14/672/50644466/2019',
    credentialUrl: '',
    category: 'Federal Import & Distribution Accreditations',
    startDate: '2020-03-01T00:00:00.000Z',
    featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: 'c5',
    title: 'Consultancy Service on ICT (Code: 86521)',
    organization: 'Addis Ababa City Administration Trade Bureau',
    description: 'Licensed consultancy in enterprise systems architecture, datacenter engineering, and network infrastructure.',
    credentialId: 'AACATB/14/672/50644039/2019',
    credentialUrl: '',
    category: 'Consultancy & Professional Engineering Accreditations',
    startDate: '2020-03-01T00:00:00.000Z',
    featured: true,
    created_at: '2026-01-01T00:00:00.000Z',
  },
  {
    _id: 'c6',
    title: 'Software Development & Systems Implementation (Code: 39141)',
    organization: 'Addis Ababa City Administration Trade Bureau',
    description: 'Licensed development and deployment of bespoke enterprise software solutions, digital portals, and cloud systems.',
    credentialId: 'AACATB/14/672/50644211/2019',
    credentialUrl: '',
    category: 'Commercial Trade & Engineering Licenses',
    startDate: '2020-03-01T00:00:00.000Z',
    featured: false,
    created_at: '2026-01-01T00:00:00.000Z',
  },
];

const getImageUrl = (item: Certification): string | null => {
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

export default function CertificationsTab() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = theme === 'dark';

  const [items, setItems] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [page, setPage] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<Certification | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  // View Dialog
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewItem, setViewItem] = useState<Certification | null>(null);
  
  // Filter states
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    page: 1,
    limit: 10
  });
  
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
    credentialId: '',
    credentialUrl: '',
    featured: false,
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
      const res = await portfolioApi.getCertificationsAdmin({
        page: filters.page,
        limit: filters.limit,
        search: filters.search,
        category: filters.category
      });
      const list = res.data?.data?.data || res.data?.data || [];
      if (Array.isArray(list) && list.length > 0) {
        setItems(list);
        setPagination(res.data?.data?.pagination || { currentPage: 1, totalPages: 1, totalItems: list.length });
      } else {
        let fallback = LUCYCOM_DEFAULT_LICENSES;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          fallback = fallback.filter(l => l.title.toLowerCase().includes(q) || (l.organization && l.organization.toLowerCase().includes(q)));
        }
        if (filters.category) {
          fallback = fallback.filter(l => l.category === filters.category);
        }
        setItems(fallback);
        setPagination({ currentPage: 1, totalPages: 1, totalItems: fallback.length });
      }
    } catch (err: any) {
      let fallback = LUCYCOM_DEFAULT_LICENSES;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        fallback = fallback.filter(l => l.title.toLowerCase().includes(q) || (l.organization && l.organization.toLowerCase().includes(q)));
      }
      if (filters.category) {
        fallback = fallback.filter(l => l.category === filters.category);
      }
      setItems(fallback);
      setPagination({ currentPage: 1, totalPages: 1, totalItems: fallback.length });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const resetForm = () => setFormData({
    title: '',
    organization: '',
    description: '',
    startDate: '',
    endDate: '',
    category: '',
    credentialId: '',
    credentialUrl: '',
    featured: false,
  });

  const openCreate = () => {
    resetForm();
    setImageFile(null);
    setImagePreview(null);
    setDialogMode('create');
    setSelected(null);
    setOpenDialog(true);
  };

  const openEdit = (item: Certification) => {
    setSelected(item);
    setFormData({
      title: item.title,
      organization: item.organization || '',
      description: item.description || '',
      startDate: item.startDate ? new Date(item.startDate).toISOString().split('T')[0] : '',
      endDate: item.endDate ? new Date(item.endDate).toISOString().split('T')[0] : '',
      category: item.category,
      credentialId: item.credentialId || '',
      credentialUrl: item.credentialUrl || '',
      featured: item.featured || false,
    });
    setImagePreview(getImageUrl(item));
    setImageFile(null);
    setDialogMode('edit');
    setOpenDialog(true);
  };

  const openView = (item: Certification) => {
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
        if (v !== undefined && v !== null && v !== '') {
          fd.append(k, String(v));
        }
      });
      if (imageFile) fd.append('image', imageFile);

      if (dialogMode === 'create') {
        await portfolioApi.createCertification(fd);
      } else if (selected?._id) {
        await portfolioApi.updateCertification(selected._id, fd);
      }

      setSuccess(`Certification ${dialogMode === 'create' ? 'created' : 'updated'}`);
      setOpenDialog(false);
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save');
    }
  };

  const handleDelete = async (item: Certification) => {
    if (!confirm(`Delete "${item.title}"?`)) return;
    try {
      await portfolioApi.deleteCertification(item._id);
      setSuccess('Certification deleted');
      fetchItems();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to delete');
    }
  };

  const toggleFeatured = async (item: Certification) => {
    try {
      await portfolioApi.toggleCertificationFeatured(item._id);
      setSuccess(`Featured ${item.featured ? 'disabled' : 'enabled'}`);
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
      page: 1,
      limit: 10
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'error' | 'default' } = {
      'ECA Regulatory & Telecom Contractor Licenses': 'primary',
      'EEA Electromechanical & Power Competency (Grade-5)': 'secondary',
      'Commercial Trade & Engineering Licenses': 'info',
      'Federal Import & Distribution Accreditations': 'success',
      'OEM Partner Accreditations & ISO Compliance': 'warning',
      'Consultancy & Professional Engineering Accreditations': 'default',
    };
    return colors[category] || 'default';
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'ECA Regulatory & Telecom Contractor Licenses': <Verified />,
      'EEA Electromechanical & Power Competency (Grade-5)': <Bolt />,
      'Commercial Trade & Engineering Licenses': <Business />,
      'Federal Import & Distribution Accreditations': <Description />,
      'OEM Partner Accreditations & ISO Compliance': <Star />,
      'Consultancy & Professional Engineering Accreditations': <Category />,
    };
    return icons[category] || <Verified />;
  };

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
              <Verified /> Licenses & Accreditations ({pagination.totalItems})
            </Typography>
            <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
              Official statutory licenses, regulatory authorizations, and contractor competencies
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
            New License / Accreditation
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
              <Category /> Filters
            </Typography>
            <Button
              variant="outlined"
              startIcon={<span>↺</span>}
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
              md: 'repeat(2, 1fr)'
            },
            gap: 2
          }}>
            <TextField
              fullWidth
              size="small"
              label="Search"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search by title or organization..."
              sx={textFieldStyle}
            />

            <FormControl fullWidth size="small">
              <InputLabel sx={{ color: isDark ? '#a8b2d1' : '#666' }}>Category</InputLabel>
              <Select
                value={filters.category}
                onChange={(e: SelectChangeEvent) => handleFilterChange('category', e.target.value)}
                label="Category"
                sx={{
                  backgroundColor: isDark ? '#1e293b' : 'white',
                  color: isDark ? '#ccd6f6' : '#333',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDark ? '#334155' : '#e5e7eb',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDark ? '#00ffff' : '#007bff',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: isDark ? '#00ffff' : '#007bff',
                  },
                }}
              >
                <MenuItem value="">All Categories</MenuItem>
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
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
                        {item.organization && (
                          <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                            {item.organization}
                          </Typography>
                        )}
                        <Chip
                          label={item.featured ? 'Featured' : 'Regular'}
                          color={item.featured ? 'primary' : 'default'}
                          size="small"
                          sx={{ height: 24, fontSize: '0.7rem' }}
                        />
                      </Box>

                      <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1
                      }}>
                        <Typography variant="caption" color={isDark ? '#94a3b8' : '#999999'}>
                          {formatDate(item.startDate)} {item.endDate && `- ${formatDate(item.endDate)}`}
                        </Typography>
                      </Box>

                      {isExpanded && (
                        <Box sx={{
                          pt: 2,
                          borderTop: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                          mt: 2
                        }}>
                          {item.description && (
                            <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'} sx={{ mb: 2 }}>
                              <strong>Description:</strong> {item.description}
                            </Typography>
                          )}
                          {item.credentialId && (
                            <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'} sx={{ mb: 1 }}>
                              <strong>Credential ID:</strong> {item.credentialId}
                            </Typography>
                          )}
                          {item.credentialUrl && (
                            <Typography variant="body2" sx={{ mb: 2 }}>
                              <strong>URL:</strong>{' '}
                              <a href={item.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ color: isDark ? '#00ffff' : '#007bff' }}>
                                View Credential
                              </a>
                            </Typography>
                          )}

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
                              startIcon={item.featured ? <StarBorder /> : <Star />}
                              onClick={() => toggleFeatured(item)}
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
                              {item.featured ? 'Unfeature' : 'Feature'}
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
              boxShadow: isDark                ? '0 4px 12px rgba(0,0,0,0.3)'
                : '0 4px 12px rgba(0,0,0,0.08)'
            }}>
              <Table>
                <TableHead>
                  <TableRow sx={{
                    background: isDark
                      ? 'linear-gradient(135deg, #00ffff, #00b3b3)'
                      : 'linear-gradient(135deg, #007bff, #0056b3)'
                  }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Title / Organization</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Category</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Date</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold', py: 2 }}>Status</TableCell>
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
                            {item.organization && (
                              <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                                {item.organization}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip
                          label={item.category}
                          color={getCategoryColor(item.category)}
                          size="small"
                          sx={{ maxWidth: 200 }}
                        />
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                          {formatDate(item.startDate)}
                          {item.endDate && ` - ${formatDate(item.endDate)}`}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ py: 2.5 }}>
                        <Chip
                          label={item.featured ? 'Featured' : 'Regular'}
                          color={item.featured ? 'primary' : 'default'}
                          size="small"
                        />
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
                            onClick={() => toggleFeatured(item)}
                            sx={{
                              color: isDark ? '#00ffff' : '#007bff',
                              '&:hover': {
                                backgroundColor: isDark ? '#00ffff20' : '#007bff10'
                              }
                            }}
                          >
                            {item.featured ? <StarBorder fontSize="small" /> : <Star fontSize="small" />}
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
              <School sx={{
                fontSize: 64,
                color: isDark ? '#334155' : '#cbd5e1',
                mb: 2
              }} />
              <Typography variant="h6" color={isDark ? '#a8b2d1' : '#666666'} sx={{ mb: 1 }}>
                No certifications found
              </Typography>
              <Typography variant="body2" color={isDark ? '#94a3b8' : '#999999'}>
                Try adjusting your filters or create a new certification
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
                Showing {((filters.page - 1) * filters.limit) + 1} to {Math.min(filters.page * filters.limit, pagination.totalItems)} of {pagination.totalItems} certifications
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
            {dialogMode === 'create' ? 'Add Statutory License / Accreditation' : 'Edit Statutory License / Accreditation'}
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Image Upload */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                color: isDark ? '#00ffff' : '#007bff',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <CloudUpload /> License Document / Certificate Image
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: 400,
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }} onClick={() => document.getElementById('cert-image')?.click()}>
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
                          Click to upload license certificate image
                        </Typography>
                      </Stack>
                    )}
                  </Box>
                  <input id="cert-image" type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>

            {/* Basic Information */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                color: isDark ? '#00ffff' : '#007bff',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Verified /> Statutory License Information
              </Typography>
              <TextField
                fullWidth
                label="License / Accreditation Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                size="small"
                sx={textFieldStyle}
                placeholder="e.g., Outdoor Telecommunications Facilities Installation & Maintenance Works License"
              />
              <TextField
                fullWidth
                label="Regulatory Authority / Issuer"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                size="small"
                sx={textFieldStyle}
                placeholder="e.g., Ethiopian Communications Authority (ECA)"
                helperText="Regulatory body or authorized ministry issuing the statutory license"
              />
              <TextField
                fullWidth
                label="Scope of Authorization & Works"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                multiline
                rows={3}
                size="small"
                sx={textFieldStyle}
                placeholder="Scope of authorization, permitted technical works, and legal references under Proclamation"
              />
              <Divider sx={{ mt: 2 }} />
            </Box>

            {/* Category and Dates */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                color: isDark ? '#00ffff' : '#007bff',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Category /> Category & Dates
              </Typography>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel sx={{ color: isDark ? '#a8b2d1' : '#666' }}>Category</InputLabel>
                <Select
                  value={formData.category}
                  onChange={(e: SelectChangeEvent) => setFormData({ ...formData, category: e.target.value })}
                  label="Category"
                  required
                  sx={{
                    backgroundColor: isDark ? '#1e293b' : 'white',
                    color: isDark ? '#ccd6f6' : '#333',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? '#334155' : '#e5e7eb',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? '#00ffff' : '#007bff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? '#00ffff' : '#007bff',
                    },
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                size="small"
                sx={textFieldStyle}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="End Date (optional)"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                size="small"
                sx={textFieldStyle}
                InputLabelProps={{ shrink: true }}
                helperText="Leave empty if still ongoing or if not applicable"
              />
              <Divider sx={{ mt: 2 }} />
            </Box>

            {/* Credential Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{
                color: isDark ? '#00ffff' : '#007bff',
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}>
                <Verified /> License Registration & Verification Details
              </Typography>
              <TextField
                fullWidth
                label="License / Registration No."
                value={formData.credentialId}
                onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
                size="small"
                sx={textFieldStyle}
                placeholder="e.g., AA/ADISM/3/0000038/2013 or 51213--247"
                helperText="Statutory registration or certificate competency serial number"
              />
              <TextField
                fullWidth
                label="Verification / Regulatory Portal URL"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                size="small"
                sx={textFieldStyle}
                placeholder="https://eca.et or regulatory registry URL"
                helperText="Online portal or registry link for statutory verification"
              />
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <Typography variant="body2" color={isDark ? '#a8b2d1' : '#666666'}>
                  Featured:
                </Typography>
                <Switch
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: isDark ? '#00ffff' : '#007bff',
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: isDark ? '#00ffff' : '#007bff',
                    },
                  }}
                />
                <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                  Show this certification in the featured section
                </Typography>
              </Box>
            </Box>
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
            disabled={!formData.title || !formData.category || !formData.startDate}
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
                      label={viewItem.featured ? 'Featured' : 'Regular'}
                      color={viewItem.featured ? 'primary' : 'default'}
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
                  {/* Certificate Image */}
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
                        style={{ width: '100%', maxHeight: 500, objectFit: 'contain' }}
                        onError={(e) => { (e.target as HTMLImageElement).src = '/api/placeholder/800/400'; }}
                      />
                    </Card>
                  )}

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
                        <School /> Details
                      </Typography>

                      {viewItem.organization && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Organization
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {viewItem.organization}
                          </Typography>
                        </Box>
                      )}

                      <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                        gap: 3,
                        mb: 2
                      }}>
                        <Box>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Start Date
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {formatDate(viewItem.startDate)}
                          </Typography>
                        </Box>
                        {viewItem.endDate && (
                          <Box>
                            <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                              End Date
                            </Typography>
                            <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                              {formatDate(viewItem.endDate)}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {viewItem.description && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Description
                          </Typography>
                          <Typography variant="body2" sx={{ color: isDark ? '#a8b2d1' : '#666666', mt: 0.5 }}>
                            {viewItem.description}
                          </Typography>
                        </Box>
                      )}

                      {viewItem.credentialId && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Credential ID
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            {viewItem.credentialId}
                          </Typography>
                        </Box>
                      )}

                      {viewItem.credentialUrl && (
                        <Box>
                          <Typography variant="caption" color={isDark ? '#a8b2d1' : '#666666'}>
                            Verification URL
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 'medium', color: isDark ? '#ccd6f6' : '#333333' }}>
                            <a href={viewItem.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ color: isDark ? '#00ffff' : '#007bff' }}>
                              {viewItem.credentialUrl}
                            </a>
                          </Typography>
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
                Edit Certification
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