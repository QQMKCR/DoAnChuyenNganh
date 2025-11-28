/*
Gọi API ML.
Quản lý state loading, error, result.
*/

import { useState } from 'react';
import { heartRiskApi } from '../api/heartRish.api';
import type { HeartRiskInput, HeartRiskResult } from '../model/heartRisk.types';

export const useHeartRiskPrediction = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<HeartRiskResult | null>(null);

  const predict = async (input: HeartRiskInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await heartRiskApi.predictHeartRisk(input);
      if (response.success) {
        setResult(response.data);
        return response.data;
      } else {
        setError(response.message || 'Dự đoán thất bại');
        return null;
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi dự đoán. Vui lòng thử lại.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    predict,
    reset,
    loading,
    error,
    result,
  };
};