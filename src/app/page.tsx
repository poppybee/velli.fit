import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { categories, trendingProducts } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-black">
        <div className="flex justify-between items-end mb-12">
          <div className="text-left">
            <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">Shop by Category</h2>
            <p className="text-gray-500 font-medium">Find the perfect gear for your lifestyle.</p>
          </div>
          <button className="text-emerald-600 font-bold flex items-center gap-2 group">
            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 bg-gray-50/50 text-black">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">Trending Now</h2>
          <p className="text-gray-500 font-medium">This week&apos;s community favorites.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 border-t border-gray-100 text-black">
        <div className="bg-black rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
          <div className="relative z-10 max-w-2xl text-left">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight uppercase">
              VELLI<br />
              Empowering Every<br />
              Woman
            </h2>
            <p className="text-gray-400 text-lg mb-12">
              We believe movement is more than just a challenge; it&apos;s a celebration of strength. Our gear is designed to provide ultimate support, so you can focus on pushing your limits.
            </p>
            <button className="px-8 py-4 bg-emerald-500 text-white rounded-full font-bold hover:bg-emerald-400 transition-colors">
              Join the Community
            </button>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-gray-100 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 VELLI.FIT Sportswear. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
