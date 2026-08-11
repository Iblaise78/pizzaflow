import { Router } from 'express';
import crypto from 'node:crypto';
import { requireAuth } from '../middleware/auth.js';
import { createRazorpayIntent, verifyRazorpayPayment } from '../services/store.js';

const router = Router();

router.post('/create-order', requireAuth, async (req, res) => {
  const { amount, orderId } = req.body;
  const intent = await createRazorpayIntent({ amount, orderId });
  res.json(intent);
});

router.post('/verify', requireAuth, async (req, res) => {
  const result = await verifyRazorpayPayment(req.body);
  res.json(result);
});

router.post('/webhook', (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET || 'dev-webhook-secret';
  const signature = req.headers['x-razorpay-signature'];
  const digest = crypto.createHmac('sha256', secret).update(JSON.stringify(req.body)).digest('hex');
  if (signature && signature !== digest) {
    return res.status(400).json({ message: 'Invalid signature' });
  }
  res.json({ received: true, verified: true });
});

export default router;
