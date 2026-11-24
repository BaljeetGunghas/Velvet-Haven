"use client";

import React, { useState, useEffect } from "react";
import { debugAuthToken, authHeader } from "@/app/Auth/AuthHeader/authHeader";
import axios from "axios";

const DebugAuthPage = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [testResult, setTestResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const addLog = (message: string) => {
        setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
    };

    useEffect(() => {
        addLog("🔍 Debug Auth Page Loaded");
        debugAuthToken();
    }, []);

    const testTokenPresence = () => {
        addLog("Testing token presence...");
        const headers = authHeader();

        if (headers.Authorization) {
            addLog("✅ Authorization header found");
            addLog(`Header: ${headers.Authorization.substring(0, 50)}...`);
        } else {
            addLog("❌ No Authorization header found");
        }

        // Check all storage
        const hasAuthTokenLS = localStorage.getItem("authToken");
        const hasTokenLS = localStorage.getItem("token");
        const hasAccessTokenLS = localStorage.getItem("access_token");

        addLog(`localStorage.authToken: ${hasAuthTokenLS ? "✅ Yes" : "❌ No"}`);
        addLog(`localStorage.token: ${hasTokenLS ? "✅ Yes" : "❌ No"}`);
        addLog(`localStorage.access_token: ${hasAccessTokenLS ? "✅ Yes" : "❌ No"}`);

        const cookies = document.cookie;
        addLog(`Cookies present: ${cookies.length > 0 ? "✅ Yes" : "❌ No"}`);
    };

    const testAPICall = async () => {
        setLoading(true);
        addLog("Testing API call with token...");

        try {
            const headers = authHeader();
            addLog(`Using headers: ${JSON.stringify(headers)}`);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user/getUserProfile`,
                {},
                { headers }
            );

            addLog("✅ API Response received");
            setTestResult({
                status: response.status,
                statusText: response.statusText,
                data: response.data,
            });

            if (response.data.output === -401) {
                addLog("❌ API returned output: -401 (Unauthorized)");
            } else if (response.data.output === 1) {
                addLog("✅ API returned output: 1 (Success)");
            }
        } catch (error: any) {
            addLog(`❌ API Error: ${error.message}`);
            setTestResult({
                error: error.message,
                status: error.response?.status,
                data: error.response?.data,
            });
        } finally {
            setLoading(false);
        }
    };

    const clearAllData = () => {
        addLog("🗑️ Clearing all auth data...");
        localStorage.clear();
        sessionStorage.clear();
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
        addLog("✅ All data cleared");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">🔐 Authentication Debug Panel</h1>

                {/* Controls */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <button
                        onClick={testTokenPresence}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all"
                    >
                        Test Token Presence
                    </button>
                    <button
                        onClick={testAPICall}
                        disabled={loading}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-all disabled:opacity-50"
                    >
                        {loading ? "Testing..." : "Test API Call"}
                    </button>
                    <button
                        onClick={clearAllData}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all"
                    >
                        Clear All Data
                    </button>
                </div>

                {/* Logs */}
                <div className="mb-8 p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h2 className="text-2xl font-bold mb-4">📋 Logs</h2>
                    <div className="space-y-2 font-mono text-sm max-h-96 overflow-y-auto">
                        {logs.length === 0 ? (
                            <p className="text-gray-500">No logs yet...</p>
                        ) : (
                            logs.map((log, idx) => (
                                <div key={idx} className="text-gray-300 border-l-2 border-blue-500 pl-3">
                                    {log}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Test Result */}
                {testResult && (
                    <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                        <h2 className="text-2xl font-bold mb-4">📊 Test Result</h2>
                        <pre className="bg-slate-900 p-4 rounded overflow-x-auto text-xs">
                            {JSON.stringify(testResult, null, 2)}
                        </pre>
                    </div>
                )}

                {/* Info */}
                <div className="mt-8 p-4 bg-blue-900/50 rounded-lg border border-blue-700">
                    <h3 className="text-lg font-bold mb-2">ℹ️ What to check:</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Is the token present in localStorage or cookies?</li>
                        <li>Is the Authorization header being sent correctly?</li>
                        <li>Is the API returning output: -401 even with token?</li>
                        <li>Check browser DevTools → Network tab for Authorization header</li>
                        <li>Check backend logs for token validation errors</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DebugAuthPage;
