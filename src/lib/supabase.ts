
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://ndykbvxatauhcrjrmdlb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5keWtidnhhdGF1aGNyanJtZGxiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc4OTM4MzcsImV4cCI6MjAyMzQ2OTgzN30.MgJQ3SInSr1-2Ay_r6D0GzxcW8fnDYQzUGELSwIZm5A';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create a new chat session
export const createChatSession = async () => {
  try {
    // Generate a unique session ID
    const sessionId = crypto.randomUUID();
    
    // Store the session ID in the database
    const { error } = await supabase
      .from('chat_sessions')
      .insert([{ session_id: sessionId, created_at: new Date().toISOString() }]);
    
    if (error) {
      console.error('Error creating chat session:', error);
      return null;
    }
    
    console.log('Created new chat session:', sessionId);
    
    // Store the session ID in local storage
    localStorage.setItem('chat_session_id', sessionId);
    
    return sessionId;
  } catch (error) {
    console.error('Error creating chat session:', error);
    return null;
  }
};

// Function to save a chat message
export const saveChatMessage = async (
  sessionId: string, 
  message: string, 
  isUser: boolean,
  timestamp: string
) => {
  try {
    const { error } = await supabase
      .from('chat_messages')
      .insert([{ 
        session_id: sessionId, 
        message, 
        is_user: isUser,
        timestamp 
      }]);
    
    if (error) {
      console.error('Error saving chat message:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error saving chat message:', error);
    return false;
  }
};

// Function to get chat history for a session
export const getChatHistory = async (sessionId: string) => {
  try {
    console.log('Fetching chat history for session:', sessionId);
    
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true });
    
    if (error) {
      console.error('Error fetching chat history:', error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};
