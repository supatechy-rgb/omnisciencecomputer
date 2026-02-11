import { motion } from 'framer-motion';
import { Users, Clock, Shield } from 'lucide-react';

const stats = [
  { icon: Users, value: '100+', label: 'Happy Customers' },
  { icon: Clock, value: '10+', label: 'Years of Experience' },
  { icon: Shield, value: '24/7', label: 'Trusted & Reliable Service' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring' as const, stiffness: 100 } },
};

export default function StatsSection() {
  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-3"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={item}
              whileHover={{ y: -4, boxShadow: '0 8px 30px -12px hsl(340 82% 52% / 0.3)' }}
              className="flex flex-col items-center rounded-xl bg-card p-8 text-center shadow-sm transition-colors"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <stat.icon className="h-8 w-8 text-primary mb-3" />
              </motion.div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
