import { Testimonial } from './types';

const STORAGE_KEY = 'omniscience-testimonials';

const seedTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Adebayo Johnson',
    role: 'Business Owner',
    text: 'Omniscience Computer fixed my laptop in record time. Very professional and honest service. Highly recommended!',
  },
  {
    id: '2',
    name: 'Grace Okonkwo',
    role: 'Office Manager',
    text: 'I bought a printer from them and the after-sales support has been amazing. They truly care about their customers.',
  },
  {
    id: '3',
    name: 'Emmanuel Adekunle',
    role: 'Property Manager',
    text: 'The CCTV installation was done perfectly. The team was professional and the system works flawlessly. Great service!',
  },
];

function initStore(): Testimonial[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTestimonials));
    return seedTestimonials;
  }
  return JSON.parse(stored);
}

export function getTestimonials(): Testimonial[] {
  return initStore();
}

export function addTestimonial(data: Omit<Testimonial, 'id'>): Testimonial {
  const items = getTestimonials();
  const newItem: Testimonial = { ...data, id: Date.now().toString() };
  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newItem;
}

export function updateTestimonial(id: string, updates: Partial<Omit<Testimonial, 'id'>>): Testimonial | null {
  const items = getTestimonials();
  const index = items.findIndex((t) => t.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return items[index];
}

export function deleteTestimonial(id: string): boolean {
  const items = getTestimonials();
  const filtered = items.filter((t) => t.id !== id);
  if (filtered.length === items.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}
