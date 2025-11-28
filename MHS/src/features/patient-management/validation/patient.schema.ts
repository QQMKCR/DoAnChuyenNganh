/*
Validate:

ID BHYT đúng định dạng
tuổi > 0
tỉnh hợp lệ
*/
import { PatientInput } from '../model/patient.types';

export interface PatientValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validatePatient = (input: PatientInput): PatientValidationResult => {
  const errors: Record<string, string> = {};

  // ID BHYT validation
  if (!input.bhytId) {
    errors.bhytId = 'ID BHYT là bắt buộc';
  } else if (!/^[A-Z]{2}\d{13}$/.test(input.bhytId)) {
    errors.bhytId = 'ID BHYT không đúng định dạng (VD: VN1234567890123)';
  }

  // Name validation
  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Họ tên phải có ít nhất 2 ký tự';
  }

  // Age validation
  if (!input.age || input.age <= 0) {
    errors.age = 'Tuổi phải lớn hơn 0';
  } else if (input.age > 150) {
    errors.age = 'Tuổi không hợp lệ';
  }

  // Province validation
  if (!input.province) {
    errors.province = 'Tỉnh/Thành phố là bắt buộc';
  }

  // Phone validation (optional)
  if (input.phoneNumber && !/^(0|\+84)[0-9]{9,10}$/.test(input.phoneNumber)) {
    errors.phoneNumber = 'Số điện thoại không hợp lệ';
  }

  // Email validation (optional)
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = 'Email không hợp lệ';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};