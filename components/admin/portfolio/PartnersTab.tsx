'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Alert, CircularProgress,
  Pagination, TextField, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Stack, useMediaQuery,
  Card, CardContent, Avatar, Switch, FormControlLabel,
  Tooltip
} from '@mui/material';
import {
  Add, Edit, Delete, Search, Refresh, Star, StarBorder,
  CloudUpload, Visibility, Handshake, Link as LinkIcon
} from '@mui/icons-material';
import { useTheme } from '@/lib/theme-context';
import portfolioApi from '@/lib/api/portfolio';

export interface PartnerItem {
  _id: string;
  name: string;
  domain: string;
  description?: string;
  logo?: string;
  logoData?: any;
  website?: string;
  tier?: string;
  order: number;
  featured: boolean;
  created_at?: string;
}

const getLogoUrl = (item: PartnerItem): string | null => {
  if (item.logoData?.data) {
    let base64 = '';
    if (typeof item.logoData.data === 'string') base64 = item.logoData.data;
    else if (item.logoData.data?.$binary?.base64) base64 = item.logoData.data.$binary.base64;
    else if (item.logoData.data?.data) {
      base64 = Buffer.from(item.logoData.data.data).toString('base64');
    }
    if (base64) return `data:${item.logoData.contentType || 'image/jpeg'};base64,${base64}`;
  }
  if (item.logo?.startsWith('data:image')) return item.logo;
  return item.logo || null;
};

const DEFAULT_PARTNERS_FALLBACK: PartnerItem[] = [
  { _id: 'p1', name: 'HUAWEI', domain: 'Telecom & SingleRAN', description: 'World leader in telecommunications, 4G/5G radio infrastructure, SingleRAN, and carrier microwave links.', tier: 'Global OEM Partner', website: 'https://www.huawei.com', order: 1, featured: true },
  { _id: 'p2', name: 'NOKIA', domain: 'Optical & Mobile Infrastructure', description: 'Global technology pioneer in carrier routing, AirScale 5G mobile RAN, and optical DWDM transport.', tier: 'Global OEM Partner', website: 'https://www.nokia.com', order: 2, featured: true },
  { _id: 'p3', name: 'ERICSSON', domain: '5G Radio & Transmission', description: 'Industry-standard 4G/5G cellular systems, antenna arrays, and high-capacity carrier transmission systems.', tier: 'Strategic Technology Partner', website: 'https://www.ericsson.com', order: 3, featured: true },
  { _id: 'p4', name: 'CISCO', domain: 'Enterprise Switching & Routing', description: 'Global standard for enterprise routing, core switching backbones, and zero-trust software-defined networks.', tier: 'Certified Solution Provider', website: 'https://www.cisco.com', order: 4, featured: true },
  { _id: 'p5', name: 'FORTINET', domain: 'Next-Gen Cybersecurity & NGFW', description: 'Industry-leading Next-Generation Firewalls (FortiGate), secure SD-WAN, and synchronized security fabric.', tier: 'Authorized Security Partner', website: 'https://www.fortinet.com', order: 5, featured: true },
  { _id: 'p6', name: 'DELL TECHNOLOGIES', domain: 'Data Center Compute & Storage', description: 'Tier-standard rackmount compute servers, modular hyper-converged SAN/NAS storage, and high-availability virtualization.', tier: 'Hardware Infrastructure Partner', website: 'https://www.dell.com', order: 6, featured: true },
  { _id: 'p7', name: 'SCHNEIDER ELECTRIC', domain: 'Modular UPS & In-Row Cooling', description: 'World leader in precision data center climate cooling, hot-aisle containment, and online double-conversion UPS systems.', tier: 'Data Center Facilities Partner', website: 'https://www.se.com', order: 7, featured: true },
  { _id: 'p8', name: 'HIKVISION', domain: 'AI Video Surveillance & CCTV', description: 'High-definition IP surveillance cameras, central command operations, and intelligent video neural analytics.', tier: 'Security Solutions Partner', website: 'https://www.hikvision.com', order: 8, featured: true },
  { _id: 'p9', name: 'DAHUA', domain: 'Perimeter Security & Analytics', description: 'AI face recognition, automated perimeter intrusion alerts, and integrated command room video walls.', tier: 'Surveillance & Access Partner', website: 'https://www.dahuasecurity.com', order: 9, featured: true },
  { _id: 'p10', name: 'OS-EASY', domain: 'Virtual Desktop Infrastructure (VDI)', description: 'Enterprise-grade desktop virtualization for educational universities, high schools, and smart computer laboratories.', tier: 'Smart Education Partner', website: 'https://www.os-easy.com', order: 10, featured: true },
];

