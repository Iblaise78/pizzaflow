import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/overview', requireAuth, requireRole('admin'), (_req, res) => {
  res.json({
    lowStockAlerts: 1,
    openOrders: 7,
    nextCronRun: 'Every 15 minutes'
  });
});

export default router;
