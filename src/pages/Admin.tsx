import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/productStore';
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/testimonialStore';
import { Product, Testimonial } from '@/lib/types';
import { LogOut, Plus, Pencil, Trash2, Upload, X, Package, MessageSquare, ArrowLeft } from 'lucide-react';
import logo from '@/assets/logo.png';

const ADMIN_EMAIL = 'Admin';
const ADMIN_PASSWORD = 'Passomni@1234@scienceword';

/* ─── Login ─── */
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
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <img src={logo} alt="Omniscience Computer" className="h-14 w-14 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Omniscience Computer</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl bg-card p-6 shadow-sm border">
          <div>
            <Label htmlFor="admin-email">Username</Label>
            <Input id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-11" />
          </div>
          <div>
            <Label htmlFor="admin-pass">Password</Label>
            <Input id="admin-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11" />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" className="w-full h-11">Login</Button>
        </form>
      </div>
    </div>
  );
}

/* ─── Image Upload ─── */
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
    reader.onloadend = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Label>Product Image</Label>
      {value ? (
        <div className="relative mt-2 inline-block">
          <img src={value} alt="Preview" className="h-28 w-28 rounded-xl object-cover border bg-muted" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="mt-2 flex h-28 w-full items-center justify-center rounded-xl border-2 border-dashed border-input bg-muted/30 text-muted-foreground text-sm hover:border-primary active:bg-muted/50 transition-colors"
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
    <div className="min-h-screen bg-muted">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card border-b px-4 py-3">
        <button onClick={onCancel} className="p-1">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h2 className="font-semibold text-foreground">{initial ? 'Edit Product' : 'Add Product'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <ImageUpload value={image} onChange={setImage} />
        <div>
          <Label>Product Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} className="h-11" />
        </div>
        <div>
          <Label>Description</Label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows={3} maxLength={1000} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>Price (₦)</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required min={0} className="h-11" />
          </div>
          <div>
            <Label>Original Price (₦)</Label>
            <Input type="number" value={bonusPrice} onChange={(e) => setBonusPrice(e.target.value)} min={0} className="h-11" placeholder="Optional" />
          </div>
        </div>
        <div>
          <Label>Status</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as Product['status'])}>
            <SelectTrigger className="h-11"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="not-in-stock">Not in Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-2 pb-6">
          <Button type="submit" className="w-full h-12 text-base">
            {initial ? 'Save Changes' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
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
    <div className="min-h-screen bg-muted">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-card border-b px-4 py-3">
        <button onClick={onCancel} className="p-1">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <h2 className="font-semibold text-foreground">{initial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <div>
          <Label>Customer Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required maxLength={100} className="h-11" />
        </div>
        <div>
          <Label>Role / Title</Label>
          <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Business Owner" required maxLength={100} className="h-11" />
        </div>
        <div>
          <Label>Testimonial Text</Label>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} required rows={4} maxLength={500} />
        </div>
        <div className="pt-2 pb-6">
          <Button type="submit" className="w-full h-12 text-base">
            {initial ? 'Save Changes' : 'Add Testimonial'}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ─── Admin Dashboard ─── */
export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('omniscience-admin') === 'true');
  const [tab, setTab] = useState<'products' | 'testimonials'>('products');
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

  /* Show full-screen forms */
  if (addingProduct) return <ProductForm onSave={handleAddProduct} onCancel={() => setAddingProduct(false)} />;
  if (editingProduct) return <ProductForm initial={editingProduct} onSave={handleUpdateProduct} onCancel={() => setEditingProduct(null)} />;
  if (addingTestimonial) return <TestimonialForm onSave={handleAddTestimonial} onCancel={() => setAddingTestimonial(false)} />;
  if (editingTestimonial) return <TestimonialForm initial={editingTestimonial} onSave={handleUpdateTestimonial} onCancel={() => setEditingTestimonial(null)} />;

  const statusColor = (s: Product['status']) =>
    s === 'available' ? 'bg-green-100 text-green-800' : s === 'sold' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800';

  return (
    <div className="min-h-screen bg-muted flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="h-8 w-8" />
          <span className="font-bold text-foreground text-sm">Admin</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 pb-24">
        {tab === 'products' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Products ({products.length})</h2>
              <Button size="sm" onClick={() => setAddingProduct(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {products.map((p) => (
                <div key={p.id} className="rounded-xl bg-card border p-3 flex gap-3 items-start">
                  {p.images[0] ? (
                    <img src={p.images[0]} alt="" className="h-16 w-16 rounded-lg object-cover shrink-0 bg-muted" />
                  ) : (
                    <div className="h-16 w-16 rounded-lg bg-muted shrink-0 flex items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-card-foreground text-sm truncate">{p.title}</p>
                    <p className="text-sm text-primary font-bold">₦{p.price.toLocaleString()}</p>
                    <Badge className={`mt-1 text-[10px] px-2 py-0 ${statusColor(p.status)}`}>{p.status}</Badge>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button onClick={() => setEditingProduct(p)} className="p-2 rounded-lg hover:bg-muted active:bg-muted transition">
                      <Pencil className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="p-2 rounded-lg hover:bg-destructive/10 active:bg-destructive/20 transition">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-sm">No products yet</p>
              )}
            </div>
          </>
        )}

        {tab === 'testimonials' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Testimonials ({testimonials.length})</h2>
              <Button size="sm" onClick={() => setAddingTestimonial(true)}>
                <Plus className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-3">
              {testimonials.map((t) => (
                <div key={t.id} className="rounded-xl bg-card border p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-card-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      <button onClick={() => setEditingTestimonial(t)} className="p-2 rounded-lg hover:bg-muted active:bg-muted transition">
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <button onClick={() => handleDeleteTestimonial(t.id)} className="p-2 rounded-lg hover:bg-destructive/10 active:bg-destructive/20 transition">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 italic line-clamp-2">"{t.text}"</p>
                </div>
              ))}
              {testimonials.length === 0 && (
                <p className="text-center text-muted-foreground py-8 text-sm">No testimonials yet</p>
              )}
            </div>
          </>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t flex z-20">
        <button
          onClick={() => setTab('products')}
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
            tab === 'products' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <Package className="h-5 w-5" />
          Products
        </button>
        <button
          onClick={() => setTab('testimonials')}
          className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors ${
            tab === 'testimonials' ? 'text-primary' : 'text-muted-foreground'
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          Testimonials
        </button>
      </div>
    </div>
  );
}
