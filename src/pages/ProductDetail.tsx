import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, MessageCircle, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getProductById, Product } from '@/lib/productStore';

function formatPrice(price: number) {
  return '₦' + price.toLocaleString();
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      getProductById(id).then((p) => { setProduct(p); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="section-padding text-center"><p className="text-muted-foreground">Loading...</p></div>;
  }

  if (!product) {
    return (
      <div className="section-padding text-center">
        <p className="text-muted-foreground">Product not found.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const images = product.images.length > 0 ? product.images : ['/placeholder.svg'];
  const unavailable = product.status !== 'available';

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Products
        </Link>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 md:gap-8 md:grid-cols-2"
        >
          {/* Image slider */}
          <div>
            <div className="relative overflow-hidden rounded-xl bg-muted aspect-square max-h-[500px]">
              <img
                src={images[imageIndex]}
                alt={product.title}
                className="h-full w-full object-contain bg-muted"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 flex items-center justify-center shadow hover:bg-background transition"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-background/80 flex items-center justify-center shadow hover:bg-background transition"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/80 text-foreground text-xs font-medium px-3 py-1 rounded-full">
                    {imageIndex + 1} / {images.length}
                  </div>
                </>
              )}
              {unavailable && (
                <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
                  {product.status === 'sold' ? 'Sold' : 'Out of Stock'}
                </Badge>
              )}
            </div>

          {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImageIndex(i)}
                    className={`shrink-0 h-14 w-14 sm:h-16 sm:w-16 rounded-lg overflow-hidden border-2 transition ${
                      i === imageIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.title} ${i + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>
            <div className="mt-3 flex items-center gap-3">
              <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
              {product.bonusPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product.bonusPrice)}</span>
              )}
            </div>
            <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

            <div className="mt-8 flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full h-14 text-base font-semibold"
                disabled={unavailable}
                asChild={!unavailable}
              >
                {unavailable ? (
                  <span>Currently Unavailable</span>
                ) : (
                  <Link to={`/products/${id}/buy`}>
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Buy Product
                  </Link>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 text-base font-semibold"
                asChild
              >
                <a
                  href="https://wa.me/2348035026950"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Vendor
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
