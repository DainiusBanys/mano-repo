// components/NormalizerInterface.tsx (UI/UX POLISHED VERSION)

'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Interface definitions remain the same...
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

    // Function to call the Normalizer API (No change here)
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
            const response = await axios.post(
                `${API_BASE_URL}/normalizer/process`,
                { rawInput },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setResult(response.data.result);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                setError(err.response.data.msg || 'Processing failed.');
            } else {
                setError('A network or server error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Placeholder function for the Fulfillment API
    const handleFulfill = () => {
        // In a future step, this will call the /api/fulfillment/submit endpoint
        alert(`Submitting clean data: "${result?.cleaned}" for Printify fulfillment!`);
    };

    return (
        <div className="mt-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
            {/* LEFT COLUMN: Input and Controls */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">1. Customer Input</h2>

                {/* Subscription Warning */}
                {!user?.isSubscribed && (
                    <div className="p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                        <p className="font-bold">Access Warning:</p>
                        <p>This tool is locked until your subscription is **ACTIVE**.</p>
                    </div>
                )}

                {/* Input Form */}
                <form onSubmit={handleProcess} className="p-4 bg-white shadow-lg rounded-lg border border-gray-200">
                    <label htmlFor="rawInput" className="block text-sm font-medium text-gray-700 mb-2">
                        Paste Raw Personalization Data (Max 256 chars)
                    </label>
                    <textarea
                        id="rawInput"
                        rows={6} // Increased height for better view
                        value={rawInput}
                        onChange={(e) => setRawInput(e.target.value)}
                        className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., 'Name are Shadow and Mittens. Dates must be 2021-Present'"
                        maxLength={256}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading || !user?.isSubscribed} // Disabled if not subscribed!
                        className="mt-4 w-full py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Analyzing...' : 'Normalize & Validate Data'}
                    </button>
                </form>

                {error && (
                    <div className="p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                        <p className="font-bold">Error:</p>
                        <p>{error}</p>
                    </div>
                )}
            </div>

            {/* RIGHT COLUMN: Results and Proof */}
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-800">2. PrintAssist AI Output (Validated)</h2>

                {result ? (
                    <div className="p-6 bg-white shadow-lg rounded-lg border border-green-300">
                        <h3 className="text-xl font-bold mb-3 text-green-700 flex items-center">
                            <span className="text-2xl mr-2">✅</span> Normalized Data Ready!
                        </h3>

                        {/* Cleaned String Output */}
                        <div className="mb-4">
                            <p className="text-sm font-medium text-gray-600 mb-1">Cleaned String (Ready for Print):</p>
                            <div className="bg-gray-100 p-3 rounded shadow-inner border border-dashed border-gray-400">
                                <p className="text-lg font-mono text-gray-900">{result.cleaned}</p>
                            </div>
                        </div>

                        {/* Structured Data */}
                        <div className="mb-6">
                            <h4 className="text-md font-medium mb-1">Structured Data:</h4>
                            <ul className="text-sm space-y-1 text-gray-700">
                                <li><strong>Names:</strong> {result.structure.names.join(', ') || 'N/A'}</li>
                                <li><strong>Dates:</strong> {result.structure.dates.join(', ') || 'N/A'}</li>
                                <li><strong>Raw Input:</strong> <em className="text-gray-500">{result.raw}</em></li>
                            </ul>
                        </div>

                        {/* Fulfillment Button */}
                        <button
                            onClick={handleFulfill}
                            className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700"
                        >
                            Submit to Print Provider (Final Step)
                        </button>

                    </div>
                ) : (
                    <div className="p-6 bg-gray-50 shadow-lg rounded-lg border border-gray-300 text-center text-gray-500">
                        Processed output will appear here after validation.
                        <div className="mt-4 h-32 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                )}

                {/* Print Proof Mockup Area (Mimics the "After" image) */}
                <div className="p-4 bg-gray-900 shadow-xl rounded-lg text-center">
                    <p className="text-white text-md font-medium mb-2">Instant Print Proof Mockup</p>
                    <div className="h-48 w-full bg-white rounded-lg flex items-center justify-center text-gray-400">
                        [Image Mockup Placeholder]
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NormalizerInterface;