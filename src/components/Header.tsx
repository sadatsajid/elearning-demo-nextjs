'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { user, logout, isAdmin, isStudent } = useAuth();

    return (
        <header className="bg-indigo-800 text-white">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <span className="text-xl font-bold">E-Learning Platform</span>
                        </Link>

                        <div className="hidden md:block ml-10">
                            <div className="flex items-baseline space-x-4">
                                <Link
                                    href="/courses"
                                    className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                                >
                                    Courses
                                </Link>
                            </div>
                        </div>

                        {user && (
                            <div className="hidden md:block ml-10">
                                <div className="flex items-baseline space-x-4">
                                    <Link
                                        href="/profile"
                                        className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                                    >
                                        Profile
                                    </Link>

                                    {isAdmin && (
                                        <Link
                                            href="/admin"
                                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                                        >
                                            Admin Dashboard
                                        </Link>
                                    )}

                                    {isStudent && (
                                        <Link
                                            href="/"
                                            className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                                        >
                                            My Courses
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center">
                                <span className="mr-4 text-sm">
                                    Hello, {user.username}
                                    {isAdmin && <span className="ml-1 text-xs">(Admin)</span>}
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-white hover:bg-gray-200 text-indigo-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex space-x-2">
                                {/* <Link 
                  href="/login" 
                  className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500"
                >
                  Login
                </Link> */}
                                <Link
                                    href="/login"
                                    className="bg-white hover:bg-gray-200 text-indigo-800 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}
