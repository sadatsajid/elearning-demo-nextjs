'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import RoleGuard from '@/components/RoleGuard';
import Link from 'next/link';
import { 
  FiUsers, FiBookOpen, FiSettings, FiHome, FiMessageSquare, 
  FiCalendar, FiLogOut, FiList, FiEdit, FiCheckSquare, 
  FiPieChart, FiActivity, FiUser, FiMail, FiBell
} from 'react-icons/fi';

export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dummy data for the dashboard
  const analytics = {
    totalStudents: 1247,
    totalCourses: 38,
    activeUsers: 843,
    completionRate: 78,
    coursesThisMonth: 5,
    revenue: 12840
  };
  
  const recentActivities = [
    { id: 1, user: 'Sarah Johnson', action: 'Enrolled in "Advanced React Patterns"', time: 'Just now', avatar: '/api/placeholder/32/32' },
    { id: 2, user: 'Michael Chen', action: 'Completed "JavaScript Fundamentals"', time: '15 mins ago', avatar: '/api/placeholder/32/32' },
    { id: 3, user: 'Emma Wilson', action: 'Posted a review for "Node.js Masterclass"', time: '32 mins ago', avatar: '/api/placeholder/32/32' }
  ];
  
  return (
    <RoleGuard allowedRole="admin">
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-indigo-800 text-white">
          <Link href="/profile" className="p-4 flex items-center">
            <span className="text-xl font-bold">E-Learning</span>
          </Link>
          
          <nav className="mt-6">
            <div className="px-4 py-3">
              <button 
                className={`flex items-center w-full py-2 px-4 rounded-md transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <FiHome className="mr-3" />
                Dashboard
              </button>
            </div>
            
            <div className="px-4 py-3">
              <button 
                className={`flex items-center w-full py-2 px-4 rounded-md transition-colors ${activeTab === 'users' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('users')}
              >
                <FiUsers className="mr-3" />
                Users
              </button>
            </div>
            
            <div className="px-4 py-3">
              <button 
                className={`flex items-center w-full py-2 px-4 rounded-md transition-colors ${activeTab === 'courses' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('courses')}
              >
                <FiBookOpen className="mr-3" />
                Courses
              </button>
            </div>
            
            <div className="px-4 py-3">
              <button 
                className={`flex items-center w-full py-2 px-4 rounded-md transition-colors ${activeTab === 'messages' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('messages')}
              >
                <FiMessageSquare className="mr-3" />
                Messages
              </button>
            </div>
            
            <div className="px-4 py-3">
              <button 
                className={`flex items-center w-full py-2 px-4 rounded-md transition-colors ${activeTab === 'calendar' ? 'bg-indigo-700' : 'hover:bg-indigo-700'}`}
                onClick={() => setActiveTab('calendar')}
              >
                <FiCalendar className="mr-3" />
                Calendar
              </button>
            </div>
            
            <div className="px-4 py-3">
              <Link 
                href="/profile"
                className="flex items-center w-full py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <FiUser className="mr-3" />
                Profile
              </Link>
            </div>
            
            <div className="px-4 py-3">
              <button 
                onClick={logout}
                className="flex items-center w-full py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                <FiLogOut className="mr-3" />
                Log out
              </button>
            </div>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-x-hidden overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-sm">
            <div className="flex items-center justify-between p-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.username}</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <FiMail className="h-6 w-6 text-gray-500" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="relative">
                  <FiBell className="h-6 w-6 text-gray-500" />
                  <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </div>
                <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <main className="p-6">
            {/* Welcome Card */}
            <div className="bg-indigo-700 rounded-lg p-6 text-white mb-6">
              <h2 className="text-xl font-semibold">Hello {user?.username}</h2>
              <p className="mt-1">Here are your important tasks and reports. Please check the latest course submissions.</p>
            </div>
            
            {/* Analytics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-900">{analytics.totalStudents}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiUsers className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm font-medium">+12% </span>
                  <span className="text-gray-500 text-sm">from last month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Active Users</p>
                    <h3 className="text-2xl font-bold text-gray-900">{analytics.activeUsers}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                    <FiActivity className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <span className="text-green-500 text-sm font-medium">+5% </span>
                  <span className="text-gray-500 text-sm">from last week</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Course Completion</p>
                    <h3 className="text-2xl font-bold text-gray-900">{analytics.completionRate}%</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <FiPieChart className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${analytics.completionRate}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Management Section */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiUsers className="mr-2 text-blue-600" />
                    User Management
                  </h4>
                  <p className="text-gray-600 mb-4">Manage students and other admin users</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <FiList className="mr-2 text-blue-600" />
                      View all users
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiEdit className="mr-2 text-blue-600" />
                      Edit user permissions
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiCheckSquare className="mr-2 text-blue-600" />
                      Manage role assignments
                    </li>
                  </ul>
                  <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Manage Users
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiBookOpen className="mr-2 text-purple-600" />
                    Content Management
                  </h4>
                  <p className="text-gray-600 mb-4">Manage platform content and settings</p>
                  <ul className="space-y-2">
                    <li className="flex items-center text-gray-700">
                      <FiList className="mr-2 text-purple-600" />
                      Create and edit courses
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiEdit className="mr-2 text-purple-600" />
                      Manage lessons and materials
                    </li>
                    <li className="flex items-center text-gray-700">
                      <FiCheckSquare className="mr-2 text-purple-600" />
                      Review and approve content
                    </li>
                  </ul>
                  <button className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                    Manage Content
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiSettings className="mr-2 text-orange-600" />
                    Platform Settings
                  </h4>
                  <p className="text-gray-600 mb-4">Configure platform behavior and options</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Enable discussion forums</span>
                      <div className="relative inline-block w-10 h-6 rounded-full bg-gray-200">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-indigo-600 shadow-md transform translate-x-4"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Student enrollment approval</span>
                      <div className="relative inline-block w-10 h-6 rounded-full bg-gray-200">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-gray-400 shadow-md"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Auto-generate certificates</span>
                      <div className="relative inline-block w-10 h-6 rounded-full bg-gray-200">
                        <div className="absolute left-0 w-6 h-6 rounded-full bg-indigo-600 shadow-md transform translate-x-4"></div>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors">
                    View All Settings
                  </button>
                </div>
                
                <div className="bg-white rounded-lg shadow p-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <FiPieChart className="mr-2 text-teal-600" />
                    Analytics & Reports
                  </h4>
                  <p className="text-gray-600 mb-4">View platform performance metrics</p>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Courses</p>
                      <p className="text-lg font-semibold">{analytics.totalCourses}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">New This Month</p>
                      <p className="text-lg font-semibold">{analytics.coursesThisMonth}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Completion</p>
                      <p className="text-lg font-semibold">{analytics.completionRate}%</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="text-lg font-semibold">${analytics.revenue}</p>
                    </div>
                  </div>
                  <button className="mt-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
                    View Full Reports
                  </button>
                </div>
              </div>
              
              {/* Activity Log */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-semibold text-gray-800">Activity Log</h4>
                  <button className="text-sm text-indigo-600 hover:text-indigo-800">View All</button>
                </div>
                
                <div className="space-y-6">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                        <img src={activity.avatar} alt={activity.user} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                        <p className="text-sm text-gray-500">{activity.action}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h5 className="text-sm font-medium text-gray-700 mb-4">Quick Stats</h5>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs text-gray-700 mb-1">
                        <span>Course Enrollments</span>
                        <span>85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-700 mb-1">
                        <span>Course Completions</span>
                        <span>62%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '62%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-700 mb-1">
                        <span>Student Satisfaction</span>
                        <span>92%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}