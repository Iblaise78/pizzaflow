import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <section className="profile-panel">
      <span className="eyebrow">Profile</span>
      <h1>{user?.name || 'Guest'}</h1>
      <p>{user?.email || 'Sign in to see your account details.'}</p>
      <div className="profile-grid">
        <article className="profile-card">
          <span>Role</span>
          <strong>{user?.role || 'customer'}</strong>
        </article>
        <article className="profile-card">
          <span>Preferred pickup</span>
          <strong>Home delivery</strong>
        </article>
        <article className="profile-card">
          <span>Loyalty</span>
          <strong>Fresh out of oven</strong>
        </article>
      </div>
    </section>
  );
}

