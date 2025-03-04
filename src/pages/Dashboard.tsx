
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShoppingBag, Users, Package, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect if not logged in or not an admin
    if (!user) {
      navigate('/login');
    } else if (!user.isAdmin) {
      navigate('/account');
    }
  }, [user, navigate]);
  
  if (!user || !user.isAdmin) {
    return null; // Will redirect in the useEffect
  }
  
  const dashboardCards = [
    {
      title: "Orders",
      icon: <ShoppingBag className="h-8 w-8 text-primary" />,
      value: "24",
      label: "Total Orders"
    },
    {
      title: "Customers",
      icon: <Users className="h-8 w-8 text-primary" />,
      value: "128",
      label: "Registered Users"
    },
    {
      title: "Products",
      icon: <Package className="h-8 w-8 text-primary" />,
      value: "36",
      label: "Available Items"
    },
    {
      title: "Revenue",
      icon: <BarChart3 className="h-8 w-8 text-primary" />,
      value: "$4,289",
      label: "Monthly Revenue"
    }
  ];
  
  return (
    <>
      <Navbar />
      <div className="container-custom pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button onClick={() => navigate('/account')}>
              Back to Account
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardCards.map((card, index) => (
              <div key={index} className="bg-card rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start">
                  {card.icon}
                  <span className="text-3xl font-bold">{card.value}</span>
                </div>
                <h3 className="text-lg font-medium mt-4">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.label}</p>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg shadow-sm p-6 lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
              <p className="text-muted-foreground">This is a placeholder for the orders table. In a real application, this would display actual order data.</p>
              <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-muted/20">
                <p className="text-muted-foreground">Order data visualization would appear here</p>
              </div>
            </div>
            
            <div className="bg-card rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button className="w-full justify-start">Add New Product</Button>
                <Button className="w-full justify-start">Manage Inventory</Button>
                <Button className="w-full justify-start">View Customer List</Button>
                <Button className="w-full justify-start">Generate Reports</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
