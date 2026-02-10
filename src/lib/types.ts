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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
}
