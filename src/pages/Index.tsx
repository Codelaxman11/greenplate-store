
import { useState, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategorySection from '@/components/CategorySection';
import NewsletterSignup from '@/components/NewsletterSignup';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
          <p className="mt-4 text-muted-foreground animate-pulse">Loading Aahaar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategorySection />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
