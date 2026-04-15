import { NextRequest, NextResponse } from 'next/server';
import { getProducts, createProduct } from '@/lib/products';

export async function GET() {
  const products = getProducts();
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const product = createProduct(data);
  return NextResponse.json(product, { status: 201 });
}
