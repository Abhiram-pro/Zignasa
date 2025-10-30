import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client

const supabaseUrl =  "https://flmvsfmowkrwkdfzwrjl.supabase.co";
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbXZzZm1vd2tyd2tkZnp3cmpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1NDQxNDUsImV4cCI6MjA3NjEyMDE0NX0.B1Aakb2BcUSXjcwTzh2sx5LXyimvxXOosZ0tk_HoAhk";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or Anon Key is not defined. Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY environment variables.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Export types for use throughout the app
export type { Session, User } from '@supabase/supabase-js';