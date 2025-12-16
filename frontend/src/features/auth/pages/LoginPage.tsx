// Trang UI chứa LoginForm và branding.
import React from 'react';
import { Activity } from 'lucide-react';
import { LoginForm } from '../components/LoginForm';
import { VneIdButton } from '../components/VneIdButton';
import { useAuth } from '../hooks/useAuth'; //
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  // ✅ LẤY TỪ useAuth, KHÔNG PHẢI store
  const { login, loginVneid, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data: any) => {
    const response = await login(data);
    if (response) {
      navigate('/dashboard');
    }
  };

  const handleVneIdLogin = async () => {
    const response = await loginVneid();
    if (response) {
      navigate('/dashboard');
    }
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

        <LoginForm onSubmit={handleLogin} loading={loading} error={error} />

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
            <VneIdButton onClick={handleVneIdLogin} loading={loading} />
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Chưa có tài khoản?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Đăng ký
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
