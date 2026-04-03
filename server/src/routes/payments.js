import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const paymentsRouter = Router();

paymentsRouter.use(requireAuth);

paymentsRouter.get('/summary', async (req, res) => {
  try {
    const userId = req.user.role === 'ADMIN' ? req.query.userId || req.user.id : req.user.id;
    const txs = await prisma.transaction.findMany({
      where: req.user.role === 'ADMIN' ? {} : { userId },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
    const sum = await prisma.transaction.aggregate({
      where: req.user.role === 'ADMIN' ? {} : { userId },
      _sum: { amount: true },
    });
    res.json({
      transactions: txs,
      total: sum._sum.amount || 0,
      stripeConnectNote: 'Stripe Connect: integrate Stripe SDK in production for live charges.',
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});

paymentsRouter.post('/mock', async (req, res) => {
  try {
    const { amount, type } = req.body || {};
    if (amount == null) return res.status(400).json({ error: 'amount required' });
    const tx = await prisma.transaction.create({
      data: {
        userId: req.user.id,
        amount: Number(amount),
        status: 'completed',
        type: type || 'mock',
      },
    });
    res.status(201).json({ transaction: tx });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed' });
  }
});
