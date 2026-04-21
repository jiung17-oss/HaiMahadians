/* =============================================
HAI MAHADIANS v2 — script.js (FIXED)
============================================= */

/* --- UTILS --- */
const $ = id => document.getElementById(id);
const $$ = sel => Array.from(document.querySelectorAll(sel));
const fmt = n => 'Rp ' + Number(n).toLocaleString('id-ID');

/* --- STATE --- */
let cart = [];
let selectedSize = '40';
let selectedColor = 'Ember Orange';

/* --- PRELOADER --- */
function initPreloader() {
  const bar = $('preBar');
  const count = $('preCount');
  const pre = $('preloader');

  if (!pre) return;

  document.body.classList.add('loading');
  let pct = 0;

  const iv = setInterval(() => {
    pct += Math.random() * 5 + 2;
    if (pct >= 100) {
      pct = 100;
      clearInterval(iv);
      if (bar) bar.style.width = '100%';
      if (count) count.textContent = '100%';
      setTimeout(() => dismissPreloader(pre), 500);
    } else {
      if (bar) bar.style.width = pct + '%';
      if (count) count.textContent = Math.floor(pct) + '%';
    }
  }, 50);
}

function dismissPreloader(pre) {
  pre.style.opacity = '0';
  pre.style.transition = 'opacity 0.5s ease';
  document.body.classList.remove('loading');
  setTimeout(() => {
    pre.style.display = 'none';
    $($$('.reveal-up')).forEach((el, i) => {
      setTimeout(() => el.classList.add('in'), i * 100);
    });
  }, 500);
}

// Jalankan preloader paling awal
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  // Panggil fungsi lainnya di sini (initNavbar, dll)
  // Pastikan fungsi lain juga sudah diperbaiki tanda kutipnya!
});


