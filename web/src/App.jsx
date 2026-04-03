import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.jsx';
import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { JMMethodPage } from './pages/JMMethodPage.jsx';
import { ALMSEntertainmentPage } from './pages/ALMSEntertainmentPage.jsx';
import { MonkeyStudiosPage } from './pages/MonkeyStudiosPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { BlogsPage } from './pages/BlogsPage.jsx';
import { PartnerPage } from './pages/PartnerPage.jsx';
import { BookALMSPage } from './pages/BookALMSPage.jsx';
import { ArtistPage } from './pages/ArtistPage.jsx';
import { MoneyPage } from './pages/MoneyPage.jsx';
import { AdminLayout } from './pages/admin/AdminLayout.jsx';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage.jsx';
import {
  AdminUsersPage,
  AdminCoursesPage,
  AdminLessonsPage,
  AdminEnrollmentsPage,
  AdminPipelinePage,
  AdminBookingsPage,
  AdminArtistsPage,
  AdminGigsPage,
  AdminMediaPage,
  AdminPaymentsPage,
} from './pages/admin/AdminSectionPages.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { CoachPortalPage } from './pages/CoachPortalPage.jsx';
import { StudentPortalPage } from './pages/StudentPortalPage.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jm-method" element={<JMMethodPage />} />
        <Route path="/alms-entertainment" element={<ALMSEntertainmentPage />} />
        <Route path="/100th-monkey-studios" element={<MonkeyStudiosPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/partner-with-us" element={<PartnerPage />} />
        <Route path="/alms/book" element={<BookALMSPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="courses" element={<AdminCoursesPage />} />
          <Route path="lessons" element={<AdminLessonsPage />} />
          <Route path="enrollments" element={<AdminEnrollmentsPage />} />
          <Route path="pipeline" element={<AdminPipelinePage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="artists" element={<AdminArtistsPage />} />
          <Route path="gigs" element={<AdminGigsPage />} />
          <Route path="media" element={<AdminMediaPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
        </Route>
        <Route
          path="/coach"
          element={
            <ProtectedRoute roles={['COACH', 'ADMIN']}>
              <CoachPortalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/artist"
          element={
            <ProtectedRoute roles={['ARTIST', 'ADMIN']}>
              <ArtistPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student"
          element={
            <ProtectedRoute roles={['STUDENT', 'ADMIN']}>
              <StudentPortalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/money"
          element={
            <ProtectedRoute>
              <MoneyPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
