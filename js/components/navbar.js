class ModernNavbar extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        const activePage = this.getAttribute('active-page') || 'index.html';

        const links = [
            { href: 'index.html',   text: 'Beranda',     icon: '🏠' },
            { href: 'profil.html',  text: 'Profil',      icon: '📖' },
            { href: 'stasi.html',   text: 'Stasi',       icon: '⛪' },
            { href: 'galeri.html',  text: 'Galeri',      icon: '🖼️' },
            { href: 'jadwal.html',  text: 'Jadwal Misa', icon: '📅' },
            { href: 'kontak.html',  text: 'Kontak',      icon: '✉️' }
        ];

        let desktopLinks = '', mobileLinks = '';
        links.forEach(link => {
            const isActive = activePage === link.href;
            desktopLinks += `<li><a href="${link.href}" class="nav-link${isActive ? ' active' : ''}">${link.text}</a></li>`;
            mobileLinks  += `<a href="${link.href}" class="nav-link${isActive ? ' active' : ''} flex items-center gap-3 px-2 py-3">${link.icon} ${link.text}</a>`;
        });

        this.innerHTML = `
        <nav id="main-nav" class="glass-nav sticky top-0 z-50 w-full px-5 py-3.5">
            <div class="max-w-7xl mx-auto flex items-center justify-between">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-3 no-underline">
                    <div class="w-9 h-9 rounded-xl flex items-center justify-center text-base" style="background:rgba(184,134,11,0.12);border:1px solid rgba(184,134,11,0.25);color:#B8860B">✝</div>
                    <div>
                        <div class="nav-logo-text">Paroki Marga Agung</div>
                        <div class="nav-logo-sub">Santo Andreas Rasul</div>
                    </div>
                </a>

                <!-- Desktop Links -->
                <ul class="hidden md:flex items-center gap-7 font-medium list-none">
                    ${desktopLinks}
                </ul>

                <!-- CTA + Hamburger -->
                <div class="flex items-center gap-3">
                    <a href="jadwal.html" class="hidden md:inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300" style="background:rgba(184,134,11,0.1);color:#B8860B;border:1px solid rgba(184,134,11,0.25)">
                        📅 Jadwal Misa
                    </a>
                    <button id="hamburger-btn" class="md:hidden flex flex-col gap-1.5 p-2 rounded-xl hover:bg-black/5 transition-colors" aria-label="Menu">
                        <span class="ham-line block w-5 h-0.5 rounded-full transition-all duration-300" style="background:#111"></span>
                        <span class="ham-line block w-5 h-0.5 rounded-full transition-all duration-300" style="background:#111"></span>
                        <span class="ham-line block w-5 h-0.5 rounded-full transition-all duration-300" style="background:#111"></span>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <div id="mobile-menu" class="md:hidden">
                ${mobileLinks}
            </div>
        </nav>
        `;

        // Hamburger toggle
        const btn   = this.querySelector('#hamburger-btn');
        const menu  = this.querySelector('#mobile-menu');
        const lines = this.querySelectorAll('.ham-line');
        btn?.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            if (open) {
                lines[0].style.transform = 'translateY(8px) rotate(45deg)';
                lines[1].style.opacity   = '0';
                lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                lines.forEach(l => { l.style.transform = ''; l.style.opacity = ''; });
            }
        });

        // Scroll-aware nav
        const nav = this.querySelector('#main-nav');
        const onScroll = () => {
            if (window.scrollY > 60) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}

customElements.define('modern-navbar', ModernNavbar);
