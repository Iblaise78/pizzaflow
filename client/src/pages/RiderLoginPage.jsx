import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export function RiderLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await api.login({ email, password });
      if (result.role !== 'rider') {
        throw new Error('Not a rider account');
      }
      navigate('/verify-email', { state: { ...result, redirectTo: '/rider' } });
    } catch (err) {
      setError(err.message || 'Rider login failed.');
    }
  };

  return (
    <section className="auth-card">
      <h1>Rider Login</h1>
      <form className="form" onSubmit={submit}>
        <label>Email<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
        {error ? <p className="muted">{error}</p> : null}
        <button className="primary-button">Login as Rider</button>
      </form>
    </section>
  );
}
