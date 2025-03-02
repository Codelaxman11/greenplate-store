
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductByid, getProductsByCategory } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Minus, Plus, ShoppingCart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    
    setIsLoading(true);
    
    // Simulate API request
    const timer = setTimeout(() => {
      const fetchedProduct = getProductByid(id);
      
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        
        // Get related products from same category
        const related = getProductsByCategory(fetchedProduct.category)
          .filter(p => p.id !== fetchedProduct.id)
          .slice(0, 4);
        
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart(product, quantity);
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    });
  };

  const incrementQuantity = () => {
    if (product && quantity < product.inStock) {
      setQuantity(q => q + 1);
    } else {
      toast({
        title: "Maximum quantity reached",
        description: "You've reached the maximum available quantity for this product.",
      });
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  // Mock images for demo purposes (in a real app, these would be product images)
  const productImages = product ? [
    product.image,
    product.image.replace('?', '?crop=top&'),
    product.image.replace('?', '?crop=entropy&')
  ] : [];

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container-custom py-12">
            <div className="animate-pulse bg-muted h-[600px] rounded-xl"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 pt-24">
          <div className="container-custom py-16 text-center">
            <h1 className="text-3xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container-custom py-12">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-muted-foreground">/</span>
                    <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                      Products
                    </Link>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-muted-foreground">/</span>
                    <span className="text-foreground" aria-current="page">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
          
          {/* Product Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-white rounded-xl overflow-hidden">
                <img 
                  src={productImages[activeImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex space-x-4">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold mb-2">{product.name}</h1>
              <p className="text-2xl font-medium text-primary mb-4">${product.price.toFixed(2)}</p>
              
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              <div className="flex items-center space-x-1 mb-6">
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                  {product.category}
                </div>
                {product.featured && (
                  <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm">
                    Featured
                  </div>
                )}
              </div>
              
              <div className="mb-8">
                <p className="font-medium mb-2">Nutrition Facts (per serving)</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <span className="block font-semibold text-lg">{product.nutrition.calories}</span>
                    <span className="text-sm text-muted-foreground">Calories</span>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <span className="block font-semibold text-lg">{product.nutrition.protein}g</span>
                    <span className="text-sm text-muted-foreground">Protein</span>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <span className="block font-semibold text-lg">{product.nutrition.carbs}g</span>
                    <span className="text-sm text-muted-foreground">Carbs</span>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <span className="block font-semibold text-lg">{product.nutrition.fat}g</span>
                    <span className="text-sm text-muted-foreground">Fat</span>
                  </div>
                </div>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="inline-flex">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={decrementQuantity}
                    disabled={quantity === 1}
                    className="rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center justify-center w-12 h-10 border-y border-input bg-background">
                    {quantity}
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={incrementQuantity}
                    disabled={quantity === product.inStock}
                    className="rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={handleAddToCart} 
                  className="flex-1 flex items-center justify-center"
                  disabled={product.inStock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4">
                {product.inStock > 0 
                  ? `${product.inStock} items in stock`
                  : 'Currently out of stock'}
              </p>
            </div>
          </div>
          
          {/* Tabs for additional information */}
          <Tabs defaultValue="details" className="mb-16">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="bg-secondary/30 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Product Details</h3>
              <p className="mb-4">
                Our {product.name} is carefully prepared using only the finest plant-based ingredients.
                Each serving is packed with essential nutrients and a delicious, satisfying flavor.
              </p>
              <p>
                Perfect for a quick, healthy meal or a nutritious snack, this product is 100% vegan and
                contains no artificial preservatives, colors, or flavors.
              </p>
            </TabsContent>
            <TabsContent value="ingredients" className="bg-secondary/30 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Ingredients</h3>
              <p className="mb-4">
                All ingredients are ethically sourced and 100% plant-based:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Organic vegetables (varies by season)</li>
                <li>Whole grains</li>
                <li>Plant proteins (legumes, nuts, seeds)</li>
                <li>Cold-pressed oils</li>
                <li>Natural herbs and spices</li>
                <li>No artificial preservatives or additives</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="bg-secondary/30 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-4">Shipping Information</h3>
              <p className="mb-4">
                We ship all our products in eco-friendly, sustainable packaging to minimize our environmental impact.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Orders are processed and shipped within 24 hours</li>
                <li>Standard shipping: 3-5 business days</li>
                <li>Express shipping: 1-2 business days (additional fee)</li>
                <li>Free shipping on orders over $50</li>
                <li>Refrigerated items are shipped with eco-friendly insulation and ice packs</li>
              </ul>
            </TabsContent>
          </Tabs>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-6">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
