import { Router } from 'express';
import { getMenuOptions } from '../services/store.js';

const router = Router();

router.get('/options', (_req, res) => {
  res.json(getMenuOptions());
});

router.get('/bases', (_req, res) => res.json(getMenuOptions().bases));
router.get('/sauces', (_req, res) => res.json(getMenuOptions().sauces));
router.get('/cheeses', (_req, res) => res.json(getMenuOptions().cheeses));
router.get('/vegetables', (_req, res) => res.json(getMenuOptions().vegetables));

export default router;

