/*
Khai báo kiểu dữ liệu TypeScript:
User
LoginInput
RegisterInput
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

export interface RegisterInput {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'doctor' | 'admin';
}

export interface VneIdLoginInput {
  citizenId: string;
  otp?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

export interface AuthError {
  code: string;
  message: string;
}