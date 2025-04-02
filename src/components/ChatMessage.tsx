
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
  
  // Check if text is just a URL
  if (text.trim().match(urlRegex) && text.trim().match(urlRegex)[0] === text.trim()) {
    return (
      <a 
        href={text.trim()} 
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline flex items-center gap-1 hover:opacity-80 transition-opacity break-all"
      >
        {text.trim()} <ExternalLink size={14} />
      </a>
    );
  }
  
  // Special case for responses that include "the best option" followed by a URL
  // We need to extract just the URL part
  const bestOptionRegex = /^.*?(https?:\/\/[^\s]+).*?$/is;
  const bestOptionMatch = text.match(bestOptionRegex);
  
  if (bestOptionMatch && bestOptionMatch[1]) {
    const url = bestOptionMatch[1];
    const prependText = text.substring(0, text.indexOf(url));
    const appendText = text.substring(text.indexOf(url) + url.length);
    
    return (
      <>
        {prependText && <span>{prependText}</span>}
        <a 
          href={url} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline flex items-center gap-1 hover:opacity-80 transition-opacity break-all"
        >
          {url} <ExternalLink size={14} />
        </a>
        {appendText && <span>{appendText}</span>}
      </>
    );
  }
  
  // For regular text with URLs embedded
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
          className="text-primary underline flex items-center gap-1 hover:opacity-80 transition-opacity break-all"
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
          "px-4 py-3 rounded-lg max-w-[85%] md:max-w-[80%]",
          message.isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-[#1D0D12]/90 backdrop-blur-md text-white rounded-tl-none border border-red-900/40 shadow-md"
        )}
      >
        <p className="text-base md:text-lg whitespace-pre-wrap break-words">{makeLinksClickable(message.content)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
