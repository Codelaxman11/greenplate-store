
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';
import { ShoppingCart, Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    setTimeout(() => {
      addToCart(product);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
      
      setIsAdding(false);
    }, 500);
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm card-hover">
        <div className="relative aspect-square overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`object-cover w-full h-full transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg">{product.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{product.category}</p>
            </div>
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          </div>
          
          <Button
            onClick={handleAddToCart}
            className="w-full mt-4 flex items-center justify-center group"
            variant="default"
            disabled={isAdding}
          >
            {isAdding ? (
              <Check className="h-4 w-4 mr-2" />
            ) : (
              <ShoppingCart className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            )}
            {isAdding ? "Added" : "Add to Cart"}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
