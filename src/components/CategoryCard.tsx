'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

export default function CategoryCard({ id, name, image, description }: CategoryCardProps) {
  return (
    <Link href={`/product/${id === 'yoga' ? '1' : '2'}`}>
      <motion.div 
        whileHover={{ y: -10 }}
        className="group relative h-[500px] overflow-hidden rounded-3xl bg-gray-100 cursor-pointer"
      >
        <img 
          src={image} 
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h3 className="text-3xl font-bold mb-2">{name}</h3>
          <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
