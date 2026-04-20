'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Home } from 'lucide-react';

type OrderItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
};

type Order = {
  orderId: string;
  items: OrderItem[];
  total: number;
  shipping: number;
  address: { firstName: string; lastName: string; email: string; address: string; city: string; state: string; zip: string; country: string };
  createdAt: string;
};

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get('order');
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!orderId) return;
    const orders: Order[] = JSON.parse(localStorage.getItem('velli_orders') || '[]');
    const found = orders.find((o) => o.orderId === orderId);
    if (found) setOrder(found);
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-24">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center">
            <CheckCircle2 size={52} className="text-emerald-500" />
          </div>
        </div>
        <h1 className="text-4xl font-black tracking-tighter uppercase mb-3">Order Confirmed!</h1>
        <p className="text-gray-400 text-base font-medium">Thank you for your purchase. We'll email you when it ships.</p>
        {orderId && (
          <div className="mt-5 inline-flex items-center gap-2 bg-gray-50 rounded-2xl px-6 py-3">
            <Package size={16} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-600">Order #</span>
            <span className="text-sm font-black text-black tracking-wider">{orderId}</span>
          </div>
        )}
      </div>

      {order && (
        <div className="bg-gray-50 rounded-3xl p-8 mb-8">
          <h3 className="font-black uppercase tracking-tight mb-6 text-sm text-gray-400">What You Ordered</h3>
          <div className="space-y-4 mb-6">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-20 bg-white rounded-xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <p className="font-bold text-sm uppercase">{item.name}</p>
                  <p className="text-gray-400 text-xs">{item.color && `${item.color} · `}Size {item.size} · Qty {item.quantity}</p>
                  <p className="font-bold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Shipping</span>
              {order.shipping === 0 ? <span className="text-emerald-600 font-bold text-xs uppercase">Free</span> : <span>${order.shipping.toFixed(2)}</span>}
            </div>
            <div className="flex justify-between font-black text-base">
              <span>Total Paid</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}

      {order?.address && (
        <div className="bg-gray-50 rounded-3xl p-8 mb-8">
          <h3 className="font-black uppercase tracking-tight mb-3 text-sm text-gray-400">Delivering To</h3>
          <p className="font-bold text-sm">{order.address.firstName} {order.address.lastName}</p>
          <p className="text-gray-500 text-sm">{order.address.address}</p>
          <p className="text-gray-500 text-sm">{order.address.city}, {order.address.state} {order.address.zip}</p>
          <p className="text-gray-500 text-sm">{order.address.country}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/" className="flex-1 h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-colors uppercase tracking-widest text-sm group">
          <Home size={16} /> Back to Home
        </Link>
        <Link href="/account" className="flex-1 h-14 border-2 border-black text-black rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors uppercase tracking-widest text-sm">
          View Orders <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="bg-white min-h-screen pt-24 text-black">
      <Navbar />
      <Suspense fallback={<div className="flex items-center justify-center py-40 text-gray-400 font-medium">Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
