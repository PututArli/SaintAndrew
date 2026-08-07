// ============================================================
//  RENUNGAN HARIAN & SABDA LITURGI KATOLIK — OTOMATIS BERGANTI TIAP HARI
//  Paroki Santo Andreas Rasul Marga Agung
// ============================================================

/**
 * Perpustakaan Renungan & Sabda Harian Katolik (Siklus Liturgi & Inspirasi Harian)
 * Otomatis berganti setiap hari mengikuti penanggalan kalender (Day of Year).
 * Juga mendukung override dari Supabase jika admin paroki mengunggah renungan khusus.
 */

const KATALOG_RENUNGAN = [
  {
    tema: "Menjadi Garam dan Terang Dunia",
    perikop: "Matius 5:13-16",
    ayat: "Kamu adalah garam dunia. Jika garam itu menjadi tawar, dengan apakah ia diasinkan? Tidak ada lagi gunanya selain dibuang dan diinjak orang. Demikianlah hendaknya terangmu bercahaya di depan orang, supaya mereka melihat perbuatanmu yang baik dan memuliakan Bapamu yang di sorga.",
    refleksi: "Kristus tidak meminta kita untuk menjadi sesuatu yang asing, melainkan hadir memberi rasa damai dan menerangi kegelapan di sekitar kita. Di tengah rutinitas keluarga, pekerjaan, dan lingkungan umat, sekecil apapun kebaikan yang kita perbuat dengan tulus adalah wujud nyata kehadiran terang Kristus bagi sesama.",
    doa: "Tuhan Yesus Kristus, jadikanlah hidup kami saluran kasih dan damai-Mu. Mampukan kami menjadi terang di tengah kegelapan dan garam yang memberi arti bagi sesama di sekitar kami. Amin."
  },
  {
    tema: "Tinggallah di Dalam Aku",
    perikop: "Yohanes 15:4-5",
    ayat: "Tinggallah di dalam Aku dan Aku di dalam kamu. Sama seperti ranting tidak dapat berbuah dari dirinya sendiri, kalau ia tidak tinggal pada pokok anggur, demikian juga kamu tidak berbuah, jikalau kamu tidak tinggal di dalam Aku. Sebab di luar Aku kamu tidak dapat berbuat apa-apa.",
    refleksi: "Kesibukan duniawi seringkali membuat kita merasa lelah dan hampa ketika kita mengandalkan kekuatan diri sendiri. Yesus mengingatkan bahwa sumber kekuatan dan sukacita sejati hanya ada saat kita melekat erat pada-Nya melalui doa harian, sakramen Ekaristi, dan kerendahan hati.",
    doa: "Ya Yesus Pokok Anggur yang Benar, kuatkanlah persekutuan kami dengan-Mu. Jangan biarkan kami terpisah dari kasih-Mu, agar hidup kami senantiasa berbuah kebaikan bagi sesama. Amin."
  },
  {
    tema: "Ketenangan di Tengah Badai",
    perikop: "Markus 4:39-40",
    ayat: "Lalu Ia bangun, menghardik angin itu dan berkata kepada danau itu: 'Diam! Tenanglah!' Lalu angin itu reda dan danau itu menjadi sunyi senyap sekali. Lalu Ia berkata kepada mereka: 'Mengapa kamu begitu takut? Mengapa kamu tidak percaya?'",
    refleksi: "Terkadang badai persoalan hidup datang tanpa diduga—kesehatan, keluarga, maupun beban ekonomi. Namun ingatlah, Yesus selalu ada di perahu kehidupan kita. Ia tidak pernah meninggalkan kita; Ia mengundang kita untuk percaya bahwa kuasa dan pemeliharaan-Nya melampaui segala ketakutan kita.",
    doa: "Tuhan Yesus, ketika rasa cemas dan gelisah melanda hati kami, bimbinglah kami untuk memandang kepada-Mu dan percaya bahwa Engkau memegang kendali atas hidup kami. Berikanlah damai sejahtera-Mu. Amin."
  },
  {
    tema: "Kasih yang Menghidupkan",
    perikop: "1 Korintus 13:4-7",
    ayat: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia tidak melakukan yang tidak sopan dan tidak mencari keuntungan diri sendiri. Ia tidak pemarah dan tidak menyimpan kesalahan orang lain.",
    refleksi: "Kasih sejati bukanlah sekadar kata-kata manis, melainkan tindakan nyata berupa kesabaran, kerelaan mengampuni, dan kemurahan hati. Hari ini, mari kita mempraktikkan satu tindakan kasih tanpa pamrih kepada anggota keluarga atau sesama yang paling membutuhkan perhatian kita.",
    doa: "Allah Bapa Yang Mahakasih, penuhilah hati kami dengan Roh Kudus agar kami dimampukan untuk mengasihi sesama seperti Kristus telah mengasihi kami tanpa syarat. Amin."
  },
  {
    tema: "Jangan Kuatir akan Hidupmu",
    perikop: "Matius 6:33-34",
    ayat: "Tetapi carilah dahulu Kerajaan Allah dan kebenaran-Nya, maka semuanya itu akan ditambahkan kepadamu. Sebab itu janganlah kamu kuatir akan hari besok, karena hari besok mempunyai kesusahannya sendiri.",
    refleksi: "Kekuatiran tidak pernah menambah sehasta pun dalam jalan hidup kita, tetapi doa dan penyerahan diri menghadirkan kelegaan ilahi. Saat kita menempatkan Tuhan sebagai prioritas utama dalam setiap rencana kita, berkat dan jalan keluar akan Ia sediakan pada waktu-Nya yang terindah.",
    doa: "Bapa di Surga, kami menyerahkan segala rencana, keluarga, dan pekerjaan kami ke dalam tangan-Mu. Jauhkanlah kami dari rasa kuatir yang melumpuhkan, dan penuhilah kami dengan rasa syukur. Amin."
  },
  {
    tema: "Gembala yang Baik dan Murah Hati",
    perikop: "Mazmur 23:1-3",
    ayat: "TUHAN adalah gembalaku, takkan kekurangan aku. Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang; Ia menyegarkan jiwaku. Ia menuntun aku di jalan yang benar oleh karena nama-Nya.",
    refleksi: "Sebagai domba-domba gembalaan Kristus, kita tidak pernah berjalan sendirian. Bahkan di lembah yang paling kelam sekalipun, tongkat dan gada-Nya memberikan penghiburan. Mari kita mengawali hari ini dengan keyakinan penuh bahwa Gembala Agung kita senantiasa memelihara langkah kita.",
    doa: "Tuhan Yesus Gembala Jiwa kami, tuntunlah setiap langkah kami hari ini agar kami senantiasa berjalan di jalan kebenaran dan menikmati kesegaran rahmat-Mu. Amin."
  },
  {
    tema: "Kekuatan dalam Kelemahan",
    perikop: "2 Korintus 12:9",
    ayat: "Tetapi jawab Tuhan kepadaku: 'Cukuplah kasih karunia-Ku bagimu, sebab justru dalam kelemahanlah kuasa-Ku menjadi sempurna.' Sebab itu terlebih suka aku bermegah atas kelemahanku, supaya kuasa Kristus turun menaungi aku.",
    refleksi: "Saat kita merasa tidak berdaya, di situlah rahmat Tuhan bekerja paling nyata. Jangan berkecil hati atas keterbatasan diri kita; jadikan keterbatasan itu ruang bagi Tuhan untuk menyatakan kemuliaan dan keajaiban kuasa-Nya dalam hidup kita.",
    doa: "Tuhan Yang Mahabaik, dalam kelemahan dan keterbatasan kami, kami memohon rahmat-Mu yang mencukupkan. Kuatkanlah iman kami agar kami senantiasa bersandar hanya kepada-Mu. Amin."
  },
  {
    tema: "Melayani dengan Kerendahan Hati",
    perikop: "Markus 10:43-45",
    ayat: "Barangsiapa ingin menjadi besar di antara kamu, hendaklah ia menjadi pelayanmu, dan barangsiapa ingin menjadi yang terkemuka di antara kamu, hendaklah ia menjadi hamba untuk semuanya. Karena Anak Manusia juga datang bukan untuk dilayani, melainkan untuk melayani.",
    refleksi: "Kebesaran seorang murid Kristus diukur bukan dari kekuasaan atau pujian dunia, melainkan dari kesediaan untuk berlutut membasuh kaki sesama. Dalam keluarga, paroki, dan masyarakat, mari kita hadir sebagai pribadi yang siap menolong tanpa menuntut penghormatan.",
    doa: "Yesus yang lemah lembut dan rendah hati, bentuklah hati kami seperti hati-Mu. Ajarilah kami melayani dengan sukacita dan ketulusan tanpa mengharapkan balasan duniawi. Amin."
  },
  {
    tema: "Rahmat Pengampunan yang Membebaskan",
    perikop: "Kolose 3:12-13",
    ayat: "Kenakanlah belas kasihan, kemurahan, kerendahan hati, kelemahlembutan dan kesabaran. Sabarlah kamu seorang terhadap yang lain, dan ampunilah seorang akan yang lain jikalau yang seorang menaruh dendam terhadap yang lain, sama seperti Tuhan telah mengampuni kamu.",
    refleksi: "Menyimpan dendam adalah meminum racun dan berharap orang lain yang sakit. Pengampunan adalah kunci pembebasan hati kita sendiri. Sebagaimana Kristus telah mengampuni segala dosa kita di kayu salib, mari kita melepaskan pengampunan bagi mereka yang pernah melukai kita.",
    doa: "Bapa Yang Maharahim, mampukanlah hati kami untuk mengampuni sesama dengan tulus. Bersihkanlah batin kami dari segala kepahitan dan gantikanlah dengan sukacita Roh Kudus. Amin."
  },
  {
    tema: "Harta yang Abadi di Surga",
    perikop: "Matius 6:19-21",
    ayat: "Janganlah kamu mengumpulkan harta di bumi; di bumi ngengat dan karat merusakkannya dan pencuri membongkar serta mencurinya. Tetapi kumpulkanlah bagimu harta di sorga... Karena di mana hartamu berada, di situ juga hatimu berada.",
    refleksi: "Segala materi duniawi bersifat sementara, namun kasih, perbuatan baik, dan iman kepada Allah kekal selamanya. Mengumpulkan harta surgawi berarti menginvestasikan waktu dan kepedulian kita untuk membahagiakan orang lain dan memuliakan nama Tuhan.",
    doa: "Tuhan, bimbinglah hati kami agar tidak terikat pada hal-hal fana dunia ini, melainkan senantiasa merindukan kekayaan rohani dan kebenaran Kerajaan-Mu. Amin."
  },
  {
    tema: "Ketaatan Santa Maria Teladan Iman",
    perikop: "Lukas 1:38",
    ayat: "Kata Maria: 'Sesungguhnya aku ini adalah hamba Tuhan; jadilah padaku menurut perkataanmu itu.' Lalu malaikat itu meninggalkan dia.",
    refleksi: "Penyerahan diri Bunda Maria (Fiat Maria) adalah model ketaatan iman paling luhur. Di tengah ketidakpastian dan tantangan hidup, berserah pada kehendak Allah bukanlah tanda menyerah kalah, melainkan puncak iman bahwa rencana Allah selalu mendatangkan keselamatan.",
    doa: "Bunda Maria, Bunda Gereja dan teladan orang beriman, doakanlah kami agar memiliki hati yang senantiasa terbuka dan taat pada setiap kehendak Allah Bapa. Amin."
  },
  {
    tema: "Semangat Kerasulan Santo Andreas",
    perikop: "Yohanes 1:40-42",
    ayat: "Andreas, saudara Simon Petrus, adalah salah seorang dari kedua orang yang mendengar perkataan Yohanes lalu mengikut Yesus. Andreas mula-mula bertemu dengan Simon, saudaranya, dan ia berkata kepadanya: 'Kami telah menemukan Mesias.' Ia membawanya kepada Yesus.",
    refleksi: "Sebagai umat Paroki Santo Andreas Rasul, teladan pelindung kita sangat jelas: memperkenalkan sesama kepada Kristus. Menjadi pewarta kabar baik tidak harus berbicara di mimbar; teladan hidup rukun, senyuman yang ramah, dan uluran tangan kepada sesama adalah cara terindah membawa orang lain mengalami kasih Kristus.",
    doa: "Santo Andreas Rasul, pelindung paroki kami yang terkasih, doakanlah kami umatmu agar berani bersaksi tentang Kristus dan membawa keluarga serta sesama kami semakin dekat pada hati Yesus. Amin."
  },
  {
    tema: "Mendengarkan Firman dan Melakukannya",
    perikop: "Yakobus 1:22",
    ayat: "Tetapi hendaklah kamu menjadi pelaku firman dan bukan hanya pendengar saja; sebab jika tidak demikian kamu menipu diri sendiri.",
    refleksi: "Membaca dan mendengarkan firman Tuhan adalah awal, namun menjadikannya daging dalam perbuatan sehari-hari adalah puncak iman. Hari ini, biarlah setiap perkataan kita membangun dan setiap langkah kita mencerminkan ajaran Injil.",
    doa: "Tuhan Yesus, kobarkanlah semangat dalam hati kami untuk tidak hanya mengagumi firman-Mu, tetapi sungguh-sungguh melaksanakannya dalam tindakan kasih nyata. Amin."
  },
  {
    tema: "Damai Sejahtera Kutinggalkan Bagimu",
    perikop: "Yohanes 14:27",
    ayat: "Damai sejahtera Kutinggalkan bagimu. Damai sejahtera-Ku Kuberikan kepadamu, dan apa yang Kuberikan tidak seperti yang diberikan oleh dunia kepadamu. Janganlah gelisah dan gentar hatimu.",
    refleksi: "Dunia sering menawarkan ketenangan semu lewat kenyamanan materi, tetapi damai dari Kristus melampaui segala situasi hidup. Bahkan di tengah pergumulan terberat, damai Kristus menopang jiwa kita agar tetap teguh dan tenang.",
    doa: "Tuhan Yesus Raja Damai, curahkanlah damai sejahtera-Mu ke dalam keluarga kami, komunitas kami, dan hati kami yang seringkali gelisah. Engkaulah pengharapan kami. Amin."
  }
];

