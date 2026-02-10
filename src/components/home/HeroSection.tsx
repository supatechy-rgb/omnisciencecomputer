import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-tech.jpg';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background section-padding">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Your Trusted{' '}
              <span className="text-primary">Tech Partner</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-lg">
              With over 10 years of experience, Omniscience Computer delivers reliable laptop repairs, 
              printer maintenance, CCTV installation, and quality tech products you can trust.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg">
                <Link to="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <img
              src={heroImage}
              alt="Professional tech repair workspace at Omniscience Computer"
              className="rounded-2xl shadow-2xl w-full"
            />
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-primary p-4 text-primary-foreground shadow-lg hidden sm:block">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-sm">Years Experience</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
