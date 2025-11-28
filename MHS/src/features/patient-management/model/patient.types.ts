/*
TypeScript types:
Patient
PatientInput
PatientResponse
*/
export interface Patient {
  id: string;
  bhytId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  province: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  condition: string;
  status: 'active' | 'follow-up' | 'discharged';
  heartRiskScore?: number;
  lastVisit: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientInput {
  bhytId: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  province: string;
  phoneNumber?: string;
  email?: string;
  address?: string;
  condition: string;
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
}