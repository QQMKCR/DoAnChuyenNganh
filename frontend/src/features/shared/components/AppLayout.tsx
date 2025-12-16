import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  Users,
  Calendar,
  FileText,
  Heart,
  TrendingUp,
  MessageSquare,
  Bell,
  Settings,
  ChevronDown,
  Search,
  Menu,
  X,
  BarChart3,
} from 'lucide-react';
import { useAuthStore } from '../../../app/store';
import { ROUTES } from '../../../app/config/constants';

interface NavItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const mainNavigation: NavItem[] = [
    { name: 'Dashboard', path: ROUTES.DASHBOARD, icon: Activity },
    { name: 'Dự đoán nguy cơ tim', path: ROUTES.PREDICT_HEART_RISK, icon: Heart },
    { name: 'Quản lý bệnh nhân', path: ROUTES.PATIENTS, icon: Users },
    { name: 'Báo cáo', path: ROUTES.REPORTS, icon: BarChart3 },
    { name: 'Lịch hẹn', path: ROUTES.APPOINTMENTS, icon: Calendar, badge: '28' },
    { name: 'Hồ sơ y tế', path: ROUTES.MEDICAL_RECORDS, icon: FileText },
    { name: 'Phân tích', path: ROUTES.ANALYTICS, icon: TrendingUp },
  ];

  const communicationNavigation: NavItem[] = [
    { name: 'Tin nhắn', path: '/messages', icon: MessageSquare, badge: '3' },
    { name: 'Thông báo', path: '/notifications', icon: Bell, badge: '5' },
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* Header */}
      <header className="col-span-1 row-span-1 bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo, Toggle, and Search */}
            <div className="flex items-center space-x-4 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-lg font-bold text-gray-900">MediCare Pro</h1>
                  <p className="text-xs text-gray-500">Healthcare System</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md ml-8 hidden md:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Tìm kiếm bệnh nhân, lịch hẹn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Notifications and User */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role === 'doctor' ? 'Bác sĩ' : 'Quản trị viên'}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      to={ROUTES.SETTINGS}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Cài đặt
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } sticky top-16 w-64 bg-white border-r border-gray-200 h-screen transition-transform duration-300 ease-in-out z-20`}
        >
          <nav className="p-4 space-y-1 h-full overflow-y-auto" >
            {/* Main Menu */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">
                Main Menu
              </div>
              {mainNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          active
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Communication */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-3">
                Communication
              </div>
              {communicationNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      active
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          active
                            ? 'bg-blue-500 text-white'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Settings */}
            <div>
              <Link
                to={ROUTES.SETTINGS}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(ROUTES.SETTINGS)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium text-sm">Cài đặt</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default AppLayout;