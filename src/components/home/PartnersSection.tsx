import { motion } from 'framer-motion';
import { Handshake } from 'lucide-react';

const partners = [
  { name: 'IPNX', initials: 'IP' },
  { name: 'Caleb INT School', initials: 'CI' },
  { name: 'Water Garden School', initials: 'WG' },
  { name: 'Zenith Bank', initials: 'ZB' },
  { name: 'Oliver Bible Church', initials: 'OB' },
];

export default function PartnersSection() {
  return (
    <section className="section-padding overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground mb-4">
            <Handshake className="h-4 w-4" />
            Trusted Partners
          </div>
          <h2 className="text-3xl font-bold text-foreground">We Partner With</h2>
          <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Proud to work alongside leading organizations
          </p>
        </motion.div>

        {/* Infinite scroll carousel */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex overflow-hidden">
            <motion.div
              className="flex shrink-0 gap-8"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 20,
                  ease: 'linear',
                },
              }}
            >
              {/* Duplicate partners for seamless loop */}
              {[...partners, ...partners].map((partner, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center shrink-0 w-44 h-32 rounded-xl border bg-card p-6 hover:shadow-md hover:border-primary/30 transition-all duration-300"
                >
                  <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-3">
                    <span className="text-lg font-bold text-primary">{partner.initials}</span>
                  </div>
                  <p className="text-sm font-medium text-card-foreground text-center leading-tight">{partner.name}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
