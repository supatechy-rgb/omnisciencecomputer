import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import serviceLaptop from '@/assets/service-laptop.jpg';
import servicePrinter from '@/assets/service-printer.jpg';
import serviceCctv from '@/assets/service-cctv.jpg';
import serviceAccessories from '@/assets/service-accessories.jpg';

const services = [
  { image: serviceLaptop, title: 'Laptop & Computer Repair', desc: 'Expert diagnosis and repair for all laptop and desktop brands.' },
  { image: servicePrinter, title: 'Printer Repair & Maintenance', desc: 'Professional printer servicing, maintenance, and part replacement.' },
  { image: serviceCctv, title: 'CCTV Installation', desc: 'Full security camera setup for homes, offices, and businesses.' },
  { image: serviceAccessories, title: 'Sales & Accessories', desc: 'Quality laptops, printers, and accessories at competitive prices.' },
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
              whileHover={{ y: -6 }}
              className="rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-lg group cursor-default"
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-5 text-center">
                <h3 className="font-semibold text-card-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
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
