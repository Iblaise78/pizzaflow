import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export function SetupAdminPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();
    if (password.length < 8 || !/\d/.test(password)) {
      setError('Password must be at least 8 characters and include a number.');
      return;
    }
    setLoading(true);
      setError('');
    try {
      const result = await api.setupAdmin({ name, email, password });
      navigate('/verify-email', { state: { ...result, redirectTo: '/admin' } });
    } catch (err) {
      setError(err.message || 'Admin setup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card">
      <span className="eyebrow">Fresh setup</span>
      <h1>Create Admin</h1>
      <form onSubmit={submit} className="form">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        <label>Password</label>
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        {error && <p className="error-text">{error}</p>}
        <button className="primary-button" disabled={loading}>{loading ? 'Creating...' : 'Create Admin'}</button>
      </form>
      <p className="muted">
        Already have an admin? <Link to="/admin/login">Login here</Link>
      </p>
    </div>
  );
}
