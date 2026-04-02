'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function withAuth(Component: any, requireAdmin = false) {
  return function ProtectedRoute(props: any) {
    const { isAuthenticated, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!isAuthenticated) {
          router.replace('/login');
        } else if (requireAdmin && !isAdmin) {
          router.replace('/');
        }
      }
    }, [isAuthenticated, isAdmin, loading, router]);

    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center bg-background">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      );
    }

    if (!isAuthenticated || (requireAdmin && !isAdmin)) {
      return null;
    }

    return <Component {...props} />;
  };
}
