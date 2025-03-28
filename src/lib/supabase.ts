
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createChatSession = async () => {
  // Generate a session ID if one doesn't exist
  let sessionId = localStorage.getItem('chat_session_id');
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem('chat_session_id', sessionId);
    
    // Create a record of this session in Supabase
    const { error } = await supabase
      .from('chat_sessions')
      .insert([{ session_id: sessionId, created_at: new Date().toISOString() }]);
    
    if (error) console.error('Error creating chat session:', error);
  }
  
  return sessionId;
};

export const saveChatMessage = async (
  sessionId: string, 
  message: string, 
  isUser: boolean,
  timestamp = new Date().toISOString()
) => {
  const { error } = await supabase
    .from('chat_messages')
    .insert([{
      session_id: sessionId,
      message,
      is_user: isUser,
      timestamp
    }]);
  
  if (error) console.error('Error saving chat message:', error);
};

export const getChatHistory = async (sessionId: string) => {
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
};
