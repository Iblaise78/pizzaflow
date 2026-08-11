import React from 'react';
import { Link } from 'react-router-dom';

export function PaymentSuccessPage() {
  return (
    <section className="success-panel">
      <div className="success-ring">🍕</div>
      <span className="eyebrow">Checkout complete</span>
      <h1>Your pizza is in motion</h1>
      <p>Payment was captured in test mode and the order has moved into the tracking flow.</p>
      <div className="hero-actions">
        <Link to="/track" className="primary-button">Track order</Link>
        <Link to="/orders" className="secondary-button">View all orders</Link>
      </div>
    </section>
  );
}

