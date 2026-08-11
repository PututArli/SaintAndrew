// =============================================================
//  DASHBOARD ADMIN — Paroki Santo Andreas Rasul Marga Agung
//  JavaScript Logic — dipisahkan dari dashboard.html
//  Requires: Supabase JS v2, supabase-config.js (db global)
// =============================================================

// ── Constants ──────────────────────────────────────────────
const STASI_MAP = {
  'margo-agung':  'Margo Agung (Paroki)',
  'misa-khusus':  'Misa Khusus & Adorasi',
  'marga-lestari':'Marga Lestari',
  'rejomulyo':    'Rejomulyo',
  'sukadamai':    'Sukadamai',
  'way-galih':    'Way Galih',
  'sindang-sari': 'Sindang Sari',
  'purwotani':    'Purwotani',
  'jatimulyo':    'Jatimulyo',
  'pendowo':      'Pendowo'
};

const DEFAULT_STASI_DATA = {
  'margo-agung': {
    id: 'margo-agung',
    nama: 'Gereja Paroki Margo Agung',
    pelindung: 'Santo Andreas Rasul',
    pesta_nama: '30 November',
    role: 'Rasul Pertama & Saudara Simon Petrus',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/marga-agung.jpg',
    alamat: 'Jl. Margo Agung, Marga Kaya, Kec. Jati Agung, Kab. Lampung Selatan, Lampung 35365',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santo+Andreas+Rasul+Marga+Agung+Lampung+Selatan'
  },
  'marga-lestari': {
    id: 'marga-lestari',
    nama: 'Stasi Marga Lestari',
    pelindung: 'Santa Maria',
    pesta_nama: '1 Januari & 15 Agustus',
    role: 'Bunda Yesus Kristus & Teladan Ketaatan Iman',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/marga-lestari.jpg',
    alamat: 'Desa Marga Lestari, Kec. Jati Agung, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santa+Maria+Marga+Lestari+Jati+Agung'
  },
  'sindang-sari': {
    id: 'sindang-sari',
    nama: 'Stasi Sindangsari',
    pelindung: 'Santo Stefanus',
    pesta_nama: '26 Desember',
    role: 'Protomartir (Martir Pertama) & Diakon Gereja',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/sindang-sari.jpg',
    alamat: 'Dusun Umbul Kapuk, Desa Sindangsari, Kec. Tanjung Bintang, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santo+Stefanus+Sindang+Sari+Tanjung+Bintang'
  },
  'rejomulyo': {
    id: 'rejomulyo',
    nama: 'Stasi Rejomulyo',
    pelindung: 'Tritunggal Mahakudus',
    pesta_nama: 'Minggu I stl. Pentakosta (Mei/Juni)',
    role: 'Misteri Sentral Iman Katolik (Bapa, Putra, & Roh Kudus)',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/rejomulyo.jpg',
    alamat: 'Desa Rejomulyo, Kec. Jati Agung, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Tritunggal+Mahakudus+Rejomulyo+Jati+Agung'
  },
  'jatimulyo': {
    id: 'jatimulyo',
    nama: 'Stasi Jatimulyo Perdana',
    pelindung: 'Santo Fransiskus Xaverius',
    pesta_nama: '3 Desember',
    role: 'Misionaris Agung & Pelindung Misi Sedunia',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/jatimulyo.jpg',
    alamat: 'Perumahan Jatimulyo Perdana, Kec. Jati Agung, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santo+Fransiskus+Xaverius+Jatimulyo+Perdana'
  },
  'way-galih': {
    id: 'way-galih',
    nama: 'Stasi Way Galih',
    pelindung: 'Santo Yohanes De Britto',
    pesta_nama: '4 Februari',
    role: 'Misionaris Yesuit & Martir Pembela Kekudusan Iman',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/way-galih.jpg',
    alamat: 'Dusun V.A, Desa Way Galih, Kec. Tanjung Bintang, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santo+Yohanes+De+Britto+Way+Galih'
  },
  'sukadamai': {
    id: 'sukadamai',
    nama: 'Stasi Sukadamai',
    pelindung: 'Santo Yusuf',
    pesta_nama: '19 Maret & 1 Mei',
    role: 'Bapa Asuh Yesus & Pelindung Gereja Universal',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/sukadamai.jpg',
    alamat: 'RT 006, Dusun II, Desa Sukadamai, Kec. Natar, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santo+Yusuf+Sukadamai+Lampung+Selatan'
  },
  'pendowo': {
    id: 'pendowo',
    nama: 'Stasi Pendowo',
    pelindung: 'Santo Aloysius Gonzaga',
    pesta_nama: '21 Juni',
    role: 'Pelindung Kaum Muda & Pelajar Katolik',
    sejarah: '',
    daftar_ketua: [],
    foto_url: 'assets/img/stasi/pendowo.jpg',
    alamat: 'Desa Pancasila (Pendowo), Kec. Natar, Kab. Lampung Selatan',
    gmaps_url: 'https://maps.app.goo.gl/mhdeNQXPXwW8WJtJ6'
  },
  'purwotani': {
    id: 'purwotani',
    nama: 'Stasi Purwotani',
    pelindung: 'Santo Petrus',
    pesta_nama: '29 Juni & 22 Februari',
    role: 'Pemimpin Para Rasul & Uskup Roma (Paus) Pertama',
    sejarah: '',
    daftar_ketua: [],
    foto_url: '',
    alamat: 'Desa Purwotani, Kec. Jati Agung, Kab. Lampung Selatan',
    gmaps_url: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Purwotani+Jati+Agung+Lampung+Selatan'
  }
};

const KAT_MAP = {
  'umum':       { label:'Umum' },
  'sakramen':   { label:'Sakramen' },
  'misa-khusus':{ label:'Misa Khusus' },
  'kegiatan':   { label:'Kegiatan' }
};

const KAT_GALERI_MAP = {
  'omk':      { label: 'OMK', bg: '#0d9488' },
  'ibadat':   { label: 'Ibadat', bg: '#7c3aed' },
  'liturgi':  { label: 'Liturgi & Misa', bg: '#7c3aed' },
  'perayaan': { label: 'Perayaan Besar', bg: '#d97706' },
  'sosial':   { label: 'Sosial & Lingkungan', bg: '#2563eb' },
  'kegiatan': { label: 'Kegiatan', bg: '#2563eb' }
};

const DEFAULT_GALERI_FALLBACK = [
  {
    id: 'default-omk-1',
    judul: 'Ziarah & Rekreasi OMK 2025',
    kategori: 'omk',
    foto_url: 'assets/img/galeri/kegiatanOMK.png',
    tanggal: '2025-06-20',
    keterangan: 'Kebersamaan kaum muda paroki dalam membangun persaudaraan dan iman.',
    urutan: 0
  }
];

// State untuk delete
let _deleteTable = '';
let _deleteId    = '';
let _deleteCb    = null;

// ── Auth Guard & Initialization ─────────────────────────────
async function initDashboard() {
  // Ensure body scroll is unlocked on initial page load
  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';

  try {
    if (typeof db !== 'undefined' && db && db.auth) {
      const { data: { session } = {} } = await db.auth.getSession();
      if (session && session.user) {
        const emailEl = document.getElementById('admin-email');
        if (emailEl) emailEl.textContent = session.user.email;
      }
    }
  } catch (authErr) {
    console.warn('Auth session check note:', authErr);
  }

  // Load initial active tab data & statistics based on URL hash (without push loop)
  const initialTab = location.hash.replace('#', '') || 'jadwal';
  if (window.history && window.history.replaceState) {
    window.history.replaceState({ tab: initialTab }, '', '#' + initialTab);
  }
  showTab(initialTab, null, false);
  loadCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}

// ── Universal Confirmation Engine (Promise-Based) ──────────
let _confirmResolver = null;

function showConfirmModal({
  title = 'Konfirmasi',
  heading = 'Konfirmasi Tindakan',
  message = '',
  detailsHtml = '',
  confirmText = 'Ya, Lanjutkan',
  cancelText = 'Batal',
  type = 'save', // 'save' | 'delete' | 'warning'
  danger = false,
  modalId = null
} = {}) {
  return new Promise((resolve) => {
    _confirmResolver = resolve;

    let finalDetailsHtml = detailsHtml;
    if (modalId && type === 'save') {
      const changed = typeof getChangedFields === 'function' ? getChangedFields(modalId) : [];
      if (changed.length > 0) {
        const changesText = `<strong>Kolom yang diedit:</strong><br><span style="color:var(--gold)">${escapeHtml(changed.join(', '))}</span>`;
        if (finalDetailsHtml) {
          finalDetailsHtml = finalDetailsHtml + '<br><br>' + changesText;
        } else {
          finalDetailsHtml = changesText;
        }
      }
    }

    document.getElementById('confirm-modal-title').textContent = title;
    document.getElementById('confirm-modal-heading').textContent = heading;
    document.getElementById('confirm-modal-desc').textContent = message;

    const detailsEl = document.getElementById('confirm-modal-details');
    if (finalDetailsHtml) {
      detailsEl.innerHTML = finalDetailsHtml;
      detailsEl.style.display = 'block';
    } else {
      detailsEl.style.display = 'none';
      detailsEl.innerHTML = '';
    }

    const okBtn = document.getElementById('confirm-btn-ok');
    const cancelBtn = document.getElementById('confirm-btn-cancel');
    okBtn.textContent = confirmText;
    cancelBtn.textContent = cancelText;

    const iconEl = document.getElementById('confirm-modal-icon');
    if (type === 'delete' || danger) {
      okBtn.className = 'btn btn-delete';
      okBtn.style.background = 'var(--danger)';
      okBtn.style.color = '#fff';
      iconEl.innerHTML = `
        <div style="width:54px;height:54px;border-radius:50%;background:rgba(239,68,68,0.12);color:var(--danger);display:flex;align-items:center;justify-content:center;margin:0 auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </div>
      `;
    } else if (type === 'warning') {
      okBtn.className = 'btn btn-primary';
      okBtn.style.background = '#d97706';
      okBtn.style.color = '#fff';
      iconEl.innerHTML = `
        <div style="width:54px;height:54px;border-radius:50%;background:rgba(217,119,6,0.12);color:#d97706;display:flex;align-items:center;justify-content:center;margin:0 auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
        </div>
      `;
    } else {
      // Save / Primary (Gold/Green glow)
      okBtn.className = 'btn btn-primary';
      okBtn.style.background = '';
      okBtn.style.color = '';
      iconEl.innerHTML = `
        <div style="width:54px;height:54px;border-radius:50%;background:rgba(184,134,11,0.14);color:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        </div>
      `;
    }

    openModal('modal-confirm', false);
  });
}

function resolveConfirmModal(value) {
  closeModal('modal-confirm', true);
  if (_confirmResolver) {
    const resolver = _confirmResolver;
    _confirmResolver = null;
    resolver(value);
  }
}

// ── Logout ─────────────────────────────────────────────────
async function doLogout() {
  const confirmed = await showConfirmModal({
    title: 'Konfirmasi Keluar',
    heading: 'Keluar dari Dashboard Admin?',
    message: 'Sesi login Anda akan diakhiri dan dialihkan kembali ke halaman utama.',
    confirmText: 'Ya, Keluar',
    cancelText: 'Batal',
    type: 'warning'
  });
  if (!confirmed) return;
  await db.auth.signOut();
  window.location.replace('../index.html');
}

// ── Toast ───────────────────────────────────────────────────
function toast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + type;
  setTimeout(() => { t.className = ''; }, 3500);
}

// ── Form Change Detection / Dirty Check Helpers ─────────────
const _initialFormStates = {};

function getFormSnapshot(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return {};
  const form = modal.tagName === 'FORM' ? modal : modal.querySelector('form');
  if (!form) return {};
  const snapshot = {};
  const elements = form.querySelectorAll('input, select, textarea');
  elements.forEach(el => {
    if (el.type === 'checkbox') {
      snapshot[el.id] = el.checked;
    } else if (el.type !== 'file') {
      snapshot[el.id] = (el.value || '').trim();
    }
  });
  return snapshot;
}

function saveInitialFormState(modalId) {
  _initialFormStates[modalId] = JSON.stringify(getFormSnapshot(modalId));
}

function getChangedFields(modalId) {
  if (!_initialFormStates[modalId]) return [];
  const initial = JSON.parse(_initialFormStates[modalId]);
  const current = getFormSnapshot(modalId);
  const changed = [];
  
  const modal = document.getElementById(modalId);
  if (!modal) return [];

  for (const key in current) {
    if (current[key] !== initial[key]) {
      const el = document.getElementById(key);
      let label = key;
      if (el) {
        let labelEl = modal.querySelector(`label[for="${key}"]`);
        if (!labelEl) {
          const formGroup = el.closest('.form-group') || el.parentElement;
          if (formGroup) labelEl = formGroup.querySelector('.form-label');
        }
        if (!labelEl && el.previousElementSibling && el.previousElementSibling.classList.contains('form-label')) {
          labelEl = el.previousElementSibling;
        }
        
        if (labelEl) {
          label = labelEl.textContent.replace(/\*/g, '').trim();
        } else if (el.placeholder) {
          label = el.placeholder;
        }
      }
      changed.push(label);
    }
  }
  return changed;
}

