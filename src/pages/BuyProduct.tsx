import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { getProductById, Product } from '@/lib/productStore';

function formatPrice(price: number) {
  return '₦' + price.toLocaleString();
}

export default function BuyProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      getProductById(id).then((p) => { setProduct(p); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-muted"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted p-4">
        <div className="text-center">
          <p className="text-muted-foreground">Product not found.</p>
          <Button asChild variant="outline" className="mt-4">
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const image = product.images?.[0] || '/placeholder.svg';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Replace with Formspree endpoint
    // const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', { method: 'POST', body: new FormData(e.currentTarget) });

    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: 'Order Submitted!',
        description: 'Thank you for your order. Our team will reach out to you shortly.',
      });
      navigate(`/products/${id}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-muted">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card border-b px-4 py-3">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h1 className="font-semibold text-foreground">Buy Product</h1>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-5">
        <div className="flex gap-3 p-3 rounded-xl bg-card border">
          <img src={image} alt={product.title} className="h-20 w-20 rounded-lg object-cover shrink-0" />
          <div className="min-w-0 flex flex-col justify-center">
            <p className="font-semibold text-foreground text-sm truncate">{product.title}</p>
            <p className="text-primary font-bold text-xl">{formatPrice(product.price)}</p>
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
          <div>
            <Label htmlFor="buy-note">Extra Note (Optional)</Label>
            <Textarea id="buy-note" name="extra_note" placeholder="Any special requests, preferred delivery time, etc." rows={3} maxLength={500} />
          </div>
          <div className="pt-2 pb-6">
            <Button type="submit" className="w-full h-12 text-base" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Order'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
