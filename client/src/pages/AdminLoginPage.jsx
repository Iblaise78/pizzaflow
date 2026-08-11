import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { fallbackProductImage } from '../services/productMedia.js';

export function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await api.login({ email, password });
      if (result.role !== 'admin') {
        setError('That account is not an admin account.');
        return;
      }
      navigate('/verify-email', { state: { ...result, redirectTo: '/admin' } });
    } catch (err) {
      setError(err.message || 'Admin login failed.');
    }
  };

  return (
    <div className="login-page admin-login-page">
      <section className="login-intro admin-login-intro">
        <span className="login-kicker">Forno Nero / private access</span>
        <h1>The kitchen is where the magic gets managed.</h1>
        <p>Control orders, stock, products, promotions, and the people waiting for their pizza.</p>
        <div className="admin-login-plate">
          <span className="plate-fallback" aria-hidden="true">🍕</span>
          <img
            src={fallbackProductImage}
            alt="Pizza from the Forno Nero kitchen"
            onError={(event) => {
              event.currentTarget.style.display = 'none';
            }}
          />
          <span className="plate-caption">OVEN 01 / LIVE SERVICE</span>
        </div>
      </section>
      <section className="auth-card login-card admin-auth-card">
        <div className="login-card-head"><span className="brand-mark">♨</span><div><span className="eyebrow">Kitchen console</span><h2>Admin login</h2></div></div>
        <p className="admin-login-lead">Enter your admin credentials to open the service board.</p>
        <form onSubmit={handleSubmit} className="form">
          <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="admin@fornonero.com" required /></label>
          <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Enter password" required /></label>
          {error && <p className="error-text">{error}</p>}
          <button className="primary-button wide">Open kitchen console <span>→</span></button>
        </form>
        <div className="login-links"><span>First admin? <Link to="/setup-admin">Create account</Link></span><Link to="/forgot-password">Reset password</Link></div>
      </section>
    </div>
  );
}
