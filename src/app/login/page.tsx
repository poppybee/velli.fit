'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-black">
      {/* Left: Form */}
      <div className="flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 relative text-left">
        <Link href="/" className="absolute top-12 left-8 sm:left-16 flex items-center gap-2 text-gray-400 hover:text-black transition-colors font-bold text-sm uppercase tracking-widest">
          <ArrowLeft size={16} /> BACK
        </Link>
        
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <div className="mb-12">
            <h1 className="text-4xl font-black tracking-tighter mb-4 uppercase">Welcome Back</h1>
            <p className="text-gray-500 font-medium text-left">Continue your performance journey.</p>
          </div>

          <form className="space-y-6 mb-12">
            <div className="text-left">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="email" placeholder="name@example.com" className="w-full h-14 bg-gray-50 border-none rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-emerald-500 font-medium outline-none" />
              </div>
            </div>
            <div className="text-left">
              <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                <input type="password" placeholder="••••••••" className="w-full h-14 bg-gray-50 border-none rounded-2xl pl-14 pr-6 focus:ring-2 focus:ring-emerald-500 font-medium outline-none" />
              </div>
            </div>
            <div className="flex justify-end">
              <button type="button" className="text-xs text-emerald-600 font-bold hover:underline uppercase tracking-widest">Forgot Password?</button>
            </div>
            <button type="button" className="w-full h-14 bg-black text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-colors shadow-2xl shadow-emerald-500/10 uppercase tracking-widest">
              Sign In
            </button>
          </form>

          <div className="relative mb-12">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-4 text-gray-400 font-bold">Or continue with</span></div>
          </div>

          <div className="grid grid-cols-1 gap-4">
             <button type="button" className="w-full h-14 bg-white border border-gray-200 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors uppercase text-sm tracking-widest">
               <User size={20} /> Continue as Guest
             </button>
          </div>

          <p className="mt-12 text-center lg:text-left text-sm text-gray-500 font-medium">
            Don&apos;t have an account? <Link href="/login" className="text-emerald-600 font-bold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right: Visual */}
      <div className="hidden lg:block relative overflow-hidden bg-gray-950">
        <img 
          src="https://sc02.alicdn.com/kf/Aca310128cd57456fb7906976e19ef31ar.png" 
          alt="Login Background" 
          className="w-full h-full object-cover opacity-60 scale-110 blur-sm"
        />
        <div className="absolute inset-0 flex items-center justify-center p-24 text-center">
           <div className="text-white relative z-10">
             <div className="w-20 h-1 bg-emerald-500 mx-auto mb-8"></div>
             <h2 className="text-6xl font-black tracking-tighter mb-8 leading-tight uppercase">VELLI<br />COMMUNITY.</h2>
             <p className="text-gray-400 text-lg font-medium leading-relaxed max-w-sm mx-auto">
               Join our global community and experience the fusion of high-performance and high-fashion.
             </p>
           </div>
        </div>
      </div>
    </main>
  );
}
