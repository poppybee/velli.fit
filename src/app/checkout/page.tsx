'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Truck, ShieldCheck, RotateCcw } from 'lucide-react';

export default function CheckoutPage() {
  return (
    <main className="bg-white min-h-screen pt-24 pb-12 text-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase text-left">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">1</div>
                <h2 className="text-2xl font-bold uppercase">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <input type="text" placeholder="Full Name" className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-emerald-500 font-medium" />
                </div>
                <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 px-1 text-left">Phone Number</div>
                <div className="col-span-2">
                  <input type="tel" placeholder="+1 (555) 000-0000" className="w-full h-14 bg-gray-50 border-none rounded-2xl px-6 focus:ring-2 focus:ring-emerald-500 font-medium" />
                </div>
                <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-gray-400 mb-1 px-1 text-left">Shipping Details</div>
                <div className="col-span-2">
                  <textarea rows={3} placeholder="Street, Apartment, City, State, Zip Code" className="w-full bg-gray-50 border-none rounded-2xl p-6 focus:ring-2 focus:ring-emerald-500 font-medium resize-none"></textarea>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold">2</div>
                <h2 className="text-2xl font-bold uppercase">Payment Method</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <label className="relative flex items-center p-6 border-2 border-emerald-500 bg-emerald-50 rounded-2xl cursor-pointer">
                  <input type="radio" name="payment" defaultChecked className="hidden" />
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-lg mb-1">Apple Pay</span>
                    <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Recommended</span>
                  </div>
                </label>
                <label className="relative flex items-center p-6 border-2 border-gray-100 hover:border-emerald-200 transition-colors rounded-2xl cursor-pointer text-left">
                  <input type="radio" name="payment" className="hidden" />
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-gray-400">Credit Card</span>
                  </div>
                </label>
              </div>
            </section>

            <div className="pt-8">
               <Link 
                href="/checkout/success"
                className="w-full h-16 bg-black text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all shadow-2xl shadow-emerald-500/20"
              >
                Pay Now $79.98
              </Link>
            </div>
          </div>

          {/* Sidebar / Info */}
          <div className="hidden lg:block space-y-8">
            <div className="bg-gray-50 rounded-[3rem] p-12 text-left">
               <ShieldCheck className="text-emerald-500 mb-6" size={48} />
               <h3 className="text-2xl font-bold mb-4 uppercase">Secure Checkout</h3>
               <p className="text-gray-500 font-medium leading-relaxed mb-8">
                 Your payment information is processed securely using 256-bit SSL encryption. We never store your card details on our servers.
               </p>
               <div className="space-y-4">
                 <div className="flex items-center gap-3 text-xs font-bold text-gray-700 uppercase tracking-widest">
                   <Truck size={18} className="text-emerald-500" />
                   Express Shipping
                 </div>
                 <div className="flex items-center gap-3 text-xs font-bold text-gray-700 uppercase tracking-widest">
                   <RotateCcw size={18} className="text-emerald-500" />
                   Easy Returns
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
