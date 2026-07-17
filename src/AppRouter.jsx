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
const FAQPage = lazy(() => import('./pages/FAQPage/FAQPage.jsx'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage/PrivacyPolicyPage.jsx'));
const HabitLibraryPage = lazy(() => import('./pages/HabitLibraryPage/HabitLibraryPage.jsx'));
const HabitDetailPage = lazy(() => import('./pages/HabitDetailPage/HabitDetailPage.jsx'));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage/MethodologyPage.jsx'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage.jsx'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage/ChallengesPage.jsx'));
const ChallengeDetailPage = lazy(() => import('./pages/ChallengeDetailPage/ChallengeDetailPage.jsx'));
const GuidesPage = lazy(() => import('./pages/GuidesPage/GuidesPage.jsx'));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage/ResourcesPage.jsx'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage/BlogIndexPage.jsx'));
const PillarPage = lazy(() => import('./pages/PillarPage/PillarPage.jsx'));
const ArticlePage = lazy(() => import('./pages/ArticlePage/ArticlePage.jsx'));
const ToolsPage = lazy(() => import('./pages/ToolsPage/ToolsPage.jsx'));
const HabitStreakCalculator = lazy(() => import('./pages/ToolsPage/HabitStreakCalculator.jsx'));
const CompletionDateCalculator = lazy(() => import('./pages/ToolsPage/CompletionDateCalculator.jsx'));
const HabitScoreCalculator = lazy(() => import('./pages/ToolsPage/HabitScoreCalculator.jsx'));
const DailyConsistencyCalculator = lazy(() => import('./pages/ToolsPage/DailyConsistencyCalculator.jsx'));
const PrintableHabitTracker = lazy(() => import('./pages/ToolsPage/PrintableHabitTracker.jsx'));
const EditorialPolicyPage = lazy(() => import('./pages/EditorialPolicyPage/EditorialPolicyPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage.jsx'));
const AuthorsPage = lazy(() => import('./pages/AuthorsPage/AuthorsPage.jsx'));
const AuthorDetailPage = lazy(() => import('./pages/AuthorsPage/AuthorDetailPage.jsx'));
const SourcesPage = lazy(() => import('./pages/SourcesPage/SourcesPage.jsx'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage/StatisticsPage.jsx'));
const ReportPage = lazy(() => import('./pages/ReportPage/ReportPage.jsx'));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage/CaseStudiesPage.jsx'));
const TemplatesPage = lazy(() => import('./pages/TemplatesPage/TemplatesPage.jsx'));
const UpdateHistoryPage = lazy(() => import('./pages/UpdateHistoryPage/UpdateHistoryPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));

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
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/habits" element={<HabitLibraryPage />} />
        <Route path="/habits/:slug" element={<HabitDetailPage />} />
        <Route path="/methodology" element={<MethodologyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/:slug" element={<ChallengeDetailPage />} />
        <Route path="/guides" element={<GuidesPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/tools/habit-streak-calculator" element={<HabitStreakCalculator />} />
        <Route path="/tools/completion-date-calculator" element={<CompletionDateCalculator />} />
        <Route path="/tools/habit-score-calculator" element={<HabitScoreCalculator />} />
        <Route path="/tools/daily-consistency-calculator" element={<DailyConsistencyCalculator />} />
        <Route path="/tools/printable-habit-tracker" element={<PrintableHabitTracker />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:pillar" element={<PillarPage />} />
        <Route path="/blog/:pillar/:slug" element={<ArticlePage />} />
        <Route path="/editorial-policy" element={<EditorialPolicyPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/authors/:slug" element={<AuthorDetailPage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/updates" element={<UpdateHistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
