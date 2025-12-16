import type { HeartRiskInput, MLHeartRiskInput } from '../model/heartRisk.types';

/**
 * Chuyển từ frontend HeartRiskInput → payload backend MLHeartRiskInput
 */
export const transformHeartRiskInput = (input: HeartRiskInput): MLHeartRiskInput => {
  return {
    age: input.age,
    sex: input.gender === 'Male' ? 1 : 0,
    trestbps: input.bloodPressure ?? 120,
    chol: input.cholesterol ?? 200,
    cp: input.chestPainType ?? 0,
    restecg: input.restingECG ?? 0,
    thalach: input.maxHeartRate ?? 75,
    exang: input.exerciseAngina ? 1 : 0,
  };
};

/**
 * Chuyển riskPercentage → riskLevel frontend
 */
export const calculateRiskLevel = (riskPercentage: number): 'low' | 'medium' | 'high' => {
  if (riskPercentage >= 70) return 'high';
  if (riskPercentage >= 30) return 'medium';
  return 'low';
};
