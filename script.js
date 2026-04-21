/* =============================================
HAI MAHADIANS — script.js
============================================= */

// ─── STATE ───────────────────────────────────
let cart = [];
let selectedSize = ‘40’;

// ─── DOM REFS ─────────────────────────────────
const navbar      = document.getElementById(‘navbar’);
const hamburger   = document.getElementById(‘hamburger’);
const navLinks    = document.getElementById(‘navLinks’);
const cartBtn     = document.getElementById(‘cartBtn’);
const cartClose   = document.getElementById(‘cartClose’);
const cartOverlay = document.getElementById(‘cartOverlay’);
const cartSidebar = document.getElementById(‘cartSidebar’);
const cartItems   = document.getElementById(‘cartItems’);
const cartFooter  = document.getElementById(‘cartFooter’);
const cartCount   = document.getElementById(‘cartCount’);
const cartTotal   = document.getElementById(‘cartTotal’);
const checkoutBtn = document.getElementById(‘checkoutBtn’);
const heroShoe    = document.getElementById(‘heroShoe’);
const heroAddCart = document.getElementById(‘heroAddCart’);
const toast       = document.getElementById(‘toast’);
const contactForm = document.getElementById(‘contactForm’);

// ─── NAVBAR SCROLL ───────────────────────────
window.addEventListener(‘scroll’, () => {
navbar.classList.toggle(‘scrolled’, window.scrollY > 50);
});

// ─── HAMBURGER MENU ──────────────────────────
hamburger.addEventListener(‘click’, () => {
hamburger.classList.toggle(‘open’);
navLinks.classList.toggle(‘open’);
});
navLinks.querySelectorAll(‘a’).forEach(link => {
link.addEventListener(‘click’, () => {
hamburger.classList.remove(‘open’);
navLinks.classList.remove(‘open’);
});
});

// ─── COLOR PICKER (HERO) ─────────────────────
document.querySelectorAll(’.color-dot’).forEach(dot => {
dot.addEventListener(‘click’, () => {
document.querySelectorAll(’.color-dot’).forEach(d => d.classList.remove(‘active’));
dot.classList.add(‘active’);
const img = dot.dataset.img;
if (img && heroShoe) {
heroShoe.style.opacity = ‘0’;
heroShoe.style.transform = ‘scale(.92) rotate(-6deg)’;
setTimeout(() => {
heroShoe.src = img;
heroShoe.style.opacity = ‘1’;
heroShoe.style.transform = ‘’;
}, 300);
}
});
});

// ─── SIZE PICKER ─────────────────────────────
document.querySelectorAll(’.size-btn’).forEach(btn => {
btn.addEventListener(‘click’, () => {
document.querySelectorAll(’.size-btn’).forEach(b => b.classList.remove(‘active’));
btn.classList.add(‘active’);
selectedSize = btn.dataset.size;
});
});

// ─── CART HELPERS ────────────────────────────
function formatRp(num) {
return ’Rp ’ + Number(num).toLocaleString(‘id-ID’);
}

function updateCartUI() {
const total = cart.reduce((s, i) => s + i.price, 0);
cartCount.textContent = cart.length;
cartTotal.textContent = formatRp(total);

if (cart.length === 0) {
cartItems.innerHTML = ` <div class="cart-empty"> <span>🛒</span> <p>Keranjangmu masih kosong</p> </div>`;
cartFooter.style.display = ‘none’;
} else {
cartFooter.style.display = ‘block’;
cartItems.innerHTML = cart.map((item, idx) => `<div class="cart-line"> <img src="${item.img}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=60'"/> <div class="cart-line-info"> <div class="cart-line-name">${item.name}</div> <div class="cart-line-price">${formatRp(item.price)}</div> <div style="font-size:.75rem;color:#777;margin-top:3px">Ukuran: ${item.size}</div> </div> <button class="cart-line-remove" data-idx="${idx}" title="Hapus">✕</button> </div>`).join(’’);

```
cartItems.querySelectorAll('.cart-line-remove').forEach(btn => {
  btn.addEventListener('click', () => {
    const idx = parseInt(btn.dataset.idx);
    cart.splice(idx, 1);
    updateCartUI();
  });
});
```

}

// Bump animation
cartCount.classList.remove(‘bump’);
void cartCount.offsetWidth; // reflow
cartCount.classList.add(‘bump’);
}

function addToCart(name, price, size, img) {
cart.push({ name, price: parseInt(price), size, img });
updateCartUI();
showToast(`✅ ${name} (${size}) ditambahkan!`);
}

// ─── OPEN / CLOSE CART ───────────────────────
function openCart() {
cartSidebar.classList.add(‘open’);
cartOverlay.classList.add(‘visible’);
document.body.style.overflow = ‘hidden’;
}
function closeCart() {
cartSidebar.classList.remove(‘open’);
cartOverlay.classList.remove(‘visible’);
document.body.style.overflow = ‘’;
}

