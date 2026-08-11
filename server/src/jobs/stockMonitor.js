import cron from 'node-cron';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { sendLowStockAlert } from '../services/emailService.js';
import { getInventory } from '../services/store.js';

export function startStockMonitor() {
  let lastAlertKey = '';
  const check = async () => {
    if (mongoose.connection.readyState !== 1) return;
    const lowStock = (await getInventory()).filter((item) => item.stock <= item.threshold);
    if (!lowStock.length) {
      lastAlertKey = '';
      return;
    }
    const alertKey = lowStock.map((item) => `${item.id || item._id}:${item.stock}:${item.threshold}`).sort().join('|');
    if (alertKey === lastAlertKey) return;
    const admin = await User.findOne({ role: 'admin' }).sort({ createdAt: 1 }).lean();
    if (!admin?.email) return;
    try {
      await sendLowStockAlert({ to: admin.email, items: lowStock });
      lastAlertKey = alertKey;
      console.log('Low-stock email sent to:', admin.email);
    } catch (error) {
      console.error('Low-stock email failed:', error.message);
    }
  };
  cron.schedule('*/15 * * * *', check);
  check();
}
