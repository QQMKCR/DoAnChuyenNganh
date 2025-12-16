import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PatientList } from '../components/PatientList';
import { usePatient } from '../hooks/usePatient';
import { ExportButton } from '../../shared/components/ExportButton';
import { exportPatients } from '../../shared/utils/export';
import type { Patient } from '../model/patient.types';

const PatientListPage: React.FC = () => {
  const navigate = useNavigate();
  const { patients, loading, deletePatient } = usePatient();
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase();
  const filteredPatients = patients.filter((patient) =>
    (patient.full_name || '').toLowerCase().includes(q) ||
    (patient.citizen_id || '').toLowerCase().includes(q)
  );

  const handleView = (patient: Patient) => {
    navigate(`/patients/${patient.id}`);
  };

  const handleEdit = (patient: Patient) => {
    navigate(`/patients/${patient.id}/edit`);
  };

  const handleDelete = async (id: string) => {
    await deletePatient(id);
  };

  const handleExport = (format: 'csv' | 'json') => {
    exportPatients(patients, format);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý bệnh nhân</h1>
            <p className="text-gray-600 mt-1">
              Tổng số: {patients.length} bệnh nhân
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <ExportButton
              data={patients}
              filename="benh_nhan"
              onExport={handleExport}
              label="Xuất dữ liệu"
            />
            <button
              onClick={() => navigate('/patients/add')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Thêm bệnh nhân</span>
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc ID BHYT..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <PatientList
            patients={filteredPatients}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
export default PatientListPage;