import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { adminCustomers as seedCustomers } from '../services/mockData.js';

export function CustomersPage() {
  const [customers, setCustomers] = useState(seedCustomers);

  useEffect(() => {
    api.adminCustomers().then(setCustomers).catch(() => setCustomers(seedCustomers));
  }, []);

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Customers</span>
          <h1>Customer overview</h1>
        </div>
      </div>
      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.orders}</td>
                <td>${customer.totalSpent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
