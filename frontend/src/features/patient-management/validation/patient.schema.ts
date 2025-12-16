/*
Validate:

ID BHYT đúng định dạng
tuổi > 0
tỉnh hợp lệ
*/
import type { PatientInput } from '../model/patient.types';

export interface PatientValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validatePatient = (input: PatientInput): PatientValidationResult => {
  const errors: Record<string, string> = {};

  // ID BHYT validation
  if (!input.citizen_id) {
    errors.citizen_id = 'ID BHYT là bắt buộc';
  } else if (!/^\d{12}$/.test(input.citizen_id)) {
    errors.citizen_id = 'ID BHYT không đúng định dạng (VD: 123456789012)';
  }

  // Name validation
  if (!input.full_name || input.full_name.trim().length < 2) {
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
  if (input.phone && !/^(0|\+84)[0-9]{9,10}$/.test(input.phone)) {
    errors.phone = 'Số điện thoại không hợp lệ';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};