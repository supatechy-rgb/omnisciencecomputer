
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price INTEGER NOT NULL DEFAULT 0,
  bonus_price INTEGER,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold', 'not-in-stock')),
  images TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Public read access for products and testimonials
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view testimonials"
  ON public.testimonials FOR SELECT
  USING (true);

-- For now, allow public insert/update/delete since admin uses sessionStorage auth
-- In future this should be restricted to authenticated admin users
CREATE POLICY "Allow public insert products"
  ON public.products FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update products"
  ON public.products FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete products"
  ON public.products FOR DELETE
  USING (true);

CREATE POLICY "Allow public insert testimonials"
  ON public.testimonials FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update testimonials"
  ON public.testimonials FOR UPDATE
  USING (true);

CREATE POLICY "Allow public delete testimonials"
  ON public.testimonials FOR DELETE
  USING (true);

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Storage policies
CREATE POLICY "Anyone can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Anyone can upload product images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Anyone can delete product images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'product-images');

-- Seed initial products
INSERT INTO public.products (title, description, price, bonus_price, status, images) VALUES
  ('HP EliteBook 840 G5', 'Powerful business laptop featuring Intel Core i5 8th Gen processor, 8GB DDR4 RAM, 256GB SSD, 14-inch Full HD display. Perfect for professionals and students alike. Comes with Windows 11 Pro pre-installed.', 250000, 280000, 'available', ARRAY['/products/laptop.jpg']),
  ('Epson EcoTank L3250 Printer', 'All-in-one wireless inkjet printer with high-capacity ink tank system. Print, scan, and copy with ultra-low cost per page. Wi-Fi enabled for easy wireless printing from any device.', 120000, NULL, 'available', ARRAY['/products/printer.jpg']),
  ('Hikvision 4-Channel CCTV Kit', 'Complete CCTV surveillance system with 4 HD cameras, DVR recorder, 1TB hard drive, cables, and power supply. Night vision up to 20m. Mobile app for remote viewing.', 185000, 210000, 'available', ARRAY['/products/cctv.jpg']),
  ('Computer Accessories Bundle', 'Essential accessories pack including wireless keyboard and mouse combo, USB headset with microphone, USB hub, and premium HDMI cable. Compatible with all laptops and desktops.', 35000, NULL, 'available', ARRAY['/products/accessories.jpg']);

-- Seed initial testimonials
INSERT INTO public.testimonials (name, role, text) VALUES
  ('Adebayo Johnson', 'Business Owner', 'Omniscience Computer fixed my laptop in less than 24 hours. Excellent service and very professional team!'),
  ('Chioma Okafor', 'Student', 'I bought a refurbished laptop from them and it works perfectly. Great prices and reliable products.'),
  ('Ibrahim Musa', 'Office Manager', 'They installed CCTV cameras in our office and the quality is amazing. Highly recommended!');
