import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

export function AppLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          PizzaFlow
        </Link>
        <nav className="nav">
          <Link to="/builder" className={location.pathname === '/builder' ? 'active' : ''}>Builder</Link>
          <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>Dashboard</Link>
          <Link to="/orders" className={location.pathname === '/orders' ? 'active' : ''}>Orders</Link>
          {user?.role === 'admin' && (
            <>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
              <Link to="/admin/inventory">Inventory</Link>
            </>
          )}
        </nav>
        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-pill">{user.name}</span>
              <button className="ghost-button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost-button">Login</Link>
              <Link to="/register" className="primary-button">Register</Link>
            </>
          )}
        </div>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

