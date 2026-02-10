import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

export default function Privacy() {
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
          <Link to="/admin" className="inline-flex items-center gap-1 text-xs text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors">
            <Lock className="h-3 w-3" /> Admin
          </Link>
        </div>
      </div>
    </section>
  );
}
