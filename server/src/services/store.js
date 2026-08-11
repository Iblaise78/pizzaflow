import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import mongoose from 'mongoose';
import Razorpay from 'razorpay';
import User from '../models/User.js';
import InventoryItem from '../models/InventoryItem.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Banner from '../models/Banner.js';
import { menuOptions, sampleInventory, sampleOrders } from '../data/seed.js';
import { bannerSeed, productSeed } from '../data/catalogSeed.js';
import { eventBus } from './eventBus.js';

const state = {
  users: [],
  inventory: [],
  orders: [],
  products: [],
  banners: []
};

export function getMenuOptions() {
  return menuOptions;
}

export async function listProducts() {
  if (isMongoReady()) {
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return products.length ? products.map(withId) : productSeed;
  }
  return state.products.length ? state.products : productSeed;
}

export async function createProduct(payload) {
  const normalizedPayload = normalizeProductPayload(payload);
  if (isMongoReady()) {
    const created = await Product.create(normalizedPayload);
    const normalized = withId(created);
    eventBus.emit('product:changed', normalized);
    return normalized;
  }
  const next = { id: `p${Date.now()}`, ...normalizedPayload };
  state.products.unshift(next);
  eventBus.emit('product:changed', next);
  return next;
}

export async function updateProduct(id, payload) {
  const normalizedPayload = normalizeProductPayload(payload);
  if (isMongoReady()) {
    const updated = await Product.findOneAndUpdate({ _id: id }, normalizedPayload, { new: true, runValidators: true }).lean();
    const normalized = withId(updated);
    if (normalized) eventBus.emit('product:changed', normalized);
    return normalized;
  }
  const product = state.products.find((entry) => entry.id === id);
  if (!product) return null;
  Object.assign(product, normalizedPayload);
  eventBus.emit('product:changed', product);
  return product;
}

export async function deleteProduct(id) {
  if (isMongoReady()) {
    const deleted = await Product.findOneAndDelete({ _id: id }).lean();
    if (deleted) eventBus.emit('product:changed', { id });
    return deleted;
  }
  const index = state.products.findIndex((entry) => entry.id === id);
  if (index === -1) return null;
  const [deleted] = state.products.splice(index, 1);
  eventBus.emit('product:changed', deleted);
  return deleted;
}

export async function listBanners() {
  if (isMongoReady()) {
    const banners = await Banner.find({ isActive: true }).sort({ createdAt: -1 }).lean();
    return banners.length ? banners.map(withId) : bannerSeed;
  }
  return state.banners.length ? state.banners : bannerSeed;
}

export async function createBanner(payload) {
  if (isMongoReady()) {
    const created = await Banner.create(payload);
    const normalized = withId(created);
    eventBus.emit('banner:changed', normalized);
    return normalized;
  }
  const next = { id: `b${Date.now()}`, ...payload };
  state.banners.unshift(next);
  eventBus.emit('banner:changed', next);
  return next;
}

export async function updateBanner(id, payload) {
  if (isMongoReady()) {
    const updated = await Banner.findOneAndUpdate({ _id: id }, payload, { new: true }).lean();
    const normalized = withId(updated);
    if (normalized) eventBus.emit('banner:changed', normalized);
    return normalized;
  }
  const banner = state.banners.find((entry) => entry.id === id);
  if (!banner) return null;
  Object.assign(banner, payload);
  eventBus.emit('banner:changed', banner);
  return banner;
}

export async function deleteBanner(id) {
  if (isMongoReady()) {
    const deleted = await Banner.findOneAndDelete({ _id: id }).lean();
    if (deleted) eventBus.emit('banner:changed', { id });
    return deleted;
  }
  const index = state.banners.findIndex((entry) => entry.id === id);
  if (index === -1) return null;
  const [deleted] = state.banners.splice(index, 1);
  eventBus.emit('banner:changed', deleted);
  return deleted;
}

export function isMongoReady() {
  return mongoose.connection.readyState === 1;
}

function withId(doc) {
  if (!doc) return doc;
  const plain = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  return {
    ...plain,
    id: plain.id || (plain._id ? String(plain._id) : undefined)
  };
}

