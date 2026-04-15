import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { categories, trendingProducts } from '@/data/mockData';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="bg-[#0d0d0d] min-h-screen">
      <Navbar />
      <Hero />

      {/* Marquee strip */}
      <div className="bg-emerald-400 text-black py-3 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-8 text-xs font-black tracking-widest uppercase">
              Free Shipping Over $80 &nbsp;·&nbsp; New Spring Drop &nbsp;·&nbsp; Sustainable Fabrics &nbsp;·&nbsp; Women First &nbsp;·
            </span>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Collections</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
              Shop<br />by Category
            </h2>
          </div>
          <button className="text-white/50 hover:text-emerald-400 font-bold flex items-center gap-2 group transition-colors text-sm uppercase tracking-wider">
            View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} {...category} />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-3">Most Wanted</p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase">
                Trending Now
              </h2>
            </div>
            <button className="text-white/50 hover:text-emerald-400 font-bold flex items-center gap-2 group transition-colors text-sm uppercase tracking-wider">
              All Products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature strip — 3 pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-3xl overflow-hidden">
          {[
            { num: '01', title: 'Performance Fabric', desc: 'Moisture-wicking, 4-way stretch technology engineered for every movement.' },
            { num: '02', title: 'Body-First Design', desc: 'Ergonomic cuts sculpted by women, for women. Every seam has a purpose.' },
            { num: '03', title: 'Planet Conscious', desc: 'Recycled yarns and zero-waste production. Style that doesn\'t cost the earth.' },
          ].map((item) => (
            <div key={item.num} className="bg-[#0d0d0d] p-10 md:p-12">
              <span className="text-4xl font-black text-emerald-400/30 mb-6 block">{item.num}</span>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-3">{item.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Ethos — full bleed */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1800&q=80&fit=crop&crop=center"
          alt="VELLI brand"
          className="w-full h-[70vh] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              <p className="text-emerald-400 text-xs font-bold tracking-[0.3em] uppercase mb-5">Our Mission</p>
              <h2 className="text-5xl md:text-7xl font-black text-white uppercase leading-tight tracking-tighter mb-8">
                Built for<br />
                <span className="text-emerald-400">Every Woman.</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg mb-10 leading-relaxed">
                Movement is power. VELLI gear is crafted to move with you — not against you — so you can push further, feel stronger, and look incredible doing it.
              </p>
              <button className="px-8 py-4 bg-emerald-400 text-black rounded-full font-black hover:bg-emerald-300 transition-colors uppercase tracking-wide text-sm">
                Join the VELLI Community
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            <div className="col-span-2 md:col-span-1">
              <p className="text-2xl font-black text-white tracking-tighter mb-4">VELLI.FIT</p>
              <p className="text-white/30 text-sm leading-relaxed">Performance activewear for women who move with intention.</p>
            </div>
            {[
              { title: 'Shop', links: ['Shop All', 'New Collection', 'Sports', 'Sale'] },
              { title: 'Help', links: ['Size Guide', 'Returns', 'Shipping', 'FAQ'] },
              { title: 'Brand', links: ['Our Story', 'Sustainability', 'Ambassadors', 'Contact'] },
            ].map((col) => (
              <div key={col.title}>
                <p className="text-white text-xs font-black tracking-widest uppercase mb-5">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-white/30 text-sm hover:text-emerald-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">&copy; 2026 VELLI.FIT. All rights reserved.</p>
            <p className="text-white/20 text-xs">Privacy Policy &nbsp;·&nbsp; Terms of Service</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
