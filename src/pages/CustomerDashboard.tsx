
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Package, Calendar } from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Sample order for demonstration
  const sampleOrders = [
    {
      id: 'ord-123',
      productName: 'Garden Veggie Stew',
      date: 'March 03, 2025',
      total: 10.00,
      status: 'delivered'
    }
  ];
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  if (!user) {
    return null; // Will redirect in the useEffect
  }
  
  return (
    <>
      <Navbar />
      <div className="container-custom pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <Button onClick={() => navigate('/account')} variant="outline">
              Account Settings
            </Button>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Welcome back, {user.name.split(' ')[0]}!</h2>
            <p className="text-muted-foreground">
              Here you can view your order history and manage your account settings.
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">My Orders</h2>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            
            {sampleOrders.length > 0 ? (
              <div className="space-y-4">
                {sampleOrders.map((order) => (
                  <div key={order.id} className="border rounded-md p-4 transition-all hover:border-primary">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="bg-primary/10 p-2 rounded-md">
                          <ShoppingBag className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{order.productName}</h3>
                          <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              {order.date}
                            </div>
                            <div className="flex items-center">
                              <Package className="h-3.5 w-3.5 mr-1" />
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0">
                        <p className="font-semibold">${order.total.toFixed(2)}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 border border-dashed rounded-md">
                <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">No orders yet</h3>
                <p className="text-muted-foreground mb-4">When you place an order, it will appear here.</p>
                <Button onClick={() => navigate('/products')}>
                  Shop Now
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerDashboard;
