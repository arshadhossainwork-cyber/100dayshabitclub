import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage.jsx'));
const SignupPage = lazy(() => import('./pages/SignupPage/SignupPage.jsx'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage/ForgotPasswordPage.jsx'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage/ResetPasswordPage.jsx'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage.jsx'));
const ProgressPage = lazy(() => import('./pages/ProgressPage/ProgressPage.jsx'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage/AchievementsPage.jsx'));
const SharedCardPage = lazy(() => import('./pages/SharedCardPage/SharedCardPage.jsx'));

export default function AppRouter() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
        <Route path="/s/:slug" element={<SharedCardPage />} />
        <Route path="*" element={<App />} />
      </Routes>
    </Suspense>
  );
}
