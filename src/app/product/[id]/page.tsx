'use client';

import React, { useState, use } from 'react';
import Navbar from '@/components/Navbar';
import ProductGallery from '@/components/ProductGallery';
import SizeSelector from '@/components/SizeSelector';
import { trendingProducts } from '@/data/mockData';
import { Heart, ShoppingBag, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = trendingProducts.find(p => p.id === id) || trendingProducts[0];
  const [selectedSize, setSelectedSize] = useState('M');

  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571945153237-4929e783ee4a?q=80&w=800&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1548330065-2956a164552e?q=80&w=800&auto=format&fit=crop',
  ];

  return (
    <main className="bg-white min-h-screen pt-24 pb-12">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ProductGallery images={productImages} />

          <div className="flex flex-col">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4 text-emerald-600 font-bold text-sm uppercase tracking-widest text-left">
                <span>New Arrival</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span>{product.category}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4 text-left uppercase">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-black">${product.price.toLocaleString()}</span>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg uppercase text-left">
                  Free Shipping
                </span>
              </div>
              <p className="text-gray-500 leading-relaxed font-medium text-left">
                Engineered for high-intensity training, this sports bra offers maximum support without sacrificing breathability. Featuring our AeroStretch™ technology, it provides a second-skin feel that keeps you cool and dry.
              </p>
            </div>

            <SizeSelector 
              sizes={['XS', 'S', 'M', 'L', 'XL']} 
              selectedSize={selectedSize} 
              onSizeChange={setSelectedSize} 
            />

            <div className="flex gap-4 mb-12">
              <button className="flex-1 h-16 bg-black text-white rounded-2xl font-bold text-lg hover:bg-emerald-600 transition-colors flex items-center justify-center gap-3">
                <ShoppingBag size={20} />
                Add to Cart
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
