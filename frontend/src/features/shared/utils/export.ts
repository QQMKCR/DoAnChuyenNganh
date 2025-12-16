/**
 * Export utilities - hỗ trợ export dữ liệu sang CSV, Excel, PDF
 */

export interface ExportOptions {
  format: 'csv' | 'json' | 'excel';
  filename?: string;
  data: any[];
}

/**
 * Export data to CSV
 */
export const exportToCSV = (data: any[], filename: string = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csvContent = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Escape quotes and wrap in quotes if contains comma
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvContent += values.join(',') + '\n';
  });

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadFile(blob, filename);
};

/**
 * Export data to JSON
 */
export const exportToJSON = (data: any[], filename: string = 'export.json') => {
  if (!data || data.length === 0) {
    alert('Không có dữ liệu để xuất');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  downloadFile(blob, filename);
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

/**
 * Export patients data
 */
export const exportPatients = (patients: any[], format: 'csv' | 'json' = 'csv') => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `benh_nhan_${timestamp}.${format}`;

  const exportData = patients.map(patient => ({
    'ID': patient.id,
    'Họ tên': patient.full_name,
    'Địa chỉ': patient.address,
    'Điện thoại': patient.phone,
    'Ngày sinh': patient.dateOfBirth,
    'Giới tính': patient.gender === 'M' ? 'Nam' : 'Nữ',
    'Lịch sử bệnh': patient.medicalHistory || 'N/A',
    'Ngày tạo': new Date(patient.createdAt).toLocaleString('vi-VN'),
  }));

  if (format === 'csv') {
    exportToCSV(exportData, filename);
  } else {
    exportToJSON(exportData, filename);
  }
};

/**
 * Export predictions data
 */
export const exportPredictions = (predictions: any[], format: 'csv' | 'json' = 'csv') => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `du_doan_${timestamp}.${format}`;

  const exportData = predictions.map(pred => ({
    'ID': pred.predictionId,
    'Bệnh nhân': pred.patientName,
    'Tuổi': pred.age,
    'Huyết áp': pred.trestbps,
    'Cholesterol': pred.chol,
    'Nhịp tim': pred.thalach,
    'Kết quả': pred.prediction === 1 ? 'Nguy hiểm cao' : 'Nguy hiểm thấp',
    'Mức độ': pred.prediction === 1 ? 'High' : 'Low',
    'Ngày dự đoán': new Date(pred.predictionDate).toLocaleString('vi-VN'),
  }));

  if (format === 'csv') {
    exportToCSV(exportData, filename);
  } else {
    exportToJSON(exportData, filename);
  }
};
