
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
// Using a proxy or alternate endpoint might help with CORS issues
const WEBHOOK_URL = "/api/chat"; // Use a relative path to avoid CORS issues

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
    return `I found some matches based on your request for "${query}"! Check them out below.`;
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
    
    // Use local mode by default - only try the webhook if explicitly enabled
    const useLocalMode = true; // Set to false to always attempt the webhook first
    
    if (useLocalMode) {
      // Use local mode immediately without attempting the API call
      setTimeout(() => {
        const assistantMessage: Message = {
          id: uuidv4(),
          content: getFallbackResponse(content),
          role: "assistant",
          createdAt: new Date(),
        };
        
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 500); // Add a small delay to simulate processing
    } else {
      try {
        console.log("Sending message to webhook:", content);
        
        // Set a timeout for the fetch operation
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        // Call webhook with the message content
        const response = await fetch(WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
        
        // Optional: Notify the user about the webhook failure
        toast({
          title: "Connection issue",
          description: "Could not connect to server. Using local responses instead.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return {
    messages,
    isLoading,
    sendMessage,
  };
}
