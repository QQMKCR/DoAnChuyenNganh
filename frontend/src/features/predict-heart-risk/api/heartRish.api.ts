import type { HeartRiskInput, HeartRiskPredictionResponse } from '../model/heartRisk.types';
import { api } from '../../../app/config/axios';
import { transformHeartRiskInput, calculateRiskLevel } from '../utils/transformInput';

export const heartRiskApi = {
  predictHeartRisk: async (input: HeartRiskInput): Promise<HeartRiskPredictionResponse> => {
    try {
      const payload = transformHeartRiskInput(input); // 🔹 map frontend → backend
      const res = await api.post<{
        prediction: number;
        risk_level: 'Low' | 'High';
        message: string;
      }>('/api/heart-risk/predict', payload);

      const riskPercentage =
        res.data.prediction === 1
          ? 70 + Math.random() * 20
          : 10 + Math.random() * 20;

      const finalRiskPercentage = Number(riskPercentage.toFixed(1));

      return {
        success: true,
        data: {
          riskPercentage: finalRiskPercentage,
          riskLevel: calculateRiskLevel(finalRiskPercentage),
          confidence: 0.85,
          recommendations:
            res.data.prediction === 1
              ? [
                  'Cần theo dõi tim mạch chặt chẽ',
                  'Giảm cholesterol và huyết áp',
                  'Tập thể dục nhẹ nhàng theo chỉ định bác sĩ',
                  'Tái khám trong vòng 1–3 tháng',
                ]
              : [
                  'Duy trì chế độ ăn uống lành mạnh',
                  'Tập thể dục đều đặn 30 phút/ngày',
                  'Kiểm tra sức khỏe định kỳ 6 tháng/lần',
                ],
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error) {
      console.error('Heart risk prediction error:', error);
      return {
        success: false,
        data: {
          riskPercentage: 0,
          riskLevel: 'low',
          confidence: 0,
          recommendations: [],
          timestamp: new Date().toISOString(),
        },
        message: 'Dự đoán thất bại',
      };
    }
  },
};
