/*
Các ngưỡng nguy cơ tim:
LOW < 10%
MEDIUM < 20%
HIGH ≥ 20%
*/
export const RISK_THRESHOLDS = {
  LOW: 10,
  MEDIUM: 20,
  HIGH: Infinity,
} as const;

export const RISK_LEVEL_CONFIG = {
  low: {
    label: 'Thấp',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    description: 'Nguy cơ thấp, duy trì lối sống lành mạnh',
  },
  medium: {
    label: 'Trung bình',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100',
    description: 'Cần theo dõi và điều chỉnh lối sống',
  },
  high: {
    label: 'Cao',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    description: 'Cần khám và điều trị ngay',
  },
} as const;

export const CHEST_PAIN_TYPES = [
  { value: 0, label: 'Không có' },
  { value: 1, label: 'Đau thắt ngực điển hình' },
  { value: 2, label: 'Đau thắt ngực không điển hình' },
  { value: 3, label: 'Đau không do tim' },
] as const;