'use client';

import React from 'react';
import { Star, Plus } from 'lucide-react';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    category: string;
    image?: string;
    images?: { url: string; alt: string }[];
    rating: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url || product.image || '';
  const imageAlt = product.images?.[0]?.alt || product.name;

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50 mb-4">
          <img 
            src={imageUrl} 
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-500 hover:text-white text-black">
            <Plus size={20} />
          </div>
        </div>
        <div>
          <div className="flex justify-between items-start mb-1 text-black">
            <h4 className="font-semibold group-hover:text-emerald-600 transition-colors uppercase">
              {product.name}
            </h4>
            <div className="flex items-center text-xs font-bold text-gray-400">
              <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
              {product.rating}
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
          <p className="font-bold text-lg text-black">${product.price.toLocaleString()}</p>
        </div>
      </Link>
    </div>
  );
}
