// components/NormalizerInterface.tsx

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface NormalizedResult {
    raw: string;
    cleaned: string;
    structure: {
        names: string[];
        dates: string[];
        message: string | null;
    };
}

const NormalizerInterface: React.FC = () => {
    const { token, isAuthenticated, user } = useAuth();
    const [rawInput, setRawInput] = useState('');
    const [result, setResult] = useState<NormalizedResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleProcess = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setResult(null);

        if (!rawInput.trim()) {
            setError('Please enter personalization data.');
            return;
        }

        if (!isAuthenticated || !token) {
            setError('Authentication error. Please log in again.');
            return;
        }

        setLoading(true);

        try {
            // Include JWT token in the request header
            const response = await axios.post(
                `${API_BASE_URL}/normalizer/process`,
                { rawInput },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setResult(response.data.result);

        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                // Catches the 403 Forbidden error from your backend paywall
                setError(err.response.data.msg || 'Processing failed.');
            } else {
                setError('A network or server error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">1. Data Normalization Tool</h2>

            {!user?.isSubscribed && (
                <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                    <p className="font-bold">Access Warning:</p>
                    <p>Your current status is **Trialing**. This tool is protected by the subscription paywall.</p>
                </div>
            )}

            <form onSubmit={handleProcess} className="mb-8 p-6 bg-white shadow-lg rounded-lg">
                <label htmlFor="rawInput" className="block text-lg font-medium text-gray-700 mb-2">
                    Paste Raw Personalization Data (e.g., "Name are Max and Shadow. Dates must be 2021-Present")
                </label>
                <textarea
                    id="rawInput"
                    rows={4}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter customer input here..."
                    required
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? 'Processing...' : 'Normalize Data'}
                </button>
            </form>

            {error && (
                <div className="p-4 mb-4 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p className="font-bold">Error:</p>
                    <p>{error}</p>
                </div>
            )}

            {result && (
                <div className="p-6 bg-green-50 shadow-lg rounded-lg border border-green-300">
                    <h3 className="text-2xl font-semibold mb-3 text-green-700">✅ Normalized Output:</h3>

                    <div className="bg-white p-3 rounded mb-4 shadow-sm">
                        <p className="text-sm text-gray-600 mb-1">Cleaned String (Ready for Print):</p>
                        <p className="text-lg font-mono text-gray-900 border-dashed border-2 p-2">{result.cleaned}</p>
                    </div>

                    <h4 className="text-lg font-medium mb-2">Structured Data:</h4>
                    <ul className="space-y-1 text-gray-800">
                        <li><strong>Names:</strong> {result.structure.names.join(', ')}</li>
                        <li><strong>Dates:</strong> {result.structure.dates.join(', ') || 'N/A'}</li>
                        <li><strong>Raw Input:</strong> <em className="text-gray-500">{result.raw}</em></li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default NormalizerInterface;