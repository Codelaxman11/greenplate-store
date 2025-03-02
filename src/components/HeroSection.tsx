
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay the animation slightly for a better effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className={`max-w-2xl md:w-1/2 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                100% Plant-Based
              </span>
            </div>
            <h1 className="text-balance font-semibold mb-4">
              Nourish Your Body with Plant-Powered Goodness
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-balance">
              Discover delicious, chef-crafted vegan and vegetarian meals that make healthy eating effortless.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" asChild className="group">
                <Link to="/products">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Our Story</Link>
              </Button>
            </div>
          </div>
          
          {/* Image */}
          <div className={`mt-12 md:mt-0 md:w-1/2 transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop&crop=focalpoint" 
                alt="Healthy vegan food" 
                className="rounded-2xl shadow-2xl object-cover"
              />
              <div className="absolute -bottom-6 -left-6 md:-bottom-8 md:-left-8 bg-white rounded-xl p-4 shadow-lg animate-float">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20.94 15.84A8 8 0 0 0 6.78 9.3a8 8 0 0 0-3.51 8.27c.19.74.5 1.44.89 2.1.39.67.84 1.35.84 2.08 0 1.53-.63 2.25-1.33 2.93" />
                      <path d="M11.29 12.75a6.5 6.5 0 0 0 8.42 9.88c.8-.55 1.67-1.23 1.67-2.37 0-.83-.39-1.55-.8-2.26a9.5 9.5 0 0 1-1.02-2.31 10.5 10.5 0 0 1-.69-4.81" />
                      <path d="M14.91 5.83a8 8 0 0 0-10.45 9.47a9.1 9.1 0 0 1 .87 2.69c0 1.14-.86 1.82-1.67 2.37" />
                      <path d="M7.23 10.26A6.5 6.5 0 0 0 9.7 20.86" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Farm Fresh</p>
                    <p className="text-xs text-muted-foreground">Organic & Local</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 md:-top-8 md:-right-8 bg-white rounded-xl p-4 shadow-lg animate-float delay-300">
                <div className="flex items-center space-x-2">
                  <div className="bg-primary/10 rounded-full p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="m8 14 2.5 2.5 5-5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">100% Plant-Based</p>
                    <p className="text-xs text-muted-foreground">No Animal Products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Curved shape at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background" style={{ clipPath: 'ellipse(70% 50% at 50% 100%)' }}></div>
    </section>
  );
};

export default HeroSection;
