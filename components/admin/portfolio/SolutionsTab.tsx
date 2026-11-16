'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Alert, Snackbar, CircularProgress,
  Pagination, TextField, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Stack, useMediaQuery,
  Card, CardContent, Avatar, Divider, Switch, FormControlLabel,
  Tooltip
} from '@mui/material';
import {
  Add, Edit, Delete, Search, Refresh, Star, StarBorder,
  CloudUpload, Visibility, ExpandMore, ExpandLess,
  Description, SettingsInputAntenna, Layers
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useTheme } from '@/lib/theme-context';
import portfolioApi from '@/lib/api/portfolio';

export interface SolutionItem {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon?: string;
  features: string[];
  keyTechnologies: string[];
  deliverables?: string;
  image?: string;
  imageData?: any;
  order: number;
  featured: boolean;
  created_at?: string;
}

const getImageUrl = (item: SolutionItem): string | null => {
  if (item.imageData?.data) {
    let base64 = '';
    if (typeof item.imageData.data === 'string') base64 = item.imageData.data;
    else if (item.imageData.data?.$binary?.base64) base64 = item.imageData.data.$binary.base64;
    else if (item.imageData.data?.data) {
      base64 = Buffer.from(item.imageData.data.data).toString('base64');
    }
    if (base64) return `data:${item.imageData.contentType || 'image/jpeg'};base64,${base64}`;
  }
  if (item.image?.startsWith('data:image')) return item.image;
  return item.image || null;
};

