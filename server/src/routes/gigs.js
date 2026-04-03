import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const gigsRouter = Router();

gigsRouter.get('/', async (req, res) => {
  try {
    const artistId = req.query.artistId;
    const list = await prisma.gig.findMany({
      where: artistId ? { artistId } : {},
      orderBy: { createdAt: 'desc' },
      include: { artist: { select: { id: true, name: true, email: true } } },
    });
    res.json({ gigs: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

gigsRouter.post('/', requireAuth, requireRole('ARTIST', 'ADMIN'), async (req, res) => {
  try {
    const { title, venue } = req.body || {};
    if (!title) return res.status(400).json({ error: 'Title required' });
    const artistId =
      req.user.role === 'ADMIN' && req.body?.artistId ? req.body.artistId : req.user.id;
    const gig = await prisma.gig.create({
      data: {
        title,
        venue: venue || null,
        artistId,
      },
    });
    res.status(201).json({ gig });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
