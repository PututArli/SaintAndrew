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

  function inputGroup(id, label, value = '', placeholder = '', type = 'text') {
    return `
      <div class="form-group mb-0">
        <label class="form-label" for="${id}">${escapeHtml(label)}</label>
        <input id="${id}" type="${type}" class="form-ctrl" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}">
      </div>
    `;
  }

  function textareaGroup(id, label, value = '', placeholder = '', rows = 4) {
    return `
      <div class="form-group mb-0">
        <label class="form-label" for="${id}">${escapeHtml(label)}</label>
        <textarea id="${id}" class="form-ctrl" rows="${rows}" placeholder="${escapeHtml(placeholder)}">${escapeHtml(value)}</textarea>
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
            <a href="#sc-section-home" class="site-content-jump">Beranda</a>
            <a href="#sc-section-profile" class="site-content-jump">Profil</a>
            <a href="#sc-section-contact" class="site-content-jump">Kontak</a>
            <a href="#sc-section-brand" class="site-content-jump">Identitas</a>
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
          <div class="mt-5 grid grid-cols-1 gap-3">
            ${[0, 1, 2, 3].map(index => statBlock(index, home.stats?.[index] || {})).join('')}
          </div>
          <div class="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-4">
            ${inputGroup('sc-home-announcement-badge', 'Badge Informasi', home.announcements?.badge || '', 'Informasi Terkini')}
            ${inputGroup('sc-home-announcement-title', 'Judul Informasi', home.announcements?.title || '', 'Pengumuman & Renungan')}
            ${textareaGroup('sc-home-announcement-subtitle', 'Subjudul Informasi', home.announcements?.subtitle || '', 'Teks pengantar bagian informasi', 3)}
            ${inputGroup('sc-home-announcement-card-title', 'Judul Kartu Pengumuman', home.announcements?.cardTitle || '', 'Pengumuman Paroki')}
            ${inputGroup('sc-home-renungan-label', 'Label Renungan', home.announcements?.devotionLabel || '', 'Renungan Harian')}
            ${inputGroup('sc-home-schedule-badge', 'Badge Jadwal', home.schedule?.badge || '', 'Jadwal Mingguan')}
            ${inputGroup('sc-home-schedule-title', 'Judul Jadwal', home.schedule?.title || '', 'Jadwal Misa Gereja Paroki')}
            ${textareaGroup('sc-home-schedule-subtitle', 'Subjudul Jadwal', home.schedule?.subtitle || '', 'Teks pengantar bagian jadwal', 3)}
            ${inputGroup('sc-home-schedule-link', 'Teks Link Jadwal', home.schedule?.linkText || '', 'Lihat Jadwal Lengkap')}
            ${inputGroup('sc-home-gallery-badge', 'Badge Galeri', home.gallery?.badge || '', 'Foto Kegiatan')}
            ${inputGroup('sc-home-gallery-title', 'Judul Galeri', home.gallery?.title || '', 'Galeri Paroki')}
            ${inputGroup('sc-home-gallery-link', 'Teks Link Galeri', home.gallery?.linkText || '', 'Lihat Semua Foto')}
            ${inputGroup('sc-home-stasi-badge', 'Badge Stasi', home.stasi?.badge || '', 'Komunitas Kami')}
            ${inputGroup('sc-home-stasi-title', 'Judul Stasi', home.stasi?.title || '', '9 Stasi Paroki')}
            ${textareaGroup('sc-home-stasi-subtitle', 'Subjudul Stasi', home.stasi?.subtitle || '', 'Teks pengantar bagian stasi', 3)}
            ${inputGroup('sc-home-stasi-link', 'Teks Link Stasi', home.stasi?.linkText || '', 'Jelajahi Semua Stasi')}
          </div>
        `)}

        ${sectionCard('Profil', 'Semua teks utama di halaman profil, termasuk visi, misi, sejarah, dan kepemimpinan.', `
          <div id="sc-section-profile" class="site-content-grid site-content-grid-2">
            ${inputGroup('sc-profile-hero-title', 'Judul Hero Profil', profile.hero?.title || '', 'Profil Paroki')}
            ${textareaGroup('sc-profile-hero-subtitle', 'Subjudul Hero Profil', profile.hero?.subtitle || '', 'Teks pembuka profil', 3)}
            ${inputGroup('sc-profile-org-badge', 'Badge Organisasi', profile.organization?.badge || '', 'Organisasi Gereja')}
            ${inputGroup('sc-profile-org-title', 'Judul Organisasi', profile.organization?.title || '', 'Struktur Organisasi Gereja')}
            ${textareaGroup('sc-profile-org-subtitle', 'Subjudul Organisasi', profile.organization?.subtitle || '', 'Teks penjelas', 3)}
            ${inputGroup('sc-profile-paroki-heading', 'Judul Paroki', profile.organization?.parokiHeading || '', 'Apa itu Paroki?')}
            ${textareaGroup('sc-profile-paroki-text', 'Teks Apa itu Paroki', profile.organization?.parokiText || '', 'Uraian paroki', 6)}
            ${inputGroup('sc-profile-stasi-heading', 'Judul Stasi', profile.organization?.stasiHeading || '', 'Apa itu Stasi?')}
            ${textareaGroup('sc-profile-stasi-text', 'Teks Apa itu Stasi', profile.organization?.stasiText || '', 'Uraian stasi', 6)}
            ${inputGroup('sc-profile-vision-badge', 'Badge Visi & Misi', profile.visionMission?.badge || '', 'Arah & Tujuan')}
            ${inputGroup('sc-profile-vision-title', 'Judul Visi & Misi', profile.visionMission?.title || '', 'Visi & Misi')}
            ${textareaGroup('sc-profile-vision-subtitle', 'Subjudul Visi & Misi', profile.visionMission?.subtitle || '', 'Teks pengantar visi misi', 3)}
            ${inputGroup('sc-profile-vision-label', 'Label Visi', profile.visionMission?.visionLabel || '', 'Visi')}
            ${inputGroup('sc-profile-vision-heading', 'Judul Visi', profile.visionMission?.visionTitle || '', 'Tujuan Jangka Panjang')}
            ${textareaGroup('sc-profile-vision-text', 'Teks Visi', profile.visionMission?.visionText || '', 'Uraian visi', 5)}
            ${inputGroup('sc-profile-mission-label', 'Label Misi', profile.visionMission?.missionLabel || '', 'Misi')}
            ${inputGroup('sc-profile-mission-heading', 'Judul Misi', profile.visionMission?.missionTitle || '', 'Langkah Nyata')}
            ${textareaGroup('sc-profile-mission-items', 'Daftar Misi', (profile.visionMission?.missionItems || []).join('\n'), 'Satu misi per baris', 5)}
            ${inputGroup('sc-profile-saints-badge', 'Badge Pelindung', profile.saints?.badge || '', 'Pelindung Rohani')}
            ${inputGroup('sc-profile-saints-title', 'Judul Pelindung', profile.saints?.title || '', 'Santo & Santa Pelindung')}
            ${textareaGroup('sc-profile-saints-subtitle', 'Subjudul Pelindung', profile.saints?.subtitle || '', 'Teks pengantar pelindung', 4)}
            ${inputGroup('sc-profile-history-badge', 'Badge Sejarah', profile.history?.badge || '', 'Perjalanan Iman')}
            ${inputGroup('sc-profile-history-title', 'Judul Sejarah', profile.history?.title || '', 'Sejarah Paroki')}
            ${textareaGroup('sc-profile-history-subtitle', 'Subjudul Sejarah', profile.history?.subtitle || '', 'Teks pengantar sejarah', 3)}
            <div class="site-content-history-list" style="grid-column:1 / -1; display:grid; gap:0.9rem;">
              ${[0, 1, 2].map(index => historyBlock(index, profile.history?.items?.[index] || {})).join('')}
            </div>
            ${inputGroup('sc-profile-leaders-badge', 'Badge Kepemimpinan', profile.leaders?.badge || '', 'Kepemimpinan')}
            ${inputGroup('sc-profile-leaders-title', 'Judul Kepemimpinan', profile.leaders?.title || '', 'Daftar Ketua Stasi')}
            ${textareaGroup('sc-profile-leaders-subtitle', 'Subjudul Kepemimpinan', profile.leaders?.subtitle || '', 'Teks pengantar daftar ketua', 3)}
            ${textareaGroup('sc-profile-leaders-items', 'Daftar Ketua Stasi', (profile.leaders?.items || []).join('\n'), 'Satu nama per baris. Contoh: Bpk. Yohakim Noto Siswoyo (Alm)', 10)}
          </div>
        `)}

        ${sectionCard('Kontak', 'Teks dan data yang tampil di halaman kontak.', `
          <div id="sc-section-contact" class="site-content-grid site-content-grid-2">
            ${inputGroup('sc-contact-hero-badge', 'Badge Hero', contact.hero?.badge || '', 'Hubungi Kami')}
            ${inputGroup('sc-contact-hero-title', 'Judul Hero', contact.hero?.title || '', 'Kontak & Sekretariat')}
            ${textareaGroup('sc-contact-hero-subtitle', 'Subjudul Hero', contact.hero?.subtitle || '', 'Teks hero kontak', 3)}
            ${inputGroup('sc-contact-wa-label', 'Label WhatsApp', contact.quickActions?.whatsapp?.label || '', 'WhatsApp Sekretariat')}
            ${inputGroup('sc-contact-wa-href', 'Link WhatsApp', contact.quickActions?.whatsapp?.href || '', 'https://wa.me/...')}
            ${inputGroup('sc-contact-phone-label', 'Label Telepon', contact.quickActions?.phone?.label || '', 'Telepon: ...')}
            ${inputGroup('sc-contact-phone-href', 'Link Telepon', contact.quickActions?.phone?.href || '', 'tel:...')}
            ${inputGroup('sc-contact-sekretariat-title', 'Judul Sekretariat', contact.sekretariat?.title || '', 'Sekretariat Paroki')}
            ${textareaGroup('sc-contact-sekretariat-address', 'Alamat Sekretariat', contact.sekretariat?.address || '', 'Alamat lengkap', 3)}
            ${inputGroup('sc-contact-sekretariat-phone', 'Telepon Sekretariat', contact.sekretariat?.phone || '', '(0721) 755300')}
            ${inputGroup('sc-contact-sekretariat-email', 'Email Sekretariat', contact.sekretariat?.email || '', 'email@paroki.id', 'email')}
            ${inputGroup('sc-contact-hours-weekday', 'Jam Weekday', contact.sekretariat?.hoursWeekday || '', 'Senin – Jumat: ...')}
            ${inputGroup('sc-contact-hours-weekend', 'Jam Weekend', contact.sekretariat?.hoursWeekend || '', 'Sabtu – Minggu: ...')}
            ${inputGroup('sc-contact-form-title', 'Judul Form', contact.form?.title || '', 'Kirim Pesan')}
            ${textareaGroup('sc-contact-form-subtitle', 'Subjudul Form', contact.form?.subtitle || '', 'Teks di bawah judul form', 3)}
            ${inputGroup('sc-contact-form-submit', 'Teks Tombol Kirim', contact.form?.submitText || '', 'Kirim Pesan')}
            ${inputGroup('sc-contact-map-badge', 'Badge Peta', contact.map?.badge || '', 'Peta Gereja')}
            ${inputGroup('sc-contact-map-title', 'Judul Peta', contact.map?.title || '', 'Lokasi & Petunjuk Arah')}
            ${textareaGroup('sc-contact-map-subtitle', 'Subjudul Peta', contact.map?.subtitle || '', 'Teks pengantar peta', 3)}
            ${inputGroup('sc-contact-map-address-label', 'Label Alamat Peta', contact.map?.addressLabel || '', 'Gereja Paroki')}
            ${inputGroup('sc-contact-map-address-line', 'Baris Alamat Peta', contact.map?.addressLine || '', 'Alamat pada kartu peta')}
            ${inputGroup('sc-contact-map-button', 'Teks Tombol Peta', contact.map?.buttonText || '', 'Buka Google Maps ↗')}
            ${inputGroup('sc-contact-map-url', 'Link Google Maps', contact.map?.mapUrl || '', 'https://...')}
            ${inputGroup('sc-contact-map-iframe', 'Link Iframe Maps', contact.map?.iframeUrl || '', 'https://...')}
          </div>
          <div class="mt-5 space-y-3">
            ${[0, 1, 2, 3].map(index => faqBlock(index, contact.faq?.[index] || {})).join('')}
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
        stats: [1, 2, 3, 4].map(index => ({
          value: fieldValue(`sc-home-stat-${index}-value`),
          label: fieldValue(`sc-home-stat-${index}-label`)
        })),
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
        },
        gallery: {
          badge: fieldValue('sc-home-gallery-badge'),
          title: fieldValue('sc-home-gallery-title'),
          linkText: fieldValue('sc-home-gallery-link')
        },
        stasi: {
          badge: fieldValue('sc-home-stasi-badge'),
          title: fieldValue('sc-home-stasi-title'),
          subtitle: fieldValue('sc-home-stasi-subtitle'),
          linkText: fieldValue('sc-home-stasi-link')
        }
      },
      contact: {
        hero: {
          badge: fieldValue('sc-contact-hero-badge'),
          title: fieldValue('sc-contact-hero-title'),
          subtitle: fieldValue('sc-contact-hero-subtitle')
        },
        quickActions: {
          whatsapp: {
            label: fieldValue('sc-contact-wa-label'),
            href: fieldValue('sc-contact-wa-href')
          },
          phone: {
            label: fieldValue('sc-contact-phone-label'),
            href: fieldValue('sc-contact-phone-href')
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
        form: {
          title: fieldValue('sc-contact-form-title'),
          subtitle: fieldValue('sc-contact-form-subtitle'),
          submitText: fieldValue('sc-contact-form-submit')
        },
        map: {
          badge: fieldValue('sc-contact-map-badge'),
          title: fieldValue('sc-contact-map-title'),
          subtitle: fieldValue('sc-contact-map-subtitle'),
          addressLabel: fieldValue('sc-contact-map-address-label'),
          addressLine: fieldValue('sc-contact-map-address-line'),
          buttonText: fieldValue('sc-contact-map-button'),
          mapUrl: fieldValue('sc-contact-map-url'),
          iframeUrl: fieldValue('sc-contact-map-iframe')
        },
        faq: [1, 2, 3, 4].map(index => ({
          question: fieldValue(`sc-contact-faq-q-${index}`),
          answer: fieldValue(`sc-contact-faq-a-${index}`)
        }))
      },
      profile: {
        hero: {
          title: fieldValue('sc-profile-hero-title'),
          subtitle: fieldValue('sc-profile-hero-subtitle')
        },
        organization: {
          badge: fieldValue('sc-profile-org-badge'),
          title: fieldValue('sc-profile-org-title'),
          subtitle: fieldValue('sc-profile-org-subtitle'),
          parokiHeading: fieldValue('sc-profile-paroki-heading'),
          parokiText: fieldValue('sc-profile-paroki-text'),
          stasiHeading: fieldValue('sc-profile-stasi-heading'),
          stasiText: fieldValue('sc-profile-stasi-text')
        },
        visionMission: {
          badge: fieldValue('sc-profile-vision-badge'),
          title: fieldValue('sc-profile-vision-title'),
          subtitle: fieldValue('sc-profile-vision-subtitle'),
          visionLabel: fieldValue('sc-profile-vision-label'),
          visionTitle: fieldValue('sc-profile-vision-heading'),
          visionText: fieldValue('sc-profile-vision-text'),
          missionLabel: fieldValue('sc-profile-mission-label'),
          missionTitle: fieldValue('sc-profile-mission-heading'),
          missionItems: readLines('sc-profile-mission-items')
        },
        saints: {
          badge: fieldValue('sc-profile-saints-badge'),
          title: fieldValue('sc-profile-saints-title'),
          subtitle: fieldValue('sc-profile-saints-subtitle')
        },
        history: {
          badge: fieldValue('sc-profile-history-badge'),
          title: fieldValue('sc-profile-history-title'),
          subtitle: fieldValue('sc-profile-history-subtitle'),
          items: [1, 2, 3].map(index => ({
            year: fieldValue(`sc-profile-history-year-${index}`),
            title: fieldValue(`sc-profile-history-title-${index}`),
            text: fieldValue(`sc-profile-history-text-${index}`)
          }))
        },
        leaders: {
          badge: fieldValue('sc-profile-leaders-badge'),
          title: fieldValue('sc-profile-leaders-title'),
          subtitle: fieldValue('sc-profile-leaders-subtitle'),
          items: readLines('sc-profile-leaders-items', [
            'Bpk. Yohakim Noto Siswoyo (Alm)',
            'Bpk. Yohakim Sosrowasito (Alm)',
            'Bpk. Petrus Siswosukarto (Alm)',
            'Bpk. Fx. Edi Suwarno (Alm)',
            'Bpk. Paulus Sutikno',
            'Bpk. Yohanes Supandi',
            'Bpk. Petrus Sukamto',
            'Bpk. Fx. Heri Hendarto (Alm)',
            'Bpk. Andreas Kamajaya (2024–Sekarang)'
          ])
        }
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