// Helper: Nama Hari & Bulan Bahasa Indonesia
const NAMA_HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const NAMA_BULAN = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

/**
 * Menghitung Day of Year (1 - 366) agar setiap tanggal kalender memiliki seed yang unik & konsisten
 */
function getDayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Format tanggal lengkap Indonesia: e.g. "Jumat, 7 Agustus 2026"
 */
function getFormattedToday(date = new Date()) {
  const hari = NAMA_HARI[date.getDay()];
  const tgl = date.getDate();
  const bln = NAMA_BULAN[date.getMonth()];
  const thn = date.getFullYear();
  return `${hari}, ${tgl} ${bln} ${thn}`;
}

/**
 * Mendapatkan Masa Liturgi sederhana berdasarkan tanggal
 */
function getLiturgicalSeasonInfo(date = new Date()) {
  const m = date.getMonth(); // 0 = Jan, 11 = Des
  const d = date.getDate();
  
  if (m === 11 && d >= 1 && d <= 24) return 'Masa Adven';
  if ((m === 11 && d >= 25) || (m === 0 && d <= 10)) return 'Masa Natal';
  if ((m === 2 || m === 3) && d < 20) return 'Masa Prapaskah / Paskah';
  return 'Masa Biasa';
}

/**
 * Mengambil renungan harian aktif:
 * 1. Cek Supabase table `renungan` (jika ada data spesifik tanggal hari ini)
 * 2. Fallback otomatis ke Katalog Siklus Harian (dijamin berganti tiap hari!)
 */
