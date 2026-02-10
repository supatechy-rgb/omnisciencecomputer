import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { getTestimonials } from '@/lib/testimonialStore';

export default function TestimonialsSection() {
  const testimonials = getTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2">Trusted by over 100 happy customers</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border bg-card p-6"
            >
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground italic">"{t.text}"</p>
              <div className="mt-4">
                <p className="font-semibold text-card-foreground text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
