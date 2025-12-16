/*
Validate input:
email hợp lệ
mật khẩu >= 6 ký tự
mã OTP
*/
import type { LoginInput, VneIdLoginInput } from "../model/auth.types";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateLogin = (data: LoginInput): ValidationResult => {
  const errors: Record<string, string> = {};

  // validate email
  if (!data?.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Email không hợp lệ";
  }

  // validate password length
  if (!data?.password || data.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  // validate OTP if provided
  if ("otp" in (data as any)) {
    const otp = (data as any).otp;
    if (!otp || !/^\d{4,6}$/.test(String(otp))) {
      errors.otp = "Mã OTP không hợp lệ";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateVneIdLogin = (data: VneIdLoginInput): ValidationResult => {
  const errors: Record<string, string> = {};

  // validate citizenId (assuming it's a string of digits)
  if (!data?.citizenId || !/^\d{9,12}$/.test(data.citizenId)) {
    errors.citizenId = "Citizen ID không hợp lệ";
  }

  // validate OTP if provided
  if (data?.otp && !/^\d{4,6}$/.test(data.otp)) {
    errors.otp = "Mã OTP không hợp lệ";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};