// components/ProtectedRoute.tsx

'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isAuthenticated, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // This runs once on mount and whenever isAuthenticated or token changes
        if (typeof window !== 'undefined' && !isAuthenticated) {
            // Check localStorage as a fallback, then redirect
            const storedToken = localStorage.getItem('token');
            if (!storedToken) {
                // User is NOT logged in. Send them to the login page.
                router.replace('/login');
            }
        }
    }, [isAuthenticated, router, token]);

    // If not authenticated, we display nothing while redirecting to avoid flickering.
    if (!isAuthenticated) {
        return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
    }

    // If authenticated, render the children (the actual dashboard content)
    return <>{children}</>;
};