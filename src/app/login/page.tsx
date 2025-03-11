'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { strapiLogin } from '@/lib/auth';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await strapiLogin(data.email, data.password);
      await login(response.jwt);
      router.push('/profile');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Header */}
      <div className="fixed top-0 w-full bg-white border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">E-Learning Platform</span>
              </Link>
            </div>
            <div>
              <Link 
                href="/register" 
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16">
        {/* Left Side - Illustration */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center bg-white">
          <div className="max-w-md">
            <Image 
              src="/api/placeholder/600/login-illustration.jpg" 
              alt="Learning illustration" 
              width={500} 
              height={500}
              className="mx-auto"
            />
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="mt-6 text-left text-3xl font-bold text-gray-900">
                Log in to continue your learning journey
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Email address"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    {...register('password', { required: 'Password is required' })}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account? <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</Link>
              </p>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}