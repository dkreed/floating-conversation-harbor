
import { useState, useEffect } from 'react';
import { createChatSession, saveChatMessage, getChatHistory } from '@/lib/supabase';

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

  // Initialize chat session
  useEffect(() => {
    const initSession = async () => {
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
    };
    
    initSession();
  }, []);

  const sendMessage = async (content: string) => {
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
      // Send message to webhook
      const response = await fetch('https://demo.top5-ai.tools/webhook-test/3f9ab7e8-619a-4663-8b8a-1cbbb6d92c39', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: content,
          sessionId
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      
      const data = await response.json();
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: data.reply || "Sorry, I couldn't process your request.",
        isUser: false,
        timestamp: new Date().toISOString()
      };
      
      // Add bot response to state
      setMessages(prev => [...prev, botMessage]);
      
      // Save bot message to Supabase
      await saveChatMessage(sessionId, botMessage.content, false, botMessage.timestamp);
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
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage };
};
