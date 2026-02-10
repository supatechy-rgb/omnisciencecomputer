import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';

function formatPrice(price: number) {
  return '₦' + price.toLocaleString();
}

export default function ProductCard({ product }: { product: Product }) {
  const isSold = product.status === 'sold';
  const isOutOfStock = product.status === 'not-in-stock';
  const unavailable = isSold || isOutOfStock;

  return (
    <div className="group rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.images[0] || '/placeholder.svg'}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {isSold && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">Sold</Badge>
        )}
        {isOutOfStock && (
          <Badge variant="secondary" className="absolute top-3 right-3">Out of Stock</Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-card-foreground line-clamp-1">{product.title}</h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-lg font-bold text-primary">{formatPrice(product.price)}</span>
          {product.bonusPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(product.bonusPrice)}</span>
          )}
        </div>
        <Button asChild className="mt-3 w-full" size="sm" disabled={unavailable}>
          <Link to={`/products/${product.id}`}>
            {unavailable ? 'Unavailable' : 'View Product'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
