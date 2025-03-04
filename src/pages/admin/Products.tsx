
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
}

const Products = () => {
  // Sample product data
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Garden Veggie Stew', 
      description: 'A hearty stew made with fresh garden vegetables',
      price: '$10.00'
    },
    { 
      id: '2', 
      name: 'Fresh Herb Salad', 
      description: 'Mixed greens with fresh herbs from our garden',
      price: '$8.50'
    },
    { 
      id: '3', 
      name: 'Organic Berry Smoothie', 
      description: 'Blend of seasonal organic berries with almond milk',
      price: '$6.00'
    }
  ]);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: ''
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddProduct = () => {
    // Basic validation
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Add price formatting if needed
    let formattedPrice = newProduct.price;
    if (!formattedPrice.startsWith('$')) {
      formattedPrice = `$${formattedPrice}`;
    }
    
    // Add new product
    const product: Product = {
      id: Date.now().toString(),
      name: newProduct.name,
      description: newProduct.description,
      price: formattedPrice
    };
    
    setProducts([...products, product]);
    
    // Reset form and close dialog
    setNewProduct({
      name: '',
      description: '',
      price: ''
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `${product.name} has been added to products`,
    });
  };
  
  return (
    <AdminLayout title="Products">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Product Management</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4CAF50] hover:bg-[#45a049]">Add New Product</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Product Name</label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    placeholder="e.g., Garden Veggie Stew"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">Description</label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                    placeholder="Product description"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">Price</label>
                  <Input
                    id="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                    placeholder="e.g., 10.00"
                  />
                </div>
                <Button 
                  className="w-full mt-2 bg-[#4CAF50] hover:bg-[#45a049]"
                  onClick={handleAddProduct}
                >
                  Add Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="text-[#4CAF50] border-[#4CAF50]">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-500">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Products;
