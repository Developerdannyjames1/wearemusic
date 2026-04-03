import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { prisma } from './lib/prisma.js';
import { authRouter } from './routes/auth.js';
import { adminRouter } from './routes/admin.js';
import { lessonsRouter } from './routes/lessons.js';
import { bookingsRouter } from './routes/bookings.js';
import { gigsRouter } from './routes/gigs.js';
import { studentRouter } from './routes/student.js';
import { artistRouter } from './routes/artist.js';
import { paymentsRouter } from './routes/payments.js';
import { mediaRouter } from './routes/media.js';
import { coachRouter } from './routes/coach.js';
import { coursesRouter } from './routes/courses.js';
import { artistsRouter } from './routes/artists.js';
import { enrollmentsRouter } from './routes/enrollments.js';
import { publicRouter } from './routes/public.js';

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ ok: true, service: 'wearemusic-api', time: new Date().toISOString() });
});

app.use('/api/public', publicRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/lessons', lessonsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/gigs', gigsRouter);
app.use('/api/coach', coachRouter);
app.use('/api/student', studentRouter);
app.use('/api/artist', artistRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/media', mediaRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/enrollments', enrollmentsRouter);

app.get('/api', (req, res) => {
  res.json({
    name: 'We Are Music API',
    routes: [
      'POST /api/public/booking-leads',
      'POST /api/auth/register',
      'POST /api/auth/login',
      'GET /api/auth/me',
      'POST /api/auth/forgot-password',
      'POST /api/auth/reset-password',
      'GET /api/courses',
      'GET /api/admin/dashboard',
      'GET /api/artists',
      'GET|POST /api/lessons',
      'GET|POST /api/bookings',
      'PATCH /api/bookings/:id',
      'GET|POST /api/gigs',
      'GET /api/coach/dashboard',
      'GET /api/student/dashboard',
      'POST /api/student/enrollments',
      'PATCH /api/enrollments/:id',
      'GET /api/artist/dashboard',
      'GET|POST /api/payments',
      'GET|POST /api/media',
    ],
  });
});

const server = app.listen(PORT, async () => {
  console.log(`API http://localhost:${PORT}`);
  try {
    await prisma.$connect();
    console.log('Database connected');
  } catch (e) {
    console.error('DB connect failed:', e.message);
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${PORT} is already in use. Stop the other process (e.g. kill $(lsof -t -i:${PORT})) or set PORT in server/.env.`,
    );
  } else {
    console.error(err);
  }
  process.exit(1);
});
