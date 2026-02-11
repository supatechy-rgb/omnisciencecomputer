import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { getRecentProducts, Product } from '@/lib/productStore';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80 } },
};

export default function ProductsPreview() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getRecentProducts(4).then(setProducts);
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground">Recent Products</h2>
          <p className="text-muted-foreground mt-2">Browse our latest tech products</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Button asChild variant="outline" className="hover-scale">
            <Link to="/products">View All Products</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