function isFormDirty(modalId) {
  return getChangedFields(modalId).length > 0;
}

function clearFormState(modalId) {
  delete _initialFormStates[modalId];
}

// ── Modal helpers ───────────────────────────────────────────
let _adminModalScrollPos = 0;
let _currentTab = 'jadwal';
let _isPopStateNav = false;

function openModal(id, pushHistory = true) {
  const el = document.getElementById(id);
  if (el) {
    _adminModalScrollPos = window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0;
    el.classList.add('open');
    document.body.classList.add('modal-open');
    document.body.style.overflow = 'hidden';

    if (pushHistory && window.history && window.history.pushState) {
      window.history.pushState({ adminModal: id, tab: _currentTab }, '', '#' + _currentTab);
    }
  }
}

function closeModal(id, fromPopState = false) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('open');
  clearFormState(id);

  if (!fromPopState && window.history && history.state && history.state.adminModal === id) {
    window.history.back();
  }

  if (!document.querySelector('.modal-overlay.open')) {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    window.scrollTo({ top: _adminModalScrollPos, behavior: 'instant' });
  }
}

async function safeCloseModal(id) {
  if (id === 'modal-confirm') {
    resolveConfirmModal(false);
    return;
  }
  const changed = getChangedFields(id);
  if (changed.length > 0) {
    const leave = await showConfirmModal({
      title: 'Batalkan Perubahan?',
      heading: 'Perubahan Belum Disimpan',
      message: 'Anda memiliki perubahan yang belum disimpan. Apakah Anda yakin ingin membatalkan dan keluar?',
      detailsHtml: `<strong>Kolom yang diubah:</strong><br><span style="color:var(--danger)">${escapeHtml(changed.join(', '))}</span><br><br>Peringatan: Perubahan ini akan hilang jika Anda keluar.`,
      confirmText: 'Ya, Buang Perubahan',
      cancelText: 'Lanjutkan Mengedit',
      type: 'warning'
    });
    if (!leave) return;
  }
  closeModal(id);
}

// Close on backdrop click (with safe dirty check)
document.querySelectorAll('.modal-overlay').forEach(m => {
  m.addEventListener('click', e => {
    if (e.target === m) {
      if (m.id === 'modal-confirm') {
        resolveConfirmModal(false);
      } else {
        safeCloseModal(m.id);
      }
    }
  });
});

// Escape key (with safe dirty check)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const openConfirm = document.querySelector('#modal-confirm.open');
    if (openConfirm) {
      resolveConfirmModal(false);
      return;
    }
    document.querySelectorAll('.modal-overlay.open').forEach(m => safeCloseModal(m.id));
  }
});

// ── Device / Browser Back Button Listener (Prevents Navigation Loops) ───────
window.addEventListener('popstate', (e) => {
  _isPopStateNav = true;

  // 1. If sidebar is open on mobile, close it
  const sidebar = document.getElementById('sidebar');
  if (sidebar && sidebar.classList.contains('open')) {
    closeSidebar();
    _isPopStateNav = false;
    return;
  }

  // 2. If confirm modal is open, dismiss it
  const openConfirm = document.querySelector('#modal-confirm.open');
  if (openConfirm) {
    resolveConfirmModal(false);
    _isPopStateNav = false;
    return;
  }

  // 3. If any data modal is open, close only top data modal
  const openModals = Array.from(document.querySelectorAll('.modal-overlay.open')).filter(m => m.id !== 'modal-confirm');
  if (openModals.length > 0) {
    const topModal = openModals[openModals.length - 1];
    closeModal(topModal.id, true);
    _isPopStateNav = false;
    return;
  }

  // 4. Switch to target tab according to state / hash
  const targetTab = e.state?.tab || location.hash.replace('#', '') || 'jadwal';
  showTab(targetTab, null, false);

  _isPopStateNav = false;
});

