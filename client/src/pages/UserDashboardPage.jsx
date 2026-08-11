import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { sampleOrders } from '../services/mockData.js';
import { StatusTracker } from '../components/pizza/StatusTracker.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function UserDashboardPage() {
  const [orders, setOrders] = useState(sampleOrders);
  const { token } = useAuth();

  useEffect(() => {
    const refresh = () => api.orders().then(setOrders).catch(() => setOrders(sampleOrders));
    refresh();
    const stream = new EventSource(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/api/orders/stream?token=${encodeURIComponent(token || '')}`);
    stream.addEventListener('order-created', refresh);
    stream.addEventListener('order-updated', refresh);
    return () => stream.close();
  }, [token]);

  const active = orders[0];
  const status = active?.orderStatus || active?.status || 'Order Received';
  const stageMap = {
    Pending: 0,
    'Order Received': 0,
    Preparing: 1,
    'In Kitchen': 1,
    Baking: 1,
    'Out for Delivery': 2,
    'Sent to Delivery': 2,
    Delivered: 3
  };

  return (
    <div className="profile-dashboard">
      <section className="profile-panel">
        <span className="eyebrow">Customer dashboard</span>
        <h1>{active ? `Order ${active.id || active._id}` : 'Your account'}</h1>
        <p className="hero-text">A single place to review your active order, browse history, and jump back into the builder.</p>
        <div className="profile-grid">
          <article className="profile-card">
            <span>Active order</span>
            <strong>{active?.id || active?._id || 'None'}</strong>
          </article>
          <article className="profile-card">
            <span>Orders placed</span>
            <strong>{orders.length}</strong>
          </article>
          <article className="profile-card">
            <span>Status</span>
            <strong>{status}</strong>
          </article>
        </div>
        <div className="hero-actions">
          <Link to="/builder" className="primary-button">Build another pizza</Link>
          <Link to="/cart" className="secondary-button">Go to cart</Link>
        </div>
      </section>

      <section className="profile-panel">
        <StatusTracker activeStage={stageMap[status] ?? 0} eta={active ? '28 min' : '—'} />
      </section>
    </div>
  );
}
