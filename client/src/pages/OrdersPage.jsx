import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { sampleOrders } from '../services/mockData.js';
import { StatusTracker } from '../components/pizza/StatusTracker.jsx';

export function OrdersPage() {
  const [orders, setOrders] = useState(sampleOrders);

  useEffect(() => {
    api.orders().then(setOrders).catch(() => setOrders(sampleOrders));
  }, []);

  return (
    <div className="page-stack">
      <section className="section-head compact">
        <div>
          <span className="eyebrow">My orders</span>
          <h1>Track recent deliveries</h1>
        </div>
      </section>

      <div className="order-history-grid">
        {orders.map((order, index) => (
          <article key={order.id || order._id} className="order-history-card">
            <div className="order-history-head">
              <strong>{order.id || order._id}</strong>
              <span>${Number(order.total || 0).toFixed(2)}</span>
            </div>
            <p>
              {order.items?.category?.name || 'Custom pizza'} · {order.items?.size?.name || 'Medium'} · {order.items?.base?.name || 'Crust'}
            </p>
            <small className="muted">
              {(order.items?.toppings || []).map((item) => item.name).join(', ') || 'No toppings'}
            </small>
            <StatusTracker activeStage={Math.min(index, 2)} eta={index === 0 ? '22 min' : '35 min'} />
          </article>
        ))}
      </div>
    </div>
  );
}
