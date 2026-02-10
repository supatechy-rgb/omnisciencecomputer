import { motion } from 'framer-motion';
import { Users, Clock, Shield } from 'lucide-react';

const stats = [
  { icon: Users, value: '100+', label: 'Happy Customers' },
  { icon: Clock, value: '10+', label: 'Years of Experience' },
  { icon: Shield, value: '24/7', label: 'Trusted & Reliable Service' },
];

export default function StatsSection() {
  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm"
            >
              <stat.icon className="h-8 w-8 text-primary mb-3" />
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
