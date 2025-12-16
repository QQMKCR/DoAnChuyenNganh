import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Edit,
  Trash2,
  Heart,
  Phone,
  MapPin
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
        const res = await patientApi.getPatient(id!);
          if (res.success && res.data) {
            setPatient(res.data);
          } else {
            setError(res.message || 'Không thể tải bệnh nhân');
          }
      } catch {
        setError('Không thể tải thông tin bệnh nhân');
      } finally {
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
    } catch {
      alert('Không thể xóa bệnh nhân');
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Đang điều trị</Badge>;
      case 'follow-up':
        return <Badge variant="warning">Theo dõi</Badge>;
      case 'discharged':
        return <Badge variant="default">Đã xuất viện</Badge>;
      default:
        return <Badge variant="default">Không xác định</Badge>;
    }
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
              <p className="text-red-600 mb-4">
                {error || 'Không tìm thấy bệnh nhân'}
              </p>
              <Button onClick={() => navigate('/patients')}>
                Quay lại danh sách
              </Button>
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
              <h1 className="text-2xl font-bold text-gray-900">
                {patient.full_name}
              </h1>
              <p className="text-gray-600 mt-1">
                ID BHYT: {patient.citizen_id}
              </p>
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
          {/* Left Column */}
          <div className="col-span-2 space-y-6">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Thông tin cơ bản</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Tuổi</p>
                  <p className="font-medium">{patient.age} tuổi</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Giới tính</p>
                  <p className="font-medium">
                    {patient.gender === 'Male' ? 'Nam' : 'Nữ'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Số điện thoại</p>
                  <p className="flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    {patient.phone || 'Chưa có'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Địa chỉ</p>
                  <p className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {patient.address}
                  </p>
                </div>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg font-semibold mb-4">Thông tin y tế</h2>
              <p>{patient.condition || 'Chưa có dữ liệu'}</p> // Chưa cần bổ sung
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-sm font-semibold mb-3">Trạng thái</h3>
              {getStatusBadge(patient.status)}
              <p className="mt-2 text-sm">
                Lần khám gần nhất: {formatDate(patient.lastVisit)}
              </p>
              <p className="text-sm">
                Ngày đăng ký: {formatDate(patient.createdAt)}
              </p>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold mb-3">Thao tác nhanh</h3>
              <Button
                fullWidth
                variant="outline"
                leftIcon={<Heart className="w-4 h-4" />}
              >
                Dự đoán nguy cơ tim
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailPage;
