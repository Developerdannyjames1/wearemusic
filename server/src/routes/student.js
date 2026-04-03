import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const studentRouter = Router();

studentRouter.use(requireAuth);

studentRouter.get('/dashboard', requireRole('STUDENT', 'ADMIN'), async (req, res) => {
  try {
    const userId = req.user.role === 'ADMIN' ? req.query.userId || req.user.id : req.user.id;
    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: userId },
      orderBy: { enrolledAt: 'desc' },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            division: true,
            coach: { select: { name: true, email: true } },
          },
        },
      },
    });
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    res.json({ enrollments, transactions });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

studentRouter.post('/enrollments', requireRole('STUDENT'), async (req, res) => {
  try {
    const { courseId } = req.body || {};
    if (!courseId) return res.status(400).json({ error: 'courseId required' });
    const course = await prisma.course.findFirst({
      where: { id: courseId, isPublished: true },
    });
    if (!course) return res.status(404).json({ error: 'Course not found' });
    const existing = await prisma.enrollment.findFirst({
      where: { studentId: req.user.id, courseId },
    });
    if (existing) {
      return res.json({ enrollment: existing, alreadyEnrolled: true });
    }
    const e = await prisma.enrollment.create({
      data: {
        studentId: req.user.id,
        courseId,
        progress: 0,
        status: 'active',
      },
    });
    res.status(201).json({ enrollment: e });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed' });
  }
});
