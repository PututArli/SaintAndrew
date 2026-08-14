/**
 * Aesthetic Divider with Catholic Cross Ornament
 * Paroki Santo Andreas Rasul Margo Agung
 *
 * Usage in HTML:
 *   <aesthetic-divider></aesthetic-divider>
 *   <aesthetic-divider reveal></aesthetic-divider>
 *   <aesthetic-divider class="my-custom-class" style="margin: 2rem 0;"></aesthetic-divider>
 *
 * Usage in JS:
 *   renderAestheticDivider('my-class', 'margin: 2rem 0;')
 */

if (!customElements.get('aesthetic-divider')) {
    customElements.define('aesthetic-divider', class extends HTMLElement {
        constructor() {
            super();
        }

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
    });
}

// Global helper function for JS-driven templates
if (!window.renderAestheticDivider) {
    window.renderAestheticDivider = function(extraClass = '', customStyle = '') {
        const styleAttr = customStyle ? ` style="${customStyle}"` : '';
        return `<div class="aesthetic-divider ${extraClass}"${styleAttr}><div class="divider-line"></div><div class="divider-icon">✝</div><div class="divider-line"></div></div>`;
    };
}
