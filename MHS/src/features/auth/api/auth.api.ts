/*
Chứa các hàm server-side:
loginVneid() → gọi API xác thực VNeID
loginAdmin() → gọi API admin
*/

import type { AuthResponse, LoginInput, VneIdLoginInput } from '../model/auth.types';

export const authApi = {
  /**
   * Đăng nhập thông thường
   */
  loginAdmin: async (data: LoginInput): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            name: 'Admin User',
            email: data.email,
            role: 'admin',
          },
          token: 'mock-jwt-token-admin',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
        });
      }, 1000);
    });
  },

  /**
   * Đăng nhập bằng VNeID
   */
  loginVneid: async (data: VneIdLoginInput): Promise<AuthResponse> => {
    // Simulate API call to VNeID system
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '2',
            name: 'Dr. Ateeq',
            email: 'ateeq@medicare.vn',
            role: 'doctor',
            vneidVerified: true,
          },
          token: 'mock-jwt-token-vneid',
          refreshToken: 'mock-refresh-token',
          expiresIn: 3600,
        });
      }, 1500);
    });
  },

  /**
   * Đăng xuất
   */
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 500);
    });
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            name: 'Admin User',
            email: 'admin@medicare.vn',
            role: 'admin',
          },
          token: 'new-mock-jwt-token',
          refreshToken: 'new-mock-refresh-token',
          expiresIn: 3600,
        });
      }, 500);
    });
  },
};