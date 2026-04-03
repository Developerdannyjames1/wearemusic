import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const artistRouter = Router();

artistRouter.use(requireAuth, requireRole('ARTIST', 'ADMIN'));

artistRouter.get('/dashboard', async (req, res) => {
  try {
    const id = req.user.role === 'ADMIN' ? req.query.userId || req.user.id : req.user.id;
    const [gigs, bookings, profile, demos, userRow] = await Promise.all([
      prisma.gig.findMany({ where: { artistId: id }, orderBy: { createdAt: 'desc' } }),
      prisma.booking.findMany({
        where: { artistId: id },
        orderBy: { createdAt: 'desc' },
        include: { client: { select: { name: true, email: true } } },
      }),
      prisma.artistProfile.findUnique({ where: { userId: id } }),
      prisma.mediaItem.findMany({
        where: { ownerId: id },
        orderBy: { createdAt: 'desc' },
        take: 20,
      }),
      prisma.user.findUnique({
        where: { id },
        select: { name: true, email: true, bio: true },
      }),
    ]);
    const now = new Date();
    const upcomingGigs = gigs.filter((g) => g.eventStart && new Date(g.eventStart) > now).length;
    const doneGigs = gigs.filter((g) => g.status === 'completed').length;
    const completionPct =
      gigs.length > 0 ? Math.round((doneGigs / gigs.length) * 100) : null;
    res.json({
      gigs,
      bookings,
      profile,
      user: userRow,
      demos,
      stats: {
        activeGigs: gigs.length,
        upcomingGigs,
        completionPct,
        demoCount: demos.length,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
