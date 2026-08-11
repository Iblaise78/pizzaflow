const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

async function request(path, options = {}) {
  const auth = JSON.parse(localStorage.getItem('pizzaflow-auth') || 'null');
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      ...(options.headers || {})
    },
    ...options
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || 'Request failed');
  }

  return response.json();
}

export const api = {
  ping: () => request('/api/health'),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  register: (payload) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(payload) }),
  setupAdmin: (payload) => request('/api/auth/setup-admin', { method: 'POST', body: JSON.stringify(payload) }),
  verifyEmail: (payload) => request('/api/auth/verify-email', { method: 'POST', body: JSON.stringify(payload) }),
  resendVerificationCode: (payload) => request('/api/auth/resend-code', { method: 'POST', body: JSON.stringify(payload) }),
  forgotPassword: (payload) => request('/api/auth/forgot-password', { method: 'POST', body: JSON.stringify(payload) }),
  resetPassword: (payload) => request('/api/auth/reset-password', { method: 'POST', body: JSON.stringify(payload) }),
  menu: () => request('/api/pizzas/options'),
  products: () => request('/api/products'),
  banners: () => request('/api/banners'),
  createProduct: (payload) => request('/api/products', { method: 'POST', body: JSON.stringify(payload) }),
  updateProduct: (id, payload) => request(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteProduct: (id) => request(`/api/products/${id}`, { method: 'DELETE' }),
  createBanner: (payload) => request('/api/banners', { method: 'POST', body: JSON.stringify(payload) }),
  updateBanner: (id, payload) => request(`/api/banners/${id}`, { method: 'PATCH', body: JSON.stringify(payload) }),
  deleteBanner: (id) => request(`/api/banners/${id}`, { method: 'DELETE' }),
  orders: () => request('/api/orders/my-orders'),
  adminOrders: () => request('/api/orders/admin/all'),
  inventory: () => request('/api/inventory'),
  lowStock: () => request('/api/inventory/low-stock'),
  adminOverview: () => request('/api/admin/overview'),
  adminCustomers: () => request('/api/admin/customers'),
  adminCoupons: () => request('/api/admin/coupons'),
  deliveryFees: () => request('/api/admin/delivery-fees'),
  reports: () => request('/api/admin/reports'),
  riderDashboard: () => request('/api/rider/dashboard'),
  updateRiderOrder: (id, status) => request(`/api/rider/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  createOrder: (payload) => request('/api/orders', { method: 'POST', body: JSON.stringify(payload) }),
  updateOrderStatus: (id, status) => request(`/api/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  updateInventory: (id, patch) => request(`/api/inventory/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  createPaymentOrder: (payload) => request('/api/payments/create-order', { method: 'POST', body: JSON.stringify(payload) }),
  verifyPayment: (payload) => request('/api/payments/verify', { method: 'POST', body: JSON.stringify(payload) })
};
