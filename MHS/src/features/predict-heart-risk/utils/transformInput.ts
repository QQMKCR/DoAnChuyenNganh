/*
Chuẩn hóa dữ liệu gửi ML:
convert boolean → 0/1
round số thập phân
loại bỏ ký tự thừa
*/

import type { HeartRiskInput } from '../model/heartRisk.types.ts';

export const transformHeartRiskInput = (input: HeartRiskInput): Record<string, any> => {
  return {
    age: Number(input.age),
    sex: input.gender === 'Male' ? 1 : 0,
    trestbps: Number(input.bloodPressure),
    chol: Number(input.cholesterol),
    cp: Number(input.chestPainType),
    restecg: input.restingECG || 0,
    thalach: input.maxHeartRate || 150,
    exang: input.exerciseAngina ? 1 : 0,
  };
};

export const calculateRiskLevel = (riskPercentage: number): 'low' | 'medium' | 'high' => {
  if (riskPercentage < 10) return 'low';
  if (riskPercentage < 20) return 'medium';
  return 'high';
};
