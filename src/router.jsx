import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import AppLayout from './layouts/AppLayout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StudentSignupPage from './pages/StudentSignupPage';
import RecruiterSignupPage from './pages/RecruiterSignupPage';
import JobFeedPage from './pages/JobFeedPage';
import JobDetailsPage from './pages/JobDetailsPage';
import StudentApplicationsPage from './pages/StudentApplicationsPage';
import RecruiterDashboardPage from './pages/RecruiterDashboardPage';
import ProfilePage from './pages/ProfilePage';
import RecruiterJobsPage from './pages/RecruiterJobsPage';
import OfferScannerPage from './pages/OfferScannerPage';
import IdentityVerificationPage from './pages/IdentityVerificationPage';
import CandidateReviewPage from './pages/CandidateReviewPage';
import ScamLedgerPage from './pages/ScamLedgerPage';
import CompanyDirectoryPage from './pages/CompanyDirectoryPage';
import LiveValidationPage from './pages/LiveValidationPage';
import { ProtectedRoute } from './components/ProtectedRoute';

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AppLayout />}>
                    {/* Public Routes */}
                    <Route index element={<LandingPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="signup/student" element={<StudentSignupPage />} />
                    <Route path="signup/recruiter" element={<RecruiterSignupPage />} />

                    {/* Protected Routes (Student Only or Auth Only) */}
                    <Route path="jobs" element={
                        <ProtectedRoute>
                            <JobFeedPage />
                        </ProtectedRoute>
                    } />
                    <Route path="jobs/:id" element={
                        <ProtectedRoute>
                            <JobDetailsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="applications" element={
                        <ProtectedRoute allowedRole="student">
                            <StudentApplicationsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="scan" element={
                        <ProtectedRoute allowedRole="student">
                            <OfferScannerPage />
                        </ProtectedRoute>
                    } />
                    <Route path="ledger" element={
                        <ProtectedRoute allowedRole="student">
                            <ScamLedgerPage />
                        </ProtectedRoute>
                    } />
                    <Route path="directory" element={
                        <ProtectedRoute allowedRole="student">
                            <CompanyDirectoryPage />
                        </ProtectedRoute>
                    } />
                    <Route path="verify" element={
                        <ProtectedRoute allowedRole="student">
                            <IdentityVerificationPage />
                        </ProtectedRoute>
                    } />

                    {/* Protected Route (Recruiter Only) */}
                    <Route path="dashboard" element={
                        <ProtectedRoute allowedRole="recruiter">
                            <RecruiterDashboardPage />
                        </ProtectedRoute>
                    } />
                    <Route path="recruiter/jobs" element={
                        <ProtectedRoute allowedRole="recruiter">
                            <RecruiterJobsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="recruiter/ledger" element={
                        <ProtectedRoute allowedRole="recruiter">
                            <ScamLedgerPage />
                        </ProtectedRoute>
                    } />
                    <Route path="recruiter/directory" element={
                        <ProtectedRoute allowedRole="recruiter">
                            <CompanyDirectoryPage />
                        </ProtectedRoute>
                    } />
                    <Route path="recruiter/candidate/:id" element={
                        <ProtectedRoute allowedRole="recruiter">
                            <CandidateReviewPage />
                        </ProtectedRoute>
                    } />
                    <Route path="recruiter/live-validation" element={
                        <ProtectedRoute allowedRole="recruiter">
                            <LiveValidationPage />
                        </ProtectedRoute>
                    } />

                    {/* Profile Route */}
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
