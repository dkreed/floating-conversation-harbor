
import { useState, useEffect, useCallback } from 'react';
import { createChatSession, saveChatMessage, getChatHistory } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
};

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const { toast } = useToast();

  // Initialize chat session
  useEffect(() => {
    const initSession = async () => {
      try {
        const id = await createChatSession();
        setSessionId(id);
        
        // Load chat history
        const history = await getChatHistory(id);
        if (history && history.length > 0) {
          const formattedHistory = history.map(msg => ({
            id: msg.id,
            content: msg.message,
            isUser: msg.is_user,
            timestamp: msg.timestamp
          }));
          setMessages(formattedHistory);
        }
      } catch (error) {
        console.error("Error initializing chat session:", error);
        toast({
          title: "Error",
          description: "Could not initialize chat. Please refresh and try again.",
          variant: "destructive",
        });
      }
    };
    
    initSession();
  }, [toast]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || !sessionId) return;
    
    // Create a new message object
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    
    // Add message to state
    setMessages(prev => [...prev, userMessage]);
    
    // Save message to Supabase
    await saveChatMessage(sessionId, content, true, userMessage.timestamp);
    
    // Start loading state for bot response
    setIsLoading(true);
    
    try {
      // Fixed webhook URL
      const webhookUrl = 'https://demo.top5-ai.tools/webhook-test/3f9ab7e8-619a-4663-8b8a-1cbbb6d92c39';
      
      console.log("Sending message to webhook:", {
        message: content,
        sessionId
      });
      
      // Send message to webhook - using credentials: 'omit' to avoid CORS preflight
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ 
          message: content,
          sessionId
        })
      });
      
      console.log("Webhook response status:", response.status);
      
      // Create a default bot message
      let responseContent = "Thank you for your message. It was sent to the webhook successfully.";
      
      // Add bot response to state
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: responseContent,
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Save bot message to Supabase
      await saveChatMessage(sessionId, botMessage.content, false, botMessage.timestamp);
      
      toast({
        title: "Message Sent",
        description: "Your message was sent to the webhook successfully.",
      });
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Sorry, there was an error processing your message. Please try again.",
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      await saveChatMessage(sessionId, errorMessage.content, false, errorMessage.timestamp);
      
      // Show error toast
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, toast]);

  return { messages, isLoading, sendMessage };
};
