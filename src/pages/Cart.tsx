
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to checkout.",
        variant: "destructive",
      });
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    
    if (cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before checking out.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate checkout process
    setTimeout(() => {
      toast({
        title: "Order placed successfully!",
        description: "Your order has been placed and will be processed shortly.",
      });
      clearCart();
      setIsProcessing(false);
      navigate('/');
    }, 2000);
  };

  const subtotal = getCartTotal();
  const shipping = cartItems.length > 0 ? (subtotal >= 50 ? 0 : 5.99) : 0;
  const total = subtotal + shipping;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-semibold mb-8">Shopping Cart</h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-secondary/30 rounded-xl">
              <div className="flex justify-center mb-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-8">
                Looks like you haven't added any items to your cart yet.
                Browse our products and find something delicious!
              </p>
              <Button asChild size="lg">
                <Link to="/products">
                  Start Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {/* Cart Table Header - Desktop */}
                  <div className="hidden md:grid md:grid-cols-12 bg-secondary/50 p-4">
                    <div className="md:col-span-6">
                      <span className="font-medium">Product</span>
                    </div>
                    <div className="md:col-span-2 text-center">
                      <span className="font-medium">Price</span>
                    </div>
                    <div className="md:col-span-2 text-center">
                      <span className="font-medium">Quantity</span>
                    </div>
                    <div className="md:col-span-2 text-right">
                      <span className="font-medium">Subtotal</span>
                    </div>
                  </div>
                  
                  {/* Cart Items */}
                  <div className="divide-y divide-border">
                    {cartItems.map(item => (
                      <div key={item.id} className="p-4 md:grid md:grid-cols-12 md:items-center">
                        {/* Product Info */}
                        <div className="md:col-span-6 flex items-center">
                          <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <h3 className="font-medium">
                              <Link to={`/product/${item.id}`} className="hover:text-primary transition-colors">
                                {item.name}
                              </Link>
                            </h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-sm text-red-500 hover:text-red-700 transition-colors flex items-center mt-1"
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Remove
                            </button>
                          </div>
                        </div>
                        
                        {/* Price - Mobile & Desktop */}
                        <div className="md:col-span-2 md:text-center flex justify-between md:block mt-4 md:mt-0">
                          <span className="text-sm text-muted-foreground md:hidden">Price:</span>
                          <span>${item.price.toFixed(2)}</span>
                        </div>
                        
                        {/* Quantity - Mobile & Desktop */}
                        <div className="md:col-span-2 md:text-center flex justify-between items-center md:justify-center mt-4 md:mt-0">
                          <span className="text-sm text-muted-foreground md:hidden">Quantity:</span>
                          <div className="inline-flex">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity === 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="flex items-center justify-center w-8 h-8 border-y border-input bg-background">
                              {item.quantity}
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity === item.inStock}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Subtotal - Mobile & Desktop */}
                        <div className="md:col-span-2 md:text-right flex justify-between md:block mt-4 md:mt-0">
                          <span className="text-sm text-muted-foreground md:hidden">Subtotal:</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cart Actions */}
                  <div className="p-4 bg-secondary/20 flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      className="text-sm"
                      onClick={() => navigate('/products')}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Button>
                    <Button 
                      variant="outline" 
                      className="text-sm text-red-500 hover:text-red-700 border-red-200 hover:border-red-300"
                      onClick={clearCart}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        {subtotal < 50 && shipping > 0 && (
                          <span className="block text-xs text-muted-foreground mt-1">
                            Free shipping on orders over $50
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border flex justify-between">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Proceed to Checkout'
                    )}
                  </Button>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">We Accept</h3>
                    <div className="flex space-x-2">
                      <img src="https://static.vecteezy.com/system/resources/previews/022/100/686/original/visa-mastercard-logos-transparent-background-free-png.png" alt="Payment methods" className="h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
