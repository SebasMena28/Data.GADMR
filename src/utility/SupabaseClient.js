import { createClient } from '@supabase/supabase-js';

//console.log(process.env.REACT_APPLICATION_SUPABASE_URL)
const supabaseURL = 'https://dphxjmhahqtenyqlxgvc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwaHhqbWhhaHF0ZW55cWx4Z3ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5MDc1NTgsImV4cCI6MjAxMzQ4MzU1OH0.VJenaixkpu8iQR_BvGSBQaEJvga8gKOZ3nOwfTmUG0M';

export const supabase = createClient(supabaseURL, supabaseAnonKey);