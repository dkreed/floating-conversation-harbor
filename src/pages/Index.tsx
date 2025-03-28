
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpRight, Paperclip, Send, Loader2 } from 'lucide-react';
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section with reduced padding to make room for chat */}
      <section className="pt-16 pb-8 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* Gradient Orb */}
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 opacity-80 blur-sm"></div>
            <div className="absolute inset-[6px] bg-background rounded-full"></div>
            <div className="absolute inset-[16px] rounded-t-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 rotate-45"></div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Idea to app in <span className="gradient-text">seconds.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Lovable is your superhuman full stack engineer.
          </p>
          
          {/* Quick Options */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Recipe collection", "3D product viewer", "Real estate listings", "E-commerce product page"].map((item) => (
              <div 
                key={item} 
                className="glass-panel rounded-full px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setInput(`Create a ${item.toLowerCase()}`);
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
      
      {/* Chat Section */}
      <section className="pb-12 px-4 max-w-3xl mx-auto">
        {/* Chat Messages Area */}
        <div className="bg-secondary/20 rounded-t-xl p-4 min-h-80 max-h-80 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-center">
              <div>
                <p>Ask Lovable to create something amazing for you!</p>
                <p className="text-xs mt-2">Your chat history will be saved for your convenience.</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))
          )}
          {isLoading && (
            <div className="flex w-full justify-start mb-4">
              <div className="bg-secondary text-secondary-foreground rounded-lg rounded-tl-none px-4 py-3">
                <Loader2 size={16} className="animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input Area */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="glass-panel rounded-b-xl p-4 border-t border-border">
            <Textarea 
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              placeholder="Ask Lovable to create a blog about..."
              className="min-h-24 resize-none p-4 bg-transparent border-0 focus-visible:ring-0 shadow-none placeholder:text-muted-foreground"
            />
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" type="button" className="text-xs flex items-center gap-1">
                  <Paperclip size={14} /> Attach
                </Button>
                <Button variant="outline" size="sm" type="button" className="text-xs">
                  Import
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="text-xs">
                  Public
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                  disabled={isLoading || !input.trim()} 
                  className={cn(
                    "text-xs bg-primary",
                    isLoading && "opacity-50"
                  )}
                >
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin mr-1" />
                  ) : (
                    <Send size={14} className="mr-1" />
                  )}
                  Send
                </Button>
              </div>
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
