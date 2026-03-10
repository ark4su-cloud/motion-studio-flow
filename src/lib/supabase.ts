import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dqsbgmxptjtzevxrkoqj.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxc2JnbXhwdGp0emV2eHJrb3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMxMzg5NDIsImV4cCI6MjA4ODcxNDk0Mn0.JgkKQ-K7rs_PkTOO2m5NOEkjhTTwarpZJFkIknnM_y8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
