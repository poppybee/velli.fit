'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-end overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://sc02.alicdn.com/kf/A56370790ea01488eb613c55e42c73604g.png"
          alt="VELLI activewear hero"
          className="w-full h-full object-cover object-top"
        />
        {/* Gradient overlay — dark at bottom, subtle at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* Floating badge — top right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute top-28 right-8 md:right-16 z-10"
      >
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border border-white/30 bg-white/10 backdrop-blur-md flex flex-col items-center justify-center text-white text-center">
          <span className="text-[10px] font-bold tracking-widest uppercase leading-tight">Spring</span>
          <span className="text-2xl font-black leading-none">26</span>
          <span className="text-[10px] font-bold tracking-widest uppercase leading-tight">Collection</span>
        </div>
      </motion.div>

      {/* Main copy — bottom left */}
      <div className="relative z-10 w-full px-6 md:px-16 pb-16 md:pb-24">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-5 text-xs font-bold tracking-[0.3em] text-emerald-400 uppercase"
        >
          New Arrivals — Limited Drop
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-6xl sm:text-8xl md:text-[9rem] font-black leading-[0.9] tracking-tighter text-white uppercase mb-8"
        >
          MOVE<br />
          <span className="text-emerald-400">BOLD.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-300 text-base md:text-lg max-w-md mb-10 font-medium leading-relaxed"
        >
          Performance fabrics that move with you — from studio to street. Built for women who never slow down.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/product/1"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-emerald-400 text-black font-bold rounded-full hover:bg-emerald-300 transition-all duration-300 text-sm tracking-wide uppercase"
          >
            Shop the Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-sm tracking-wide uppercase backdrop-blur-sm">
            Our Story
          </button>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
