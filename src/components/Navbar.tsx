
import React from 'react';
import Logo from './Logo';
import { Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-8">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Support</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Launched</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Learn</a>
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
        <Button variant="secondary" size="sm" className="text-xs">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
