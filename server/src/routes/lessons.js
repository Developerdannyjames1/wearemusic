import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const lessonsRouter = Router();

lessonsRouter.use(requireAuth);

lessonsRouter.get('/', async (req, res) => {
  try {
    let where = {};
    if (req.user.role === 'ADMIN') {
      if (req.query.coachId) where = { coachId: req.query.coachId };
    } else if (req.user.role === 'COACH') {
      where = { coachId: req.user.id };
    } else {
      const coachId = req.query.coachId;
      where = coachId ? { coachId } : {};
    }
    const list = await prisma.lesson.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        coach: { select: { id: true, name: true, email: true } },
        course: { select: { id: true, title: true, slug: true } },
      },
    });
    res.json({ lessons: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

lessonsRouter.post('/', requireRole('COACH', 'ADMIN'), async (req, res) => {
  try {
    const { title, description, museScoreUrl, courseId, division, orderIndex, durationMinutes } =
      req.body || {};
    if (!title) return res.status(400).json({ error: 'Title required' });
    const coachId = req.user.role === 'ADMIN' ? req.body.coachId || req.user.id : req.user.id;
    const lesson = await prisma.lesson.create({
      data: {
        title,
        description: description || null,
        museScoreUrl: museScoreUrl || null,
        courseId: courseId || null,
        division: division || 'JM_METHOD',
        orderIndex: orderIndex ?? 0,
        durationMinutes: durationMinutes ?? null,
        coachId,
      },
    });
    res.status(201).json({ lesson });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
