'use client';

import { useEffect, useState, useRef } from 'react';
import { Save, Upload, Plus, Trash2, Image as ImageIcon, ChevronDown, ChevronRight } from 'lucide-react';

type HeroConfig = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

type CategoryConfig = {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
};

type BrandStoryConfig = {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

type BannerConfig = {
  id: string;
  image: string;
  title: string;
  link: string;
};

type PagesData = {
  home: {
    hero: HeroConfig;
    categories: CategoryConfig[];
    brandStory: BrandStoryConfig;
  };
  product: {
    banners: BannerConfig[];
  };
};

type Section = 'home-hero' | 'home-categories' | 'home-brand' | 'product-banners';

const sections: { id: Section; label: string; page: string }[] = [
  { id: 'home-hero', label: 'Hero Banner', page: 'Home Page' },
  { id: 'home-categories', label: 'Category Cards', page: 'Home Page' },
  { id: 'home-brand', label: 'Brand Story', page: 'Home Page' },
  { id: 'product-banners', label: 'Product Banners', page: 'Product Page' },
];

export default function PagesAdmin() {
  const [data, setData] = useState<PagesData | null>(null);
  const [active, setActive] = useState<Section>('home-hero');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch('/api/pages').then((r) => r.json()).then(setData);
  }, []);

  const save = async () => {
    if (!data) return;
    setSaving(true);
    await fetch('/api/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const uploadImage = async (key: string, file: File, onDone: (url: string) => void) => {
    setUploading(key);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const { url } = await res.json();
    onDone(url);
    setUploading(null);
  };

  const ImageField = ({
    fieldKey,
    label,
    value,
    onChange,
  }: {
    fieldKey: string;
    label: string;
    value: string;
    onChange: (url: string) => void;
  }) => (
    <div className="space-y-3">
      <label className="label">{label}</label>
      {value && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10">
          <img src={value} alt={label} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex gap-2">
        <input
          className="input flex-1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste image URL..."
        />
        <input
          ref={(el) => { fileRefs.current[fieldKey] = el; }}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) uploadImage(fieldKey, e.target.files[0], onChange);
          }}
        />
        <button
          type="button"
          onClick={() => fileRefs.current[fieldKey]?.click()}
          disabled={uploading === fieldKey}
          className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          <Upload size={13} />
          {uploading === fieldKey ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );

  if (!data) {
    return <div className="text-white/30 text-sm">Loading...</div>;
  }

  const groupedSections = [
    { page: 'Home Page', items: sections.filter((s) => s.page === 'Home Page') },
    { page: 'Product Page', items: sections.filter((s) => s.page === 'Product Page') },
  ];

  return (
    <div className="flex gap-8 h-[calc(100vh-64px)]">
      {/* Left sidebar — section list */}
      <aside className="w-56 flex-shrink-0">
        <div className="space-y-6">
          {groupedSections.map((group) => (
            <div key={group.page}>
              <p className="text-white/30 text-xs font-bold uppercase tracking-widest mb-2 px-2">{group.page}</p>
              <div className="space-y-1">
                {group.items.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      active === s.id
                        ? 'bg-emerald-400/10 text-emerald-400'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Right editor */}
      <div className="flex-1 overflow-y-auto pb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {sections.find((s) => s.id === active)?.label}
            </h1>
            <p className="text-white/30 text-sm mt-1">
              {sections.find((s) => s.id === active)?.page}
            </p>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 bg-emerald-400 text-black font-bold rounded-xl hover:bg-emerald-300 transition-colors text-sm disabled:opacity-50"
          >
            <Save size={15} />
            {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">

          {/* Home Hero */}
          {active === 'home-hero' && (
            <>
              <ImageField
                fieldKey="hero-image"
                label="Hero Image"
                value={data.home.hero.image}
                onChange={(url) => setData({ ...data, home: { ...data.home, hero: { ...data.home.hero, image: url } } })}
              />
              <div>
                <label className="label">Headline</label>
                <input className="input" value={data.home.hero.title}
                  onChange={(e) => setData({ ...data, home: { ...data.home, hero: { ...data.home.hero, title: e.target.value } } })} />
              </div>
              <div>
                <label className="label">Subheading</label>
                <textarea className="input resize-none min-h-[80px]" value={data.home.hero.subtitle}
                  onChange={(e) => setData({ ...data, home: { ...data.home, hero: { ...data.home.hero, subtitle: e.target.value } } })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Button Text</label>
                  <input className="input" value={data.home.hero.buttonText}
                    onChange={(e) => setData({ ...data, home: { ...data.home, hero: { ...data.home.hero, buttonText: e.target.value } } })} />
                </div>
                <div>
                  <label className="label">Button Link</label>
                  <input className="input" value={data.home.hero.buttonLink} placeholder="/product/1"
                    onChange={(e) => setData({ ...data, home: { ...data.home, hero: { ...data.home.hero, buttonLink: e.target.value } } })} />
                </div>
              </div>
            </>
          )}

          {/* Home Categories */}
          {active === 'home-categories' && (
            <div className="space-y-8">
              {data.home.categories.map((cat, i) => (
                <div key={cat.id} className="border border-white/10 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">Card {i + 1}</span>
                    <button
                      onClick={() => {
                        const cats = data.home.categories.filter((_, idx) => idx !== i);
                        setData({ ...data, home: { ...data.home, categories: cats } });
                      }}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <ImageField
                    fieldKey={`cat-${i}`}
                    label="Image"
                    value={cat.image}
                    onChange={(url) => {
                      const cats = [...data.home.categories];
                      cats[i] = { ...cats[i], image: url };
                      setData({ ...data, home: { ...data.home, categories: cats } });
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Name</label>
                      <input className="input" value={cat.name}
                        onChange={(e) => {
                          const cats = [...data.home.categories];
                          cats[i] = { ...cats[i], name: e.target.value };
                          setData({ ...data, home: { ...data.home, categories: cats } });
                        }} />
                    </div>
                    <div>
                      <label className="label">Link</label>
                      <input className="input" value={cat.link} placeholder="/product/1"
                        onChange={(e) => {
                          const cats = [...data.home.categories];
                          cats[i] = { ...cats[i], link: e.target.value };
                          setData({ ...data, home: { ...data.home, categories: cats } });
                        }} />
                    </div>
                  </div>
                  <div>
                    <label className="label">Description</label>
                    <input className="input" value={cat.description}
                      onChange={(e) => {
                        const cats = [...data.home.categories];
                        cats[i] = { ...cats[i], description: e.target.value };
                        setData({ ...data, home: { ...data.home, categories: cats } });
                      }} />
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newCat = { id: `cat-${Date.now()}`, name: 'New Category', description: '', image: '', link: '/' };
                  setData({ ...data, home: { ...data.home, categories: [...data.home.categories, newCat] } });
                }}
                className="btn-sm w-full justify-center py-3"
              >
                <Plus size={14} /> Add Category Card
              </button>
            </div>
          )}

          {/* Home Brand Story */}
          {active === 'home-brand' && (
            <>
              <ImageField
                fieldKey="brand-image"
                label="Background Image"
                value={data.home.brandStory.image}
                onChange={(url) => setData({ ...data, home: { ...data.home, brandStory: { ...data.home.brandStory, image: url } } })}
              />
              <div>
                <label className="label">Headline</label>
                <input className="input" value={data.home.brandStory.title}
                  onChange={(e) => setData({ ...data, home: { ...data.home, brandStory: { ...data.home.brandStory, title: e.target.value } } })} />
              </div>
              <div>
                <label className="label">Body Text</label>
                <textarea className="input resize-none min-h-[80px]" value={data.home.brandStory.subtitle}
                  onChange={(e) => setData({ ...data, home: { ...data.home, brandStory: { ...data.home.brandStory, subtitle: e.target.value } } })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Button Text</label>
                  <input className="input" value={data.home.brandStory.buttonText}
                    onChange={(e) => setData({ ...data, home: { ...data.home, brandStory: { ...data.home.brandStory, buttonText: e.target.value } } })} />
                </div>
                <div>
                  <label className="label">Button Link</label>
                  <input className="input" value={data.home.brandStory.buttonLink} placeholder="/"
                    onChange={(e) => setData({ ...data, home: { ...data.home, brandStory: { ...data.home.brandStory, buttonLink: e.target.value } } })} />
                </div>
              </div>
            </>
          )}

          {/* Product Banners */}
          {active === 'product-banners' && (
            <div className="space-y-6">
              {data.product.banners.map((banner, i) => (
                <div key={banner.id} className="border border-white/10 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-sm">Banner {i + 1}</span>
                    <button
                      onClick={() => {
                        const banners = data.product.banners.filter((_, idx) => idx !== i);
                        setData({ ...data, product: { banners } });
                      }}
                      className="text-white/30 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <ImageField
                    fieldKey={`banner-${i}`}
                    label="Image"
                    value={banner.image}
                    onChange={(url) => {
                      const banners = [...data.product.banners];
                      banners[i] = { ...banners[i], image: url };
                      setData({ ...data, product: { banners } });
                    }}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">Title</label>
                      <input className="input" value={banner.title}
                        onChange={(e) => {
                          const banners = [...data.product.banners];
                          banners[i] = { ...banners[i], title: e.target.value };
                          setData({ ...data, product: { banners } });
                        }} />
                    </div>
                    <div>
                      <label className="label">Link</label>
                      <input className="input" value={banner.link} placeholder="/product/1"
                        onChange={(e) => {
                          const banners = [...data.product.banners];
                          banners[i] = { ...banners[i], link: e.target.value };
                          setData({ ...data, product: { banners } });
                        }} />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newBanner = { id: `banner-${Date.now()}`, image: '', title: 'New Banner', link: '/' };
                  setData({ ...data, product: { banners: [...data.product.banners, newBanner] } });
                }}
                className="btn-sm w-full justify-center py-3"
              >
                <Plus size={14} /> Add Banner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
