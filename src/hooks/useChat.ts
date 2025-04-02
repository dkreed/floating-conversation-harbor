
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

// Define the webhook URL with the provided URL
const WEBHOOK_URL = "https://demo.top5-ai.tools/webhook/3f9ab7e8-619a-4663-8b8a-1cbbb6d92c39";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Generate a unique client ID to identify this chat session
  const clientId = useState(() => uuidv4())[0];

  // Pre-defined responses for fallback when the webhook is unavailable
  const fallbackResponses = [
    "I found some matches based on your request! Check them out below.",
    "Here are some suggestions that might interest you!",
    "I've found several options that match what you're looking for.",
    "Based on your preferences, here are some recommendations.",
    "Here are some top picks for you to explore!"
  ];

  const getFallbackResponse = (query: string) => {
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex] + ` (Search query: "${query}")`;
  };

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
      
      // Set a timeout for the fetch operation
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      // Call webhook with the message content
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Origin": window.location.origin,
        },
        body: JSON.stringify({ 
          message: content,
          userId: clientId
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`Webhook returned status ${response.status}`);
      }
      
      // Parse the response from the webhook
      const data = await response.json();
      
      const assistantMessage: Message = {
        id: uuidv4(),
        content: data.response || getFallbackResponse(content),
        role: "assistant",
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
    } catch (error) {
      console.error("Error sending message to webhook:", error);
      
      // Fallback to the simulated response if webhook fails
      const assistantMessage: Message = {
        id: uuidv4(),
        content: getFallbackResponse(content),
        role: "assistant",
        createdAt: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      
      // Notify the user about the webhook failure
      toast({
        title: "Connection issue",
        description: "Could not connect to server. Using fallback responses instead.",
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
