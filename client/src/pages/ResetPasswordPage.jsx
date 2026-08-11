import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(params.get('email') || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const token = params.get('token') || '';

  const submit = async (event) => {
    event.preventDefault();
    if (!token) return setError('This password reset link is missing or invalid.');
    if (password.length < 8 || !/\d/.test(password)) return setError('Password must be at least 8 characters and include a number.');
    if (password !== confirmPassword) return setError('The passwords do not match.');
    setLoading(true);
    setError('');
    try {
      const result = await api.resetPassword({ email, token, password });
      setNotice(result.message);
      setTimeout(() => navigate('/login', { replace: true }), 1200);
    } catch (err) {
      setError(err.message || 'We could not reset your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <span className="eyebrow">Account recovery</span>
      <h1>Choose a new password</h1>
      <p className="muted">This secure reset link expires in 10 minutes.</p>
      <form onSubmit={submit} className="form">
        <label htmlFor="reset-email">Email</label>
        <input id="reset-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required />
        <label htmlFor="new-password">New password</label>
        <input id="new-password" value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="new-password" required />
        <label htmlFor="confirm-password">Confirm new password</label>
        <input id="confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} type="password" autoComplete="new-password" required />
        {error && <p className="error-text">{error}</p>}
        {notice && <p className="muted">{notice}</p>}
        <button className="primary-button" disabled={loading}>{loading ? 'Saving...' : 'Change password'}</button>
      </form>
      <p className="muted"><Link to="/login">Back to login</Link></p>
    </div>
  );
}
