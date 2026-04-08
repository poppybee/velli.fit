'use client';

import React from 'react';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-black">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter">
              VELLI<span className="text-emerald-500">.</span>
            </Link>
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-600 uppercase tracking-widest">
              <Link href="/" className="hover:text-emerald-500 transition-colors">Shop All</Link>
              <Link href="/" className="hover:text-emerald-500 transition-colors">Yoga</Link>
              <Link href="/" className="hover:text-emerald-500 transition-colors">Running</Link>
              <Link href="/" className="hover:text-emerald-500 transition-colors">New Arrivals</Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-gray-600 hover:text-black transition-colors p-2">
              <Search size={20} />
            </button>
            <Link href="/account" className="text-gray-600 hover:text-black transition-colors p-2">
              <User size={20} />
            </Link>
            <Link href="/cart" className="text-gray-600 hover:text-black transition-colors p-2 relative">
              <ShoppingBag size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
            </Link>
            <button className="md:hidden text-gray-600 p-2">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
