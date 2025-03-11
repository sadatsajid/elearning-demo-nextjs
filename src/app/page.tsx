'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Link from 'next/link';

export default function HomePage() {
  const { user, isLoading, isAdmin } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  
  // Set mounted after initial render for animations
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Redirect authenticated users to their appropriate dashboard
  useEffect(() => {
    if (!isLoading && user) {
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/profile');
      }
    }
  }, [user, isLoading, isAdmin, router]);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <Header />
      <main>
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 
              className={`text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl
                ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                transition-all duration-700 ease-out`}
            >
              E-Learning Platform
            </h1>
            <p 
              className={`mt-5 max-w-xl mx-auto text-xl text-gray-500
                ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                transition-all duration-700 delay-300 ease-out`}
            >
              A modern learning experience with Next.js and Strapi
            </p>
            
            <div 
              className={`mt-10
                ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                transition-all duration-700 delay-500 ease-out`}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              ) : user ? (
                <p className="text-gray-600">
                  <span className="inline-block animate-pulse">Redirecting to your dashboard...</span>
                </p>
              ) : (
                <div className="space-x-4">
                  <Link
                    href="/login"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 hover:scale-105 transition-transform duration-300"
                  >
                    <span className="relative">
                      Login
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                  <Link
                    href="/register"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="hidden sm:block">
          <div className={`absolute top-20 left-10 w-12 h-12 rounded-full bg-indigo-100 opacity-70 
            ${mounted ? 'scale-100' : 'scale-0'} 
            transition-transform duration-1000 delay-300`}>
          </div>
          <div className={`absolute bottom-20 right-10 w-24 h-24 rounded-full bg-indigo-50 opacity-70 
            ${mounted ? 'scale-100' : 'scale-0'} 
            transition-transform duration-1000 delay-500`}>
          </div>
          <div className={`absolute top-1/3 right-1/4 w-8 h-8 rounded-full bg-indigo-100 opacity-60 
            ${mounted ? 'scale-100' : 'scale-0'} 
            transition-transform duration-1000 delay-700`}>
          </div>
        </div>
      </main>
    </div>
  );
}