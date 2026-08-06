// ============================================================
//  SUPABASE CLIENT — Paroki Santo Andreas Rasul Marga Agung
//  Gunakan file ini untuk semua koneksi ke Supabase
// ============================================================

const SUPABASE_URL  = 'https://wsdmmohdealnnecxfhoj.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZG1tb2hkZWFsbm5lY3hmaG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5OTcyOTksImV4cCI6MjEwMTU3MzI5OX0.HgUVipJZcv8TUNE7BfAfBq3ZSGBzZxGD0KBnlpCzAd0';

// Init Supabase client (CDN version)
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_ANON);
