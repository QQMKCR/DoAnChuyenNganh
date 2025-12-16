import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { HeartRiskForm } from '../components/HeartRiskForm';
import { RiskResultCard } from '../components/RiskResultCard';
import { useHeartRiskPrediction } from '../hooks/useHeartRiskPrediction';
import { useHeartRiskValidation } from '../hooks/useHeartRiskValidation';
import { nhicApi } from '../api/nhic.api';
import { usePatient } from '../../patient-management/hooks/usePatient';
import type { HeartRiskInput } from '../model/heartRisk.types';

const HeartRiskPage: React.FC = () => {
  const { predict, loading, result, error, reset } = useHeartRiskPrediction();
  const { validate, errors } = useHeartRiskValidation();
  const [saving, setSaving] = useState(false);

  // Lấy danh sách bệnh nhân
  const { patients, loading: patientsLoading, error: patientsError } = usePatient();
  const [lastSubmittedPatientId, setLastSubmittedPatientId] = useState<string | null>(null);

  const handleSubmit = async (data: HeartRiskInput & { patientId: string }) => {
    // Validate form
    if (!validate(data)) return;

    // Lưu lại patientId đã submit để dùng khi lưu NHIC
    setLastSubmittedPatientId(data.patientId);

    // Gọi API dự đoán
    const res = await predict(data);
    if (!res) {
      alert('Dự đoán thất bại. Vui lòng kiểm tra lại dữ liệu.');
    }
  };

  const handleSaveToNHIC = async () => {
    if (!result || !lastSubmittedPatientId) return;

    setSaving(true);
    try {
      await nhicApi.savePredictionToNHIC({
        patientId: lastSubmittedPatientId,
        doctorId: 'DR001', // TODO: Lấy doctorId thật từ context
        prediction: {
          riskPercentage: result.riskPercentage,
          riskLevel: result.riskLevel,
          timestamp: result.timestamp,
        },
      });
      alert('Đã lưu kết quả vào NHIC DB thành công!');
    } catch {
      alert('Lỗi khi lưu vào NHIC DB');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    reset();
    setLastSubmittedPatientId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Dự đoán nguy cơ bệnh tim
              </h1>
              <p className="text-gray-600">
                Nhập các chỉ số sức khỏe để dự đoán
              </p>
            </div>
          </div>

          {/* Kiểm tra loading/error khi fetch bệnh nhân */}
          {patientsLoading && <p>Đang tải danh sách bệnh nhân...</p>}
          {patientsError && <p className="text-red-500">{patientsError}</p>}

          {/* Form nhập dữ liệu */}
          {!patientsLoading && !patientsError && (
            <HeartRiskForm
              onSubmit={handleSubmit}
              loading={loading}
              errors={errors}
              patients={patients}
            />
          )}

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <div className="mt-4 text-red-600 font-medium">{error}</div>
          )}

          {/* Kết quả dự đoán */}
          {result && (
            <div className="mt-8 space-y-4">
              <RiskResultCard
                result={result}
                onSaveToNHIC={handleSaveToNHIC}
                saving={saving}
              />
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Nhập lại dữ liệu
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeartRiskPage;
