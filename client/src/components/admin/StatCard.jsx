import React from 'react';

export function StatCard({ label, value, delta, tone = 'default' }) {
  return (
    <article className={`stat-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      {delta ? <p>{delta}</p> : null}
    </article>
  );
}

