import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/testimonialStore';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 80 } },
};

export default function TestimonialsSection() {
  const testimonials = getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2">Trusted by over 100 happy customers</p>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={item}
              whileHover={{ y: -4, boxShadow: '0 8px 30px -12px hsl(340 82% 52% / 0.15)' }}
              className="rounded-xl border bg-card p-6 transition-colors"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 + 0.2 }}
                  >
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
              <div className="mt-4">
                <p className="font-semibold text-card-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
