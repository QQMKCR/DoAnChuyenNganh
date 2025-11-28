/*
Gửi dữ liệu chỉ số bệnh nhân tới mô hình ML.
Nhận lại % nguy cơ tim mạch (VD: 0.42 = 42%).
Chạy dưới dạng server action.
*/

import type { HeartRiskInput, HeartRiskPredictionResponse } from '../model/heartRisk.types';
import { transformHeartRiskInput, calculateRiskLevel } from '../utils/transformInput';

export const heartRiskApi = {
  /**
   * Gửi dữ liệu đến ML model để dự đoán
   */
  predictHeartRisk: async (input: HeartRiskInput): Promise<HeartRiskPredictionResponse> => {
    const transformedData = transformHeartRiskInput(input);

    // Simulate ML API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const riskPercentage = Math.random() * 30 + 10; // 10-40%
        const riskLevel = calculateRiskLevel(riskPercentage);

        resolve({
          success: true,
          data: {
            riskPercentage: Number(riskPercentage.toFixed(1)),
            riskLevel,
            confidence: 0.85,
            recommendations: [
              'Duy trì chế độ ăn uống lành mạnh',
              'Tập thể dục đều đặn 30 phút/ngày',
              'Kiểm tra sức khỏe định kỳ 6 tháng/lần',
            ],
            timestamp: new Date().toISOString(),
          },
        });
      }, 1500);
    });
  },
};