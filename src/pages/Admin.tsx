import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/productStore';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/testimonialStore';
import { Product, Testimonial } from '@/lib/types';
import { LogOut, Plus, Pencil, Trash2, Upload, X } from 'lucide-react';

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

/* ─── Image Upload Helper ─── */
function ImageUpload({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be under 2MB');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Label>Product Image</Label>
      {value ? (
        <div className="relative mt-1 inline-block">
          <img src={value} alt="Preview" className="h-24 w-24 rounded-lg object-cover border bg-muted" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-1 flex h-24 w-full items-center justify-center rounded-lg border-2 border-dashed border-input bg-muted/50 text-muted-foreground text-sm hover:border-primary transition-colors"
        >
          <Upload className="h-5 w-5 mr-2" /> Upload Image
        </button>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
}

/* ─── Product Form ─── */
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
  const [image, setImage] = useState(initial?.images?.[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      bonusPrice: bonusPrice ? Number(bonusPrice) : undefined,
      status,
      images: image ? [image] : [],
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
      <ImageUpload value={image} onChange={setImage} />
      <div className="flex gap-2">
        <Button type="submit">{initial ? 'Update Product' : 'Add Product'}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

/* ─── Testimonial Form ─── */
function TestimonialForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Testimonial;
  onSave: (data: Omit<Testimonial, 'id'>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || '');
  const [role, setRole] = useState(initial?.role || '');
  const [text, setText] = useState(initial?.text || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name: name.trim(), role: role.trim(), text: text.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-card p-6">
      <div>
        <Label>Customer Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} />
      </div>
      <div>
        <Label>Role / Title</Label>
        <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Business Owner" required maxLength={100} />
      </div>
      <div>
        <Label>Testimonial Text</Label>
        <Textarea value={text} onChange={(e) => setText(e.target.value)} required rows={3} maxLength={500} />
      </div>
      <div className="flex gap-2">
        <Button type="submit">{initial ? 'Update Testimonial' : 'Add Testimonial'}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
      </div>
    </form>
  );
}

/* ─── Admin Dashboard ─── */
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('omniscience-admin') === 'true');
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [addingProduct, setAddingProduct] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [addingTestimonial, setAddingTestimonial] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (authed) {
      setProducts(getProducts());
      setTestimonials(getTestimonials());
    }
  }, [authed]);

  const refreshProducts = () => setProducts(getProducts());
  const refreshTestimonials = () => setTestimonials(getTestimonials());

  const handleLogout = () => {
    sessionStorage.removeItem('omniscience-admin');
    setAuthed(false);
  };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  /* Product handlers */
  const handleAddProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    addProduct(data);
    setAddingProduct(false);
    refreshProducts();
    toast({ title: 'Product added!' });
  };
  const handleUpdateProduct = (data: Omit<Product, 'id' | 'createdAt'>) => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, data);
    setEditingProduct(null);
    refreshProducts();
    toast({ title: 'Product updated!' });
  };
  const handleDeleteProduct = (id: string) => {
    if (!confirm('Delete this product?')) return;
    deleteProduct(id);
    refreshProducts();
    toast({ title: 'Product deleted.' });
  };

  /* Testimonial handlers */
  const handleAddTestimonial = (data: Omit<Testimonial, 'id'>) => {
    addTestimonial(data);
    setAddingTestimonial(false);
    refreshTestimonials();
    toast({ title: 'Testimonial added!' });
  };
  const handleUpdateTestimonial = (data: Omit<Testimonial, 'id'>) => {
    if (!editingTestimonial) return;
    updateTestimonial(editingTestimonial.id, data);
    setEditingTestimonial(null);
    refreshTestimonials();
    toast({ title: 'Testimonial updated!' });
  };
  const handleDeleteTestimonial = (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    deleteTestimonial(id);
    refreshTestimonials();
    toast({ title: 'Testimonial deleted.' });
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

        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          {/* ─── Products Tab ─── */}
          <TabsContent value="products">
            {addingProduct ? (
              <ProductForm onSave={handleAddProduct} onCancel={() => setAddingProduct(false)} />
            ) : editingProduct ? (
              <ProductForm initial={editingProduct} onSave={handleUpdateProduct} onCancel={() => setEditingProduct(null)} />
            ) : (
              <>
                <Button onClick={() => setAddingProduct(true)} className="mb-6">
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
                        <Button variant="ghost" size="sm" onClick={() => setEditingProduct(p)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(p.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* ─── Testimonials Tab ─── */}
          <TabsContent value="testimonials">
            {addingTestimonial ? (
              <TestimonialForm onSave={handleAddTestimonial} onCancel={() => setAddingTestimonial(false)} />
            ) : editingTestimonial ? (
              <TestimonialForm initial={editingTestimonial} onSave={handleUpdateTestimonial} onCancel={() => setEditingTestimonial(null)} />
            ) : (
              <>
                <Button onClick={() => setAddingTestimonial(true)} className="mb-6">
                  <Plus className="h-4 w-4 mr-1" /> Add Testimonial
                </Button>
                <div className="space-y-3">
                  {testimonials.map((t) => (
                    <div key={t.id} className="flex items-start gap-4 rounded-lg border bg-card p-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-card-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                        <p className="text-sm text-muted-foreground mt-1 italic">"{t.text}"</p>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <Button variant="ghost" size="sm" onClick={() => setEditingTestimonial(t)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteTestimonial(t.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
