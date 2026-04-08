'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] bg-gray-50 rounded-[2rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeIndex}
            src={images[activeIndex]}
            alt="Product"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
              activeIndex === index ? 'border-emerald-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={image} alt="Thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
