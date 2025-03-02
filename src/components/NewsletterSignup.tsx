
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { CheckCircle2 } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Success!",
        description: "You've been added to our newsletter.",
      });
      
      // Reset success state after some time
      setTimeout(() => setIsSubscribed(false), 3000);
    }, 1000);
  };

  return (
    <section className="py-16 md:py-24 bg-primary/10">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-semibold mb-4">Join Our Newsletter</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Get updates on new products, special offers, and plant-based recipes.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow"
              disabled={isSubmitting || isSubscribed}
            />
            <Button 
              type="submit" 
              disabled={isSubmitting || isSubscribed} 
              className="min-w-[120px] transition-all duration-300"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : isSubscribed ? (
                <span className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Subscribed
                </span>
              ) : (
                'Subscribe'
              )}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
