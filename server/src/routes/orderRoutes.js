import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { eventBus } from '../services/eventBus.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { checkInventoryAvailability, createOrder, decrementInventory, listOrders, updateOrderStatus } from '../services/store.js';

const router = Router();

router.post('/', requireAuth, async (req, res) => {
  const { items, total, subtotal, discount, deliveryFee, customer, paymentMethod, couponCode, address, deliveryNotes, ageConfirmed, paymentId, razorpayOrderId } = req.body;
  if (!items || !address || !customer) {
    return res.status(400).json({ message: 'Invalid order payload' });
  }

  const stock = await checkInventoryAvailability(items);
  if (!stock.available) {
    return res.status(409).json({ message: `Some ingredients are unavailable: ${stock.unavailable.map((item) => item.name).join(', ')}`, unavailable: stock.unavailable });
  }

  const order = await createOrder({
    userId: req.user.sub,
    customer: { ...customer, notes: deliveryNotes },
    items,
    total,
    subtotal: subtotal ?? total,
    discount: discount ?? 0,
    deliveryFee: deliveryFee ?? 0,
    tax: 0,
    paymentMethod,
    paymentStatus: paymentMethod === 'Cash on Delivery' ? 'pending' : 'paid',
    deliveryAddress: address,
    couponCode,
    deliveryNotes,
    ageConfirmed: Boolean(ageConfirmed),
    paymentId,
    razorpayOrderId
  });
  await decrementInventory(items);
  res.status(201).json(order);
});

router.get('/my-orders', requireAuth, async (req, res) => {
  res.json(await listOrders(req.user.sub));
});

router.get('/admin/all', requireAuth, requireRole('admin'), async (_req, res) => {
  res.json(await listOrders());
});

router.patch('/:id/status', requireAuth, requireRole('admin'), async (req, res) => {
  const { status } = req.body;
  const updated = await updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(updated);
});

router.get('/stream', async (req, res) => {
  const token = String(req.query.token || '');
  let viewer;
  try {
    viewer = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
  } catch {
    return res.status(401).json({ message: 'Invalid stream token' });
  }
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  const canSee = (payload) => viewer.role === 'admin' || String(payload.userId) === String(viewer.sub);
  const send = (eventName) => (payload) => {
    if (!canSee(payload)) return;
    res.write(`event: ${eventName}\n`);
    res.write(`data: ${JSON.stringify(payload)}\n\n`);
  };

  const orderCreated = send('order-created');
  const orderUpdated = send('order-updated');
  const inventoryUpdated = send('inventory-updated');

  eventBus.on('order:created', orderCreated);
  eventBus.on('order:updated', orderUpdated);
  eventBus.on('inventory:updated', inventoryUpdated);

  res.write('event: ready\ndata: {"ok":true}\n\n');

  req.on('close', () => {
    eventBus.off('order:created', orderCreated);
    eventBus.off('order:updated', orderUpdated);
    eventBus.off('inventory:updated', inventoryUpdated);
    res.end();
  });
});

export default router;
