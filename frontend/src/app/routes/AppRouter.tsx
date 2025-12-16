// app/routes/AppRouter.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROUTES } from '../config/constants';
import Loader from '../../features/shared/components/Loader';

// Lazy load pages for better performance
const LoginPage = lazy(() => import('../../features/auth/pages/LoginPage'));
const RegisterPage = lazy(() => import('../../features/auth/pages/RegisterPage'));
const DashboardPage = lazy(() => import('../../features/dashboard/pages/DashboardPage'));
const HeartRiskPage = lazy(() => import('../../features/predict-heart-risk/pages/HeartRiskPage'));
const PatientListPage = lazy(() => import('../../features/patient-management/pages/PatientListPage'));
const AddPatientPage = lazy(() => import('../../features/patient-management/pages/AddPatientPage'));
const EditPatientPage = lazy(() => import('../../features/patient-management/pages/EditPatientPage'));
const PatientDetailPage = lazy(() => import('../../features/patient-management/pages/PatientDetailPage'));
const ReportsPage = lazy(() => import('../../features/shared/pages/ReportsPage'));
const SettingsPage = lazy(() => import('../../features/shared/pages/SettingsPage'));
const AppointmentsPage = lazy(() => import('../../features/shared/pages/AppointmentsPage'));
const MedicalRecordsPage = lazy(() => import('../../features/shared/pages/MedicalRecordsPage'));

// Layout wrapper
const AppLayout = lazy(() => import('../../features/shared/components/AppLayout'));

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader fullScreen />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute/>}>
            <Route element={<AppLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.PREDICT_HEART_RISK} element={<HeartRiskPage />} />
              <Route path={ROUTES.PATIENTS} element={<PatientListPage />} />
              <Route path={ROUTES.ADD_PATIENT} element={<AddPatientPage />} />
              <Route path={ROUTES.EDIT_PATIENT} element={<EditPatientPage />} />
              <Route path={ROUTES.PATIENT_DETAIL} element={<PatientDetailPage />} />
              <Route path={ROUTES.REPORTS} element={<ReportsPage />} />
              <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
              <Route path={ROUTES.APPOINTMENTS} element={<AppointmentsPage />} />
              <Route path={ROUTES.MEDICAL_RECORDS} element={<MedicalRecordsPage />} />
            </Route>
          </Route>
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
          
          {/* 404 Not Found */}
          <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;