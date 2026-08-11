import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';

export function CustomerLayout() {
  const { user, logout } = useAuth();
  const { count } = useCart();

  return (
    <div className="shell customer-shell">
      <header className="customer-topbar">
        <Link to="/" className="brand brand-customer">
          <span className="brand-mark">♨</span>
          <span>FORNO NERO</span>
        </Link>
        <nav className="customer-nav">
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/builder">Build yours</NavLink>
          <NavLink to="/track">Track order</NavLink>
          <NavLink to="/admin/login">Kitchen</NavLink>
        </nav>
        <div className="nav-actions">
          <Link to="/cart" className="cart-link">Cart <span className="badge">{count}</span></Link>
          {user ? (
            <>
              <Link to="/profile" className="ghost-button">{user.name}</Link>
              <button className="ghost-button" onClick={logout}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="ghost-button">Login</Link>
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
