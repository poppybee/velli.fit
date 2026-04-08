'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://sc02.alicdn.com/kf/Aca310128cd57456fb7906976e19ef31ar.png" 
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-black">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-emerald-600 uppercase bg-emerald-50/80 backdrop-blur rounded-full border border-emerald-100"
        >
          Spring 2026 Collection Now Available
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-black leading-tight mb-8 tracking-tighter uppercase"
        >
          POWER IN<br />
          MOTION
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg text-gray-700 mb-10 max-w-xl mx-auto font-medium"
        >
          Engineered for performance, designed for style. Experience ultimate comfort with our smart-thermal fabrics and ergonomic silhouettes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/product/1" className="px-8 py-4 bg-black text-white rounded-full font-bold hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center gap-3 group">
            Shop Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 bg-white/80 backdrop-blur text-black border border-gray-200 rounded-full font-bold hover:bg-white transition-all duration-300">
            Our Story
          </button>
        </motion.div>
      </div>
    </section>
  );
}
