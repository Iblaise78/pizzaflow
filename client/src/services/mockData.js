export const menuOptions = {
  categories: [
    { id: 'classic', name: 'Classic Pizza' },
    { id: 'cheese', name: 'Cheese Pizza' },
    { id: 'pepperoni', name: 'Pepperoni Pizza' },
    { id: 'chicken', name: 'Chicken Pizza' },
    { id: 'bbq', name: 'BBQ Pizza' },
    { id: 'meat', name: 'Meat Lovers Pizza' },
    { id: 'hawaiian', name: 'Hawaiian Pizza' },
    { id: 'veg', name: 'Vegetarian Pizza' },
    { id: 'seafood', name: 'Seafood Pizza' },
    { id: 'supreme', name: 'Supreme Pizza' }
  ],
  sizes: [
    { id: 'personal', name: 'Personal', multiplier: 0.7 },
    { id: 'small', name: 'Small', multiplier: 0.85 },
    { id: 'medium', name: 'Medium', multiplier: 1 },
    { id: 'large', name: 'Large', multiplier: 1.25 },
    { id: 'xl', name: 'Extra Large', multiplier: 1.5 },
    { id: 'party', name: 'Party Size', multiplier: 1.9 }
  ],
  bases: [
    { id: 'thin', name: 'Thin Crust', price: 5, symbol: '◌' },
    { id: 'classic', name: 'Classic Hand Tossed', price: 6, symbol: '◍' },
    { id: 'thick', name: 'Thick Crust', price: 6, symbol: '◍' },
    { id: 'stuffed', name: 'Stuffed Crust', price: 8, symbol: '◎' },
    { id: 'cheese-burst', name: 'Cheese Burst', price: 8.5, symbol: '⬤' },
    { id: 'pan', name: 'Pan Pizza', price: 7, symbol: '▣' },
    { id: 'deep-dish', name: 'Deep Dish', price: 8, symbol: '▤' },
    { id: 'neapolitan', name: 'Neapolitan', price: 7.5, symbol: '◉' },
    { id: 'gluten-free', name: 'Gluten-Free Base', price: 8, symbol: '◇' }
  ],
  sauces: [
    { id: 'tomato', name: 'Tomato Basil', price: 1.5, symbol: '•' },
    { id: 'alfredo', name: 'Alfredo', price: 2, symbol: '✦' },
    { id: 'bbq', name: 'Smoky BBQ', price: 1.75, symbol: '✧' },
    { id: 'garlic', name: 'Garlic Sauce', price: 1.75, symbol: '✤' },
    { id: 'buffalo', name: 'Buffalo Sauce', price: 2.1, symbol: '✸' },
    { id: 'ranch', name: 'Ranch Sauce', price: 1.9, symbol: '✣' },
    { id: 'pesto', name: 'Basil Pesto', price: 2.25, symbol: '✽' },
    { id: 'peri-peri', name: 'Peri Peri', price: 2.1, symbol: '✹' }
  ],
  cheeses: [
    { id: 'mozzarella', name: 'Mozzarella', price: 2.5, symbol: '✶' },
    { id: 'cheddar', name: 'Cheddar', price: 2.75, symbol: '✴' },
    { id: 'parmesan', name: 'Parmesan', price: 3, symbol: '✱' },
    { id: 'feta', name: 'Feta', price: 2.75, symbol: '◇' },
    { id: 'vegan', name: 'Vegan Cheese', price: 3, symbol: '✾' }
  ],
  toppings: [
    { id: 'pepperoni', name: 'Pepperoni', price: 1.25, symbol: '●' },
    { id: 'chicken', name: 'Chicken', price: 1.4, symbol: '▲' },
    { id: 'beef', name: 'Beef', price: 1.5, symbol: '◆' },
    { id: 'sausage', name: 'Sausage', price: 1.35, symbol: '■' },
    { id: 'bacon', name: 'Bacon', price: 1.45, symbol: '✦' },
    { id: 'ham', name: 'Ham', price: 1.3, symbol: '✧' },
    { id: 'onions', name: 'Onions', price: 0.6, symbol: '◌' },
    { id: 'tomatoes', name: 'Tomatoes', price: 0.7, symbol: '◍' },
    { id: 'mushrooms', name: 'Mushrooms', price: 0.95, symbol: '✿' },
    { id: 'green-peppers', name: 'Green Peppers', price: 0.8, symbol: '▲' },
    { id: 'black-olives', name: 'Black Olives', price: 0.9, symbol: '●' },
    { id: 'sweet-corn', name: 'Sweet Corn', price: 0.85, symbol: '■' },
    { id: 'jalapenos', name: 'Jalapeños', price: 0.9, symbol: '✷' },
    { id: 'spinach', name: 'Spinach', price: 0.8, symbol: '✾' },
    { id: 'mozzarella', name: 'Mozzarella', price: 1.1, symbol: '✶' },
    { id: 'cheddar', name: 'Cheddar', price: 1.15, symbol: '✴' },
    { id: 'parmesan', name: 'Parmesan', price: 1.2, symbol: '✱' },
    { id: 'prawns', name: 'Garlic Prawns', price: 2.25, symbol: '◒' },
    { id: 'paneer', name: 'Tandoori Paneer', price: 1.6, symbol: '◆' },
    { id: 'pineapple', name: 'Pineapple', price: 0.95, symbol: '✦' },
    { id: 'jalapeno', name: 'Jalapeño', price: 0.9, symbol: '✷' },
    { id: 'basil', name: 'Fresh Basil', price: 0.7, symbol: '✾' },
    { id: 'feta', name: 'Feta Cheese', price: 1.3, symbol: '✶' }
  ],
  vegetables: [
    { id: 'pepper', name: 'Bell Peppers', price: 0.75, symbol: '▲' },
    { id: 'onion', name: 'Red Onion', price: 0.6, symbol: '◆' },
    { id: 'olive', name: 'Olives', price: 0.9, symbol: '●' },
    { id: 'corn', name: 'Sweet Corn', price: 0.85, symbol: '■' },
    { id: 'mushroom', name: 'Mushrooms', price: 1, symbol: '✿' },
    { id: 'tomato', name: 'Fresh Tomato', price: 0.8, symbol: '✦' }
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

export const featuredPizzas = [
  {
    id: 'p1',
    name: 'Classic Pepperoni',
    price: 12,
    note: 'Pepperoni, mozzarella, tomato sauce',
    description: 'Pepperoni, mozzarella, rich tomato sauce.',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'p2',
    name: 'Chicken Supreme',
    price: 15,
    note: 'Chicken, peppers, onion, cheddar',
    description: 'Chicken, peppers, onions, cheddar and basil sauce.',
    imageUrl:
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'p3',
    name: 'Hawaiian Heat',
    price: 14,
    note: 'Ham, pineapple-style sweetness, mozzarella',
    description: 'Sweet and savory with ham and mozzarella.',
    imageUrl:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'p4',
    name: 'BBQ Meat Lovers',
    price: 16,
    note: 'BBQ sauce, beef, sausage, bacon',
    description: 'BBQ sauce loaded with beef, bacon, sausage and ham.',
    imageUrl:
      'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=1200&q=80'
  }
];

export const bannerSeed = [
  {
    id: 'b1',
    title: 'Fresh out of the oven',
    subtitle: 'Hot, cheesy, and delivered fast with premium ingredients.',
    imageUrl:
      'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=80',
    ctaLabel: 'Order now',
    ctaHref: '/builder',
    isActive: true
  },
  {
    id: 'b2',
    title: 'Build your own masterpiece',
    subtitle: 'Choose crust, sauce, toppings, and extras exactly how you like them.',
    imageUrl:
      'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1400&q=80',
    ctaLabel: 'Build pizza',
    ctaHref: '/builder',
    isActive: true
  }
];

export const orderStages = ['Pending', 'Preparing', 'Baking', 'Out for Delivery', 'Delivered'];

export const adminStats = {
  ordersToday: 142,
  revenue: 3860,
  lowStockAlerts: 3
};

export const adminCustomers = [
  { id: 'c1', name: 'Ava Brown', email: 'ava@example.com', orders: 8, totalSpent: 146 },
  { id: 'c2', name: 'Noah Green', email: 'noah@example.com', orders: 5, totalSpent: 98 },
  { id: 'c3', name: 'Lina Shah', email: 'lina@example.com', orders: 11, totalSpent: 214 }
];

export const adminCoupons = [
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

export const paymentMethods = [
  'Cash on Delivery',
  'Credit/Debit Card',
  'Mobile Money',
  'PayPal'
];

export const coupons = [
  { code: 'PIZZA10', discountType: 'percent', value: 10, description: '10% off orders above $20' },
  { code: 'SAVE5', discountType: 'fixed', value: 5, description: '$5 off selected orders' }
];

export const drinkMenu = [
  { name: 'Coca-Cola', price: 2.5, group: 'Soft drinks' },
  { name: 'Diet Coke', price: 2.5, group: 'Soft drinks' },
  { name: 'Dr Pepper', price: 2.75, group: 'Soft drinks' },
  { name: 'Fanta Orange', price: 2.5, group: 'Soft drinks' },
  { name: 'Sprite', price: 2.5, group: 'Soft drinks' },
  { name: 'Ginger Ale', price: 2.5, group: 'Soft drinks' },
  { name: 'Root Beer', price: 2.75, group: 'Soft drinks' },
  { name: 'Cream Soda', price: 2.75, group: 'Soft drinks' },
  { name: 'Iced Tea', price: 2.75, group: 'Non-alcoholic' },
  { name: 'Fresh Lemonade', price: 3, group: 'Non-alcoholic' },
  { name: 'Aranciata', price: 3, group: 'Non-alcoholic' },
  { name: 'Chinotto', price: 3, group: 'Non-alcoholic' },
  { name: 'Apple Cider', price: 3.5, group: 'Non-alcoholic' },
  { name: 'Kombucha', price: 4, group: 'Non-alcoholic' },
  { name: 'Mango Juice', price: 3.5, group: 'Non-alcoholic' },
  { name: 'Apple Juice', price: 3.5, group: 'Non-alcoholic' },
  { name: 'Still Water', price: 1.5, group: 'Non-alcoholic' },
  { name: 'Sparkling Mineral Water', price: 2, group: 'Non-alcoholic' },
  { name: 'Vanilla Milkshake', price: 4.5, group: 'Non-alcoholic' },
  { name: 'Chocolate Milkshake', price: 4.5, group: 'Non-alcoholic' },
  { name: 'Pale Lager', price: 5, group: 'Beer', alcoholic: true },
  { name: 'Pilsner', price: 5, group: 'Beer', alcoholic: true },
  { name: 'Stout', price: 5.5, group: 'Beer', alcoholic: true },
  { name: 'Wheat Ale', price: 5.5, group: 'Beer', alcoholic: true },
  { name: 'Pale Ale', price: 5.5, group: 'Beer', alcoholic: true },
  { name: 'IPA', price: 6, group: 'Beer', alcoholic: true },
  { name: 'Chianti', price: 9, group: 'Red wine', alcoholic: true },
  { name: 'Barbera', price: 9, group: 'Red wine', alcoholic: true },
  { name: 'Lambrusco', price: 9, group: 'Red wine', alcoholic: true },
  { name: 'Pinot Noir', price: 10, group: 'Red wine', alcoholic: true },
  { name: 'Malbec', price: 10, group: 'Red wine', alcoholic: true },
  { name: 'Cabernet Sauvignon', price: 11, group: 'Red wine', alcoholic: true },
  { name: 'Prosecco', price: 10, group: 'White and sparkling', alcoholic: true },
  { name: 'Pinot Grigio', price: 9, group: 'White and sparkling', alcoholic: true },
  { name: 'Sauvignon Blanc', price: 9, group: 'White and sparkling', alcoholic: true },
  { name: 'Chardonnay', price: 10, group: 'White and sparkling', alcoholic: true },
  { name: 'Rosé', price: 9, group: 'White and sparkling', alcoholic: true },
  { name: 'Moscato d’Asti', price: 10, group: 'White and sparkling', alcoholic: true }
];

export const sideMenu = [
  { name: 'French Fries', price: 3.5 },
  { name: 'Garlic Bread', price: 4 },
  { name: 'Chicken Wings', price: 6.5 },
  { name: 'Chicken Nuggets', price: 5.5 },
  { name: 'Mozzarella Sticks', price: 5 },
  { name: 'Onion Rings', price: 4.5 }
];

export const dessertMenu = [
  { name: 'Chocolate Cake', price: 4.5 },
  { name: 'Ice Cream', price: 3.5 },
  { name: 'Brownies', price: 4 },
  { name: 'Cookies', price: 3 }
];
