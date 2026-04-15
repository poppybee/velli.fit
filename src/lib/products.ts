import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'products.json');

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

export function getProducts(): Product[] {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getProduct(id: string): Product | null {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
}

export function saveProducts(products: Product[]): void {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
}

export function createProduct(data: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  saveProducts(products);
  return newProduct;
}

export function updateProduct(id: string, data: Partial<Product>): Product | null {
  const products = getProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx] = { ...products[idx], ...data };
  saveProducts(products);
  return products[idx];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  saveProducts(filtered);
  return true;
}
