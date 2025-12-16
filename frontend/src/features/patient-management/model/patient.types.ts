/*
TypeScript types:
Patient
PatientInput
PatientResponse
*/
export interface Patient {
  id: string;
  citizen_id: string;
  full_name: string;
  age: number;
  gender: 'Male' | 'Female';
  phone?: string;
  address?: string;
  province?: string;
  condition?: string;
  status: 'active' | 'follow-up' | 'discharged';
  heartRiskScore?: number;
  lastVisit: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientInput {
  citizen_id: string;
  full_name: string;
  gender: 'Male' | 'Female';
  age: number;
  phone?: string;
  address?: string;
  province?: string;
  condition?: string;
}

export interface PatientResponse {
  success: boolean;
  data?: Patient;
  message?: string;
}

export interface PatientsListResponse {
  success: boolean;
  data: Patient[];
  total: number;
  page: number;
  pageSize: number;
  message?: string;
}

export interface PatientsBackendResponse {
  data: {
    patient_id: number;
    citizen_id: string;
    full_name: string;
    gender: string;
    date_of_birth: string;
    phone: string;
    address: string;
    province: string;
    condition: string;
    created_at: string;
    created_by: number;
  }[];
  total: number;
  page: number;
  pageSize: number;
}
export interface PatientBackend {
  patient_id: number;
  citizen_id: string;
  full_name: string;
  gender: string;
  date_of_birth: string;
  phone: string;
  address: string;
  province: string;
  condition: string;
  created_at: string;
  created_by: number;
}
