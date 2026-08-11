import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createBanner, deleteBanner, listBanners, updateBanner } from '../services/store.js';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await listBanners());
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  const created = await createBanner({ ...req.body, createdBy: req.user.email, updatedBy: req.user.email });
  res.status(201).json(created);
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const updated = await updateBanner(req.params.id, { ...req.body, updatedBy: req.user.email });
  if (!updated) return res.status(404).json({ message: 'Banner not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const deleted = await deleteBanner(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Banner not found' });
  res.json({ deleted: true });
});

export default router;
