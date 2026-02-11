import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ADMIN_USER = 'Admin';
const ADMIN_PASS = 'Passomni@1234@scienceword';

export default function Privacy() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem('omniscience-admin', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-foreground mb-6">Privacy Policy</h1>

        <div className="prose prose-sm text-muted-foreground space-y-4">
          <p>Last updated: February 2025</p>

          <h2 className="text-lg font-semibold text-foreground mt-6">1. Information We Collect</h2>
          <p>When you use our website or submit forms, we may collect your name, email address, phone number, and any additional details you provide. This information is used solely to respond to your inquiries and process your requests.</p>

          <h2 className="text-lg font-semibold text-foreground mt-6">2. How We Use Your Information</h2>
          <p>We use your personal information to respond to inquiries, process purchase requests, send newsletters (if subscribed), and improve our services. We do not sell or share your information with third parties.</p>

          <h2 className="text-lg font-semibold text-foreground mt-6">3. Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

          <h2 className="text-lg font-semibold text-foreground mt-6">4. Cookies</h2>
          <p>Our website may use cookies to enhance your browsing experience. You can disable cookies in your browser settings.</p>

          <h2 className="text-lg font-semibold text-foreground mt-6">5. Contact</h2>
          <p>If you have questions about this Privacy Policy, contact us at omnisciencecomputer@gmail.com.</p>
        </div>

        {/* Hidden admin access */}
        <div className="mt-20 text-center">
          <button
            onClick={() => { setShowLogin(true); setError(''); setUsername(''); setPassword(''); }}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors"
          >
            <Lock className="h-3 w-3" /> Admin
          </button>
        </div>
      </div>

      {/* Admin login dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Admin Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="priv-user">Username</Label>
              <Input id="priv-user" value={username} onChange={(e) => setUsername(e.target.value)} required className="h-11" />
            </div>
            <div>
              <Label htmlFor="priv-pass">Password</Label>
              <Input id="priv-pass" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-11" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full h-11">Login</Button>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
