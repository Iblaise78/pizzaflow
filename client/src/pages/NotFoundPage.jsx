import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <section className="auth-card">
      <h1>Page not found</h1>
      <Link to="/" className="primary-button">Back home</Link>
    </section>
  );
}

