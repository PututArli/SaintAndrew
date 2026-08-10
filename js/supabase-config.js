// ============================================================
//  SUPABASE CLIENT — Paroki Santo Andreas Rasul Marga Agung
//  Gunakan file ini untuk semua koneksi ke Supabase
// ============================================================

window.SUPABASE_URL  = 'https://wsdmmohdealnnecxfhoj.supabase.co';
window.SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZG1tb2hkZWFsbm5lY3hmaG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5OTcyOTksImV4cCI6MjEwMTU3MzI5OX0.HgUVipJZcv8TUNE7BfAfBq3ZSGBzZxGD0KBnlpCzAd0';

var SUPABASE_URL = window.SUPABASE_URL;
var SUPABASE_ANON = window.SUPABASE_ANON;

function createFallbackClient() {
  const fallbackQuery = () => ({
    select: () => Promise.resolve({ data: [], error: null, count: 0 }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    upsert: () => Promise.resolve({ data: null, error: null }),
    eq: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
    range: function() { return this; }
  });

  return {
    __isFallback: true,
    from: fallbackQuery,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: { message: 'Koneksi database belum tersedia.' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: 'Koneksi database belum tersedia.' } }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
}

function createRealSupabaseClient() {
  const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
  if (sb && typeof sb.createClient === 'function') {
    return sb.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
  }
  return null;
}

function initSupabaseClient() {
  try {
    const realClient = createRealSupabaseClient();
    if (realClient) {
      window.db = realClient;
      return realClient;
    }
  } catch (e) {
    console.warn('Supabase initialization note:', e);
  }

  if (!window.db || window.db.__isFallback) {
    window.db = createFallbackClient();
  }

  return window.db;
}

window.initSupabaseClient = initSupabaseClient;
window.db = initSupabaseClient();
var db = window.db;
