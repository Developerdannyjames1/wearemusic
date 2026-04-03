import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const coachRouter = Router();

coachRouter.use(requireAuth, requireRole('COACH', 'ADMIN'));

coachRouter.get('/dashboard', async (req, res) => {
  try {
    const coachId = req.user.role === 'ADMIN' ? req.query.coachId || req.user.id : req.user.id;

    const [lessons, lessonCount, mediaCount, courses, enrollments, profile] = await Promise.all([
      prisma.lesson.findMany({
        where: { coachId },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          course: { select: { id: true, title: true, slug: true } },
        },
      }),
      prisma.lesson.count({ where: { coachId } }),
      prisma.mediaItem.count({ where: { ownerId: coachId } }),
      prisma.course.findMany({
        where: { coachId },
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          division: true,
          price: true,
          isPublished: true,
          createdAt: true,
        },
      }),
      prisma.enrollment.findMany({
        where: { course: { coachId } },
        orderBy: { enrolledAt: 'desc' },
        take: 25,
        include: {
          student: { select: { id: true, name: true, email: true } },
          course: { select: { id: true, title: true, division: true } },
        },
      }),
      prisma.coachProfile.findUnique({
        where: { userId: coachId },
      }),
    ]);
    res.json({
      lessons,
      courses,
      enrollments,
      profile,
      stats: { lessonCount, mediaCount, enrollmentsCount: enrollments.length },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
