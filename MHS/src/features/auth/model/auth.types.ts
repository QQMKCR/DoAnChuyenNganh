/*
Khai báo kiểu dữ liệu TypeScript:
User
LoginInput
AuthResponse
*/
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin';
  avatar?: string;
  vneidVerified?: boolean;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface VneIdLoginInput {
  citizenId: string;
  otp?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthError {
  code: string;
  message: string;
}