//Biểu đồ số lượng bệnh nhân theo tỉnh.
import React from 'react';

interface Props {
  data: { province: string; count: number }[];
}

export const PatientStatsChart: React.FC<Props> = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Patients by Province</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <span className="text-sm text-gray-600 w-24">{item.province}</span>
            <div className="flex-1 h-8 bg-gray-100 rounded overflow-hidden">
              <div
                className="h-full bg-blue-500 flex items-center justify-end pr-2"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              >
                <span className="text-xs text-white font-semibold">
                  {item.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};