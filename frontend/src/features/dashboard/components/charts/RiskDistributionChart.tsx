//Biểu đồ phân bố % nguy cơ.
// features/dashboard/components/charts/RiskDistributionChart.tsx
import React from 'react';

interface Props {
  data: { label: string; value: number; color: string }[];
}

export const RiskDistributionChart: React.FC<Props> = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm text-gray-600">{item.label}</span>
              <span className="text-sm font-semibold">{item.value}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${(item.value / total) * 100}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};