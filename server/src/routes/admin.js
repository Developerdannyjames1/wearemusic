import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const adminRouter = Router();

adminRouter.use(requireAuth, requireRole('ADMIN'));

adminRouter.get('/dashboard', async (req, res) => {
  try {
    const [
      users,
      lessonsCount,
      coursesCount,
      enrollmentsCount,
      bookingsCount,
      gigsCount,
      transactions,
      mediaCount,
      notifCount,
      recentUsers,
      recentLessons,
      pendingBookings,
      recentGigs,
      pendingBookingsCount,
    ] = await Promise.all([
      prisma.user.groupBy({ by: ['role'], _count: { _all: true } }),
      prisma.lesson.count(),
      prisma.course.count(),
      prisma.enrollment.count(),
      prisma.booking.count(),
      prisma.gig.count(),
      prisma.transaction.aggregate({ _sum: { amount: true } }),
      prisma.mediaItem.count(),
      prisma.notification.count(),
      prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: { id: true, email: true, name: true, role: true, createdAt: true },
      }),
      prisma.lesson.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          coach: { select: { id: true, name: true, email: true } },
          course: { select: { id: true, title: true, division: true } },
        },
      }),
      prisma.booking.findMany({
        where: { status: 'pending' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          client: { select: { id: true, name: true, email: true } },
          artist: { select: { id: true, name: true, email: true } },
        },
      }),
      prisma.gig.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: { artist: { select: { id: true, name: true, email: true } } },
      }),
      prisma.booking.count({ where: { status: 'pending' } }),
    ]);

    const roleCounts = Object.fromEntries(users.map((u) => [u.role, u._count._all]));

    res.json({
      users: {
        total: users.reduce((a, b) => a + b._count._all, 0),
        byRole: roleCounts,
      },
      catalog: { courses: coursesCount, enrollments: enrollmentsCount, lessons: lessonsCount },
      engagement: { notifications: notifCount, pendingBookings: pendingBookingsCount },
      divisions: {
        jmMethod: { lessons: lessonsCount, courses: coursesCount },
        alms: { gigs: gigsCount, bookings: bookingsCount, pendingBookings: pendingBookingsCount },
        monkeyStudios: { mediaItems: mediaCount },
      },
      revenue: { total: transactions._sum.amount || 0 },
      recentUsers,
      recentLessons,
      pendingBookings,
      recentGigs,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

adminRouter.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, email: true, name: true, role: true, createdAt: true },
    });
    res.json({ users });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

adminRouter.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      orderBy: { title: 'asc' },
      include: {
        coach: { select: { id: true, name: true, email: true } },
        _count: { select: { lessons: true, enrollments: true } },
      },
    });
    res.json({ courses });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

adminRouter.get('/enrollments', async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      orderBy: { enrolledAt: 'desc' },
      include: {
        student: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true, division: true } },
      },
    });
    res.json({ enrollments });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
