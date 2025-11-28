// Chặn truy cập khi chưa đăng nhập
// app/routes/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';
import { ROUTES } from '../config/constants';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireRole?: 'doctor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireRole 
}) => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  // Kiểm tra role (nếu cần)
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }
  
  // Nếu có children thì render children, không thì render Outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;