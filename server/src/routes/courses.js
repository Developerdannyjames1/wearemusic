import { Router } from 'express';
import { prisma } from '../lib/prisma.js';

export const coursesRouter = Router();

coursesRouter.get('/', async (req, res) => {
  try {
    const coachId = req.query.coachId ? String(req.query.coachId) : null;
    const division = req.query.division ? String(req.query.division) : null;
    const list = await prisma.course.findMany({
      where: {
        isPublished: true,
        ...(coachId ? { coachId } : {}),
        ...(division ? { division } : {}),
      },
      orderBy: { title: 'asc' },
      include: {
        coach: { select: { id: true, name: true, email: true } },
        _count: { select: { lessons: true, enrollments: true } },
      },
    });
    res.json({ courses: list });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
