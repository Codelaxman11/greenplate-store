
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Package, ShoppingBag, Users, Menu, X, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if admin is logged in
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };

    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out of the admin panel.",
    });
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarLinks = [
    { name: 'Orders', icon: ShoppingBag, path: '/admin/orders' },
    { name: 'Inventory', icon: Grid, path: '/admin/inventory' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
  ];

  return (
    <div className="flex h-screen bg-[#F5F5DC]">
      {/* Sidebar */}
      <aside 
        className={`bg-white shadow-md flex flex-col ${
          isSidebarOpen ? 'w-64' : 'w-0 md:w-16'
        } transition-all duration-300 overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className={`font-semibold text-xl ${!isSidebarOpen && 'md:hidden'}`}>Admin Panel</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X size={20} />
          </Button>
        </div>
        
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => (
              <li key={link.name}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start rounded-none px-4 py-2 text-[#333] hover:bg-[#F5F5DC] ${
                    location.pathname === link.path ? 'bg-[#F5F5DC] text-[#4CAF50]' : ''
                  }`}
                  onClick={() => navigate(link.path)}
                >
                  <link.icon size={20} className={isSidebarOpen ? 'mr-2' : 'mx-auto'} />
                  {isSidebarOpen && <span>{link.name}</span>}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-[#333] hover:bg-[#F5F5DC] ${!isSidebarOpen && 'justify-center'}`} 
            onClick={handleLogout}
          >
            <LogOut size={20} className={isSidebarOpen ? 'mr-2' : 'mx-auto'} />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm py-3 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-2" 
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </Button>
            <h1 className="text-xl font-semibold text-[#333]">{title}</h1>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
