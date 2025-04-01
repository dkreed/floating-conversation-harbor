
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useChat';
import { ExternalLink } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

// Function to detect and make URLs clickable without duplicate text
const makeLinksClickable = (text: string) => {
  // Regular expression to identify URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // If the text is just a URL, return it as a clickable link
  if (text.trim().match(urlRegex) && text.trim().match(urlRegex)[0] === text.trim()) {
    return (
      <a 
        href={text.trim()} 
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        {text.trim()} <ExternalLink size={14} />
      </a>
    );
  }
  
  // Improved regex to match various intro phrases followed by URL
  const bestOptionRegex = /^(your best option that (i|I) found is|the best option that (i|I) found for you today is|here is what (i|I) found for you|check out this|I recommend this):\s*(https?:\/\/[^\s]+)(.*)$/i;
  const bestOptionMatch = text.trim().match(bestOptionRegex);
  
  if (bestOptionMatch) {
    // Just return the URL as a clickable link without the intro text
    const url = bestOptionMatch[6];
    return (
      <a 
        href={url} 
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline flex items-center gap-1 hover:opacity-80 transition-opacity"
      >
        {url} <ExternalLink size={14} />
      </a>
    );
  }
  
  // Otherwise, process the text to make embedded URLs clickable
  const parts = text.split(urlRegex);
  const matches = text.match(urlRegex) || [];
  
  // Combine parts and matches into elements
  const elements: React.ReactNode[] = [];
  parts.forEach((part, i) => {
    elements.push(part);
    if (matches[i]) {
      elements.push(
        <a 
          key={i}
          href={matches[i]} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline flex items-center gap-1 hover:opacity-80 transition-opacity"
        >
          {matches[i]} <ExternalLink size={14} />
        </a>
      );
    }
  });

  return elements;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div 
      className={cn(
        "flex w-full mb-4",
        message.isUser ? "justify-end" : "justify-start"
      )}
    >
      {!message.isUser && (
        <div className="relative w-8 h-8 mr-2 flex-shrink-0 self-end">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-400 via-red-500 to-red-600 opacity-90"></div>
          <div className="absolute inset-[2px] bg-background rounded-full"></div>
          <div className="absolute inset-[5px] rounded-t-full bg-gradient-to-br from-pink-400 via-red-500 to-red-600 rotate-45"></div>
        </div>
      )}
      <div 
        className={cn(
          "px-4 py-3 rounded-lg max-w-[80%]",
          message.isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-[#1D0D12]/90 backdrop-blur-md text-white rounded-tl-none border border-red-900/40 shadow-md"
        )}
      >
        <p className="text-base md:text-lg whitespace-pre-wrap">{makeLinksClickable(message.content)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
