import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import BuyProduct from "./pages/BuyProduct";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function WithLayout({ children }: { children: React.ReactNode }) {
  return <Layout>{children}</Layout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Full-page routes - no header/footer */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/:id/buy" element={<BuyProduct />} />
          {/* All other pages with layout */}
          <Route path="/" element={<WithLayout><Index /></WithLayout>} />
          <Route path="/about" element={<WithLayout><About /></WithLayout>} />
          <Route path="/services" element={<WithLayout><Services /></WithLayout>} />
          <Route path="/products" element={<WithLayout><Products /></WithLayout>} />
          <Route path="/products/:id" element={<WithLayout><ProductDetail /></WithLayout>} />
          <Route path="/contact" element={<WithLayout><Contact /></WithLayout>} />
          <Route path="/privacy" element={<WithLayout><Privacy /></WithLayout>} />
          <Route path="/terms" element={<WithLayout><Terms /></WithLayout>} />
          <Route path="*" element={<WithLayout><NotFound /></WithLayout>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
