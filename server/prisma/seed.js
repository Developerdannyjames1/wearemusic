import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function clearData() {
  await prisma.$transaction([
    prisma.mediaPurchase.deleteMany(),
    prisma.auditLog.deleteMany(),
    prisma.notification.deleteMany(),
    prisma.enrollment.deleteMany(),
    prisma.lesson.deleteMany(),
    prisma.course.deleteMany(),
    prisma.mediaItem.deleteMany(),
    prisma.transaction.deleteMany(),
    prisma.booking.deleteMany(),
    prisma.gig.deleteMany(),
    prisma.artistProfile.deleteMany(),
    prisma.coachProfile.deleteMany(),
    prisma.passwordReset.deleteMany(),
  ]);
}

async function main() {
  const passwordHash = await bcrypt.hash('demo1234', 12);

  await clearData();

  const admin = await prisma.user.upsert({
    where: { email: 'admin@wearemusic.local' },
    update: { passwordHash, name: 'Demo Admin', role: 'ADMIN', bio: 'Platform operator.' },
    create: {
      email: 'admin@wearemusic.local',
      passwordHash,
      name: 'Demo Admin',
      role: 'ADMIN',
      bio: 'Platform operator.',
    },
  });

  const coach = await prisma.user.upsert({
    where: { email: 'coach@wearemusic.local' },
    update: { passwordHash, name: 'Jordan Mitchell', role: 'COACH' },
    create: {
      email: 'coach@wearemusic.local',
      passwordHash,
      name: 'Jordan Mitchell',
      role: 'COACH',
    },
  });

  const coach2 = await prisma.user.upsert({
    where: { email: 'coach2@wearemusic.local' },
    update: { passwordHash },
    create: {
      email: 'coach2@wearemusic.local',
      passwordHash,
      name: 'Alex Rivera',
      role: 'COACH',
    },
  });

  const artist = await prisma.user.upsert({
    where: { email: 'artist@wearemusic.local' },
    update: { passwordHash, name: 'Maya Chen', role: 'ARTIST' },
    create: {
      email: 'artist@wearemusic.local',
      passwordHash,
      name: 'Maya Chen',
      role: 'ARTIST',
    },
  });

  const artist2 = await prisma.user.upsert({
    where: { email: 'artist2@wearemusic.local' },
    update: { passwordHash },
    create: {
      email: 'artist2@wearemusic.local',
      passwordHash,
      name: 'The Signal Trio',
      role: 'ARTIST',
    },
  });

  const student = await prisma.user.upsert({
    where: { email: 'student@wearemusic.local' },
    update: { passwordHash, name: 'Demo Student', role: 'STUDENT' },
    create: {
      email: 'student@wearemusic.local',
      passwordHash,
      name: 'Demo Student',
      role: 'STUDENT',
    },
  });

  const student2 = await prisma.user.upsert({
    where: { email: 'student2@wearemusic.local' },
    update: { passwordHash },
    create: {
      email: 'student2@wearemusic.local',
      passwordHash,
      name: 'Sam Okonkwo',
      role: 'STUDENT',
    },
  });

  await prisma.coachProfile.createMany({
    data: [
      {
        userId: coach.id,
        headline: 'JM Method lead instructor',
        specialties: 'Voice, breath, phrasing',
        bio: '20+ years performance and coaching.',
      },
      {
        userId: coach2.id,
        headline: 'Ear training & theory',
        specialties: 'Intervals, harmony, sight-singing',
        bio: 'Former conservatory faculty.',
      },
    ],
  });

  await prisma.artistProfile.createMany({
    data: [
      {
        userId: artist.id,
        stageName: 'Maya Chen',
        genres: 'Jazz, Neo-soul, R&B',
        city: 'Los Angeles',
        bio: 'Vocalist and bandleader for private events.',
        websiteUrl: 'https://example.com/maya',
        spotifyUrl: 'https://open.spotify.com/',
        instagramUrl: 'https://instagram.com/',
      },
      {
        userId: artist2.id,
        stageName: 'The Signal Trio',
        genres: 'Indie, Electronic',
        city: 'Austin',
        bio: 'Corporate and festival bookings.',
      },
    ],
  });

  const courseA = await prisma.course.create({
    data: {
      title: 'JM Method — Core Track',
      slug: 'jm-method-core',
      description: 'Foundation curriculum: breath, phrasing, and repertoire.',
      division: 'JM_METHOD',
      level: 'All levels',
      price: 199,
      coachId: coach.id,
    },
  });

  const courseB = await prisma.course.create({
    data: {
      title: 'Ear Training Intensive',
      slug: 'ear-training-intensive',
      description: 'Six-week interval and harmony bootcamp.',
      division: 'JM_METHOD',
      level: 'Intermediate',
      price: 149,
      coachId: coach2.id,
    },
  });

  const courseC = await prisma.course.create({
    data: {
      title: 'Artist Business Basics',
      slug: 'artist-business-basics',
      description: 'Contracts, riders, and booking workflows.',
      division: 'ALMS',
      level: 'Professional',
      price: 79,
      coachId: coach.id,
    },
  });

  await prisma.lesson.createMany({
    data: [
      {
        title: 'Breath & Phrasing Foundations',
        description: 'JM Method intro module.',
        museScoreUrl: 'https://musescore.com/',
        division: 'JM_METHOD',
        orderIndex: 1,
        durationMinutes: 45,
        courseId: courseA.id,
        coachId: coach.id,
      },
      {
        title: 'Interval Ear Training — Week 1',
        description: 'Major/minor seconds and thirds.',
        division: 'JM_METHOD',
        orderIndex: 1,
        durationMinutes: 30,
        courseId: courseB.id,
        coachId: coach2.id,
      },
      {
        title: 'Repertoire Workshop',
        description: 'Apply phrasing to two songs of your choice.',
        division: 'JM_METHOD',
        orderIndex: 2,
        durationMinutes: 60,
        courseId: courseA.id,
        coachId: coach.id,
      },
      {
        title: 'Reading the rider',
        description: 'ALMS template walkthrough.',
        division: 'ALMS',
        orderIndex: 1,
        courseId: courseC.id,
        coachId: coach.id,
      },
    ],
  });

  await prisma.enrollment.createMany({
    data: [
      {
        studentId: student.id,
        courseId: courseA.id,
        progress: 35,
        status: 'active',
      },
      {
        studentId: student.id,
        courseId: courseB.id,
        progress: 10,
        status: 'active',
      },
      {
        studentId: student2.id,
        courseId: courseA.id,
        progress: 72,
        status: 'active',
      },
    ],
  });

  const gig1 = await prisma.gig.create({
    data: {
      title: 'Jazz Night — Downtown',
      venue: 'Blue Note (demo)',
      division: 'ALMS',
      status: 'confirmed',
      fee: 1200,
      eventStart: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      artistId: artist.id,
    },
  });

  await prisma.gig.createMany({
    data: [
      {
        title: 'Corporate gala — keynote set',
        venue: 'Convention Center Hall B',
        division: 'ALMS',
        status: 'open',
        fee: 3500,
        artistId: artist2.id,
      },
      {
        title: 'Wedding reception — trio',
        venue: 'Riverside Estate',
        division: 'ALMS',
        status: 'completed',
        fee: 2800,
        artistId: artist.id,
      },
    ],
  });

  await prisma.booking.createMany({
    data: [
      {
        clientId: student.id,
        artistId: artist.id,
        division: 'ALMS',
        status: 'confirmed',
        packageName: 'Wedding package',
        notes: 'Outdoor ceremony',
        budget: 4500,
        eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
      {
        clientId: student2.id,
        artistId: artist2.id,
        division: 'ALMS',
        status: 'pending',
        packageName: 'Corporate happy hour',
        notes: 'Jazz standards + one original',
        budget: 2000,
      },
    ],
  });

  const media1 = await prisma.mediaItem.create({
    data: {
      title: 'Studio Session A — Live take',
      description: 'Full band room capture.',
      mediaType: 'audio',
      url: 'https://example.com/media/demo-a',
      division: 'MONKEY_STUDIOS',
      isPremium: true,
      price: 4.99,
      durationSeconds: 240,
      playCount: 128,
      ownerId: coach.id,
    },
  });

  const media2 = await prisma.mediaItem.create({
    data: {
      title: 'Release Teaser — Vertical',
      description: 'Social cut for upcoming single.',
      mediaType: 'video',
      thumbnailUrl: 'https://example.com/thumb.jpg',
      division: 'MONKEY_STUDIOS',
      isPremium: false,
      playCount: 890,
      ownerId: artist.id,
    },
  });

  await prisma.mediaItem.create({
    data: {
      title: 'Behind the boards — mix breakdown',
      mediaType: 'video',
      description: 'Engineer walkthrough.',
      division: 'MONKEY_STUDIOS',
      isPremium: true,
      price: 9.99,
      ownerId: artist2.id,
    },
  });

  await prisma.mediaPurchase.createMany({
    data: [
      { userId: student.id, mediaId: media1.id, amount: 4.99, status: 'completed' },
      { userId: student2.id, mediaId: media2.id, amount: 0, status: 'completed' },
    ],
  });

  await prisma.transaction.createMany({
    data: [
      {
        userId: student.id,
        amount: 199,
        status: 'completed',
        type: 'course',
        description: 'JM Method — Core Track',
      },
      {
        userId: student.id,
        amount: 4.99,
        status: 'completed',
        type: 'media',
        description: 'Premium stream purchase',
      },
      {
        userId: artist.id,
        amount: 3200,
        status: 'completed',
        type: 'gig_payout',
        description: `Gig: ${gig1.title}`,
      },
      {
        userId: coach.id,
        amount: 890,
        status: 'completed',
        type: 'payout',
        description: 'Coach revenue share (demo)',
      },
      {
        userId: admin.id,
        amount: 0,
        status: 'completed',
        type: 'adjustment',
        description: 'Ledger balance check',
      },
    ],
  });

  await prisma.notification.createMany({
    data: [
      {
        userId: student.id,
        title: 'Welcome to We Are Music',
        body: 'Your Core Track enrollment is active.',
        type: 'success',
      },
      {
        userId: artist.id,
        title: 'New booking inquiry',
        body: 'A client submitted a wedding package request.',
        type: 'booking',
      },
      {
        userId: coach.id,
        title: 'Lesson published',
        body: 'Your lesson was added to Core Track.',
        type: 'info',
      },
    ],
  });

  await prisma.auditLog.createMany({
    data: [
      {
        actorId: admin.id,
        action: 'seed',
        resource: 'database',
        details: 'Full demo dataset loaded',
      },
      {
        actorId: admin.id,
        action: 'settings.view',
        resource: 'platform',
        details: 'Admin dashboard access',
      },
    ],
  });

  console.log('Seed OK — full database populated.');
  console.log('Logins (password: demo1234):');
  console.log('  admin@wearemusic.local (ADMIN)');
  console.log('  coach@wearemusic.local | coach2@wearemusic.local (COACH)');
  console.log('  artist@wearemusic.local | artist2@wearemusic.local (ARTIST)');
  console.log('  student@wearemusic.local | student2@wearemusic.local (STUDENT)');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
