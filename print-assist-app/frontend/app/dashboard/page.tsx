'use client';

import { useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import NormalizerInterface from '@/components/NormalizerInterface';
import axios from 'axios';
import { useState } from 'react';

const DashboardContent = () => {
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            // Debug: Log the token to make sure it's not null
            console.log("Using token for upgrade:", token);

            if (!token) {
                alert("Session expired. Please log in again.");
                return;
            }

            const response = await axios.post(
                'http://localhost:5000/api/subscribe/checkout',
                {}, // Empty body
                {
                    headers: {
                        // CRITICAL: Ensure 'Bearer' is capitalized and followed by a space
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error: any) {
            console.error("Stripe Checkout Error:", error);
            // If the error is 401, it's definitely an auth issue
            if (error.response?.status === 401) {
                alert("Your session has expired. Please log out and back in.");
            } else {
                alert("Failed to initiate checkout. Check backend logs.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <header className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-indigo-700">PrintAssist AI Dashboard</h1>
                <div className="flex items-center space-x-4">
                    <p className="text-gray-800">Logged in as: <span className="font-semibold">{user?.email}</span></p>
                    <button
                        onClick={logout}
                        className="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        Log Out
                    </button>
                </div>
            </header>

            <section className="mb-8 max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Account Status:</h2>
                    <p className="text-gray-800">Your subscription is currently:
                        <span className={`font-extrabold ${user?.isSubscribed ? 'text-green-600' : 'text-yellow-600'}`}>
                            {user?.isSubscribed ? ' ACTIVE' : ' TRIALING / CANCELED'}
                        </span>
                    </p>
                </div>

                {/* SHOW UPGRADE BUTTON ONLY IF NOT SUBSCRIBED */}
                {!user?.isSubscribed && (
                    <button
                        onClick={handleUpgrade}
                        disabled={loading}
                        className="py-2 px-6 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Connecting...' : 'Upgrade to Premium'}
                    </button>
                )}
            </section>

            {/* THE CORE TOOL */}
            <NormalizerInterface />
        </div>
    );
};

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}