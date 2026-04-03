import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const artistsRouter = Router();

// Public artist directory for client booking portal
artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await prisma.user.findMany({
      where: { role: 'ARTIST' },
      orderBy: { createdAt: 'desc' },
      include: {
        artistProfile: {
          select: {
            stageName: true,
            bio: true,
            genres: true,
            city: true,
            websiteUrl: true,
            spotifyUrl: true,
            instagramUrl: true,
          },
        },
        _count: {
          select: {
            gigs: true,
            artistBookings: true,
            mediaItems: true,
          },
        },
      },
    });

    res.json({
      artists: artists.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        stageName: u.artistProfile?.stageName || u.name || u.email,
        bio: u.artistProfile?.bio,
        genres: u.artistProfile?.genres,
        city: u.artistProfile?.city,
        websiteUrl: u.artistProfile?.websiteUrl,
        spotifyUrl: u.artistProfile?.spotifyUrl,
        instagramUrl: u.artistProfile?.instagramUrl,
        gigCount: u._count.gigs,
        bookingCount: u._count.artistBookings,
        mediaCount: u._count.mediaItems,
      })),
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

