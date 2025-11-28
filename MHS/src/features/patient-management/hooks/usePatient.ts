/*
Logic quản lý bệnh nhân:
fetch list
add
update
delete
filter/search
*/
import { useState, useEffect } from 'react';
import { patientApi } from '../api/patient.api';
import { Patient, PatientInput } from '../model/patient.types';

export const usePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await patientApi.getPatients();
      if (response.success) {
        setPatients(response.data);
      }
    } catch (err) {
      setError('Không thể tải danh sách bệnh nhân');
    } finally {
      setLoading(false);
    }
  };

  const addPatient = async (input: PatientInput) => {
    setLoading(true);
    setError(null);

    try {
      const response = await patientApi.addPatient(input);
      if (response.success && response.data) {
        setPatients((prev) => [...prev, response.data!]);
        return response;
      }
      return response;
    } catch (err) {
      setError('Không thể thêm bệnh nhân');
      return { success: false, message: 'Lỗi khi thêm bệnh nhân' };
    } finally {
      setLoading(false);
    }
  };

  const updatePatient = async (id: string, input: Partial<PatientInput>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await patientApi.updatePatient(id, input);
      if (response.success) {
        await fetchPatients();
      }
      return response;
    } catch (err) {
      setError('Không thể cập nhật bệnh nhân');
      return { success: false, message: 'Lỗi khi cập nhật' };
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await patientApi.deletePatient(id);
      if (response.success) {
        setPatients((prev) => prev.filter((p) => p.id !== id));
      }
      return response;
    } catch (err) {
      setError('Không thể xóa bệnh nhân');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    addPatient,
    updatePatient,
    deletePatient,
  };
};