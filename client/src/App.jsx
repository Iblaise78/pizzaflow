import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { BuilderProvider } from './context/BuilderContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { CustomerLayout } from './components/layout/CustomerLayout.jsx';
import { AdminLayout } from './components/layout/AdminLayout.jsx';
import { ProtectedRoute } from './components/routing/ProtectedRoute.jsx';
import { AdminRoute } from './components/routing/AdminRoute.jsx';
import { RiderRoute } from './components/routing/RiderRoute.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage.jsx';
import { ResetPasswordPage } from './pages/ResetPasswordPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';
import { SetupAdminPage } from './pages/SetupAdminPage.jsx';
import { VerifyEmailPage } from './pages/VerifyEmailPage.jsx';
import { BuilderPage } from './pages/BuilderPage.jsx';
import { MenuPage } from './pages/MenuPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { TrackPage } from './pages/TrackPage.jsx';
import { OrderSummaryPage } from './pages/OrderSummaryPage.jsx';
import { UserDashboardPage } from './pages/UserDashboardPage.jsx';
import { OrdersPage } from './pages/OrdersPage.jsx';
import { AdminLoginPage } from './pages/AdminLoginPage.jsx';
import { AdminDashboardPage } from './pages/AdminDashboardPage.jsx';
import { InventoryPage } from './pages/InventoryPage.jsx';
import { OrderManagementPage } from './pages/OrderManagementPage.jsx';
import { CustomersPage } from './pages/CustomersPage.jsx';
import { CouponsPage } from './pages/CouponsPage.jsx';
import { DeliveryFeesPage } from './pages/DeliveryFeesPage.jsx';
import { SalesReportsPage } from './pages/SalesReportsPage.jsx';
import { AdminSettingsPage } from './pages/AdminSettingsPage.jsx';
import { ProductManagementPage } from './pages/ProductManagementPage.jsx';
import { BannerManagementPage } from './pages/BannerManagementPage.jsx';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';
import { RiderLoginPage } from './pages/RiderLoginPage.jsx';
import { RiderDashboardPage } from './pages/RiderDashboardPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';

function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  if (user.role === 'rider') return <Navigate to="/rider" replace />;
  return <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BuilderProvider>
        <Routes>
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password" element={<ResetPasswordPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="setup-admin" element={<SetupAdminPage />} />
            <Route path="verify-email" element={<VerifyEmailPage />} />
            <Route path="admin/login" element={<AdminLoginPage />} />
            <Route path="rider/login" element={<RiderLoginPage />} />
            <Route path="builder" element={<BuilderPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="track" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="summary" element={<OrderSummaryPage />} />
            <Route path="payment/success" element={<ProtectedRoute><PaymentSuccessPage /></ProtectedRoute>} />
            <Route path="dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
            <Route path="orders" element={<ProtectedRoute><OrdersPage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="rider" element={<RiderRoute><RiderDashboardPage /></RiderRoute>} />
            <Route path="me" element={<RoleRedirect />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
            <Route path="orders" element={<AdminRoute><OrderManagementPage /></AdminRoute>} />
            <Route path="inventory" element={<AdminRoute><InventoryPage /></AdminRoute>} />
            <Route path="products" element={<AdminRoute><ProductManagementPage /></AdminRoute>} />
            <Route path="banners" element={<AdminRoute><BannerManagementPage /></AdminRoute>} />
            <Route path="customers" element={<AdminRoute><CustomersPage /></AdminRoute>} />
            <Route path="coupons" element={<AdminRoute><CouponsPage /></AdminRoute>} />
            <Route path="delivery-fees" element={<AdminRoute><DeliveryFeesPage /></AdminRoute>} />
            <Route path="reports" element={<AdminRoute><SalesReportsPage /></AdminRoute>} />
            <Route path="settings" element={<AdminRoute><AdminSettingsPage /></AdminRoute>} />
          </Route>
        </Routes>
        </BuilderProvider>
      </CartProvider>
    </AuthProvider>
  );
}
