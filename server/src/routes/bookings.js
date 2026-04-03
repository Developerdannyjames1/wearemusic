import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const bookingsRouter = Router();

bookingsRouter.use(requireAuth);

bookingsRouter.get('/', async (req, res) => {
  try {
    let list;
    if (req.user.role === 'ADMIN') {
      list = await prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          client: { select: { id: true, name: true, email: true } },
          artist: { select: { id: true, name: true, email: true } },
        },
      });
    } else if (req.user.role === 'ARTIST') {
      list = await prisma.booking.findMany({
        where: { artistId: req.user.id },
        orderBy: { createdAt: 'desc' },
        include: { client: { select: { id: true, name: true, email: true } } },
      });
    } else {
      list = await prisma.booking.findMany({
        where: { clientId: req.user.id },
        orderBy: { createdAt: 'desc' },
        include: { artist: { select: { id: true, name: true, email: true } } },
      });
    }
    res.json({ bookings: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

bookingsRouter.post('/', async (req, res) => {
  try {
    const {
      gigId,
      artistId,
      packageName,
      notes,
      eventDate,
      budget,
      currency,
    } = req.body || {};

    let resolvedArtistId = artistId || null;
    let resolvedPackageName = packageName || null;
    let resolvedEventDate = eventDate ? new Date(eventDate) : null;

    if (gigId) {
      const gig = await prisma.gig.findUnique({ where: { id: gigId } });
      if (!gig) return res.status(404).json({ error: 'Gig not found' });
      resolvedArtistId = gig.artistId;
      resolvedPackageName = gig.title;
      if (!resolvedEventDate && gig.eventStart) resolvedEventDate = gig.eventStart;
    }

    if (!resolvedArtistId && gigId) {
      return res.status(400).json({ error: 'artistId is required' });
    }

    const booking = await prisma.booking.create({
      data: {
        clientId: req.user.id,
        artistId: resolvedArtistId || null,
        packageName: resolvedPackageName || null,
        notes: notes || null,
        eventDate: resolvedEventDate,
        budget: budget !== undefined ? Number(budget) : undefined,
        currency: currency || undefined,
        status: 'pending',
      },
    });
    res.status(201).json({ booking });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

bookingsRouter.patch('/:id', async (req, res) => {
  try {
    const { status, artistId } = req.body || {};
    const booking = await prisma.booking.findUnique({ where: { id: req.params.id } });
    if (!booking) return res.status(404).json({ error: 'Not found' });
    if (req.user.role === 'ADMIN' || req.user.role === 'ARTIST') {
      const updated = await prisma.booking.update({
        where: { id: req.params.id },
        data: {
          ...(status && { status }),
          ...(artistId !== undefined && { artistId }),
        },
      });
      return res.json({ booking: updated });
    }
    return res.status(403).json({ error: 'Forbidden' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
