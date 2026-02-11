import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}

function mapRow(row: any): Testimonial {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    text: row.text,
  };
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapRow);
}

export async function addTestimonial(t: Omit<Testimonial, 'id'>): Promise<Testimonial> {
  const { data, error } = await supabase
    .from('testimonials')
    .insert({ name: t.name, role: t.role, text: t.text })
    .select()
    .single();
  if (error) throw error;
  return mapRow(data);
}

export async function updateTestimonial(id: string, updates: Partial<Omit<Testimonial, 'id'>>): Promise<Testimonial | null> {
  const { data, error } = await supabase
    .from('testimonials')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data ? mapRow(data) : null;
}

export async function deleteTestimonial(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id);
  return !error;
}
