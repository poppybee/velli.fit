'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Upload, X, GripVertical, ExternalLink } from 'lucide-react';

type SKU = { id: string; size: string; color: string; stock: number };
type ProductImage = { url: string; alt: string };

type Product = {
  id?: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  category: string;
  status: 'active' | 'draft';
  images: ProductImage[];
  skus: SKU[];
  rating: number;
};

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'One Size'];
const CATEGORIES = ['Yoga', 'Tennis', 'Studio', 'Running', 'Swim', 'Accessories'];

const defaultProduct: Product = {
  name: '',
  description: '',
  price: 0,
  comparePrice: null,
  category: 'Yoga',
  status: 'draft',
  images: [],
  skus: [],
  rating: 5.0,
};

export default function ProductForm({ initialData }: { initialData?: Product & { id: string } }) {
  const router = useRouter();
  const isEdit = !!initialData;
  const [form, setForm] = useState<Product>(initialData || defaultProduct);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const set = (key: keyof Product, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // Images
  const addImage = () => set('images', [...form.images, { url: '', alt: '' }]);
  const removeImage = (i: number) => set('images', form.images.filter((_, idx) => idx !== i));
  const updateImage = (i: number, field: keyof ProductImage, value: string) => {
    const imgs = [...form.images];
    imgs[i] = { ...imgs[i], [field]: value };
    set('images', imgs);
  };

  const uploadFile = async (i: number, file: File) => {
    setUploadingIdx(i);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch('/api/upload', { method: 'POST', body: fd });
    const { url } = await res.json();
    updateImage(i, 'url', url);
    setUploadingIdx(null);
  };

  // SKUs
  const addSku = () => {
    const newSku: SKU = {
      id: `sku-${Date.now()}`,
      size: 'M',
      color: '',
      stock: 0,
    };
    set('skus', [...form.skus, newSku]);
  };
  const removeSku = (i: number) => set('skus', form.skus.filter((_, idx) => idx !== i));
  const updateSku = (i: number, field: keyof SKU, value: string | number) => {
    const skus = [...form.skus];
    skus[i] = { ...skus[i], [field]: value };
    set('skus', skus);
  };

  const handleSubmit = async (e: React.FormEvent, statusOverride?: 'active' | 'draft') => {
    if (e) e.preventDefault();
    setSaving(true);

    const dataToSave = statusOverride ? { ...form, status: statusOverride } : form;

    const url = isEdit ? `/api/products/${initialData.id}` : '/api/products';
    const method = isEdit ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSave),
    });

    if (res.ok) {
      router.push('/admin/products');
      router.refresh();
    } else {
      const err = await res.text();
      alert(`Failed to save: ${err}`);
      setSaving(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="max-w-4xl space-y-8">

      {/* Basic Info */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-bold text-sm uppercase tracking-widest">Basic Info</h2>

        <div>
          <label className="label">Product Name</label>
          <input
            className="input"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="e.g. Sky Blue Seamless Sports Bra"
            required
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            className="input min-h-[100px] resize-none"
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            placeholder="Describe the product..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Category</label>
            <select className="input" value={form.category} onChange={(e) => set('category', e.target.value)}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Rating (Display Only)</label>
            <input
              className="input"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={(e) => set('rating', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-bold text-sm uppercase tracking-widest">Pricing</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Price ($)</label>
            <input
              className="input"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => set('price', parseFloat(e.target.value))}
              required
            />
          </div>
          <div>
            <label className="label">Compare Price ($) <span className="text-white/30 normal-case font-normal">— optional</span></label>
            <input
              className="input"
              type="number"
              min="0"
              step="0.01"
              value={form.comparePrice ?? ''}
              onChange={(e) => set('comparePrice', e.target.value ? parseFloat(e.target.value) : null)}
              placeholder="Original price (shows strikethrough)"
            />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest">Images</h2>
          <button type="button" onClick={addImage} className="btn-sm">
            <Plus size={14} /> Add Image
          </button>
        </div>

        {form.images.length === 0 && (
          <p className="text-white/20 text-sm text-center py-6">No images yet. Add one above.</p>
        )}

        <div className="space-y-4">
          {form.images.map((img, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Image {i + 1}{i === 0 ? ' (Cover)' : ''}</span>
                <button type="button" onClick={() => removeImage(i)} className="text-white/30 hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              </div>

              {/* Preview */}
              {img.url && (
                <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white/5">
                  <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                  {img.url.startsWith('/uploads/') && (
                    <a href={img.url} target="_blank" className="absolute bottom-1 right-1 p-1 bg-black/60 rounded">
                      <ExternalLink size={10} className="text-white" />
                    </a>
                  )}
                </div>
              )}

              {/* Upload or URL */}
              <div className="flex gap-2">
                <input
                  className="input flex-1"
                  value={img.url}
                  onChange={(e) => updateImage(i, 'url', e.target.value)}
                  placeholder="Paste image URL or upload →"
                />
                <input
                  ref={(el) => { fileRefs.current[i] = el; }}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { if (e.target.files?.[0]) uploadFile(i, e.target.files[0]); }}
                />
                <button
                  type="button"
                  onClick={() => fileRefs.current[i]?.click()}
                  disabled={uploadingIdx === i}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg transition-colors disabled:opacity-50"
                >
                  <Upload size={13} />
                  {uploadingIdx === i ? 'Uploading...' : 'Upload'}
                </button>
              </div>

              <input
                className="input"
                value={img.alt}
                onChange={(e) => updateImage(i, 'alt', e.target.value)}
                placeholder="Alt text (e.g. Sky Blue Sports Bra front view)"
              />
            </div>
          ))}
        </div>
      </section>

      {/* SKUs */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-bold text-sm uppercase tracking-widest">SKUs</h2>
          <button type="button" onClick={addSku} className="btn-sm">
            <Plus size={14} /> Add SKU
          </button>
        </div>

        {form.skus.length === 0 && (
          <p className="text-white/20 text-sm text-center py-6">No SKUs yet. Add size/color variants above.</p>
        )}

        {form.skus.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left pb-3 text-white/40 text-xs uppercase tracking-widest font-bold">Size</th>
                  <th className="text-left pb-3 px-3 text-white/40 text-xs uppercase tracking-widest font-bold">Color</th>
                  <th className="text-left pb-3 px-3 text-white/40 text-xs uppercase tracking-widest font-bold">Stock</th>
                  <th className="pb-3"></th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                {form.skus.map((sku, i) => (
                  <tr key={sku.id} className="border-b border-white/5 last:border-0">
                    <td className="py-2 pr-3">
                      <select
                        className="input w-24"
                        value={sku.size}
                        onChange={(e) => updateSku(i, 'size', e.target.value)}
                      >
                        {SIZES.map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </td>
                    <td className="py-2 px-3">
                      <input
                        className="input w-36"
                        value={sku.color}
                        onChange={(e) => updateSku(i, 'color', e.target.value)}
                        placeholder="e.g. Sky Blue"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        className="input w-24"
                        type="number"
                        min="0"
                        value={sku.stock}
                        onChange={(e) => updateSku(i, 'stock', parseInt(e.target.value) || 0)}
                      />
                    </td>
                    <td className="py-2 pl-3">
                      <button type="button" onClick={() => removeSku(i)} className="text-white/30 hover:text-red-400 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex gap-3">
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(null as any, 'active')}
            className="px-8 py-3 bg-emerald-400 text-black font-black rounded-xl hover:bg-emerald-300 transition-colors text-sm uppercase tracking-wide disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? (form.status === 'active' ? 'Save Changes' : 'Publish Product') : 'Publish Product'}
          </button>
          
          <button
            type="button"
            disabled={saving}
            onClick={() => handleSubmit(null as any, 'draft')}
            className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors text-sm uppercase tracking-wide disabled:opacity-50"
          >
            {saving ? 'Saving...' : isEdit ? 'Save as Draft' : 'Save as Draft'}
          </button>
        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="px-8 py-3 text-white/40 hover:text-white font-bold rounded-xl transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
