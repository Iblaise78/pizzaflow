import React, { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { adminCoupons as seedCoupons } from '../services/mockData.js';

export function CouponsPage() {
  const [coupons, setCoupons] = useState(seedCoupons);

  useEffect(() => {
    api.adminCoupons().then(setCoupons).catch(() => setCoupons(seedCoupons));
  }, []);

  return (
    <section className="admin-page">
      <div className="section-head compact">
        <div>
          <span className="eyebrow">Coupons</span>
          <h1>Promo codes and discounts</h1>
        </div>
      </div>
      <div className="reports-grid">
        {coupons.map((coupon) => (
          <article key={coupon.id} className="report-card">
            <strong>{coupon.code}</strong>
            <p>{coupon.discountType} · {coupon.value}{coupon.discountType === 'percent' ? '%' : '$'}</p>
            <span>Min order ${coupon.minOrderAmount}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
