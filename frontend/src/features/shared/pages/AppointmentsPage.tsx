import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, MessageSquare, Plus, Edit2, Trash2, Check, X } from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  date: string;
  time: string;
  location: string;
  reason: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      patientName: 'Nguyễn Văn A',
      patientPhone: '0901234567',
      date: '2025-12-10',
      time: '09:00',
      location: 'Phòng 101',
      reason: 'Kiểm tra sức khỏe định kỳ',
      status: 'confirmed',
    },
    {
      id: '2',
      patientName: 'Trần Thị B',
      patientPhone: '0912345678',
      date: '2025-12-10',
      time: '10:30',
      location: 'Phòng 102',
      reason: 'Tư vấn bệnh tim',
      status: 'pending',
    },
    {
      id: '3',
      patientName: 'Lê Văn C',
      patientPhone: '0923456789',
      date: '2025-12-09',
      time: '14:00',
      location: 'Phòng 101',
      reason: 'Tái khám',
      status: 'completed',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    date: '',
    time: '',
    location: '',
    reason: '',
  });

  const [filterStatus, setFilterStatus] = useState<'all' | Appointment['status']>('all');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddAppointment = () => {
    if (!formData.patientName || !formData.date || !formData.time) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'pending',
    };

    setAppointments([...appointments, newAppointment]);
    setFormData({
      patientName: '',
      patientPhone: '',
      date: '',
      time: '',
      location: '',
      reason: '',
    });
    setShowForm(false);
  };

  const handleDeleteAppointment = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa lịch hẹn này?')) {
      setAppointments(appointments.filter(apt => apt.id !== id));
    }
  };

  const handleStatusChange = (id: string, newStatus: Appointment['status']) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: newStatus } : apt
    ));
  };

  const filteredAppointments = filterStatus === 'all'
    ? appointments
    : appointments.filter(apt => apt.status === filterStatus);

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
    }
  };

  const getStatusLabel = (status: Appointment['status']) => {
    const labels: Record<Appointment['status'], string> = {
      confirmed: 'Xác nhận',
      pending: 'Chờ xác nhận',
      completed: 'Hoàn thành',
      cancelled: 'Đã hủy',
    };
    return labels[status];
  };

  const stats = [
    {
      label: 'Tổng lịch hẹn',
      value: appointments.length,
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Đã xác nhận',
      value: appointments.filter(a => a.status === 'confirmed').length,
      icon: <Check className="w-6 h-6" />,
      color: 'bg-green-50 text-green-600',
    },
    {
      label: 'Chờ xác nhận',
      value: appointments.filter(a => a.status === 'pending').length,
      icon: <Clock className="w-6 h-6" />,
      color: 'bg-yellow-50 text-yellow-600',
    },
    {
      label: 'Hoàn thành',
      value: appointments.filter(a => a.status === 'completed').length,
      icon: <Check className="w-6 h-6" />,
      color: 'bg-purple-50 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lịch hẹn</h1>
            <p className="text-gray-600 mt-2">Quản lý lịch khám của bệnh nhân</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm lịch hẹn</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                {stat.icon}
              </div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Add Appointment Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Thêm lịch hẹn mới</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên bệnh nhân
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleInputChange}
                  placeholder="Nhập tên bệnh nhân"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  name="patientPhone"
                  value={formData.patientPhone}
                  onChange={handleInputChange}
                  placeholder="0123456789"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ngày hẹn
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Giờ hẹn
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Địa điểm
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Phòng 101"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lý do khám
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="Nhập lý do khám"
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleAddAppointment}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Thêm lịch hẹn
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Hủy
              </button>
            </div>
          </div>
        )}

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Tất cả ({appointments.length})
            </button>
            <button
              onClick={() => setFilterStatus('confirmed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'confirmed'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Xác nhận ({appointments.filter(a => a.status === 'confirmed').length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'pending'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Chờ xác nhận ({appointments.filter(a => a.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterStatus === 'completed'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Hoàn thành ({appointments.filter(a => a.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Không có lịch hẹn nào</p>
            </div>
          ) : (
            filteredAppointments.map(appointment => (
              <div key={appointment.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{appointment.patientName}</h3>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                        {getStatusLabel(appointment.status)}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{new Date(appointment.date).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{appointment.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{appointment.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">{appointment.patientPhone}</span>
                    </div>
                  </div>

                  {appointment.reason && (
                    <div className="flex items-start space-x-2 text-gray-600 mb-4">
                      <MessageSquare className="w-4 h-4 mt-1" />
                      <span className="text-sm">{appointment.reason}</span>
                    </div>
                  )}

                  {appointment.status === 'pending' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Xác nhận</span>
                      </button>
                      <button
                        onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                      >
                        <X className="w-4 h-4" />
                        <span>Từ chối</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsPage;
