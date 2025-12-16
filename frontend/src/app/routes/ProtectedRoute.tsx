import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';
import { ROUTES } from '../config/constants';

interface ProtectedRouteProps {
  requireRole?: 'doctor' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireRole }) => {
  const { isAuthenticated, user } = useAuthStore();
  console.log('AUTH STATE:', { isAuthenticated, user });  
  // ❌ Chưa đăng nhập
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  // ❌ Sai role
  if (requireRole && user?.role !== requireRole) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
