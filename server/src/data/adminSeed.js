export const customers = [
  { id: 'c1', name: 'Ava Brown', email: 'ava@example.com', orders: 8, totalSpent: 146 },
  { id: 'c2', name: 'Noah Green', email: 'noah@example.com', orders: 5, totalSpent: 98 },
  { id: 'c3', name: 'Lina Shah', email: 'lina@example.com', orders: 11, totalSpent: 214 }
];

export const coupons = [
  { id: 'cp1', code: 'PIZZA10', discountType: 'percent', value: 10, minOrderAmount: 20, status: 'active' },
  { id: 'cp2', code: 'SAVE5', discountType: 'fixed', value: 5, minOrderAmount: 15, status: 'active' }
];

export const deliveryFees = [
  { id: 'df1', city: 'Kigali', fee: 3.5 },
  { id: 'df2', city: 'Musanze', fee: 4.5 },
  { id: 'df3', city: 'Huye', fee: 5 }
];

export const salesReport = {
  dailyRevenue: 386,
  weeklyRevenue: 2210,
  monthlyRevenue: 9104,
  popularPizzas: [
    { name: 'Classic Pepperoni', count: 41 },
    { name: 'BBQ Meat Lovers', count: 28 },
    { name: 'Chicken Supreme', count: 22 }
  ]
};

export const riderAssignments = [
  { id: 'r1', orderId: 'PF-1002', customer: 'Ava Brown', status: 'Out for Delivery', eta: '18 min' },
  { id: 'r2', orderId: 'PF-1005', customer: 'Noah Green', status: 'Preparing', eta: '33 min' }
];