cartBtn.addEventListener(‘click’, openCart);
cartClose.addEventListener(‘click’, closeCart);
cartOverlay.addEventListener(‘click’, closeCart);

// ─── HERO ADD TO CART ────────────────────────
heroAddCart.addEventListener(‘click’, () => {
const img = document.querySelector(’.color-dot.active’)?.dataset.img
|| heroShoe.src;
addToCart(
heroAddCart.dataset.product,
heroAddCart.dataset.price,
selectedSize,
img
);
});

// ─── PRODUCT CARD ADD TO CART ─────────────────
document.querySelectorAll(’.card-add’).forEach(btn => {
btn.addEventListener(‘click’, () => {
// Find closest image in same card
const card = btn.closest(’.product-card’);
const img  = card.querySelector(‘img’)?.src || ‘’;
addToCart(btn.dataset.product, btn.dataset.price, selectedSize, img);
});
});

// ─── CHECKOUT BUTTON ─────────────────────────
checkoutBtn.addEventListener(‘click’, () => {
const total = cart.reduce((s, i) => s + i.price, 0);
const items = cart.map(i => `${i.name} (${i.size})`).join(’, ’);
const msg = encodeURIComponent(
`Halo Hai Mahadians! Saya ingin memesan:\n${items}\n\nTotal: ${formatRp(total)}\n\nMohon informasi lebih lanjut. Terima kasih!`
);
window.open(`https://wa.me/6281234567890?text=${msg}`, ‘_blank’);
});

// ─── TOAST ───────────────────────────────────
let toastTimer;
function showToast(msg) {
toast.textContent = msg;
toast.classList.add(‘show’);
clearTimeout(toastTimer);
toastTimer = setTimeout(() => toast.classList.remove(‘show’), 2800);
}

// ─── REVEAL ON SCROLL ─────────────────────────
const revealEls = document.querySelectorAll(’[data-reveal]’);
const revealObs = new IntersectionObserver(entries => {
entries.forEach((entry, i) => {
if (entry.isIntersecting) {
// stagger
setTimeout(() => entry.target.classList.add(‘visible’), i * 80);
revealObs.unobserve(entry.target);
}
});
}, { threshold: 0.15 });
revealEls.forEach(el => revealObs.observe(el));

// ─── REVIEW SLIDER (mobile-style dots) ────────
const slider    = document.getElementById(‘reviewsSlider’);
const dotsWrap  = document.getElementById(‘sliderDots’);
const cards     = slider ? slider.querySelectorAll(’.review-card’) : [];
let activeSlide = 0;

function buildDots() {
if (!dotsWrap) return;
dotsWrap.innerHTML = ‘’;
cards.forEach((_, i) => {
const d = document.createElement(‘button’);
d.className = ‘slider-dot’ + (i === 0 ? ’ active’ : ‘’);
d.setAttribute(‘aria-label’, `Review ${i+1}`);
d.addEventListener(‘click’, () => goToSlide(i));
dotsWrap.appendChild(d);
});
}

function goToSlide(idx) {
activeSlide = idx;
dotsWrap.querySelectorAll(’.slider-dot’).forEach((d, i) => {
d.classList.toggle(‘active’, i === idx);
});
// On mobile, shift the grid; on desktop just highlight the dot
if (window.innerWidth < 768) {
slider.style.transform = `translateX(calc(-${idx * 100}% - ${idx * 24}px))`;
}
}

buildDots();

// Auto-advance
setInterval(() => {
const next = (activeSlide + 1) % cards.length;
goToSlide(next);
}, 4500);

// ─── CONTACT FORM ────────────────────────────
contactForm && contactForm.addEventListener(‘submit’, e => {
e.preventDefault();
showToast(‘🎉 Pesan terkirim! Kami akan membalas segera.’);
contactForm.reset();
});

// ─── HERO PARALLAX (subtle) ──────────────────
window.addEventListener(‘scroll’, () => {
const y = window.scrollY;
if (heroShoe) heroShoe.style.transform = `translateY(${y * 0.08}px) rotate(-6deg)`;
}, { passive: true });

// ─── COPY COUPON ─────────────────────────────
document.querySelectorAll(‘strong’).forEach(el => {
if (el.textContent.includes(‘HAIMAHADIANS20’)) {
el.style.cursor = ‘pointer’;
el.title = ‘Klik untuk menyalin kode’;
el.addEventListener(‘click’, () => {
navigator.clipboard?.writeText(‘HAIMAHADIANS20’).then(() => {
showToast(‘📋 Kode HAIMAHADIANS20 disalin!’);
});
});
}
});

// ─── INIT ─────────────────────────────────────
updateCartUI();