import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';

interface Props {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BuyProductModal({ product, open, onOpenChange }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with Formspree endpoint
    // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: new FormData(e.currentTarget) });

    setTimeout(() => {
      setLoading(false);
      onOpenChange(false);
      toast({
        title: 'Order Submitted!',
        description: 'Thank you for your order. Our team will reach out to you regarding your purchase.',
      });
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy: {product.title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="buy-name">Name</Label>
            <Input id="buy-name" name="name" placeholder="Your full name" required maxLength={100} />
          </div>
          <div>
            <Label htmlFor="buy-email">Email</Label>
            <Input id="buy-email" name="email" type="email" placeholder="your@email.com" required maxLength={255} />
          </div>
          <div>
            <Label htmlFor="buy-phone">Phone Number</Label>
            <Input id="buy-phone" name="phone" type="tel" placeholder="08012345678" required maxLength={20} />
          </div>
          <div>
            <Label htmlFor="buy-details">Additional Details</Label>
            <Textarea id="buy-details" name="details" placeholder="Any special requests or notes..." rows={3} maxLength={500} />
          </div>
          <input type="hidden" name="product" value={product.title} />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Order'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
