'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import { fetchUserProfile } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface User {
  id: number;
  username: string;
  email: string;
  role: {
    id: number;
    name: string;
    type: string;
    description: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkPermission: (requiredRole: string) => boolean;
}

// Create context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getCookie('token') as string | undefined;

      if (storedToken) {
        setToken(storedToken);
        try {
          const userData = await fetchUserProfile(storedToken);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user data', error);
          deleteCookie('token');
          setToken(null);
        }
      }

      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (newToken: string) => {
    setToken(newToken);
    setCookie('token', newToken, { maxAge: 60 * 60 * 24 * 7 }); // 7 days

    try {
      const userData = await fetchUserProfile(newToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data after login', error);
      throw error;
    }
  };

  const logout = () => {
    deleteCookie('token');
    setToken(null);
    setUser(null);
    router.push('/login');
  };

  const isAdmin = user?.role?.type === 'admin';
  const isStudent = user?.role?.type === 'student';

  // Function to check if user has required role
  const checkPermission = (requiredRole: string): boolean => {
    if (!user) return false;

    // Admin has access to everything
    if (user.role?.type === 'admin') return true;

    // Check if user has the required role
    return user.role?.type === requiredRole;
  };

  const value = {
    user,
    token,
    isLoading,
    isAdmin,
    isStudent,
    login,
    logout,
    checkPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};