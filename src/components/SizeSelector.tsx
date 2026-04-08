'use client';

import React from 'react';

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({ sizes, selectedSize, onSizeChange }: SizeSelectorProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900">Select Size</h3>
        <button className="text-xs text-emerald-600 font-bold underline">Size Chart</button>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeChange(size)}
            className={`py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
              selectedSize === size
                ? 'bg-black text-white ring-2 ring-black ring-offset-2'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
