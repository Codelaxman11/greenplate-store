
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for testing purposes
const DEMO_USERS: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@example.com',
    isAdmin: false
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage on initial render
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, check against hardcoded users
    const demoUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (demoUser && password === 'password') {
      setUser(demoUser);
      toast({
        title: "Logged in",
        description: `Welcome back, ${demoUser.name}!`,
      });
    } else {
      throw new Error('Invalid email or password');
    }
  };
  
  const logout = () => {
    setUser(null);
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };
  
  const register = async (name: string, email: string, password: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email already exists
    if (DEMO_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already in use');
    }
    
    // In a real app, we'd create a new user in the database
    // For demo, we'll just create a new user object and log in
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      isAdmin: false
    };
    
    setUser(newUser);
    toast({
      title: "Account created",
      description: `Welcome, ${name}!`,
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
