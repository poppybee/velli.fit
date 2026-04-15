'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push('/admin/products');
    } else {
      const text = await res.text();
      setError(`Incorrect password. (${res.status})`);
      console.error('Login failed:', text);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="text-2xl font-black tracking-tighter text-white">VELLI<span className="text-emerald-400">.</span></p>
          <p className="text-white/40 text-sm mt-2 tracking-widest uppercase">Admin</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5">
          <div>
            <label className="text-white/50 text-xs tracking-widest uppercase block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-emerald-400 transition-colors"
              placeholder="Enter admin password"
              required
            />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-400 text-black font-black rounded-xl hover:bg-emerald-300 transition-colors uppercase tracking-wide text-sm disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
