import { motion } from 'framer-motion';
import { Heart, Target, Eye, Star } from 'lucide-react';

const values = [
  { icon: Heart, title: 'Integrity', desc: 'We operate with complete honesty and transparency in all we do.' },
  { icon: Star, title: 'Excellence', desc: 'We strive for the highest quality in every service and product.' },
  { icon: Target, title: 'Customer Trust', desc: 'Building lasting relationships through reliability and consistency.' },
  { icon: Eye, title: 'Faith-Driven Service', desc: 'Grounded in faith, we serve with purpose and compassion.' },
];

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function About() {
  return (
    <>
      {/* Header */}
      <section className="section-alt section-padding">
        <div className="container mx-auto px-4 text-center">
          <motion.div {...fade}>
            <h1 className="text-4xl font-bold text-foreground">About Us</h1>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Learn about Omniscience Computer — our story, mission, and commitment to serving you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div {...fade}>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Omniscience Computer was founded with a simple yet powerful vision — to provide trusted, high-quality tech 
              services to individuals and businesses in Ikeja and beyond. With over 10 years of hands-on experience in 
              laptop repair, printer maintenance, CCTV installation, and tech product sales, we have grown from a small 
              repair shop into a comprehensive tech service provider trusted by over 100 satisfied customers.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Our motto, <em className="text-primary font-medium">"We trust in the living God,"</em> reflects the foundation 
              of our business. We believe in operating with integrity, treating every customer with respect, and delivering 
              service that exceeds expectations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-alt section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="grid gap-8 md:grid-cols-2">
            <motion.div {...fade}>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional tech repair services, quality products, and reliable installations while 
                maintaining the highest standards of honesty, customer satisfaction, and professional excellence.
              </p>
            </motion.div>
            <motion.div {...fade} transition={{ delay: 0.1 }}>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become Nigeria's most trusted tech service provider, known for integrity, expertise, and 
                unwavering commitment to customer success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Our Core Values</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                {...fade}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border bg-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
