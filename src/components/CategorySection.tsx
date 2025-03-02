
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const CategorySection = () => {
  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-semibold mb-4">Browse Categories</h2>
          <p className="text-muted-foreground text-lg">
            Explore our range of plant-based options
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {categories.slice(0, 6).map((category, index) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className={`group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 h-64 ${index === 0 ? 'md:col-span-2' : ''}`}
            >
              {/* Image with overlay */}
              <div className="absolute inset-0">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-white text-xl font-medium mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm mb-4">{category.description}</p>
                <span className="inline-flex items-center text-white text-sm font-medium">
                  Shop Now 
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
