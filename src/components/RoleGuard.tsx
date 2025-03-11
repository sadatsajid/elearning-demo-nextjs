'use client';

import { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface RoleGuardProps {
  children: ReactNode;
  allowedRole: 4 | 3 | any;
  redirectTo?: string;
}

export default function RoleGuard({
  children,
  allowedRole,
  redirectTo = '/login'
}: RoleGuardProps) {
  const { user, isLoading, isAdmin, isStudent, checkPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push(redirectTo);
      return;
    }

    // If any authenticated user is allowed
    if (allowedRole === 'any') return;

    // Check if the user has the required role
    const hasPermission = allowedRole === 4 ? isAdmin :
      allowedRole === 'student' ? isStudent : false;

    if (!hasPermission) {
      router.push(isAdmin ? '/admin' : '/profile');
    }
  }, [user, isLoading, allowedRole, redirectTo, router, isAdmin, isStudent]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  // If any authenticated user is allowed or the user has the required role
  if (allowedRole === 'any' ||
    (allowedRole === 'admin' && isAdmin) ||
    (allowedRole === 'student' && isStudent)) {
    return <>{children}</>;
  }

  return null; // Will redirect to appropriate dashboard
}