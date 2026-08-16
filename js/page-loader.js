(function () {
  var LOADER_ID = 'sa-page-loader';
  var FADE_MS   = 300;
  var MAX_MS    = 1800; // max 1.8 detik, lalu auto hilang

  // Inject keyframes + style via <style> tag
  var zIndex = window.location.pathname.includes('/admin') ? '999999' : '40';
  var style = document.createElement('style');
  style.textContent =
    '#sa-page-loader{position:fixed;inset:0;z-index:' + zIndex + ';display:flex;align-items:center;justify-content:center;background:#F5F3EF;transition:opacity '+FADE_MS+'ms ease;pointer-events:none}' +
    '#sa-page-loader .ldr-cross{width:44px;height:44px;border-radius:.85rem;background:rgba(201,168,76,.12);border:1.5px solid rgba(201,168,76,.35);display:flex;align-items:center;justify-content:center;font-size:1.5rem;color:#c9a84c;animation:ldrPulse 1.3s ease-in-out infinite}' +
    '#sa-page-loader .ldr-dots{display:flex;gap:5px;margin-top:.7rem}' +
    '#sa-page-loader .ldr-dots span{width:6px;height:6px;border-radius:50%;background:#c9a84c;animation:ldrDot 1.1s ease-in-out infinite}' +
    '#sa-page-loader .ldr-dots span:nth-child(2){animation-delay:.16s}' +
    '#sa-page-loader .ldr-dots span:nth-child(3){animation-delay:.32s}' +
    '@keyframes ldrPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.65;transform:scale(1.07)}}' +
    '@keyframes ldrDot{0%,100%{opacity:.35;transform:scale(.8)}45%{opacity:1;transform:scale(1.4)}}';

  var overlay = document.createElement('div');
  overlay.id = LOADER_ID;
  overlay.innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:center">' +
      '<div class="ldr-cross">&#x271D;</div>' +
      '<div class="ldr-dots"><span></span><span></span><span></span></div>' +
    '</div>';

  function attach() {
    if (document.getElementById(LOADER_ID)) return;
    if (document.head) document.head.appendChild(style);
    if (document.body) document.body.insertBefore(overlay, document.body.firstChild);
  }

  if (document.body) { attach(); }
  else { document.addEventListener('DOMContentLoaded', attach, {once:true}); }

  var hidden = false;
  var timer  = null;

  function hide() {
    if (hidden) return;
    hidden = true;
    clearTimeout(timer);
    var el = document.getElementById(LOADER_ID);
    if (!el) return;
    el.style.opacity = '0';
    setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, FADE_MS + 40);
  }

  // Auto-hide safety net
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function(){ timer = setTimeout(hide, MAX_MS); }, {once:true});
  } else {
    timer = setTimeout(hide, MAX_MS);
  }

  window.hidePageLoader = hide;
})();
