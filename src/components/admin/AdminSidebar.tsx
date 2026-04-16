'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Package, LogOut, ExternalLink, Layout } from 'lucide-react';

const nav = [
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/pages', label: 'Page Content', icon: Layout },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[#111111] border-r border-white/5 flex flex-col">
      <div className="px-6 py-7 border-b border-white/5">
        <p className="text-xl font-black tracking-tighter text-white">
          VELLI<span className="text-emerald-400">.</span>
        </p>
        <p className="text-white/30 text-xs tracking-widest uppercase mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
          {nav.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname.startsWith(href)
                ? 'bg-emerald-400/10 text-emerald-400'
                : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-4 py-6 border-t border-white/5 space-y-1">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-colors"
        >
          <ExternalLink size={16} />
          View Store
        </a>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white/50 hover:text-red-400 hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
