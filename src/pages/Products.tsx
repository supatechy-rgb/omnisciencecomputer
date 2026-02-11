import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts, Product } from '@/lib/productStore';
import PageHeader from '@/components/PageHeader';

export default function Products() {
  const [filter, setFilter] = useState<'all' | 'available'>('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((p) => { setProducts(p); setLoading(false); });
  }, []);

  const filtered = filter === 'all' ? products : products.filter((p) => p.status === 'available');

  return (
    <>
      <PageHeader title="Our Products" description="Quality tech products at competitive prices" />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-2 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setFilter('available')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'available' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              Available
            </button>
          </div>

          {loading ? (
            <p className="text-center text-muted-foreground py-12">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products found.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
