import api from '@/app/utils/api';

export const portfolioApi = {
  // Public
  getProjects: (params?: any) => api.get('/portfolio/projects', { params }),
  getProject: (id: string) => api.get(`/portfolio/projects/${id}`),
  getSolutions: (params?: any) => api.get('/portfolio/solutions', { params }),
  getSolution: (id: string) => api.get(`/portfolio/solutions/${id}`),
  getPartners: (params?: any) => api.get('/portfolio/partners', { params }),
  getPartner: (id: string) => api.get(`/portfolio/partners/${id}`),
  getExperiences: () => api.get('/portfolio/experiences'),
  getEducations: () => api.get('/portfolio/educations'),
  getTestimonials: (params?: any) => api.get('/portfolio/testimonials', { params }),
  getBlogPosts: (params?: any) => api.get('/portfolio/blog', { params }),
  getBlogPost: (slug: string) => api.get(`/portfolio/blog/${slug}`),
  getSkills: () => api.get('/portfolio/skills'),
  getSettings: () => api.get('/portfolio/settings'),
  getCertifications: (params?: any) => api.get('/portfolio/certifications', { params }),
  getCertification: (id: string) => api.get(`/portfolio/certifications/${id}`),

  // Chatbot
  sendChatMessage: (message: string, history?: any[]) => 
    api.post('/portfolio/chatbot', { message, history }),

  // Seed
  seedDatabase: () => api.post('/portfolio/seed'),

  // Admin – Solutions
  getSolutionsAdmin: (params?: any) => api.get('/admin/portfolio/solutions', { params }),
  createSolution: (data: FormData | any) =>
    api.post('/admin/portfolio/solutions', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
  updateSolution: (id: string, data: FormData | any) =>
    api.put(`/admin/portfolio/solutions/${id}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
  deleteSolution: (id: string) => api.delete(`/admin/portfolio/solutions/${id}`),
  toggleSolutionFeatured: (id: string) => api.patch(`/admin/portfolio/solutions/${id}/featured`),

  // Admin – Partners
  getPartnersAdmin: (params?: any) => api.get('/admin/portfolio/partners', { params }),
  createPartner: (data: FormData | any) =>
    api.post('/admin/portfolio/partners', data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
  updatePartner: (id: string, data: FormData | any) =>
    api.put(`/admin/portfolio/partners/${id}`, data, {
      headers: data instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : undefined,
    }),
  deletePartner: (id: string) => api.delete(`/admin/portfolio/partners/${id}`),
  togglePartnerFeatured: (id: string) => api.patch(`/admin/portfolio/partners/${id}/featured`),

  // Admin – Projects
  getProjectsAdmin: (params?: any) => api.get('/admin/portfolio/projects', { params }),
  createProject: (data: FormData) =>
    api.post('/admin/portfolio/projects', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateProject: (id: string, data: FormData) =>
    api.put(`/admin/portfolio/projects/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteProject: (id: string) => api.delete(`/admin/portfolio/projects/${id}`),
  toggleFeatured: (id: string) => api.patch(`/admin/portfolio/projects/${id}/featured`),

  // Admin – Certifications
  getCertificationsAdmin: (params?: any) => api.get('/admin/portfolio/certifications', { params }),
  createCertification: (data: FormData) =>
    api.post('/admin/portfolio/certifications', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateCertification: (id: string, data: FormData) =>
    api.put(`/admin/portfolio/certifications/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteCertification: (id: string) => api.delete(`/admin/portfolio/certifications/${id}`),
  toggleCertificationFeatured: (id: string) => api.patch(`/admin/portfolio/certifications/${id}/featured`),

  // Admin – Testimonials
  getTestimonialsAdmin: (params?: any) => api.get('/admin/portfolio/testimonials', { params }),
  createTestimonial: (data: FormData) =>
    api.post('/admin/portfolio/testimonials', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateTestimonial: (id: string, data: FormData) =>
    api.put(`/admin/portfolio/testimonials/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteTestimonial: (id: string) => api.delete(`/admin/portfolio/testimonials/${id}`),
  toggleTestimonialFeatured: (id: string) => api.patch(`/admin/portfolio/testimonials/${id}/featured`),

  // Admin – Blog
  getBlogPostsAdmin: (params?: any) => api.get('/admin/portfolio/blog', { params }),
  createBlogPost: (data: FormData) =>
    api.post('/admin/portfolio/blog', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateBlogPost: (id: string, data: FormData) =>
    api.put(`/admin/portfolio/blog/${id}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteBlogPost: (id: string) => api.delete(`/admin/portfolio/blog/${id}`),
  togglePublish: (id: string) => api.patch(`/admin/portfolio/blog/${id}/publish`),

  // Admin – Settings
  getSettingsAdmin: () => api.get('/admin/portfolio/settings'),
  updateSettings: (data: FormData) =>
    api.put('/admin/portfolio/settings', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Legacy compatibility
  getExperiencesAdmin: (params?: any) => api.get('/admin/portfolio/experiences', { params }),
  createExperience: (data: any) => api.post('/admin/portfolio/experiences', data),
  updateExperience: (id: string, data: any) => api.put(`/admin/portfolio/experiences/${id}`, data),
  deleteExperience: (id: string) => api.delete(`/admin/portfolio/experiences/${id}`),

  getEducationsAdmin: (params?: any) => api.get('/admin/portfolio/educations', { params }),
  createEducation: (data: any) => api.post('/admin/portfolio/educations', data),
  updateEducation: (id: string, data: any) => api.put(`/admin/portfolio/educations/${id}`, data),
  deleteEducation: (id: string) => api.delete(`/admin/portfolio/educations/${id}`),

  getSkillsAdmin: (params?: any) => api.get('/admin/portfolio/skills', { params }),
  createSkill: (data: any) => api.post('/admin/portfolio/skills', data),
  updateSkill: (id: string, data: any) => api.put(`/admin/portfolio/skills/${id}`, data),
  deleteSkill: (id: string) => api.delete(`/admin/portfolio/skills/${id}`),
};

export default portfolioApi;
