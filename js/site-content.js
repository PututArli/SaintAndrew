// ============================================================
//  SITE CONTENT STORE — Paroki Santo Andreas Rasul Marga Agung
//  Shared content defaults + load/save helpers for public pages
// ============================================================

(function () {
  const DEFAULT_CONTENT = {
    brand: {
      name: 'Paroki Santo Andreas Rasul',
      subtitle: 'Santo Andreas Rasul',
      description: 'Melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.',
      copyright: '© 2026 Paroki Santo Andreas Rasul Marga Agung.',
      tagline: 'Dibuat oleh umat dan untuk umat',
      instagram: 'https://www.instagram.com/omk_parokimargaagung?igsh=MW4wODZ0dTRjZGkwZA==',
      youtube: 'https://youtube.com/@parokisantoandreasrasulmar119?si=g3ct2ltcxme66UYq'
    },
    home: {
      hero: {
        badge: 'Selamat Datang',
        titleLines: ['Paroki', 'Santo Andreas', 'Rasul'],
        subtitle: 'Gereja Katolik Paroki Santo Andreas Rasul Marga Agung hadir untuk melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.',
        primaryCta: { text: 'Jadwal Misa', href: 'jadwal.html' },
        secondaryCta: { text: 'Jelajahi 9 Stasi', href: '#stasi-section' }
      },
      stats: [
        { value: '9', label: 'Stasi' },
        { value: '217+', label: 'Kepala Keluarga' },
        { value: '2005', label: 'Tahun Berdiri' },
        { value: '60+', label: 'Tahun Melayani' }
      ],
      announcements: {
        badge: 'Informasi Terkini',
        title: 'Pengumuman & Renungan',
        subtitle: 'Tetap terhubung dengan kegiatan dan pesan rohani paroki kita.',
        cardTitle: 'Pengumuman Paroki',
        devotionLabel: 'Renungan Harian'
      },
      schedule: {
        badge: 'Jadwal Mingguan',
        title: 'Jadwal Misa Gereja Paroki',
        subtitle: 'Jadwal misa yang paling sering dicari umat di paroki.',
        linkText: 'Lihat Jadwal Lengkap'
      },
      gallery: {
        badge: 'Foto Kegiatan',
        title: 'Galeri Paroki',
        linkText: 'Lihat Semua Foto'
      },
      stasi: {
        badge: 'Komunitas Kami',
        title: '9 Stasi Paroki',
        subtitle: 'Paroki Marga Agung menaungi 9 stasi dengan sejarah yang kaya di Lampung Selatan.',
        linkText: 'Jelajahi Semua Stasi'
      }
    },
    contact: {
      hero: {
        badge: 'Hubungi Kami',
        title: 'Kontak & Sekretariat',
        subtitle: 'Kami siap membantu dan menjawab setiap pertanyaan Anda'
      },
      quickActions: {
        whatsapp: { label: 'WhatsApp Sekretariat', href: 'https://wa.me/62812755300' },
        phone: { label: 'Telepon: (0721) 755300', href: 'tel:0721755300' }
      },
      sekretariat: {
        title: 'Sekretariat Paroki',
        address: 'Jl. Margo Agung, Marga Kaya, Jati Agung, Kabupaten Lampung Selatan, Lampung 35365',
        phone: '(0721) 755300',
        email: 'parokimargaagung@gmail.com',
        hoursWeekday: 'Senin – Jumat: 08:00 – 15:00 WIB',
        hoursWeekend: 'Sabtu – Minggu: 08:00 – 12:00 WIB'
      },
      form: {
        title: 'Kirim Pesan',
        subtitle: 'Isi formulir di bawah ini dan kami akan merespons secepatnya.',
        submitText: 'Kirim Pesan'
      },
      map: {
        badge: 'Peta Gereja',
        title: 'Lokasi & Petunjuk Arah',
        subtitle: 'Kunjungi Gereja Paroki Santo Andreas Rasul Margo Agung. Klik tombol navigasi untuk langsung membuka rute di Google Maps ponsel atau komputer Anda.',
        addressLabel: 'Gereja Paroki',
        addressLine: 'Jl. Margo Agung, Marga Kaya, Jati Agung, Lampung Selatan',
        buttonText: 'Buka Google Maps ↗',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gereja+Katolik+Santo+Andreas+Rasul+Marga+Agung+Lampung+Selatan',
        iframeUrl: 'https://maps.google.com/maps?q=Gereja+Katolik+Santo+Andreas+Rasul+Marga+Agung+Lampung+Selatan&t=&z=15&ie=UTF8&iwloc=&output=embed'
      },
      faq: [
        {
          question: 'Apa syarat untuk pembaptisan bayi?',
          answer: 'Persyaratan pendaftaran meliputi: 1) Fotokopi Akta Perkawinan Gereja orang tua, 2) Fotokopi Surat Baptis orang tua, 3) Fotokopi Akta Lahir anak, dan 4) Rekomendasi/Tanda tangan dari Ketua Lingkungan setempat.'
        },
        {
          question: 'Bagaimana prosedur pendaftaran pernikahan?',
          answer: 'Pengajuan dilakukan minimal 3 bulan sebelum hari-H. Calon mempelai diwajibkan mengikuti Kursus Persiapan Perkawinan (KPP) dan menyerahkan dokumen seperti surat baptis terbaru, akta lahir, dan rekomendasi dari ketua lingkungan.'
        },
        {
          question: 'Apakah bisa berkonsultasi langsung dengan Pastor?',
          answer: 'Tentu. Anda dapat membuat janji temu dengan Pastor Paroki melalui sekretariat pada jam operasional atau langsung setelah perayaan ekaristi selesai.'
        },
        {
          question: 'Bagaimana cara mendaftarkan intensi Misa?',
          answer: 'Pendaftaran intensi Misa dapat dilakukan di sekretariat paroki pada jam operasional. Sertakan nama orang yang didoakan serta jenis intensi (hidup atau arwah). Hubungi sekretariat untuk informasi lebih lanjut.'
        }
      ]
    },
    profile: {
      hero: {
        title: 'Profil Paroki',
        subtitle: 'Mengenal lebih dalam sejarah dan organisasi Paroki Marga Agung'
      },
      organization: {
        badge: 'Organisasi Gereja',
        title: 'Struktur Organisasi Gereja',
        subtitle: 'Layaknya sebuah organisasi, Gereja Katolik memiliki hierarki yang teratur dari tingkat keuskupan hingga komunitas basis.',
        parokiHeading: 'Apa itu Paroki?',
        parokiText: 'Paroki adalah badan komunitas kaum beriman kristiani yang dibentuk secara tetap dalam wilayah keuskupan. Reksa pastoral dipercayakan kepada Pastor Kepala Paroki di bawah otoritas Uskup wilayah — berfungsi sebagai tempat koordinasi administrasi, kepengurusan, dan layanan sakramental di daerahnya.',
        stasiHeading: 'Apa itu Stasi?',
        stasiText: 'Stasi adalah unit struktural di bawah naungan paroki yang mewadahi komunitas umat beriman yang tersebar di berbagai wilayah. Stasi memiliki kapel atau bangunan peribadatan sendiri dan dikelola oleh pengurus inti lokal bersama pastor paroki.'
      },
      visionMission: {
        badge: 'Arah & Tujuan',
        title: 'Visi & Misi',
        subtitle: 'Arah pelayanan paroki yang dihidupi bersama umat.',
        visionLabel: 'Visi',
        visionTitle: 'Tujuan Jangka Panjang',
        visionText: 'Menjadi persekutuan umat beriman yang berlandaskan Ekaristi, mandiri, misioner, dan berbelarasa terhadap sesama yang miskin dan menderita di tengah masyarakat yang majemuk.',
        missionLabel: 'Misi',
        missionTitle: 'Langkah Nyata',
        missionItems: [
          'Menghidupkan kelompok kategorial dan wilayah/stasi melalui pendalaman iman.',
          'Meningkatkan kepedulian sosial terhadap umat yang kurang mampu.',
          'Membangun dialog dan kerjasama yang baik dengan umat beragama lain.'
        ]
      },
      saints: {
        badge: 'Pelindung Rohani',
        title: 'Santo & Santa Pelindung',
        subtitle: 'Mengenal riwayat hidup dan keteladanan iman para kudus pelindung gereja paroki serta stasi-stasi di lingkungan Paroki Santo Andreas Rasul Marga Agung.'
      },
      history: {
        badge: 'Perjalanan Iman',
        title: 'Sejarah Paroki',
        subtitle: 'Jejak perjalanan komunitas iman dari masa perintisan hingga paroki mandiri.',
        items: [
          {
            year: '1961',
            title: 'Asal Usul Umat',
            text: 'Akar umat Katolik di wilayah ini sebagian besar berasal dari para transmigran korban letusan Gunung Merapi dari Jawa Tengah serta para pekerja kebun PTPN 7. Rombongan pertama tiba di penampungan pada 27 Juni 1961. Pelayanan pastoral awalnya diberikan oleh para imam misionaris SCJ dari Tanjung Karang.'
          },
          {
            year: '1964',
            title: 'Pembangunan Gereja',
            text: 'Gereja pertama berbentuk semi permanen selesai dibangun pada 1962–1963 di atas tanah seluas ¾ hektar di Blok C. Gereja tersebut diresmikan oleh Bapa Uskup Hermelink Gentiaras SCJ pada 27 Juni 1964. Rehabilitasi menjadi bangunan permanen seluas 528 m² dilakukan saat masih berstatus stasi di bawah Paroki Kedaton.'
          },
          {
            year: '2005',
            title: 'Peningkatan Status Paroki',
            text: 'Stasi Marga Agung ditetapkan sebagai Unit Pastoral sekitar tahun 1989. Statusnya resmi ditingkatkan menjadi Paroki pada 1 Januari 2005 dengan Romo Yohanes Thedens Tana sebagai Pastor Paroki pertamanya. Data terakhir menunjukkan 217 KK dan 9 Lingkungan.'
          }
        ]
      },
      leaders: {
        badge: 'Kepemimpinan',
        title: 'Daftar Ketua Stasi',
        subtitle: 'Para pemimpin yang telah mengabdi untuk Margo Agung'
      }
    },
    footer: {
      brandName: 'Paroki Santo Andreas Rasul',
      brandSubtitle: 'Santo Andreas Rasul',
      description: 'Melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.',
      address: 'Jl. Margo Agung, Marga Kaya, Jati Agung, Lampung Selatan 35365',
      phone: '(0721) 755300',
      email: 'parokimargaagung@gmail.com',
      hours: 'Sen–Jum: 08:00–15:00<br>Sab–Min: 08:00–12:00',
      copyright: '© 2026 Paroki Santo Andreas Rasul Marga Agung.',
      tagline: 'Dibuat oleh umat dan untuk umat'
    }
  };

  function isPlainObject(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
  }

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDeep(base, override) {
    if (Array.isArray(base)) {
      return Array.isArray(override) ? override : deepClone(base);
    }
    if (!isPlainObject(base)) {
      return override !== undefined ? override : base;
    }

    const output = deepClone(base);
    if (!isPlainObject(override)) return output;

    Object.keys(override).forEach((key) => {
      const baseValue = base[key];
      const overrideValue = override[key];
      if (Array.isArray(baseValue) || isPlainObject(baseValue)) {
        output[key] = mergeDeep(baseValue, overrideValue);
      } else {
        output[key] = overrideValue !== undefined ? overrideValue : baseValue;
      }
    });
    return output;
  }

  function normalizeContent(raw) {
    if (!raw) return deepClone(DEFAULT_CONTENT);
    const payload = raw.content && isPlainObject(raw.content) ? raw.content : raw;
    return mergeDeep(DEFAULT_CONTENT, payload);
  }

  function getPathValue(source, path, fallback = '') {
    if (!path) return fallback;
    return String(path).split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), source) ?? fallback;
  }

  let cachedContent = deepClone(DEFAULT_CONTENT);
  let loadPromise = null;

  async function loadSiteContent(forceReload = false) {
    if (loadPromise && !forceReload) return loadPromise;

    loadPromise = (async () => {
      let content = deepClone(DEFAULT_CONTENT);

      try {
        if (typeof db !== 'undefined' && db && db.from) {
          const { data, error } = await db.from('website_content').select('content').eq('id', 'main').limit(1);
          if (error) throw error;
          const row = Array.isArray(data) ? data[0] : data;
          if (row && row.content) {
            content = normalizeContent(row.content);
          }
        }
      } catch (err) {
        console.warn('Site content load note:', err);
      }

      cachedContent = content;
      window.saSiteContent = cachedContent;
      window.SA_SITE_CONTENT = cachedContent;
      document.dispatchEvent(new CustomEvent('site-content:loaded', { detail: cachedContent }));
      return cachedContent;
    })();

    return loadPromise;
  }

  async function saveSiteContent(content) {
    const payload = normalizeContent(content);
    if (typeof db === 'undefined' || !db || !db.from) {
      throw new Error('Koneksi database belum tersedia.');
    }

    const { error } = await db.from('website_content').upsert({
      id: 'main',
      content: payload,
      updated_at: new Date().toISOString()
    });

    if (error) throw error;

    cachedContent = payload;
    window.saSiteContent = cachedContent;
    window.SA_SITE_CONTENT = cachedContent;
    document.dispatchEvent(new CustomEvent('site-content:saved', { detail: cachedContent }));
    return cachedContent;
  }

  function getSiteContent() {
    return cachedContent;
  }

  function setSiteContent(content) {
    cachedContent = normalizeContent(content);
    window.saSiteContent = cachedContent;
    window.SA_SITE_CONTENT = cachedContent;
    return cachedContent;
  }

  function resetSiteContentToDefault() {
    return setSiteContent(deepClone(DEFAULT_CONTENT));
  }

  window.SA_SITE_CONTENT_DEFAULTS = deepClone(DEFAULT_CONTENT);
  window.loadSiteContent = loadSiteContent;
  window.saveSiteContent = saveSiteContent;
  window.getSiteContent = getSiteContent;
  window.setSiteContent = setSiteContent;
  window.resetSiteContentToDefault = resetSiteContentToDefault;
  window.getSitePathValue = getPathValue;

  // Kick off a silent initial load when possible.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadSiteContent().catch(() => {});
    }, { once: true });
  } else {
    loadSiteContent().catch(() => {});
  }
})();
