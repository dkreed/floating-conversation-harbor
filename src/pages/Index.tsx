
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpRight, Send, Loader2, Heart, Camera } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const Index = () => {
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-[10%] right-[10%] w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[5%] w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <Navbar />
      
      {/* Hero Section with reduced padding to make room for chat */}
      <section className="pt-16 pb-8 px-4 md:px-6 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Gradient Orb */}
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-red-600 to-red-800 opacity-90 blur-sm shadow-lg shadow-red-600/30"></div>
            <div className="absolute inset-[6px] bg-background rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="w-12 h-12 text-red-500/70" />
            </div>
            <div className="absolute top-0 right-0">
              <Heart className="w-8 h-8 text-red-400 fill-red-400/70" />
            </div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Find what you <span className="gradient-text">desire.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            FindMe.ai is your personal desire fulfillment assistant.
          </p>
          
          {/* Quick Options - Updated for dating suggestions */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "Blonde matches", 
              "Brunette girls", 
              "Asian beauty", 
              "Local singles"
            ].map((item) => (
              <div 
                key={item} 
                className="glass-panel rounded-full px-4 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-red-950/30 transition-colors"
                onClick={() => {
                  setInput(`Find me ${item.toLowerCase()}`);
                  if (textareaRef.current) {
                    textareaRef.current.focus();
                  }
                }}
              >
                {item} <ArrowUpRight size={14} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Chat Section - Added ID for scrolling */}
      <section id="chat-section" className="pb-12 px-4 max-w-3xl mx-auto relative z-10">
        {/* Chat Messages Area */}
        <div className="glass-panel rounded-t-xl p-4 min-h-80 max-h-80 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-center">
              <div>
                <p>Ask FindMe.ai to help you find what you desire...</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex w-full justify-start mb-4">
              <div className="bg-secondary/60 backdrop-blur-sm text-secondary-foreground rounded-lg rounded-tl-none px-4 py-3 border border-red-900/30">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input Area */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="glass-panel rounded-b-xl p-4 border-t border-red-900/20">
            <Textarea 
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Tell FindMe.ai what you're looking for..."
              className="min-h-24 resize-none p-4 bg-transparent border-0 focus-visible:ring-0 shadow-none placeholder:text-muted-foreground"
            />
            <div className="flex justify-center mt-6">
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className={cn(
                  "h-16 px-12 text-lg rounded-full bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700 transition-all shadow-lg shadow-red-700/20 hover:shadow-red-700/40",
                  "font-medium tracking-wide",
                  "flex items-center gap-2",
                  isLoading && "opacity-70"
                )}
              >
                {isLoading ? (
                  <Loader2 size={24} className="animate-spin" />
                ) : (
                  <Send size={24} />
                )}
                Send
              </Button>
            </div>
          </div>
        </form>
      </section>
      
      {/* Toast notifications */}
      <Toaster />
    </div>
  );
};

export default Index;
