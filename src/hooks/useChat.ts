
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

// Define the webhook URL - this should be configured properly for your environment
const WEBHOOK_URL = "https://api.vibepicker.pro/chat"; // Replace with your actual webhook URL

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string) => {
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
    
    try {
      console.log("Sending message to webhook:", content);
      
      // Call webhook with the message content
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          message: content,
          userId: localStorage.getItem('chat_session_id') || uuidv4()
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`);
      }
      
      // Parse the response from the webhook
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response || `I found some matches based on your request for "${content}"! Check them out below.`,
        role: "assistant",
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error("Error sending message to webhook:", error);
      
      // Fallback to the simulated response if webhook fails
      const assistantMessage: Message = {
        id: uuidv4(),
        content: `I found some matches based on your request for "${content}"! Check them out below.`,
        role: "assistant",
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Optional: Notify the user about the webhook failure
      toast({
        title: "Connection issue",
        description: "Could not connect to server. Using local responses instead.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    isLoading,
    sendMessage,
  };
}
