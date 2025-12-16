import React, { useState } from 'react';
import { Download, FileJson, FileText } from 'lucide-react';

interface ExportButtonProps {
  data: any[];
  filename?: string;
  onExport?: (format: 'csv' | 'json') => void;
  label?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  data,
  filename = 'export',
  onExport,
  label = 'Xuất dữ liệu'
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = (format: 'csv' | 'json') => {
    if (!data || data.length === 0) {
      alert('Không có dữ liệu để xuất');
      return;
    }

    if (onExport) {
      onExport(format);
    } else {
      // Default export logic
      const timestamp = new Date().toISOString().split('T')[0];
      const file = `${filename}_${timestamp}.${format}`;

      if (format === 'csv') {
        exportToCSV(data, file);
      } else {
        exportToJSON(data, file);
      }
    }

    setShowMenu(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
      >
        <Download className="w-5 h-5" />
        <span>{label}</span>
      </button>

      {showMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
          <button
            onClick={() => handleExport('csv')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 rounded-t-lg"
          >
            <FileText className="w-4 h-4" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => handleExport('json')}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center space-x-2 rounded-b-lg"
          >
            <FileJson className="w-4 h-4" />
            <span>JSON</span>
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * Export data to CSV
 */
const exportToCSV = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  let csvContent = headers.join(',') + '\n';

  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvContent += values.join(',') + '\n';
  });

  downloadFile(new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }), filename);
};

/**
 * Export data to JSON
 */
const exportToJSON = (data: any[], filename: string) => {
  if (!data || data.length === 0) return;

  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(new Blob([jsonContent], { type: 'application/json;charset=utf-8;' }), filename);
};

/**
 * Download file helper
 */
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
