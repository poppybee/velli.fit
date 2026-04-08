'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import { Package, Heart, Settings, MapPin, Bell, LogOut, ChevronRight } from 'lucide-react';

export default function AccountPage() {
  const menuItems = [
    { icon: <Package size={20} />, label: 'My Orders', sub: 'View and track your purchases' },
    { icon: <Heart size={20} />, label: 'Wishlist', sub: 'Items you have saved' },
    { icon: <MapPin size={20} />, label: 'Addresses', sub: 'Manage your delivery info' },
    { icon: <Bell size={20} />, label: 'Notifications', sub: 'Preferences and alerts' },
    { icon: <Settings size={20} />, label: 'Account Details', sub: 'Edit your profile' },
  ];

  return (
    <main className="bg-white min-h-screen pt-24 pb-12 text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
          <div className="w-32 h-32 bg-emerald-100 rounded-[3rem] overflow-hidden flex items-center justify-center text-emerald-500 font-black text-4xl border-4 border-white shadow-xl">
            S
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">Steven</h1>
            <p className="text-gray-400 font-medium mb-4 uppercase tracking-widest text-xs">Premium Member · Since March 2026</p>
            <div className="flex gap-2 justify-center md:justify-start">
               <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-lg uppercase">Verified</span>
               <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-lg uppercase">Elite Athlete</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              className="group flex items-center justify-between p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300 border border-transparent hover:border-gray-100 text-left"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-emerald-500 transition-colors shadow-sm">
                  {item.icon}
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg uppercase">{item.label}</p>
                  <p className="text-xs text-gray-400 font-medium">{item.sub}</p>
                </div>
              </div>
              <ChevronRight className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all" size={20} />
            </button>
          ))}
          
          <button className="flex items-center justify-between p-6 mt-8 text-red-500 font-bold hover:bg-red-50 rounded-3xl transition-colors w-full text-left">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <LogOut size={20} />
              </div>
              <span className="uppercase tracking-widest text-sm">Sign Out</span>
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}
