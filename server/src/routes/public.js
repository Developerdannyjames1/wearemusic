import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const publicRouter = Router();

/** Guest gig / venue inquiry for ALMS (no login required) */
publicRouter.post('/booking-leads', async (req, res) => {
  try {
    const {
      email,
      name,
      phone,
      artistId,
      gigId,
      packageName,
      notes,
      eventDate,
      budget,
      currency,
    } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    let resolvedPackage = packageName || null;
    let resolvedArtistId = artistId || null;
    if (gigId) {
      const gig = await prisma.gig.findUnique({ where: { id: gigId } });
      if (gig) {
        resolvedArtistId = gig.artistId;
        if (!resolvedPackage) resolvedPackage = gig.title;
      }
    }

    const lead = await prisma.bookingLead.create({
      data: {
        email: email.trim().toLowerCase(),
        name: name?.trim() || null,
        phone: phone?.trim() || null,
        artistId: resolvedArtistId,
        gigId: gigId || null,
        packageName: resolvedPackage,
        notes: notes?.trim() || null,
        eventDate: eventDate ? new Date(eventDate) : null,
        budget: budget !== undefined && budget !== '' ? Number(budget) : null,
        currency: currency || 'USD',
        division: 'ALMS',
        status: 'new',
      },
    });

    res.status(201).json({ lead: { id: lead.id, createdAt: lead.createdAt } });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to save request' });
  }
});
