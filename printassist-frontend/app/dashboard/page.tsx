'use client';

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import NormalizerInterface from '@/components/NormalizerInterface'; // <--- NEW IMPORT

// The core component containing the dashboard content
const DashboardContent = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                {/* Ensure the h1 and p are dark */}
                <h1 className="text-3xl font-bold text-indigo-700">PrintAssist AI Dashboard</h1>
                <div className="flex items-center space-x-4">
                    {/* *** FIX: Ensure this text is dark *** */}
                    <p className="text-gray-800">Logged in as: <span className="font-semibold">{user?.email}</span></p>
                    <button
                        onClick={logout}
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        Log Out
                    </button>
                </div>
            </header>

            <section className="mb-8 max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Account Status:</h2>
                {/* *** FIX: Ensure this text is dark *** */}
                <p className="text-gray-800">Your subscription is currently:
                    <span className={`font-extrabold ${user?.isSubscribed ? 'text-green-600' : 'text-yellow-600'}`}>
                        {user?.isSubscribed ? ' ACTIVE' : ' TRIALING / CANCELED'}
                    </span>
                </p>
            </section>

            {/* INTEGRATE THE CORE TOOL */}
            <NormalizerInterface />

        </div>
    );
};

// The page component uses the ProtectedRoute wrapper
export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}