
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";

export type MessageRole = "system" | "user" | "assistant";

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  createdAt: Date;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // Toast import remains but we won't use it for message confirmations
  const { toast } = useToast();

  const sendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: uuidv4(),
      content,
      role: "user",
      createdAt: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: uuidv4(),
        content: `I found some matches based on your request for "${content}"! Check them out below.`,
        role: "assistant",
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
      
      // We're not calling toast.success here anymore to remove the notification
    }, 1500);
  };
  
  return {
    messages,
    isLoading,
    sendMessage,
  };
}
