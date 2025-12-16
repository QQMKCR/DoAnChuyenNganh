// filepath: src/features/auth/api/auth.api.ts
import type {
  AuthResponse,
  LoginInput,
  VneIdLoginInput,
  RegisterInput,
} from '../model/auth.types';
import { api } from '../../../app/config/axios';

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', data);

    const { token, user } = response.data as {
      token: string;
      user: any;
    };

    return {
      user: {
        id: user.user_id.toString(),
        name: user.full_name,
        email: user.email,
        role: user.role,
      },
      token,
      refreshToken: '',
      expiresIn: 3600,
    };
  },

  register: async (
    data: Omit<RegisterInput, 'confirmPassword'>
  ): Promise<{ message: string }> => {
    const response = await api.post('/api/auth/register', data);
    return response.data as { message: string };
  },

  loginVneid: async (_data?: VneIdLoginInput): Promise<AuthResponse> => {
    throw new Error(
      'VNeID login chưa được hỗ trợ bởi backend.'
    );
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } catch {
      console.warn(
        'Backend chưa hỗ trợ logout endpoint, xử lý cục bộ.'
      );
    }
  },

  refreshToken: async (_refreshToken: string): Promise<AuthResponse> => {
    throw new Error(
      'Refresh token chưa được hỗ trợ bởi backend.'
    );
  },
};
