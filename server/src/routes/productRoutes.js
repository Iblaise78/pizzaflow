import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { createProduct, deleteProduct, listProducts, updateProduct } from '../services/store.js';

const router = Router();

router.get('/', async (_req, res) => {
  res.json(await listProducts());
});

router.post('/', requireAuth, requireRole('admin'), async (req, res) => {
  const created = await createProduct({ ...req.body, createdBy: req.user.email, updatedBy: req.user.email });
  res.status(201).json(created);
});

router.patch('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const updated = await updateProduct(req.params.id, { ...req.body, updatedBy: req.user.email });
  if (!updated) return res.status(404).json({ message: 'Product not found' });
  res.json(updated);
});

router.delete('/:id', requireAuth, requireRole('admin'), async (req, res) => {
  const deleted = await deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Product not found' });
  res.json({ deleted: true });
});

export default router;
