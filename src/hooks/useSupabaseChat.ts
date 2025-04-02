
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
        
        // In a real implementation, you would create a new session in Supabase
        try {
          const { data, error } = await supabase
            .from('sessions')
            .insert([{ id: existingSessionId }])
            .select();
            
          if (error) {
            console.error('Error creating session:', error);
          } else {
            console.log('Created new chat session in Supabase:', data);
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
      const { data, error } = await supabase
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

  return {
    sessionId,
    isInitialized,
    saveMessage
  };
}
