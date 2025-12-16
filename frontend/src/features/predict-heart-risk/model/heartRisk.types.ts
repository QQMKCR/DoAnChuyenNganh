/*
Types: HeartRiskInput, HeartRiskResult, RiskLevel, MLHeartRiskInput
*/

export interface HeartRiskInput {
  age: number;
  gender: 'Male' | 'Female';        // frontend input
  bloodPressure: number;            // trestbps
  cholesterol: number;              // chol
  chestPainType: number;            // cp
  restingECG?: number;              // restecg
  maxHeartRate?: number;            // thalach
  exerciseAngina?: boolean;         // exang
  slope?: number;
  ca?: number;
  thal?: number;
}

export type MLHeartRiskInput = {
  age: number;
  sex: 0 | 1;          // backend expects 0 = Female, 1 = Male
  trestbps: number;
  chol: number;
  cp: number;
  restecg: number;
  thalach: number;
  exang: 0 | 1;
  slope: number;
  ca: number;
  thal: number;
};

export interface HeartRiskResult {
  riskPercentage: number;   // ví dụ 42.5 (%)
  riskLevel: RiskLevel;     // 'low' | 'medium' | 'high'
  confidence: number;       // 0.0 -> 1.0
  recommendations: string[];
  timestamp: string;        // ISO string
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface HeartRiskPredictionResponse {
  success: boolean;
  data: HeartRiskResult;
  message?: string;
}
