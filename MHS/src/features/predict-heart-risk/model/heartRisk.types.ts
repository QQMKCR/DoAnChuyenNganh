/*
Types:
HeartRiskInput
HeartRiskResult
RiskLevel
*/
export interface HeartRiskInput {
  age: number;
  gender: 'Male' | 'Female';
  bloodPressure: number;
  cholesterol: number;
  chestPainType: number;
  restingECG?: number;
  maxHeartRate?: number;
  exerciseAngina?: boolean;
}

export interface HeartRiskResult {
  riskPercentage: number;
  riskLevel: RiskLevel;
  confidence: number;
  recommendations: string[];
  timestamp: string;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface HeartRiskPredictionResponse {
  success: boolean;
  data: HeartRiskResult;
  message?: string;
}