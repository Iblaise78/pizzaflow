import React, { useState } from 'react';

export function InventoryGauge({ item, onRestock, onSave }) {
  const [stock, setStock] = useState(String(item.stock));
  const [threshold, setThreshold] = useState(String(item.threshold));
  const ratio = Math.max(0, Math.min(100, (Number(stock) / Math.max(Number(threshold), Number(stock) || 1)) * 100));
  const isLow = Number(stock) <= Number(threshold);

  return (
    <article className={`inventory-gauge ${isLow ? 'low' : ''}`}>
      <div className="inventory-header">
        <div>
          <strong>{item.name}</strong>
          <p>{item.type}</p>
        </div>
        <button className="ghost-button small" onClick={() => onRestock?.({ ...item, stock: Number(stock), threshold: Number(threshold) })}>Restock</button>
      </div>
      <div className="gauge-rail" aria-hidden="true">
        <div className="gauge-fill" style={{ width: `${ratio}%` }} />
      </div>
      <div className="inventory-meta">
        <label className="inventory-edit">Stock <input type="number" min="0" value={stock} onChange={(event) => setStock(event.target.value)} /></label>
        <label className="inventory-edit">Alert at <input type="number" min="0" value={threshold} onChange={(event) => setThreshold(event.target.value)} /></label>
        <button className="primary-button small" onClick={() => onSave?.(item, { stock: Number(stock), threshold: Number(threshold) })}>Save</button>
      </div>
    </article>
  );
}
