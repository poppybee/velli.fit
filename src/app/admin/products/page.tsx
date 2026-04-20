'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Package } from 'lucide-react';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  status: 'active' | 'draft';
  images: { url: string; alt: string }[];
  skus: { stock: number }[];
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all');

  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const toggleStatus = async (product: Product) => {
    const newStatus = product.status === 'active' ? 'draft' : 'active';
    await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  const totalStock = (product: Product) =>
    product.skus.reduce((sum, s) => sum + s.stock, 0);

  const filteredProducts = products.filter(p => filter === 'all' || p.status === filter);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Products</h1>
          <p className="text-white/40 text-sm mt-1">{products.length} total</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 text-black font-bold rounded-xl hover:bg-emerald-300 transition-colors text-sm uppercase tracking-widest"
        >
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Tabs / Filters */}
      <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10 mb-6 w-fit">
        {(['all', 'active', 'draft'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-lg transition-all ${
              filter === t ? 'bg-white/10 text-white' : 'text-white/30 hover:text-white/60'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-white/30 text-sm">Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-24 text-white/20">
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg font-medium">No products found</p>
          {filter !== 'all' && (
            <button onClick={() => setFilter('all')} className="text-emerald-400 text-sm mt-2 hover:underline">Clear filters</button>
          )}
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-6 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Product</th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Category</th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Price</th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Stock</th>
                <th className="text-left px-4 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Status</th>
                <th className="text-right px-6 py-4 text-white/40 text-xs font-bold uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-white/10 flex-shrink-0">
                        {product.images[0] ? (
                          <img src={product.images[0].url} alt={product.images[0].alt} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={16} className="text-white/20" />
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium text-sm">{product.name}</p>
                          {product.status === 'draft' && (
                            <span className="px-1.5 py-0.5 bg-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest rounded">Draft</span>
                          )}
                        </div>
                        <p className="text-white/30 text-xs">ID: {product.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white/60 text-sm">{product.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white font-medium text-sm">${product.price.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-white/60 text-sm">{totalStock(product)} units</span>
                  </td>
                  <td className="px-4 py-4">
                    <button onClick={() => toggleStatus(product)} className="flex items-center gap-2 group">
                      {product.status === 'active' ? (
                        <>
                          <ToggleRight size={20} className="text-emerald-400" />
                          <span className="text-emerald-400 text-xs font-bold uppercase tracking-wide">Active</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft size={20} className="text-white/30" />
                          <span className="text-white/30 text-xs font-bold uppercase tracking-wide">Draft</span>
                        </>
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
