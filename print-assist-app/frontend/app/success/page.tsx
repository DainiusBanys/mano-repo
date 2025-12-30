"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

export default function SuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [status, setStatus] = useState("Verifying your payment...");
    const { refreshUser } = useAuth(); // Import the hook

    useEffect(() => {
        const verifyPayment = async () => {
            const token = localStorage.getItem("token");

            // 1. Construct the URL properly outside the axios call
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/verify-session?session_id=${sessionId}`;
            console.log("Requesting verification from:", url);

            try {
                // 2. Pass the URL and the headers as separate arguments
                await axios.get(url, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setStatus("Success! Your Premium features are now active.");
            } catch (err) {
                console.error("Verification error:", err);
                setStatus("Verification failed. Please contact support.");
            }
        };

        if (sessionId) verifyPayment();
    }, [sessionId]);

    useEffect(() => {
        const verifyPayment = async () => {
            const token = localStorage.getItem("token");
            const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/subscribe/verify-session?session_id=${sessionId}`;

            try {
                await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });

                // 🚀 REFRESH THE USER CONTEXT HERE
                await refreshUser();

                setStatus("Success! Your Premium features are now active.");
            } catch (err) {
                setStatus("Verification failed.");
            }
        };
        if (sessionId) verifyPayment();
    }, [sessionId, refreshUser]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">{status}</h1>
            <button
                onClick={() => window.location.href = "/dashboard"}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
                Go to Dashboard
            </button>
        </div>
    );
}