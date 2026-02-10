import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getRecentProducts } from '@/lib/productStore';

export default function ProductsPreview() {
  const products = getRecentProducts(4);

  if (products.length === 0) return null;

  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Recent Products</h2>
          <p className="text-muted-foreground mt-2">Browse our latest tech products</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
