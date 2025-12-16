import { useState } from 'react';
import { authApi } from '../api/auth.api';
import type { LoginInput, VneIdLoginInput, RegisterInput } from '../model/auth.types';
import { validateLogin, validateVneIdLogin } from '../validation/login.schema';
import { useAuthStore } from '../../../app/store';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 👉 LẤY ACTION TỪ STORE
  const setAuth = useAuthStore((state) => state.login);   
  const login = async (data: LoginInput) => {
    const validation = validateLogin(data);
    if (!validation.isValid) {
      setError(Object.values(validation.errors)[0]);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login(data);

      // ✅ LƯU AUTH VÀO STORE (QUAN TRỌNG NHẤT)
      setAuth(response.user, response.token);

      return response;
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại. Vui lòng thử lại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.register(data);
      return response;
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const loginVneid = async (data?: VneIdLoginInput) => {
    if (data) {
      const validation = validateVneIdLogin(data);
      if (!validation.isValid) {
        setError(Object.values(validation.errors)[0]);
        return null;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const response = await authApi.loginVneid(data);

      // ✅ SET AUTH
      setAuth(response.user, response.token);

      return response;
    } catch (err: any) {
      setError(err.message || 'Xác thực VNeID thất bại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      useAuthStore.getState().logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loginVneid,
    register,
    logout,
    loading,
    error,
    clearError: () => setError(null),
  };
};
