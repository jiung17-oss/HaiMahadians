/* =============================================
HAI MAHADIANS v2 — script.js
============================================= */
'use strict';

/* ─── UTILS ─────────────────────────────────── */
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);
const fmt = n => 'Rp ' + Number(n).toLocaleString('id-ID');

/* ─── STATE ─────────────────────────────────── */
let cart = [];
let selectedSize = '40';
let selectedColor = 'Ember Orange';

/* ─── PRELOADER ─────────────────────────────── */
(function preload() {
document.body.classList.add('loading');
const bar   = $('preBar');
const count = $('preCount');
const pre   = $('preloader');

if (!bar || !count || !pre) return; // Safety check
document.body.classList.add('loading');

let pct = 0;
const iv = setInterval(() => {
pct += Math.random() * 8 + 2;
if (pct >= 100) { pct = 100; clearInterval(iv); finish(); }
bar.style.width = pct + '%';
count.textContent = Math.floor(pct) + '%';
}, 60);

function finish() {
setTimeout(() => {
pre.classList.add('done');
document.body.classList.remove('loading');
// Trigger hero reveals after preloader
document.querySelectorAll('.reveal-up').forEach((el, i) => {
setTimeout(() => el.classList.add('in'), i * 80);
});
}, 400);
}
})();

/* ─── CUSTOM CURSOR ─────────────────────────── */
const dot  = $('cursorDot');
const ring = $('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (dot && ring) {
document.addEventListener('mousemove', e => {
mx = e.clientX; my = e.clientY;
dot.style.left  = mx + 'px';
dot.style.top   = my + 'px';
});

// Ring follows with lag
(function animCursor() {
rx += (mx - rx) * 0.12;
ry += (my - ry) * 0.12;
ring.style.left = rx + 'px';
ring.style.top  = ry + 'px';
requestAnimationFrame(animCursor);
})();

// Hover effect on interactive elements
const hoverEls = 'a,button,.sw,.sz,.pcard,.rev-card';
document.addEventListener('mouseover', e => {
if (e.target.closest(hoverEls)) {
dot.classList.add('hovered');
ring.classList.add('hovered');
}
});
document.addEventListener('mouseout', e => {
if (e.target.closest(hoverEls)) {
dot.classList.remove('hovered');
ring.classList.remove('hovered');
}
});
}

/* ─── SCROLL PROGRESS ───────────────────────── */
const progressBar = $('scrollProgress');
window.addEventListener('scroll', () => {
const h   = document.documentElement;
const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
if (progressBar) progressBar.style.width = pct + '%';
}, { passive: true });

/* ─── NAVBAR ────────────────────────────────── */
const navbar    = $('navbar');
const hamburger = $('hamburger');
const navLinks  = $('navLinks');

window.addEventListener('scroll', () => {
navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

hamburger.addEventListener('click', () => {
hamburger.classList.toggle('open');
navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
a.addEventListener('click', () => {
hamburger.classList.remove('open');
navLinks.classList.remove('open');
});
});

/* ─── REVEAL ON SCROLL ──────────────────────── */
const revObs = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('in');
revObs.unobserve(entry.target);
}
});
}, { threshold: 0.12 });

$$('.reveal-up').forEach(el => revObs.observe(el));

