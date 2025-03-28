import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from './ChatMessage';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

// This component is not currently used in the main UI
// It's kept for future reference or alternative chat implementations
const ChatWindow: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    // Focus input when chat is opened
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden">
      {/* Chat toggle button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg",
          isOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      <div 
        className={cn(
          "absolute bottom-16 right-0 w-96 rounded-lg overflow-hidden shadow-xl transition-all duration-300 ease-in-out",
          "flex flex-col bg-background border border-border",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ height: '500px' }}
      >
        {/* Chat header */}
        <div className="p-4 bg-secondary flex items-center justify-between">
          <h3 className="font-medium">Chat Assistant</h3>
          <Button variant="ghost" size="sm" onClick={toggleChat}>
            <X size={18} />
          </Button>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-muted-foreground text-center">
              <div>
                <p>Welcome! How can I help you today?</p>
                <p className="text-xs mt-2">Your chat session has a unique ID and history will be saved.</p>
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

        {/* Chat input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex gap-2">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || !input.trim()}
            >
              <Send size={18} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
