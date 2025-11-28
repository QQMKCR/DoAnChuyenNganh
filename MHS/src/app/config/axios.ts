/*
Cấu hình axios chung cho toàn app. Gồm:
- baseURL (API Gateway hoặc backend)
- interceptors (gắn token, bắt lỗi)
- timeout, headers mặc định.
*/
// app/config/axios.ts
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Base URL từ environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.medicare.vn/v1';

// Tạo axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Tự động gắn token
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Lấy token từ localStorage hoặc store
    const token = localStorage.getItem('auth_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request trong dev mode
    if (import.meta.env.DEV) {
      console.log('🚀 Request:', config.method?.toUpperCase(), config.url);
    }
    
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý lỗi global
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response trong dev mode
    if (import.meta.env.DEV) {
      console.log('✅ Response:', response.status, response.config.url);
    }
    return response;
  },
  (error) => {
    // Xử lý lỗi 401 - Unauthorized
    if (error.response?.status === 401) {
      console.error('🔒 Unauthorized - Redirecting to login');
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    
    // Xử lý lỗi 403 - Forbidden
    if (error.response?.status === 403) {
      console.error('🚫 Forbidden - Access denied');
    }
    
    // Xử lý lỗi 500 - Server Error
    if (error.response?.status === 500) {
      console.error('💥 Server Error');
    }
    
    // Log error trong dev mode
    if (import.meta.env.DEV) {
      console.error('❌ Response Error:', error.response?.status, error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;

// Export các method helpers
export const api = {
  get: <T>(url: string, config?: any) => axiosInstance.get<T>(url, config),
  post: <T>(url: string, data?: any, config?: any) => axiosInstance.post<T>(url, data, config),
  put: <T>(url: string, data?: any, config?: any) => axiosInstance.put<T>(url, data, config),
  delete: <T>(url: string, config?: any) => axiosInstance.delete<T>(url, config),
  patch: <T>(url: string, data?: any, config?: any) => axiosInstance.patch<T>(url, data, config),
};