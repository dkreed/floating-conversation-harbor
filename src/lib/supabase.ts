
import { createClient } from '@supabase/supabase-js';

// We're using these as placeholders. In a real application, these would be real Supabase credentials.
// For now we'll make a mock version that doesn't actually connect to Supabase
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'example-anon-key';

// Create the client but don't use it for any real operations in our mock functions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock implementation for local testing
export const createChatSession = async () => {
  // Generate a session ID if one doesn't exist
  let sessionId = localStorage.getItem('chat_session_id');
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('chat_session_id', sessionId);
    console.log('Created new chat session:', sessionId);
  } else {
    console.log('Using existing chat session:', sessionId);
  }
  
  return sessionId;
};

// Mock implementation for local testing
export const saveChatMessage = async (
  sessionId: string, 
  message: string, 
  isUser: boolean,
  timestamp = new Date().toISOString()
) => {
  // Log the message that would be saved
  console.log('Saving chat message:', { sessionId, message, isUser, timestamp });
  
  // In a mock implementation, just return true to indicate success
  return true;
};

// Mock implementation for local testing
export const getChatHistory = async (sessionId: string) => {
  // In a real implementation, this would fetch data from Supabase
  console.log('Fetching chat history for session:', sessionId);
  
  // For testing purposes, return an empty array
  // In a real app, this would return messages from the database
  return [];
};