// ── Tab switcher ────────────────────────────────────────────
function showTab(name, btn = null, pushHistory = true) {
  if (!name) name = 'jadwal';
  _currentTab = name;

  document.querySelectorAll('.tab-panel').forEach(p => p.style.display = 'none');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.mobile-tab-btn').forEach(b => b.classList.remove('active'));

  const targetPanel = document.getElementById('tab-' + name);
  if (targetPanel) targetPanel.style.display = 'block';

  // Active state pada sidebar nav
  const sideBtn = btn || document.getElementById('nav-' + name);
  if (sideBtn) sideBtn.classList.add('active');

  // Active state pada mobile quick tab bar
  const mobBtn = document.getElementById('mobile-tab-' + name);
  if (mobBtn) {
    mobBtn.classList.add('active');
    mobBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  const titles = {
    'jadwal': 'Jadwal Misa',
    'renungan': 'Renungan Harian',
    'pengumuman': 'Pengumuman Paroki',
    'galeri': 'Galeri Kegiatan',
    'stasi': 'Data & Foto Stasi',
    'konten': 'Konten Situs',
    'pesan': 'Pesan Masuk'
  };
  document.getElementById('topbar-title').textContent = titles[name] || 'Admin';

  // Update URL hash cleanly without duplicate history accumulation
  if (pushHistory && !_isPopStateNav && window.history && window.history.pushState) {
    if (location.hash.replace('#', '') !== name) {
      window.history.pushState({ tab: name }, '', '#' + name);
    }
  }

  // Tutup sidebar di mobile secara halus jika sedang terbuka
  closeSidebar();

  if (name === 'jadwal')     loadJadwal();
  if (name === 'renungan')   loadRenungan();
  if (name === 'pengumuman')  loadPengumuman();
  if (name === 'galeri')      loadGaleri();
  if (name === 'stasi')       loadStasiAdmin();
  if (name === 'konten' && typeof loadSiteContentAdmin === 'function') loadSiteContentAdmin();
  if (name === 'pesan')       loadPesan();
}

// ── Counters ────────────────────────────────────────────────
async function loadCounters() {
  // 1. Jadwal Misa Count
  try {
    const { count: cJ, data: dJ } = await db.from('jadwal_misa').select('id', { count: 'exact' });
    const countJ = (cJ !== null && cJ !== undefined) ? cJ : (dJ ? dJ.length : 0);
    const el1 = document.getElementById('stat-jadwal');
    const el2 = document.getElementById('count-jadwal');
    if (el1) el1.textContent = countJ;
    if (el2) el2.textContent = countJ;
  } catch (e) {
    console.warn('Count jadwal note:', e);
  }

  // 2. Stasi Paroki Count (9 Stasi)
  const elStasi = document.getElementById('stat-stasi');
  if (elStasi) elStasi.textContent = '9';

  // 3. Renungan Count
  try {
    const { count: cR, data: dR } = await db.from('renungan').select('id', { count: 'exact' });
    const countR = (cR !== null && cR !== undefined) ? cR : (dR ? dR.length : 0);
    const el1 = document.getElementById('stat-renungan');
    const el2 = document.getElementById('count-renungan');
    if (el1) el1.textContent = countR;
    if (el2) el2.textContent = countR;
  } catch (e) {
    const el1 = document.getElementById('stat-renungan');
    const el2 = document.getElementById('count-renungan');
    if (el1) el1.textContent = '0';
    if (el2) el2.textContent = '0';
  }

  // 4. Pengumuman Aktif Count
  try {
    const { count: cP, data: dP } = await db.from('pengumuman').select('id', { count: 'exact' }).eq('aktif', true);
    const countP = (cP !== null && cP !== undefined) ? cP : (dP ? dP.length : 0);
    const el1 = document.getElementById('stat-pengumuman');
    const el2 = document.getElementById('count-pengumuman');
    if (el1) el1.textContent = countP;
    if (el2) el2.textContent = countP;
  } catch (e) {
    const el1 = document.getElementById('stat-pengumuman');
    const el2 = document.getElementById('count-pengumuman');
    if (el1) el1.textContent = '0';
    if (el2) el2.textContent = '0';
  }

  // 5. Galeri Foto Count
  try {
    const { count: cG, data: dG } = await db.from('galeri').select('id', { count: 'exact' });
    const countG = (cG !== null && cG !== undefined) ? cG : (dG ? dG.length : 4);
    const el1 = document.getElementById('stat-galeri');
    const el2 = document.getElementById('count-galeri');
    if (el1) el1.textContent = countG;
    if (el2) el2.textContent = countG;
  } catch (e) {
    const el1 = document.getElementById('stat-galeri');
    const el2 = document.getElementById('count-galeri');
    if (el1) el1.textContent = '4';
    if (el2) el2.textContent = '4';
  }

  // 6. Pesan Masuk Count
  try {
    const { count: cM, data: dM } = await db.from('pesan').select('id', { count: 'exact' }).eq('dibaca', false);
    const countM = (cM !== null && cM !== undefined) ? cM : (dM ? dM.length : 0);
    const el1 = document.getElementById('stat-pesan');
    const el2 = document.getElementById('count-pesan');
    if (el1) el1.textContent = countM;
    if (el2) el2.textContent = countM ? `${countM} baru` : '0';
  } catch (e) {
    const el1 = document.getElementById('stat-pesan');
    const el2 = document.getElementById('count-pesan');
    if (el1) el1.textContent = '0';
    if (el2) el2.textContent = '0';
  }
}

// Cache data by ID for safe edit calls
let _jadwalMap   = {};
let _renunganMap = {};
let _renunganList= [];
let _pengMap     = {};
let _galeriMap   = {};
let _stasiMap    = {};

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// ══════════════════════════════════════════
//  JADWAL MISA
// ══════════════════════════════════════════
let _allJadwalList = [];

async function loadJadwal() {
  const el = document.getElementById('jadwal-content');
  el.innerHTML = '<div class="empty-state"><p>Memuat data…</p></div>';

  try {
    const { data, error } = await db.from('jadwal_misa').select('*').order('urutan').order('created_at');
    if (error) throw error;

    _allJadwalList = data || [];
    _jadwalMap = {};
    _allJadwalList.forEach(r => { _jadwalMap[r.id] = r; });

    filterJadwalList();
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>Gagal memuat: ${escapeHtml(err.message)}<br><small>Pastikan tabel sudah dibuat di Supabase.</small></p></div>`;
  }
}

function filterJadwalList() {
  const stasi = document.getElementById('filter-stasi')?.value || '';
  const search = (document.getElementById('filter-search-jadwal')?.value || '').toLowerCase().trim();

  let filtered = _allJadwalList;
  if (stasi) {
    filtered = filtered.filter(r => r.stasi === stasi);
  }
  if (search) {
    filtered = filtered.filter(r => {
      const stasiName = (STASI_MAP[r.stasi] || r.stasi || '').toLowerCase();
      const hari = (r.hari || '').toLowerCase();
      const waktu = (r.waktu || '').toLowerCase();
      const ket = (r.keterangan || '').toLowerCase();
      const minggu = (r.minggu_ke || '').toLowerCase();
      return stasiName.includes(search) || hari.includes(search) || waktu.includes(search) || ket.includes(search) || minggu.includes(search);
    });
  }

  renderJadwalView(filtered, !!(stasi || search));
}

function resetJadwalFilter() {
  const stasiEl = document.getElementById('filter-stasi');
  const searchEl = document.getElementById('filter-search-jadwal');
  if (stasiEl) stasiEl.value = '';
  if (searchEl) searchEl.value = '';
  filterJadwalList();
}

function renderJadwalView(data, isFiltered = false) {
  const el = document.getElementById('jadwal-content');
  if (!el) return;

  if (!data?.length) {
    if (isFiltered) {
      el.innerHTML = `<div class="empty-state"><p>Tidak ada jadwal yang cocok dengan kata kunci/filter.</p></div>`;
    } else {
      el.innerHTML = `<div class="empty-state"><p>Belum ada jadwal.<br>Klik "+ Tambah Jadwal" untuk menambahkan.</p></div>`;
    }
    return;
  }

  el.innerHTML = `
    <!-- Desktop Table View -->
    <div class="desktop-table-view">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Stasi</th>
            <th>Hari / Sesi</th>
            <th>Jam</th>
            <th>Keterangan</th>
            <th>Minggu ke-</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((r, i) => `
            <tr>
              <td style="color:var(--ink-soft);font-size:0.75rem">${i + 1}</td>
              <td>
                <span class="badge badge-gold">${escapeHtml(STASI_MAP[r.stasi] || r.stasi)}</span>
              </td>
              <td style="font-weight:600;color:var(--ink)">${escapeHtml(r.hari)}</td>
              <td>
                <span style="font-size:1rem;font-weight:900;color:var(--ink)">${escapeHtml(r.waktu)}</span>
              </td>
              <td>${escapeHtml(r.keterangan || '—')}</td>
              <td style="color:var(--ink-soft)">${r.minggu_ke ? escapeHtml(r.minggu_ke) : '<span style="color:#ccc">Setiap Minggu</span>'}</td>
              <td>
                <div style="display:flex;gap:0.4rem;flex-wrap:nowrap">
                  <button class="btn btn-edit btn-sm" onclick="editJadwal('${r.id}')" title="Edit jadwal ini">
                    Edit
                  </button>
                  <button class="btn btn-delete btn-sm" onclick="confirmDelete('jadwal_misa','${r.id}','jadwal misa ini','loadJadwal')" title="Hapus jadwal ini">
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards View (No horizontal scroll, 100% visible & ergonomic) -->
    <div class="mobile-cards-view">
      ${data.map((r, i) => `
        <div class="admin-data-card">
          <div class="admin-data-card-head">
            <span class="badge badge-gold">${escapeHtml(STASI_MAP[r.stasi] || r.stasi)}</span>
            <div class="admin-data-card-time">
              <span>${escapeHtml(r.waktu)}</span>
            </div>
          </div>
          <div class="admin-data-card-body">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
              <span class="admin-data-card-title">${escapeHtml(r.hari)}</span>
              <span style="font-size:0.72rem;font-weight:600;color:var(--ink-soft);background:var(--bg-alt);padding:2px 8px;border-radius:6px;border:1px solid var(--border)">
                ${r.minggu_ke ? escapeHtml(r.minggu_ke) : 'Setiap Minggu'}
              </span>
            </div>
            ${r.keterangan ? `<div class="admin-data-card-sub" style="margin-top:3px">${escapeHtml(r.keterangan)}</div>` : ''}
          </div>
          <div class="admin-data-card-actions">
            <button class="btn btn-edit btn-sm" onclick="editJadwal('${r.id}')">
              Edit Jadwal
            </button>
            <button class="btn btn-delete btn-sm" onclick="confirmDelete('jadwal_misa','${r.id}','jadwal misa ini','loadJadwal')">
              Hapus
            </button>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="padding:0.75rem 1rem;font-size:0.72rem;color:var(--ink-soft);border-top:1px solid var(--border);background:var(--bg-alt)">
      Menampilkan ${data.length} dari ${_allJadwalList.length} jadwal misa
    </div>
  `;
}

// ── Unified Dropdown & Custom Input Helpers (DRY) ─────────────
function handleCustomSelectChange(selectEl, customInputId, isRequired = true) {
  const customInput = document.getElementById(customInputId);
  if (!customInput) return;
  const isCustom = selectEl.value === 'custom';
  customInput.style.display = isCustom ? 'block' : 'none';
  customInput.required = isCustom && isRequired;
  if (isCustom) {
    customInput.focus();
  } else {
    customInput.value = selectEl.value;
  }
}

// Backward-compatible named aliases
const handleHariSelectChange       = (el) => handleCustomSelectChange(el, 'j-hari', true);
const handleWaktuSelectChange      = (el) => handleCustomSelectChange(el, 'j-waktu', true);
const handleKeteranganSelectChange = (el) => handleCustomSelectChange(el, 'j-keterangan', false);
const handleMingguSelectChange     = (el) => handleCustomSelectChange(el, 'j-minggu', false);

function syncSelectWithCustomInput(selectId, inputId, rawVal = '') {
  const select = document.getElementById(selectId);
  const input  = document.getElementById(inputId);
  if (!select || !input) return;

  const val = String(rawVal || '').trim();
  let matched = false;
  if (val) {
    for (let opt of select.options) {
      if (opt.value && opt.value.toLowerCase() === val.toLowerCase()) {
        select.value = opt.value;
        matched = true;
        break;
      }
    }
  }

  if (!matched && val) {
    select.value = 'custom';
    input.style.display = 'block';
    input.value = val;
  } else {
    select.value = matched ? select.value : '';
    input.style.display = 'none';
    input.value = select.value;
  }
}

function getCustomSelectValue(selectId, inputId) {
  const select = document.getElementById(selectId);
  const input  = document.getElementById(inputId);
  if (select && select.value === 'custom') {
    return input ? input.value.trim() : '';
  }
  return select ? select.value.trim() : (input ? input.value.trim() : '');
}

function openJadwalModal(data = null) {
  const jidEl = document.getElementById('jid');
  if (jidEl) jidEl.value = data?.id || '';
  const jStasiEl = document.getElementById('j-stasi');
  if (jStasiEl) jStasiEl.value = data?.stasi || '';
  const jUrutanEl = document.getElementById('j-urutan');
  if (jUrutanEl) jUrutanEl.value = data?.urutan ?? 0;
  
  const alertEl = document.getElementById('jadwal-alert');
  if (alertEl) alertEl.style.display = 'none';

  syncSelectWithCustomInput('j-hari-select', 'j-hari', data?.hari);
  syncSelectWithCustomInput('j-waktu-select', 'j-waktu', data?.waktu);
  syncSelectWithCustomInput('j-keterangan-select', 'j-keterangan', data?.keterangan);
  syncSelectWithCustomInput('j-minggu-select', 'j-minggu', data?.minggu_ke);

  const isEdit = !!data?.id;
  const titleEl = document.getElementById('modal-jadwal-title');
  if (titleEl) titleEl.textContent = isEdit ? 'Edit Jadwal Misa' : 'Tambah Jadwal Misa';
  const btnTextEl = document.getElementById('btn-jadwal-text');
  if (btnTextEl) btnTextEl.textContent = isEdit ? 'Simpan Perubahan' : 'Simpan Jadwal';

  openModal('modal-jadwal');
  saveInitialFormState('modal-jadwal');
  const jStasiFocus = document.getElementById('j-stasi');
  if (jStasiFocus) setTimeout(() => jStasiFocus.focus(), 100);
}

function editJadwal(id) { openJadwalModal(_jadwalMap[id]); }

// ── Database Error Formatter Helper ─────────────────────────
function formatDbError(error, defaultMsg = 'Terjadi kesalahan pada database.') {
  if (!error) return defaultMsg;
  const msg = error.message || (typeof error === 'string' ? error : JSON.stringify(error));
  if (msg.includes('row-level security') || msg.includes('policy') || msg.includes('permission denied') || msg.includes('JWT')) {
    return 'Akses ditolak: Izin penyimpanan database (RLS) memerlukan login admin.';
  }
  if (msg.includes('Failed to fetch') || msg.includes('network') || msg.includes('NetworkError') || msg.includes('offline')) {
    return 'Koneksi terputus: Gagal terhubung ke database. Periksa koneksi internet Anda.';
  }
  if (msg.includes('relation') && (msg.includes('does not exist') || msg.includes('not found'))) {
    return 'Tabel database belum dibuat di Supabase. Silakan jalankan skrip SQL di SQL Editor Supabase.';
  }
  if (msg.includes('duplicate key') || msg.includes('unique constraint')) {
    return 'Data dengan ID atau kunci ini sudah terdaftar sebelumnya.';
  }
  return `${defaultMsg} (${msg})`;
}

// ── Drag & Drop / Image Engine ──────────────────────────────
function optimizeImage(file, maxWidth = 1600, quality = 0.82) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) {
      return reject(new Error('Berkas yang dipilih bukan berkas gambar.'));
    }
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca berkas gambar dari perangkat Anda.'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Format berkas gambar tidak didukung atau rusak.'));
      img.onload = () => {
        try {
          let w = img.width;
          let h = img.height;
          if (w > maxWidth || h > maxWidth) {
            if (w > h) {
              h = Math.round((h * maxWidth) / w);
              w = maxWidth;
            } else {
              w = Math.round((w * maxWidth) / h);
              h = maxWidth;
            }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);

          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          canvas.toBlob((blob) => {
            resolve({ blob: blob || file, dataUrl, width: w, height: h });
          }, 'image/jpeg', quality);
        } catch (err) {
          reject(err);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}

function triggerFileInput(id) {
  const el = document.getElementById(id);
  if (el) el.click();
}

function handleFileSelected(event, prefix) {
  const file = event.target.files?.[0];
  if (file) {
    handleFileUpload(file, prefix);
  }
}

async function handleFileUpload(file, prefix) {
  if (!file) return;
  const alertEl    = document.getElementById(prefix === 'g' ? 'galeri-alert' : 'stasi-alert');
  const progressEl = document.getElementById(`${prefix}-progress`);
  const progBar    = document.getElementById(`${prefix}-progress-bar`);
  const hintEl     = document.getElementById(`${prefix}-status-hint`);

  alertEl.style.display = 'none';

  if (!file.type.startsWith('image/')) {
    alertEl.textContent = 'Berkas tidak valid: Harap unggah foto dengan format JPG, PNG, atau WEBP.';
    alertEl.style.display = 'flex';
    toast('Berkas harus berupa gambar!', 'error');
    return;
  }

  if (file.size > 12 * 1024 * 1024) {
    alertEl.textContent = 'Ukuran berkas terlalu besar (Maksimal 12 MB).';
    alertEl.style.display = 'flex';
    toast('Ukuran foto maksimal 12 MB', 'error');
    return;
  }

  try {
    progressEl.style.display = 'block';
    progBar.style.width = '30%';
    if (hintEl) hintEl.textContent = 'Mengompres dan memproses foto…';

    const { blob, dataUrl } = await optimizeImage(file, 1600, 0.82);
    progBar.style.width = '70%';

    let finalUrl = null;
    const bucket = prefix === 'g' ? 'galeri' : 'stasi';
    const ext = (file.name.split('.').pop() || 'jpg').toLowerCase();
    const fileName = `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}.${ext}`;

    // Coba upload ke Supabase Storage jika bucket tersedia
    try {
      if (db.storage && db.storage.from) {
        const { data: uploadData, error: uploadErr } = await db.storage.from(bucket).upload(fileName, blob, {
          contentType: 'image/jpeg',
          upsert: true
        });
        if (!uploadErr && uploadData) {
          const { data: pubData } = db.storage.from(bucket).getPublicUrl(fileName);
          if (pubData?.publicUrl) {
            finalUrl = pubData.publicUrl;
          }
        }
      }
    } catch (storageErr) {
      console.warn('Storage upload note (menggunakan fallback Base64):', storageErr);
    }

    // Fallback cerdas: jika storage belum dikonfigurasi, gunakan data URL terkompresi
    if (!finalUrl) {
      finalUrl = dataUrl;
    }

    progBar.style.width = '100%';
    setTimeout(() => {
      progressEl.style.display = 'none';
      progBar.style.width = '0%';
    }, 400);

    document.getElementById(`${prefix}-foto`).value = finalUrl;
    const manualInput = document.getElementById(`${prefix}-foto-manual`);
    if (manualInput) manualInput.value = finalUrl.startsWith('data:') ? '[Foto berhasil diunggah langsung]' : finalUrl;

    setDropzonePreview(prefix, finalUrl);
    if (hintEl) hintEl.textContent = '✓ Foto siap disimpan ke database.';
    toast('Foto berhasil diproses & siap disimpan.');
  } catch (err) {
    progressEl.style.display = 'none';
    progBar.style.width = '0%';
    if (hintEl) hintEl.textContent = 'Gagal memproses foto.';
    const errMsg = formatDbError(err, 'Gagal memproses foto');
    alertEl.textContent = errMsg;
    alertEl.style.display = 'flex';
    toast(errMsg, 'error');
    console.error('File upload error:', err);
  }
}

function setDropzonePreview(prefix, url) {
  const promptEl    = document.getElementById(`${prefix}-dropzone-prompt`);
  const previewWrap = document.getElementById(`${prefix}-dropzone-preview`);
  const imgEl       = document.getElementById(`${prefix}-preview-img`);
  const dropzone    = document.getElementById(`${prefix}-dropzone`);

  if (url && url.trim()) {
    const resolved = resolveAdminImgUrl(url.trim());
    imgEl.src = resolved;
    promptEl.style.display = 'none';
    previewWrap.style.display = 'flex';
    dropzone.classList.add('has-file');
  } else {
    imgEl.src = '';
    promptEl.style.display = 'flex';
    previewWrap.style.display = 'none';
    dropzone.classList.remove('has-file');
  }
}

function removeImage(prefix) {
  document.getElementById(`${prefix}-foto`).value = '';
  const manualInput = document.getElementById(`${prefix}-foto-manual`);
  if (manualInput) manualInput.value = '';
  const fileInput = document.getElementById(`${prefix}-file-input`);
  if (fileInput) fileInput.value = '';
  const hintEl = document.getElementById(`${prefix}-status-hint`);
  if (hintEl) hintEl.textContent = prefix === 'g' ? 'Tarik foto ke kotak di atas atau pilih berkas' : 'Kosongkan jika stasi dalam tahap pembangunan';
  setDropzonePreview(prefix, '');
}

function toggleUrlInput(prefix) {
  const wrap = document.getElementById(`${prefix}-url-wrap`);
  if (!wrap) return;
  const isHidden = wrap.style.display === 'none' || !wrap.style.display;
  wrap.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    const manualInput = document.getElementById(`${prefix}-foto-manual`);
    if (manualInput) {
      manualInput.focus();
      manualInput.select();
    }
  }
}

function handleManualUrlInput(prefix) {
  const manualInput = document.getElementById(`${prefix}-foto-manual`);
  const val = (manualInput?.value || '').trim();
  const hintEl = document.getElementById(`${prefix}-status-hint`);
  if (val.length > 5 && (val.startsWith('http://') || val.startsWith('https://') || val.startsWith('assets/') || val.startsWith('data:'))) {
    setDropzonePreview(prefix, val);
    if (hintEl) hintEl.textContent = '✓ URL foto diterapkan.';
  }
}

function applyManualUrl(prefix) {
  const manualInput = document.getElementById(`${prefix}-foto-manual`);
  const val = (manualInput?.value || '').trim();
  const alertEl = document.getElementById(prefix === 'g' ? 'galeri-alert' : 'stasi-alert');
  const hintEl = document.getElementById(`${prefix}-status-hint`);

  if (alertEl) alertEl.style.display = 'none';

  if (!val) {
    document.getElementById(`${prefix}-foto`).value = '';
    setDropzonePreview(prefix, '');
    if (hintEl) hintEl.textContent = prefix === 'g' ? 'Silakan pilih foto atau masukkan URL.' : 'Kosongkan jika stasi dalam tahap pembangunan';
    return;
  }

  document.getElementById(`${prefix}-foto`).value = val;
  setDropzonePreview(prefix, val);
  if (hintEl) hintEl.textContent = '✓ URL foto berhasil diterapkan.';
  toast('URL foto berhasil diterapkan.');
}

function initDropzones() {
  ['g', 's'].forEach(prefix => {
    const dz = document.getElementById(`${prefix}-dropzone`);
    if (!dz) return;

    ['dragenter', 'dragover'].forEach(eventName => {
      dz.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dz.classList.add('drag-active');
      }, false);
    });

    ['dragleave', 'dragend'].forEach(eventName => {
      dz.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dz.classList.remove('drag-active');
      }, false);
    });

    dz.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dz.classList.remove('drag-active');
      const dt = e.dataTransfer;
      const files = dt?.files;
      if (files && files.length > 0) {
        handleFileUpload(files[0], prefix);
      }
    }, false);
  });
}

// ══════════════════════════════════════════
//  SUBMIT JADWAL (CRUD + Confirmation + Error Handling)
// ══════════════════════════════════════════
async function submitJadwal(e) {
  e.preventDefault();
  const id      = document.getElementById('jid').value;
  const alertEl = document.getElementById('jadwal-alert');

  const stasiVal  = document.getElementById('j-stasi').value;
  const hariVal   = getCustomSelectValue('j-hari-select', 'j-hari');
  const waktuVal  = getCustomSelectValue('j-waktu-select', 'j-waktu');
  const ketVal    = getCustomSelectValue('j-keterangan-select', 'j-keterangan');
  const mingguVal = getCustomSelectValue('j-minggu-select', 'j-minggu');
  const urutanVal = parseInt(document.getElementById('j-urutan').value) || 0;

  if (!stasiVal || !hariVal || !waktuVal) {
    alertEl.textContent = 'Harap lengkapi semua kolom wajib (Stasi, Hari, dan Waktu).';
    alertEl.style.display = 'flex';
    toast('Kolom wajib belum lengkap', 'error');
    return;
  }

  // Confirmation handling
  const stasiName = STASI_MAP[stasiVal] || stasiVal;
  const confirmed = await showConfirmModal({
    title: id ? 'Konfirmasi Simpan Perubahan' : 'Konfirmasi Tambah Jadwal',
    heading: id ? 'Simpan Perubahan Jadwal Misa?' : 'Tambahkan Jadwal Misa Baru?',
    message: id 
      ? 'Perubahan jadwal misa ini akan langsung disimpan ke database dan tampil di website.' 
      : 'Jadwal misa baru akan langsung ditambahkan ke jadwal paroki.',
    detailsHtml: `<strong>Stasi:</strong> ${escapeHtml(stasiName)}<br><strong>Hari & Jam:</strong> ${escapeHtml(hariVal)}, ${escapeHtml(waktuVal)} ${ketVal ? `<br><strong>Keterangan:</strong> ${escapeHtml(ketVal)}` : ''}`,
    confirmText: id ? 'Ya, Simpan Perubahan' : 'Ya, Tambahkan Jadwal',
    cancelText: 'Periksa Kembali',
    type: 'save',
    modalId: 'modal-jadwal'
  });

  if (!confirmed) return;

  const btn = document.getElementById('btn-submit-jadwal');
  alertEl.style.display = 'none';
  btn.disabled = true;
  document.getElementById('btn-jadwal-text').textContent = 'Menyimpan…';

  try {
    const payload = {
      stasi:      stasiVal,
      hari:       hariVal,
      waktu:      waktuVal,
      keterangan: ketVal,
      minggu_ke:  mingguVal || null,
      urutan:     urutanVal,
      updated_at: new Date().toISOString()
    };

    let error;
    if (id) {
      ({ error } = await db.from('jadwal_misa').update(payload).eq('id', id));
    } else {
      payload.created_at = new Date().toISOString();
      ({ error } = await db.from('jadwal_misa').insert(payload));
    }

    if (error) throw error;

    closeModal('modal-jadwal');
    toast(id ? 'Jadwal berhasil diperbarui.' : 'Jadwal baru berhasil ditambahkan.');
    loadJadwal();
    loadCounters();
  } catch (err) {
    const errMsg = formatDbError(err, 'Gagal menyimpan jadwal misa');
    alertEl.textContent = errMsg;
    alertEl.style.display = 'flex';
    toast(errMsg, 'error');
    console.error('Submit jadwal error:', err);
  } finally {
    btn.disabled = false;
    document.getElementById('btn-jadwal-text').textContent = id ? 'Simpan Perubahan' : 'Simpan Jadwal';
  }
}

// ══════════════════════════════════════════
//  RENUNGAN HARIAN (CRUD + Filtering + Confirmation + Error Handling)
// ══════════════════════════════════════════
function formatTanggalIndo(dateStr) {
  if (!dateStr) return '—';
  try {
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10);
    const d = parseInt(parts[2], 10);
    const date = new Date(y, m - 1, d);
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][date.getDay()];
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'][m - 1];
    return `${hari}, ${d} ${bulan} ${y}`;
  } catch (e) {
    return dateStr;
  }
}

function getLiturgiBadgeClass(liturgi) {
  if (!liturgi) return 'badge-green';
  const l = liturgi.toLowerCase();
  if (l.includes('adven') || l.includes('prapaskah')) return 'badge-purple';
  if (l.includes('natal') || l.includes('paskah') || l.includes('pesta') || l.includes('raya')) return 'badge-gold';
  return 'badge-green';
}

async function loadRenungan() {
  const el = document.getElementById('renungan-content');
  if (!el) return;
  el.innerHTML = '<div class="empty-state"><p>Memuat data renungan…</p></div>';

  try {
    const { data, error } = await db.from('renungan').select('*').order('tanggal', { ascending: false });
    if (error) throw error;

    _renunganList = data || [];
    _renunganMap  = {};
    _renunganList.forEach(r => { _renunganMap[r.id] = r; });

    renderRenunganTable(_renunganList);
  } catch (err) {
    console.error('Load renungan error:', err);
    el.innerHTML = `
      <div class="empty-state">
        <p style="color:var(--danger)">Gagal memuat renungan: ${escapeHtml(err.message || 'Tabel belum tersedia')}</p>
        <p style="font-size:0.8rem;color:var(--ink-soft);margin-top:8px">Pastikan tabel <code>renungan</code> telah dibuat di Supabase SQL Editor menggunakan skrip <code>supabase-schema.sql</code>.</p>
        <button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="loadRenungan()">Coba Lagi</button>
      </div>`;
  }
}

function filterRenunganList() {
  const q   = (document.getElementById('filter-search-renungan')?.value || '').toLowerCase().trim();
  const lit = document.getElementById('filter-liturgi-renungan')?.value || '';

  const filtered = _renunganList.filter(r => {
    const matchQ = !q ||
      (r.tema && r.tema.toLowerCase().includes(q)) ||
      (r.perikop && r.perikop.toLowerCase().includes(q)) ||
      (r.ayat && r.ayat.toLowerCase().includes(q)) ||
      (r.refleksi && r.refleksi.toLowerCase().includes(q)) ||
      (r.tanggal && r.tanggal.includes(q));

    const matchLit = !lit || (r.liturgi === lit);
    return matchQ && matchLit;
  });

  renderRenunganTable(filtered, true);
}

function resetRenunganFilter() {
  const qEl = document.getElementById('filter-search-renungan');
  const litEl = document.getElementById('filter-liturgi-renungan');
  if (qEl) qEl.value = '';
  if (litEl) litEl.value = '';
  filterRenunganList();
}

function renderRenunganTable(list, isFiltered = false) {
  const el = document.getElementById('renungan-content');
  if (!el) return;

  if (!list.length) {
    if (isFiltered) {
      el.innerHTML = `<div class="empty-state"><p>Tidak ada data renungan yang sesuai dengan kata kunci / filter.</p></div>`;
    } else {
      el.innerHTML = `
        <div class="empty-state">
          <p style="font-weight:700;font-size:1rem;color:var(--ink);margin-bottom:6px">Belum Ada Renungan Khusus Paroki</p>
          <p style="color:var(--ink-soft);font-size:0.85rem">Klik "+ Tambah Renungan" untuk menulis dan menjadwalkan renungan harian khusus yang tampil otomatis di website.</p>
        </div>`;
    }
    return;
  }

  el.innerHTML = `
    <!-- Desktop Table View -->
    <div class="desktop-table-view">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width:40px">#</th>
            <th style="min-width:160px">Tanggal &amp; Liturgi</th>
            <th style="min-width:200px">Tema &amp; Perikop</th>
            <th style="min-width:220px">Kutipan Ayat Emas</th>
            <th style="min-width:90px">Status</th>
            <th style="min-width:180px">Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${list.map((r, i) => `
            <tr>
              <td style="color:var(--ink-soft);font-size:0.75rem">${i + 1}</td>
              <td>
                <div style="font-weight:700;font-size:0.86rem;color:var(--ink)">${escapeHtml(formatTanggalIndo(r.tanggal))}</div>
                <div style="margin-top:4px">
                  <span class="badge ${getLiturgiBadgeClass(r.liturgi)}" style="font-size:0.7rem">${escapeHtml(r.liturgi || 'Masa Biasa')}</span>
                </div>
              </td>
              <td>
                <div style="font-weight:700;color:var(--ink);font-size:0.9rem">${escapeHtml(r.tema)}</div>
                <div style="font-size:0.78rem;color:var(--gold);font-weight:600;margin-top:2px">${escapeHtml(r.perikop)}</div>
              </td>
              <td>
                <div style="font-size:0.8rem;color:var(--ink-soft);max-width:280px;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${escapeHtml(r.ayat)}</div>
              </td>
              <td>
                <span class="badge ${r.aktif ? 'badge-green' : 'badge-danger'}">
                  ${r.aktif ? '● Aktif' : '○ Nonaktif'}
                </span>
              </td>
              <td>
                <div class="action-cell">
                  <button class="btn btn-ghost btn-sm" onclick="editRenungan('${r.id}')">Edit</button>
                  <button class="btn btn-ghost btn-sm" onclick="toggleAktifRenungan('${r.id}', ${r.aktif})">${r.aktif ? 'Nonaktifkan' : 'Aktifkan'}</button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDelete('renungan', '${r.id}', '${escapeHtml(r.tema)} (${escapeHtml(r.tanggal)})', 'loadRenungan')">Hapus</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards View -->
    <div class="mobile-cards-view">
      ${list.map((r, i) => `
        <div class="admin-data-card">
          <div class="admin-data-card-head">
            <div style="font-weight:700;font-size:0.84rem;color:var(--ink)">${escapeHtml(formatTanggalIndo(r.tanggal))}</div>
            <span class="badge ${getLiturgiBadgeClass(r.liturgi)}">${escapeHtml(r.liturgi || 'Masa Biasa')}</span>
          </div>
          <div class="admin-data-card-body">
            <div class="admin-data-card-title">${escapeHtml(r.tema)}</div>
            <div style="font-size:0.78rem;color:var(--gold);font-weight:700">${escapeHtml(r.perikop)}</div>
            <div class="admin-data-card-sub" style="font-style:italic;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">"${escapeHtml(r.ayat)}"</div>
          </div>
          <div class="admin-data-card-actions">
            <button class="btn btn-ghost btn-sm" onclick="editRenungan('${r.id}')">Edit</button>
            <button class="btn btn-ghost btn-sm" onclick="toggleAktifRenungan('${r.id}', ${r.aktif})">${r.aktif ? 'Nonaktifkan' : 'Aktifkan'}</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete('renungan', '${r.id}', '${escapeHtml(r.tema)} (${escapeHtml(r.tanggal)})', 'loadRenungan')">Hapus</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

function openRenunganModal(data = null) {
  const isEdit = !!data?.id;
  const ridEl = document.getElementById('rid');
  if (ridEl) ridEl.value = data?.id || '';
  
  // Default today's date if new
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const tglEl = document.getElementById('r-tanggal');
  if (tglEl) tglEl.value = data?.tanggal || todayStr;
  const litEl = document.getElementById('r-liturgi');
  if (litEl) litEl.value = data?.liturgi || 'Masa Biasa';
  const temaEl = document.getElementById('r-tema') || document.getElementById('r-judul');
  if (temaEl) temaEl.value = data?.tema || data?.judul || '';
  const perikopEl = document.getElementById('r-perikop') || document.getElementById('r-bacaan');
  if (perikopEl) perikopEl.value = data?.perikop || data?.bacaan || '';
  const ayatEl = document.getElementById('r-ayat');
  if (ayatEl) ayatEl.value = data?.ayat || '';
  const refleksiEl = document.getElementById('r-refleksi') || document.getElementById('r-isi');
  if (refleksiEl) refleksiEl.value = data?.refleksi || data?.isi || '';
  const doaEl = document.getElementById('r-doa');
  if (doaEl) doaEl.value = data?.doa || '';
  const aktifEl = document.getElementById('r-aktif');
  if (aktifEl) aktifEl.checked = data ? (data.aktif !== false) : true;

  const alertEl = document.getElementById('renungan-alert');
  if (alertEl) alertEl.style.display = 'none';

  const titleEl = document.getElementById('modal-renungan-title');
  if (titleEl) titleEl.textContent = isEdit ? 'Edit Renungan Harian' : 'Tambah Renungan Harian';
  const btnTextEl = document.getElementById('btn-renungan-text');
  if (btnTextEl) btnTextEl.textContent = isEdit ? 'Simpan Perubahan' : 'Simpan Renungan';

  openModal('modal-renungan');
  saveInitialFormState('modal-renungan');
  if (temaEl) setTimeout(() => temaEl.focus(), 100);
}

function editRenungan(id) {
  if (_renunganMap[id]) {
    openRenunganModal(_renunganMap[id]);
  }
}

async function submitRenungan(e) {
  e.preventDefault();
  const id      = document.getElementById('rid')?.value || '';
  const alertEl = document.getElementById('renungan-alert');

  const tanggalVal  = document.getElementById('r-tanggal')?.value || '';
  const liturgiVal  = document.getElementById('r-liturgi')?.value || 'Masa Biasa';
  const temaVal     = ((document.getElementById('r-tema') || document.getElementById('r-judul'))?.value || '').trim();
  const perikopVal  = ((document.getElementById('r-perikop') || document.getElementById('r-bacaan'))?.value || '').trim();
  const ayatVal     = (document.getElementById('r-ayat')?.value || '').trim();
  const refleksiVal = ((document.getElementById('r-refleksi') || document.getElementById('r-isi'))?.value || '').trim();
  const doaVal      = (document.getElementById('r-doa')?.value || '').trim();
  const aktifVal    = document.getElementById('r-aktif') ? document.getElementById('r-aktif').checked : true;

  if (!tanggalVal || !temaVal || !perikopVal || !ayatVal || !refleksiVal) {
    if (alertEl) {
      alertEl.textContent = 'Semua kolom bertanda bintang (*) wajib diisi.';
      alertEl.style.display = 'flex';
    }
    toast('Mohon lengkapi semua data renungan', 'error');
    return;
  }

  // Confirmation before saving
  const confirmed = await showConfirmModal({
    title: id ? 'Konfirmasi Edit Renungan' : 'Konfirmasi Simpan Renungan',
    heading: id ? 'Simpan perubahan renungan ini?' : 'Terbitkan renungan harian baru?',
    message: `Renungan akan ditayangkan pada tanggal ${formatTanggalIndo(tanggalVal)}.`,
    detailsHtml: `
      <strong>Tema:</strong> ${escapeHtml(temaVal)}<br>
      <strong>Perikop:</strong> ${escapeHtml(perikopVal)}<br>
      <strong>Masa Liturgi:</strong> ${escapeHtml(liturgiVal)}<br>
      <strong>Status:</strong> ${aktifVal ? 'Aktif (Akan tampil)' : 'Nonaktif'}
    `,
    confirmText: id ? 'Ya, Simpan Perubahan' : 'Ya, Terbitkan Renungan',
    cancelText: 'Batal',
    type: 'save',
    modalId: 'modal-renungan'
  });

  if (!confirmed) return;

  const btn = document.getElementById('btn-submit-renungan');
  btn.disabled = true;
  document.getElementById('btn-renungan-text').textContent = 'Menyimpan…';

  try {
    const payload = {
      tanggal:    tanggalVal,
      liturgi:    liturgiVal,
      tema:       temaVal,
      perikop:    perikopVal,
      ayat:       ayatVal,
      refleksi:   refleksiVal,
      doa:        doaVal || null,
      aktif:      aktifVal,
      updated_at: new Date().toISOString()
    };

    let error;
    if (id) {
      ({ error } = await db.from('renungan').update(payload).eq('id', id));
    } else {
      payload.created_at = new Date().toISOString();
      ({ error } = await db.from('renungan').insert([payload]));
    }

    if (error) {
      if (error.code === '23505' || error.message?.includes('duplicate key') || error.message?.includes('unique constraint')) {
        throw new Error(`Sudah ada renungan untuk tanggal ${formatTanggalIndo(tanggalVal)}. Pilih tanggal lain atau edit data yang sudah ada.`);
      }
      throw error;
    }

    closeModal('modal-renungan');
    toast(id ? 'Renungan harian berhasil diperbarui.' : 'Renungan harian baru berhasil disimpan.');
    loadRenungan();
    loadCounters();
  } catch (err) {
    const errMsg = formatDbError(err, 'Gagal menyimpan renungan harian');
    alertEl.textContent = errMsg;
    alertEl.style.display = 'flex';
    toast(errMsg, 'error');
    console.error('Submit renungan error:', err);
  } finally {
    btn.disabled = false;
    document.getElementById('btn-renungan-text').textContent = id ? 'Simpan Perubahan' : 'Simpan Renungan';
  }
}

// ── Generic Status Toggle Function (Consolidated DRY Handler) ──
async function toggleEntityStatus(table, id, field, currentStatus, reloadFn, entityLabel = '') {
  try {
    const payload = { [field]: !currentStatus };
    if (table === 'renungan') payload.updated_at = new Date().toISOString();
    const { error } = await db.from(table).update(payload).eq('id', id);
    if (error) throw error;

    let msg = '';
    if (table === 'pesan') {
      msg = currentStatus ? 'Ditandai belum dibaca' : 'Ditandai sudah dibaca';
    } else {
      msg = !currentStatus
        ? `${entityLabel || 'Item'} diaktifkan dan tampil di website.`
        : `${entityLabel || 'Item'} dinonaktifkan sementara.`;
    }
    toast(msg);
    if (typeof reloadFn === 'function') reloadFn();
    loadCounters();
  } catch (err) {
    toast(formatDbError(err, `Gagal mengubah status ${entityLabel || 'data'}`), 'error');
  }
}

const toggleAktifRenungan = (id, current) => toggleEntityStatus('renungan', id, 'aktif', current, loadRenungan, 'Renungan');

// ══════════════════════════════════════════
//  PENGUMUMAN (CRUD + Confirmation + Error Handling)
// ══════════════════════════════════════════
let _allPengumumanList = [];

async function loadPengumuman() {
  const el = document.getElementById('pengumuman-content');
  el.innerHTML = '<div class="empty-state"><p>Memuat data pengumuman…</p></div>';

  try {
    const { data, error } = await db.from('pengumuman').select('*').order('tanggal', { ascending: false });
    if (error) throw error;

    _allPengumumanList = data || [];
    _pengMap = {};
    _allPengumumanList.forEach(r => { _pengMap[r.id] = r; });

    filterPengumumanList();
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>Gagal memuat: ${escapeHtml(err.message)}</p></div>`;
  }
}

function filterPengumumanList() {
  const search = (document.getElementById('filter-search-pengumuman')?.value || '').toLowerCase().trim();
  const kat = document.getElementById('filter-kategori-pengumuman')?.value || '';
  const status = document.getElementById('filter-status-pengumuman')?.value || '';

  let filtered = _allPengumumanList;
  if (kat) {
    filtered = filtered.filter(r => r.kategori === kat);
  }
  if (status) {
    if (status === 'aktif') filtered = filtered.filter(r => r.aktif);
    else if (status === 'nonaktif') filtered = filtered.filter(r => !r.aktif);
  }
  if (search) {
    filtered = filtered.filter(r => {
      const j = (r.judul || '').toLowerCase();
      const isi = (r.isi || '').toLowerCase();
      return j.includes(search) || isi.includes(search);
    });
  }

  renderPengumumanView(filtered, !!(search || kat || status));
}

function resetPengumumanFilter() {
  const s = document.getElementById('filter-search-pengumuman');
  const k = document.getElementById('filter-kategori-pengumuman');
  const st = document.getElementById('filter-status-pengumuman');
  if (s) s.value = '';
  if (k) k.value = '';
  if (st) st.value = '';
  filterPengumumanList();
}

function renderPengumumanView(data, isFiltered = false) {
  const el = document.getElementById('pengumuman-content');
  if (!el) return;

  if (!data?.length) {
    if (isFiltered) {
      el.innerHTML = `<div class="empty-state"><p>Tidak ada pengumuman yang cocok dengan kata kunci / filter.</p></div>`;
    } else {
      el.innerHTML = `<div class="empty-state"><p>Belum ada pengumuman.<br>Klik "+ Tambah Pengumuman" untuk menambahkan.</p></div>`;
    }
    return;
  }

  el.innerHTML = `
    <!-- Desktop Table View -->
    <div class="desktop-table-view">
      <table class="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Tanggal</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${data.map((r, i) => `
            <tr>
              <td style="color:var(--ink-soft);font-size:0.75rem">${i + 1}</td>
              <td>
                <div style="font-weight:700;color:var(--ink)">${escapeHtml(r.judul)}</div>
                <div style="font-size:0.75rem;color:var(--ink-soft);max-width:300px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(r.isi)}</div>
              </td>
              <td>
                <span class="badge ${r.kategori === 'liturgi' ? 'badge-gold' : r.kategori === 'kegiatan' ? 'badge-info' : 'badge-green'}">${escapeHtml(r.kategori)}</span>
              </td>
              <td style="font-size:0.8rem;color:var(--ink-soft);white-space:nowrap">${escapeHtml(r.tanggal || '—')}</td>
              <td>
                <span class="badge ${r.aktif ? 'badge-green' : 'badge-danger'}">
                  ${r.aktif ? '● Aktif' : '○ Nonaktif'}
                </span>
              </td>
              <td>
                <div class="action-cell">
                  <button class="btn btn-ghost btn-sm" onclick="editPengumuman('${r.id}')">Edit</button>
                  <button class="btn btn-ghost btn-sm" onclick="toggleAktif('${r.id}', ${r.aktif})">${r.aktif ? 'Nonaktifkan' : 'Aktifkan'}</button>
                  <button class="btn btn-danger btn-sm" onclick="confirmDelete('pengumuman', '${r.id}', '${escapeHtml(r.judul)}', 'loadPengumuman')">Hapus</button>
                </div>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards View -->
    <div class="mobile-cards-view">
      ${data.map((r, i) => `
        <div class="admin-data-card">
          <div class="admin-data-card-head">
            <span class="badge ${r.kategori === 'liturgi' ? 'badge-gold' : r.kategori === 'kegiatan' ? 'badge-info' : 'badge-green'}">${escapeHtml(r.kategori)}</span>
            <span class="badge ${r.aktif ? 'badge-green' : 'badge-danger'}">
              ${r.aktif ? '● Aktif' : '○ Nonaktif'}
            </span>
          </div>
          <div class="admin-data-card-body">
            <div class="admin-data-card-title">${escapeHtml(r.judul)}</div>
            <div style="font-size:0.75rem;color:var(--ink-soft)">${escapeHtml(r.tanggal || '—')}</div>
            <div class="admin-data-card-sub" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${escapeHtml(r.isi)}</div>
          </div>
          <div class="admin-data-card-actions">
            <button class="btn btn-ghost btn-sm" onclick="editPengumuman('${r.id}')">Edit</button>
            <button class="btn btn-ghost btn-sm" onclick="toggleAktif('${r.id}', ${r.aktif})">${r.aktif ? 'Nonaktifkan' : 'Aktifkan'}</button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete('pengumuman', '${r.id}', '${escapeHtml(r.judul)}', 'loadPengumuman')">Hapus</button>
          </div>
        </div>
      `).join('')}
    </div>

    <div style="padding:0.75rem 1rem;font-size:0.72rem;color:var(--ink-soft);border-top:1px solid var(--border);background:var(--bg-alt)">
      Menampilkan ${data.length} dari ${_allPengumumanList.length} pengumuman
    </div>
  `;
}

function openPengumumanModal(data = null) {
  const pidEl = document.getElementById('pid');
  if (pidEl) pidEl.value = data?.id || '';
  const pJudulEl = document.getElementById('p-judul');
  if (pJudulEl) pJudulEl.value = data?.judul || '';
  const pIsiEl = document.getElementById('p-isi');
  if (pIsiEl) pIsiEl.value = data?.isi || '';
  const pKatEl = document.getElementById('p-kategori');
  if (pKatEl) pKatEl.value = data?.kategori || 'umum';
  const pTglEl = document.getElementById('p-tanggal');
  if (pTglEl) pTglEl.value = data?.tanggal || new Date().toISOString().split('T')[0];
  const pAktifEl = document.getElementById('p-aktif');
  if (pAktifEl) pAktifEl.checked = data ? data.aktif : true;

  const alertEl = document.getElementById('pengumuman-alert') || document.getElementById('peng-alert');
  if (alertEl) alertEl.style.display = 'none';

  const isEdit = !!data?.id;
  const titleEl = document.getElementById('modal-pengumuman-title') || document.getElementById('modal-peng-title');
  if (titleEl) titleEl.textContent = isEdit ? 'Edit Pengumuman' : 'Tambah Pengumuman';
  const btnTextEl = document.getElementById('btn-peng-text');
  if (btnTextEl) btnTextEl.textContent = isEdit ? 'Simpan Perubahan' : 'Simpan Pengumuman';

  openModal('modal-pengumuman');
  saveInitialFormState('modal-pengumuman');
  if (pJudulEl) setTimeout(() => pJudulEl.focus(), 100);
}

function editPengumuman(id) { openPengumumanModal(_pengMap[id]); }

async function submitPengumuman(e) {
  e.preventDefault();
  const id      = document.getElementById('pid')?.value || '';
  const alertEl = document.getElementById('pengumuman-alert') || document.getElementById('peng-alert');

  const judulVal = (document.getElementById('p-judul')?.value || '').trim();
  const isiVal   = (document.getElementById('p-isi')?.value || '').trim();
  const katVal   = document.getElementById('p-kategori')?.value || 'umum';
  const tglVal   = document.getElementById('p-tanggal')?.value || '';
  const aktifVal = document.getElementById('p-aktif') ? document.getElementById('p-aktif').checked : true;

  if (!judulVal || !isiVal) {
    if (alertEl) {
      alertEl.textContent = 'Judul dan isi pengumuman tidak boleh kosong.';
      alertEl.style.display = 'flex';
    }
    toast('Judul dan isi wajib diisi', 'error');
    return;
  }

  // Confirmation handling
  const confirmed = await showConfirmModal({
    title: id ? 'Konfirmasi Simpan Pengumuman' : 'Konfirmasi Tambah Pengumuman',
    heading: id ? 'Simpan Perubahan Pengumuman?' : 'Terbitkan Pengumuman Baru?',
    message: id 
      ? 'Perubahan pengumuman akan langsung diperbarui di website.' 
      : 'Pengumuman baru akan langsung tersimpan dan aktif.',
    detailsHtml: `<strong>Judul:</strong> ${escapeHtml(judulVal)}<br><strong>Kategori:</strong> ${escapeHtml(katVal)} | <strong>Status:</strong> ${aktifVal ? 'Aktif (Tayang)' : 'Draft (Nonaktif)'}`,
    confirmText: id ? 'Ya, Simpan Perubahan' : 'Ya, Terbitkan',
    cancelText: 'Periksa Kembali',
    type: 'save',
    modalId: 'modal-pengumuman'
  });

  if (!confirmed) return;

  const btn = document.getElementById('btn-submit-peng');
  alertEl.style.display = 'none';
  btn.disabled = true;
  document.getElementById('btn-peng-text').textContent = 'Menyimpan…';

  try {
    const payload = {
      judul:    judulVal,
      isi:      isiVal,
      kategori: katVal,
      tanggal:  tglVal,
      aktif:    aktifVal
    };

    let error;
    if (id) {
      ({ error } = await db.from('pengumuman').update(payload).eq('id', id));
    } else {
      payload.created_at = new Date().toISOString();
      ({ error } = await db.from('pengumuman').insert(payload));
    }

    if (error) throw error;

    closeModal('modal-pengumuman');
    toast(id ? 'Pengumuman berhasil diperbarui.' : 'Pengumuman baru berhasil ditambahkan.');
    loadPengumuman();
    loadCounters();
  } catch (err) {
    const errMsg = formatDbError(err, 'Gagal menyimpan pengumuman');
    alertEl.textContent = errMsg;
    alertEl.style.display = 'flex';
    toast(errMsg, 'error');
    console.error('Submit pengumuman error:', err);
  } finally {
    btn.disabled = false;
    document.getElementById('btn-peng-text').textContent = id ? 'Simpan Perubahan' : 'Simpan Pengumuman';
  }
}

const toggleAktif = (id, current) => toggleEntityStatus('pengumuman', id, 'aktif', current, loadPengumuman, 'Pengumuman');

// ── Image URL Helper for Admin Subdirectory ───────────────
function resolveAdminImgUrl(url) {
  if (!url) return '';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:') || trimmed.startsWith('blob:') || trimmed.startsWith('/')) {
    return trimmed;
  }
  if (trimmed.startsWith('assets/')) {
    return '../' + trimmed;
  }
  return trimmed;
}

// ══════════════════════════════════════════
//  GALERI KEGIATAN (CRUD + Confirmation + Error Handling)
// ══════════════════════════════════════════
async function loadGaleri() {
  const el = document.getElementById('galeri-content');
  if (!el) return;
  el.innerHTML = '<div class="empty-state"><p>Memuat data galeri…</p></div>';

  try {
    const { data, error } = await db.from('galeri').select('*').order('urutan').order('created_at', { ascending: false });

    let allItems = [];
    _galeriMap = {};

    if (!error && data && data.length > 0) {
      allItems = data;
    } else {
      allItems = DEFAULT_GALERI_FALLBACK;
    }

    allItems.forEach(r => { _galeriMap[r.id] = r; });
    renderGaleriView(allItems);
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>Gagal memuat: ${escapeHtml(err.message)}</p></div>`;
  }
}

function renderGaleriView(list, isFiltered = false) {
  const el = document.getElementById('galeri-content');
  if (!el) return;

  if (!list || list.length === 0) {
    el.innerHTML = `<div class="empty-state"><p>${isFiltered ? 'Tidak ada foto galeri pada kategori yang dipilih.' : 'Belum ada foto galeri.'}</p></div>`;
    return;
  }

  el.innerHTML = `
    <div class="galeri-admin-grid">
      ${list.map(r => {
        const resolvedImg = resolveAdminImgUrl(r.foto_url);
        return `
          <div class="galeri-admin-card">
            <div class="galeri-admin-thumb">
              <img src="${escapeHtml(resolvedImg)}" alt="${escapeHtml(r.judul)}" onerror="this.onerror=null;this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--ink-soft);font-size:0.75rem\\'>Foto tidak ditemukan</div>';">
              <span class="badge badge-gold galeri-badge">${escapeHtml(r.kategori)}</span>
            </div>
            <div class="galeri-admin-body">
              <h4 class="galeri-admin-title">${escapeHtml(r.judul)}</h4>
              <div class="galeri-admin-meta">
                <span>${escapeHtml(r.tanggal || '—')}</span>
                ${r.keterangan ? `<span>${escapeHtml(r.keterangan)}</span>` : ''}
              </div>
              <div class="galeri-admin-actions">
                <button class="btn btn-ghost btn-sm" style="flex:1;justify-content:center" onclick="editGaleri('${r.id}')">
                  Edit
                </button>
                <button class="btn btn-danger btn-sm" style="flex:1;justify-content:center" onclick="confirmDelete('galeri', '${r.id}', '${escapeHtml(r.judul)}', 'loadGaleri')">
                  Hapus
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function filterGaleriList() {
  const kat = document.getElementById('filter-kategori-galeri')?.value || '';
  if (!kat) {
    renderGaleriView(Object.values(_galeriMap || {}));
    return;
  }
  const filtered = Object.values(_galeriMap || {}).filter(r => r.kategori === kat);
  renderGaleriView(filtered, true);
}

function resetGaleriFilter() {
  const katEl = document.getElementById('filter-kategori-galeri');
  if (katEl) katEl.value = '';
  renderGaleriView(Object.values(_galeriMap || {}));
}

function openGaleriModal(data = null) {
  const gidEl = document.getElementById('gid');
  if (gidEl) gidEl.value = data?.id || '';
  const gJudulEl = document.getElementById('g-judul');
  if (gJudulEl) gJudulEl.value = data?.judul || '';
  const gKatEl = document.getElementById('g-kategori');
  if (gKatEl) gKatEl.value = data?.kategori || 'omk';
  const gTglEl = document.getElementById('g-tanggal');
  if (gTglEl) gTglEl.value = data?.tanggal || new Date().toISOString().split('T')[0];
  const gFotoEl = document.getElementById('g-foto');
  if (gFotoEl) gFotoEl.value = data?.foto_url || '';
  const gFotoManEl = document.getElementById('g-foto-manual');
  if (gFotoManEl) gFotoManEl.value = data?.foto_url || '';
  const gKetEl = document.getElementById('g-keterangan');
  if (gKetEl) gKetEl.value = data?.keterangan || '';
  const gUrutanEl = document.getElementById('g-urutan');
  if (gUrutanEl) gUrutanEl.value = data?.urutan ?? 0;
  
  const alertEl = document.getElementById('galeri-alert');
  if (alertEl) alertEl.style.display = 'none';

  setDropzonePreview('g', data?.foto_url || '');

  const isEdit = !!(data?.id && !String(data.id).startsWith('default-'));
  const titleEl = document.getElementById('modal-galeri-title');
  if (titleEl) titleEl.textContent = isEdit ? 'Edit Foto Kegiatan' : 'Tambah Foto Kegiatan';
  const btnTextEl = document.getElementById('btn-galeri-text');
  if (btnTextEl) btnTextEl.textContent = isEdit ? 'Simpan Perubahan' : 'Simpan Foto Kegiatan';

  openModal('modal-galeri');
  saveInitialFormState('modal-galeri');
  const gJudulFocus = document.getElementById('g-judul');
  if (gJudulFocus) setTimeout(() => gJudulFocus.focus(), 100);
}

function editGaleri(id) { openGaleriModal(_galeriMap[id]); }

async function submitGaleri(e) {
  e.preventDefault();
  const id      = document.getElementById('gid')?.value || '';
  const alertEl = document.getElementById('galeri-alert');

  const fotoUrl = (document.getElementById('g-foto')?.value || '').trim();
  const judul   = (document.getElementById('g-judul')?.value || '').trim();
  const kat     = document.getElementById('g-kategori')?.value || 'omk';
  const tgl     = document.getElementById('g-tanggal')?.value || null;
  const ket     = (document.getElementById('g-keterangan')?.value || '').trim();
  const urutan  = parseInt(document.getElementById('g-urutan')?.value) || 0;

  if (!judul) {
    alertEl.textContent = 'Judul kegiatan tidak boleh kosong.';
    alertEl.style.display = 'flex';
    toast('Judul kegiatan wajib diisi', 'error');
    return;
  }
  if (!fotoUrl) {
    alertEl.textContent = 'Silakan pilih/tarik foto kegiatan ke dalam kotak unggah terlebih dahulu.';
    alertEl.style.display = 'flex';
    toast('Foto kegiatan belum dipilih', 'error');
    return;
  }

  // Confirmation handling
  const confirmed = await showConfirmModal({
    title: id ? 'Konfirmasi Simpan Foto Galeri' : 'Konfirmasi Tambah Foto Galeri',
    heading: id ? 'Simpan Perubahan Foto Kegiatan?' : 'Tambahkan Foto ke Galeri Kegiatan?',
    message: id 
      ? 'Perubahan judul, kategori, dan foto kegiatan akan diperbarui di galeri paroki.' 
      : 'Foto dokumentasi kegiatan baru akan langsung tampil di galeri paroki.',
    detailsHtml: `<strong>Judul:</strong> ${escapeHtml(judul)}<br><strong>Kategori:</strong> ${escapeHtml(kat)}`,
    confirmText: id ? 'Ya, Simpan Perubahan' : 'Ya, Tambahkan ke Galeri',
    cancelText: 'Periksa Kembali',
    type: 'save',
    modalId: 'modal-galeri'
  });

  if (!confirmed) return;

  const btn = document.getElementById('btn-submit-galeri');
  alertEl.style.display = 'none';
  btn.disabled = true;
  document.getElementById('btn-galeri-text').textContent = 'Menyimpan…';

  try {
    const payload = {
      judul:      judul,
      kategori:   kat,
      tanggal:    tgl,
      foto_url:   fotoUrl,
      keterangan: ket,
      urutan:     urutan,
      updated_at: new Date().toISOString()
    };

    let error;
    if (id) {
      ({ error } = await db.from('galeri').update(payload).eq('id', id));
    } else {
      payload.created_at = new Date().toISOString();
      ({ error } = await db.from('galeri').insert(payload));
    }

    if (error) throw error;

    closeModal('modal-galeri');
    toast(id ? 'Foto kegiatan berhasil diperbarui.' : 'Foto kegiatan baru berhasil ditambahkan.');
    loadGaleri();
    loadCounters();
  } catch (err) {
    const errMsg = formatDbError(err, 'Gagal menyimpan foto kegiatan');
    alertEl.textContent = errMsg;
    alertEl.style.display = 'flex';
    toast(errMsg, 'error');
  } finally {
    btn.disabled = false;
    document.getElementById('btn-galeri-text').textContent = id ? 'Simpan Perubahan' : 'Simpan Foto Kegiatan';
  }
}

// ══════════════════════════════════════════
//  DATA & FOTO STASI (CRUD + Drag & Drop + Confirmation + Error Handling)
// ══════════════════════════════════════════
async function loadStasiAdmin() {
  const el = document.getElementById('stasi-content');
  el.innerHTML = '<div class="empty-state"><p>Memuat data stasi…</p></div>';

  _stasiMap = JSON.parse(JSON.stringify(DEFAULT_STASI_DATA));

  try {
    const { data, error } = await db.from('stasi').select('*');
    if (!error && data && data.length > 0) {
      data.forEach(s => {
        if (_stasiMap[s.id]) {
          Object.assign(_stasiMap[s.id], s);
        } else {
          _stasiMap[s.id] = s;
        }
      });
    }
  } catch (err) {
    console.warn('Stasi table fetch note:', err);
  }

  const stasiList = Object.values(_stasiMap);

  el.innerHTML = `
    <div class="stasi-admin-grid">
      ${stasiList.map(s => {
        const hasImg = !!s.foto_url;
        return `
          <div class="stasi-admin-card">
            <div class="stasi-admin-cover">
              ${hasImg ? `
                <img src="${escapeHtml(resolveAdminImgUrl(s.foto_url))}" alt="${escapeHtml(s.nama)}" onerror="this.onerror=null;this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;width:100%;height:100%;color:var(--ink-soft);font-size:0.75rem\\'>Foto belum tersedia</div>';">
              ` : `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--gold);text-align:center;padding:1rem">
                  <span style="font-size:1.5rem;font-weight:700">✝</span>
                  <span style="font-size:0.75rem;font-weight:700;color:var(--ink);margin-top:4px">Tahap Pembangunan</span>
                </div>
              `}
            </div>
            <div class="stasi-admin-body">
              <div style="font-size:0.68rem;font-weight:800;text-transform:uppercase;letter-spacing:0.05em;color:var(--gold);margin-bottom:0.25rem">
                Pelindung: ${escapeHtml(s.pelindung)}
              </div>
              <h3 style="font-size:1rem;font-weight:800;color:var(--ink);margin-bottom:0.4rem">
                ${escapeHtml(s.nama)}
              </h3>
              <p style="font-size:0.75rem;color:var(--ink-soft);line-height:1.4;margin-bottom:1rem;flex:1">
                ${escapeHtml(s.alamat)}
              </p>
              <button class="btn btn-primary btn-sm" style="width:100%;justify-content:center" onclick="openStasiModal('${s.id}')">
                Edit Foto &amp; Data
              </button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function openStasiModal(key) {
  const item = _stasiMap[key] || DEFAULT_STASI_DATA[key];
  if (!item) return;

  const sIdEl = document.getElementById('s-id');
  if (sIdEl) sIdEl.value = key;
  const sNamaEl = document.getElementById('s-nama');
  if (sNamaEl) sNamaEl.value = item.nama || '';
  const sPelEl = document.getElementById('s-pelindung');
  if (sPelEl) sPelEl.value = item.pelindung || '';
  const sPestaEl = document.getElementById('s-pesta');
  if (sPestaEl) sPestaEl.value = item.pesta_nama || '';
  const sRoleEl = document.getElementById('s-role');
  if (sRoleEl) sRoleEl.value = item.role || '';
  const sFotoEl = document.getElementById('s-foto');
  if (sFotoEl) sFotoEl.value = item.foto_url || '';
  const sFotoManEl = document.getElementById('s-foto-manual');
  if (sFotoManEl) sFotoManEl.value = item.foto_url || '';
  const sAlamatEl = document.getElementById('s-alamat');
  if (sAlamatEl) sAlamatEl.value = item.alamat || '';
  const sSejarahEl = document.getElementById('s-sejarah');
  if (sSejarahEl) sSejarahEl.value = item.sejarah || '';
  const sChairmenEl = document.getElementById('s-chairmen');
  if (sChairmenEl) sChairmenEl.value = Array.isArray(item.daftar_ketua) ? item.daftar_ketua.join('\n') : '';
  const sMapsEl = document.getElementById('s-maps');
  if (sMapsEl) sMapsEl.value = item.gmaps_url || '';

  const alertEl = document.getElementById('stasi-alert');
  if (alertEl) alertEl.style.display = 'none';

  setDropzonePreview('s', item.foto_url || '');

  const titleEl = document.getElementById('modal-stasi-title');
  if (titleEl) titleEl.textContent = 'Edit Data: ' + (item.nama || 'Stasi');
  openModal('modal-stasi');
  saveInitialFormState('modal-stasi');
  if (sPelEl) setTimeout(() => sPelEl.focus(), 100);
}

async function submitStasiAdmin(e) {
  e.preventDefault();
  const id      = document.getElementById('s-id')?.value || '';
  const alertEl = document.getElementById('stasi-alert');

  const nama       = (document.getElementById('s-nama')?.value || '').trim();
  const pelindung  = (document.getElementById('s-pelindung')?.value || '').trim();
  const pesta_nama = (document.getElementById('s-pesta')?.value || '').trim();
  const role       = (document.getElementById('s-role')?.value || '').trim();
  const foto_url   = (document.getElementById('s-foto')?.value || '').trim();
  const alamat     = (document.getElementById('s-alamat')?.value || '').trim();
  const sejarah    = (document.getElementById('s-sejarah')?.value || '').trim();
  const daftarKetua = (document.getElementById('s-chairmen')?.value || '')
    .split(/\r?\n/)
    .map(item => item.trim())
    .filter(Boolean);
  const gmaps_url  = (document.getElementById('s-maps')?.value || '').trim();

  if (!pelindung || !alamat) {
    if (alertEl) {
      alertEl.textContent = 'Nama pelindung dan alamat stasi wajib diisi.';
      alertEl.style.display = 'flex';
    }
    toast('Nama pelindung & alamat wajib diisi', 'error');
    return;
  }

  // Confirmation handling
  const confirmed = await showConfirmModal({
    title: 'Konfirmasi Simpan Data Stasi',
    heading: `Simpan Perubahan Stasi ${escapeHtml(nama)}?`,
    message: 'Data pelindung, alamat, sejarah, daftar ketua, tautan maps, dan foto bangunan stasi akan diperbarui di seluruh website paroki.',
    detailsHtml: `<strong>Stasi:</strong> ${escapeHtml(nama)}<br><strong>Pelindung:</strong> ${escapeHtml(pelindung)}<br><strong>Alamat:</strong> ${escapeHtml(alamat)}`,
    confirmText: 'Ya, Simpan Perubahan',
    cancelText: 'Periksa Kembali',
    type: 'save',
    modalId: 'modal-stasi'
  });

  if (!confirmed) return;

  const btn = document.getElementById('btn-submit-stasi');
  alertEl.style.display = 'none';
  btn.disabled = true;
  document.getElementById('btn-stasi-text').textContent = 'Menyimpan…';

  try {
    const payload = {
      id:         id,
      nama:       document.getElementById('s-nama').value.trim(),
      pelindung:  document.getElementById('s-pelindung').value.trim(),
      pesta_nama: document.getElementById('s-pesta').value.trim(),
      role:       document.getElementById('s-role').value.trim(),
      sejarah:    sejarah,
      daftar_ketua: daftarKetua,
      foto_url:   document.getElementById('s-foto').value.trim(),
      alamat:     document.getElementById('s-alamat').value.trim(),
      gmaps_url:  document.getElementById('s-maps').value.trim(),
      updated_at: new Date().toISOString()
    };

    if (!payload.pelindung || !payload.alamat) {
      throw new Error('Nama pelindung dan alamat stasi wajib diisi.');
    }

    const { error } = await db.from('stasi').upsert(payload);
    if (error) throw error;

    // Update in-memory & cache
    if (_stasiMap[id]) Object.assign(_stasiMap[id], payload);
    try {
      localStorage.setItem('saint_andrew_stasi_cache', JSON.stringify(_stasiMap));
    } catch (e) {}

    closeModal('modal-stasi');
    toast('Data & foto stasi berhasil diperbarui.');
    loadStasiAdmin();
  } catch (err) {
    const errMsg = formatDbError(err, 'Gagal menyimpan data stasi');
    alertEl.textContent = errMsg;
    alertEl.style.display = 'flex';
    toast(errMsg, 'error');
    console.error('Submit stasi error:', err);
  } finally {
    btn.disabled = false;
    document.getElementById('btn-stasi-text').textContent = 'Simpan Perubahan Stasi';
  }
}

// ══════════════════════════════════════════
//  HAPUS (Konfirmasi Universal + Error Handling)
// ══════════════════════════════════════════
async function confirmDelete(table, id, desc, cb) {
  _deleteTable = table;
  _deleteId    = id;
  _deleteCb    = cb;

  const confirmed = await showConfirmModal({
    title: 'Konfirmasi Hapus Data',
    heading: 'Hapus data ini secara permanen?',
    message: 'Data yang dihapus tidak dapat dipulihkan kembali dari database.',
    detailsHtml: `<strong>Target Data:</strong> ${escapeHtml(desc)}`,
    confirmText: 'Hapus Sekarang',
    cancelText: 'Batal',
    type: 'delete',
    danger: true
  });

  if (!confirmed) return;
  await execDelete();
}

async function execDelete() {
  try {
    let error = null;
    if (!String(_deleteId).startsWith('default-')) {
      const res = await db.from(_deleteTable).delete().eq('id', _deleteId);
      error = res.error;
    }

    if (error) throw error;

    toast('Data berhasil dihapus dari database.');
    if (_deleteCb === 'loadJadwal')     loadJadwal();
    if (_deleteCb === 'loadRenungan')   loadRenungan();
    if (_deleteCb === 'loadPengumuman') loadPengumuman();
    if (_deleteCb === 'loadGaleri')     loadGaleri();
    if (_deleteCb === 'loadPesan')      loadPesan();
    loadCounters();
  } catch (err) {
    const errMsg = formatDbError(err, 'Gagal menghapus data');
    toast(errMsg, 'error');
    console.error('Delete error:', err);
  }
}

// ══════════════════════════════════════════
//  PESAN MASUK (INBOX)
// ══════════════════════════════════════════
let _pesanList = [];

async function loadPesan() {
  const container = document.getElementById('pesan-content');
  if (!container) return;
  container.innerHTML = '<div class="empty-state"><p>Memuat daftar pesan masuk…</p></div>';

  try {
    const { data, error } = await db.from('pesan').select('*').order('created_at', { ascending: false });
    if (error) throw error;

    _pesanList = data || [];
    renderPesanView(_pesanList);
  } catch (err) {
    console.error('Load pesan error:', err);
    container.innerHTML = `
      <div class="empty-state">
        <p style="color:var(--danger)">Gagal memuat pesan masuk: ${escapeHtml(err.message || 'Tabel belum tersedia')}</p>
        <p style="font-size:0.8rem;color:var(--muted);margin-top:8px">Pastikan tabel <code>pesan</code> telah dibuat di Supabase SQL Editor.</p>
        <button class="btn btn-ghost btn-sm" style="margin-top:12px" onclick="loadPesan()">Coba Lagi</button>
      </div>`;
  }
}

function renderPesanView(list, isFiltered = false) {
  const container = document.getElementById('pesan-content');
  if (!container) return;

  if (!list || !list.length) {
    container.innerHTML = `
      <div class="empty-state">
        <p style="font-weight:600;font-size:1rem;color:var(--ink);margin-bottom:6px">${isFiltered ? 'Tidak ada pesan yang cocok' : 'Belum Ada Pesan Masuk'}</p>
        <p style="color:var(--ink-soft);font-size:0.85rem">${isFiltered ? 'Coba ganti kata kunci pencarian.' : 'Pesan yang dikirim pengunjung melalui halaman Hubungi Kami akan tampil di sini.'}</p>
      </div>`;
    return;
  }

  let html = `<div style="display:flex;flex-direction:column;gap:14px">`;

  list.forEach(p => {
    const isUnread = !p.dibaca;
    const tgl = p.created_at ? new Date(p.created_at).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    }) : 'Baru saja';

    html += `
      <div class="card" style="padding:18px 20px;border-left:4px solid ${isUnread ? 'var(--gold)' : 'rgba(255,255,255,0.1)'};background:${isUnread ? 'rgba(201,168,76,0.04)' : 'transparent'}">
        <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-weight:700;font-size:1rem;color:var(--ink)">${escapeHtml(p.nama)}</span>
            ${isUnread ? '<span class="badge" style="background:var(--gold);color:#000;font-size:0.65rem;font-weight:700;padding:2px 8px">BARU</span>' : ''}
            <span class="badge badge-info" style="font-size:0.75rem">${escapeHtml(p.subjek || 'Pesan Umum')}</span>
          </div>
          <div style="font-size:0.78rem;color:var(--ink-soft)">${tgl}</div>
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:16px;font-size:0.82rem;color:var(--ink-soft);margin-bottom:12px">
          ${p.email ? `<div>Email: <a href="mailto:${escapeHtml(p.email)}" style="color:var(--gold);text-decoration:underline">${escapeHtml(p.email)}</a></div>` : ''}
          ${p.telepon ? `<div>WhatsApp: <a href="https://wa.me/${escapeHtml(p.telepon.replace(/[^0-9]/g, ''))}" target="_blank" style="color:var(--gold);text-decoration:underline">${escapeHtml(p.telepon)}</a></div>` : ''}
        </div>

        <div style="font-size:0.9rem;line-height:1.6;color:var(--ink);background:var(--bg-alt);padding:12px 16px;border-radius:10px;border:1px solid var(--border);white-space:pre-wrap;margin-bottom:14px">${escapeHtml(p.pesan)}</div>

        <div style="display:flex;justify-content:flex-end;gap:10px">
          <button class="btn btn-ghost btn-sm" onclick="toggleBacaPesan('${p.id}', ${p.dibaca})">
            ${p.dibaca ? 'Tandai Belum Dibaca' : 'Tandai Sudah Dibaca'}
          </button>
          <button class="btn btn-danger btn-sm" onclick="confirmDelete('pesan', '${p.id}', 'Pesan dari ${escapeHtml(p.nama)}', 'loadPesan')">
            Hapus
          </button>
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
}

function filterPesanList() {
  const q = (document.getElementById('filter-search-pesan')?.value || '').toLowerCase().trim();
  const filtered = (_pesanList || []).filter(p => {
    return !q || (p.nama && p.nama.toLowerCase().includes(q)) ||
      (p.email && p.email.toLowerCase().includes(q)) ||
      (p.pesan && p.pesan.toLowerCase().includes(q)) ||
      (p.subjek && p.subjek.toLowerCase().includes(q));
  });
  renderPesanView(filtered, !!q);
}

function resetPesanFilter() {
  const qEl = document.getElementById('filter-search-pesan');
  if (qEl) qEl.value = '';
  renderPesanView(_pesanList || []);
}

const toggleBacaPesan = (id, current) => toggleEntityStatus('pesan', id, 'dibaca', current, loadPesan, 'Pesan');

// ── Inisialisasi Dropzones saat dokumen siap ─────────────────
document.addEventListener('DOMContentLoaded', () => {
  initDropzones();

  // Auto-close sidebar on mobile when any nav-btn is clicked
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.innerWidth <= 768) closeSidebar();
    });
  });
});
initDropzones();

// ── Mobile Sidebar Toggle ────────────────────────────────────
function toggleSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('open');
  if (isOpen) {
    closeSidebar();
  } else {
    sidebar.classList.add('open');
    backdrop?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeSidebar() {
  const sidebar  = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  sidebar?.classList.remove('open');
  backdrop?.classList.remove('open');
  if (!document.querySelector('.modal-overlay.open')) {
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
  }
}

// Expose all dashboard functions safely to window
const safeExports = {
  handleCustomSelectChange: typeof handleCustomSelectChange === 'function' ? handleCustomSelectChange : undefined,
  syncSelectWithCustomInput: typeof syncSelectWithCustomInput === 'function' ? syncSelectWithCustomInput : undefined,
  getCustomSelectValue: typeof getCustomSelectValue === 'function' ? getCustomSelectValue : undefined,
  handleHariSelectChange: typeof handleHariSelectChange === 'function' ? handleHariSelectChange : undefined,
  handleWaktuSelectChange: typeof handleWaktuSelectChange === 'function' ? handleWaktuSelectChange : undefined,
  handleKeteranganSelectChange: typeof handleKeteranganSelectChange === 'function' ? handleKeteranganSelectChange : undefined,
  handleMingguSelectChange: typeof handleMingguSelectChange === 'function' ? handleMingguSelectChange : undefined,
  showTab: typeof showTab === 'function' ? showTab : undefined,
  loadCounters: typeof loadCounters === 'function' ? loadCounters : undefined,
  loadJadwal: typeof loadJadwal === 'function' ? loadJadwal : undefined,
  loadRenungan: typeof loadRenungan === 'function' ? loadRenungan : undefined,
  loadPengumuman: typeof loadPengumuman === 'function' ? loadPengumuman : undefined,
  loadGaleri: typeof loadGaleri === 'function' ? loadGaleri : undefined,
  loadStasiAdmin: typeof loadStasiAdmin === 'function' ? loadStasiAdmin : undefined,
  loadPesan: typeof loadPesan === 'function' ? loadPesan : undefined,
  filterJadwalList: typeof filterJadwalList === 'function' ? filterJadwalList : undefined,
  resetJadwalFilter: typeof resetJadwalFilter === 'function' ? resetJadwalFilter : undefined,
  filterRenunganList: typeof filterRenunganList === 'function' ? filterRenunganList : undefined,
  resetRenunganFilter: typeof resetRenunganFilter === 'function' ? resetRenunganFilter : undefined,
  filterPengumumanList: typeof filterPengumumanList === 'function' ? filterPengumumanList : undefined,
  resetPengumumanFilter: typeof resetPengumumanFilter === 'function' ? resetPengumumanFilter : undefined,
  filterGaleriList: typeof filterGaleriList === 'function' ? filterGaleriList : undefined,
  resetGaleriFilter: typeof resetGaleriFilter === 'function' ? resetGaleriFilter : undefined,
  filterPesanList: typeof filterPesanList === 'function' ? filterPesanList : undefined,
  resetPesanFilter: typeof resetPesanFilter === 'function' ? resetPesanFilter : undefined,
  openModal: typeof openModal === 'function' ? openModal : undefined,
  closeModal: typeof closeModal === 'function' ? closeModal : undefined,
  safeCloseModal: typeof safeCloseModal === 'function' ? safeCloseModal : undefined,
  showConfirmModal: typeof showConfirmModal === 'function' ? showConfirmModal : undefined,
  resolveConfirmModal: typeof resolveConfirmModal === 'function' ? resolveConfirmModal : undefined,
  toggleSidebar: typeof toggleSidebar === 'function' ? toggleSidebar : undefined,
  closeSidebar: typeof closeSidebar === 'function' ? closeSidebar : undefined,
  doLogout: typeof doLogout === 'function' ? doLogout : undefined,
  toast: typeof toast === 'function' ? toast : undefined,
  submitJadwal: typeof submitJadwal === 'function' ? submitJadwal : undefined,
  submitRenungan: typeof submitRenungan === 'function' ? submitRenungan : undefined,
  submitPengumuman: typeof submitPengumuman === 'function' ? submitPengumuman : undefined,
  submitGaleri: typeof submitGaleri === 'function' ? submitGaleri : undefined,
  submitStasiAdmin: typeof submitStasiAdmin === 'function' ? submitStasiAdmin : undefined,
  editJadwal: typeof editJadwal === 'function' ? editJadwal : undefined,
  editRenungan: typeof editRenungan === 'function' ? editRenungan : undefined,
  editPengumuman: typeof editPengumuman === 'function' ? editPengumuman : undefined,
  editGaleri: typeof editGaleri === 'function' ? editGaleri : undefined,
  openJadwalModal: typeof openJadwalModal === 'function' ? openJadwalModal : undefined,
  openRenunganModal: typeof openRenunganModal === 'function' ? openRenunganModal : undefined,
  openPengumumanModal: typeof openPengumumanModal === 'function' ? openPengumumanModal : undefined,
  openGaleriModal: typeof openGaleriModal === 'function' ? openGaleriModal : undefined,
  openStasiModal: typeof openStasiModal === 'function' ? openStasiModal : undefined,
  toggleAktifJadwal: typeof toggleAktifJadwal === 'function' ? toggleAktifJadwal : undefined,
  toggleAktifRenungan: typeof toggleAktifRenungan === 'function' ? toggleAktifRenungan : undefined,
  toggleAktif: typeof toggleAktif === 'function' ? toggleAktif : undefined,
  toggleAktifGaleri: typeof toggleAktifGaleri === 'function' ? toggleAktifGaleri : undefined,
  deleteJadwal: typeof deleteJadwal === 'function' ? deleteJadwal : undefined,
  deleteRenungan: typeof deleteRenungan === 'function' ? deleteRenungan : undefined,
  deletePengumuman: typeof deletePengumuman === 'function' ? deletePengumuman : undefined,
  deleteGaleri: typeof deleteGaleri === 'function' ? deleteGaleri : undefined,
  confirmDelete: typeof confirmDelete === 'function' ? confirmDelete : undefined,
  executeDelete: typeof executeDelete === 'function' ? executeDelete : undefined,
  toggleDetailPesan: typeof toggleDetailPesan === 'function' ? toggleDetailPesan : undefined,
  balasPesanWA: typeof balasPesanWA === 'function' ? balasPesanWA : undefined,
  balasPesanEmail: typeof balasPesanEmail === 'function' ? balasPesanEmail : undefined,
  hapusPesan: typeof hapusPesan === 'function' ? hapusPesan : undefined,
  triggerFileInput: typeof triggerFileInput === 'function' ? triggerFileInput : undefined,
  handleFileSelect: typeof handleFileSelect === 'function' ? handleFileSelect : undefined,
  removeImage: typeof removeImage === 'function' ? removeImage : undefined,
  toggleUrlInput: typeof toggleUrlInput === 'function' ? toggleUrlInput : undefined,
  applyManualUrl: typeof applyManualUrl === 'function' ? applyManualUrl : undefined
};

Object.entries(safeExports).forEach(([key, val]) => {
  if (typeof val !== 'undefined') {
    window[key] = val;
  }
});

// Web Component: <aesthetic-divider>
if (typeof customElements !== 'undefined' && typeof HTMLElement !== 'undefined' && !customElements.get('aesthetic-divider')) {
  customElements.define('aesthetic-divider', class extends HTMLElement {
    connectedCallback() {
      const isReveal = this.hasAttribute('reveal') ? ' reveal' : '';
      const customStyle = this.getAttribute('style') || '';
      const extraClass = this.getAttribute('class') || '';
      this.innerHTML = `
      <div class="aesthetic-divider${isReveal} ${extraClass}" style="${customStyle}">
        <div class="divider-line"></div>
        <div class="divider-icon">✝</div>
        <div class="divider-line"></div>
      </div>`;
    }
  });
}

// Global helper function for JS-driven templates
if (!window.renderAestheticDivider) {
  window.renderAestheticDivider = function(extraClass = '', customStyle = '') {
    const styleAttr = customStyle ? ` style="${customStyle}"` : '';
    return `<div class="aesthetic-divider ${extraClass}"${styleAttr}><div class="divider-line"></div><div class="divider-icon">✝</div><div class="divider-line"></div></div>`;
  };
}
