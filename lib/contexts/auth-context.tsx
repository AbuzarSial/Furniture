'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string; // Base64 or URL
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
  continueAsGuest: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get initial user from localStorage
function getInitialUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const storedUser = localStorage.getItem('furniture_user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('furniture_user');
    }
  }
  return null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call an API
    // password parameter kept for interface compatibility but not used in mock
    void password; // Explicitly mark as intentionally unused
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock user data
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0] || 'User',
      email: email,
    };

    setUser(mockUser);
    localStorage.setItem('furniture_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signup = async (name: string, email: string) => {
    // Mock authentication - in real app, this would call an API
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock user data - profile automatically created with signup name and email
    const mockUser: User = {
      id: Date.now().toString(),
      name: name,
      email: email,
      // No profile picture at signup
    };

    setUser(mockUser);
    localStorage.setItem('furniture_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const updateProfile = async (updates: Partial<User>) => {
    // Mock profile update - in real app, this would call an API
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (user) {
      const updatedUser: User = {
        ...user,
        ...updates,
      };

      setUser(updatedUser);
      localStorage.setItem('furniture_user', JSON.stringify(updatedUser));
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('furniture_user');
    router.push('/');
  };

  const continueAsGuest = () => {
    // Mark as guest checkout - no user set
    // Cart will still work via localStorage
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        updateProfile,
        logout,
        continueAsGuest,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
