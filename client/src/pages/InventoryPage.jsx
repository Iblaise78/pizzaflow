import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { sampleInventory } from '../services/mockData.js';
import { InventoryGauge } from '../components/admin/InventoryGauge.jsx';

export function InventoryPage() {
  const [inventory, setInventory] = useState(sampleInventory);

  const refresh = async () => {
    try {
      setInventory(await api.inventory());
    } catch {
      setInventory(sampleInventory);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const restock = async (item) => {
    const id = item._id || item.id;
    const nextStock = Number(item.threshold) + 20;
    try {
      await api.updateInventory(id, { stock: nextStock, threshold: item.threshold, isAvailable: true });
    } finally {
      refresh();
    }
  };

  const saveItem = async (item, values) => {
    try {
      await api.updateInventory(item._id || item.id, { ...values, isAvailable: values.stock > 0 });
    } finally {
      refresh();
    }
  };

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Inventory</span>
          <h1>Ingredient levels</h1>
        </div>
      </div>

      <div className="inventory-grid">
        {inventory.map((item) => (
          <InventoryGauge key={item._id || item.id} item={item} onRestock={restock} onSave={saveItem} />
        ))}
      </div>
    </section>
  );
}
