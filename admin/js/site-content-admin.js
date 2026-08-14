(function () {
  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function fieldValue(id, fallback = '') {
    const el = document.getElementById(id);
    return el ? el.value : fallback;
  }

  function setFieldValue(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value ?? '';
  }

  function sectionCard(title, subtitle, body) {
    return `
      <section class="site-content-section rounded-2xl border p-5 sm:p-6">
        <div class="mb-5">
          <div class="text-lg font-bold" style="color:var(--ink)">${escapeHtml(title)}</div>
          <div class="text-sm mt-1" style="color:var(--ink-soft)">${escapeHtml(subtitle)}</div>
        </div>
        ${body}
      </section>
    `;
  }

  function inputGroup(id, label, value = '', placeholder = '', type = 'text', maxlength = 200) {
    return `
      <div class="form-group mb-0">
        <label class="form-label" for="${id}">${escapeHtml(label)}</label>
        <input id="${id}" type="${type}" class="form-ctrl" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}" maxlength="${maxlength}" required>
      </div>
    `;
  }

  function textareaGroup(id, label, value = '', placeholder = '', rows = 4, maxlength = 1000) {
    return `
      <div class="form-group mb-0">
        <label class="form-label" for="${id}">${escapeHtml(label)}</label>
        <textarea id="${id}" class="form-ctrl" rows="${rows}" placeholder="${escapeHtml(placeholder)}" maxlength="${maxlength}" required>${escapeHtml(value)}</textarea>
      </div>
    `;
  }

  function statBlock(index, stat = {}) {
    const n = index + 1;
    return `
      <div class="site-content-subcard rounded-xl p-4">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${inputGroup(`sc-home-stat-${n}-value`, `Nilai Statistik ${n}`, stat.value || '', 'Contoh: 9')}
          ${inputGroup(`sc-home-stat-${n}-label`, `Label Statistik ${n}`, stat.label || '', 'Contoh: Stasi')}
        </div>
      </div>
    `;
  }

  function faqBlock(index, item = {}) {
    const n = index + 1;
    return `
      <div class="site-content-subcard rounded-xl p-4">
        <div class="grid grid-cols-1 gap-4">
          ${inputGroup(`sc-contact-faq-q-${n}`, `FAQ ${n} Pertanyaan`, item.question || '', 'Tulis pertanyaan')}
          ${textareaGroup(`sc-contact-faq-a-${n}`, `FAQ ${n} Jawaban`, item.answer || '', 'Tulis jawaban', 4)}
        </div>
      </div>
    `;
  }

  function historyBlock(index, item = {}) {
    const n = index + 1;
    return `
      <div class="site-content-subcard rounded-xl p-4" style="grid-column:1 / -1;">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          ${inputGroup(`sc-profile-history-year-${n}`, `Tahun ${n}`, item.year || '', 'Contoh: 1961')}
          ${inputGroup(`sc-profile-history-title-${n}`, `Judul ${n}`, item.title || '', 'Contoh: Asal Usul Umat')}
          ${textareaGroup(`sc-profile-history-text-${n}`, `Uraian ${n}`, item.text || '', 'Tulis uraian sejarah', 5)}
        </div>
      </div>
    `;
  }

  function formatSiteContentError(err, fallbackMsg) {
    const message = String(err?.message || err || '');
    if (message.includes('relation') && (message.includes('does not exist') || message.includes('not found'))) {
      return 'Tabel website_content belum dibuat di Supabase. Jalankan supabase-schema.sql di SQL Editor.';
    }
    if (message.includes('row-level security') || message.includes('policy') || message.includes('permission denied') || message.includes('JWT')) {
      return 'Akses ditolak: pastikan Anda login sebagai admin dan policy RLS untuk website_content sudah dibuat.';
    }
    if (message.includes('Failed to fetch') || message.includes('network') || message.includes('NetworkError') || message.includes('offline')) {
      return 'Koneksi ke Supabase gagal. Periksa internet atau URL/anon key Supabase.';
    }
    return fallbackMsg ? `${fallbackMsg} (${message || 'unknown error'})` : (message || 'Terjadi kesalahan.');
  }

  function renderSiteContentEditor(content) {
    const container = document.getElementById('site-content-editor');
    if (!container) return;

    const brand = content.brand || {};
    const home = content.home || {};
    const contact = content.contact || {};
    const profile = content.profile || {};
    const footer = content.footer || {};

    container.innerHTML = `
      <div class="site-content-shell space-y-6">
        <div class="site-content-hero rounded-2xl p-5 sm:p-6">
          <div class="site-content-hero-top">
            <div>
              <div class="site-content-kicker">Editor cepat</div>
              <h3 class="site-content-title">Kelola teks yang paling sering diubah tanpa buka HTML</h3>
              <p class="site-content-desc">Atur identitas paroki, beranda, profil, kontak, dan footer dari satu tempat. Perubahan langsung dipakai oleh halaman publik setelah disimpan.</p>
            </div>
          </div>
          <div class="site-content-quicknav">
            <button type="button" class="site-content-jump" onclick="document.getElementById('sc-section-home').scrollIntoView({behavior:'smooth'})">Beranda</button>
            <button type="button" class="site-content-jump" onclick="document.getElementById('sc-section-contact').scrollIntoView({behavior:'smooth'})">Kontak</button>
            <button type="button" class="site-content-jump" onclick="document.getElementById('sc-section-brand').scrollIntoView({behavior:'smooth'})">Identitas</button>
          </div>
        </div>

        ${sectionCard('Identitas & Footer', 'Teks identitas yang dipakai navbar, footer, dan sosial media.', `
          <div id="sc-section-brand" class="site-content-grid site-content-grid-2">
            ${inputGroup('sc-brand-name', 'Nama Brand', brand.name || '', 'Paroki Santo Andreas Rasul')}
            ${inputGroup('sc-brand-subtitle', 'Subjudul Brand', brand.subtitle || '', 'Santo Andreas Rasul')}
            ${textareaGroup('sc-brand-description', 'Deskripsi Brand', brand.description || '', 'Teks deskripsi singkat', 3)}
            ${inputGroup('sc-brand-copyright', 'Copyright Brand', brand.copyright || '', '© 2026 ...')}
            ${inputGroup('sc-brand-tagline', 'Tagline Brand', brand.tagline || '', 'Dibuat oleh umat dan untuk umat')}
            ${inputGroup('sc-brand-instagram', 'Instagram', brand.instagram || '', 'https://...')}
            ${inputGroup('sc-brand-youtube', 'YouTube', brand.youtube || '', 'https://...')}
          </div>
          <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            ${textareaGroup('sc-footer-description', 'Deskripsi Footer', footer.description || '', 'Teks footer kiri', 3)}
            ${inputGroup('sc-footer-address', 'Alamat Footer', footer.address || '', 'Alamat gereja')}
            ${inputGroup('sc-footer-phone', 'Telepon Footer', footer.phone || '', '(0721) 755300')}
            ${inputGroup('sc-footer-email', 'Email Footer', footer.email || '', 'email@paroki.id', 'email')}
            ${textareaGroup('sc-footer-hours', 'Jam Operasional Footer', footer.hours || '', 'Gunakan baris baru untuk pemisah jam', 3)}
            ${inputGroup('sc-footer-copyright', 'Copyright Footer', footer.copyright || '', '© 2026 ...')}
            ${inputGroup('sc-footer-tagline', 'Tagline Footer', footer.tagline || '', 'Dibuat oleh umat dan untuk umat')}
          </div>
        `)}

        ${sectionCard('Beranda', 'Teks hero, statistik, dan judul seksi yang tampil di halaman utama.', `
          <div id="sc-section-home" class="site-content-grid site-content-grid-2">
            ${inputGroup('sc-home-hero-badge', 'Badge Hero', home.hero?.badge || '', 'Selamat Datang')}
            ${textareaGroup('sc-home-hero-title-lines', 'Judul Hero per Baris', (home.hero?.titleLines || []).join('\n'), 'Satu baris per baris judul', 4)}
            ${textareaGroup('sc-home-hero-subtitle', 'Subjudul Hero', home.hero?.subtitle || '', 'Teks pembuka beranda', 4)}
            ${inputGroup('sc-home-hero-primary-text', 'Teks CTA Utama', home.hero?.primaryCta?.text || '', 'Jadwal Misa')}
            ${inputGroup('sc-home-hero-primary-href', 'Link CTA Utama', home.hero?.primaryCta?.href || '', 'jadwal.html')}
            ${inputGroup('sc-home-hero-secondary-text', 'Teks CTA Kedua', home.hero?.secondaryCta?.text || '', 'Jelajahi 9 Stasi')}
            ${inputGroup('sc-home-hero-secondary-href', 'Link CTA Kedua', home.hero?.secondaryCta?.href || '', '#stasi-section')}
          </div>
          <div class="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4">
            ${inputGroup('sc-home-announcement-badge', 'Badge Informasi', home.announcements?.badge || '', 'Informasi Terkini')}
            ${inputGroup('sc-home-announcement-title', 'Judul Informasi', home.announcements?.title || '', 'Pengumuman & Renungan')}
            ${textareaGroup('sc-home-announcement-subtitle', 'Subjudul Informasi', home.announcements?.subtitle || '', 'Teks pengantar bagian informasi', 3)}
            ${inputGroup('sc-home-announcement-card-title', 'Judul Kartu Pengumuman', home.announcements?.cardTitle || '', 'Pengumuman Paroki')}
            ${inputGroup('sc-home-renungan-label', 'Label Renungan', home.announcements?.devotionLabel || '', 'Renungan Harian')}
            ${inputGroup('sc-home-schedule-badge', 'Badge Jadwal', home.schedule?.badge || '', 'Jadwal Mingguan')}
            ${inputGroup('sc-home-schedule-title', 'Judul Jadwal', home.schedule?.title || '', 'Jadwal Misa Gereja Paroki')}
            ${textareaGroup('sc-home-schedule-subtitle', 'Subjudul Jadwal', home.schedule?.subtitle || '', 'Teks pengantar bagian jadwal', 3)}
            ${inputGroup('sc-home-schedule-link', 'Teks Link Jadwal', home.schedule?.linkText || '', 'Lihat Jadwal Lengkap')}
          </div>
        `)}

        ${sectionCard('Kontak & Sekretariat', 'Teks dan data yang tampil di halaman kontak dan footer.', `
          <div id="sc-section-contact" class="site-content-grid site-content-grid-2">
            ${inputGroup('sc-contact-sekretariat-title', 'Judul Sekretariat', contact.sekretariat?.title || '', 'Sekretariat Paroki')}
            ${textareaGroup('sc-contact-sekretariat-address', 'Alamat Sekretariat', contact.sekretariat?.address || '', 'Alamat lengkap', 3)}
            ${inputGroup('sc-contact-sekretariat-phone', 'Telepon Sekretariat', contact.sekretariat?.phone || '', '(0721) 755300')}
            ${inputGroup('sc-contact-sekretariat-email', 'Email Sekretariat', contact.sekretariat?.email || '', 'email@paroki.id', 'email')}
            ${inputGroup('sc-contact-hours-weekday', 'Jam Weekday', contact.sekretariat?.hoursWeekday || '', 'Senin – Jumat: ...')}
            ${inputGroup('sc-contact-hours-weekend', 'Jam Weekend', contact.sekretariat?.hoursWeekend || '', 'Sabtu – Minggu: ...')}
          </div>
          <div class="mt-5 pt-5 border-t border-gray-200">
            <h4 class="text-sm font-bold text-gray-700 mb-4">Pertanyaan Umum (FAQ)</h4>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              ${[1, 2, 3, 4].map(i => `
                <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div class="font-semibold text-xs text-gray-500 mb-3 uppercase tracking-wider">FAQ ${i}</div>
                  ${inputGroup(`sc-contact-faq-q-${i}`, 'Pertanyaan', contact.faq?.[i-1]?.question || '', 'Contoh: Apa syarat baptis?')}
                  <div class="mt-3">
                    ${textareaGroup(`sc-contact-faq-a-${i}`, 'Jawaban', contact.faq?.[i-1]?.answer || '', 'Jawaban lengkap...', 3)}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `)}
      </div>
    `;
  }

  function readLines(id, fallback = []) {
    const raw = fieldValue(id, fallback.join('\n'));
    return String(raw || '')
      .split(/\r?\n/)
      .map(item => item.trim())
      .filter(Boolean);
  }

  function collectSiteContentFromForm() {
    return {
      brand: {
        name: fieldValue('sc-brand-name'),
        subtitle: fieldValue('sc-brand-subtitle'),
        description: fieldValue('sc-brand-description'),
        copyright: fieldValue('sc-brand-copyright'),
        tagline: fieldValue('sc-brand-tagline'),
        instagram: fieldValue('sc-brand-instagram'),
        youtube: fieldValue('sc-brand-youtube')
      },
      home: {
        hero: {
          badge: fieldValue('sc-home-hero-badge'),
          titleLines: readLines('sc-home-hero-title-lines', ['Paroki', 'Santo Andreas', 'Rasul']),
          subtitle: fieldValue('sc-home-hero-subtitle'),
          primaryCta: {
            text: fieldValue('sc-home-hero-primary-text'),
            href: fieldValue('sc-home-hero-primary-href')
          },
          secondaryCta: {
            text: fieldValue('sc-home-hero-secondary-text'),
            href: fieldValue('sc-home-hero-secondary-href')
          }
        },
        announcements: {
          badge: fieldValue('sc-home-announcement-badge'),
          title: fieldValue('sc-home-announcement-title'),
          subtitle: fieldValue('sc-home-announcement-subtitle'),
          cardTitle: fieldValue('sc-home-announcement-card-title'),
          devotionLabel: fieldValue('sc-home-renungan-label')
        },
        schedule: {
          badge: fieldValue('sc-home-schedule-badge'),
          title: fieldValue('sc-home-schedule-title'),
          subtitle: fieldValue('sc-home-schedule-subtitle'),
          linkText: fieldValue('sc-home-schedule-link')
        }
      },
      contact: {
        quickActions: {
          whatsapp: {
            label: 'WhatsApp Sekretariat',
            href: ''
          },
          phone: {
            label: 'Telepon Sekretariat',
            href: ''
          }
        },
        sekretariat: {
          title: fieldValue('sc-contact-sekretariat-title'),
          address: fieldValue('sc-contact-sekretariat-address'),
          phone: fieldValue('sc-contact-sekretariat-phone'),
          email: fieldValue('sc-contact-sekretariat-email'),
          hoursWeekday: fieldValue('sc-contact-hours-weekday'),
          hoursWeekend: fieldValue('sc-contact-hours-weekend')
        },
        faq: [1, 2, 3, 4].map(index => ({
          question: fieldValue(`sc-contact-faq-q-${index}`),
          answer: fieldValue(`sc-contact-faq-a-${index}`)
        }))
      },
      footer: {
        description: fieldValue('sc-footer-description'),
        address: fieldValue('sc-footer-address'),
        phone: fieldValue('sc-footer-phone'),
        email: fieldValue('sc-footer-email'),
        hours: fieldValue('sc-footer-hours'),
        copyright: fieldValue('sc-footer-copyright'),
        tagline: fieldValue('sc-footer-tagline')
      }
    };
  }

  async function loadSiteContentAdmin(forceReload = false) {
    const container = document.getElementById('site-content-editor');
    if (!container) return;

    container.innerHTML = '<div class="empty-state"><p>Memuat editor konten situs…</p></div>';

    try {
      const content = typeof window.loadSiteContent === 'function'
        ? await window.loadSiteContent(forceReload)
        : (window.getSiteContent ? window.getSiteContent() : window.SA_SITE_CONTENT_DEFAULTS || {});

      renderSiteContentEditor(content || window.SA_SITE_CONTENT_DEFAULTS || {});
      if (typeof saveInitialFormState === 'function') {
        saveInitialFormState('site-content-form');
      }
    } catch (err) {
      container.innerHTML = `<div class="empty-state"><p>Gagal memuat editor konten.<br><small>${escapeHtml(formatSiteContentError(err, 'Gagal memuat editor konten'))}</small></p></div>`;
    }
  }

  async function submitSiteContentAdmin(event) {
    event.preventDefault();

    const confirmed = typeof showConfirmModal === 'function'
      ? await showConfirmModal({
        title: 'Simpan Konten Situs',
        heading: 'Simpan perubahan konten?',
        message: 'Perubahan akan langsung dipakai oleh halaman publik setelah tersimpan.',
        confirmText: 'Ya, Simpan',
        cancelText: 'Batal',
        type: 'save',
        modalId: 'site-content-form'
      })
      : true;

    if (!confirmed) return;

    try {
      const payload = collectSiteContentFromForm();
      await window.saveSiteContent(payload);
      if (typeof toast === 'function') toast('Konten situs berhasil disimpan.');
      await loadSiteContentAdmin(true);
      if (typeof window.refreshSiteContentOnPage === 'function') {
        window.refreshSiteContentOnPage().catch(() => {});
      }
    } catch (err) {
      const message = formatSiteContentError(err, 'Gagal menyimpan konten situs');
      if (typeof toast === 'function') toast(message, 'error');
    }
  }

  async function resetSiteContentAdmin() {
    const confirmed = typeof showConfirmModal === 'function'
      ? await showConfirmModal({
        title: 'Reset Konten',
        heading: 'Kembalikan ke konten default?',
        message: 'Semua perubahan pada konten situs akan dikembalikan ke nilai bawaan.',
        confirmText: 'Ya, Reset',
        cancelText: 'Batal',
        type: 'warning'
      })
      : confirm('Kembalikan semua konten situs ke default?');

    if (!confirmed) return;

    try {
      await window.saveSiteContent(window.SA_SITE_CONTENT_DEFAULTS || {});
      if (typeof toast === 'function') toast('Konten situs dikembalikan ke default.');
      await loadSiteContentAdmin(true);
      if (typeof window.refreshSiteContentOnPage === 'function') {
        window.refreshSiteContentOnPage().catch(() => {});
      }
    } catch (err) {
      const message = formatSiteContentError(err, 'Gagal reset konten situs');
      if (typeof toast === 'function') toast(message, 'error');
    }
  }

  window.loadSiteContentAdmin = loadSiteContentAdmin;
  window.submitSiteContentAdmin = submitSiteContentAdmin;
  window.resetSiteContentAdmin = resetSiteContentAdmin;
})();