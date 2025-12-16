/*
Nút tích hợp VNeID login.
Mô phỏng button chuẩn của Bộ TT&TT.
*/
import React from 'react';
import { Shield } from 'lucide-react';

interface VneIdButtonProps {
  onClick: () => void;
  loading?: boolean;
}

export const VneIdButton: React.FC<VneIdButtonProps> = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
    >
      <Shield className="w-5 h-5" />
      <span>Đăng nhập với VNeID</span>
    </button>
  );
};