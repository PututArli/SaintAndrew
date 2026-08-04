const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/omk_parokimargaagung?igsh=MW4wODZ0dTRjZGkwZA==",
    youtube:   "https://youtube.com/@parokisantoandreasrasulmar119?si=g3ct2ltcxme66UYq"
};

class ModernFooter extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <footer class="site-footer">
            <div class="max-w-7xl mx-auto px-6 py-12">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
                    <!-- Brand -->
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 flex items-center justify-center text-xl text-yellow-300">✝</div>
                            <div>
                                <div class="font-bold text-white text-lg leading-tight" style="font-family:'Inter',sans-serif;letter-spacing:-0.02em">Paroki Marga Agung</div>
                                <div class="text-xs text-white/50 tracking-widest uppercase">Santo Andreas Rasul</div>
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed text-white/55 max-w-xs">
                            Melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.
                        </p>
                        <div class="flex gap-3 mt-5">
                            <a href="${SOCIAL_LINKS.instagram}" target="_blank" class="footer-social-btn" title="Instagram">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="${SOCIAL_LINKS.youtube}" target="_blank" class="footer-social-btn" title="YouTube">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="text-white font-semibold text-sm tracking-widest uppercase mb-4 opacity-90">Navigasi</h4>
                        <ul class="space-y-2.5">
                            ${[
                                ['index.html','Beranda'],
                                ['profil.html','Profil Paroki'],
                                ['stasi.html','Daftar Stasi'],
                                ['galeri.html','Galeri Foto'],
                                ['jadwal.html','Jadwal Misa'],
                                ['kontak.html','Hubungi Kami']
                            ].map(([href, label]) =>
                                `<li><a href="${href}" class="text-sm text-white/55 hover:text-white transition-colors duration-200 flex items-center gap-2">
                                    <span class="text-yellow-500/60 text-xs">›</span> ${label}
                                </a></li>`
                            ).join('')}
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="text-white font-semibold text-sm tracking-widest uppercase mb-4 opacity-90">Kontak</h4>
                        <ul class="space-y-3 text-sm text-white/55">
                            <li class="flex items-start gap-3">
                                <span class="mt-0.5 text-yellow-400/70">📍</span>
                                <span>Jl. Margo Agung, Marga Kaya, Jati Agung, Lampung Selatan 35365</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-yellow-400/70">📞</span>
                                <span>(0721) 755300</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-yellow-400/70">✉️</span>
                                <a href="mailto:parokimargaagung@gmail.com" class="hover:text-white transition-colors break-all">parokimargaagung@gmail.com</a>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="mt-0.5 text-yellow-400/70">🕐</span>
                                <span>Sen–Jum: 08:00–15:00<br>Sab–Min: 08:00–12:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom bar -->
                <div class="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
                    <span>© 2026 Paroki Santo Andreas Rasul Marga Agung. Hak cipta dilindungi.</span>
                    <span class="flex items-center gap-1">Dibangun dengan <span class="text-red-400">♥</span> untuk umat</span>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('modern-footer', ModernFooter);