function normalizeProductPayload(payload) {
  const imageUrls = Array.isArray(payload.imageUrls)
    ? payload.imageUrls.filter((url) => typeof url === 'string' && url.trim()).map((url) => url.trim())
    : [];
  const imageUrl = String(payload.imageUrl || imageUrls[0] || '').trim();
  return { ...payload, imageUrl, imageUrls: imageUrl ? [imageUrl] : [] };
}

export async function findUserByEmail(email) {
  if (isMongoReady()) {
    const user = await User.findOne({ email: email.toLowerCase() }).lean();
    return withId(user);
  }
  return state.users.find((user) => user.email === email);
}

export async function countUsers(query = {}) {
  if (isMongoReady()) {
    return User.countDocuments(query);
  }
  return state.users.filter((user) => Object.entries(query).every(([key, value]) => user[key] === value)).length;
}

export async function createUser(user) {
  if (isMongoReady()) {
    const created = await User.create(user);
    return withId(created);
  }
  const next = { id: `u${Date.now()}`, ...user };
  state.users.push(next);
  return next;
}

export async function createOrder(order) {
  if (isMongoReady()) {
    const created = await Order.create(order);
    const normalized = withId(created);
    eventBus.emit('order:created', normalized);
    return normalized;
  }
  const next = {
    id: `PF-${1000 + state.orders.length + 1}`,
    createdAt: new Date().toISOString(),
    status: 'Pending',
    ...order
  };
  state.orders.unshift(next);
  eventBus.emit('order:created', next);
  return next;
}

export async function listOrders(userId = null) {
  if (isMongoReady()) {
    const orders = await Order.find(userId ? { userId: String(userId) } : {}).sort({ createdAt: -1 }).lean();
    return orders.map(withId);
  }
  return userId ? state.orders.filter((order) => order.userId === userId) : state.orders;
}

export async function getInventory() {
  if (isMongoReady()) {
    const inventory = await InventoryItem.find().sort({ type: 1, name: 1 }).lean();
    return inventory.map(withId);
  }
  return state.inventory;
}

export async function updateInventoryItem(id, patch) {
  const cleanPatch = Object.fromEntries(Object.entries(patch).filter(([, value]) => value !== undefined));
  if (isMongoReady()) {
    const updated = await InventoryItem.findOneAndUpdate({ _id: id }, cleanPatch, { new: true, runValidators: true }).lean();
    const normalized = withId(updated);
    if (normalized) eventBus.emit('inventory:updated', normalized);
    return normalized;
  }
  const item = state.inventory.find((entry) => entry.id === id);
  if (!item) return null;
  Object.assign(item, cleanPatch);
  eventBus.emit('inventory:updated', item);
  return item;
}

export async function decrementInventory(items) {
  const quantity = Math.max(1, Number(items.quantity) || 1);
  const ingredients = [
    items.base,
    items.sauce,
    items.cheese,
    ...(items.vegetables || []),
    ...(items.toppings || [])
  ].filter((ingredient) => ingredient?.id);
  const counts = ingredients.reduce((result, ingredient) => {
    result[ingredient.id] = (result[ingredient.id] || 0) + quantity;
    return result;
  }, {});

  if (isMongoReady()) {
    const operations = Object.entries(counts).map(([id, amount]) => ({
      updateOne: { filter: { _id: id }, update: { $inc: { stock: -amount } } }
    }));
    if (operations.length) await InventoryItem.bulkWrite(operations);
    const updatedItems = await InventoryItem.find({ _id: { $in: Object.keys(counts) } }).lean();
    eventBus.emit('inventory:updated', updatedItems);
    return updatedItems;
  }
  for (const [id, amount] of Object.entries(counts)) {
    const found = state.inventory.find((entry) => entry.id === id);
    if (found) {
      found.stock = Math.max(0, found.stock - amount);
    }
  }
  eventBus.emit('inventory:updated', state.inventory);
}

