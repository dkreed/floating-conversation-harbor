
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Message, MessageRole } from "./useChat";
import { v4 as uuidv4 } from 'uuid';

export function useSupabaseChat() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the chat session
  useEffect(() => {
    const initializeSession = async () => {
      // Get existing session ID from local storage or create a new one
      let existingSessionId = localStorage.getItem('chat_session_id');
      
      if (!existingSessionId) {
        existingSessionId = uuidv4();
        localStorage.setItem('chat_session_id', existingSessionId);
        
        // Create a new session in Supabase
        try {
          const { error } = await supabase
            .from('sessions')
            .insert([{ id: existingSessionId }]);
            
          if (error) {
            console.error('Error creating session:', error);
          } else {
            console.log('Created new chat session in Supabase');
          }
        } catch (err) {
          console.error('Failed to create session in Supabase:', err);
        }
      }
      
      setSessionId(existingSessionId);
      setIsInitialized(true);
    };
    
    initializeSession();
  }, []);

  // Function to save a chat message to Supabase
  const saveMessage = async (message: Message) => {
    if (!sessionId) return false;
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          id: message.id,
          session_id: sessionId,
          content: message.content,
          role: message.role,
          created_at: new Date().toISOString()
        }]);
        
      if (error) {
        console.error('Error saving message to Supabase:', error);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Failed to save message to Supabase:', err);
      return false;
    }
  };

  // Function to load chat messages from Supabase for the current session
  const loadMessages = async (): Promise<Message[]> => {
    if (!sessionId) return [];
    
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error('Error loading messages from Supabase:', error);
        return [];
      }
      
      return data.map((item: any) => ({
        id: item.id,
        content: item.content,
        role: item.role as MessageRole,
        createdAt: new Date(item.created_at)
      }));
    } catch (err) {
      console.error('Failed to load messages from Supabase:', err);
      return [];
    }
  };

  return {
    sessionId,
    isInitialized,
    saveMessage,
    loadMessages
  };
}
