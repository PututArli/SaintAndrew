const SOCIAL_LINKS = {
    instagram: "https://www.instagram.com/omk_parokimargaagung?igsh=MW4wODZ0dTRjZGkwZA==",
    youtube:   "https://youtube.com/@parokisantoandreasrasulmar119?si=g3ct2ltcxme66UYq"
};

class ModernFooter extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        this.innerHTML = `
        <footer class="site-footer">
            <div class="max-w-7xl mx-auto px-6 py-14">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    <!-- Brand -->
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base" style="background:rgba(184,134,11,0.15);border:1px solid rgba(184,134,11,0.25);color:#D4A017">✝</div>
                            <div>
                                <div class="font-bold text-white text-base leading-tight" style="font-family:'Inter',sans-serif;letter-spacing:-0.02em">Paroki Marga Agung</div>
                                <div class="text-xs tracking-widest uppercase" style="color:rgba(255,255,255,0.4)">Santo Andreas Rasul</div>
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed" style="color:rgba(255,255,255,0.45);max-width:260px">
                            Melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.
                        </p>
                        <div class="flex gap-2.5 mt-5">
                            <a href="${SOCIAL_LINKS.instagram}" target="_blank" rel="noopener" class="footer-social-btn" title="Instagram">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="${SOCIAL_LINKS.youtube}" target="_blank" rel="noopener" class="footer-social-btn" title="YouTube">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Quick Links -->
                    <div>
                        <h4 class="font-semibold text-sm tracking-widest uppercase mb-5" style="color:rgba(255,255,255,0.55)">Navigasi</h4>
                        <ul class="space-y-2.5 list-none">
                            ${[
                                ['index.html','Beranda'],
                                ['profil.html','Profil Paroki'],
                                ['stasi.html','Daftar Stasi'],
                                ['galeri.html','Galeri Foto'],
                                ['jadwal.html','Jadwal Misa'],
                                ['kontak.html','Hubungi Kami']
                            ].map(([href, label]) =>
                                `<li><a href="${href}" class="text-sm flex items-center gap-2 transition-colors duration-200" style="color:rgba(255,255,255,0.45)" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">
                                    <span style="color:rgba(184,134,11,0.7);font-size:0.65rem">›</span> ${label}
                                </a></li>`
                            ).join('')}
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="font-semibold text-sm tracking-widest uppercase mb-5" style="color:rgba(255,255,255,0.55)">Kontak</h4>
                        <ul class="space-y-3.5 text-sm list-none" style="color:rgba(255,255,255,0.45)">
                            <li class="flex items-start gap-3">
                                <span class="mt-0.5" style="color:rgba(184,134,11,0.7)">📍</span>
                                <span>Jl. Margo Agung, Marga Kaya, Jati Agung, Lampung Selatan 35365</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span style="color:rgba(184,134,11,0.7)">📞</span>
                                <span>(0721) 755300</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span style="color:rgba(184,134,11,0.7)">✉️</span>
                                <a href="mailto:parokimargaagung@gmail.com" class="transition-colors break-all" style="color:rgba(255,255,255,0.45)" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">parokimargaagung@gmail.com</a>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="mt-0.5" style="color:rgba(184,134,11,0.7)">🕐</span>
                                <span>Sen–Jum: 08:00–15:00<br>Sab–Min: 08:00–12:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom bar -->
                <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style="border-top:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.28)">
                    <span>© 2026 Paroki Santo Andreas Rasul Marga Agung.</span>
                    <span class="flex items-center gap-1.5">Dibuat dengan <span style="color:#B8860B">♥</span> untuk umat paroki</span>
                </div>
            </div>
        </footer>
        `;
    }
}

customElements.define('modern-footer', ModernFooter);
