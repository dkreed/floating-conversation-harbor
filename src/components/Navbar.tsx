
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
} from '@/components/ui/navigation-menu';
import { cn } from "@/lib/utils";

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
                <NavigationMenuTrigger className="text-sm text-muted-foreground hover:text-foreground transition-colors bg-transparent">Cam Reviews</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md hover:bg-accent"
                          href="#"
                        >
                          <span className="text-sm font-medium text-foreground">
                            Top Free Cams Reviewed
                          </span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li className="row-span-1">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md hover:bg-accent"
                          href="#"
                        >
                          <span className="text-sm font-medium text-foreground">
                            Top Paid Cams Reviewed
                          </span>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
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
