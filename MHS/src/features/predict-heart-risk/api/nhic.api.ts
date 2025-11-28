/*
Gửi kết quả dự đoán lên NHIC DB (liên thông quốc gia).
Dùng API chuẩn FHIR hoặc RESTful.
*/

export interface NHICSaveRequest {
  patientId: string;
  prediction: {
    riskPercentage: number;
    riskLevel: string;
    timestamp: string;
  };
  doctorId: string;
}

export const nhicApi = {
  /**
   * Lưu kết quả dự đoán vào NHIC DB (liên thông quốc gia)
   */
  savePredictionToNHIC: async (data: NHICSaveRequest): Promise<{ success: boolean }> => {
    // Simulate NHIC API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1000);
    });
  },
};