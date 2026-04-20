'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductGallery from '@/components/ProductGallery';
import SizeSelector from '@/components/SizeSelector';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react';
import type { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function ProductDetailClient({ product }: { product: Product }) {
  const imageUrls = product.images.map((img) => img.url);
  const sizes = [...new Set(product.skus.map((s) => s.size))];
  const [selectedSize, setSelectedSize] = useState(sizes[0] || 'M');
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    const sku = product.skus.find((s) => s.size === selectedSize) || product.skus[0];
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: sku?.color,
      image: imageUrls[0] || '/placeholder.png',
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="bg-white min-h-screen pt-24 pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 text-left">
          <ProductGallery images={imageUrls.length > 0 ? imageUrls : ['/placeholder.png']} />

          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-sm uppercase tracking-widest">
                <span>New Arrival</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4 uppercase">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-black">${product.price.toFixed(2)}</span>
                {product.comparePrice && (
                  <span className="text-xl text-gray-400 line-through">${product.comparePrice.toFixed(2)}</span>
                )}
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg uppercase">
                  Free Shipping
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed font-medium">{product.description}</p>
            </div>

            <SizeSelector
              sizes={sizes.length > 0 ? sizes : ['XS', 'S', 'M', 'L', 'XL']}
              selectedSize={selectedSize}
              onSizeChange={setSelectedSize}
            />

            <div className="flex gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-16 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${
                  added
                    ? 'bg-emerald-500 text-white scale-[0.98]'
                    : 'bg-black text-white hover:bg-emerald-600'
                }`}
              >
                {added ? <Check size={20} /> : <ShoppingBag size={20} />}
                {added ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="w-16 h-16 border-2 border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-100 transition-all">
                <Heart size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <Truck className="text-emerald-500 mb-2" size={24} />
                <span className="text-xs font-bold uppercase tracking-tighter">Fast Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="text-emerald-500 mb-2" size={24} />
                <span className="text-xs font-bold uppercase tracking-tighter">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="text-emerald-500 mb-2" size={24} />
                <span className="text-xs font-bold uppercase tracking-tighter">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
