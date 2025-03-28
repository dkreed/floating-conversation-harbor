
import React from 'react';
import Navbar from '@/components/Navbar';
import ChatWindow from '@/components/ChatWindow';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Gradient Orb */}
          <div className="relative w-24 h-24 mb-12">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 opacity-80 blur-sm"></div>
            <div className="absolute inset-[6px] bg-background rounded-full"></div>
            <div className="absolute inset-[16px] rounded-t-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 rotate-45"></div>
          </div>
          
          {/* CTA Banner */}
          <div className="glass-panel animate-fade-in rounded-full px-6 py-2 mb-12 text-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400"></span>
            Build launch and win $30k cash prizes this weekend
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Idea to app in <span className="gradient-text">seconds.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12">
            Lovable is your superhuman full stack engineer.
          </p>
          
          {/* Demo Input */}
          <div className="w-full max-w-2xl bg-secondary/50 rounded-xl p-4 mb-12 animate-fade-in">
            <div className="glass-panel rounded-lg p-4 min-h-24 flex items-center justify-center text-muted-foreground">
              Ask Lovable to create a blog about...
            </div>
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs">
                  Attach
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  Import
                </Button>
              </div>
              <Button size="sm" className="text-xs">
                Public
              </Button>
            </div>
          </div>
          
          {/* Quick Options */}
          <div className="flex flex-wrap justify-center gap-3">
            {["Recipe collection", "3D product viewer", "Real estate listings", "E-commerce product page"].map((item) => (
              <div key={item} className="glass-panel rounded-full px-4 py-2 text-sm flex items-center gap-2">
                {item} <ArrowUpRight size={14} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Chat Component */}
      <ChatWindow />
    </div>
  );
};

export default Index;