export async function checkInventoryAvailability(items) {
  const quantity = Math.max(1, Number(items.quantity) || 1);
  const ingredients = [items.base, items.sauce, items.cheese, ...(items.vegetables || []), ...(items.toppings || [])]
    .filter((ingredient) => ingredient?.id);
  const counts = ingredients.reduce((result, ingredient) => {
    result[ingredient.id] = (result[ingredient.id] || 0) + quantity;
    return result;
  }, {});
  const ids = Object.keys(counts);
  const inventory = isMongoReady()
    ? await InventoryItem.find({ _id: { $in: ids } }).lean()
    : state.inventory.filter((item) => ids.includes(item.id));
  const unavailable = inventory
    .filter((item) => item.stock < counts[item.id] || item.isAvailable === false)
    .map((item) => ({ name: item.name, available: item.stock, requested: counts[item.id] }));
  return { available: unavailable.length === 0, unavailable };
}

export async function updateOrderStatus(id, status) {
  if (isMongoReady()) {
    const updated = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true }).lean();
    const normalized = withId(updated);
    if (normalized) eventBus.emit('order:updated', normalized);
    return normalized;
  }
  const order = state.orders.find((entry) => entry.id === id);
  if (!order) return null;
  order.status = status;
  eventBus.emit('order:updated', order);
  return order;
}

export async function createRazorpayIntent({ amount, orderId }) {
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    const razorpay = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });
    const order = await razorpay.orders.create({ amount: Math.round(amount), currency: 'INR', receipt: String(orderId).slice(0, 40) });
    return { provider: 'razorpay', keyId: process.env.RAZORPAY_KEY_ID, ...order };
  }
  return {
    provider: 'demo',
    id: `razorpay_${Date.now()}`,
    amount,
    currency: 'INR',
    orderId,
    status: 'created'
  };
}

export async function verifyRazorpayPayment(payload) {
  if (process.env.RAZORPAY_KEY_SECRET) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payload;
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) return { verified: false };
    const expected = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest('hex');
    if (expected.length !== razorpay_signature.length) return { verified: false };
    return { verified: crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature)) };
  }
  return {
    verified: true,
    received: payload
  };
}

export async function seedDatabase() {
  if (!isMongoReady()) {
    return { seeded: false, reason: 'mongodb-not-connected' };
  }

  if (process.env.SEED_DEMO_DATA !== 'true') {
    return { seeded: false, reason: 'demo-seeding-disabled' };
  }

  const [userCount, inventoryCount, orderCount] = await Promise.all([
    User.countDocuments(),
    InventoryItem.countDocuments(),
    Order.countDocuments()
  ]);
  const [productCount, bannerCount, admin] = await Promise.all([
    Product.countDocuments(),
    Banner.countDocuments(),
    User.findOne({ role: 'admin' }).sort({ createdAt: 1 }).lean()
  ]);

  const operations = [];

  if (inventoryCount === 0) {
    operations.push(InventoryItem.insertMany(sampleInventory.map((item) => ({ _id: item.id, type: item.type, name: item.name, stock: item.stock, threshold: item.threshold, isAvailable: true }))));
  }

  if (orderCount === 0) {
    operations.push(Order.insertMany(sampleOrders.map((order) => ({
      userId: 'demo-user',
      items: {
        base: { id: 'thin', name: 'Thin Crust', price: 5 },
        sauce: { id: 'tomato', name: 'Tomato Basil', price: 1.5 },
        cheese: { id: 'mozzarella', name: 'Mozzarella', price: 2.5 },
        vegetables: [
          { id: 'pepper', name: 'Bell Peppers', price: 0.75 },
          { id: 'olive', name: 'Olives', price: 0.9 }
        ],
        quantity: 1
      },
      subtotal: order.total,
      tax: 0,
      total: order.total,
      paymentStatus: 'paid',
      orderStatus: order.status,
      deliveryAddress: 'Demo Address'
    }))));
  }

  if (productCount === 0) {
    const editor = admin?.email || 'admin@pizzaflow.local';
    operations.push(Product.insertMany(productSeed.map((product) => ({ ...product, createdBy: editor, updatedBy: editor }))));
  }

  if (bannerCount === 0) {
    const editor = admin?.email || 'admin@pizzaflow.local';
    operations.push(Banner.insertMany(bannerSeed.map((banner) => ({ ...banner, createdBy: editor, updatedBy: editor }))));
  }

  if (operations.length) {
    await Promise.all(operations);
  }

  return { seeded: operations.length > 0 };
}
