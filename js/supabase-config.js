// ============================================================
//  SUPABASE CLIENT — Paroki Santo Andreas Rasul Margo Agung
//  Gunakan file ini untuk semua koneksi ke Supabase
// ============================================================

window.SUPABASE_URL  = 'https://wsdmmohdealnnecxfhoj.supabase.co';
window.SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzZG1tb2hkZWFsbm5lY3hmaG9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5OTcyOTksImV4cCI6MjEwMTU3MzI5OX0.HgUVipJZcv8TUNE7BfAfBq3ZSGBzZxGD0KBnlpCzAd0';

var SUPABASE_URL = window.SUPABASE_URL;
var SUPABASE_ANON = window.SUPABASE_ANON;

function createFallbackClient() {
  const getCache = (table) => {
    try { return JSON.parse(localStorage.getItem('saint_andrew_' + table) || '[]'); } 
    catch(e) { return []; }
  };
  const saveCache = (table, data) => {
    try { localStorage.setItem('saint_andrew_' + table, JSON.stringify(data)); } catch(e){}
  };

  const fallbackQuery = (table) => {
    let queryFilter = null;
    let queryOrder = null;
    let action = null;
    let payload = null;

    const execute = async () => {
      let data = getCache(table);
      if (action === 'select') {
        let res = [...data];
        if (queryFilter) {
          res = res.filter(item => String(item[queryFilter.col]) === String(queryFilter.val));
        }
        if (queryOrder) {
          res.sort((a, b) => {
            const valA = a[queryOrder.col];
            const valB = b[queryOrder.col];
            if (valA < valB) return queryOrder.asc ? -1 : 1;
            if (valA > valB) return queryOrder.asc ? 1 : -1;
            return 0;
          });
        }
        return { data: res, error: null, count: res.length };
      }
      else if (action === 'insert') {
        const arr = Array.isArray(payload) ? payload : [payload];
        const withIds = arr.map(item => ({ ...item, id: item.id || 'local-' + Date.now() + '-' + Math.floor(Math.random()*1000) }));
        data.push(...withIds);
        saveCache(table, data);
        return { data: withIds, error: null };
      }
      else if (action === 'update') {
        if (!queryFilter) return { data: null, error: { message: 'Update requires .eq()' } };
        let updated = [];
        data = data.map(item => {
          if (String(item[queryFilter.col]) === String(queryFilter.val)) {
            const newItem = { ...item, ...payload };
            updated.push(newItem);
            return newItem;
          }
          return item;
        });
        saveCache(table, data);
        return { data: updated, error: null };
      }
      else if (action === 'delete') {
        if (!queryFilter) return { data: null, error: { message: 'Delete requires .eq()' } };
        data = data.filter(item => String(item[queryFilter.col]) !== String(queryFilter.val));
        saveCache(table, data);
        return { data: null, error: null };
      }
      else if (action === 'upsert') {
        const arr = Array.isArray(payload) ? payload : [payload];
        arr.forEach(item => {
          if (!item.id) item.id = 'local-' + Date.now();
          const index = data.findIndex(d => String(d.id) === String(item.id));
          if (index !== -1) data[index] = { ...data[index], ...item };
          else data.push(item);
        });
        saveCache(table, data);
        return { data: arr, error: null };
      }
      return { data: null, error: { message: 'Unknown action' } };
    };

    const builder = {
      select: function() { action = 'select'; return this; },
      insert: function(p) { action = 'insert'; payload = p; return this; },
      update: function(p) { action = 'update'; payload = p; return this; },
      delete: function() { action = 'delete'; return this; },
      upsert: function(p) { action = 'upsert'; payload = p; return this; },
      eq: function(col, val) { queryFilter = { col, val }; return this; },
      order: function(col, { ascending = true } = {}) { queryOrder = { col, asc: ascending }; return this; },
      limit: function() { return this; },
      range: function() { return this; },
      then: function(onFulfilled, onRejected) {
        return execute().then(onFulfilled, onRejected);
      },
      catch: function(onRejected) {
        return execute().catch(onRejected);
      }
    };
    return builder;
  };

  return {
    __isFallback: true,
    from: fallbackQuery,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      signInWithPassword: () => Promise.resolve({ data: {}, error: { message: 'Koneksi database menggunakan mode lokal.' } }),
      signOut: () => Promise.resolve({ error: null })
    },
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: null, error: { message: 'Upload ditolak dalam mode lokal.' } }),
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

window.USE_LOCAL_DB = false; // Ubah ke true HANYA jika ingin mencoba simulasi tanpa Supabase

function initSupabaseClient() {
  if (window.USE_LOCAL_DB) {
    window.db = createFallbackClient();
    console.log('Menggunakan Database Lokal (LocalStorage) karena USE_LOCAL_DB = true');
    return window.db;
  }

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
