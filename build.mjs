// Builds the site: wraps each page in src/pages with the shared header and footer, writes to dist/.
// Run: node build.mjs
import { readFileSync, writeFileSync, readdirSync, mkdirSync, rmSync, cpSync } from 'node:fs';

const APP = 'https://app.joyfulpurposecoaching.com/';
const CALL = 'https://calendly.com/astrafox/discoverycall';
const SOUL = 'https://launchyoursoulscalling.com/';
const SITE = 'https://www.joyfulpurposecoaching.com/';
const GA = 'G-P3GD95EBVY'; // her existing Google Analytics property
const PLAY = 'https://www.eventbrite.com/e/the-creative-playground-tickets-1986926631040';

const nav = [
  ['about.html', 'About', 'about'],
  ['human-design.html', 'Human Design', 'human-design'],
  ['music.html', 'Music', 'music'],
  ['shop.html', 'Shop', 'shop'],
];

const layout = ({ title, desc, slug, body, noindex }) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
${noindex ? `<meta name="robots" content="noindex">
<base href="/">` : `<link rel="canonical" href="${SITE}${slug === 'index' ? '' : slug + '.html'}">
<meta property="og:url" content="${SITE}${slug === 'index' ? '' : slug + '.html'}">`}
<meta property="og:site_name" content="Joyful Purpose Coaching">
<meta property="og:image" content="${SITE}img/music1.webp">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0F2A24">
<link rel="icon" href="img/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,300;1,9..144,400&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/site.css">
<link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css">
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="grain"></div>
<div class="bar">🌿 The Creative Playground<span class="hide-s"> · 4th Mondays · 7–8pm PST</span> · <a href="${PLAY}" target="_blank" rel="noopener">Save your seat</a></div>

<header id="hdr"><div class="hin">
<a class="logo" href="./">Joyful Purpose Coaching<small>ASTRA FOX</small></a>
<nav class="links">${nav.map(([h, t, s]) => `<a href="${h}"${s === slug ? ' class="on"' : ''}>${t}</a>`).join('')}<a class="soul" href="${SOUL}" target="_blank" rel="noopener">Soul's Calling</a></nav>
<div class="acts">
<a class="login" href="${APP}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>Client Login</a>
<a class="btn g" href="${CALL}" data-calendly>Book a Call</a>
<button class="burger" id="burger" aria-label="Open menu"><span></span><span></span><span></span></button>
</div>
</div></header>
<div class="drawer" id="drawer">
<button class="x" id="drawerx" aria-label="Close menu">×</button>
<a href="./">Home</a><a href="about.html">About Astra</a><a href="human-design.html">Human Design</a><a href="music.html">Music</a><a href="shop.html">Shop</a><a href="contact.html">Contact</a><a href="${SOUL}" target="_blank" rel="noopener">Launch Your Soul's Calling</a><a href="${APP}">Client Login</a>
<a class="btn g" href="${CALL}" data-calendly>Book your free discovery call</a>
</div>

<main id="main">
${body}
</main>

<footer>
<div class="fgrid">
<div><a class="logo" href="./">Joyful Purpose Coaching<small>ASTRA FOX</small></a><p style="margin-top:16px;max-width:300px">Soul, science and alchemy for spiritual creatives ready to stop hiding their medicine.</p></div>
<div><h4>WORK WITH ME</h4><a href="./#coaching">1:1 Coaching</a><a href="${SOUL}" target="_blank" rel="noopener">Launch Your Soul's Calling</a><a href="human-design.html">Human Design</a><a href="music.html#mantras">Musical Mantras</a><a href="${PLAY}" target="_blank" rel="noopener">The Creative Playground</a></div>
<div><h4>EXPLORE</h4><a href="about.html">About Astra</a><a href="music.html">Music</a><a href="shop.html">Shop</a><a href="contact.html">Contact</a><a href="${APP}">Client Login</a></div>
<div><h4>FOLLOW</h4><a href="https://www.instagram.com/joyfulpurposecoaching/" target="_blank" rel="noopener">Instagram</a><a href="https://www.facebook.com/joyfulpurposecoaching/" target="_blank" rel="noopener">Facebook</a><a href="https://www.youtube.com/@joyfulpurposecoaching" target="_blank" rel="noopener">YouTube</a><a href="https://www.linkedin.com/in/astra-fox/" target="_blank" rel="noopener">LinkedIn</a><a href="https://open.spotify.com/album/2Wbk2QYPPFxXeC6O2T7lmg" target="_blank" rel="noopener">Spotify</a></div>
</div>
<div class="legal">© ${new Date().getFullYear()} Joyful Purpose Coaching · Astra Fox, PCC</div>
</footer>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
<script src="js/site.js"></script>
</body>
</html>
`;

const redirect = (to) => `<!doctype html><meta charset="utf-8"><title>Redirecting…</title><link rel="canonical" href="${to}"><meta http-equiv="refresh" content="0;url=${to}"><a href="${to}">Continue</a>\n`;

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
cpSync('site-assets', 'dist', { recursive: true });

for (const f of readdirSync('src/pages')) {
  const raw = readFileSync(`src/pages/${f}`, 'utf8');
  const m = raw.match(/^<!--(\{[\s\S]*?\})-->\r?\n/);
  if (!m) throw new Error(`${f}: missing <!--{...}--> header`);
  const meta = JSON.parse(m[1]);
  const body = raw.slice(m[0].length)
    .replaceAll('{{APP}}', APP).replaceAll('{{CALL}}', CALL).replaceAll('{{SOUL}}', SOUL).replaceAll('{{PLAY}}', PLAY);
  writeFileSync(`dist/${f}`, layout({ ...meta, slug: f.replace('.html', ''), body }));
}

// Old Squarespace addresses keep working.
writeFileSync('dist/aboutastra.html', redirect('about.html'));
writeFileSync('dist/oldhome.html', redirect('./'));
writeFileSync('dist/home.html', redirect('./'));
writeFileSync('dist/cart.html', redirect('shop.html'));

// For search engines.
const pages = readdirSync('src/pages').filter((f) => f !== '404.html').map((f) => (f === 'index.html' ? '' : f));
writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `<url><loc>${SITE}${p}</loc></url>`).join('\n')}
</urlset>
`);
writeFileSync('dist/robots.txt', `User-agent: *
Allow: /
Sitemap: ${SITE}sitemap.xml
`);
writeFileSync('dist/.nojekyll', '');
console.log('Built', readdirSync('dist').filter((f) => f.endsWith('.html')).join(', '));
