import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { sampleOrders } from '../services/mockData.js';
import { OrderTable } from '../components/admin/OrderTable.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function OrderManagementPage() {
  const [orders, setOrders] = useState(sampleOrders);
  const { token } = useAuth();

  const refresh = async () => {
    try {
      setOrders(await api.adminOrders());
    } catch {
      setOrders(sampleOrders);
    }
  };

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 5000);
    const stream = new EventSource(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/api/orders/stream?token=${encodeURIComponent(token || '')}`);
    stream.addEventListener('order-created', refresh);
    stream.addEventListener('order-updated', refresh);
    return () => {
      clearInterval(timer);
      stream.close();
    };
  }, [token]);

  const changeStatus = async (id, status) => {
    try {
      await api.updateOrderStatus(id, status);
    } finally {
      refresh();
    }
  };

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Orders</span>
          <h1>Sort, update, and track every order</h1>
        </div>
      </div>
      <OrderTable orders={orders} onChangeStatus={changeStatus} />
    </section>
  );
}
