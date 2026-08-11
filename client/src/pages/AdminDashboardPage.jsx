import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { adminStats, sampleOrders } from '../services/mockData.js';
import { StatCard } from '../components/admin/StatCard.jsx';

export function AdminDashboardPage() {
  const [overview, setOverview] = useState({
    ordersToday: adminStats.ordersToday,
    revenue: adminStats.revenue,
    lowStockAlerts: adminStats.lowStockAlerts
  });
  const [feed, setFeed] = useState(sampleOrders);

  useEffect(() => {
    api.adminOverview().then((data) => setOverview((current) => ({ ...current, ...data }))).catch(() => null);
    api.adminOrders().then(setFeed).catch(() => null);

    const timer = setInterval(() => {
      api.adminOrders().then(setFeed).catch(() => null);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1>Kitchen operations at a glance</h1>
        </div>
      </div>

      <div className="stat-grid">
        <StatCard label="Orders today" value={overview.ordersToday} delta="+12% vs yesterday" tone="warm" />
        <StatCard label="Revenue" value={`$${overview.revenue}`} delta="Test-mode daily total" tone="green" />
        <StatCard label="Low-stock alerts" value={overview.lowStockAlerts} delta="Cheese, peppers, onions" tone="alert" />
      </div>

      <div className="admin-feed-panel">
        <div className="section-head compact">
          <div>
            <span className="eyebrow">Live feed</span>
            <h2>New orders slide in here</h2>
          </div>
        </div>
        <div className="feed-stack">
          {feed.slice(0, 4).map((order, index) => (
            <article key={order.id || order._id} className={`feed-card ${index === 0 ? 'flash' : ''}`}>
              <div>
                <strong>{order.id || order._id}</strong>
                <p>{order.deliveryAddress || 'Kigali, Rwanda'}</p>
              </div>
              <span className="status-pill">{order.orderStatus || order.status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