async function fetchTodayDevotion() {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  
  // 1. Coba ambil dari Supabase jika tersedia
  if (typeof db !== 'undefined') {
    try {
      const { data, error } = await db
        .from('renungan')
        .select('*')
        .eq('tanggal', todayStr)
        .eq('aktif', true)
        .maybeSingle();

      if (!error && data && data.tema) {
        return {
          source: 'paroki',
          tanggalFormatted: getFormattedToday(today),
          liturgi: data.liturgi || getLiturgicalSeasonInfo(today),
          tema: data.tema || data.judul,
          perikop: data.perikop || data.bacaan,
          ayat: data.ayat || data.kutipan_ayat,
          refleksi: data.refleksi || data.isi,
          doa: data.doa || 'Tuhan memberkati langkah dan karya kita hari ini. Amin.'
        };
      }
    } catch (e) {
      // fallback to internal catalog
    }
  }

  // 2. Gunakan Katalog Siklus Harian yang berganti otomatis setiap hari
  const dayOfYear = getDayOfYear(today);
  const index = dayOfYear % KATALOG_RENUNGAN.length;
  const item = KATALOG_RENUNGAN[index];

  return {
    source: 'kalender',
    tanggalFormatted: getFormattedToday(today),
    liturgi: getLiturgicalSeasonInfo(today),
    tema: item.tema,
    perikop: item.perikop,
    ayat: item.ayat,
    refleksi: item.refleksi,
    doa: item.doa
  };
}