/* ─── ANIMATED COUNTERS ─────────────────────── */
function startCounters() {
$$('.hs-num').forEach(el => {
const target = parseFloat(el.dataset.count);
const isFloat = 'float' in el.dataset;
const dur = 1800;
const start = performance.now();

```
function frame(now) {
  const progress = Math.min((now - start) / dur, 1);
  // Ease out
  const ease = 1 - Math.pow(1 - progress, 3);
  const val = target * ease;
  el.textContent = isFloat
    ? val.toFixed(1)
    : target >= 1000
      ? Math.floor(val).toLocaleString('id-ID')
      : Math.floor(val);
  if (progress < 1) requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

});
}

// Also trigger when stats section enters view
const statsEl = document.querySelector('.hero-stats');
if (statsEl) {
const statsObs = new IntersectionObserver(entries => {
if (entries[0].isIntersecting) { startCounters(); statsObs.disconnect(); }
}, { threshold: 0.3 });
statsObs.observe(statsEl);
}

/* ─── 3D TILT ON PRODUCT CARDS ──────────────── */
$$('.pcard').forEach(card => {
card.addEventListener('mousemove', e => {
const rect = card.getBoundingClientRect();
const x = (e.clientX - rect.left) / rect.width  - 0.5;
const y = (e.clientY - rect.top)  / rect.height - 0.5;
card.style.transform = 'perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(6px)';
});
card.addEventListener('mouseleave', () => {
card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
card.style.transition = 'transform .5s var(–ease), border-color .3s, box-shadow .3s';
setTimeout(() => card.style.transition = '', 500);
});
card.addEventListener('mouseenter', () => {
card.style.transition = 'border-color .3s, box-shadow .3s';
});
});

/* ─── HERO PARALLAX (bg letters) ────────────── */
window.addEventListener('mousemove', e => {
$$('.hero-bg-letters span').forEach((s, i) => {
const depth = (i + 1) * 0.015;
const x = (e.clientX / window.innerWidth  - 0.5) * depth * 100;
const y = (e.clientY / window.innerHeight - 0.5) * depth * 60;
s.style.transform = 'translate(${x}px,${y}px)';
});
}, { passive: true });

/* ─── COLOR PICKER ──────────────────────────── */
const heroShoe  = $('heroShoe');
const colorName = $('colorName');

$$('.sw').forEach(sw => {
sw.addEventListener('click', () => {
$$('.sw').forEach(s => s.classList.remove('active'));
sw.classList.add('active');
selectedColor = sw.dataset.color;
if (colorName) colorName.textContent = selectedColor;

```
const img = sw.dataset.img;
if (img && heroShoe) {
  heroShoe.style.opacity = '0';
  heroShoe.style.transform = 'scale(.88) rotate(-6deg)';
  setTimeout(() => {
    heroShoe.src = img;
    heroShoe.style.opacity = '1';
    heroShoe.style.transform = '';
  }, 350);
}
```

});
});

/* ─── SIZE PICKER ───────────────────────────── */
$$('.sz').forEach(btn => {
btn.addEventListener('click', () => {
$$('.sz').forEach(b => b.classList.remove('active'));
btn.classList.add('active');
selectedSize = btn.dataset.size;
});
});

/* ─── CART ──────────────────────────────────── */
function updateCart() {
const countEl = $('cartCount');
const totalEl = $('cartTotal');
const itemsEl = $('cartItems');
const footEl  = $('cartFooter');
const total   = cart.reduce((s, i) => s + i.price, 0);

if (countEl) {
countEl.textContent = cart.length;
countEl.classList.remove('bump');
void countEl.offsetWidth;
countEl.classList.add('bump');
}
if (totalEl) totalEl.textContent = fmt(total);

if (!itemsEl) return;

if (cart.length === 0) {
itemsEl.innerHTML = ' <div class="cart-empty-state"> <span>🛒</span> <p>Keranjangmu masih kosong</p> </div>';
if (footEl) footEl.style.display = ‘none’;
} else {
if (footEl) footEl.style.display = 'block';
itemsEl.innerHTML = cart.map((item, idx) => ' <div class="cart-line"> <img src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=50'"/> <div class="cl-info"> <div class="cl-name">${item.name}</div> <div class="cl-price">${fmt(item.price)}</div> <div class="cl-size">Ukuran: ${item.size} · ${item.color}</div> </div> <button class="cl-del" data-idx="${idx}">✕</button> </div>').join('');

```
itemsEl.querySelectorAll('.cl-del').forEach(btn => {
  btn.addEventListener('click', () => {
    cart.splice(+btn.dataset.idx, 1);
    updateCart();
  });
});
```

}
}

function addToCart(name, price, size, color, img) {
cart.push({ name, price: +price, size, color, img: img || '' });
updateCart();
showToast('✅ ${name} (${size}) ditambahkan!');
}

/* Open / close */
const cartOverlay = $('cartOverlay');
const cartDrawer  = $('cartDrawer');
const cartClose   = $('cartClose');

function openCart()  {
cartDrawer.classList.add('open');
cartOverlay.classList.add('open');
document.body.style.overflow = 'hidden';
}
function closeCart() {
cartDrawer.classList.remove('open');
cartOverlay.classList.remove('open');
document.body.style.overflow = '';
}

$('cartBtn').addEventListener('click', openCart);
if (cartClose) cartClose.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

/* Hero add */
$('heroAddCart').addEventListener('click', () => {
const img = document.querySelector('.sw.active')?.dataset.img || heroShoe?.src || '';
addToCart('Nike Air Max 720', 2499000, selectedSize, selectedColor, img);
});

/* Product card add */
$$('.pcard-add, .quick-view').forEach(btn => {
btn.addEventListener('click', e => {
e.stopPropagation();
const card = btn.closest('.pcard');
const img  = card?.querySelector('img')?.src || '';
addToCart(btn.dataset.product, btn.dataset.price, selectedSize, selectedColor, img);
});
});

/* Checkout */
const checkoutBtn = $('checkoutBtn');
if (checkoutBtn) {
checkoutBtn.addEventListener('click', () => {
if (cart.length === 0) return showToast('🛒 Keranjang kosong!');
const total = cart.reduce((s, i) => s + i.price, 0);
const items = cart.map(i => '• ${i.name} (${i.size} / ${i.color})').join('\n');
const msg = encodeURIComponent(
'Halo Hai Mahadians!\n\nSaya mau pesan:\n${items}\n\nTotal: ${fmt(total)}\n\nMohon diproses. Terima kasih!'
);
window.open('https://wa.me/6281234567890?text=${msg}', '_blank');
});
}

/* ─── TOAST ─────────────────────────────────── */
const toastEl = $('toast');
let toastTimer;
function showToast(msg) {
toastEl.textContent = msg;
toastEl.classList.add('show');
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2800);
}

/* ─── REVIEW SLIDER ─────────────────────────── */
const revTrack = $('revTrack');
const revDots  = $('revDots');
const revPrev  = $('revPrev');
const revNext  = $('revNext');
const revCards = revTrack ? Array.from(revTrack.querySelectorAll('.rev-card')) : [];
let revIdx = 0;
let revAutoTimer;

function buildDots() {
if (!revDots) return;
revDots.innerHTML = revCards.map((_, i) =>
'<button class="rdot${i===0?' active':''}" aria-label="Slide ${i+1}"></button>'
).join('');
revDots.querySelectorAll('.rdot').forEach((d, i) => {
d.addEventListener('click', () => goSlide(i));
});
}

function goSlide(idx) {
revIdx = (idx + revCards.length) % revCards.length;
const cardW = revCards[0]?.offsetWidth + 24 || 364;
revTrack.style.transform = 'translateX(-${revIdx * cardW}px)';
revDots?.querySelectorAll('.rdot').forEach((d, i) => d.classList.toggle('active', i === revIdx));
resetAuto();
}

function resetAuto() {
clearInterval(revAutoTimer);
revAutoTimer = setInterval(() => goSlide(revIdx + 1), 4200);
}

if (revPrev) revPrev.addEventListener('click', () => goSlide(revIdx - 1));
if (revNext) revNext.addEventListener('click', () => goSlide(revIdx + 1));

// Touch/drag support
let touchStartX = 0;
if (revTrack) {
revTrack.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX, { passive: true });
revTrack.addEventListener('touchend', e => {
const dx = e.changedTouches[0].clientX - touchStartX;
if (Math.abs(dx) > 40) goSlide(revIdx + (dx < 0 ? 1 : -1));
});
}

buildDots();
resetAuto();

/* ─── PROMO CODE COPY ───────────────────────── */
const copyBtn = $('copyBtn');
if (copyBtn) {
copyBtn.addEventListener('click', () => {
navigator.clipboard?.writeText('HAIMAHADIANS20').then(() => {
copyBtn.textContent = '✓ Disalin!';
setTimeout(() => copyBtn.textContent = 'Salin Kode', 2000);
showToast('📋 Kode HAIMAHADIANS20 berhasil disalin!');
});
});
}

/* ─── CONTACT FORM ──────────────────────────── */
const contactForm = $('contactForm');
if (contactForm) {
contactForm.addEventListener('submit', e => {
e.preventDefault();
showToast('🎉 Pesan terkirim! Kami segera menghubungimu.');
contactForm.reset();
});
}

/* ─── HERO SCROLL PARALLAX ──────────────────── */
window.addEventListener('scroll', () => {
const y = window.scrollY;
if (heroShoe && y < window.innerHeight) {
heroShoe.style.transform = 'translateY(${y * 0.07}px) rotate(-8deg)';
}
}, { passive: true });

/* ─── SMOOTH NAV ACTIVE STATE ───────────────── */
const sections = $$('section[id]');
const navAs    = $$('.nav-links a');
const sectObs  = new IntersectionObserver(entries => {
entries.forEach(entry => {
if (entry.isIntersecting) {
navAs.forEach(a => {
a.style.color = a.getAttribute(‘href’) === '#' + entry.target.id
? 'var(–white)' : '';
});
}
});
}, { threshold: 0.4 });
sections.forEach(s => sectObs.observe(s));

/* ─── INIT ──────────────────────────────────── */
updateCart();