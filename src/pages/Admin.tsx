import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/productStore';
import { Product } from '@/lib/types';
import { LogOut, Plus, Pencil, Trash2 } from 'lucide-react';

const ADMIN_EMAIL = 'Admin';
const ADMIN_PASSWORD = 'Passomni@1234@scienceword';

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem('omniscience-admin', 'true');
      onLogin();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="section-padding">
      <div className="container mx-auto px-4 max-w-sm">
        <h1 className="text-2xl font-bold text-foreground text-center mb-6">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
          <div>
            <Label htmlFor="admin-email">Username</Label>
            <Input id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="admin-pass">Password</Label>
            <Input id="admin-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full">Login</Button>
        </form>
      </div>
    </div>
  );
}

function ProductForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Product;
  onSave: (data: Omit<Product, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(initial?.title || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [price, setPrice] = useState(initial?.price?.toString() || '');
  const [bonusPrice, setBonusPrice] = useState(initial?.bonusPrice?.toString() || '');
  const [status, setStatus] = useState<Product['status']>(initial?.status || 'available');
  const [imageUrl, setImageUrl] = useState(initial?.images?.[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      bonusPrice: bonusPrice ? Number(bonusPrice) : undefined,
      status,
      images: imageUrl.trim() ? [imageUrl.trim()] : [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
      <div>
        <Label>Product Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} maxLength={1000} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price (₦)</Label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min={0} />
        </div>
        <div>
          <Label>Original Price (₦) — optional</Label>
          <Input type="number" value={bonusPrice} onChange={(e) => setBonusPrice(e.target.value)} min={0} />
        </div>
      </div>
      <div>
        <Label>Status</Label>
        <Select value={status} onValueChange={(v) => setStatus(v as Product['status'])}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="sold">Sold</SelectItem>
            <SelectItem value="not-in-stock">Not in Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Image URL</Label>
        <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" />
      </div>
      <div className="flex gap-2">
        <Button type="submit">{initial ? 'Update Product' : 'Add Product'}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('omniscience-admin') === 'true');
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (authed) setProducts(getProducts());
  }, [authed]);

  const refresh = () => setProducts(getProducts());

  const handleLogout = () => {
    sessionStorage.removeItem('omniscience-admin');
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const handleAdd = (data: Omit<Product, 'id' | 'createdAt'>) => {
    addProduct(data);
    setAdding(false);
    refresh();
    toast({ title: 'Product added!' });
  };

  const handleUpdate = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (!editing) return;
    updateProduct(editing.id, data);
    setEditing(null);
    refresh();
    toast({ title: 'Product updated!' });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this product?')) return;
    deleteProduct(id);
    refresh();
    toast({ title: 'Product deleted.' });
  };

  const statusColor = (s: Product['status']) =>
    s === 'available' ? 'bg-green-100 text-green-800' : s === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-1" /> Logout
          </Button>
        </div>

        {adding ? (
          <ProductForm onSave={handleAdd} onCancel={() => setAdding(false)} />
        ) : editing ? (
          <ProductForm initial={editing} onSave={handleUpdate} onCancel={() => setEditing(null)} />
        ) : (
          <>
            <Button onClick={() => setAdding(true)} className="mb-6">
              <Plus className="h-4 w-4 mr-1" /> Add Product
            </Button>

            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
                  {p.images[0] && (
                    <img src={p.images[0]} alt="" className="h-14 w-14 rounded-md object-cover shrink-0 bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-card-foreground truncate">{p.title}</p>
                    <p className="text-sm text-primary font-semibold">₦{p.price.toLocaleString()}</p>
                  </div>
                  <Badge className={statusColor(p.status)}>{p.status}</Badge>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => setEditing(p)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(p.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
