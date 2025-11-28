//Trang thêm bệnh nhân (quy trình BPMN: Admin → nhập → kiểm tra ID BHYT → lưu).
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { PatientForm } from '../components/PatientForm';
import { usePatient } from '../hooks/usePatient';
import { validatePatient } from '../validation/patient.schema';
import type { PatientInput } from '../model/patient.types';

const AddPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { addPatient, loading } = usePatient();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleSubmit = async (data: PatientInput) => {
    const validation = validatePatient(data);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const response = await addPatient(data);
    
    if (response.success) {
      alert(response.message || 'Thêm bệnh nhân thành công!');
      navigate('/patients');
    } else {
      alert(response.message || 'Có lỗi xảy ra khi thêm bệnh nhân');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/patients')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Thêm bệnh nhân mới</h1>
              <p className="text-gray-600">Nhập thông tin bệnh nhân</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <PatientForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/patients')}
            loading={loading}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPatientPage;