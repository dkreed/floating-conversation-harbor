
import React from 'react';
import Logo from './Logo';
import { Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const scrollToChat = () => {
    const chatElement = document.getElementById('chat-section');
    if (chatElement) {
      chatElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-6 flex items-center justify-between bg-transparent">
      <div className="flex items-center gap-8">
        <Link to="/">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
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
        <Button variant="secondary" size="sm" className="text-xs" onClick={scrollToChat}>
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
