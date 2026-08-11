import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { getInventory, updateInventoryItem } from '../services/store.js';

const router = Router();

router.get('/', requireAuth, requireRole('admin'), async (_req, res) => {
  res.json(await getInventory());
});

router.patch('/:itemId', requireAuth, requireRole('admin'), async (req, res) => {
  const { stock, threshold, isAvailable } = req.body;
  const updated = await updateInventoryItem(req.params.itemId, { stock, threshold, isAvailable });
  if (!updated) {
    return res.status(404).json({ message: 'Inventory item not found' });
  }
  res.json(updated);
});

router.post('/adjust', requireAuth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Adjustment endpoint ready for production wiring.' });
});

router.get('/low-stock', requireAuth, requireRole('admin'), async (_req, res) => {
  const inventory = await getInventory();
  res.json(inventory.filter((item) => item.stock <= item.threshold));
});

export default router;
