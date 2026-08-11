import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { customers, coupons, deliveryFees, salesReport } from '../data/adminSeed.js';

const router = Router();

router.get('/customers', requireAuth, requireRole('admin'), (_req, res) => {
  res.json(customers);
});

router.get('/coupons', requireAuth, requireRole('admin'), (_req, res) => {
  res.json(coupons);
});

router.get('/delivery-fees', requireAuth, requireRole('admin'), (_req, res) => {
  res.json(deliveryFees);
});

router.get('/reports', requireAuth, requireRole('admin'), (_req, res) => {
  res.json(salesReport);
});

export default router;

