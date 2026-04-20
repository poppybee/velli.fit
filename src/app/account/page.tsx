'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Package, MapPin, User, LogOut, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';

type OrderItem = {
  id: string; name: string; image: string; price: number; quantity: number; size: string; color?: string;
};
type Order = {
  orderId: string; items: OrderItem[]; total: number; shipping: number; createdAt: string;
  address: { firstName: string; lastName: string; address: string; city: string; state: string; zip: string; country: string };
};
type Address = { id: string; label: string; address: string; city: string; state: string; zip: string; country: string };

const TABS = ['Orders', 'Addresses', 'Account'] as const;
type Tab = typeof TABS[number];

export default function AccountPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>('Orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [newAddr, setNewAddr] = useState({ label: '', address: '', city: '', state: '', zip: '', country: 'United States' });
  const [addingAddr, setAddingAddr] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    setEditForm({ name: user.name, email: user.email });
    setOrders(JSON.parse(localStorage.getItem('velli_orders') || '[]'));
    setAddresses(JSON.parse(localStorage.getItem('velli_addresses') || '[]'));
  }, [user]);

  const saveProfile = () => {
    const updated = { ...user!, name: editForm.name, email: editForm.email };
    localStorage.setItem('velli_user', JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addAddress = () => {
    if (!newAddr.address || !newAddr.city || !newAddr.zip) return;
    const updated = [...addresses, { ...newAddr, id: Date.now().toString() }];
    setAddresses(updated);
    localStorage.setItem('velli_addresses', JSON.stringify(updated));
    setNewAddr({ label: '', address: '', city: '', state: '', zip: '', country: 'United States' });
    setAddingAddr(false);
  };

  const removeAddress = (id: string) => {
    const updated = addresses.filter((a) => a.id !== id);
    setAddresses(updated);
    localStorage.setItem('velli_addresses', JSON.stringify(updated));
  };

  const handleLogout = () => { logout(); router.push('/'); };

  if (!user) return null;

  return (
    <main className="bg-[#fafafa] min-h-screen pt-24 pb-16 text-black">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">Hi, {user.name.split(' ')[0]}</h1>
            <p className="text-gray-400 font-medium mt-1">{user.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 border-2 border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:border-black hover:text-black transition-all uppercase tracking-wide">
            <LogOut size={14} /> Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm mb-10 max-w-md">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${tab === t ? 'bg-black text-white' : 'text-gray-400 hover:text-black'}`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Orders */}
        {tab === 'Orders' && (
          <div>
            {orders.length === 0 ? (
              <div className="text-center py-20">
                <Package size={56} className="mx-auto text-gray-200 mb-5" />
                <p className="text-xl font-black uppercase mb-2">No Orders Yet</p>
                <p className="text-gray-400 mb-8 font-medium">Your order history will appear here.</p>
                <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-bold hover:bg-emerald-600 transition-colors uppercase tracking-widest text-sm">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.orderId} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.orderId ? null : order.orderId)}
                    >
                      <div className="flex items-center gap-6 text-left">
                        <div>
                          <p className="font-black text-sm uppercase tracking-wider">{order.orderId}</p>
                          <p className="text-gray-400 text-xs mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div className="hidden sm:flex gap-1">
                          {order.items.slice(0, 3).map((item) => (
                            <div key={item.id} className="w-10 h-12 bg-gray-50 rounded-lg overflow-hidden">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                          {order.items.length > 3 && <div className="w-10 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-400">+{order.items.length - 3}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Delivered</span>
                          <p className="font-black mt-1">${order.total.toFixed(2)}</p>
                        </div>
                        {expandedOrder === order.orderId ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
                      </div>
                    </button>
                    {expandedOrder === order.orderId && (
                      <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0">
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
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Addresses */}
        {tab === 'Addresses' && (
          <div className="space-y-4">
            {addresses.map((addr) => (
              <div key={addr.id} className="bg-white rounded-2xl border border-gray-100 px-6 py-5 flex justify-between items-start">
                <div>
                  {addr.label && <p className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-1">{addr.label}</p>}
                  <p className="font-bold text-sm">{addr.address}</p>
                  <p className="text-gray-400 text-sm">{addr.city}, {addr.state} {addr.zip}</p>
                  <p className="text-gray-400 text-sm">{addr.country}</p>
                </div>
                <button onClick={() => removeAddress(addr.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {addingAddr ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
                <h3 className="font-black uppercase tracking-tight text-sm">New Address</h3>
                {[
                  { k: 'label', ph: 'Label (e.g. Home, Work)', full: true },
                  { k: 'address', ph: 'Street address', full: true },
                  { k: 'city', ph: 'City' }, { k: 'state', ph: 'State' }, { k: 'zip', ph: 'ZIP' },
                ].map(({ k, ph, full }) => (
                  <div key={k} className={full ? '' : 'inline-block w-1/3 pr-2'}>
                    <input
                      placeholder={ph}
                      value={(newAddr as Record<string, string>)[k]}
                      onChange={(e) => setNewAddr((a) => ({ ...a, [k]: e.target.value }))}
                      className="w-full bg-gray-50 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={addAddress} className="px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-emerald-600 transition-colors uppercase tracking-wide">Save</button>
                  <button onClick={() => setAddingAddr(false)} className="px-6 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-500 hover:border-black transition-colors">Cancel</button>
                </div>
              </div>
            ) : (
              <button onClick={() => setAddingAddr(true)} className="w-full py-5 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-400 hover:border-black hover:text-black transition-all flex items-center justify-center gap-2 uppercase tracking-wide">
                <Plus size={16} /> Add New Address
              </button>
            )}
          </div>
        )}

        {/* Account Info */}
        {tab === 'Account' && (
          <div className="max-w-md">
            <div className="bg-white rounded-2xl border border-gray-100 p-8 space-y-5">
              <h3 className="font-black uppercase tracking-tight text-sm text-gray-400 mb-2">Profile</h3>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-gray-50 rounded-2xl px-5 py-3.5 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Member Since</label>
                <p className="text-sm font-medium text-gray-500 px-5">
                  {new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <button onClick={saveProfile} className="w-full h-12 bg-black text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-colors uppercase tracking-widest">
                {saved ? '✓ Saved!' : 'Save Changes'}
              </button>
            </div>

            <div className="mt-6 bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="font-black uppercase tracking-tight text-sm text-gray-400 mb-4">Danger Zone</h3>
              <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-red-700 font-bold text-sm transition-colors">
                <LogOut size={15} /> Sign out of your account
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
