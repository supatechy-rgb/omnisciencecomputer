import { Product } from './types';

const STORAGE_KEY = 'omniscience-products';

const seedProducts: Product[] = [
  {
    id: '1',
    title: 'HP EliteBook 840 G5',
    description: 'Powerful business laptop featuring Intel Core i5 8th Gen processor, 8GB DDR4 RAM, 256GB SSD, 14-inch Full HD display. Perfect for professionals and students alike. Comes with Windows 11 Pro pre-installed.',
    price: 250000,
    bonusPrice: 280000,
    status: 'available',
    images: ['/products/laptop.jpg'],
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Epson EcoTank L3250 Printer',
    description: 'All-in-one wireless inkjet printer with high-capacity ink tank system. Print, scan, and copy with ultra-low cost per page. Wi-Fi enabled for easy wireless printing from any device.',
    price: 120000,
    status: 'available',
    images: ['/products/printer.jpg'],
    createdAt: '2025-01-20T10:00:00Z',
  },
  {
    id: '3',
    title: 'Hikvision 4-Channel CCTV Kit',
    description: 'Complete CCTV surveillance system with 4 HD cameras, DVR recorder, 1TB hard drive, cables, and power supply. Night vision up to 20m. Mobile app for remote viewing.',
    price: 185000,
    bonusPrice: 210000,
    status: 'available',
    images: ['/products/cctv.jpg'],
    createdAt: '2025-02-01T10:00:00Z',
  },
  {
    id: '4',
    title: 'Computer Accessories Bundle',
    description: 'Essential accessories pack including wireless keyboard and mouse combo, USB headset with microphone, USB hub, and premium HDMI cable. Compatible with all laptops and desktops.',
    price: 35000,
    status: 'available',
    images: ['/products/accessories.jpg'],
    createdAt: '2025-02-05T10:00:00Z',
  },
];

function initStore(): Product[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedProducts));
    return seedProducts;
  }
  return JSON.parse(stored);
}

export function getProducts(): Product[] {
  return initStore();
}

export function getProductById(id: string): Product | null {
  const products = getProducts();
  return products.find((p) => p.id === id) || null;
}

export function getRecentProducts(count = 4): Product[] {
  return getProducts()
    .filter((p) => p.status === 'available')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, count);
}

export function addProduct(product: Omit<Product, 'id' | 'createdAt'>): Product {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Omit<Product, 'id' | 'createdAt'>>): Product | null {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  products[index] = { ...products[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}
