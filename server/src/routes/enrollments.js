import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const enrollmentsRouter = Router();

enrollmentsRouter.use(requireAuth);

// Coach/Admin can update progress/status for a student's enrollment
enrollmentsRouter.patch('/:id', async (req, res) => {
  try {
    const { progress, status } = req.body || {};

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: req.params.id },
      include: {
        course: { select: { id: true, title: true, coachId: true } },
      },
    });

    if (!enrollment) return res.status(404).json({ error: 'Not found' });

    const isAdmin = req.user.role === 'ADMIN';
    const isCoach = req.user.role === 'COACH';
    if (!isAdmin && !(isCoach && enrollment.course.coachId === req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const updated = await prisma.enrollment.update({
      where: { id: req.params.id },
      data: {
        ...(progress !== undefined && { progress: Number(progress) }),
        ...(status !== undefined && { status }),
      },
    });

    res.json({ enrollment: updated });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

