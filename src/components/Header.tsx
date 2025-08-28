import React from 'react';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        <Link to="/" className="flex items-center">
          <Heart className="h-8 w-8 text-primary mr-2" />
          <span className="text-2xl font-bold text-foreground">AfriHealth AI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#symptoms" className="text-foreground hover:text-primary transition-colors">
            Symptom Checker
          </a>
          <a href="#clinics" className="text-foreground hover:text-primary transition-colors">
            Find Clinics
          </a>
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/portal">
                <Button variant="outline">Patient Portal</Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user.user_metadata?.full_name || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate('/portal')}>
                    <User className="mr-2 h-4 w-4" />
                    Patient Portal
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background border-t shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              <a href="#symptoms" className="text-foreground hover:text-primary transition-colors">
                Symptom Checker
              </a>
              <a href="#clinics" className="text-foreground hover:text-primary transition-colors">
                Find Clinics
              </a>
              <a href="#features" className="text-foreground hover:text-primary transition-colors">
                Features
              </a>
              
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link to="/portal">
                    <Button className="w-full" variant="outline">
                      Patient Portal
                    </Button>
                  </Link>
                  <Button 
                    className="w-full" 
                    variant="secondary"
                    onClick={signOut}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/auth">
                    <Button className="w-full" variant="outline">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button className="w-full">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;