export default function SolutionsTab() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = theme === 'dark';

  const [solutions, setSolutions] = useState<SolutionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalItems: 0 });
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Dialogs
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewItem, setViewItem] = useState<SolutionItem | null>(null);

  // Filters & Search
  const [filters, setFilters] = useState({ search: '', page: 1, limit: 10 });

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    icon: 'Radio',
    features: '',
    keyTechnologies: '',
    deliverables: '',
    order: 0,
    featured: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Fetch Solutions
  const fetchSolutions = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await portfolioApi.getSolutionsAdmin(filters);
      const responseData = res.data?.data ?? res.data ?? {};
      const solutionArray = Array.isArray(responseData.data)
        ? responseData.data
        : Array.isArray(responseData)
          ? responseData
          : [];
      setSolutions(solutionArray);
      if (responseData.pagination) {
        setPagination(responseData.pagination);
      } else if (res.data?.pagination) {
        setPagination(res.data.pagination);
      } else {
        setPagination({
          currentPage: filters.page || 1,
          totalPages: Math.ceil(solutionArray.length / (filters.limit || 10)) || 1,
          totalItems: solutionArray.length,
        });
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to fetch solutions');
      setSolutions([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSolutions();
  }, [fetchSolutions]);

  const handleOpenCreate = () => {
    setDialogMode('create');
    setSelectedSolution(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      icon: 'Radio',
      features: '',
      keyTechnologies: '',
      deliverables: '',
      order: solutions.length,
      featured: true,
    });
    setImageFile(null);
    setImagePreview(null);
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: SolutionItem) => {
    setDialogMode('edit');
    setSelectedSolution(item);
    setFormData({
      title: item.title,
      slug: item.slug || '',
      shortDescription: item.shortDescription || '',
      description: item.description || '',
      icon: item.icon || 'Radio',
      features: Array.isArray(item.features) ? item.features.join(', ') : '',
      keyTechnologies: Array.isArray(item.keyTechnologies) ? item.keyTechnologies.join(', ') : '',
      deliverables: item.deliverables || '',
      order: item.order || 0,
      featured: item.featured ?? true,
    });
    setImageFile(null);
    setImagePreview(getImageUrl(item));
    setOpenDialog(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setError('Solution Title is required');
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      data.append('shortDescription', formData.shortDescription);
      data.append('description', formData.description);
      data.append('icon', formData.icon);
      data.append('order', formData.order.toString());
      data.append('featured', formData.featured.toString());
      data.append('deliverables', formData.deliverables);

      // Parse comma-separated lists to JSON arrays
      const featArr = formData.features.split(',').map(s => s.trim()).filter(Boolean);
      data.append('features', JSON.stringify(featArr));

      const techArr = formData.keyTechnologies.split(',').map(s => s.trim()).filter(Boolean);
      data.append('keyTechnologies', JSON.stringify(techArr));

      if (imageFile) {
        data.append('image', imageFile);
      }

      if (dialogMode === 'create') {
        await portfolioApi.createSolution(data);
        setSuccess('Solution created successfully!');
      } else if (selectedSolution) {
        await portfolioApi.updateSolution(selectedSolution._id, data);
        setSuccess('Solution updated successfully!');
      }

      setOpenDialog(false);
      fetchSolutions();
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Error saving solution');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this solution?')) return;
    try {
      setLoading(true);
      await portfolioApi.deleteSolution(id);
      setSuccess('Solution deleted successfully!');
      fetchSolutions();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to delete solution');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await portfolioApi.toggleSolutionFeatured(id);
      setSolutions(prev =>
        prev.map(item => item._id === id ? { ...item, featured: !item.featured } : item)
      );
      setSuccess('Solution status updated');
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

  const solutionList = Array.isArray(solutions) ? solutions : [];

  return (
    <Box>
      {/* Header & Controls */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'stretch', sm: 'center' }, gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: isDark ? '#E2E8F0' : '#0B132B' }}>
            Solutions Management
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Manage Lucycom's core technology pillars (Telecom, Data Center, Smart Education, Security)
          </Typography>
        </Box>

        <Stack direction="row" spacing={1.5}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={() => fetchSolutions()}
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
            Add Solution
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
            placeholder="Search solutions by title, description or specs..."
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
      ) : solutionList.length === 0 ? (
        <Paper
          sx={{
            py: 8,
            textAlign: 'center',
            bgcolor: isDark ? '#1C2541' : '#F8FAFC',
            border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
            borderRadius: 2
          }}
        >
          <SettingsInputAntenna sx={{ fontSize: 48, color: '#0066CC', mb: 1, opacity: 0.6 }} />
          <Typography variant="h6" sx={{ color: isDark ? '#E2E8F0' : '#1E293B', fontWeight: 700 }}>
            No Solutions Found
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mb: 2 }}>
            Get started by adding your first corporate technology solution.
          </Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleOpenCreate} sx={{ bgcolor: '#0066CC' }}>
            Add Solution
          </Button>
        </Paper>
      ) : isMobile ? (
        /* Mobile Card View */
        <Stack spacing={2}>
          {solutionList.map((item) => (
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
                    src={getImageUrl(item) || undefined}
                    variant="rounded"
                    sx={{ width: 48, height: 48, bgcolor: '#0066CC' }}
                  >
                    <SettingsInputAntenna />
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="subtitle1" noWrap sx={{ fontWeight: 700, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0EA5E9', fontWeight: 600 }}>
                      /{item.slug}
                    </Typography>
                  </Box>
                  <IconButton onClick={() => handleToggleFeatured(item._id)} size="small">
                    {item.featured ? <Star sx={{ color: '#F59E0B' }} /> : <StarBorder sx={{ color: '#94A3B8' }} />}
                  </IconButton>
                </Box>

                <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mb: 1.5 }} noWrap>
                  {item.shortDescription}
                </Typography>

                <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ gap: 0.5, mb: 2 }}>
                  {item.keyTechnologies?.slice(0, 3).map((tech, i) => (
                    <Chip key={i} label={tech} size="small" sx={{ bgcolor: isDark ? '#0B132B' : '#E2E8F0', color: isDark ? '#E2E8F0' : '#1E293B', fontSize: '10px' }} />
                  ))}
                </Stack>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 80 }}>Icon/Img</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700 }}>Solution Title</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700 }}>Short Description</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700 }}>Technologies</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 90 }}>Order</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 90, textAlign: 'center' }}>Featured</TableCell>
                <TableCell sx={{ color: isDark ? '#E2E8F0' : '#0B132B', fontWeight: 700, width: 130, textAlign: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {solutionList.map((item) => (
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
                      src={getImageUrl(item) || undefined}
                      variant="rounded"
                      sx={{ width: 44, height: 44, bgcolor: '#0066CC', borderRadius: 1.5 }}
                    >
                      <SettingsInputAntenna />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0EA5E9', fontFamily: 'monospace' }}>
                      slug: {item.slug}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 300 }}>
                    <Typography variant="body2" sx={{ color: isDark ? '#CBD5E1' : '#475569' }} noWrap>
                      {item.shortDescription}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 220 }}>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ gap: 0.5 }}>
                      {item.keyTechnologies?.slice(0, 3).map((tech, i) => (
                        <Chip
                          key={i}
                          label={tech}
                          size="small"
                          sx={{
                            bgcolor: isDark ? '#0B132B' : '#E2E8F0',
                            color: isDark ? '#E2E8F0' : '#1E293B',
                            fontSize: '11px',
                            height: 20
                          }}
                        />
                      ))}
                      {item.keyTechnologies && item.keyTechnologies.length > 3 && (
                        <Typography variant="caption" sx={{ color: isDark ? '#94A3B8' : '#64748B', alignSelf: 'center' }}>
                          +{item.keyTechnologies.length - 3}
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip label={`#${item.order || 0}`} size="small" variant="outlined" sx={{ color: isDark ? '#E2E8F0' : '#475569', borderColor: isDark ? '#334155' : '#CBD5E1' }} />
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    <Tooltip title={item.featured ? 'Featured on Home & Navbar' : 'Click to Feature'}>
                      <IconButton onClick={() => handleToggleFeatured(item._id)} size="small">
                        {item.featured ? <Star sx={{ color: '#F59E0B' }} /> : <StarBorder sx={{ color: '#94A3B8' }} />}
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'right' }}>
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton size="small" onClick={() => { setViewItem(item); setOpenViewDialog(true); }} title="View Details">
                        <Visibility sx={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: 18 }} />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleOpenEdit(item)} title="Edit Solution">
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
          {dialogMode === 'create' ? 'Add New Corporate Solution' : 'Edit Solution'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2.5 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Solution Title"
                placeholder="e.g. Telecom Infrastructure & 5G Rollout"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
                sx={textFieldStyle}
              />
              <TextField
                fullWidth
                label="URL Slug (Optional)"
                placeholder="e.g. telecom-infrastructure"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                sx={textFieldStyle}
              />
            </Stack>

            <TextField
              fullWidth
              label="Short Summary (shown on cards & previews)"
              placeholder="e.g. Turnkey BTS deployment, optical fiber networking, and RF site optimization."
              value={formData.shortDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
              required
              multiline
              rows={2}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Full Description & Engineering Specs"
              placeholder="Detailed overview of Lucycom's technical scope, SLA commitments, and engineering deliverables..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
              multiline
              rows={4}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Features & Capabilities (comma-separated)"
              placeholder="5G/4G RAN Rollout, Tower Erection, Optical Fiber Splicing, RF Drive Testing, Spectrum Optimization"
              value={formData.features}
              onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
              helperText="Separate multiple capabilities with commas"
              FormHelperTextProps={{ sx: { color: isDark ? '#94A3B8' : '#64748B' } }}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Key Technologies & Vendor Platforms (comma-separated)"
              placeholder="Huawei BTS, Nokia AirScale, Cisco ASR, SingleRAN, OTDR Testing"
              value={formData.keyTechnologies}
              onChange={(e) => setFormData(prev => ({ ...prev, keyTechnologies: e.target.value }))}
              sx={textFieldStyle}
            />

            <TextField
              fullWidth
              label="Client Deliverables (Optional)"
              placeholder="Complete Site Acceptance Document, Fiber As-Built CAD, 24/7 SLA"
              value={formData.deliverables}
              onChange={(e) => setFormData(prev => ({ ...prev, deliverables: e.target.value }))}
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
                label="Featured in Navbar & Homepage"
                sx={{ color: isDark ? '#E2E8F0' : '#0B132B' }}
              />
            </Stack>

            {/* Image Upload */}
            <Box>
              <Typography variant="body2" sx={{ mb: 1, fontWeight: 700, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                Solution Diagram / Cover Image
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
                  Upload File
                  <input type="file" hidden accept="image/*" onChange={handleImageChange} />
                </Button>
                {imagePreview && (
                  <Avatar
                    src={imagePreview}
                    variant="rounded"
                    sx={{ width: 64, height: 64, border: '2px solid #0066CC' }}
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
              {loading ? <CircularProgress size={24} sx={{ color: '#FFFFFF' }} /> : (dialogMode === 'create' ? 'Create Solution' : 'Save Changes')}
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
          Solution Details
        </DialogTitle>
        <DialogContent sx={{ pt: 2.5 }}>
          {viewItem && (
            <Stack spacing={2}>
              {getImageUrl(viewItem) && (
                <Box
                  component="img"
                  src={getImageUrl(viewItem)!}
                  alt={viewItem.title}
                  sx={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 2 }}
                />
              )}
              <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                {viewItem.title}
              </Typography>
              <Typography variant="body2" sx={{ color: '#0EA5E9', fontWeight: 600 }}>
                Slug: /{viewItem.slug}
              </Typography>
              <Typography variant="body1" sx={{ color: isDark ? '#CBD5E1' : '#334155' }}>
                {viewItem.description}
              </Typography>

              {viewItem.features && viewItem.features.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                    Key Features:
                  </Typography>
                  <ul style={{ paddingLeft: 20, margin: 0 }}>
                    {viewItem.features.map((f, i) => (
                      <li key={i}>
                        <Typography variant="body2" sx={{ color: isDark ? '#CBD5E1' : '#475569' }}>{f}</Typography>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}

              {viewItem.keyTechnologies && viewItem.keyTechnologies.length > 0 && (
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1, color: isDark ? '#E2E8F0' : '#0B132B' }}>
                    Supported Technologies:
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
                    {viewItem.keyTechnologies.map((t, i) => (
                      <Chip key={i} label={t} size="small" sx={{ bgcolor: '#0066CC', color: '#FFFFFF' }} />
                    ))}
                  </Stack>
                </Box>
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
