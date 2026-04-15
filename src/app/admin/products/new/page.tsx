import ProductForm from '@/components/admin/ProductForm';

export default function NewProductPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">Add Product</h1>
        <p className="text-white/40 text-sm mt-1">Create a new product listing</p>
      </div>
      <ProductForm />
    </div>
  );
}
