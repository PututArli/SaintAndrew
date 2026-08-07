// ============================================================
//  SUPABASE CLIENT — Paroki Santo Andreas Rasul Marga Agung
//  Gunakan file ini untuk semua koneksi ke Supabase
// ============================================================

window.SUPABASE_URL  = 'https://wsdmmohdealnnecxfhoj.supabase.co';
window.SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZG1tb2hkZWFsbm5lY3hmaG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5OTcyOTksImV4cCI6MjEwMTU3MzI5OX0.HgUVipJZcv8TUNE7BfAfBq3ZSGBzZxGD0KBnlpCzAd0';

var SUPABASE_URL = window.SUPABASE_URL;
var SUPABASE_ANON = window.SUPABASE_ANON;

function createSafeSupabaseClient() {
  try {
    const sb = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);
    if (sb && typeof sb.createClient === 'function') {
      return sb.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
    }
  } catch (e) {
    console.warn('Supabase initialization note:', e);
  }

  // Fallback safe client so UI never crashes or blocks rendering
  const fallbackQuery = () => ({
    select: () => Promise.resolve({ data: [], error: null, count: 0 }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
    eq: function() { return this; },
    order: function() { return this; },
    limit: function() { return this; },
    range: function() { return this; }
  });

  return {
    from: fallbackQuery,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
      signOut: () => Promise.resolve({ error: null })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
}

window.db = window.db || createSafeSupabaseClient();
var db = window.db;
