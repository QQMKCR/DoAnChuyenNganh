// src/heart-risk/components/HeartRiskForm.tsx
import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import type { HeartRiskInput } from '../model/heartRisk.types';
import { CHEST_PAIN_TYPES } from '../model/heartRisk.constants';
import type { Patient } from '../../patient-management/model/patient.types';

interface HeartRiskFormProps {
  onSubmit: (data: HeartRiskInput & { patientId: string }) => void;
  loading?: boolean;
  errors?: Record<string, string>;
  patients?: Patient[];
}

export const HeartRiskForm: React.FC<HeartRiskFormProps> = ({
  onSubmit,
  loading,
  errors = {},
  patients = [],
}) => {
  const [formData, setFormData] = useState<Omit<HeartRiskInput, 'patientId'>>({
    age: 0,
    gender: 'Male',
    bloodPressure: 0,
    cholesterol: 0,
    chestPainType: 0,
  });

  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    patients.length > 0 ? String(patients[0].id) : ''
  );

  const [searchText, setSearchText] = useState('');

  // Lọc bệnh nhân theo searchText
  const filteredPatients = useMemo(() => {
    if (!searchText.trim()) return patients;
    const lower = searchText.toLowerCase();
    return patients.filter(
      (p) =>
        (p.full_name?.toLowerCase().includes(lower) ?? false) ||
        (p.citizen_id?.toLowerCase().includes(lower) ?? false) ||
        (p.phone?.toLowerCase().includes(lower) ?? false)
    );
  }, [searchText, patients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatientId) return;
    onSubmit({ ...formData, patientId: selectedPatientId });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Chọn bệnh nhân */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tìm/Chọn bệnh nhân <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Tìm bệnh nhân..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
        />
        <select
          value={selectedPatientId}
          onChange={(e) => setSelectedPatientId(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {filteredPatients.map((p) => (
            <option key={p.id} value={String(p.id)}>
              {p.full_name} ({p.citizen_id})
            </option>
          ))}
        </select>
      </div>

      {/* Tuổi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tuổi <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.age || ''}
          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Nhập tuổi"
          required
          min={1}
          max={120}
        />
        {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
      </div>

      {/* Giới tính */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Giới tính <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.gender}
          onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'Male' | 'Female' })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
        </select>
      </div>

      {/* Huyết áp */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Huyết áp (mmHg) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.bloodPressure || ''}
          onChange={(e) => setFormData({ ...formData, bloodPressure: Number(e.target.value) })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.bloodPressure ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="120"
          required
          max={200}
        />
        {errors.bloodPressure && <p className="mt-1 text-sm text-red-600">{errors.bloodPressure}</p>}
      </div>

      {/* Cholesterol */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cholesterol (mg/dL) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.cholesterol || ''}
          onChange={(e) => setFormData({ ...formData, cholesterol: Number(e.target.value) })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.cholesterol ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="200"
          required
          min={100}
        />
        {errors.cholesterol && <p className="mt-1 text-sm text-red-600">{errors.cholesterol}</p>}
      </div>

      {/* Loại đau ngực */}
      <div className="col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loại đau ngực <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.chestPainType}
          onChange={(e) => setFormData({ ...formData, chestPainType: Number(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CHEST_PAIN_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Button submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Đang phân tích...</span>
          </>
        ) : (
          <>
            <Activity className="w-5 h-5" />
            <span>Dự đoán nguy cơ</span>
          </>
        )}
      </button>
    </form>
  );
};
