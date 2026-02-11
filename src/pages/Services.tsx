import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Laptop, Monitor, Printer, Camera, ShoppingBag } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import PageHeader from '@/components/PageHeader';
import serviceLaptop from '@/assets/service-laptop.jpg';
import servicePrinter from '@/assets/service-printer.jpg';
import serviceCctv from '@/assets/service-cctv.jpg';
import serviceAccessories from '@/assets/service-accessories.jpg';

const services = [
  {
    icon: Laptop,
    image: serviceLaptop,
    title: 'Laptop Repair',
    short: 'Expert repair for all laptop brands and models.',
    details: 'We handle screen replacements, keyboard repairs, battery replacements, motherboard repairs, software troubleshooting, virus removal, data recovery, and hardware upgrades. All major brands including HP, Dell, Lenovo, Asus, Acer, Toshiba, and Apple MacBook.',
  },
  {
    icon: Monitor,
    image: serviceLaptop,
    title: 'Computer Repair',
    short: 'Desktop and all-in-one computer repair services.',
    details: 'From power supply issues to RAM upgrades, hard drive replacements, OS installations, and networking setup. We service both Windows and Mac desktop systems with quick turnaround times.',
  },
  {
    icon: Printer,
    image: servicePrinter,
    title: 'Printer Repair',
    short: 'Professional printer servicing and maintenance.',
    details: 'Ink and laser printer repairs, print head cleaning, roller replacements, paper jam fixes, and regular maintenance services. We work with HP, Canon, Epson, Brother, and other major brands.',
  },
  {
    icon: Camera,
    image: serviceCctv,
    title: 'CCTV Installation',
    short: 'Complete security camera installation for homes and offices.',
    details: 'We provide end-to-end CCTV solutions including site assessment, camera selection, professional installation, DVR/NVR setup, mobile app configuration for remote viewing, and ongoing maintenance support.',
  },
  {
    icon: ShoppingBag,
    image: serviceAccessories,
    title: 'Sales of Tech Accessories',
    short: 'Quality laptops, printers, and computer accessories.',
    details: 'We sell pre-owned and brand new laptops, printers, keyboards, mice, headsets, cables, chargers, hard drives, RAM modules, and more. All products come with a satisfaction guarantee.',
  },
];

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Services() {
  return (
    <>
      <PageHeader title="Our Services" description="Comprehensive tech solutions for individuals and businesses" />

      <section className="section-padding">
        <div className="container mx-auto px-4 max-w-3xl">
          <Accordion type="multiple" className="space-y-4">
            {services.map((s, i) => (
              <motion.div key={s.title} {...fade} transition={{ delay: i * 0.08 }}>
                <AccordionItem value={s.title} className="border rounded-xl overflow-hidden">
                  {/* Service image */}
                  <div className="h-40 sm:h-48 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-5">
                    <AccordionTrigger className="py-5 hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                          <s.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{s.title}</p>
                          <p className="text-sm text-muted-foreground">{s.short}</p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm text-muted-foreground pl-[52px]">
                      {s.details}
                    </AccordionContent>
                  </div>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="section-alt section-padding">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Need Our Services?</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get in touch with us today and let us help you with your tech needs.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
