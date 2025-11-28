/*
Hook quản lý logic đăng nhập.
Trả về: login(), logout(), user.
*/  
import { useState } from 'react';
import { authApi } from '../api/auth.api';
import type { LoginInput, VneIdLoginInput } from '../model/auth.types';
// import { validateLogin, validateVneIdLogin } from '../validation/login.schema';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const login = async (data: LoginInput) => {
  //   const validation = validateLogin(data);
  //   if (!validation.isValid) {
  //     setError(Object.values(validation.errors)[0]);
  //     return null;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await authApi.loginAdmin(data);
  //     return response;
  //   } catch (err) {
  //     setError('Đăng nhập thất bại. Vui lòng thử lại.');
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const loginVneid = async (data: VneIdLoginInput) => {
  //   const validation = validateVneIdLogin(data);
  //   if (!validation.isValid) {
  //     setError(Object.values(validation.errors)[0]);
  //     return null;
  //   }

  //   setLoading(true);
  //   setError(null);

  //   try {
  //     const response = await authApi.loginVneid(data);
  //     return response;
  //   } catch (err) {
  //     setError('Xác thực VNeID thất bại. Vui lòng thử lại.');
  //     return null;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
    } finally {
      setLoading(false);
    }
  };

  return {
    // login,
    // loginVneid,
    logout,
    loading,
    error,
    clearError: () => setError(null),
  };
};