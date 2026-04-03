import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const mediaRouter = Router();

mediaRouter.get('/', async (req, res) => {
  try {
    const list = await prisma.mediaItem.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ media: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

mediaRouter.post('/', requireAuth, requireRole('ADMIN', 'COACH', 'ARTIST'), async (req, res) => {
  try {
    const { title, mediaType, url, isPremium } = req.body || {};
    if (!title || !mediaType) return res.status(400).json({ error: 'title and mediaType required' });
    const m = await prisma.mediaItem.create({
      data: {
        title,
        mediaType,
        url: url || null,
        isPremium: !!isPremium,
        ownerId: req.user.id,
      },
    });
    res.status(201).json({ media: m });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
