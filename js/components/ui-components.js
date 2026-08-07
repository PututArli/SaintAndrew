/**
 * UI Components Library for Paroki Santo Andreas Rasul
 * Lightweight Web Components for high efficiency, maintainability, and zero boilerplate.
 */

// 1. <aesthetic-divider>
class AestheticDivider extends HTMLElement {
    connectedCallback() {
        const isReveal = this.hasAttribute('reveal') ? ' reveal' : '';
        const customStyle = this.getAttribute('style') || '';
        const extraClass = this.getAttribute('class') || '';
        this.innerHTML = `
        <div class="aesthetic-divider${isReveal} ${extraClass}" style="${customStyle}">
            <div class="divider-line"></div>
            <div class="divider-icon">✝</div>
            <div class="divider-line"></div>
        </div>`;
    }
}
if (!customElements.get('aesthetic-divider')) {
    customElements.define('aesthetic-divider', AestheticDivider);
}

// 2. <page-hero>
class PageHero extends HTMLElement {
    connectedCallback() {
        const badge = this.getAttribute('badge') || '';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';
        const badgeHtml = badge ? `<div class="flex justify-center mb-4"><div class="hero-badge">${badge}</div></div>` : '';
        
        this.innerHTML = `
        <div class="page-hero">
            ${badgeHtml}
            <h1 class="page-hero-title animate-fade-in">${title}</h1>
            ${subtitle ? `<p class="page-hero-subtitle animate-fade-in">${subtitle}</p>` : ''}
        </div>`;
    }
}
if (!customElements.get('page-hero')) {
    customElements.define('page-hero', PageHero);
}

// 3. <callout-banner>
class CalloutBanner extends HTMLElement {
    connectedCallback() {
        const icon = this.getAttribute('icon') || '✝';
        const title = this.getAttribute('title') || '';
        const desc = this.getAttribute('desc') || '';
        const btnText = this.getAttribute('btn-text') || '';
        const btnHref = this.getAttribute('btn-href') || '#';
        const isReveal = this.hasAttribute('reveal') ? ' reveal' : '';
        const customClass = this.getAttribute('class') || '';

        this.innerHTML = `
        <div class="p-5 sm:p-7 rounded-2xl sm:rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4${isReveal} ${customClass}" style="background:linear-gradient(135deg, rgba(184,134,11,0.07) 0%, rgba(255,255,255,0.95) 100%);border:1px solid rgba(184,134,11,0.25)">
            <div class="flex items-center gap-3.5 text-center sm:text-left">
                <div class="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 text-base font-bold shadow-sm" style="background:var(--gold-muted);color:var(--gold);border:1px solid rgba(184,134,11,0.3)">
                    ${icon}
                </div>
                <div>
                    <h4 class="font-bold text-sm sm:text-base leading-snug" style="color:var(--ink)">${title}</h4>
                    ${desc ? `<p class="text-xs sm:text-sm mt-0.5" style="color:var(--ink-soft)">${desc}</p>` : ''}
                </div>
            </div>
            ${btnText ? `<a href="${btnHref}" class="btn-primary inline-flex items-center justify-center text-xs sm:text-sm py-2.5 px-5 rounded-xl flex-shrink-0 shadow-sm w-full sm:w-auto">${btnText}</a>` : ''}
        </div>`;
    }
}
if (!customElements.get('callout-banner')) {
    customElements.define('callout-banner', CalloutBanner);
}

// 4. <section-header>
class SectionHeader extends HTMLElement {
    connectedCallback() {
        const badge = this.getAttribute('badge') || '';
        const title = this.getAttribute('title') || '';
        const subtitle = this.getAttribute('subtitle') || '';
        const align = this.getAttribute('align') || 'center';
        const isCentered = align === 'center';
        const isReveal = this.hasAttribute('reveal') ? ' reveal' : '';

        this.innerHTML = `
        <div class="${isCentered ? 'text-center' : ''} mb-8 sm:mb-10${isReveal}">
            ${badge ? `<div class="section-badge ${isCentered ? 'mx-auto' : ''}">${badge}</div>` : ''}
            <h2 class="section-title mt-3">${title}</h2>
            <div class="section-divider ${isCentered ? 'centered' : ''}"></div>
            ${subtitle ? `<p class="text-sm mt-3 ${isCentered ? 'max-w-2xl mx-auto' : ''}" style="color:var(--stone)">${subtitle}</p>` : ''}
        </div>`;
    }
}
if (!customElements.get('section-header')) {
    customElements.define('section-header', SectionHeader);
}

// 5. <cross-ornament>
class CrossOrnament extends HTMLElement {
    connectedCallback() {
        const size = this.getAttribute('size') || 'md';
        const icon = this.getAttribute('icon') || '✝';
        const customClass = this.getAttribute('class') || '';
        const customStyle = this.getAttribute('style') || '';
        const sizeMap = {
            xs: 'w-6 h-6 text-[10px] rounded-md',
            sm: 'w-8 h-8 text-xs rounded-lg',
            md: 'w-10 h-10 text-base rounded-xl',
            lg: 'w-12 h-12 text-lg rounded-2xl'
        };
        const sizeClass = sizeMap[size] || sizeMap.md;
        this.innerHTML = `<div class="${sizeClass} flex items-center justify-center font-bold flex-shrink-0 shadow-sm ${customClass}" style="background:var(--gold-muted);color:var(--gold);border:1px solid rgba(184,134,11,0.2);${customStyle}">${icon}</div>`;
    }
}
if (!customElements.get('cross-ornament')) {
    customElements.define('cross-ornament', CrossOrnament);
}

// Global Helper Functions
window.escapeHtml = function(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

window.renderCrossOrnament = function(size = 'md', extraClass = '', icon = '✝', style = '') {
    const sizeMap = {
        xs: 'w-6 h-6 text-[10px] rounded-md',
        sm: 'w-8 h-8 text-xs rounded-lg',
        md: 'w-10 h-10 text-base rounded-xl',
        lg: 'w-12 h-12 text-lg rounded-2xl'
    };
    const sizeClass = sizeMap[size] || sizeMap.md;
    const styleAttr = style ? `style="background:var(--gold-muted);color:var(--gold);border:1px solid rgba(184,134,11,0.2);${style}"` : 'style="background:var(--gold-muted);color:var(--gold);border:1px solid rgba(184,134,11,0.2)"';
    return `<div class="${sizeClass} flex items-center justify-center font-bold flex-shrink-0 shadow-sm ${extraClass}" ${styleAttr}>${icon}</div>`;
};

window.renderAestheticDivider = function(extraClass = '', customStyle = '') {
    const styleAttr = customStyle ? ` style="${customStyle}"` : '';
    return `<div class="aesthetic-divider ${extraClass}"${styleAttr}><div class="divider-line"></div><div class="divider-icon">✝</div><div class="divider-line"></div></div>`;
};

window.renderInfoBadge = function(icon = '✝', text = '', variant = 'gold') {
    return `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style="background:var(--gold-muted);color:var(--gold);border:1px solid rgba(184,134,11,0.2)"><span>${icon}</span><span>${escapeHtml(text)}</span></span>`;
};

