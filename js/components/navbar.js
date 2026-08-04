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
            { href: 'index.html',   text: 'Beranda', icon: '🏠' },
            { href: 'profil.html',  text: 'Profil',  icon: '📖' },
            { href: 'stasi.html',   text: 'Stasi',   icon: '⛪' },
            { href: 'jadwal.html',  text: 'Jadwal',  icon: '📅' },
            { href: 'kontak.html',  text: 'Kontak',  icon: '✉️' }
        ].map(item => {
            const isActive = activePage === item.href;
            return `<a href="${item.href}" class="dock-item${isActive ? ' active' : ''}">
                <span class="dock-icon">${item.icon}</span>
                <span class="dock-text">${item.text}</span>
            </a>`;
        }).join('');

        this.innerHTML = `
        <!-- Floating Top Pill Navbar (Desktop & Tablet) -->
        <header class="floating-nav-container">
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
                <ul class="hidden md:flex items-center gap-1 list-none p-0 m-0">
                    ${desktopLinks}
                </ul>

                <!-- Mobile Menu Button -->
                <div class="md:hidden flex items-center">
                    <a href="galeri.html" class="text-xs font-semibold px-3 py-1.5 rounded-full" style="background:var(--gold-muted);color:var(--gold)">
                        Galeri 🖼️
                    </a>
                </div>
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
