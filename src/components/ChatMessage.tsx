
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
      <div 
        className={cn(
          "px-4 py-3 rounded-lg max-w-[80%]",
          message.isUser 
            ? "bg-primary text-primary-foreground rounded-tr-none" 
            : "bg-secondary text-secondary-foreground rounded-tl-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
