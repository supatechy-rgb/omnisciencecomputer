import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import PageHeader from '@/components/PageHeader';

const contactInfo = [
  { icon: Phone, label: 'Phone', value: '08035026950 / 09123043159' },
  { icon: Mail, label: 'Email', value: 'omnisciencecomputer@gmail.com' },
  { icon: MapPin, label: 'Address', value: '8, Oremeji Street, Ikeja, C/O Devine Favour Computer' },
];

const fade = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://formspree.io/f/xpqjprdd', {
        method: 'POST',
        body: new FormData(e.currentTarget),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        toast({ title: 'Message Sent!', description: 'Thank you for reaching out. We will get back to you shortly.' });
        (e.target as HTMLFormElement).reset();
      } else {
        toast({ title: 'Failed to send', description: 'Please try again or contact us via phone.', variant: 'destructive' });
      }
    } catch {
      toast({ title: 'Network error', description: 'Please check your connection and try again.', variant: 'destructive' });
    }
    setLoading(false);
  };

  return (
    <>
      <PageHeader title="Contact Us" description="Have a question or need our services? We'd love to hear from you." />

      <section className="section-padding">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div {...fade}>
              <h2 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h2>
              <div className="space-y-5">
                {contactInfo.map((c) => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{c.label}</p>
                      <p className="text-sm text-muted-foreground">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div {...fade} transition={{ delay: 0.1 }}>
              <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
                <div>
                  <Label htmlFor="c-name">Name</Label>
                  <Input id="c-name" name="name" placeholder="Your full name" required maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="c-email">Email</Label>
                  <Input id="c-email" name="email" type="email" placeholder="your@email.com" required maxLength={255} />
                </div>
                <div>
                  <Label htmlFor="c-phone">Phone Number</Label>
                  <Input id="c-phone" name="phone" type="tel" placeholder="08012345678" required maxLength={20} />
                </div>
                <div>
                  <Label htmlFor="c-subject">Subject</Label>
                  <Select name="subject" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Interested in a product</SelectItem>
                      <SelectItem value="service">Interested in a service</SelectItem>
                      <SelectItem value="inquiry">General inquiry</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea id="c-message" name="message" placeholder="How can we help you?" rows={4} required maxLength={1000} />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