/**
 * Render renungan ke elemen UI di index.html
 */
async function initDailyDevotion() {
  const container = document.getElementById('dailyDevotionContainer');
  if (!container) return;

  try {
    const devotion = await fetchTodayDevotion();
    
    container.innerHTML = `
      <div class="devotion-card h-full flex flex-col justify-between" id="devotionCard">
        <div>
          <!-- Header Tag -->
          <div class="mb-4 flex items-center justify-between flex-wrap gap-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-sm" style="background:rgba(201,168,76,0.18);border:1px solid rgba(201,168,76,0.35)">🕊️</div>
              <div>
                <div class="text-xs font-bold uppercase tracking-widest text-yellow-400/90 flex items-center gap-1.5">
                  <span>Renungan Harian</span>
                  <span class="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                </div>
                <div class="font-semibold text-white/80 text-xs mt-0.5" id="devotionDate">${devotion.tanggalFormatted}</div>
              </div>
            </div>
            <span class="text-[0.68rem] px-2.5 py-1 rounded-full font-medium" style="background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.7);border:1px solid rgba(255,255,255,0.1)">
              ${devotion.liturgi}
            </span>
          </div>

          <!-- Judul & Perikop -->
          <h4 class="text-yellow-300 font-bold text-lg lg:text-xl mb-1 font-serif leading-snug tracking-tight">
            ${devotion.tema}
          </h4>
          <p class="text-xs text-white/50 mb-3.5 italic font-medium flex items-center gap-1">
            <span>📖</span> Bacaan: ${devotion.perikop}
          </p>

          <!-- Ayat Emas Sabda -->
          <div class="my-3.5 pl-3.5 border-l-2 border-yellow-400/50 bg-white/[0.02] py-1.5 rounded-r-lg">
            <p class="devotion-verse text-sm lg:text-[0.95rem] text-white/90 leading-relaxed font-serif">
              "${devotion.ayat}"
            </p>
          </div>

          <!-- Refleksi Singkat -->
          <div class="mt-4 pt-3.5 border-t border-white/10">
            <p class="text-sm text-white/70 leading-relaxed">
              ${devotion.refleksi}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
          <button type="button" onclick="openDevotionModal()" class="inline-flex items-center gap-2 text-yellow-300 text-xs font-bold hover:text-yellow-200 transition-colors bg-white/5 hover:bg-white/10 px-3.5 py-2 rounded-lg border border-yellow-400/20">
            <span>🙏</span> Baca Doa Harian
          </button>
          <button type="button" onclick="copyDevotionShare()" class="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-xs font-semibold transition-colors bg-transparent hover:bg-white/5 px-3 py-2 rounded-lg" title="Salin renungan untuk dibagikan">
            <span id="copyIcon">📋</span> <span id="copyText">Bagikan Sabda</span>
          </button>
        </div>
      </div>
    `;

    // Simpan data di global window untuk modal & share
    window._currentDevotion = devotion;
    ensureDevotionModal();

  } catch (e) {
    console.error('Error rendering devotion:', e);
  }
}

