import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Printer, Camera, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  { icon: Laptop, title: 'Laptop & Computer Repair', desc: 'Expert diagnosis and repair for all laptop and desktop brands.' },
  { icon: Printer, title: 'Printer Repair & Maintenance', desc: 'Professional printer servicing, maintenance, and part replacement.' },
  { icon: Camera, title: 'CCTV Installation', desc: 'Full security camera setup for homes, offices, and businesses.' },
  { icon: ShoppingBag, title: 'Sales & Accessories', desc: 'Quality laptops, printers, and accessories at competitive prices.' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 80 } },
};

export default function ServicesPreview() {
  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground">Our Services</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">Professional tech solutions tailored to your needs</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={item}
              whileHover={{ y: -6, boxShadow: '0 12px 40px -15px hsl(340 82% 52% / 0.2)' }}
              className="rounded-xl border bg-card p-6 text-center transition-colors cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary"
              >
                <s.icon className="h-7 w-7 text-primary" />
              </motion.div>
              <h3 className="font-semibold text-card-foreground">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
        >
          <Button asChild variant="outline" className="hover-scale">
            <Link to="/services">View All Services</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
