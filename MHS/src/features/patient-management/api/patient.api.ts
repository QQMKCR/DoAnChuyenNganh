/*
Chứa CRUD:

addPatient()
getPatients()
updatePatient()
deletePatient()
Tự động:

Kiểm tra ID BHYT trùng
Đồng bộ NHIC (nếu có)
*/
/*
Chứa CRUD:

addPatient()
getPatients()
updatePatient()
deletePatient()
Tự động:

Kiểm tra ID BHYT trùng
Đồng bộ NHIC (nếu có)
*/
import type { Patient, PatientInput, PatientResponse, PatientsListResponse } from '../model/patient.types';

export const patientApi = {
  /**
   * Lấy danh sách bệnh nhân
   */
  getPatients: async (page = 1, pageSize = 10): Promise<PatientsListResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockPatients: Patient[] = [
          {
            id: 'PT001',
            bhytId: 'VN1234567890123',
            name: 'Nguyễn Văn A',
            age: 45,
            gender: 'Male',
            province: 'Hà Nội',
            condition: 'Tăng huyết áp',
            status: 'active',
            heartRiskScore: 15.5,
            lastVisit: '2024-01-15',
            createdAt: '2024-01-01',
            updatedAt: '2024-01-15',
          },
          {
            id: 'PT002',
            bhytId: 'VN2345678901234',
            name: 'Trần Thị B',
            age: 38,
            gender: 'Female',
            province: 'TP. Hồ Chí Minh',
            condition: 'Tiểu đường type 2',
            status: 'follow-up',
            lastVisit: '2024-01-10',
            createdAt: '2023-12-15',
            updatedAt: '2024-01-10',
          },
        ];

        resolve({
          success: true,
          data: mockPatients,
          total: mockPatients.length,
          page,
          pageSize,
        });
      }, 500);
    });
  },

  /**
   * Thêm bệnh nhân mới
   */
  addPatient: async (input: PatientInput): Promise<PatientResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPatient: Patient = {
          id: `PT${Date.now()}`,
          ...input,
          status: 'active',
          lastVisit: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        resolve({
          success: true,
          data: newPatient,
          message: 'Thêm bệnh nhân thành công. Đã cập nhật Sở Y tế tỉnh.',
        });
      }, 1000);
    });
  },

  /**
   * Cập nhật thông tin bệnh nhân
   */
  updatePatient: async (id: string, input: Partial<PatientInput>): Promise<PatientResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Cập nhật thông tin bệnh nhân thành công',
        });
      }, 800);
    });
  },

//Xóa bệnh nhân
  deletePatient: async (id: string): Promise<PatientResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Xóa bệnh nhân thành công',
        });
      }, 500);
    });
  },

   // Kiểm tra ID BHYT có tồn tại không

  checkBhytIdExists: async (bhytId: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate check - always return false for demo
        resolve(false);
      }, 300);
    });
  },
};