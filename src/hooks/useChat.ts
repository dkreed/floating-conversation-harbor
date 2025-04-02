
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "@/hooks/use-toast";
import { useSupabaseChat } from "./useSupabaseChat";

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
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const { toast } = useToast();
  const { sessionId, isInitialized, saveMessage, loadMessages } = useSupabaseChat();

  // Load chat history when the component mounts and session is initialized
  useEffect(() => {
    if (isInitialized && isInitialLoad) {
      const fetchChatHistory = async () => {
        const chatHistory = await loadMessages();
        if (chatHistory.length > 0) {
          setMessages(chatHistory);
        }
        setIsInitialLoad(false);
      };
      
      fetchChatHistory();
    }
  }, [isInitialized, isInitialLoad, loadMessages]);

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
    
    // Save user message to Supabase
    await saveMessage(userMessage);
    
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
          userId: sessionId || uuidv4()
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
      
      // Save assistant message to Supabase
      await saveMessage(assistantMessage);
      
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
      
      // Save fallback assistant message to Supabase
      await saveMessage(assistantMessage);
      
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
