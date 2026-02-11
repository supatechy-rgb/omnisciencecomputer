import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function CTASection() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring' as const, stiffness: 60 }}
          className="rounded-2xl bg-primary p-10 md:p-16 text-center text-primary-foreground relative overflow-hidden"
        >
          {/* Decorative floating shapes */}
          <motion.div
            animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' as const }}
            className="absolute top-6 left-8 h-16 w-16 rounded-full bg-primary-foreground/10 hidden md:block"
          />
          <motion.div
            animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' as const }}
            className="absolute bottom-8 right-12 h-24 w-24 rounded-full bg-primary-foreground/5 hidden md:block"
          />

          <h2 className="text-3xl font-bold md:text-4xl relative z-10">Ready to Get Started?</h2>
          <p className="mt-3 max-w-lg mx-auto opacity-90 relative z-10">
            Whether you need a repair, installation, or want to purchase quality tech products — we're here to help.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap justify-center gap-4 relative z-10"
          >
            <Button asChild size="lg" variant="secondary" className="hover-scale">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 hover-scale"
            >
              <Link to="/products">Browse Products</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
