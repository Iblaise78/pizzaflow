import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { riderAssignments as seedAssignments } from '../services/mockData.js';

export function RiderDashboardPage() {
  const [dashboard, setDashboard] = useState({ assignments: seedAssignments, completedToday: 12, activeDeliveries: 2 });

  useEffect(() => {
    api.riderDashboard().then(setDashboard).catch(() => setDashboard({ assignments: seedAssignments, completedToday: 12, activeDeliveries: 2 }));
  }, []);

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Rider</span>
          <h1>Delivery assignments</h1>
        </div>
      </div>
      <div className="stat-grid">
        <article className="stat-card tone-warm">
          <span>Active deliveries</span>
          <strong>{dashboard.activeDeliveries}</strong>
        </article>
        <article className="stat-card tone-green">
          <span>Completed today</span>
          <strong>{dashboard.completedToday}</strong>
        </article>
        <article className="stat-card tone-alert">
          <span>Waiting</span>
          <strong>{dashboard.assignments.length}</strong>
        </article>
      </div>
      <div className="feed-stack">
        {dashboard.assignments.map((item) => (
          <article key={item.id} className="feed-card">
            <div>
              <strong>{item.orderId}</strong>
              <p>{item.customer}</p>
            </div>
            <span className="status-pill">{item.status} · {item.eta}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
