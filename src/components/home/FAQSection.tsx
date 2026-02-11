import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  { q: 'How long does a typical laptop repair take?', a: 'Most repairs are completed within 24–48 hours. Complex repairs may take longer, and we will keep you informed throughout the process.' },
  { q: 'Do you offer warranties on repairs?', a: 'Yes, all our repairs come with a warranty period. The duration depends on the type of repair performed.' },
  { q: 'Can I purchase products and pay on delivery?', a: 'We accept payment on pickup at our Ikeja office. Simply submit a purchase request through our website, and our team will contact you to arrange the details.' },
  { q: 'What brands of laptops do you repair?', a: 'We repair all major brands including HP, Dell, Lenovo, Asus, Acer, Toshiba, Apple MacBook, and more.' },
  { q: 'Do you offer CCTV installation for homes?', a: 'Yes! We install CCTV systems for both homes and businesses. We offer various packages to suit different security needs and budgets.' },
];

export default function FAQSection() {
  return (
    <section className="section-alt section-padding">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm font-medium">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
