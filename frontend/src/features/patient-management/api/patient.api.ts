import type {
  Patient,
  PatientBackend,
  PatientInput,
  PatientResponse,
  PatientsBackendResponse,
  PatientsListResponse,
} from '../model/patient.types';
import { api } from '../../../app/config/axios';


// Helper: Tính tuổi từ date_of_birth
const calculateAge = (dateOfBirth: string | null | undefined): number => {
  if (!dateOfBirth) return 0;
  const birth = new Date(dateOfBirth);
  if (isNaN(birth.getTime())) return 0;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 0 ? age : 0;
};

// Helper: Chuẩn hóa gender
const normalizeGender = (gender: string | null | undefined): 'Male' | 'Female' => {
  if (!gender) return 'Female';
  const lower = gender.toLowerCase().trim();
  return ['nam', 'male', 'm', '1'].includes(lower) ? 'Male' : 'Female';
};

// Helper: Lấy message lỗi an toàn
const getErrorMessage = (error: unknown): string => {
  if (error && typeof error === 'object') {
    if ('response' in error && error.response && typeof error.response === 'object') {
      const resp = error.response as Record<string, unknown>;
      const data = resp.data as Record<string, unknown> | undefined;
      return (data?.error as string) ?? (data?.message as string) ?? 'Lỗi không xác định';
    }
    if ('message' in error) return (error as { message: unknown }).message as string;
  }
  return 'Lỗi không xác định';
};

export const patientApi = {
  getPatients: async (page = 1, pageSize = 10): Promise<PatientsListResponse> => {
    try {
      const resp = await api.get<PatientsBackendResponse>('/api/patients', {
        params: { page, pageSize },
      });

      const rawData = Array.isArray(resp.data?.data) ? resp.data.data : [];

      const data: Patient[] = rawData.map((item: PatientBackend) => ({
        id: String(item.patient_id),
        citizen_id: String(item.citizen_id ?? ''),
        full_name: String(item.full_name ?? ''),
        age: calculateAge(item.date_of_birth),
        gender: normalizeGender(item.gender),
        province: '',
        phoneNumber: String(item.phone ?? ''),
        email: '',
        address: String(item.address ?? ''),
        status: 'active',
        heartRiskScore: undefined,
        lastVisit: '',
        createdAt: String(item.created_at ?? ''),
        updatedAt: '',
      }));

      return {
        success: true,
        data,
        total: resp.data.total ?? data.length,
        page: resp.data.page ?? page,
        pageSize: resp.data.pageSize ?? pageSize,
      };
    } catch (err) {
      return {
        success: false,
        data: [],
        total: 0,
        page,
        pageSize,
        message: getErrorMessage(err),
      };
    }
  },

    getPatient: async (id: string): Promise<PatientResponse & { data?: Patient }> => {
    if (!id) {
      return {
        success: false,
        message: 'ID không hợp lệ',
      };
    }

    try {
      const resp = await api.get<PatientBackend>(`/api/patients/${id}`);
      const item = resp.data;

      const patient: Patient = {
        id: String(item.patient_id),
        citizen_id: String(item.citizen_id ?? ''),
        full_name: String(item.full_name ?? ''),
        age: calculateAge(item.date_of_birth),
        gender: normalizeGender(item.gender),
        province: '',
        phone: String(item.phone ?? ''),
        email: '',
        address: String(item.address ?? ''),
        status: 'active',
        heartRiskScore: undefined,
        lastVisit: '',
        createdAt: String(item.created_at ?? ''),
        updatedAt: '',
      };

      return {
        success: true,
        data: patient,
      };
    } catch (err: unknown) {
      console.error('Get patient error:', err);
      return {
        success: false,
        message: getErrorMessage(err),
      };
    }
  },

  addPatient: async (input: PatientInput): Promise<PatientResponse> => {
    try {
      const payload: Record<string, unknown> = {
        citizen_id: input.citizen_id?.trim(),
        full_name: input.full_name?.trim(),
        gender: input.gender === 'Male' ? 'Nam' : 'Nữ',
        date_of_birth: new Date().getFullYear() - input.age + '-01-01', // ước lượng nếu cần
        phone: input.phone?.trim() || null,
        address: input.address?.trim() || null,
      };

      Object.keys(payload).forEach((key) => {
        if (payload[key] === null || payload[key] === '') delete payload[key];
      });

      await api.post('/api/patients', payload);

      return {
        success: true,
        message: 'Thêm bệnh nhân thành công',
      };
    } catch (err: unknown) {
      console.error('Add patient error:', err);
      return {
        success: false,
        message: getErrorMessage(err),
      };
    }
  },

  updatePatient: async (id: string, input: Partial<PatientInput>): Promise<PatientResponse> => {
    if (!id) return { success: false, message: 'ID không hợp lệ' };

    try {
      const payload: Record<string, unknown> = { ...input };
      if (payload.gender) {
        payload.gender = payload.gender === 'Male' ? 'Nam' : 'Nữ';
      }
      Object.keys(payload).forEach((key) => {
        if (payload[key] === null || payload[key] === undefined || payload[key] === '') {
          delete payload[key];
        }
      });

      await api.put(`/api/patients/${id}`, payload);

      return {
        success: true,
        message: 'Cập nhật thành công',
      };
    } catch (err: unknown) {
      console.error('Update patient error:', err);
      return {
        success: false,
        message: getErrorMessage(err),
      };
    }
  },

  deletePatient: async (id: string): Promise<PatientResponse> => {
    if (!id) return { success: false, message: 'ID không hợp lệ' };

    try {
      await api.delete(`/api/patients/${id}`);
      return { success: true, message: 'Xóa thành công' };
    } catch (err: unknown) {
      console.error('Delete patient error:', err);
      return { success: false, message: getErrorMessage(err) };
    }
  },

  checkBhytIdExists: async (bhytId: string): Promise<boolean> => {
    if (!bhytId?.trim()) return false;
    try {
      return false; // backend chưa hỗ trợ filter bhytId → luôn cho phép
    } catch {
      return false;
    }
  },
};