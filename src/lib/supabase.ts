
import { createClient } from '@supabase/supabase-js';

// We're using these as placeholders. In a real application, these would be real Supabase credentials.
// For now we'll make a mock version that doesn't actually connect to Supabase
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'example-anon-key';

// Create the client but don't use it for any real operations in our mock functions
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Table structure in Supabase:
// - sessions: id (primary key), created_at (timestamp)
// - messages: id (primary key), session_id (foreign key), message (text), is_user (boolean), timestamp (timestamp)

interface ChatSession {
  id: string;
  created_at: string;
}

interface ChatMessage {
  id: string;
  session_id: string;
  message: string;
  is_user: boolean;
  timestamp: string;
}

// Mock implementation for local testing
export const createChatSession = async () => {
  // Generate a session ID if one doesn't exist
  let sessionId = localStorage.getItem('chat_session_id');
  const timestamp = new Date().toISOString();
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('chat_session_id', sessionId);
    console.log('Created new chat session:', sessionId);
    
    // In a real implementation, this would create a new row in the sessions table
    // Example Supabase code (commented out):
    /*
    const { data, error } = await supabase
      .from('sessions')
      .insert([{ id: sessionId, created_at: timestamp }]);
      
    if (error) console.error('Error creating session in database:', error);
    */
    
    // For mock implementation, we'll simulate storing in localStorage
    const sessionsData = localStorage.getItem('chat_sessions') || '[]';
    const sessions = JSON.parse(sessionsData) as ChatSession[];
    sessions.push({ id: sessionId, created_at: timestamp });
    localStorage.setItem('chat_sessions', JSON.stringify(sessions));
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
  
  // In a real implementation, this would insert a row into the messages table
  // Example Supabase code (commented out):
  /*
  const { data, error } = await supabase
    .from('messages')
    .insert([{
      id: crypto.randomUUID(),
      session_id: sessionId,
      message,
      is_user: isUser,
      timestamp
    }]);
    
  if (error) {
    console.error('Error saving message to database:', error);
    return false;
  }
  */
  
  // For mock implementation, we'll simulate storing in localStorage
  const messagesData = localStorage.getItem(`chat_messages_${sessionId}`) || '[]';
  const messages = JSON.parse(messagesData) as ChatMessage[];
  messages.push({
    id: crypto.randomUUID(),
    session_id: sessionId,
    message,
    is_user: isUser,
    timestamp
  });
  localStorage.setItem(`chat_messages_${sessionId}`, JSON.stringify(messages));
  
  return true;
};

// Mock implementation for local testing
export const getChatHistory = async (sessionId: string) => {
  console.log('Fetching chat history for session:', sessionId);
  
  // In a real implementation, this would fetch messages from the Supabase database
  // Example Supabase code (commented out):
  /*
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('session_id', sessionId)
    .order('timestamp', { ascending: true });
    
  if (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
  
  return data;
  */
  
  // For mock implementation, we'll return messages from localStorage
  const messagesData = localStorage.getItem(`chat_messages_${sessionId}`) || '[]';
  const messages = JSON.parse(messagesData) as ChatMessage[];
  
  return messages;
};