export default function PartnersTab() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = theme === 'dark';

  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });

  // Dialogs
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedPartner, setSelectedPartner] = useState<PartnerItem | null>(null);

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewItem, setViewItem] = useState<PartnerItem | null>(null);

  // Filters & Search
  const [filters, setFilters] = useState({ search: '', page: 1, limit: 12 });

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    description: '',
    tier: 'Global Technology Partner',
    website: '',
    order: 0,
    featured: true,
  });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Fetch Partners
  const fetchPartners = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await portfolioApi.getPartnersAdmin(filters);
      const responseData = res.data?.data ?? res.data ?? {};
      const partnerArray = Array.isArray(responseData.data)
        ? responseData.data
        : Array.isArray(responseData)
          ? responseData
          : [];
      if (partnerArray.length > 0) {
        setPartners(partnerArray);
        if (responseData.pagination) {
          setPagination(responseData.pagination);
        } else if (res.data?.pagination) {
          setPagination(res.data.pagination);
        } else {
          setPagination({
            currentPage: filters.page || 1,
            totalPages: Math.ceil(partnerArray.length / (filters.limit || 12)) || 1,
            totalItems: partnerArray.length,
          });
        }
      } else {
        let fallback = DEFAULT_PARTNERS_FALLBACK;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          fallback = fallback.filter(p => p.name.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q));
        }
        setPartners(fallback);
        setPagination({
          currentPage: 1,
          totalPages: 1,
          totalItems: fallback.length,
        });
      }
    } catch (err: any) {
      let fallback = DEFAULT_PARTNERS_FALLBACK;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        fallback = fallback.filter(p => p.name.toLowerCase().includes(q) || p.domain.toLowerCase().includes(q));
      }
      setPartners(fallback);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: fallback.length,
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleOpenCreate = () => {
    setDialogMode('create');
    setSelectedPartner(null);
    setFormData({
      name: '',
      domain: '',
      description: '',
      tier: 'Global Technology Partner',
      website: '',
      order: partners.length,
      featured: true,
    });
    setLogoFile(null);
    setLogoPreview(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: PartnerItem) => {
    setDialogMode('edit');
    setSelectedPartner(item);
    setFormData({
      name: item.name,
      domain: item.domain || '',
      description: item.description || '',
      tier: item.tier || 'Global Technology Partner',
      website: item.website || '',
      order: item.order || 0,
      featured: item.featured ?? true,
    });
    setLogoFile(null);
    setLogoPreview(getLogoUrl(item));
    setOpenDialog(true);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.domain.trim()) {
      setError('Partner Name and Domain are required');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('name', formData.name);
      data.append('domain', formData.domain);
      data.append('description', formData.description);
      data.append('tier', formData.tier);
      data.append('website', formData.website);
      data.append('order', formData.order.toString());
      data.append('featured', formData.featured.toString());

      if (logoFile) {
        data.append('logo', logoFile);
      }

      if (dialogMode === 'create') {
        await portfolioApi.createPartner(data);
        setSuccess('Partner added successfully!');
      } else if (selectedPartner) {
        await portfolioApi.updatePartner(selectedPartner._id, data);
        setSuccess('Partner updated successfully!');
      }

      setOpenDialog(false);
      fetchPartners();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Error saving partner');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;
    try {
      setLoading(true);
      await portfolioApi.deletePartner(id);
      setSuccess('Partner deleted successfully!');
      fetchPartners();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete partner');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await portfolioApi.togglePartnerFeatured(id);
      setPartners(prev =>
        prev.map(item => item._id === id ? { ...item, featured: !item.featured } : item)
      );
      setSuccess('Partner featured status updated');
    } catch (err: any) {
      setError('Failed to update featured status');
    }
  };

  // Styles
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: isDark ? '#1C2541' : '#FFFFFF',
      color: isDark ? '#E2E8F0' : '#1E293B',
      '& fieldset': { borderColor: isDark ? '#334155' : '#E2E8F0' },
      '&:hover fieldset': { borderColor: '#0066CC' },
      '&.Mui-focused fieldset': { borderColor: '#0066CC' },
    },
    '& .MuiInputLabel-root': { color: isDark ? '#94A3B8' : '#64748B' },
    '& .MuiInputLabel-root.Mui-focused': { color: '#0066CC' },
  };

  const partnerList = Array.isArray(partners) ? partners : [];

  return (
    <Box>
      {/* Header & Controls */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? '#E2E8F0' : '#0B132B' }}>
            Partners Ecosystem Management
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Manage Lucycom's global OEM and vendor partnerships (Huawei, Nokia, Cisco, Fortinet, Dell, etc.)
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => fetchPartners()}
            sx={{
              borderColor: isDark ? '#334155' : '#CBD5E1',
              color: isDark ? '#E2E8F0' : '#334155',
              '&:hover': { borderColor: '#0066CC', color: '#0066CC' }
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenCreate}
            sx={{
              bgcolor: '#0066CC',
              '&:hover': { bgcolor: '#0052A3' },
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0, 102, 204, 0.3)'
            }}
          >
            Add Partner
          </Button>
        </Stack>
      </Box>

      {/* Filter / Search Bar */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 3,
          borderRadius: 2,
          bgcolor: isDark ? '#1C2541' : '#F8FAFC',
          border: isDark ? '1px solid #334155' : '1px solid #E2E8F0'
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
          <TextField
            fullWidth
            size="small"
            placeholder="Search partners by name, technology domain or tier..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: isDark ? '#94A3B8' : '#64748B' }} />
            }}
            sx={textFieldStyle}
          />
        </Stack>
      </Paper>

      {/* Alert Notices */}
      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>{success}</Alert>}

      {/* Table / List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#0066CC' }} />
        </Box>
      ) : partnerList.length === 0 ? (
        <Paper
          sx={{
            py: 8,
            textAlign: 'center',
            bgcolor: isDark ? '#1C2541' : '#F8FAFC',
            border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
            borderRadius: 2
          }}
        >
          <Handshake sx={{ fontSize: 48, color: '#0066CC', mb: 1, opacity: 0.6 }} />
          <Typography variant="h6" sx={{ color: isDark ? '#E2E8F0' : '#1E293B', fontWeight: 700 }}>
            No Partners Registered Yet
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mb: 2 }}>
            Add technology OEM partners to showcase Lucycom's verified vendor network.
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} sx={{ bgcolor: '#0066CC' }}>
            Add Partner
          </Button>
        </Paper>
      ) : isMobile ? (
        /* Mobile Card View */
        <Stack spacing={2}>
          {partnerList.map((item) => (
            <Card
              key={item._id}
              sx={{
                bgcolor: isDark ? '#1C2541' : '#FFFFFF',
                border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                borderRadius: 2
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                  <Avatar
                    src={getLogoUrl(item) || undefined}
                    variant="rounded"
                    sx={{ width: 48, height: 48, bgcolor: isDark ? '#0B132B' : '#E2E8F0', color: '#0066CC', fontWeight: 800 }}
                  >
                    {item.name.slice(0, 2).toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 800, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0EA5E9', fontWeight: 600 }}>
                      {item.domain}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleToggleFeatured(item._id)} size="small">
                    {item.featured ? <Star sx={{ color: '#F59E0B' }} /> : <StarBorder sx={{ color: '#94A3B8' }} />}
                  </IconButton>
                </Box>

                {item.description && (
                  <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mb: 1.5 }} noWrap>
                    {item.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={item.tier || 'Technology Partner'}
                    size="small"
                    sx={{ bgcolor: isDark ? '#0B132B' : '#F1F5F9', color: isDark ? '#E2E8F0' : '#334155', fontSize: '10px' }}
                  />
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <IconButton size="small" onClick={() => { setViewItem(item); setOpenViewDialog(true); }}>
                      <Visibility sx={{ color: isDark ? '#94A3B8' : '#64748B' }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleOpenEdit(item)}>
                      <Edit sx={{ color: '#0066CC' }} />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(item._id)}>
                      <Delete sx={{ color: '#EF4444' }} />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        /* Desktop Table View */
        <TableContainer
          component={Paper}
          sx={{
            bgcolor: isDark ? '#1C2541' : '#FFFFFF',
            border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
            borderRadius: 2
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: isDark ? '#0B132B' : '#F8FAFC' }}>
              <TableRow>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 80 }}>Logo</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700 }}>Partner Name</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700 }}>Domain / Specialization</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700 }}>Tier / Level</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 90 }}>Order</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 90, textAlign: 'center' }}>Featured</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 130, textAlign: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partnerList.map((item) => (
                <TableRow
                  key={item._id}
                  hover
                  sx={{
                    '&:hover': { bgcolor: isDark ? '#0B132B50' : '#F1F5F9' },
                    borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0'
                  }}
                >
                  <TableCell>
                    <Avatar
                      src={getLogoUrl(item) || undefined}
                      variant="rounded"
                      sx={{
                        width: 44,
                        height: 44,
                        bgcolor: isDark ? '#0B132B' : '#F1F5F9',
                        color: '#0066CC',
                        fontWeight: 800,
                        border: isDark ? '1px solid #334155' : '1px solid #E2E8F0'
                      }}
                    >
                      {item.name.slice(0, 2).toUpperCase()}
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                      {item.name}
                    </Typography>
                    {item.website && (
                      <Typography
                        component="a"
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        variant="caption"
                        sx={{ color: '#0EA5E9', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 0.5 }}
                      >
                        <LinkIcon sx={{ fontSize: 12 }} /> {item.website.replace(/^https?:\/\//, '')}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: isDark ? '#CBD5E1' : '#334155', fontWeight: 600 }}>
                      {item.domain}
                    </Typography>
                    {item.description && (
                      <Typography variant="caption" sx={{ color: isDark ? '#94A3B8' : '#64748B' }} noWrap display="block">
                        {item.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.tier || 'Global Partner'}
                      size="small"
                      sx={{
                        bgcolor: isDark ? '#0B132B' : '#E2E8F0',
                        color: isDark ? '#E2E8F0' : '#1E293B',
                        fontSize: '11px',
                        fontWeight: 600
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip label={`#${item.order || 0}`} size="small" variant="outlined" sx={{ color: isDark ? '#E2E8F0' : '#475569', borderColor: isDark ? '#334155' : '#CBD5E1' }} />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title={item.featured ? 'Featured on Home & Partners Page' : 'Click to Feature'}>
                      <IconButton onClick={() => handleToggleFeatured(item._id)} size="small">
                        {item.featured ? <Star sx={{ color: '#F59E0B' }} /> : <StarBorder sx={{ color: '#94A3B8' }} />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton size="small" onClick={() => { setViewItem(item); setOpenViewDialog(true); }} title="View Partner">
                        <Visibility sx={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleOpenEdit(item)} title="Edit Partner">
                        <Edit sx={{ color: '#0066CC', fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDelete(item._id)} title="Delete">
                        <Delete sx={{ color: '#EF4444', fontSize: 18 }} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Pagination
            count={pagination.totalPages}
            page={filters.page}
            onChange={(_, val) => setFilters(prev => ({ ...prev, page: val }))}
            color="primary"
          />
        </Box>
      )}

      {/* Create / Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark ? '#1C2541' : '#FFFFFF',
            color: isDark ? '#E2E8F0' : '#0B132B',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
          {dialogMode === 'create' ? 'Register New Global Partner' : 'Edit Partner'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2.5 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Partner / OEM Name"
                placeholder="e.g. CISCO SYSTEMS"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Domain / Specialization"
                placeholder="e.g. Enterprise Routing, Switching & Zero Trust"
                value={formData.domain}
                onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                required
                sx={textFieldStyle}
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Partnership Tier"
                placeholder="e.g. Global Technology Partner, Certified Solution Provider"
                value={formData.tier}
                onChange={(e) => setFormData(prev => ({ ...prev, tier: e.target.value }))}
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="Official Website URL"
                placeholder="https://www.cisco.com"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                sx={textFieldStyle}
              />
            </Stack>

            <TextField
              fullWidth
              label="Collaboration Summary / Scope"
              placeholder="Hardware supply agreements, certified deployment engineers, warranty support..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              multiline
              rows={3}
              sx={textFieldStyle}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField
                label="Display Order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData(prev => ({ ...prev, order: Number(e.target.value) }))}
                sx={{ width: { xs: '100%', sm: 140 }, ...textFieldStyle }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    color="primary"
                  />
                }
                label="Display on Homepage Marquee"
                sx={{ color: isDark ? '#E2E8F0' : '#0B132B' }}
              />
            </Stack>

            {/* Logo Upload */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                Partner Brand Logo (PNG / SVG Preferred)
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUpload />}
                  sx={{
                    borderColor: isDark ? '#334155' : '#CBD5E1',
                    color: isDark ? '#E2E8F0' : '#0B132B'
                  }}
                >
                  Upload Logo
                  <input type="file" hidden accept="image/*" onChange={handleLogoChange} />
                </Button>
                {logoPreview && (
                  <Avatar
                    src={logoPreview}
                    variant="rounded"
                    sx={{ width: 64, height: 64, bgcolor: '#FFFFFF', border: '2px solid #0066CC', p: 0.5 }}
                  />
                )}
              </Stack>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 2.5, borderTop: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
            <Button onClick={() => setOpenDialog(false)} sx={{ color: isDark ? '#94A3B8' : '#64748B' }}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ bgcolor: '#0066CC', '&:hover': { bgcolor: '#0052A3' }, fontWeight: 700 }}
            >
              {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : (dialogMode === 'create' ? 'Register Partner' : 'Save Changes')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Dialog */}
      <Dialog
        open={openViewDialog}
        onClose={() => setOpenViewDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: isDark ? '#1C2541' : '#FFFFFF',
            color: isDark ? '#E2E8F0' : '#0B132B',
            borderRadius: 2
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 800, borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
          Partner Profile
        </DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          {viewItem && (
            <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center' }}>
              <Avatar
                src={getLogoUrl(viewItem) || undefined}
                variant="rounded"
                sx={{ width: 80, height: 80, bgcolor: '#FFFFFF', border: '1px solid #CBD5E1', p: 1 }}
              >
                {viewItem.name.slice(0, 2).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                  {viewItem.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#0EA5E9', fontWeight: 600 }}>
                  {viewItem.domain}
                </Typography>
                <Chip label={viewItem.tier || 'Global Partner'} size="small" sx={{ mt: 1, bgcolor: '#0066CC', color: '#FFFFFF' }} />
              </Box>

              {viewItem.description && (
                <Typography variant="body2" sx={{ color: isDark ? '#CBD5E1' : '#475569', textAlign: 'left', width: '100%' }}>
                  {viewItem.description}
                </Typography>
              )}

              {viewItem.website && (
                <Button
                  component="a"
                  href={viewItem.website}
                  target="_blank"
                  rel="noreferrer"
                  startIcon={<LinkIcon />}
                  sx={{ color: '#0066CC', fontWeight: 700 }}
                >
                  Visit Official Website
                </Button>
              )}
            </Stack>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
          <Button onClick={() => setOpenViewDialog(false)} sx={{ color: '#0066CC', fontWeight: 700 }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
