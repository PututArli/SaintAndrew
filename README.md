# 🏛️ Paroki Santo Andreas Rasul - Marga Agung

## 📁 Struktur Proyek (Modern Modular)

Website ini menggunakan arsitektur **Web Components** untuk efisiensi pemeliharaan kode pada bagian navigasi dan footer.

```
/UTPPemWeb (Root)
│
├── assets/
│   ├── img/
│   │   ├── stasi/          # Foto gereja tiap stasi (High-res)
│   │   └── ui/             # Ikon, background, dan elemen UI
│   └── crossIcon.png       # Favicon website
│
├── css/
│   └── style.css           # Stylesheet utama & animasi custom
│
├── js/
│   ├── components/         # 🧩 Komponen Reusable (Web Components)
│   │   ├── navbar.js       # Logika Navigasi (Edit menu di sini)
│   │   └── footer.js       # Logika Footer & Sosmed (Edit link di sini)
│   └── script.js           # JavaScript utama & interaksi modal
│
├── index.html              # Halaman Beranda
├── jadwal.html             # Halaman Jadwal Misa
├── kontak.html             # Halaman Kontak
├── profil.html             # Halaman Profil Paroki
├── stasi.html              # Halaman Daftar Stasi
├── .gitignore
└── README.md
```

## 🏗️ Fitur Arsitektur Baru

### 🧩 Reusable Components
Untuk mempermudah pembaruan, bagian **Navbar** dan **Footer** kini dipisahkan ke dalam file JavaScript tersendiri menggunakan standar *Web Components*.

*   **Mengedit Menu Navigasi:** Buka `js/components/navbar.js`. Cukup edit array `links` dan semua halaman otomatis terupdate.
*   **Mengedit Link Sosmed:** Buka `js/components/footer.js`. Cukup ganti nilai dalam objek `SOCIAL_LINKS` di bagian paling atas file.

## 🌐 Halaman

| Halaman         | Deskripsi                                                   |
| --------------- | ----------------------------------------------------------- |
| **Beranda**     | Landing page dengan sapaan otomatis, pengumuman, dan galeri |
| **Profil**      | Sejarah lengkap Paroki Marga Agung                          |
| **Stasi**       | Daftar 9 stasi dengan modal sejarah interaktif & efek 3D    |
| **Jadwal Misa** | Jadwal perayaan Ekaristi dan pelayanan sakramen             |
| **Kontak**      | Informasi sekretariat dan formulir kontak interaktif        |

## 🛠️ Teknologi

- **HTML5** — Semantic markup & Web Components
- **TailwindCSS** (via CDN) — Utility-first styling
- **Vanilla CSS** — Custom glassmorphism & page transitions
- **Vanilla JavaScript** — DOM manipulation & specialized components

## 👤 Pembuat

**Rafael Putut Arli** — 2417051042  
Tugas UTP Pemrograman Web — Universitas Lampung

---

_© 2026 Paroki Santo Andreas Rasul Marga Agung_

