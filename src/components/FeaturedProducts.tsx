
import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { Product } from '@/types';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setProducts(getFeaturedProducts());
      setIsLoaded(true);
    }, 400);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-semibold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg">
            Our most popular plant-based creations, loved by customers
          </p>
        </div>

        {!isLoaded ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-muted rounded-xl animate-pulse h-[350px]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-fade-in">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
