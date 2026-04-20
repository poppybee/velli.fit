'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';

function LoginContent() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get('redirect') || '/';
  const { login, setGuest } = useAuth();

  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validateLogin = () => {
    const e: Record<string, string> = {};
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateRegister = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password || form.password.length < 6) e.password = 'At least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = tab === 'login' ? validateLogin() : validateRegister();
    if (!valid) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const name = tab === 'register' ? form.name : form.email.split('@')[0];
    login(form.email, name);
    router.push(redirect);
  };

  const handleGuest = () => {
    setGuest(true);
    router.push(redirect);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-24">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-2">Welcome</h1>
        <p className="text-gray-400 font-medium">Your activewear, your account.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-gray-100 overflow-hidden">
        {/* Tabs */}
        <div className="flex">
          {(['login', 'register'] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); setErrors({}); }}
              className={`flex-1 py-5 text-sm font-black uppercase tracking-widest transition-all ${tab === t ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
            >
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
              <input
                type="text" placeholder="Jane Doe" value={form.name} onChange={(e) => set('name', e.target.value)}
                className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 ${errors.name ? 'ring-2 ring-red-300 bg-red-50' : 'focus:ring-emerald-400'}`}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
            <input
              type="email" placeholder="jane@example.com" value={form.email} onChange={(e) => set('email', e.target.value)}
              className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 ${errors.email ? 'ring-2 ring-red-300 bg-red-50' : 'focus:ring-emerald-400'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={(e) => set('password', e.target.value)}
                className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 pr-12 font-medium text-sm focus:outline-none focus:ring-2 ${errors.password ? 'ring-2 ring-red-300 bg-red-50' : 'focus:ring-emerald-400'}`}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
          </div>

          {tab === 'register' && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Confirm Password</label>
              <input
                type={showPass ? 'text' : 'password'} placeholder="••••••••" value={form.confirmPassword} onChange={(e) => set('confirmPassword', e.target.value)}
                className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'ring-2 ring-red-300 bg-red-50' : 'focus:ring-emerald-400'}`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1 font-medium">{errors.confirmPassword}</p>}
            </div>
          )}

          {tab === 'login' && (
            <div className="text-right">
              <button type="button" className="text-xs text-gray-400 hover:text-black font-medium transition-colors">Forgot password?</button>
            </div>
          )}

          <button type="submit" disabled={loading} className="w-full h-14 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2 group">
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
            {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="px-8 pb-8 pt-0">
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px bg-gray-100 flex-1" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="h-px bg-gray-100 flex-1" />
          </div>
          <button onClick={handleGuest} className="w-full h-12 border-2 border-gray-100 rounded-2xl text-sm font-bold text-gray-500 hover:border-black hover:text-black transition-all uppercase tracking-widest">
            Continue as Guest
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-8 font-medium">
        By continuing, you agree to our{' '}
        <Link href="#" className="text-black hover:text-emerald-600">Terms of Service</Link>{' '}and{' '}
        <Link href="#" className="text-black hover:text-emerald-600">Privacy Policy</Link>.
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="bg-[#fafafa] min-h-screen pt-24 pb-16 text-black">
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center py-40 text-gray-400 font-medium">Loading...</div>}>
        <LoginContent />
      </Suspense>
    </main>
  );
}
