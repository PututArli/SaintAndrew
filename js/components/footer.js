class ModernFooter extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        const content = (typeof window.getSiteContent === 'function' ? window.getSiteContent() : null) || window.SA_SITE_CONTENT_DEFAULTS || {};
        const brand = content.brand || {};
        const footer = content.footer || {};
        this.innerHTML = `
        <footer class="site-footer">
            <div class="max-w-7xl mx-auto px-6 py-14">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

                    <!-- Brand -->
                    <div>
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base" style="background:rgba(184,134,11,0.15);border:1px solid rgba(184,134,11,0.25);color:#D4A017">✝</div>
                            <div>
                                <div class="font-bold text-white text-base leading-tight" id="footer-brand-name" style="font-family:'Inter',sans-serif;letter-spacing:-0.02em">Paroki Margo Agung</div>
                                <div class="text-xs tracking-widest uppercase" id="footer-brand-subtitle" style="color:rgba(255,255,255,0.4)">Santo Andreas Rasul</div>
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed" id="footer-description" style="color:rgba(255,255,255,0.45);max-width:260px">
                            Melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.
                        </p>
                        <div class="flex gap-2.5 mt-5">
                            <a href="https://www.instagram.com/omk_parokimargaagung?igsh=MW4wODZ0dTRjZGkwZA==" target="_blank" rel="noopener" class="footer-social-btn" title="Instagram" id="footer-instagram">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                            </a>
                            <a href="https://youtube.com/@parokisantoandreasrasulmar119?si=g3ct2ltcxme66UYq" target="_blank" rel="noopener" class="footer-social-btn" title="YouTube" id="footer-youtube">
                                <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </a>
                        </div>
                    </div>

                    <!-- Jadwal Misa -->
                    <div>
                        <h4 class="font-semibold text-sm tracking-widest uppercase mb-5" style="color:rgba(255,255,255,0.55)">Jadwal Misa Gereja Paroki</h4>
                        <ul id="footer-misa-list" class="space-y-3.5 list-none">
                            <li class="flex items-center gap-3 opacity-50">
                                <div class="w-1.5 h-1.5 rounded-full" style="background:rgba(184,134,11,0.7)"></div>
                                <div class="text-sm">Memuat jadwal...</div>
                            </li>
                        </ul>
                    </div>

                    <!-- Contact -->
                    <div>
                        <h4 class="font-semibold text-sm tracking-widest uppercase mb-5" style="color:rgba(255,255,255,0.55)">Kontak</h4>
                        <ul class="space-y-3.5 text-sm list-none" style="color:rgba(255,255,255,0.45)">
                            <li class="flex items-start gap-3">
                                <span class="mt-1" style="color:rgba(184,134,11,0.7)">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </span>
                                <span id="footer-address">Jl. Margo Agung, Marga Kaya, Jati Agung, Lampung Selatan 35365</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span style="color:rgba(184,134,11,0.7)">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </span>
                                <span id="footer-phone">(0721) 1234567</span>
                            </li>
                            <li class="flex items-center gap-3">
                                <span style="color:rgba(184,134,11,0.7)">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </span>
                                <a href="mailto:parokimargaagung@gmail.com" id="footer-email" class="transition-colors break-all" style="color:rgba(255,255,255,0.45)" onmouseover="this.style.color='rgba(255,255,255,0.85)'" onmouseout="this.style.color='rgba(255,255,255,0.45)'">parokimargaagung@gmail.com</a>
                            </li>
                            <li class="flex items-start gap-3">
                                <span class="mt-1" style="color:rgba(184,134,11,0.7)">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </span>
                                <span id="footer-hours">Sen–Jum: 08:00–15:00<br>Sab–Min: 08:00–12:00</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- Bottom bar -->
                <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style="border-top:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.28)">
                    <span id="footer-copyright">© 2026 Paroki Santo Andreas Rasul Margo Agung.</span>
                    <div class="flex items-center gap-3">
                        <span class="flex items-center gap-1.5" id="footer-tagline">Dibuat oleh umat dan untuk umat</span>
                        <button id="adminPortalTrigger" class="text-[11px] opacity-20 hover:opacity-100 transition-opacity flex items-center gap-1 cursor-pointer bg-transparent border-0 p-1" style="color:rgba(255,255,255,0.6)" title="Akses Admin">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </footer>

        <!-- ═══════════════════════════════════════════
             MODAL MASUK ADMIN (CLEAN & DIGNIFIED)
        ═══════════════════════════════════════════ -->
        <div id="secretAdminModal" class="fixed inset-0 z-[9999] hidden items-center justify-center p-4" style="display:none !important;background:rgba(0,0,0,0.6);backdrop-filter:blur(6px)">
            <div class="relative w-full max-w-[380px] rounded-2xl p-7 text-left shadow-xl" style="background:#FFFFFF;border:1px solid rgba(0,0,0,0.08)">
                <!-- Close Button -->
                <button id="closeSecretModal" class="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-sm text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors" style="background:transparent;border:none;cursor:pointer">✕</button>

                <!-- Header -->
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-xl flex items-center justify-center text-base text-white" style="background:#1C1C1E">✝</div>
                    <div>
                        <h3 class="text-base font-bold text-gray-900 leading-tight">Masuk Admin</h3>
                        <p class="text-xs text-gray-500 mt-0.5">Paroki Margo Agung</p>
                    </div>
                </div>

                <div id="secretErrorBox" class="hidden mb-4 p-3 rounded-xl text-xs bg-red-50 border border-red-200 text-red-700 items-center gap-2">
                    <span id="secretErrorMsg">Email atau kata sandi salah.</span>
                </div>

                <!-- Form Login -->
                <div id="secretLoginFormWrap">
                    <form id="secretLoginForm" class="space-y-4" autocomplete="off">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Email</label>
                            <input id="secretEmail" type="email" required placeholder="admin@paroki.com" class="w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" style="background:#F9F9F8;border:1.5px solid #E5E5E3">
                        </div>

                        <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-1.5">Kata Sandi</label>
                            <input id="secretPassword" type="password" required placeholder="••••••••" class="w-full px-3.5 py-2.5 rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none transition-all" style="background:#F9F9F8;border:1.5px solid #E5E5E3">
                        </div>

                        <button id="secretSubmitBtn" type="submit" class="w-full py-2.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 mt-2 cursor-pointer transition-all duration-150" style="background:#1C1C1E;border:none">
                            <span id="secretBtnText">Masuk</span>
                        </button>
                    </form>
                </div>

                <!-- Logged In View -->
                <div id="secretLoggedInWrap" class="hidden text-center py-2">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-bold" style="background:#ECFDF5;color:#059669">✓</div>
                    <h4 class="font-bold text-gray-900 text-sm">Sesi Admin Aktif</h4>
                    <p id="secretLoggedInEmail" class="text-xs text-gray-500 mt-1 mb-5">admin@paroki.com</p>
                    <div class="flex gap-2">
                        <a href="admin/dashboard.html" class="flex-1 py-2.5 rounded-xl font-semibold text-xs text-white text-center flex items-center justify-center gap-1.5 transition-all" style="background:#1C1C1E;text-decoration:none">
                            Buka Dashboard
                        </a>
                        <button id="secretLogoutBtn" type="button" class="px-4 py-2.5 rounded-xl font-semibold text-xs transition-all" style="background:#FEF2F2;color:#DC2626;border:1px solid rgba(220,38,38,0.15);cursor:pointer">
                            Keluar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Floating Quick Return Pill for Logged-In Admins (Clean Bottom-Left Position) -->
        <div id="adminQuickPill" class="fixed bottom-[5.25rem] left-3 md:bottom-5 md:left-6 z-[9990] hidden items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-2xl transition-all duration-200" style="background:rgba(16,16,18,0.92);backdrop-filter:blur(10px);border:1px solid rgba(184,134,11,0.35);box-shadow:0 8px 30px rgba(0,0,0,0.45)">
            <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0"></span>
            <a href="admin/dashboard.html" class="text-xs font-semibold text-white hover:text-[#D4A017] transition-colors flex items-center gap-1" style="text-decoration:none">
                <span>Mode Admin</span> <span class="text-gray-400 font-normal hidden sm:inline">| Buka Dashboard ›</span>
            </a>
            <button type="button" onclick="document.getElementById('adminQuickPill').style.display='none'" class="text-gray-400 hover:text-white ml-1 text-xs px-1 rounded transition-colors" title="Sembunyikan">✕</button>
        </div>
        `;

        if (typeof window.loadSiteContent === 'function') {
            window.loadSiteContent().then(() => {
                const latest = window.getSiteContent ? window.getSiteContent() : content;
                const latestBrand = latest.brand || {};
                const latestFooter = latest.footer || {};

                const brandNameEl = this.querySelector('#footer-brand-name');
                const brandSubEl = this.querySelector('#footer-brand-subtitle');
                const descEl = this.querySelector('#footer-description');
                const instagramEl = this.querySelector('#footer-instagram');
                const youtubeEl = this.querySelector('#footer-youtube');
                const addressEl = this.querySelector('#footer-address');
                const phoneEl = this.querySelector('#footer-phone');
                const emailEl = this.querySelector('#footer-email');
                const hoursEl = this.querySelector('#footer-hours');
                const copyrightEl = this.querySelector('#footer-copyright');
                const taglineEl = this.querySelector('#footer-tagline');

                if (brandNameEl) brandNameEl.textContent = latestBrand.name || 'Paroki Santo Andreas Rasul';
                if (brandSubEl) brandSubEl.textContent = latestBrand.subtitle || 'Santo Andreas Rasul';
                if (descEl) descEl.textContent = latestFooter.description || brand.description || 'Melayani umat dengan penuh kasih, membangun persaudaraan sejati, dan menghidupi sabda Tuhan.';
                if (instagramEl && (latestBrand.instagram || latestFooter.instagram)) instagramEl.href = latestBrand.instagram || latestFooter.instagram;
                if (youtubeEl && (latestBrand.youtube || latestFooter.youtube)) youtubeEl.href = latestBrand.youtube || latestFooter.youtube;
                if (addressEl) addressEl.textContent = latestFooter.address || 'Jl. Margo Agung, Marga Kaya, Jati Agung, Lampung Selatan 35365';
                if (phoneEl) phoneEl.textContent = latestFooter.phone || '(0721) 1234567';
                if (emailEl) {
                    const email = latestFooter.email || 'parokimargaagung@gmail.com';
                    emailEl.textContent = email;
                    emailEl.href = `mailto:${email}`;
                }
                if (hoursEl) hoursEl.innerHTML = latestFooter.hours || 'Sen–Jum: 08:00–15:00<br>Sab–Min: 08:00–12:00';
                if (copyrightEl) copyrightEl.textContent = latestFooter.copyright || '© 2026 Paroki Santo Andreas Rasul Margo Agung.';
                if (taglineEl) taglineEl.textContent = latestFooter.tagline || 'Dibuat oleh umat dan untuk umat';
            }).catch(() => {});
        }

        this.initAdminPortal();
        this.loadFooterSchedule();
    }

    async loadFooterSchedule() {
        const listEl = this.querySelector('#footer-misa-list');
        if (!listEl) return;
        
        try {
            const client = await this.getClient();
            if (!client || !client.from) return;
            
            const { data, error } = await client.from('jadwal_misa')
                .select('*')
                .eq('stasi', 'margo-agung')
                .order('urutan');
                
            if (error || !data || data.length === 0) {
                listEl.innerHTML = `<li class="text-sm" style="color:rgba(255,255,255,0.45)">Belum ada data jadwal.</li>`;
                return;
            }
            
            let html = '';
            // Tampilkan maksimal 2 jadwal utama agar tidak terlalu panjang
            const displayData = data.slice(0, 2);
            
            displayData.forEach(j => {
                const label = j.kategori === 'harian' ? `Misa Harian (${j.hari})` : j.hari;
                html += `
                    <li class="flex items-center gap-3">
                        <div class="w-1.5 h-1.5 rounded-full" style="background:rgba(184,134,11,0.7)"></div>
                        <div class="text-sm">
                            <span class="block font-medium" style="color:rgba(255,255,255,0.85)">${label}</span>
                            <span style="color:rgba(255,255,255,0.45)">${j.waktu}</span>
                        </div>
                    </li>
                `;
            });
            
            // Link ke halaman jadwal full
            html += `
                <li class="flex items-center gap-3 mt-4 pt-4" style="border-top:1px solid rgba(255,255,255,0.05)">
                    <a href="jadwal.html" class="text-xs font-semibold uppercase tracking-wider transition-colors" style="color:rgba(184,134,11,0.9)" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(184,134,11,0.9)'">
                        Lihat Seluruh Jadwal &rarr;
                    </a>
                </li>
            `;
            
            listEl.innerHTML = html;
        } catch (e) {
            console.warn('Footer schedule fetch note:', e);
            listEl.innerHTML = `<li class="text-sm" style="color:rgba(255,255,255,0.45)">Gagal memuat jadwal.</li>`;
        }
    }

    async getClient() {
        if (window.db && !window.db.__isFallback) return window.db;

        try {
            if (!window.supabase && typeof document !== 'undefined') {
                await new Promise((res) => {
                    const s = document.createElement('script');
                    s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
                    s.onload = res;
                    s.onerror = res;
                    document.head.appendChild(s);
                });
            }

            if (typeof window.initSupabaseClient === 'function') {
                return window.initSupabaseClient();
            }

            if (window.supabase && typeof window.supabase.createClient === 'function') {
                window.db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON);
            }
        } catch (e) {
            console.warn('Footer Supabase client note:', e);
        }

        return window.db;
    }

    async initAdminPortal() {
        const modal = document.getElementById('secretAdminModal');
        const trigger = document.getElementById('adminPortalTrigger');
        const closeBtn = document.getElementById('closeSecretModal');
        const form = document.getElementById('secretLoginForm');
        const formWrap = document.getElementById('secretLoginFormWrap');
        const loggedInWrap = document.getElementById('secretLoggedInWrap');
        const loggedInEmail = document.getElementById('secretLoggedInEmail');
        const logoutBtn = document.getElementById('secretLogoutBtn');
        const quickPill = document.getElementById('adminQuickPill');
        const errBox = document.getElementById('secretErrorBox');
        const errMsg = document.getElementById('secretErrorMsg');
        const btn = document.getElementById('secretSubmitBtn');
        const btnText = document.getElementById('secretBtnText');

        let currentSession = null;

        const checkSession = async () => {
            try {
                const client = await this.getClient();
                const { data: { session } } = await client.auth.getSession();
                currentSession = session;
                if (session && session.user) {
                    if (quickPill) {
                        quickPill.classList.remove('hidden');
                        quickPill.classList.add('flex');
                    }
                    if (formWrap) formWrap.classList.add('hidden');
                    if (loggedInWrap) loggedInWrap.classList.remove('hidden');
                    if (loggedInEmail) loggedInEmail.textContent = session.user.email;
                } else {
                    if (quickPill) {
                        quickPill.classList.add('hidden');
                        quickPill.classList.remove('flex');
                    }
                    if (formWrap) formWrap.classList.remove('hidden');
                    if (loggedInWrap) loggedInWrap.classList.add('hidden');
                }
            } catch (e) {
                // Ignore silent errors
            }
        };

        checkSession();

        const openPortal = async () => {
            await checkSession();
            if (currentSession) {
                // Jika sudah login, langsung lompat ke dashboard!
                window.location.href = 'admin/dashboard.html';
                return;
            }
            if (typeof window.lockBodyScroll === 'function') {
                window.lockBodyScroll();
            } else {
                document.body.classList.add('modal-open');
                document.body.style.overflow = 'hidden';
            }
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            modal.style.setProperty('display', 'flex', 'important');
            modal.style.setProperty('pointer-events', 'auto', 'important');
            document.getElementById('secretEmail').focus();
        };

        const closePortal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            modal.style.setProperty('display', 'none', 'important');
            modal.style.setProperty('pointer-events', 'none', 'important');
            if (typeof window.unlockBodyScroll === 'function') {
                window.unlockBodyScroll();
            } else {
                document.body.classList.remove('modal-open');
                document.body.style.overflow = '';
            }
            errBox.classList.add('hidden');
            errBox.classList.remove('flex');
        };

        if (trigger) trigger.addEventListener('click', openPortal);
        if (closeBtn) closeBtn.addEventListener('click', closePortal);

        // Shortcut keyboard: Ctrl + Shift + A (atau Cmd + Shift + A di Mac)
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
                e.preventDefault();
                openPortal();
            }
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                closePortal();
            }
        });

        // Close on backdrop click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closePortal();
        });

        // Logout handler
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                const client = await this.getClient();
                await client.auth.signOut();
                currentSession = null;
                checkSession();
                closePortal();
            });
        }

        // Focus style helper
        ['secretEmail', 'secretPassword'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('focus', () => {
                    el.style.borderColor = '#1C1C1E';
                    el.style.background = '#FFFFFF';
                });
                el.addEventListener('blur', () => {
                    el.style.borderColor = '#E5E5E3';
                    el.style.background = '#F9F9F8';
                });
            }
        });

        // Form Submit
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('secretEmail').value.trim();
                const password = document.getElementById('secretPassword').value;

                errBox.classList.add('hidden');
                errBox.classList.remove('flex');
                btn.disabled = true;
                btnText.textContent = 'Memverifikasi...';

                try {
                    const client = await this.getClient();
                    const { data, error } = await client.auth.signInWithPassword({ email, password });

                    if (error) {
                        errMsg.textContent = 'Email atau kata sandi salah.';
                        errBox.classList.remove('hidden');
                        errBox.classList.add('flex');
                        btn.disabled = false;
                        btnText.textContent = 'Masuk';
                        return;
                    }

                    btnText.textContent = 'Berhasil! Mengalihkan...';

                    setTimeout(() => {
                        window.location.href = 'admin/dashboard.html';
                    }, 400);

                } catch (err) {
                    errMsg.textContent = err.message || 'Terjadi kesalahan saat masuk.';
                    errBox.classList.remove('hidden');
                    errBox.classList.add('flex');
                    btn.disabled = false;
                    btnText.textContent = 'Masuk';
                }
            });
        }
    }
}

if (!customElements.get('modern-footer')) {
    customElements.define('modern-footer', ModernFooter);
}

