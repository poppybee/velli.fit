import { supabase } from './supabase';

export type SKU = {
  id: string;
  size: string;
  color: string;
  stock: number;
};

export type ProductImage = {
  url: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  comparePrice: number | null;
  category: string;
  status: 'active' | 'draft';
  images: ProductImage[];
  skus: SKU[];
  rating: number;
  createdAt: string;
};

// Helper to map DB row to Product type
function mapRow(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    comparePrice: row.compare_price ? Number(row.compare_price) : null,
    category: row.category,
    status: row.status,
    images: row.images || [],
    skus: row.skus || [],
    rating: Number(row.rating),
    createdAt: row.created_at,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data.map(mapRow);
}

export async function getProduct(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    console.error('Error fetching product:', error);
    return null;
  }
  return mapRow(data);
}

export async function createProduct(data: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const id = Date.now().toString();
  const { data: created, error } = await supabase
    .from('products')
    .insert({
      id,
      name: data.name,
      description: data.description,
      price: data.price,
      compare_price: data.comparePrice,
      category: data.category,
      status: data.status,
      images: data.images,
      skus: data.skus,
      rating: data.rating,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error creating product: ${error.message}`);
  }
  return mapRow(created);
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
  const updateData: any = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.price !== undefined) updateData.price = data.price;
  if (data.comparePrice !== undefined) updateData.compare_price = data.comparePrice;
  if (data.category !== undefined) updateData.category = data.category;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.images !== undefined) updateData.images = data.images;
  if (data.skus !== undefined) updateData.skus = data.skus;
  if (data.rating !== undefined) updateData.rating = data.rating;

  const { data: updated, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }
  return mapRow(updated);
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }
  return true;
}
