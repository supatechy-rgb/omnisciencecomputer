import { motion } from 'framer-motion';
import pageHeaderBg from '@/assets/page-header-bg.jpg';

interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundImage: `url(${pageHeaderBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-foreground/80" />
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl font-bold text-background">{title}</h1>
          <p className="mt-3 text-background/70 max-w-xl mx-auto">{description}</p>
        </motion.div>
      </div>
    </section>
  );
}
