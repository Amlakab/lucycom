'use client';

import { useState, useEffect } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Chip, Alert,
  Pagination, TextField, IconButton, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Stack, useMediaQuery,
  Card, CardContent, Avatar, Tooltip, MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import {
  Add, Edit, Delete, Search, Refresh,
  Visibility, Layers, CheckCircle
} from '@mui/icons-material';
import { useTheme } from '@/lib/theme-context';
import { ProductItem, PRODUCTS_CATALOG } from '@/lib/data/products';

export default function ProductsTab() {
  const { theme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isDark = theme === 'dark';

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Dialog states
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit' | 'view'>('create');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ProductItem>>({
    name: '',
    nameAm: '',
    category: 'TELECOM',
    categoryLabel: 'Telecom & Wireless',
    categoryLabelAm: 'ቴሌኮም እና ገመድ-አልባ',
    brand: '',
    image: '',
    badge: 'Carrier Grade',
    badgeAm: 'የቴሌኮም ደረጃ',
    shortDesc: '',
    shortDescAm: '',
    specs: [''],
    specsAm: [''],
    contactService: 'Telecom Infrastructure',
  });

  // Load from local storage or initialize with default catalog
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lucycom_admin_products');
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        setProducts(PRODUCTS_CATALOG);
        localStorage.setItem('lucycom_admin_products', JSON.stringify(PRODUCTS_CATALOG));
      }
    } catch {
      setProducts(PRODUCTS_CATALOG);
    }
  }, []);

  const saveProducts = (newList: ProductItem[]) => {
    setProducts(newList);
    try {
      localStorage.setItem('lucycom_admin_products', JSON.stringify(newList));
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenCreate = () => {
    setDialogMode('create');
    setFormData({
      name: '',
      nameAm: '',
      category: 'TELECOM',
      categoryLabel: 'Telecom & Wireless',
      categoryLabelAm: 'ቴሌኮም እና ገመድ-አልባ',
      brand: 'HUAWEI',
      image: '',
      badge: 'Carrier Grade',
      badgeAm: 'የቴሌኮም ደረጃ',
      shortDesc: '',
      shortDescAm: '',
      specs: ['High availability', 'Low power consumption', 'Modular design'],
      specsAm: ['ከፍተኛ አስተማማኝነት', 'አነስተኛ የሃይል ፍጆታ', 'ሞጁላር ዲዛይን'],
      contactService: 'Telecom Infrastructure',
    });
    setOpenDialog(true);
  };

  const handleOpenEdit = (item: ProductItem) => {
    setDialogMode('edit');
    setSelectedProduct(item);
    setFormData({ ...item });
    setOpenDialog(true);
  };

  const handleOpenView = (item: ProductItem) => {
    setDialogMode('view');
    setSelectedProduct(item);
    setFormData({ ...item });
    setOpenDialog(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this product from the catalog?')) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
      setSuccess('Product removed successfully.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.brand) {
      setError('Product name and OEM brand are required.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    if (dialogMode === 'create') {
      const newProduct: ProductItem = {
        id: `prod-${Date.now()}`,
        name: formData.name || '',
        nameAm: formData.nameAm || formData.name || '',
        category: (formData.category as any) || 'TELECOM',
        categoryLabel: formData.categoryLabel || 'Enterprise Product',
        categoryLabelAm: formData.categoryLabelAm || 'የድርጅት ምርት',
        brand: formData.brand || 'OEM',
        image: formData.image || '',
        badge: formData.badge || 'Carrier Grade',
        badgeAm: formData.badgeAm || 'የቴሌኮም ደረጃ',
        shortDesc: formData.shortDesc || '',
        shortDescAm: formData.shortDescAm || '',
        specs: formData.specs || [],
        specsAm: formData.specsAm || [],
        contactService: formData.contactService || 'Telecom Infrastructure',
      };
      saveProducts([newProduct, ...products]);
      setSuccess('New product added to catalog successfully.');
    } else if (dialogMode === 'edit' && selectedProduct) {
      const updated = products.map((p) =>
        p.id === selectedProduct.id ? ({ ...p, ...formData } as ProductItem) : p
      );
      saveProducts(updated);
      setSuccess('Product updated successfully.');
    }

    setOpenDialog(false);
    setTimeout(() => setSuccess(''), 3000);
  };

  const filtered = products.filter((p) => {
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.nameAm.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <Box>
      {/* Alert Notices */}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Header and Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          mb: 3,
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? '#F8FAFC' : '#0F172A' }}>
            Products & Hardware Catalog ({products.length})
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B' }}>
            Manage carrier-grade and enterprise equipment aligned with OEM partners
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenCreate}
            sx={{
              backgroundColor: '#0066CC',
              '&:hover': { backgroundColor: '#0052A3' },
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
            }}
          >
            Add Product
          </Button>
          <IconButton
            onClick={() => {
              saveProducts(PRODUCTS_CATALOG);
              setSuccess('Catalog reset to standard OEM baseline.');
              setTimeout(() => setSuccess(''), 3000);
            }}
            sx={{
              backgroundColor: isDark ? '#1E293B' : '#F1F5F9',
              color: isDark ? '#94A3B8' : '#64748B',
            }}
            title="Reset to Baseline"
          >
            <Refresh />
          </IconButton>
        </Stack>
      </Box>

      {/* Filter and Search Bar */}
      <Paper
        sx={{
          p: 2,
          mb: 3,
          backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
          border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
          borderRadius: 2,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <TextField
          size="small"
          placeholder="Search by product title or brand..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: isDark ? '#94A3B8' : '#64748B', fontSize: 20 }} />,
          }}
          sx={{ flex: 1 }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            label="Category"
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <MenuItem value="ALL">All Categories</MenuItem>
            <MenuItem value="TELECOM">Telecom & Wireless</MenuItem>
            <MenuItem value="DATACENTER">Data Center & Datacom</MenuItem>
            <MenuItem value="SECURITY">Security & Firewall</MenuItem>
            <MenuItem value="NETWORKING">Networking</MenuItem>
            <MenuItem value="EDUCATION">Smart Education & VDI</MenuItem>
            <MenuItem value="POWER">Power & Generators</MenuItem>
          </Select>
        </FormControl>
      </Paper>

      {/* Table / Cards */}
      {isMobile ? (
        <Stack spacing={2}>
          {filtered.map((item) => (
            <Card
              key={item.id}
              sx={{
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1.5 }}>
                  <Avatar
                    src={item.image}
                    variant="rounded"
                    sx={{ width: 56, height: 56, bgcolor: '#0066CC' }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#0EA5E9', fontWeight: 600 }}>
                      {item.brand} • {item.category}
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body2" sx={{ color: isDark ? '#94A3B8' : '#64748B', fontSize: '0.8rem', mb: 2 }}>
                  {item.shortDesc}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                  <IconButton size="small" onClick={() => handleOpenView(item)} color="info">
                    <Visibility fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleOpenEdit(item)} color="primary">
                    <Edit fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => handleDelete(item.id)} color="error">
                    <Delete fontSize="small" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            border: isDark ? '1px solid #334155' : '1px solid #E2E8F0',
            borderRadius: 2,
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}>
                <TableCell sx={{ fontWeight: 700, color: isDark ? '#F8FAFC' : '#0F172A' }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700, color: isDark ? '#F8FAFC' : '#0F172A' }}>OEM Brand</TableCell>
                <TableCell sx={{ fontWeight: 700, color: isDark ? '#F8FAFC' : '#0F172A' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 700, color: isDark ? '#F8FAFC' : '#0F172A' }}>Tier Badge</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: isDark ? '#F8FAFC' : '#0F172A' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.map((item) => (
                <TableRow
                  key={item.id}
                  hover
                  sx={{ '&:hover': { backgroundColor: isDark ? '#334155/30' : '#F8FAFC' } }}
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 44, height: 44, bgcolor: '#0066CC' }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#F8FAFC' : '#0F172A' }}>
                          {item.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: isDark ? '#94A3B8' : '#64748B' }}>
                          {item.nameAm}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.brand}
                      size="small"
                      sx={{
                        fontWeight: 700,
                        backgroundColor: '#0066CC',
                        color: '#FFFFFF',
                        fontSize: '0.7rem',
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.category}
                      size="small"
                      variant="outlined"
                      sx={{ fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="caption" sx={{ fontWeight: 600, color: '#10B981' }}>
                      {item.badge}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="View Details">
                        <IconButton size="small" onClick={() => handleOpenView(item)} color="info">
                          <Visibility fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Product">
                        <IconButton size="small" onClick={() => handleOpenEdit(item)} color="primary">
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => handleDelete(item.id)} color="error">
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create / Edit / View Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
            color: isDark ? '#F8FAFC' : '#0F172A',
            borderRadius: 3,
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 700, borderBottom: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
          {dialogMode === 'create' && 'Add New Hardware / Product'}
          {dialogMode === 'edit' && 'Edit Product Information'}
          {dialogMode === 'view' && 'Product Specifications Details'}
        </DialogTitle>

        <DialogContent sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
          {dialogMode === 'view' && selectedProduct ? (
            <Box sx={{ spaceY: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#0066CC' }}>
                {selectedProduct.name}
              </Typography>
              <Typography variant="subtitle2" sx={{ color: isDark ? '#94A3B8' : '#64748B', mb: 2 }}>
                {selectedProduct.nameAm}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                {selectedProduct.shortDesc}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Technical Specifications:
              </Typography>
              <Stack spacing={1}>
                {selectedProduct.specs.map((s, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16, color: '#10B981' }} />
                    <Typography variant="body2">{s}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          ) : (
            <>
              <TextField
                label="Product Name (English)"
                fullWidth
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <TextField
                label="Product Name (Amharic)"
                fullWidth
                value={formData.nameAm || ''}
                onChange={(e) => setFormData({ ...formData, nameAm: e.target.value })}
              />
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="OEM Manufacturer Brand (e.g. HUAWEI, NOKIA, CISCO)"
                  fullWidth
                  value={formData.brand || ''}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                />
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category || 'TELECOM'}
                    label="Category"
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  >
                    <MenuItem value="TELECOM">Telecom & Wireless</MenuItem>
                    <MenuItem value="DATACENTER">Data Center & Datacom</MenuItem>
                    <MenuItem value="SECURITY">Security & Firewall</MenuItem>
                    <MenuItem value="NETWORKING">Networking</MenuItem>
                    <MenuItem value="EDUCATION">Smart Education & VDI</MenuItem>
                    <MenuItem value="POWER">Power & Generators</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Badge Label (e.g. Carrier Grade, Tier III Ready)"
                  fullWidth
                  value={formData.badge || ''}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                />
                <TextField
                  label="Image Asset Path"
                  fullWidth
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </Stack>
              <TextField
                label="Overview / Description (English)"
                fullWidth
                multiline
                rows={2}
                value={formData.shortDesc || ''}
                onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              />
              <TextField
                label="Overview / Description (Amharic)"
                fullWidth
                multiline
                rows={2}
                value={formData.shortDescAm || ''}
                onChange={(e) => setFormData({ ...formData, shortDescAm: e.target.value })}
              />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, borderTop: isDark ? '1px solid #334155' : '1px solid #E2E8F0' }}>
          <Button onClick={() => setOpenDialog(false)} sx={{ textTransform: 'none' }}>
            {dialogMode === 'view' ? 'Close' : 'Cancel'}
          </Button>
          {dialogMode !== 'view' && (
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ backgroundColor: '#0066CC', textTransform: 'none', fontWeight: 600 }}
            >
              {dialogMode === 'create' ? 'Create Product' : 'Save Changes'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
}
