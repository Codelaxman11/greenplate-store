
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Log cart updates for debugging
  useEffect(() => {
    console.log('Cart updated in Navbar:', cartItems);
    console.log('Total items:', totalItems);
  }, [cartItems, totalItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-blur py-2 shadow-sm' : 'py-4'}`}>
      <div className="container-custom flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-semibold text-xl lg:text-2xl">Aahaar</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="link-hover font-medium">Home</Link>
          <Link to="/products" className="link-hover font-medium">Shop</Link>
          <Link to="/how-we-cook" className="link-hover font-medium">How We Cook</Link>
          <Link to="/about" className="link-hover font-medium">About</Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to={user.isAdmin ? "/dashboard" : "/customer-dashboard"} className="flex items-center space-x-1">
                <User size={20} />
                <span className="font-medium">{user.name.split(' ')[0]}</span>
              </Link>
              <Button variant="ghost" onClick={handleLogout} className="text-sm">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" className="flex items-center space-x-1">
                <User size={20} />
                <span>Sign In</span>
              </Button>
            </Link>
          )}
          <Link to="/cart" className="relative group">
            <ShoppingCart size={24} className="transition-transform group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <Link to="/cart" className="relative group">
            <ShoppingCart size={22} className="transition-transform group-hover:scale-110" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transition-all">
                {totalItems}
              </span>
            )}
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}
        style={{ top: '60px' }}
      >
        <div className="flex flex-col p-8 space-y-6">
          <Link to="/" className="text-xl font-medium" onClick={closeMenu}>Home</Link>
          <Link to="/products" className="text-xl font-medium" onClick={closeMenu}>Shop</Link>
          <Link to="/how-we-cook" className="text-xl font-medium" onClick={closeMenu}>How We Cook</Link>
          <Link to="/about" className="text-xl font-medium" onClick={closeMenu}>About</Link>
          
          <div className="pt-6 border-t border-border">
            {user ? (
              <>
                <Link 
                  to={user.isAdmin ? "/dashboard" : "/customer-dashboard"}
                  className="flex items-center space-x-2 text-xl font-medium mb-4"
                  onClick={closeMenu}
                >
                  <User size={20} />
                  <span>{user.name}</span>
                </Link>
                <Button onClick={handleLogout} className="w-full">Logout</Button>
              </>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <Button className="w-full">Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
