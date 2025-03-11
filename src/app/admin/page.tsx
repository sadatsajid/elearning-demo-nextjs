'use client';

import { useAuth } from '@/context/AuthContext';
import RoleGuard from '@/components/RoleGuard';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  
  return (
    <RoleGuard allowedRole="admin">
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Administrator Dashboard</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Welcome, {user?.username}</p>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-blue-800 mb-2">User Management</h4>
                    <p className="text-blue-600 mb-4">Manage students and other admin users</p>
                    <ul className="list-disc list-inside text-blue-700 space-y-1">
                      <li>View all users</li>
                      <li>Edit user permissions</li>
                      <li>Manage role assignments</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h4 className="text-lg font-semibold text-purple-800 mb-2">Content Management</h4>
                    <p className="text-purple-600 mb-4">Manage platform content and settings</p>
                    <ul className="list-disc list-inside text-purple-700 space-y-1">
                      <li>Create and edit courses</li>
                      <li>Manage lessons and materials</li>
                      <li>Review and approve content</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200">
                <Link 
                  href="/profile" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  View your profile →
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}