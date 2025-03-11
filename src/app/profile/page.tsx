'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';
import RoleGuard from '@/components/RoleGuard';

export default function ProfilePage() {
  const { user, isAdmin } = useAuth();
  
  return (
    <RoleGuard allowedRole="any">
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and information</p>
              </div>
              
              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Username</h4>
                    <p className="mt-1 text-sm text-gray-900">{user?.username}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email address</h4>
                    <p className="mt-1 text-sm text-gray-900">{user?.email}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">User ID</h4>
                    <p className="mt-1 text-sm text-gray-900">{user?.id}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Account type</h4>
                    <p className="mt-1 text-sm text-gray-900">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user?.role?.type === 'admin'
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user?.role?.type === 'admin' ? 'Administrator' : 'Student'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-4 sm:px-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  This is a prototype for the E-Learning Platform.
                </p>
                
                {isAdmin && (
                  <Link 
                    href="/admin" 
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Go to Admin Dashboard →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </RoleGuard>
  );
}