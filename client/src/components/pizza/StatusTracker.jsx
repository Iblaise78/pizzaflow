import React from 'react';

const stages = ['Order Received', 'In Kitchen', 'Sent to Delivery', 'Delivered'];

export function StatusTracker({ activeStage = 0, eta = '28 min' }) {
  return (
    <div className="status-card">
      <div className="status-track">
        {stages.map((stage, index) => (
          <div key={stage} className={`status-step ${index <= activeStage ? 'active' : ''}`}>
            <div className="status-dot" />
            <span>{stage}</span>
          </div>
        ))}
      </div>
      <div className="scooter">
        <span role="img" aria-label="Pizza scooter">🛵</span>
      </div>
      <p className="status-eta">Estimated delivery in <strong>{eta}</strong></p>
    </div>
  );
}
