import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export function AdminLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="shell admin-shell">
      <header className="kitchen-topbar">
        <Link to="/" className="brand brand-customer"><span className="brand-mark">♨</span><span>FORNO NERO</span></Link>
        <nav className="admin-nav">
          <NavLink to="/admin">Kitchen</NavLink>
          <NavLink to="/admin/products">Menu</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/inventory">Inventory</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink>
        </nav>
        <div className="nav-actions"><Link to="/" className="ghost-button">Customer app</Link><button className="ghost-button" onClick={logout}>Sign out</button></div>
      </header>
      <aside className="admin-sidebar">
        <nav className="admin-nav admin-nav-secondary">
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/banners">Banners</NavLink>
          <NavLink to="/admin/customers">Customers</NavLink>
          <NavLink to="/admin/orders">Orders</NavLink>
          <NavLink to="/admin/inventory">Inventory</NavLink>
          <NavLink to="/admin/coupons">Coupons</NavLink>
          <NavLink to="/admin/delivery-fees">Delivery Fees</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink>
          <NavLink to="/admin/settings">Settings</NavLink>
        </nav>
        <div className="admin-sidebar-footer">
          <Link to="/" className="ghost-button">Customer app</Link>
          <button className="ghost-button" onClick={logout}>{user?.name || 'Logout'}</button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-topline"><div><span className="eyebrow">Forno Nero / kitchen console</span><strong>{user?.name || 'Admin'} · service is live</strong></div><span className="admin-live"><span className="live-dot" /> Oven online</span></div>
        <Outlet />
      </main>
    </div>
  );
}