/**
 * Modal untuk menampilkan Doa & Refleksi Harian Lengkap
 */
function ensureDevotionModal() {
  if (document.getElementById('devotionModal')) return;

  const modalHtml = `
    <div id="devotionModal" class="modal-overlay" style="z-index:99999;">
      <div class="modal-box" style="max-width:540px;border-radius:24px;">
        <div class="modal-head" style="background:var(--surface);">
          <div class="modal-head-title" style="display:flex;align-items:center;gap:0.5rem;font-size:1.05rem;">
            <span>🕊️</span> Doa &amp; Refleksi Harian
          </div>
          <button class="modal-close" onclick="closeDevotionModal()">✕</button>
        </div>
        <div class="modal-body" style="padding:1.5rem 1.75rem;">
          <div id="modalDevotionContent"></div>
        </div>
        <div class="modal-foot" style="display:flex;gap:0.75rem;justify-content:flex-end;">
          <button type="button" class="btn btn-ghost" onclick="closeDevotionModal()">Tutup</button>
          <button type="button" class="btn btn-primary" onclick="copyDevotionShare();closeDevotionModal();">
            <span>📋</span> Bagikan Sabda
          </button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openDevotionModal() {
  const modal = document.getElementById('devotionModal');
  const content = document.getElementById('modalDevotionContent');
  const d = window._currentDevotion;
  if (!modal || !content || !d) return;

  content.innerHTML = `
    <div class="mb-3">
      <div class="text-xs font-bold uppercase tracking-wider text-amber-600">${d.tanggalFormatted} · ${d.liturgi}</div>
      <h3 class="text-xl font-bold text-gray-900 mt-1 font-serif">${d.tema}</h3>
      <div class="text-xs text-gray-500 italic mt-0.5">Bacaan: ${d.perikop}</div>
    </div>

    <div class="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 my-4">
      <p class="text-sm text-amber-950 font-serif italic leading-relaxed">"${d.ayat}"</p>
    </div>

    <div class="text-sm text-gray-700 leading-relaxed space-y-3 mb-5">
      <p>${d.refleksi}</p>
    </div>

    <div class="p-4 rounded-xl bg-gray-50 border border-gray-200">
      <h4 class="font-bold text-xs uppercase tracking-wider text-gray-800 mb-1.5 flex items-center gap-1.5">
        <span>🙏</span> Doa Harian
      </h4>
      <p class="text-sm text-gray-700 leading-relaxed italic font-serif">
        "${d.doa}"
      </p>
    </div>
  `;

  modal.classList.add('open');
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
}

function closeDevotionModal() {
  const modal = document.getElementById('devotionModal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
}

/**
 * Salin teks renungan ke clipboard untuk dibagikan ke WhatsApp / Media Sosial
 */
async function copyDevotionShare() {
  const d = window._currentDevotion;
  if (!d) return;

  const textToShare = `🕊️ *RENUNGAN HARIAN KATOLIK*\n*Paroki Santo Andreas Rasul Marga Agung*\n📅 ${d.tanggalFormatted} (${d.liturgi})\n\n📖 *${d.tema}*\n_Bacaan: ${d.perikop}_\n\n"${d.ayat}"\n\n💡 *Refleksi:*\n${d.refleksi}\n\n🙏 *Doa:*\n"${d.doa}"\n\n✨ Berkah Dalem — ${window.location.origin}`;

  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(textToShare);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = textToShare;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }

    const copyText = document.getElementById('copyText');
    const copyIcon = document.getElementById('copyIcon');
    if (copyText && copyIcon) {
      copyText.textContent = 'Tersalin!';
      copyIcon.textContent = '✅';
      setTimeout(() => {
        copyText.textContent = 'Bagikan Sabda';
        copyIcon.textContent = '📋';
      }, 2500);
    }

    if (typeof showToast === 'function') {
      showToast('Renungan harian berhasil disalin ke clipboard!', 'success');
    }
  } catch (err) {
    alert('Sabda hari ini telah disalin!');
  }
}

// Auto-run on DOM Ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDailyDevotion);
} else {
  initDailyDevotion();
}
