import React from 'react';

export function AdminReportsPage() {
  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Reports</span>
          <h1>Operational snapshots</h1>
        </div>
      </div>
      <div className="reports-grid">
        <article className="report-card">
          <strong>Conversion</strong>
          <p>Builder to checkout conversion is strong this week.</p>
        </article>
        <article className="report-card">
          <strong>Fulfillment</strong>
          <p>Average kitchen time sits under the target threshold.</p>
        </article>
        <article className="report-card">
          <strong>Stock risk</strong>
          <p>Cheese and peppers are trending low. Restock recommended.</p>
        </article>
      </div>
    </section>
  );
}

