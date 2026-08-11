import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await api.login({ email, password });
      if (result.requiresVerification) {
        navigate('/verify-email', {
          state: { ...result, redirectTo: location.state?.from || '/dashboard' }
        });
        return;
      }
      login(result);
      navigate(location.state?.from || '/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <section className="login-intro">
        <span className="login-kicker">PizzaFlow / customer access</span>
        <h1>Welcome back to your table.</h1>
        <p>Sign in to finish your order, follow the kitchen live, and keep your favourite builds close.</p>
        <div className="login-notes"><span>01 / Secure checkout</span><span>02 / Live order updates</span><span>03 / Saved order history</span></div>
      </section>
      <section className="auth-card login-card">
        <div className="login-card-head"><span className="brand-mark">🍕</span><div><span className="eyebrow">Customer login</span><h2>Let’s get you fed.</h2></div></div>
        {location.state?.checkout ? <p className="login-checkout-note">Your cart is ready. Sign in to continue to secure payment.</p> : null}
        <form onSubmit={handleSubmit} className="form">
          <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" placeholder="you@example.com" required /></label>
          <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="Your password" required /></label>
          {error && <p className="error-text">{error}</p>}
          <button className="primary-button wide" disabled={loading}>{loading ? 'Signing in...' : 'Continue'}</button>
        </form>
        <div className="login-links"><span>New to PizzaFlow? <Link to="/register">Create account</Link></span><Link to="/forgot-password">Forgot password?</Link></div>
      </section>
    </div>
  );
}
