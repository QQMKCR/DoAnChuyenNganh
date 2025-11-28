// Trang UI chứa LoginForm và branding.
import React from 'react';
import { Activity } from 'lucide-react';
import { LoginForm } from '../components/LoginForm';
import { VneIdButton } from '../components/VneIdButton';
import { useAuth } from '../hooks/useAuth';
import DashboardPage from '../../dashboard/pages/DashboardPage';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../app/store';

const LoginPage: React.FC = () => {
  // const { login, loginVneid, loading, error } = useAuth();

  // const handleLogin = async (data: any) => {
  //   const response = await login(data);
  //   if (response) {
  //     // Store token and redirect
  //     localStorage.setItem('auth_token', response.token);
  //     window.location.href = '/dashboard';
  //   }
  // };

  // const handleVneIdLogin = async () => {
  //   const response = await loginVneid({ citizenId: '123456789012' });
  //   if (response) {
  //     localStorage.setItem('auth_token', response.token);
  //     window.location.href = '/dashboard';
  //   }
  // };
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleGoDashboard = () => {
    // Auto login with demo account
    const demoUser = {
      id: 'demo-001',
      name: 'Demo Doctor',
      email: 'demo@medicare.vn',
      role: 'doctor' as const,
      avatar: 'https://ui-avatars.com/api/?name=Demo+Doctor',
      vneidVerified: true,
    };
    
    login(demoUser, 'demo-token-123456');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex items-center justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
            <Activity className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">MediCare Pro</h1>
          <p className="text-gray-600">Healthcare Management System</p>
        </div>

        {/* <LoginForm onSubmit={handleLogin} loading={loading} error={error} /> */}

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Hoặc</span>
            </div>
          </div>

          <div className="mt-4">
            {/* <VneIdButton onClick={handleVneIdLogin} loading={loading} /> */}
            <button
              onClick={handleGoDashboard}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 active:scale-95"
            >
              <span>Demo: Vào trang Dashboard</span>
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Demo: Nhập bất kỳ email và password để đăng nhập
        </p>
      </div>
    </div>
  );
};

export default LoginPage;