import type { HeartRiskInput } from '../model/heartRisk.types';

export interface HeartRiskValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateHeartRiskInput = (input: HeartRiskInput): HeartRiskValidationResult => {
  const errors: Record<string, string> = {};

  if (!input.age || input.age <= 0) {
    errors.age = 'Tuổi phải lớn hơn 0';
  } else if (input.age > 120) {
    errors.age = 'Tuổi không hợp lệ';
  }

  if (!input.bloodPressure || input.bloodPressure <= 0) {
    errors.bloodPressure = 'Huyết áp phải lớn hơn 0';
  } else if (input.bloodPressure >= 200) {
    errors.bloodPressure = 'Huyết áp không được vượt quá 200 mmHg';
  }

  if (!input.cholesterol || input.cholesterol < 100) {
    errors.cholesterol = 'Cholesterol phải lớn hơn 100 mg/dL';
  } else if (input.cholesterol > 600) {
    errors.cholesterol = 'Cholesterol không hợp lệ';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};