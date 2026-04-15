import { getProduct, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetail({ params }: { params: { id: string } }) {
  const product = getProduct(params.id);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
