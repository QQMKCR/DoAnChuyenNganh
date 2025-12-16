import React from 'react';
import { PatientCard } from './PatientCard';
import type { Patient } from '../model/patient.types';

interface PatientListProps {
  patients: Patient[];
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
  error?: string; // ← THÊM
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onView,
  onEdit,
  onDelete,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-gray-600">Đang tải...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Thử lại
        </button>
      </div>
    );
  }

  if (patients.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Chưa có bệnh nhân nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {patients.map((patient) => (
        <PatientCard
          key={patient.id}
          patient={patient}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};