export const PROVINCES = [
  { value: 'hanoi', label: 'Hà Nội' },
  { value: 'hcm', label: 'TP. Hồ Chí Minh' },
  { value: 'danang', label: 'Đà Nẵng' },
  { value: 'cantho', label: 'Cần Thơ' },
  { value: 'haiphong', label: 'Hải Phòng' },
  { value: 'binhduong', label: 'Bình Dương' },
  { value: 'dongnai', label: 'Đồng Nai' },
] as const;

export const PATIENT_STATUS = {
  ACTIVE: 'active',
  FOLLOW_UP: 'follow-up',
  DISCHARGED: 'discharged',
} as const;

export const PATIENT_STATUS_LABELS = {
  [PATIENT_STATUS.ACTIVE]: 'Đang điều trị',
  [PATIENT_STATUS.FOLLOW_UP]: 'Theo dõi',
  [PATIENT_STATUS.DISCHARGED]: 'Đã xuất viện',
} as const;

export const RISK_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;

export const RISK_LEVEL_LABELS = {
  [RISK_LEVELS.LOW]: 'Thấp',
  [RISK_LEVELS.MEDIUM]: 'Trung bình',
  [RISK_LEVELS.HIGH]: 'Cao',
} as const;

export const GENDERS = [
  { value: 'Male', label: 'Nam' },
  { value: 'Female', label: 'Nữ' },
] as const;

export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;