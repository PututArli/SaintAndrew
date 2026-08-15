const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace stasi cards from <a href='stasi.html'> to <button>
const stasis = ['margo-agung', 'marga-lestari', 'rejomulyo', 'sindang-sari', 'jatimulyo', 'way-galih', 'sukadamai', 'pendowo', 'purwotani'];

stasis.forEach(stasi => {
  const oldTag = `<a href="stasi.html" data-stasi="${stasi}"`;
  const newTag = `<button type="button" onclick="openStasiModal('${stasi}')"`;
  html = html.replace(oldTag, newTag);
});

// 2. Fix the closing </a> for stasi cards inside #home-stasi-container
const containerStart = html.indexOf('id="home-stasi-container"');
const containerEnd = html.indexOf('</div>', html.indexOf('✝', containerStart));
const block = html.substring(containerStart, containerEnd + 100);

let newBlock = block;
for (let i = 0; i < 9; i++) {
  newBlock = newBlock.replace('</a>', '</button>');
}
html = html.replace(block, newBlock);

// 3. Fix mismatched schedule link
const scheduleLinkArea = html.indexOf('id="home-schedule-link"');
if (scheduleLinkArea > -1) {
  const nextClosingTag = html.indexOf('</button>', scheduleLinkArea);
  if (nextClosingTag > -1 && nextClosingTag < scheduleLinkArea + 150) {
    html = html.substring(0, nextClosingTag) + '</a>' + html.substring(nextClosingTag + 9);
  }
}

// 4. Fix mismatched gallery link
const galleryLinkArea = html.indexOf('id="home-gallery-link"');
if (galleryLinkArea > -1) {
  const nextClosingTag = html.indexOf('</button>', galleryLinkArea);
  if (nextClosingTag > -1 && nextClosingTag < galleryLinkArea + 150) {
    html = html.substring(0, nextClosingTag) + '</a>' + html.substring(nextClosingTag + 9);
  }
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully applied all fixes to index.html');
