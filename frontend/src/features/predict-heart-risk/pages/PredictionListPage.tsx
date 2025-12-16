import React, { useState } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { ExportButton } from '../../shared/components/ExportButton';
import { exportPredictions } from '../../shared/utils/export';

interface Prediction {
  predictionId: string;
  patientId: string;
  patientName: string;
  age: number;
  trestbps: number;
  chol: number;
  thalach: number;
  prediction: number;
  predictionDate: string;
}

const PredictionListPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | 'high' | 'low'>('all');

  // Mock data - replace with API call
  const predictions: Prediction[] = [
    {
      predictionId: '1',
      patientId: '1',
      patientName: 'Nguyễn Văn A',
      age: 55,
      trestbps: 145,
      chol: 250,
      thalach: 85,
      prediction: 1,
      predictionDate: new Date().toISOString(),
    },
    {
      predictionId: '2',
      patientId: '2',
      patientName: 'Trần Thị B',
      age: 42,
      trestbps: 120,
      chol: 200,
      thalach: 75,
      prediction: 0,
      predictionDate: new Date().toISOString(),
    },
  ];

  const filteredPredictions = predictions.filter(pred => {
    const matchesSearch = pred.patientName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk =
      filterRisk === 'all' ||
      (filterRisk === 'high' && pred.prediction === 1) ||
      (filterRisk === 'low' && pred.prediction === 0);
    return matchesSearch && matchesRisk;
  });

  const highRiskCount = predictions.filter(p => p.prediction === 1).length;
  const lowRiskCount = predictions.filter(p => p.prediction === 0).length;

  const handleExport = (format: 'csv' | 'json') => {
    exportPredictions(filteredPredictions, format);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kết quả dự đoán</h1>
            <p className="text-gray-600 mt-1">Tổng số: {predictions.length} dự đoán</p>
          </div>
          <ExportButton
            data={filteredPredictions}
            filename="du_doan"
            onExport={handleExport}
            label="Xuất dữ liệu"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Tổng dự đoán</p>
                <p className="text-2xl font-bold text-gray-900">{predictions.length}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Nguy hiểm cao</p>
                <p className="text-2xl font-bold text-red-600">{highRiskCount}</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg" />
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Nguy hiểm thấp</p>
                <p className="text-2xl font-bold text-green-600">{lowRiskCount}</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tìm kiếm
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm theo tên bệnh nhân..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lọc theo mức độ
              </label>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value as 'all' | 'high' | 'low')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả</option>
                <option value="high">Nguy hiểm cao</option>
                <option value="low">Nguy hiểm thấp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Bệnh nhân
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Tuổi
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Huyết áp
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Cholesterol
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Nhịp tim
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Kết quả
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Ngày dự đoán
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPredictions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  filteredPredictions.map(pred => (
                    <tr key={pred.predictionId} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{pred.patientName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pred.age}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pred.trestbps}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pred.chol}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{pred.thalach}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            pred.prediction === 1
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                          }`}
                        >
                          {pred.prediction === 1 ? 'Nguy hiểm cao' : 'Nguy hiểm thấp'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(pred.predictionDate).toLocaleDateString('vi-VN')}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionListPage;
