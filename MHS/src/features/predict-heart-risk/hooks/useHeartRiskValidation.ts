/*
Validate dữ liệu:
tuổi > 0
huyết áp < 200
cholesterol > 100
*/

import { useState } from 'react';
import type { HeartRiskInput } from '../model/heartRisk.types';
import { validateHeartRiskInput } from '../validation/heartRisk.validation';

export const useHeartRiskValidation = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (input: HeartRiskInput): boolean => {
    const result = validateHeartRiskInput(input);
    setErrors(result.errors);
    return result.isValid;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validate,
    clearErrors,
    clearError,
  };
};