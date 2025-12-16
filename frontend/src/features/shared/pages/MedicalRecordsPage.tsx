import React, { useState } from 'react';
import { FileText, Download, Upload, Search, Filter, Trash2, Calendar } from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientName: string;
  type: 'diagnosis' | 'prescription' | 'test' | 'treatment' | 'notes';
  title: string;
  date: string;
  doctor: string;
  description: string;
  fileUrl?: string;
}

const MedicalRecordsPage: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: '1',
      patientName: 'Nguyễn Văn A',
      type: 'diagnosis',
      title: 'Chẩn đoán bệnh cao huyết áp',
      date: '2025-12-07',
      doctor: 'Dr. Trần Văn B',
      description: 'Bệnh nhân được chẩn đoán với cao huyết áp giai đoạn 2',
      fileUrl: 'diagnosis_001.pdf',
    },
    {
      id: '2',
      patientName: 'Nguyễn Văn A',
      type: 'prescription',
      title: 'Đơn thuốc huyết áp',
      date: '2025-12-07',
      doctor: 'Dr. Trần Văn B',
      description: 'Kháng sinh và thuốc hạ huyết áp',
      fileUrl: 'prescription_001.pdf',
    },
    {
      id: '3',
      patientName: 'Trần Thị C',
      type: 'test',
      title: 'Kết quả xét nghiệm máu',
      date: '2025-12-06',
      doctor: 'Dr. Lê Văn D',
      description: 'Xét nghiệm cholesterol và đường huyết',
      fileUrl: 'test_001.pdf',
    },
    {
      id: '4',
      patientName: 'Trần Thị C',
      type: 'treatment',
      title: 'Biên bản điều trị',
      date: '2025-12-05',
      doctor: 'Dr. Phạm Thị E',
      description: 'Điều trị bệnh tim mạch bằng thuốc',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | MedicalRecord['type']>('all');

  const typeLabels: Record<MedicalRecord['type'], string> = {
    diagnosis: 'Chẩn đoán',
    prescription: 'Đơn thuốc',
    test: 'Xét nghiệm',
    treatment: 'Điều trị',
    notes: 'Ghi chú',
  };

  const typeColors: Record<MedicalRecord['type'], string> = {
    diagnosis: 'bg-blue-100 text-blue-800',
    prescription: 'bg-green-100 text-green-800',
    test: 'bg-purple-100 text-purple-800',
    treatment: 'bg-red-100 text-red-800',
    notes: 'bg-yellow-100 text-yellow-800',
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || record.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDeleteRecord = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa bản ghi này?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const handleDownload = (filename?: string) => {
    if (filename) {
      alert(`Đang tải xuống: ${filename}`);
    }
  };

  const stats = [
    {
      label: 'Tổng bản ghi',
      value: records.length,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Chẩn đoán',
      value: records.filter(r => r.type === 'diagnosis').length,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Xét nghiệm',
      value: records.filter(r => r.type === 'test').length,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      label: 'Đơn thuốc',
      value: records.filter(r => r.type === 'prescription').length,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-red-50 text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hồ sơ y tế</h1>
            <p className="text-gray-600 mt-2">Quản lý và xem hồ sơ y tế của bệnh nhân</p>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Upload className="w-5 h-5" />
            <span>Upload hồ sơ</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo tên bệnh nhân hoặc tiêu đề..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                  filterType === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span>Tất cả ({records.length})</span>
              </button>
              {(Object.keys(typeLabels) as MedicalRecord['type'][]).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    filterType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  {typeLabels[type]} ({records.filter(r => r.type === type).length})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Không tìm thấy hồ sơ y tế nào</p>
            </div>
          ) : (
            filteredRecords.map(record => (
              <div key={record.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <h3 className="text-lg font-bold text-gray-900">{record.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[record.type]}`}>
                          {typeLabels[record.type]}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Bệnh nhân:</span> {record.patientName}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        <span className="font-medium">Bác sĩ:</span> {record.doctor}
                      </p>
                      {record.description && (
                        <p className="text-gray-700 text-sm">{record.description}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-gray-500 text-sm mb-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(record.date).toLocaleDateString('vi-VN')}</span>
                        </div>
                        {record.fileUrl && (
                          <button
                            onClick={() => handleDownload(record.fileUrl)}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 transition-colors flex items-center space-x-1 whitespace-nowrap"
                          >
                            <Download className="w-4 h-4" />
                            <span>Tải xuống</span>
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDeleteRecord(record.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalRecordsPage;
