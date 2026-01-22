'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/contexts/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

/**
 * ProtectedRoute component - handles authentication guards
 * 
 * @param requireAuth - If true, requires authentication. If false, redirects authenticated users away.
 * @param redirectTo - Custom redirect path (default: '/login' for protected, '/' for auth pages)
 */
export function ProtectedRoute({
  children,
  redirectTo,
  requireAuth = true,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // Wait for auth to load

    if (requireAuth) {
      // Protected route - require authentication
      if (!isAuthenticated) {
        const currentPath = window.location.pathname;
        router.push(redirectTo || `/auth?returnUrl=${encodeURIComponent(currentPath)}`);
      }
    } else {
      // Auth pages - redirect if already authenticated
      if (isAuthenticated) {
        router.push(redirectTo || '/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Protected route - don't render if not authenticated
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Auth pages - don't render if already authenticated
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
