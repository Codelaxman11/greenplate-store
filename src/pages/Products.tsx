
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { CheckCircle, Search, SlidersHorizontal, X } from 'lucide-react';
import { Product } from '@/types';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Filter products based on search, category, and price
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API/data loading
    const timer = setTimeout(() => {
      let filtered = [...products];
      
      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      // Filter by category
      if (selectedCategory) {
        filtered = filtered.filter(product => product.category === selectedCategory);
      }
      
      // Filter by price range
      filtered = filtered.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      setFilteredProducts(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, priceRange]);

  // Update URL when category filter changes
  useEffect(() => {
    if (selectedCategory) {
      searchParams.set('category', selectedCategory);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  }, [selectedCategory, searchParams, setSearchParams]);

  // Initialize category from URL parameter
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is already handled by the useEffect above
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setPriceRange([0, 20]);
  };

  const categoryName = selectedCategory 
    ? categories.find(c => c.id === selectedCategory)?.name 
    : null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header */}
        <div className="bg-secondary/30 py-12">
          <div className="container-custom">
            <h1 className="text-4xl font-semibold">{categoryName || 'All Products'}</h1>
            <p className="text-muted-foreground mt-2">
              {categoryName 
                ? `Browse our ${categoryName.toLowerCase()} collection`
                : 'Explore our complete range of plant-based foods'}
            </p>
          </div>
        </div>
        
        <div className="container-custom py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile filter toggle */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <Button 
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {(selectedCategory || searchTerm || priceRange[0] > 0 || priceRange[1] < 20) && (
                  <span className="ml-2 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    !
                  </span>
                )}
              </Button>
              
              {(selectedCategory || searchTerm || priceRange[0] > 0 || priceRange[1] < 20) && (
                <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
            
            {/* Filters - Desktop (always visible) & Mobile (toggleable) */}
            <aside className={`lg:w-1/4 space-y-6 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
              {/* Close button (mobile only) */}
              <div className="flex justify-between items-center lg:hidden">
                <h3 className="text-lg font-medium">Filters</h3>
                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Search */}
              <div>
                <h3 className="text-lg font-medium mb-3">Search</h3>
                <form onSubmit={handleSearch} className="flex">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button type="submit" className="rounded-l-none">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
              </div>
              
              {/* Categories */}
              <div>
                <h3 className="text-lg font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button
                      key={category.id}
                      variant="ghost"
                      className={`w-full justify-start ${selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''}`}
                      onClick={() => handleCategorySelect(category.id)}
                    >
                      {selectedCategory === category.id && (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      {category.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 20]}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={20}
                    step={1}
                    className="mb-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Clear Filters - Desktop */}
              <div className="hidden lg:block">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleClearFilters}
                  disabled={!selectedCategory && !searchTerm && priceRange[0] === 0 && priceRange[1] === 20}
                >
                  Clear Filters
                </Button>
              </div>
            </aside>
            
            {/* Products Grid */}
            <div className="flex-1">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="bg-muted rounded-xl animate-pulse h-[350px]"></div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button onClick={handleClearFilters}>Clear All Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Products;
