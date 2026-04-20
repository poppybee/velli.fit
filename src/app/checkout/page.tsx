'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Truck, ShieldCheck, RotateCcw, ChevronDown } from 'lucide-react';
import Link from 'next/link';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  payment: 'apple' | 'card';
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [form, setForm] = useState<FormData>({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '', address: '', city: '', state: '', zip: '', country: 'United States',
    payment: 'card', cardNumber: '', cardExpiry: '', cardCvc: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal >= 80 ? 0 : 9.99;
  const total = subtotal + shipping;

  const set = (k: keyof FormData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.firstName) e.firstName = 'Required';
    if (!form.lastName) e.lastName = 'Required';
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.address) e.address = 'Required';
    if (!form.city) e.city = 'Required';
    if (!form.zip) e.zip = 'Required';
    if (form.payment === 'card') {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Invalid card number';
      if (!form.cardExpiry) e.cardExpiry = 'Required';
      if (!form.cardCvc || form.cardCvc.length < 3) e.cardCvc = 'Invalid CVC';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setPlacing(true);
    // Simulate payment processing
    await new Promise((r) => setTimeout(r, 1500));
    const orderId = `VL-${Date.now().toString().slice(-8)}`;
    // Save order to localStorage
    const order = { orderId, items, total, shipping, address: form, createdAt: new Date().toISOString() };
    const orders = JSON.parse(localStorage.getItem('velli_orders') || '[]');
    orders.unshift(order);
    localStorage.setItem('velli_orders', JSON.stringify(orders));
    clearCart();
    router.push(`/checkout/success?order=${orderId}`);
  };

  const Field = ({ label, name, type = 'text', placeholder, half }: {
    label: string; name: keyof FormData; type?: string; placeholder?: string; half?: boolean;
  }) => (
    <div className={half ? '' : 'col-span-2'}>
      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={form[name] as string}
        onChange={(e) => set(name, e.target.value)}
        className={`w-full h-13 bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 transition-all ${errors[name] ? 'ring-2 ring-red-300 bg-red-50' : 'focus:ring-emerald-400'}`}
      />
      {errors[name] && <p className="text-red-500 text-xs mt-1 font-medium">{errors[name]}</p>}
    </div>
  );

  if (items.length === 0) {
    return (
      <main className="bg-white min-h-screen pt-24 text-black">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-black uppercase mb-4">Nothing to Checkout</h1>
          <Link href="/" className="text-emerald-600 font-bold hover:underline">Go Shopping →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen pt-24 pb-16 text-black">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-black tracking-tighter mb-12 uppercase">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left: Form */}
            <div className="lg:col-span-3 space-y-10">
              {/* Shipping */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-black text-sm">1</div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Shipping Address</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="First Name" name="firstName" placeholder="Jane" half />
                  <Field label="Last Name" name="lastName" placeholder="Doe" half />
                  <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  <Field label="Address" name="address" placeholder="123 Main Street, Apt 4B" />
                  <Field label="City" name="city" placeholder="New York" half />
                  <Field label="State" name="state" placeholder="NY" half />
                  <Field label="ZIP Code" name="zip" placeholder="10001" half />
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Country</label>
                    <select
                      value={form.country}
                      onChange={(e) => set('country', e.target.value)}
                      className="w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    >
                      {['United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Japan', 'Singapore'].map(c => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-black text-sm">2</div>
                  <h2 className="text-xl font-black uppercase tracking-tight">Payment</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { id: 'card', label: 'Credit Card', sub: 'Visa, Mastercard, Amex' },
                    { id: 'apple', label: 'Apple Pay', sub: 'Recommended' },
                  ].map((opt) => (
                    <label key={opt.id} className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${form.payment === opt.id ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}>
                      <input type="radio" name="payment" value={opt.id} checked={form.payment === opt.id}
                        onChange={() => set('payment', opt.id)} className="hidden" />
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.payment === opt.id ? 'border-black bg-black' : 'border-gray-300'}`} />
                      <div>
                        <p className="font-bold text-sm">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {form.payment === 'card' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        value={form.cardNumber}
                        onChange={(e) => {
                          const v = e.target.value.replace(/\D/g, '').slice(0, 16);
                          set('cardNumber', v.replace(/(.{4})/g, '$1 ').trim());
                        }}
                        className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 ${errors.cardNumber ? 'ring-2 ring-red-300' : 'focus:ring-emerald-400'}`}
                      />
                      {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Expiry</label>
                      <input type="text" placeholder="MM/YY" maxLength={5}
                        value={form.cardExpiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, '');
                          if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
                          set('cardExpiry', v);
                        }}
                        className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 ${errors.cardExpiry ? 'ring-2 ring-red-300' : 'focus:ring-emerald-400'}`}
                      />
                      {errors.cardExpiry && <p className="text-red-500 text-xs mt-1">{errors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">CVC</label>
                      <input type="text" placeholder="123" maxLength={4}
                        value={form.cardCvc}
                        onChange={(e) => set('cardCvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        className={`w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 ${errors.cardCvc ? 'ring-2 ring-red-300' : 'focus:ring-emerald-400'}`}
                      />
                      {errors.cardCvc && <p className="text-red-500 text-xs mt-1">{errors.cardCvc}</p>}
                    </div>
                  </div>
                )}

                {form.payment === 'apple' && (
                  <div className="bg-gray-50 rounded-2xl p-6 text-center">
                    <p className="text-gray-500 text-sm font-medium">Apple Pay will be triggered at the final step.</p>
                  </div>
                )}
              </section>

              <button
                type="submit"
                disabled={placing}
                className="w-full h-16 bg-black text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-lg disabled:opacity-60 uppercase tracking-widest"
              >
                {placing ? 'Processing...' : `Place Order · $${total.toFixed(2)}`}
              </button>

              <div className="flex items-center justify-center gap-6 text-xs text-gray-400 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-emerald-500" /> SSL Secured</span>
                <span className="flex items-center gap-1.5"><Truck size={14} className="text-emerald-500" /> Fast Shipping</span>
                <span className="flex items-center gap-1.5"><RotateCcw size={14} className="text-emerald-500" /> 30-Day Returns</span>
              </div>
            </div>

            {/* Right: Order summary */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-3xl p-8 sticky top-32">
                <h3 className="font-black text-lg uppercase tracking-tight mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-20 bg-white rounded-xl overflow-hidden shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-black text-white text-[10px] font-black rounded-full flex items-center justify-center">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm uppercase tracking-tight">{item.name}</p>
                        <p className="text-gray-400 text-xs mt-0.5">{item.color} · {item.size}</p>
                        <p className="font-bold text-sm mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 pt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span><span className="text-black font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    {shipping === 0
                      ? <span className="text-emerald-600 font-bold text-xs uppercase">Free</span>
                      : <span className="text-black font-medium">${shipping.toFixed(2)}</span>
                    }
                  </div>
                  <div className="border-t border-gray-200 pt-3 flex justify-between font-black text-lg">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
