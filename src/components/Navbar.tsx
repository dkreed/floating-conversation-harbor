
import React from 'react';
import Logo from './Logo';
import { Github, Twitter, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const Navbar: React.FC = () => {
  const scrollToChat = () => {
    const chatElement = document.getElementById('chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 flex items-center justify-between bg-background/95 backdrop-blur-md border-b border-red-900/10">
      <div className="flex items-center gap-8">
        <Link to="/">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm text-muted-foreground hover:text-foreground bg-transparent h-auto p-0">
                  Cam Reviews
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-2 w-48">
                    <Link 
                      to="/free-cams" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium">Top Free Cams Reviewed</div>
                    </Link>
                    <Link 
                      to="/paid-cams" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium">Top Paid Cams Reviewed</div>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-muted-foreground hover:text-foreground">
            <Github size={20} />
          </a>
        </div>
        <Button variant="secondary" size="sm" className="text-xs" onClick={scrollToChat}>
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
