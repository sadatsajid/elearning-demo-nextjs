'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import Image from 'next/image';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: number;
  marketing: boolean;
}

export default function RegisterPage() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: {
      role: 3,
      marketing: true
    }
  });
  const [error] = useState<string | null>(null);
  const [isLoading] = useState(false);
//   const { login } = useAuth();

  const password = watch('password', '');

  const onSubmit = async () => {
    return
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
                href="/login" 
                className="ml-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
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

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h1 className="mt-6 text-left text-3xl font-bold text-gray-900">
                Sign up to start learning
              </h1>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    {...register('username', { required: 'Username is required' })}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Full name"
                    disabled={isLoading}
                  />
                  {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                </div>
                
                <div>
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
                    placeholder="Email"
                    disabled={isLoading}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                
                <div className="hidden">
                  <select
                    id="role"
                    {...register('role', { required: 'Role is required' })}
                    disabled={isLoading}
                  >
                    <option value={3}>Student</option>
                    <option value={4}>Administrator</option>
                  </select>
                </div>
                
                <div>
                  <input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                    disabled={isLoading}
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                
                <div>
                  <input
                    id="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: value => value === password || 'Passwords do not match'
                    })}
                    className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm Password"
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                
                {/* <div className="flex items-center">
                  <input
                    id="marketing"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    {...register('marketing')}
                  />
                  <label htmlFor="marketing" className="ml-2 block text-sm text-gray-700">
                    Send me special offers, personalized recommendations, and learning tips.
                  </label>
                </div> */}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating account...
                    </>
                  ) : (
                    <>
                      Register
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* <div className="relative mt-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Other sign up options</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#4285F4" />
                  <path d="M12.545,23.379c2.609,0,4.785-0.853,6.374-2.31l-3.139-2.435c-0.869,0.587-1.99,0.931-3.235,0.931c-2.486,0-4.608-1.677-5.357-3.933l-3.451,2.652C5.715,21.106,8.9,23.379,12.545,23.379z" fill="#34A853" />
                  <path d="M7.188,15.632c-0.195-0.588-0.304-1.214-0.304-1.859c0-0.645,0.109-1.271,0.304-1.859l-3.458-2.652c-0.747,1.481-1.169,3.151-1.169,4.911c0,1.76,0.422,3.43,1.169,4.911L7.188,15.632z" fill="#FBBC05" />
                  <path d="M12.545,7.727c1.403,0,2.657,0.482,3.649,1.436l2.497-2.497C17.051,5.057,14.945,4.273,12.545,4.273c-3.645,0-6.83,2.273-8.088,5.576l3.458,2.652C8.596,9.403,10.717,7.727,12.545,7.727z" fill="#EA4335" />
                </svg>
              </button>
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mx-auto" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24,12.073c0,-6.627 -5.373,-12 -12,-12c-6.627,0 -12,5.373 -12,12c0,5.99 4.388,10.954 10.125,11.854l0,-8.385l-3.047,0l0,-3.469l3.047,0l0,-2.642c0,-3.007 1.791,-4.669 4.533,-4.669c1.312,0 2.686,0.235 2.686,0.235l0,2.953l-1.513,0c-1.491,0 -1.956,0.925 -1.956,1.874l0,2.249l3.328,0l-0.532,3.469l-2.796,0l0,8.385c5.737,-0.9 10.125,-5.864 10.125,-11.854Z" />
                </svg>
              </button>
              <button
                type="button"
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg className="h-5 w-5 mx-auto" fill="#000000" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.05,12.536c0.012,2.966,2.613,3.99,2.613,3.99c-0.04,0.153-0.777,2.607-2.588,3.853c-1.506,1.463-3.142,1.214-3.824,1.107c-1.766-0.219-2.536-1.044-3.325-1.044C9.146,20.442,8.28,21,8.28,21c-1.07,0.041-2.587-1.176-3.923-3.218C2.938,15.557,2.651,12.666,3.62,11c1.082-1.862,3.008-1.892,3.008-1.892c1.196-0.083,2.465,0.76,2.465,0.76c0.734,0.516,1.241,0.516,1.241,0.516c0,0,0.93-1.384-0.232-2.72c-1.062-1.22-2.647-1.086-3.155-0.99c-1.287,0.239-2.484,1.132-3.131,1.134c-0.597,0.002-1.347-0.42-2.093-1.139C1.723,6.669,1,6.84,1,6.84c0.024,0.149,0.195,1.076,0.737,2.122c0.541,1.046,1.123,1.923,1.123,1.923c0,0,0.849-0.614,1.428-0.614c0.579,0,0.825,0.615,0.825,0.615c0,0,0.08,0.782,0.12,1.941c0.044,1.203,0.156,2.597,0.156,2.597s0.328-1.291,1.201-1.291c0.766,0,1.163,0.829,1.163,0.829s0.166-3.061-0.233-4.729c-0.345-1.452-1.744-3.095-1.744-3.095s1.499-1.785,2.873-1.882c1.672-0.115,3.343,0.962,3.343,0.962s1.499,0.961,3.11,0.701c1.263-0.201,2.465-1.028,2.465-1.028s0.688,0.808,0.733,2.022c0.047,1.264-0.49,2.157-0.49,2.157s-0.968-0.809-1.928-0.716c-0.962,0.092-1.632,0.553-1.632,0.553s-0.551,0.461-0.551,1.315c0,0.877,0.551,0.969,0.551,0.969s0.459,0.111,0.91-0.111c0.513-0.252,0.97-0.968,0.97-0.968s0.735,0.115,1.287,0.645c0.55,0.53,1.149,1.722,1.149,1.722"/>
                </svg>
              </button>
            </div> */}

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>
                By signing up, you agree to our{' '}
                <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}