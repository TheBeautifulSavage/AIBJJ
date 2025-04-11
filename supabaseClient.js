import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fmgelljeozwyyagcezam.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZ2VsbGplb3p3eXlhZ2NlemFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzNDc3NzUsImV4cCI6MjA1OTkyMzc3NX0.-pa_fDyLlFaPEElTTC6S2nxd6WJ_CkXtjCxgCxE2Rc0' // Replace this!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
