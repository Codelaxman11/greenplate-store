
import { Product } from '@/types';

export const products: Product[] = [
  {
    id: "1",
    name: "Quinoa Bowl",
    description: "A nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    category: "bowls",
    featured: true,
    inStock: 15,
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 18
    }
  },
  {
    id: "2",
    name: "Avocado Toast",
    description: "Whole grain toast topped with smashed avocado, microgreens, and seeds",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2",
    category: "breakfast",
    featured: true,
    inStock: 20,
    nutrition: {
      calories: 320,
      protein: 8,
      carbs: 38,
      fat: 16
    }
  },
  {
    id: "3",
    name: "Buddha Bowl",
    description: "A colorful bowl with chickpeas, sweet potato, kale, and tahini",
    price: 13.99,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    category: "bowls",
    featured: true,
    inStock: 18,
    nutrition: {
      calories: 450,
      protein: 14,
      carbs: 62,
      fat: 16
    }
  },
  {
    id: "4",
    name: "Smoothie Bowl",
    description: "Acai blend topped with fresh fruits, granola, and chia seeds",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1574316071802-0d684efa7bf5",
    category: "breakfast",
    featured: false,
    inStock: 12,
    nutrition: {
      calories: 380,
      protein: 8,
      carbs: 68,
      fat: 10
    }
  },
  {
    id: "5",
    name: "Lentil Soup",
    description: "Hearty lentil soup with carrots, celery, and fresh herbs",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554",
    category: "soups",
    featured: false,
    inStock: 25,
    nutrition: {
      calories: 280,
      protein: 16,
      carbs: 42,
      fat: 4
    }
  },
  {
    id: "6",
    name: "Falafel Wrap",
    description: "Homemade falafel with tahini sauce, cucumber, and tomatoes in a whole wheat wrap",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    category: "sandwiches",
    featured: false,
    inStock: 15,
    nutrition: {
      calories: 420,
      protein: 14,
      carbs: 56,
      fat: 14
    }
  },
  {
    id: "7",
    name: "Matcha Latte",
    description: "Organic matcha green tea with your choice of plant-based milk",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002",
    category: "drinks",
    featured: false,
    inStock: 30,
    nutrition: {
      calories: 120,
      protein: 4,
      carbs: 18,
      fat: 4
    }
  },
  {
    id: "8",
    name: "Vegan Brownie",
    description: "Decadent chocolate brownie made with avocado and coconut sugar",
    price: 4.99,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c",
    category: "desserts",
    featured: true,
    inStock: 20,
    nutrition: {
      calories: 220,
      protein: 3,
      carbs: 28,
      fat: 12
    }
  }
];

export const categories = [
  {
    id: "bowls",
    name: "Power Bowls",
    description: "Nutrient-dense bowls packed with goodness",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
  },
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Start your day the right way",
    image: "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2"
  },
  {
    id: "sandwiches",
    name: "Sandwiches & Wraps",
    description: "Handheld goodness for any time of day",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38"
  },
  {
    id: "soups",
    name: "Soups & Stews",
    description: "Comforting and healing plant-based soups",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554"
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Refreshing beverages for hydration",
    image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002"
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Guilt-free treats to satisfy your sweet tooth",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c"
  }
];

export const getSalesData = (): SalesData[] => {
  return [
    { date: '2023-05-01', amount: 1250, orders: 25 },
    { date: '2023-05-02', amount: 1120, orders: 22 },
    { date: '2023-05-03', amount: 1380, orders: 28 },
    { date: '2023-05-04', amount: 1480, orders: 30 },
    { date: '2023-05-05', amount: 1560, orders: 32 },
    { date: '2023-05-06', amount: 1780, orders: 36 },
    { date: '2023-05-07', amount: 1890, orders: 38 },
  ];
};

export type SalesData = {
  date: string;
  amount: number;
  orders: number;
};

export const getProductByid = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
