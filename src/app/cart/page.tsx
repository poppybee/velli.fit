'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';

const PROMO_CODES: Record<string, number> = {
  VELLI10: 0.1,
  WELCOME20: 0.2,
  SPRING15: 0.15,
};

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');

  const shipping = subtotal >= 80 ? 0 : 9.99;
  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount + shipping;

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setDiscount(PROMO_CODES[code]);
      setPromoApplied(code);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code.');
      setDiscount(0);
      setPromoApplied('');
    }
  };

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen pt-24 text-black">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
          <h1 className="text-4xl font-black tracking-tighter uppercase mb-4">Your Cart is Empty</h1>
          <p className="text-gray-400 mb-10 font-medium">Looks like you haven't added anything yet.</p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-emerald-600 transition-colors uppercase tracking-widest text-sm">
            Start Shopping <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-24 pb-16 text-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tighter mb-2 uppercase">Your Cart</h1>
        <p className="text-gray-400 text-sm mb-12">{items.reduce((s, i) => s + i.quantity, 0)} items</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex gap-5 pb-6 border-b border-gray-100">
                <Link href={`/product/${item.productId}`}>
                  <div className="w-28 h-36 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                </Link>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base uppercase tracking-tight mb-1">{item.name}</h3>
                      <p className="text-gray-400 text-xs uppercase tracking-widest">
                        {item.color && `${item.color} · `}Size {item.size}
                      </p>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-xl p-1">
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                        <Minus size={13} />
                      </button>
                      <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-colors">
                        <Plus size={13} />
                      </button>
                    </div>
                    <span className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-3xl p-8 sticky top-32">
              <h3 className="text-xl font-black uppercase tracking-tight mb-8">Order Summary</h3>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full h-11 bg-white border border-gray-200 rounded-xl pl-9 pr-3 text-sm font-medium focus:outline-none focus:border-emerald-400"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && applyPromo()}
                    />
                  </div>
                  <button onClick={applyPromo} className="px-4 h-11 bg-black text-white text-xs font-bold rounded-xl hover:bg-emerald-600 transition-colors uppercase tracking-wide">
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-2 font-medium">{promoError}</p>}
                {promoApplied && <p className="text-emerald-600 text-xs mt-2 font-bold">✓ {promoApplied} applied — {(discount * 100).toFixed(0)}% off</p>}
              </div>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="text-black font-medium">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  {shipping === 0
                    ? <span className="text-emerald-600 font-bold uppercase text-xs pt-0.5">Free</span>
                    : <span className="text-black font-medium">${shipping.toFixed(2)}</span>
                  }
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">Add ${(80 - subtotal).toFixed(2)} more for free shipping</p>
                )}
              </div>
              <div className="h-px bg-gray-200 mb-6" />
              <div className="flex justify-between text-lg font-black uppercase mb-8">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Link
                href="/checkout"
                className="w-full h-14 bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-emerald-600 transition-all group uppercase tracking-widest text-sm"
              >
                Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/" className="block text-center text-sm text-gray-400 hover:text-black mt-4 font-medium transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
