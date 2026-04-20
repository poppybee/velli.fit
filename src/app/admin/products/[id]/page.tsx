import { getProduct } from '@/lib/products';
import ProductForm from '@/components/admin/ProductForm';
import { notFound } from 'next/navigation';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">Edit Product</h1>
        <p className="text-white/40 text-sm mt-1">{product.name}</p>
      </div>
      <ProductForm initialData={product} />
    </div>
  );
}
