import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { deliveryFees as seedFees } from '../services/mockData.js';

export function DeliveryFeesPage() {
  const [fees, setFees] = useState(seedFees);

  useEffect(() => {
    api.deliveryFees().then(setFees).catch(() => setFees(seedFees));
  }, []);

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Delivery fees</span>
          <h1>City pricing</h1>
        </div>
      </div>
      <div className="reports-grid">
        {fees.map((fee) => (
          <article key={fee.id} className="report-card">
            <strong>{fee.city}</strong>
            <p>Fee: ${fee.fee}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