/* ─── ANIMATED COUNTERS ─────────────────────── */
function startCounters() {
$$(’.hs-num’).forEach(el => {
const target  = parseFloat(el.dataset.count);
const isFloat = el.hasAttribute(‘data-float’);
const dur     = 1600;
const start   = performance.now();

```
function frame(now) {
  const p   = Math.min((now - start) / dur, 1);
  const ease = 1 - Math.pow(1 - p, 3);
  const val  = target * ease;
  el.textContent = isFloat
    ? val.toFixed(1)
    : target >= 1000
      ? Math.floor(val).toLocaleString('id-ID')
      : Math.floor(val);
  if (p < 1) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

});
}

/* ─── REVEAL ON SCROLL ──────────────────────── */
function initReveals() {
const obs = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add(‘in’);
obs.unobserve(entry.target);
}
});
}, { threshold: 0.1 });
$$(’.reveal-up’).forEach(el => obs.observe(el));
}

/* ─── CUSTOM CURSOR ─────────────────────────── */
function initCursor() {
const dot  = $(‘cursorDot’);
const ring = $(‘cursorRing’);
if (!dot || !ring) return;

// Hide on touch devices
if (‘ontouchstart’ in window) {
dot.style.display = ring.style.display = ‘none’;
return;
}

let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener(‘mousemove’, e => {
mx = e.clientX; my = e.clientY;
dot.style.left = mx + ‘px’;
dot.style.top  = my + ‘px’;
});

(function loop() {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.left = rx + ‘px’;
ring.style.top  = ry + ‘px’;
requestAnimationFrame(loop);
})();

document.addEventListener(‘mouseover’, e => {
if (e.target.closest(‘a,button,.sw,.sz,.pcard,.rev-card’)) {
dot.classList.add(‘hovered’);
ring.classList.add(‘hovered’);
}
});
document.addEventListener(‘mouseout’, e => {
if (e.target.closest(‘a,button,.sw,.sz,.pcard,.rev-card’)) {
dot.classList.remove(‘hovered’);
ring.classList.remove(‘hovered’);
}
});
}

/* ─── SCROLL PROGRESS ───────────────────────── */
function initScrollProgress() {
const bar = $(‘scrollProgress’);
if (!bar) return;
window.addEventListener(‘scroll’, () => {
const h   = document.documentElement;
const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
bar.style.width = pct + ‘%’;
}, { passive: true });
}

/* ─── NAVBAR ────────────────────────────────── */
function initNavbar() {
const navbar    = $(‘navbar’);
const hamburger = $(‘hamburger’);
const navLinks  = $(‘navLinks’);
if (!navbar) return;

window.addEventListener(‘scroll’, () => {
navbar.classList.toggle(‘scrolled’, window.scrollY > 60);
}, { passive: true });

if (hamburger && navLinks) {
hamburger.addEventListener(‘click’, () => {
hamburger.classList.toggle(‘open’);
navLinks.classList.toggle(‘open’);
});
navLinks.querySelectorAll(‘a’).forEach(a => {
a.addEventListener(‘click’, () => {
hamburger.classList.remove(‘open’);
navLinks.classList.remove(‘open’);
});
});
}
}

/* ─── HERO PARALLAX ─────────────────────────── */
function initHeroParallax() {
const heroShoe = $(‘heroShoe’);

// Mouse parallax on letters
window.addEventListener(‘mousemove’, e => {
$$(’.hero-bg-letters span’).forEach((s, i) => {
const depth = (i + 1) * 0.014;
const x = (e.clientX / window.innerWidth  - 0.5) * depth * 100;
const y = (e.clientY / window.innerHeight - 0.5) * depth * 60;
s.style.transform = `translate(${x}px,${y}px)`;
});
}, { passive: true });

// Scroll parallax on shoe
if (heroShoe) {
window.addEventListener(‘scroll’, () => {
if (window.scrollY < window.innerHeight) {
heroShoe.style.transform = `translateY(${window.scrollY * 0.07}px) rotate(-8deg)`;
}
}, { passive: true });
}
}

/* ─── COLOR PICKER ──────────────────────────── */
function initColorPicker() {
const heroShoe  = $(‘heroShoe’);
const colorName = $(‘colorName’);

$$(’.sw’).forEach(sw => {
sw.addEventListener(‘click’, () => {
$$(’.sw’).forEach(s => s.classList.remove(‘active’));
sw.classList.add(‘active’);
selectedColor = sw.dataset.color || ‘Custom’;
if (colorName) colorName.textContent = selectedColor;

```
  const img = sw.dataset.img;
  if (img && heroShoe) {
    heroShoe.style.opacity = '0';
    heroShoe.style.transform = 'scale(.88) rotate(-8deg)';
    heroShoe.onload = () => {
      heroShoe.style.opacity   = '1';
      heroShoe.style.transform = '';
      heroShoe.onload = null;
    };
    setTimeout(() => { heroShoe.src = img; }, 320);
  }
});
```

});
}

/* ─── SIZE PICKER ───────────────────────────── */
function initSizePicker() {
$$(’.sz’).forEach(btn => {
btn.addEventListener(‘click’, () => {
$$(’.sz’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
selectedSize = btn.dataset.size;
});
});
}

/* ─── 3D TILT ON CARDS ──────────────────────── */
function initTilt() {
// Only on non-touch devices
if (‘ontouchstart’ in window) return;

$$(’.pcard’).forEach(card => {
card.addEventListener(‘mousemove’, e => {
const r = card.getBoundingClientRect();
const x = (e.clientX - r.left) / r.width  - 0.5;
const y = (e.clientY - r.top)  / r.height - 0.5;
card.style.transition = ‘border-color .3s, box-shadow .3s’;
card.style.transform  = `perspective(800px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateZ(6px)`;
});
card.addEventListener(‘mouseleave’, () => {
card.style.transition = ‘transform .5s ease, border-color .3s, box-shadow .3s’;
card.style.transform  = ‘perspective(800px) rotateY(0) rotateX(0) translateZ(0)’;
});
});
}

/* ─── CART ──────────────────────────────────── */
function updateCart() {
const countEl = $(‘cartCount’);
const totalEl = $(‘cartTotal’);
const itemsEl = $(‘cartItems’);
const footEl  = $(‘cartFooter’);
const total   = cart.reduce((s, i) => s + i.price, 0);

if (countEl) {
countEl.textContent = cart.length;
countEl.classList.remove(‘bump’);
void countEl.offsetWidth;
countEl.classList.add(‘bump’);
}
if (totalEl) totalEl.textContent = fmt(total);
if (!itemsEl) return;

if (cart.length === 0) {
itemsEl.innerHTML = ` <div class="cart-empty-state"> <span>🛒</span> <p>Keranjangmu masih kosong</p> </div>`;
if (footEl) footEl.style.display = ‘none’;
return;
}

if (footEl) footEl.style.display = ‘block’;
itemsEl.innerHTML = cart.map((item, idx) => ` <div class="cart-line"> <img src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=50'"/> <div class="cl-info"> <div class="cl-name">${item.name}</div> <div class="cl-price">${fmt(item.price)}</div> <div class="cl-size">Ukuran: ${item.size} · ${item.color}</div> </div> <button class="cl-del" data-idx="${idx}">✕</button> </div>`).join(’’);

itemsEl.querySelectorAll(’.cl-del’).forEach(btn => {
btn.addEventListener(‘click’, () => {
cart.splice(+btn.dataset.idx, 1);
updateCart();
});
});
}

function addToCart(name, price, size, color, img) {
cart.push({ name, price: +price, size, color, img: img || ‘’ });
updateCart();
showToast(`✅ ${name} (${size}) ditambahkan!`);
}

function initCart() {
const cartOverlay = $(‘cartOverlay’);
const cartDrawer  = $(‘cartDrawer’);
const cartClose   = $(‘cartClose’);
const heroShoe    = $(‘heroShoe’);
const checkoutBtn = $(‘checkoutBtn’);

function openCart() {
if (cartDrawer) cartDrawer.classList.add(‘open’);
if (cartOverlay) cartOverlay.classList.add(‘open’);
document.body.style.overflow = ‘hidden’;
}
function closeCart() {
if (cartDrawer) cartDrawer.classList.remove(‘open’);
if (cartOverlay) cartOverlay.classList.remove(‘open’);
document.body.style.overflow = ‘’;
}

const cartBtn = $(‘cartBtn’);
if (cartBtn)     cartBtn.addEventListener(‘click’, openCart);
if (cartClose)   cartClose.addEventListener(‘click’, closeCart);
if (cartOverlay) cartOverlay.addEventListener(‘click’, closeCart);

// Hero add to cart
const heroAddCart = $(‘heroAddCart’);
if (heroAddCart) {
heroAddCart.addEventListener(‘click’, () => {
const img = ($$(’.sw.active’)[0] || {}).dataset?.img || heroShoe?.src || ‘’;
addToCart(‘Nike Air Max 720’, 2499000, selectedSize, selectedColor, img);
});
}

// Product card buttons
$$(’.pcard-add, .quick-view’).forEach(btn => {
btn.addEventListener(‘click’, e => {
e.stopPropagation();
const card = btn.closest(’.pcard’);
const img  = card?.querySelector(‘img’)?.src || ‘’;
addToCart(btn.dataset.product, btn.dataset.price, selectedSize, selectedColor, img);
});
});

// Checkout via WhatsApp
if (checkoutBtn) {
checkoutBtn.addEventListener(‘click’, () => {
if (cart.length === 0) { showToast(‘🛒 Keranjang masih kosong!’); return; }
const total = cart.reduce((s, i) => s + i.price, 0);
const items = cart.map(i => `• ${i.name} (${i.size} / ${i.color})`).join(’\n’);
const msg   = encodeURIComponent(
`Halo Hai Mahadians!\n\nSaya mau pesan:\n${items}\n\nTotal: ${fmt(total)}\n\nMohon diproses. Terima kasih!`
);
window.open(`https://wa.me/6281234567890?text=${msg}`, ‘_blank’);
});
}

updateCart();
}

/* ─── TOAST ─────────────────────────────────── */
let toastTimer;
function showToast(msg) {
const el = $(‘toast’);
if (!el) return;
el.textContent = msg;
el.classList.add(‘show’);
clearTimeout(toastTimer);
toastTimer = setTimeout(() => el.classList.remove(‘show’), 2800);
}

/* ─── REVIEW SLIDER ─────────────────────────── */
function initReviewSlider() {
const revTrack = $(‘revTrack’);
const revDots  = $(‘revDots’);
const revPrev  = $(‘revPrev’);
const revNext  = $(‘revNext’);
if (!revTrack) return;

const cards = $$(’.rev-card’);
let idx = 0;
let autoTimer;

function getCardWidth() {
return (cards[0]?.offsetWidth || 340) + 24;
}

function goTo(n) {
idx = ((n % cards.length) + cards.length) % cards.length;
revTrack.style.transform = `translateX(-${idx * getCardWidth()}px)`;
$$(’.rdot’).forEach((d, i) => d.classList.toggle(‘active’, i === idx));
clearInterval(autoTimer);
autoTimer = setInterval(() => goTo(idx + 1), 4500);
}

// Build dots
if (revDots) {
revDots.innerHTML = cards.map((_, i) =>
`<button class="rdot${i===0?' active':''}" aria-label="Slide ${i+1}"></button>`
).join(’’);
$$(’.rdot’).forEach((d, i) => d.addEventListener(‘click’, () => goTo(i)));
}

if (revPrev) revPrev.addEventListener(‘click’, () => goTo(idx - 1));
if (revNext) revNext.addEventListener(‘click’, () => goTo(idx + 1));

// Touch swipe
let tx = 0;
revTrack.addEventListener(‘touchstart’, e => { tx = e.touches[0].clientX; }, { passive: true });
revTrack.addEventListener(‘touchend’,   e => {
const dx = e.changedTouches[0].clientX - tx;
if (Math.abs(dx) > 40) goTo(idx + (dx < 0 ? 1 : -1));
});

autoTimer = setInterval(() => goTo(idx + 1), 4500);
}

/* ─── PROMO CODE COPY ───────────────────────── */
function initPromoCode() {
const btn = $(‘copyBtn’);
if (!btn) return;
btn.addEventListener(‘click’, () => {
if (navigator.clipboard) {
navigator.clipboard.writeText(‘HAIMAHADIANS20’).then(() => {
btn.textContent = ‘✓ Disalin!’;
setTimeout(() => btn.textContent = ‘Salin Kode’, 2000);
showToast(‘📋 Kode HAIMAHADIANS20 berhasil disalin!’);
});
} else {
showToast(‘📋 Kode: HAIMAHADIANS20’);
}
});
}

/* ─── CONTACT FORM ──────────────────────────── */
function initContactForm() {
const form = $(‘contactForm’);
if (!form) return;
form.addEventListener(‘submit’, e => {
e.preventDefault();
showToast(‘🎉 Pesan terkirim! Kami segera menghubungimu.’);
form.reset();
});
}

/* ─── ACTIVE NAV ─────────────────────────────── */
function initActiveNav() {
const sections = $$(‘section[id]’);
const navAs    = $$(’.nav-links a’);
if (!sections.length) return;

const obs = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
navAs.forEach(a => {
a.style.color = a.getAttribute(‘href’) === ‘#’ + entry.target.id
? ‘var(–white)’ : ‘’;
});
}
});
}, { threshold: 0.4 });
sections.forEach(s => obs.observe(s));
}

/* ══════════════════════════════════════════════
BOOT — run everything in order
══════════════════════════════════════════════ */
document.addEventListener(‘DOMContentLoaded’, () => {
initNavbar();
initScrollProgress();
initCursor();
initHeroParallax();
initColorPicker();
initSizePicker();
initTilt();
initCart();
initReviewSlider();
initPromoCode();
initContactForm();
initActiveNav();
initReveals();   // IntersectionObserver for scroll reveals
initPreloader(); // Preloader LAST so all functions are ready
});