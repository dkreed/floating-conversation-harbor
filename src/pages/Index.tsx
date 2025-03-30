
import React, { useState, useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpRight, Send, Loader2 } from 'lucide-react';
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
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-red-800 opacity-90 blur-sm shadow-lg shadow-red-600/30"></div>
            <div className="absolute inset-[6px] bg-background rounded-full"></div>
            <div className="absolute inset-[16px] rounded-t-full bg-gradient-to-br from-red-400 via-red-600 to-red-800 rotate-45"></div>
          </div>
          
          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            Find what you <span className="gradient-text">desire.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            FindMe.ai is your personal desire fulfillment assistant.
          </p>
          
          {/* Quick Options */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {["Date ideas", "Gift suggestions", "Fashion advice", "Travel destinations"].map((item) => (
              <div 
                key={item} 
                className="glass-panel rounded-full px-4 py-2 text-sm flex items-center gap-2 cursor-pointer hover:bg-red-950/30 transition-colors"
                onClick={() => {
                  setInput(`Suggest ${item.toLowerCase()}`);
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
                <p>Ask FindMe.ai to help you find what you desire...</p>
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
              placeholder="Tell FindMe.ai what you're looking for..."
              className="min-h-24 resize-none p-4 bg-transparent border-0 focus-visible:ring-0 shadow-none placeholder:text-muted-foreground"
            />
            <div className="flex justify-end mt-4">
              <Button 
                type="submit" 
                disabled={isLoading || !input.trim()} 
                className={cn(
                  "h-14 px-8 text-base rounded-full bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all shadow-lg shadow-red-700/20 hover:shadow-red-700/40",
                  "font-medium tracking-wide",
                  "flex items-center gap-2",
                  isLoading && "opacity-70"
                )}
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} className="ml-1" />
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
