
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Utensils } from 'lucide-react';

const HowWeCook = () => {
  const ingredients = [
    {
      name: 'Tomatoes',
      description: 'Home-grown and ripe'
    },
    {
      name: 'Basil',
      description: 'Fresh from our herb patch'
    },
    {
      name: 'Carrots',
      description: 'Pulled from our soil'
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container-custom pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Utensils className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Our Cooking Process</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We grow our ingredients in our backyard garden, ensuring freshness and quality. 
              Every dish is cooked with care using organic produce and traditional recipes.
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">From Garden to Table</h2>
            <p className="mb-6">
              Our commitment to quality begins with the soil. We carefully tend our garden, 
              using sustainable farming practices that respect the environment while producing 
              the most flavorful ingredients possible. Our chefs then transform these 
              fresh-picked treasures into delicious meals that nourish both body and soul.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="bg-muted/30 p-5 rounded-lg border border-border">
                  <h3 className="text-lg font-semibold mb-2">{ingredient.name}</h3>
                  <p className="text-muted-foreground">{ingredient.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Cooking Philosophy</h2>
            <div className="space-y-4">
              <p>
                At Aahaar, we believe that good food comes from good ingredients. Our chefs 
                respect traditional cooking methods while introducing creative twists that 
                make our dishes unique and memorable.
              </p>
              <p>
                We take pride in preparing food that is:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Made with organic, locally-sourced ingredients</li>
                <li>Prepared daily in small batches</li>
                <li>Free from artificial preservatives</li>
                <li>Crafted to highlight natural flavors</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HowWeCook;
