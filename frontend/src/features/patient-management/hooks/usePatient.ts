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
import type { Patient, PatientInput } from '../model/patient.types';

export const usePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await patientApi.getPatients();
      if (response.success) {
        setPatients(response.data);
      }
    } catch {
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
      if (response.success) {
        await fetchPatients();
      }
      return response;
    } catch {
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
    } catch {
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
    } catch {
      setError('Không thể xóa bệnh nhân');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);
  useEffect(() => {
  if (!searchText.trim()) {
    setFilteredPatients(patients);
    } else {
      const lower = searchText.toLowerCase();
      setFilteredPatients(
        patients.filter(
          (p) =>
            p.full_name.toLowerCase().includes(lower) ||
            p.citizen_id.toLowerCase().includes(lower) ||
            p.phone?.toLowerCase().includes(lower)
        )
      );
    }
  }, [searchText, patients]);

  return {
    patients,
    loading,
    error,
    filteredPatients,
    searchText,
    setSearchText,
    fetchPatients,
    addPatient,
    updatePatient,
    deletePatient,
  };
};