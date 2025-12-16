import axios from "axios";

/*
Lấy thống kê:

phân bố nguy cơ tim

số bệnh nhân theo tỉnh

tỷ lệ bệnh tim theo độ tuổi
*/
export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  activeCases: number;
  avgWaitTime: string;
  patientGrowth: number;
  appointmentRate: number;
  satisfaction: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await axios.get('/api/dashboard/stats');
  return response.data;
};

export const getRecentActivities = async () => {
  const response = await axios.get('/api/dashboard/activities');
  return response.data;
};

export const getTodaySchedule = async () => {
  const response = await axios.get('/api/dashboard/schedule/today');
  return response.data;
};

export const getPerformanceMetrics = async () => {
  const response = await axios.get('/api/dashboard/performance');
  return response.data;
};