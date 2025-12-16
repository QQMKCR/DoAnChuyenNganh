/*
Hiển thị: Nguy cơ tim mạch: 37%
Có thể hiển thị màu đỏ/vàng/xanh theo mức nguy hiểm.
*/
import React from 'react';
import { Heart, AlertTriangle, CheckCircle } from 'lucide-react';
import type { HeartRiskResult } from '../model/heartRisk.types';
import { RISK_LEVEL_CONFIG } from '../model/heartRisk.constants';

interface RiskResultCardProps {
  result: HeartRiskResult;
  onSaveToNHIC?: () => void;
  saving?: boolean;
}

export const RiskResultCard: React.FC<RiskResultCardProps> = ({ 
  result, 
  onSaveToNHIC,
  saving 
}) => {
  const config = RISK_LEVEL_CONFIG[result.riskLevel];

  const getIcon = () => {
    switch (result.riskLevel) {
      case 'low':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'medium':
        return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'high':
        return <Heart className="w-6 h-6 text-red-600" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        {getIcon()}
        <h3 className="text-lg font-semibold text-gray-900">Kết quả dự đoán</h3>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-2">Nguy cơ bệnh tim mạch</p>
        <div className="flex items-baseline space-x-3">
          <span className="text-4xl font-bold text-gray-900">
            {result.riskPercentage}%
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}>
            Nguy cơ {config.label}
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-600">{config.description}</p>
      </div>

      {result.recommendations && result.recommendations.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Khuyến nghị:</h4>
          <ul className="space-y-1">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {onSaveToNHIC && (
        <button
          onClick={onSaveToNHIC}
          disabled={saving}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? 'Đang lưu...' : 'Lưu vào NHIC DB'}
        </button>
      )}
    </div>
  );
};
