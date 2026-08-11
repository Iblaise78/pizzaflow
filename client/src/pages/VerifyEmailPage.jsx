import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';

const destinationByRole = {
  admin: '/admin',
  rider: '/rider',
  user: '/dashboard'
};

export function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
  const verification = location.state;
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  if (!verification?.email || !verification?.purpose) {
    return (
      <div className="auth-card">
        <h1>Verification needed</h1>
        <p className="muted">Start by registering or logging in so we know where to send your code.</p>
        <Link className="primary-button" to="/login">Go to login</Link>
      </div>
    );
  }

  const verify = async (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(code.trim())) {
      setError('Enter the six-digit code from your email.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const result = await api.verifyEmail({ email: verification.email, code, purpose: verification.purpose });
      login(result);
      navigate(verification.redirectTo || destinationByRole[result.user.role] || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'We could not verify that code.');
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    setResending(true);
    setError('');
    setNotice('');
    try {
      const result = await api.resendVerificationCode({ email: verification.email, purpose: verification.purpose });
      setNotice(result.message);
    } catch (err) {
      setError(err.message || 'We could not send another code.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="auth-card">
      <span className="eyebrow">Email security</span>
      <h1>Check your inbox</h1>
      <p className="muted">We sent a six-digit code to <strong>{verification.email}</strong>. It expires in 10 minutes.</p>
      {verification.developmentCode ? <p className="development-code">Local development code: <strong>{verification.developmentCode}</strong></p> : null}
      <form onSubmit={verify} className="form">
        <label htmlFor="verification-code">Verification code</label>
        <input
          id="verification-code"
          value={code}
          onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
          inputMode="numeric"
          autoComplete="one-time-code"
          placeholder="123456"
          required
        />
        {error && <p className="error-text">{error}</p>}
        {notice && <p className="muted">{notice}</p>}
        <button className="primary-button" disabled={loading}>{loading ? 'Verifying...' : 'Verify and continue'}</button>
      </form>
      <button type="button" className="ghost-button" onClick={resend} disabled={resending}>
        {resending ? 'Sending...' : 'Send a new code'}
      </button>
    </div>
  );
}
