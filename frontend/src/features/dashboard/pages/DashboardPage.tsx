import React, { useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  Activity, 
  Clock, 
  Star,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  MoreVertical,
  Download,
  Plus,
  Filter
} from 'lucide-react';
// Types
interface Patient {
  citizen_id: string;
  id: string;
  name: string;
  initials: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  status: 'active' | 'follow-up' | 'discharged';
  lastVisit: string;
}

interface AnalyticsCard {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtitle: string;
  color: string;
  icon: React.ReactNode;
}

interface Activity {
  id: string;
  type: 'lab' | 'appointment' | 'registration';
  message: string;
  time: string;
  color: string;
}

// Mock Data
const mockPatients: Patient[] = [
  {
    id: 'PT001',
    name: 'Ateeq Rafiq',
    initials: 'AT',
    age: 28,
    gender: 'Male',
    condition: 'Hypertension',
    status: 'active',
    lastVisit: '1/15/2024'
  },
  {
    id: 'PT002',
    name: 'Michael Chen',
    initials: 'SJ',
    age: 45,
    gender: 'Male',
    condition: 'Diabetes Type 2',
    status: 'follow-up',
    lastVisit: '1/15/2024'
  },
  {
    id: 'PT003',
    name: 'Emma Wilson',
    initials: 'SJ',
    age: 28,
    gender: 'Female',
    condition: 'Asthma',
    status: 'active',
    lastVisit: '1/15/2024'
  },
  {
    id: 'PT004',
    name: 'James Brown',
    initials: 'SJ',
    age: 52,
    gender: 'Male',
    condition: 'Arthritis',
    status: 'discharged',
    lastVisit: '1/15/2024'
  },
  {
    id: 'PT005',
    name: 'Lisa Anderson',
    initials: 'SJ',
    age: 39,
    gender: 'Female',
    condition: 'Migraine',
    status: 'active',
    lastVisit: '1/15/2024'
  }
];

const recentActivities: Activity[] = [
  {
    id: '1',
    type: 'lab',
    message: 'Lab results uploaded',
    time: '2 minutes ago',
    color: 'bg-green-500'
  },
  {
    id: '2',
    type: 'appointment',
    message: 'Appointment rescheduled',
    time: '15 minutes ago',
    color: 'bg-orange-500'
  },
  {
    id: '3',
    type: 'registration',
    message: 'New patient registered',
    time: '1 hour ago',
    color: 'bg-blue-500'
  }
];

const DashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patients' | 'appointments'>('patients');

  const analyticsCards: AnalyticsCard[] = [
    {
      title: 'Patient Growth',
      value: '+18%',
      change: '+42 new patients vs last month',
      isPositive: true,
      subtitle: '',
      color: 'from-green-400 to-green-600',
      icon: <TrendingUp className="w-5 h-5" />
    },
    {
      title: 'Appointment Rate',
      value: '94%',
      change: 'Average attendance rate',
      isPositive: true,
      subtitle: '',
      color: 'from-blue-400 to-blue-600',
      icon: <Calendar className="w-5 h-5" />
    },
    {
      title: 'Patient Satisfaction',
      value: '4.8/5',
      change: 'Based on 156 reviews',
      isPositive: true,
      subtitle: '',
      color: 'from-cyan-400 to-cyan-600',
      icon: <Star className="w-5 h-5" />
    }
  ];

  const statsCards = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12%',
      isPositive: true,
      subtitle: 'vs last month',
      icon: <Users className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: "Today's Appointments",
      value: '28',
      change: '+3',
      isPositive: true,
      subtitle: 'vs last month',
      icon: <Calendar className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Active Cases',
      value: '89',
      change: '-5%',
      isPositive: false,
      subtitle: 'vs last month',
      icon: <Activity className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Avg. Wait Time',
      value: '15 min',
      change: '-2 min',
      isPositive: true,
      subtitle: 'vs last month',
      icon: <Clock className="w-8 h-8 text-blue-500" />,
      bgColor: 'bg-blue-50'
    }
  ];

  const scheduleData = [
    { period: 'Morning', patients: 8 },
    { period: 'Afternoon', patients: 12 },
    { period: 'Evening', patients: 8 }
  ];

  const performanceMetrics = [
    { label: 'Patient Satisfaction', value: '4.8/5.0', color: 'text-green-600' },
    { label: 'Attendance Rate', value: '94%', color: 'text-green-600' },
    { label: 'New Patients', value: '+18%', color: 'text-green-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'follow-up':
        return 'bg-yellow-100 text-yellow-700';
      case 'discharged':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
    
      <div className="flex">
        {/* Sidebar */}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-gray-600 mt-1">Welcome back, Dr. Ateeq. Here's your practice summary.</p>
              </div>
              <div className="flex items-center space-x-3">
                <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Patient</span>
                </button>
              </div>
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  <span>Monthly Analytics Overview</span>
                </h3>
                <p className="text-sm text-gray-500 mt-1">Comprehensive insights for October 2025</p>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {analyticsCards.map((card, index) => (
                <div key={index} className="relative">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-sm text-gray-600">{card.title}</span>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                      {card.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-1">{card.value}</div>
                  <div className="text-sm text-gray-500">{card.change}</div>
                  <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r ${card.color} rounded-full`} style={{ width: '75%' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            {statsCards.map((card, index) => (
              <div key={index} className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-gray-600">{card.title}</span>
                  <div className={`p-2 rounded-lg ${card.bgColor}`}>
                    {card.icon}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
                <div className="flex items-center space-x-1 text-sm">
                  {card.isPositive ? (
                    <ArrowUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <ArrowDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={card.isPositive ? 'text-green-600' : 'text-red-600'}>
                    {card.change}
                  </span>
                  <span className="text-gray-500">{card.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Schedule, Activity, Performance */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Your appointments for today</p>
              
              <div className="space-y-3">
                {scheduleData.map((slot, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-600">{slot.period}</span>
                    <span className="text-sm font-semibold text-gray-900">{slot.patients} patients</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium">
                View Full Schedule
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Activity className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">Latest patient updates</p>
              
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full ${activity.color} mt-2`}></div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              </div>
              <p className="text-sm text-gray-500 mb-4">This month's metrics</p>
              
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">{metric.label}</span>
                      <span className={`text-sm font-semibold ${metric.color}`}>{metric.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg font-medium">
                View Analytics
              </button>
            </div>
          </div>

          {/* Patient Records */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setActiveTab('patients')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activeTab === 'patients'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Patients
                  </button>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      activeTab === 'appointments'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Appointments
                  </button>
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Advanced Filters</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Records</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Patient</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Age/Gender</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Condition</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Last Visit</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPatients.map((patient) => (
                      <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-blue-600">{patient.initials}</span>
                            </div>
                            <span className="font-medium text-gray-900">{patient.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{patient.id}</td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {patient.age} / {patient.gender}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-900">{patient.condition}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">{patient.lastVisit}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;