import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  bonusPrice?: number;
  status: 'available' | 'sold' | 'not-in-stock';
  images: string[];
  createdAt: string;
}

function mapRow(row: any): Product {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    bonusPrice: row.bonus_price ?? undefined,
    status: row.status,
    images: row.images ?? [],
    createdAt: row.created_at,
  };
}

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function getRecentProducts(count = 4): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('status', 'available')
    .order('created_at', { ascending: false })
    .limit(count);
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert({
      title: product.title,
      description: product.description,
      price: product.price,
      bonus_price: product.bonusPrice ?? null,
      status: product.status,
      images: product.images,
    })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Promise<Product | null> {
  const row: any = {};
  if (updates.title !== undefined) row.title = updates.title;
  if (updates.description !== undefined) row.description = updates.description;
  if (updates.price !== undefined) row.price = updates.price;
  if (updates.bonusPrice !== undefined) row.bonus_price = updates.bonusPrice;
  if (updates.status !== undefined) row.status = updates.status;
  if (updates.images !== undefined) row.images = updates.images;

  const { data, error } = await supabase
    .from('products')
    .update(row)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  return !error;
}

export async function uploadProductImage(file: File): Promise<string> {
  const ext = file.name.split('.').pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage
    .from('product-images')
    .upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return data.publicUrl;
}
