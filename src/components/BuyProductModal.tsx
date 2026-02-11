import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/lib/types';

interface Props {
  product: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatPrice(price: number) {
  return '₦' + price.toLocaleString();
}

export default function BuyProductModal({ product, open, onOpenChange }: Props) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const image = product.images?.[0] || '/placeholder.svg';

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
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Buy Product</DialogTitle>
        </DialogHeader>

        {/* Product summary */}
        <div className="flex gap-3 p-3 rounded-xl bg-muted border">
          <img src={image} alt={product.title} className="h-16 w-16 rounded-lg object-cover shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">{product.title}</p>
            <p className="text-primary font-bold text-lg">{formatPrice(product.price)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="hidden" name="product_name" value={product.title} />
          <input type="hidden" name="product_price" value={product.price} />
          <div>
            <Label htmlFor="buy-name">Full Name</Label>
            <Input id="buy-name" name="name" placeholder="Your full name" required maxLength={100} className="h-11" />
          </div>
          <div>
            <Label htmlFor="buy-phone">Phone Number</Label>
            <Input id="buy-phone" name="phone" type="tel" placeholder="08012345678" required maxLength={20} className="h-11" />
          </div>
          <div>
            <Label htmlFor="buy-email">Email</Label>
            <Input id="buy-email" name="email" type="email" placeholder="your@email.com" required maxLength={255} className="h-11" />
          </div>
          <div>
            <Label htmlFor="buy-location">Nearest Location</Label>
            <Input id="buy-location" name="nearest_location" placeholder="e.g. Ikeja, Lagos" required maxLength={200} className="h-11" />
          </div>
          <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Order'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
