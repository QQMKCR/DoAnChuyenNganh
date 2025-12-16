// Trang UI chứa RegisterForm và branding.
import { Activity, ArrowLeft } from 'lucide-react';
import { RegisterForm } from '../components/RegisterForm';
import { useNavigate } from 'react-router-dom';
import type { RegisterInput } from '../model/auth.types';
import { useAuth } from '../hooks/useAuth';

// 👉 Payload gửi backend (loại bỏ confirmPassword)
type RegisterPayload = Omit<RegisterInput, 'confirmPassword'>;

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();

  const handleRegister = async (data: RegisterInput) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...payload }: {
      confirmPassword: string;
    } & RegisterPayload = data;

    const response = await register(payload);
    if (response) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Quay lại đăng nhập</span>
        </button>

        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center">
            <Activity className="w-10 h-10 text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Tạo tài khoản
          </h1>
          <p className="text-gray-600">
            Đăng ký để sử dụng MediCare Pro
          </p>
        </div>

        <RegisterForm
          onSubmit={handleRegister}
          loading={loading}
          error={error}
        />

        <p className="mt-6 text-center text-sm text-gray-600">
          Đã có tài khoản?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
