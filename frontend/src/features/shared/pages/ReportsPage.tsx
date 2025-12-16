import React, { useState } from 'react';
import { Download, FileText, Calendar } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState({
    startDate: '2025-12-01',
    endDate: '2025-12-07',
  });

  // Mock data
  const reportData = [
    {
      title: 'Báo cáo bệnh nhân',
      description: 'Danh sách tất cả bệnh nhân và thông tin chi tiết',
      icon: <FileText className="w-6 h-6" />,
      dataCount: 45,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Báo cáo dự đoán',
      description: 'Kết quả dự đoán bệnh tim cho tất cả bệnh nhân',
      icon: <FileText className="w-6 h-6" />,
      dataCount: 120,
      color: 'bg-purple-50 text-purple-600',
    },
    {
      title: 'Báo cáo thống kê',
      description: 'Phân tích và thống kê chi tiết',
      icon: <FileText className="w-6 h-6" />,
      dataCount: 1,
      color: 'bg-green-50 text-green-600',
    },
  ];

  const mockPatients = [
    { id: '1', name: 'Nguyễn Văn A', email: 'a@email.com', phone: '0901234567' },
    { id: '2', name: 'Trần Thị B', email: 'b@email.com', phone: '0912345678' },
  ];

  const mockPredictions = [
    { id: '1', patient: 'Nguyễn Văn A', result: 'High Risk', date: '2025-12-07' },
    { id: '2', patient: 'Trần Thị B', result: 'Low Risk', date: '2025-12-06' },
  ];

  const handleExport = (format: 'csv' | 'json', type: 'patients' | 'predictions') => {
    const data = type === 'patients' ? mockPatients : mockPredictions;
    if (format === 'csv') {
      exportToCSV(data, `${type}_${new Date().toISOString().split('T')[0]}.csv`);
    } else {
      exportToJSON(data, `${type}_${new Date().toISOString().split('T')[0]}.json`);
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0]);
    let csvContent = headers.join(',') + '\n';

    data.forEach(row => {
      const values = headers.map(header => row[header]);
      csvContent += values.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    downloadFile(blob, filename);
  };

  const exportToJSON = (data: any[], filename: string) => {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    downloadFile(blob, filename);
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Báo cáo</h1>
          <p className="text-gray-600 mt-2">Xuất và quản lý các báo cáo hệ thống</p>
        </div>

        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Lọc theo thời gian</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Từ ngày
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={dateRange.startDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, startDate: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Đến ngày
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={dateRange.endDate}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, endDate: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Patients Report */}
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`p-6 ${reportData[0].color}`}>
              {reportData[0].icon}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reportData[0].title}</h3>
              <p className="text-gray-600 text-sm mb-4">{reportData[0].description}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData[0].dataCount}
                </span>
                <span className="text-gray-600 text-sm ml-2">bệnh nhân</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('csv', 'patients')}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 flex items-center justify-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => handleExport('json', 'patients')}
                  className="flex-1 px-3 py-2 bg-blue-100 text-blue-600 rounded text-sm hover:bg-blue-200 flex items-center justify-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          </div>

          {/* Predictions Report */}
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`p-6 ${reportData[1].color}`}>
              {reportData[1].icon}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reportData[1].title}</h3>
              <p className="text-gray-600 text-sm mb-4">{reportData[1].description}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {reportData[1].dataCount}
                </span>
                <span className="text-gray-600 text-sm ml-2">dự đoán</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleExport('csv', 'predictions')}
                  className="flex-1 px-3 py-2 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 flex items-center justify-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={() => handleExport('json', 'predictions')}
                  className="flex-1 px-3 py-2 bg-purple-100 text-purple-600 rounded text-sm hover:bg-purple-200 flex items-center justify-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          </div>

          {/* Statistics Report */}
          <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
            <div className={`p-6 ${reportData[2].color}`}>
              {reportData[2].icon}
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reportData[2].title}</h3>
              <p className="text-gray-600 text-sm mb-4">{reportData[2].description}</p>
              <div className="mb-4">
                <span className="text-2xl font-bold text-gray-900">1</span>
                <span className="text-gray-600 text-sm ml-2">báo cáo</span>
              </div>
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center justify-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>CSV</span>
                </button>
                <button className="flex-1 px-3 py-2 bg-green-100 text-green-600 rounded text-sm hover:bg-green-200 flex items-center justify-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>JSON</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Hướng dẫn xuất dữ liệu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">CSV</h3>
              <p className="text-gray-600 text-sm">
                Định dạng CSV (Comma-Separated Values) phù hợp để import vào Excel, Google Sheets
                hoặc các ứng dụng quản lý dữ liệu khác.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2">JSON</h3>
              <p className="text-gray-600 text-sm">
                Định dạng JSON (JavaScript Object Notation) phù hợp cho các ứng dụng lập trình,
                API và xử lý dữ liệu nâng cao.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
