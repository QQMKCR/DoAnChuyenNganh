import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Heart,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Activity,
  FileText,
  Clock,
} from 'lucide-react';
import type { Patient } from '../model/patient.types';
import { patientApi } from '../api/patient.api';
import { Card } from '../../shared/components/Card';
import { Badge } from '../../shared/components/Badge';
import { Button } from '../../shared/components/Button';
import Loader from '../../shared/components/Loader';
import { formatDate } from '../../shared/utils/formatDate';

const PatientDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatient = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        // Mock data - replace with actual API call
        const mockPatient: Patient = {
          id: id,
          bhytId: 'VN1234567890123',
          name: 'Nguyễn Văn A',
          age: 45,
          gender: 'Male',
          province: 'Hà Nội',
          phoneNumber: '0912345678',
          email: 'nguyenvana@example.com',
          address: '123 Đường ABC, Quận Đống Đa, Hà Nội',
          condition: 'Tăng huyết áp, cholesterol cao',
          status: 'active',
          heartRiskScore: 15.5,
          lastVisit: '2024-01-15',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-15',
        };

        setTimeout(() => {
          setPatient(mockPatient);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Không thể tải thông tin bệnh nhân');
        setLoading(false);
      }
    };

    fetchPatient();
  }, [id]);

  const handleEdit = () => {
    navigate(`/patients/${id}/edit`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bệnh nhân này?')) return;

    try {
      await patientApi.deletePatient(id!);
      alert('Đã xóa bệnh nhân thành công');
      navigate('/patients');
    } catch (err) {
      alert('Không thể xóa bệnh nhân');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Đang điều trị</Badge>;
      case 'follow-up':
        return <Badge variant="warning">Theo dõi</Badge>;
      case 'discharged':
        return <Badge variant="default">Đã xuất viện</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getRiskBadge = (score?: number) => {
    if (!score) return null;
    if (score < 10) return <Badge variant="success">Nguy cơ thấp</Badge>;
    if (score < 20) return <Badge variant="warning">Nguy cơ trung bình</Badge>;
    return <Badge variant="danger">Nguy cơ cao</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="lg" text="Đang tải thông tin..." />
      </div>
    );
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <div className="text-center py-12">
              <p className="text-red-600 mb-4">{error || 'Không tìm thấy bệnh nhân'}</p>
              <Button onClick={() => navigate('/patients')}>Quay lại danh sách</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/patients')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Quay lại danh sách</span>
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{patient.name}</h1>
              <p className="text-gray-600 mt-1">ID BHYT: {patient.bhytId}</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                leftIcon={<Edit className="w-4 h-4" />}
                onClick={handleEdit}
              >
                Chỉnh sửa
              </Button>
              <Button
                variant="danger"
                leftIcon={<Trash2 className="w-4 h-4" />}
                onClick={handleDelete}
              >
                Xóa
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin cơ bản
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tuổi</p>
                  <p className="text-base font-medium text-gray-900">{patient.age} tuổi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Giới tính</p>
                  <p className="text-base font-medium text-gray-900">
                    {patient.gender === 'Male' ? 'Nam' : 'Nữ'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tỉnh/Thành phố</p>
                  <p className="text-base font-medium text-gray-900 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {patient.province}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Số điện thoại</p>
                  <p className="text-base font-medium text-gray-900 flex items-center">
                    <Phone className="w-4 h-4 mr-1 text-gray-400" />
                    {patient.phoneNumber || 'Chưa có'}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600 mb-1">Email</p>
                  <p className="text-base font-medium text-gray-900 flex items-center">
                    <Mail className="w-4 h-4 mr-1 text-gray-400" />
                    {patient.email || 'Chưa có'}
                  </p>
                </div>
                {patient.address && (
                  <div className="col-span-2">
                    <p className="text-sm text-gray-600 mb-1">Địa chỉ</p>
                    <p className="text-base font-medium text-gray-900">
                      {patient.address}
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Medical Information */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin y tế
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Tình trạng sức khỏe</p>
                  <p className="text-base text-gray-900">{patient.condition}</p>
                </div>
                {patient.heartRiskScore && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Nguy cơ tim mạch</p>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold text-gray-900">
                            {patient.heartRiskScore}%
                          </span>
                          {getRiskBadge(patient.heartRiskScore)}
                        </div>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                            style={{ width: `${Math.min(patient.heartRiskScore * 3, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Medical History */}
            <Card>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                Lịch sử khám bệnh
              </h2>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Khám tổng quát</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Kiểm tra huyết áp, cholesterol, đường huyết
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(patient.lastVisit)}
                    </p>
                  </div>
                </div>

                <div className="text-center py-4">
                  <Button variant="outline" size="sm">
                    Xem tất cả lịch sử
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Status & Actions */}
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Trạng thái</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Tình trạng hiện tại</p>
                  {getStatusBadge(patient.status)}
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Lần khám gần nhất
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(patient.lastVisit)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Ngày đăng ký</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(patient.createdAt)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Thao tác nhanh</h3>
              <div className="space-y-2">
                <Button
                  fullWidth
                  variant="outline"
                  leftIcon={<Heart className="w-4 h-4" />}
                  onClick={() => navigate('/predict-heart-risk')}
                >
                  Dự đoán nguy cơ tim
                </Button>
                <Button
                  fullWidth
                  variant="outline"
                  leftIcon={<Calendar className="w-4 h-4" />}
                >
                  Đặt lịch hẹn
                </Button>
                <Button
                  fullWidth
                  variant="outline"
                  leftIcon={<FileText className="w-4 h-4" />}
                >
                  Xem hồ sơ đầy đủ
                </Button>
              </div>
            </Card>

            {/* Health Metrics */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Activity className="w-4 h-4 mr-1 text-green-600" />
                Chỉ số sức khỏe
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Huyết áp</span>
                  <span className="text-sm font-semibold text-gray-900">120/80</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Cholesterol</span>
                  <span className="text-sm font-semibold text-gray-900">180 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Đường huyết</span>
                  <span className="text-sm font-semibold text-gray-900">95 mg/dL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">BMI</span>
                  <span className="text-sm font-semibold text-gray-900">23.5</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPage;