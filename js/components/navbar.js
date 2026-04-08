class ModernNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const activePage = this.getAttribute('active-page') || 'index.html';
        
        const links = [
            { href: 'index.html', text: 'Beranda' },
            { href: 'profil.html', text: 'Profil' },
            { href: 'stasi.html', text: 'Stasi' },
            { href: 'galeri.html', text: 'Galeri' },
            { href: 'jadwal.html', text: 'Jadwal Misa' },
            { href: 'kontak.html', text: 'Kontak' }
        ];

        let linksHtml = '';
        links.forEach(link => {
            const isActive = activePage === link.href ? 'text-blue-300' : '';
            linksHtml += `<li><a href="${link.href}" class="nav-link ${isActive}">${link.text}</a></li>`;
        });

        this.innerHTML = `
        <nav class="glass-nav sticky top-0 z-50 w-full text-white px-6 py-4">
        <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <h1 class="text-2xl font-bold tracking-wide">Paroki Marga Agung</h1>
            <ul class="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 md:mt-0 font-medium text-sm md:text-base">
                ${linksHtml}
            </ul>
        </div>
        </nav>
        `;
    }
}

customElements.define('modern-navbar', ModernNavbar);
