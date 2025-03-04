
import { Salad } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  showText?: boolean;
}

const Logo = ({ showText = true }: LogoProps) => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="relative">
        <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
          <Salad className="h-6 w-6 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-primary/30 flex items-center justify-center">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
        </div>
      </div>
      {showText && (
        <span className="font-semibold text-xl lg:text-2xl">Aahaar</span>
      )}
    </Link>
  );
};

export default Logo;
