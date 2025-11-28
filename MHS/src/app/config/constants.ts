export const APP_CONFIG = {
  name: 'MediCare Pro',
  version: '1.0.0',
  description: 'Healthcare Management System',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.medicare.vn/v1',
  mlApiUrl: import.meta.env.VITE_ML_API_URL || 'https://ml.medicare.vn',
  nhicApiUrl: import.meta.env.VITE_NHIC_API_URL || 'https://nhic.gov.vn/api',
  vneIdUrl: import.meta.env.VITE_VNEID_URL || 'https://vneid.gov.vn',
} as const;

export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  PREDICT_HEART_RISK: '/predict-heart-risk',
  PATIENTS: '/patients',
  PATIENT_DETAIL: '/patients/:id',
  ADD_PATIENT: '/patients/add',
  APPOINTMENTS: '/appointments',
  MEDICAL_RECORDS: '/medical-records',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGIN_VNEID: '/auth/vneid',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Patients
  PATIENTS: '/patients',
  PATIENT_BY_ID: (id: string) => `/patients/${id}`,
  
  // Heart Risk Prediction
  PREDICT_HEART_RISK: '/ml/predict-heart-risk',
  SAVE_TO_NHIC: '/nhic/save-prediction',
  
  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_ACTIVITIES: '/dashboard/activities',
  DASHBOARD_SCHEDULE: '/dashboard/schedule',
  DASHBOARD_PERFORMANCE: '/dashboard/performance',
} as const;

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme_preference',
} as const;