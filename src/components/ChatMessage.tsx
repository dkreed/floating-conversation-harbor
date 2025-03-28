
import React from 'react';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useChat';

interface ChatMessageProps {
  message: Message;
}

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
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 opacity-80"></div>
          <div className="absolute inset-[2px] bg-background rounded-full"></div>
          <div className="absolute inset-[5px] rounded-t-full bg-gradient-to-br from-blue-400 via-purple-500 to-orange-400 rotate-45"></div>
        </div>
      )}
      <div 
        className={cn(
          "px-4 py-3 rounded-lg max-w-[80%]",
          message.isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-secondary text-secondary-foreground rounded-tl-none"
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
