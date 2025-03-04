
import { ShoppingBag, Users, Package, Grid } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "Orders",
      icon: <ShoppingBag className="h-8 w-8 text-[#4CAF50]" />,
      value: "1",
      label: "Total Orders",
      path: "/admin/orders"
    },
    {
      title: "Customers",
      icon: <Users className="h-8 w-8 text-[#4CAF50]" />,
      value: "1",
      label: "Registered Users",
      path: "/admin/customers"
    },
    {
      title: "Products",
      icon: <Package className="h-8 w-8 text-[#4CAF50]" />,
      value: "3",
      label: "Available Items",
      path: "/admin/products"
    },
    {
      title: "Inventory",
      icon: <Grid className="h-8 w-8 text-[#4CAF50]" />,
      value: "3",
      label: "Ingredients",
      path: "/admin/inventory"
    }
  ];
  
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => window.location.href = card.path}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-start">
                {card.icon}
                <span className="text-3xl font-bold">{card.value}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{card.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <p className="text-muted-foreground">Welcome to the admin dashboard. Use the sidebar to navigate to different sections.</p>
          <div className="h-64 flex items-center justify-center border rounded-md mt-4 bg-[#f3f3f3]">
            <p className="text-muted-foreground">Activity timeline will appear here</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-[#4CAF50] hover:bg-[#45a049]">Add New Product</Button>
            <Button className="w-full justify-start bg-[#4CAF50] hover:bg-[#45a049]">Manage Inventory</Button>
            <Button className="w-full justify-start bg-[#4CAF50] hover:bg-[#45a049]">View Customer List</Button>
            <Button className="w-full justify-start bg-[#4CAF50] hover:bg-[#45a049]">Generate Reports</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
