export const menuOptions = {
  bases: [
    { id: 'thin', name: 'Thin Crust', price: 5 },
    { id: 'classic', name: 'Classic Hand Tossed', price: 6 },
    { id: 'pan', name: 'Pan Base', price: 7 },
    { id: 'cheese-stuffed', name: 'Cheese Stuffed', price: 8 },
    { id: 'gluten-free', name: 'Gluten-Free Base', price: 8.5 }
  ],
  sauces: [
    { id: 'tomato', name: 'Tomato Basil', price: 1.5 },
    { id: 'alfredo', name: 'Alfredo', price: 2 },
    { id: 'bbq', name: 'Smoky BBQ', price: 1.75 },
    { id: 'pesto', name: 'Pesto', price: 2.25 },
    { id: 'garlic', name: 'Roasted Garlic', price: 1.9 }
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Mozzarella', price: 2.5 },
    { id: 'cheddar', name: 'Cheddar', price: 2.75 },
    { id: 'vegan', name: 'Vegan Cheese', price: 3 },
    { id: 'parmesan', name: 'Parmesan', price: 3.25 },
    { id: 'feta', name: 'Feta', price: 3 }
  ],
  vegetables: [
    { id: 'pepper', name: 'Bell Peppers', price: 0.75 },
    { id: 'onion', name: 'Red Onion', price: 0.6 },
    { id: 'olive', name: 'Olives', price: 0.9 },
    { id: 'corn', name: 'Sweet Corn', price: 0.85 },
    { id: 'mushroom', name: 'Mushrooms', price: 1 },
    { id: 'tomato', name: 'Fresh Tomato', price: 0.8 }
  ]
};

export const sampleOrders = [
  {
    id: 'PF-1001',
    status: 'Preparing',
    total: 18.5,
    createdAt: '2026-08-01T09:30:00Z',
    items: {
      category: { name: 'Pepperoni Pizza' },
      size: { name: 'Medium' },
      base: { name: 'Thin Crust' },
      toppings: [{ name: 'Pepperoni' }, { name: 'Mozzarella' }]
    }
  },
  {
    id: 'PF-1002',
    status: 'Out for Delivery',
    total: 22.0,
    createdAt: '2026-08-02T15:15:00Z',
    items: {
      category: { name: 'BBQ Pizza' },
      size: { name: 'Large' },
      base: { name: 'Pan Pizza' },
      toppings: [{ name: 'Beef' }, { name: 'Cheddar' }, { name: 'Mushrooms' }]
    }
  }
];

export const sampleInventory = [
  { id: 'thin', type: 'base', name: 'Thin Crust', stock: 42, threshold: 20 },
  { id: 'classic', type: 'base', name: 'Classic Hand Tossed', stock: 34, threshold: 20 },
  { id: 'tomato', type: 'sauce', name: 'Tomato Basil', stock: 28, threshold: 15 },
  { id: 'mozzarella', type: 'cheese', name: 'Mozzarella', stock: 19, threshold: 20 },
  { id: 'pepper', type: 'vegetable', name: 'Bell Peppers', stock: 11, threshold: 15 }
];
