
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

const Inventory = () => {
  // Sample inventory data
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Tomatoes', quantity: 50, unit: 'units' },
    { id: '2', name: 'Basil', quantity: 20, unit: 'bunches' },
    { id: '3', name: 'Carrots', quantity: 30, unit: 'units' }
  ]);
  
  const [newIngredient, setNewIngredient] = useState({
    name: '',
    quantity: '',
    unit: ''
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleAddIngredient = () => {
    // Basic validation
    if (!newIngredient.name || !newIngredient.quantity || !newIngredient.unit) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    const quantity = parseInt(newIngredient.quantity);
    if (isNaN(quantity) || quantity <= 0) {
      toast({
        title: "Validation Error",
        description: "Quantity must be a positive number",
        variant: "destructive"
      });
      return;
    }
    
    // Add new ingredient
    const ingredient: Ingredient = {
      id: Date.now().toString(),
      name: newIngredient.name,
      quantity: quantity,
      unit: newIngredient.unit
    };
    
    setIngredients([...ingredients, ingredient]);
    
    // Reset form and close dialog
    setNewIngredient({
      name: '',
      quantity: '',
      unit: ''
    });
    
    setIsDialogOpen(false);
    
    toast({
      title: "Success",
      description: `${ingredient.name} has been added to inventory`,
    });
  };
  
  return (
    <AdminLayout title="Inventory">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Ingredients Inventory</h2>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4CAF50] hover:bg-[#45a049]">Add New Ingredient</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Ingredient</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Ingredient Name</label>
                  <Input
                    id="name"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({...newIngredient, name: e.target.value})}
                    placeholder="e.g., Tomatoes"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
                  <Input
                    id="quantity"
                    type="number"
                    value={newIngredient.quantity}
                    onChange={(e) => setNewIngredient({...newIngredient, quantity: e.target.value})}
                    placeholder="e.g., 50"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="unit" className="text-sm font-medium">Unit</label>
                  <Input
                    id="unit"
                    value={newIngredient.unit}
                    onChange={(e) => setNewIngredient({...newIngredient, unit: e.target.value})}
                    placeholder="e.g., units, bunches, kg"
                  />
                </div>
                <Button 
                  className="w-full mt-2 bg-[#4CAF50] hover:bg-[#45a049]"
                  onClick={handleAddIngredient}
                >
                  Add Ingredient
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient Name</TableHead>
                <TableHead>Quantity Available</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ingredients.map((ingredient) => (
                <TableRow key={ingredient.id}>
                  <TableCell className="font-medium">{ingredient.name}</TableCell>
                  <TableCell>{ingredient.quantity}</TableCell>
                  <TableCell>{ingredient.unit}</TableCell>
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

export default Inventory;
