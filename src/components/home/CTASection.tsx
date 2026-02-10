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
          className="rounded-2xl bg-primary p-10 md:p-16 text-center text-primary-foreground"
        >
          <h2 className="text-3xl font-bold md:text-4xl">Ready to Get Started?</h2>
          <p className="mt-3 max-w-lg mx-auto opacity-90">
            Whether you need a repair, installation, or want to purchase quality tech products — we're here to help.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
