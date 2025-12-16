/*
UI form nhập dữ liệu:
tuổi
huyết áp
cholesterol
loại đau ngực
giới tính
Trigger hook useHeartRiskPrediction
*/


import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import type { HeartRiskInput } from '../model/heartRisk.types';
import { CHEST_PAIN_TYPES } from '../model/heartRisk.constants';

interface HeartRiskFormProps {
  onSubmit: (data: HeartRiskInput) => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

export const HeartRiskForm: React.FC<HeartRiskFormProps> = ({ 
  onSubmit, 
  loading, 
  errors = {} 
}) => {
  const [formData, setFormData] = useState<HeartRiskInput>({
    age: 0,
    gender: 'Male',
    bloodPressure: 0,
    cholesterol: 0,
    chestPainType: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
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
            min="1"
            max="120"
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
        </div>

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
            max="200"
          />
          {errors.bloodPressure && (
            <p className="mt-1 text-sm text-red-600">{errors.bloodPressure}</p>
          )}
        </div>

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
            min="100"
          />
          {errors.cholesterol && (
            <p className="mt-1 text-sm text-red-600">{errors.cholesterol}</p>
          )}
        </div>

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
      </div>

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
