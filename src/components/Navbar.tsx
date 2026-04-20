'use client';

import React from 'react';
import { ShoppingBag, User, Search, Menu } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-2xl font-black tracking-tighter text-white">
              VELLI<span className="text-emerald-400">.</span>
            </Link>
            <div className="hidden md:flex gap-7 text-xs font-bold text-white/60 uppercase tracking-widest">
              <Link href="/" className="hover:text-emerald-400 transition-colors">Shop All</Link>
              <Link href="/" className="hover:text-emerald-400 transition-colors">New Collection</Link>
              <Link href="/" className="hover:text-emerald-400 transition-colors">Shop By</Link>
              <Link href="/" className="hover:text-emerald-400 transition-colors">Sports</Link>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <button className="text-white/60 hover:text-white transition-colors p-2">
              <Search size={18} />
            </button>
            <Link href="/account" className="text-white/60 hover:text-white transition-colors p-2">
              <User size={18} />
            </Link>
            <Link href="/cart" className="text-white/60 hover:text-white transition-colors p-2 relative">
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-emerald-400 text-black text-[10px] font-black rounded-full flex items-center justify-center px-1 leading-none">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>
            <button className="md:hidden text-white/60 p-2">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
