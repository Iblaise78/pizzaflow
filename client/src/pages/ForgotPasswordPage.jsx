import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setNotice('');
    try {
      const result = await api.forgotPassword({ email });
      setNotice(result.message);
    } catch (err) {
      setError(err.message || 'We could not start the password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <span className="eyebrow">Account recovery</span>
      <h1>Forgot password?</h1>
      <p className="muted">Enter your email and we will send a secure password reset link.</p>
      <form onSubmit={submit} className="form">
        <label htmlFor="reset-email">Email</label>
        <input id="reset-email" value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" required />
        {error && <p className="error-text">{error}</p>}
        {notice && <p className="muted">{notice}</p>}
        <button className="primary-button" disabled={loading}>{loading ? 'Sending link...' : 'Send reset link'}</button>
      </form>
      <p className="muted"><Link to="/login">Back to login</Link></p>
    </div>
  );
}
