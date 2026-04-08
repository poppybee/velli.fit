'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { trendingProducts } from '@/data/mockData';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const cartItems = [trendingProducts[0], trendingProducts[1]]; // Mock cart

  return (
    <main className="bg-white min-h-screen pt-24 pb-12 text-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase text-left">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 text-left">
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-100">
                  <div className="w-32 h-40 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start mb-2 text-left">
                        <h3 className="text-xl font-bold uppercase">{item.name}</h3>
                        <button className="text-gray-400 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </div>
                      <p className="text-gray-500 text-sm mb-4 uppercase">Size: M</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1">
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-sm w-4 text-center">1</span>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-xl font-bold">${item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-3xl p-8 sticky top-32 text-left">
              <h3 className="text-2xl font-bold mb-8 uppercase">Summary</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">$79.98</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-bold uppercase text-xs pt-1">Free</span>
                </div>
                <div className="h-px bg-gray-200 my-4"></div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>$79.98</span>
                </div>
              </div>
              <Link 
                href="/checkout"
                className="w-full h-16 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all group"
              >
                Checkout <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
