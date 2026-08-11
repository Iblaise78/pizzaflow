import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { riderAssignments } from '../data/adminSeed.js';

const router = Router();

router.get('/dashboard', requireAuth, requireRole('rider'), (_req, res) => {
  res.json({
    assignments: riderAssignments,
    completedToday: 12,
    activeDeliveries: 2
  });
});

router.patch('/orders/:id/status', requireAuth, requireRole('rider'), (req, res) => {
  res.json({
    id: req.params.id,
    status: req.body.status || 'Out for Delivery'
  });
});

export default router;

