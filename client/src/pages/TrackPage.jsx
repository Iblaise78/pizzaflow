import React, { useEffect, useState } from 'react';
import { StatusTracker } from '../components/pizza/StatusTracker.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export function TrackPage() {
  const [activeOrder, setActiveOrder] = useState(() => {
    const saved = localStorage.getItem('pizzaflow-active-order');
    return saved ? JSON.parse(saved) : null;
  });
  const { token } = useAuth();

  useEffect(() => {
    const onStorage = () => {
      const saved = localStorage.getItem('pizzaflow-active-order');
      setActiveOrder(saved ? JSON.parse(saved) : null);
    };
    window.addEventListener('storage', onStorage);
    const stream = new EventSource(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'}/api/orders/stream?token=${encodeURIComponent(token || '')}`);
    const onOrderUpdate = (event) => {
      const order = JSON.parse(event.data);
      const next = { ...order, status: order.orderStatus || order.status, eta: activeOrder?.eta || '28 min' };
      localStorage.setItem('pizzaflow-active-order', JSON.stringify(next));
      setActiveOrder(next);
    };
    stream.addEventListener('order-updated', onOrderUpdate);
    return () => { window.removeEventListener('storage', onStorage); stream.close(); };
  }, [token]);

  const stageMap = {
    Pending: 0,
    'Order Received': 0,
    Preparing: 1,
    'In Kitchen': 1,
    Baking: 2,
    'Out for Delivery': 2,
    'Sent to Delivery': 2,
    Delivered: 3
  };
  const stage = stageMap[activeOrder?.status || activeOrder?.orderStatus] ?? 0;

  return (
    <div className="track-layout">
      <section className="track-panel">
        <span className="eyebrow">Live order tracking</span>
        <h1>{activeOrder ? `Order ${activeOrder.id || activeOrder._id}` : 'No active order yet'}</h1>
        <StatusTracker activeStage={stage} eta={activeOrder?.eta || '28 min'} />
      </section>

      <section className="track-panel track-side">
        <h2>Order details</h2>
        {activeOrder ? (
          <>
            <div className="summary-block">
              <span>Status</span>
              <strong>{activeOrder.status || activeOrder.orderStatus}</strong>
            </div>
            <div className="summary-block">
              <span>Total</span>
              <strong>${Number(activeOrder.total || 0).toFixed(2)}</strong>
            </div>
            <div className="summary-block">
              <span>Next step</span>
              <strong>{stage >= 2 ? 'On the way' : 'Chef is making it now'}</strong>
            </div>
          </>
        ) : (
          <p className="muted">Place an order from the cart to start tracking.</p>
        )}
      </section>
    </div>
  );
}
