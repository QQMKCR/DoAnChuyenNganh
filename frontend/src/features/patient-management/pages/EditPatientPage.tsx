import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2 } from 'lucide-react';
import { PatientForm } from '../components/PatientForm';
import { usePatient } from '../hooks/usePatient';
import { validatePatient } from '../validation/patient.schema';
import type { PatientInput } from '../model/patient.types';

const EditPatientPage: React.FC = () => {
  const navigate = useNavigate();
  const { patientId } = useParams<{ patientId: string }>();
  const { patients, updatePatient, loading } = usePatient();
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const defaultValues: PatientInput | null = useMemo(() => {
    if (!patientId) return null;
    const patient = patients.find((p) => String(p.id) === patientId);
    if (!patient) return null;
    return {
      citizen_id: patient.citizen_id,
      full_name: patient.full_name,
      gender: patient.gender,
      date_of_birth: patient.age? `${new Date().getFullYear() - patient.age}-01-01`: null,
      age: patient.age,
      phone: patient.phone || '',
      address: patient.address || '',
      province: patient.province || '',
      condition: patient.condition || '',
    };
  }, [patients, patientId]);

  const handleSubmit = async (data: PatientInput) => {
    const validation = validatePatient(data);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    if (!patientId) return;

    const response = await updatePatient(patientId, data);

    if (response.success) {
      alert(response.message || 'Cập nhật bệnh nhân thành công!');
      navigate('/patients');
    } else {
      alert(response.message || 'Có lỗi xảy ra khi cập nhật bệnh nhân');
    }
  };

  if (!defaultValues) return <p>Đang tải dữ liệu bệnh nhân...</p>;

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
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Edit2 className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Cập nhật thông tin bệnh nhân</h1>
              <p className="text-gray-600">Chỉnh sửa thông tin bệnh nhân hiện tại</p>
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
            defaultValues={defaultValues} // prefill form
          />
        </div>
      </div>
    </div>
  );
};

export default EditPatientPage;
