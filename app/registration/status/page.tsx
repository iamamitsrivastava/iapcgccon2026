'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckRegistrationStatus() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (data.success) {
        setResult(data);
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Registration Status
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Enter the email address you used during registration to check your verification status.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !email}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                'Check Status'
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mt-4 border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {result && (
          <div className={`rounded-xl p-6 mt-6 border ${result.status === 'verified' ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            {result.status === 'verified' ? (
              <div className="text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-lg font-bold text-green-900 mb-2">Registration Verified!</h3>
                <p className="text-sm text-green-700 mb-4">
                  Your registration has been successfully verified by our team.
                </p>
                {result.registrationCodes && result.registrationCodes.length > 0 && (
                  <div className="bg-white rounded-lg p-3 border border-green-100 shadow-sm mb-3">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Registration Code(s)</p>
                    <p className="font-mono text-lg font-bold text-slate-800">{result.registrationCodes.join(', ')}</p>
                  </div>
                )}
                {result.accessCodes && result.accessCodes.length > 0 && (
                  <div className="bg-white rounded-lg p-3 border border-green-100 shadow-sm">
                    <p className="text-xs text-slate-500 uppercase font-semibold mb-1">Access Code(s)</p>
                    <p className="font-mono text-lg font-bold text-slate-800">{result.accessCodes.join(', ')}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-amber-500 mb-4" />
                <h3 className="text-lg font-bold text-amber-900 mb-2">Pending Verification</h3>
                <p className="text-sm text-amber-800">
                  We could not find a verified record for this email. If you registered recently, please allow some time for our administrative team to manually verify your details. Check back later!
                </p>
              </div>
            )}
          </div>
        )}

        <div className="text-center mt-6">
          <Link href="/registration" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            &larr; Back to Registration
          </Link>
        </div>
      </div>
    </div>
  );
}
