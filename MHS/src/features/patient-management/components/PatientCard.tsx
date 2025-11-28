import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import type { Patient } from '../model/patient.types';

interface PatientCardProps {
  patient: Patient;
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (id: string) => void;
}

export const PatientCard: React.FC<PatientCardProps> = ({
  patient,
  onView,
  onEdit,
  onDelete,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'follow-up':
        return 'bg-yellow-100 text-yellow-700';
      case 'discharged':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-600">
            {getInitials(patient.name)}
          </span>
        </div>
        <div>
          <p className="font-semibold text-gray-900">{patient.name}</p>
          <p className="text-sm text-gray-600">
            ID: {patient.bhytId} • {patient.age} tuổi • {patient.gender === 'Male' ? 'Nam' : 'Nữ'}
          </p>
          <p className="text-sm text-gray-500">{patient.condition}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
          {patient.status}
        </span>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onView(patient)}
            className="p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
            title="Xem chi tiết"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => onEdit(patient)}
            className="p-2 text-gray-500 hover:bg-blue-50 hover:text-blue-600 rounded transition-colors"
            title="Chỉnh sửa"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              if (window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này?')) {
                onDelete(patient.id);
              }
            }}
            className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded transition-colors"
            title="Xóa"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};