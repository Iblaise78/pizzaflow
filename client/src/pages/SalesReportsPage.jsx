import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { salesReport as seedReport } from '../services/mockData.js';

export function SalesReportsPage() {
  const [report, setReport] = useState(seedReport);

  useEffect(() => {
    api.reports().then(setReport).catch(() => setReport(seedReport));
  }, []);

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Reports</span>
          <h1>Sales summary</h1>
        </div>
      </div>
      <div className="stat-grid">
        <article className="stat-card tone-warm">
          <span>Daily revenue</span>
          <strong>${report.dailyRevenue}</strong>
        </article>
        <article className="stat-card tone-green">
          <span>Weekly revenue</span>
          <strong>${report.weeklyRevenue}</strong>
        </article>
        <article className="stat-card tone-alert">
          <span>Monthly revenue</span>
          <strong>${report.monthlyRevenue}</strong>
        </article>
      </div>
      <div className="reports-grid">
        {report.popularPizzas.map((pizza) => (
          <article key={pizza.name} className="report-card">
            <strong>{pizza.name}</strong>
            <p>Orders sold: {pizza.count}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
