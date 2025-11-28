/*
Trang đầy đủ:
Form
Kết quả
Button “Lưu vào NHIC”
*/

import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { HeartRiskForm } from '../components/HeartRiskForm';
import { RiskResultCard } from '../components/RiskResultCard';
import { useHeartRiskPrediction } from '../hooks/useHeartRiskPrediction';
import { useHeartRiskValidation } from '../hooks/useHeartRiskValidation';
import { nhicApi } from '../api/nhic.api';

const HeartRiskPage: React.FC = () => {
  const { predict, loading, result, reset } = useHeartRiskPrediction();
  const { validate, errors } = useHeartRiskValidation();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (data: any) => {
    if (validate(data)) {
      await predict(data);
    }
  };

  const handleSaveToNHIC = async () => {
    if (!result) return;

    setSaving(true);
    try {
      await nhicApi.savePredictionToNHIC({
        patientId: 'PT001',
        prediction: {
          riskPercentage: result.riskPercentage,
          riskLevel: result.riskLevel,
          timestamp: result.timestamp,
        },
        doctorId: 'DR001',
      });
      alert('Đã lưu kết quả vào NHIC DB thành công!');
    } catch (error) {
      alert('Lỗi khi lưu vào NHIC DB');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dự đoán nguy cơ bệnh tim</h1>
              <p className="text-gray-600">Nhập các chỉ số sức khỏe để dự đoán</p>
            </div>
          </div>

          <HeartRiskForm onSubmit={handleSubmit} loading={loading} errors={errors} />

          {result && (
            <div className="mt-8">
              <RiskResultCard 
                result={result} 
                onSaveToNHIC={handleSaveToNHIC}
                saving={saving}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default HeartRiskPage;