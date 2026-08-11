import React from 'react';

export function AdminSettingsPage() {
  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Settings</span>
          <h1>Operations preferences</h1>
        </div>
      </div>
      <div className="settings-grid">
        <label className="setting-row">
          <span>Email low-stock alerts</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="setting-row">
          <span>Real-time status updates</span>
          <input type="checkbox" defaultChecked />
        </label>
        <label className="setting-row">
          <span>Auto restock thresholds</span>
          <input type="checkbox" />
        </label>
      </div>
    </section>
  );
}

