class ModernNavbar extends HTMLElement {
    constructor() { super(); }

    connectedCallback() {
        const activePage = this.getAttribute('active-page') || 'index.html';

        const links = [
            { href: 'index.html',   text: 'Beranda',     icon: '🏠' },
            { href: 'profil.html',  text: 'Profil',      icon: '📖' },
            { href: 'stasi.html',   text: 'Stasi',       icon: '⛪' },
            { href: 'jadwal.html',  text: 'Jadwal Misa', icon: '📅' },
            { href: 'galeri.html',  text: 'Galeri',      icon: '🖼️' },
            { href: 'kontak.html',  text: 'Kontak',      icon: '✉️' }
        ];

        let desktopLinks = '';
        links.forEach(link => {
            const isActive = activePage === link.href;
            desktopLinks += `<li><a href="${link.href}" class="nav-pill-link${isActive ? ' active' : ''}">${link.text}</a></li>`;
        });

        const mobileDockLinks = [
            { href: 'index.html',   text: 'Beranda', icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>' },
            { href: 'profil.html',  text: 'Profil',  icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>' },
            { href: 'stasi.html',   text: 'Stasi',   icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>' },
            { href: 'jadwal.html',  text: 'Jadwal',  icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' },
            { href: 'galeri.html',  text: 'Galeri',  icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>' },
            { href: 'kontak.html',  text: 'Kontak',  icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>' }
        ].map(item => {
            const isActive = activePage === item.href;
            return `<a href="${item.href}" class="dock-item${isActive ? ' active' : ''}">
                <span class="dock-icon flex items-center justify-center">${item.icon}</span>
                <span class="dock-text">${item.text}</span>
            </a>`;
        }).join('');

        this.innerHTML = `
        <!-- Floating Top Pill Navbar (Desktop & Tablet only) -->
        <header class="floating-nav-container hidden md:flex">
            <nav class="floating-nav" id="main-nav">
                <!-- Logo -->
                <a href="index.html" class="flex items-center gap-2.5 no-underline pr-2">
                    <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style="background:var(--gold-muted);color:var(--gold);border:1px solid rgba(184,134,11,0.25)">✝</div>
                    <div class="flex flex-col">
                        <span class="font-extrabold text-sm tracking-tight" style="color:var(--ink);line-height:1.15">Paroki Marga Agung</span>
                        <span class="text-[10px] font-medium tracking-wider uppercase" style="color:var(--stone)">S. Andreas Rasul</span>
                    </div>
                </a>

                <!-- Desktop Nav Links -->
                <ul class="flex items-center gap-1 list-none p-0 m-0">
                    ${desktopLinks}
                </ul>
            </nav>
        </header>

        <!-- Mobile Bottom Floating Dock Bar -->
        <nav class="mobile-bottom-dock md:hidden" aria-label="Mobile Navigation">
            <div class="dock-inner">
                ${mobileDockLinks}
            </div>
        </nav>
        `;

        // Scroll awareness for floating nav
        const nav = this.querySelector('.floating-nav');
        const onScroll = () => {
            if (window.scrollY > 40) {
                nav?.classList.add('nav-scrolled');
            } else {
                nav?.classList.remove('nav-scrolled');
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
}

customElements.define('modern-navbar', ModernNavbar);
