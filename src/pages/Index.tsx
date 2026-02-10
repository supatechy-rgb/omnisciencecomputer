import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProductsPreview from '@/components/home/ProductsPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';

export default function Index() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesPreview />
      <ProductsPreview />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}
