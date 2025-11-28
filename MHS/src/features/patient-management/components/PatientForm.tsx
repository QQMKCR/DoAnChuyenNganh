/*
Form để thêm/ sửa bệnh nhân:
ID BHYT
họ tên
tuổi
tỉnh
chỉ số tim mạch
*/

import React, { useState } from 'react';
import type { PatientInput } from '../model/patient.types';
import { data } from 'react-router-dom';

interface PatientFormProps {
  initialData?: Partial<PatientInput>;
  onSubmit: (data: PatientInput) => void;
  onCancel: () => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  loading,
  errors = {},
}) => {
  const [formData, setFormData] = useState<PatientInput>({
    bhytId: initialData?.bhytId || '',
    name: initialData?.name || '',
    age: initialData?.age || 0,
    gender: initialData?.gender || 'Male',
    province: initialData?.province || '',
    phoneNumber: initialData?.phoneNumber || '',
    email: initialData?.email || '',
    address: initialData?.address || '',
    condition: initialData?.condition || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ID BHYT <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.bhytId}
            onChange={(e) => setFormData({ ...formData, bhytId: e.target.value.toUpperCase() })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.bhytId ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="VN1234567890123"
            required
          />
          {errors.bhytId && <p className="mt-1 text-sm text-red-600">{errors.bhytId}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Nguyễn Văn A"
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tuổi <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.age || ''}
            onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.age ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="30"
            required
            min="0"
          />
          {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tỉnh/Thành phố <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.province}
            onChange={(e) => setFormData({ ...formData, province: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.province ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Chọn tỉnh/thành phố</option>
            <option value="Hà Nội">Hà Nội</option>
            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
            <option value="Đà Nẵng">Đà Nẵng</option>
            <option value="Cần Thơ">Cần Thơ</option>
            <option value="Hải Phòng">Hải Phòng</option>
          </select>
          {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0123456789"
          />
          {errors.phoneNumber && <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>}
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tình trạng sức khỏe <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formData.condition}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mô tả tình trạng sức khỏe"
            rows={3}
            required
          />
        </div>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Đang lưu...' : 'Lưu bệnh nhân'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};