/* ============================================
   HAI MAHADIANS v3 — script.js
   Bulletproof: preloader always dismissed.
   ============================================ */

/* ── HELPERS ─────────────────────────────── */
const get   = id  => document.getElementById(id);
const all   = sel => Array.from(document.querySelectorAll(sel));
const money = n   => 'Rp ' + Number(n).toLocaleString('id-ID');

/* ── CART STATE ──────────────────────────── */
let cart  = [];
let size  = '40';
let color = 'Ember Orange';

/* ============================================
   PRELOADER — always exits, no matter what
   ============================================ */
(function runPreloader() {
  const pre   = get('preloader');
  const fill  = get('preBar');
  const num   = get('preNum');

  // If elements missing, just bail immediately
  if (!pre) return;

  let pct = 0;

  // Animate the bar
  const iv = setInterval(() => {
    pct = Math.min(pct + Math.random() * 12 + 4, 100);
    if (fill) fill.style.width = pct + '%';
    if (num)  num.textContent  = Math.floor(pct) + '%';
    if (pct >= 100) { clearInterval(iv); remove(); }
  }, 55);

  // Hard fallback: remove after 3 s regardless
  const fallback = setTimeout(remove, 3000);

  // Also remove as soon as page is fully loaded
  window.addEventListener('load', function onLoad() {
    clearInterval(iv);
    clearTimeout(fallback);
    if (fill) fill.style.width = '100%';
    if (num)  num.textContent  = '100%';
    setTimeout(remove, 280);
    window.removeEventListener('load', onLoad);
  });

  function remove() {
    clearInterval(iv);
    clearTimeout(fallback);
    if (!pre || pre._removing) return;
    pre._removing = true;               // prevent double-call
    pre.style.transition = 'opacity .5s ease';
    pre.style.opacity    = '0';
    setTimeout(() => {
      pre.style.display = 'none';       // pull out of layout
      document.body.classList.remove('no-scroll');
      bootApp();                        // start the rest of the app
    }, 520);
  }
})();

document.body.classList.add('no-scroll'); // prevent scroll during preload

/* ============================================
   BOOT — called once preloader is gone
   ============================================ */
function bootApp() {
  setupCursor();
  setupProgress();
  setupNavbar();
  setupHero();
  setupSwatches();
  setupSizes();
  setupCart();
  setupTilt();
  setupReveal();
  setupCounters();
  setupReviews();
  setupPromo();
  setupContact();
  setupActiveNav();
}

/* ── CUSTOM CURSOR ───────────────────────── */
function setupCursor() {
  if ('ontouchstart' in window) return;   // skip on touch devices
  const dot  = get('cDot');
  const ring = get('cRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function loop() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  const hoverSel = 'a, button, .swatch, .sz-btn, .prod-card, .rev-card, label';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(hoverSel)) { dot.classList.add('grow'); ring.classList.add('grow'); }
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(hoverSel)) { dot.classList.remove('grow'); ring.classList.remove('grow'); }
  });
}

/* ── SCROLL PROGRESS ─────────────────────── */
function setupProgress() {
  const bar = get('pageProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    bar.style.width = (window.scrollY / (d.scrollHeight - d.clientHeight) * 100) + '%';
  }, { passive: true });
}

/* ── NAVBAR ──────────────────────────────── */
function setupNavbar() {
  const nav     = get('nav');
  const burger  = get('burgerBtn');
  const menu    = get('navMenu');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('stuck', window.scrollY > 60);
  }, { passive: true });

  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      menu.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('no-scroll', open);
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('no-scroll');
      });
    });
  }
}

/* ── HERO EFFECTS ────────────────────────── */
function setupHero() {
  const shoe = get('heroShoe');
  const word = document.querySelector('.hero-bg-word');

  // Subtle mouse parallax on bg word
  if (word) {
    window.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - .5) * 20;
      const y = (e.clientY / window.innerHeight - .5) * 12;
      word.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }, { passive: true });
  }

  // Scroll parallax on shoe
  if (shoe) {
    window.addEventListener('scroll', () => {
      if (window.scrollY < window.innerHeight) {
        shoe.style.transform = `translateY(${window.scrollY * .07}px) rotate(-8deg)`;
      }
    }, { passive: true });
  }
}

/* ── COLOR SWATCHES ──────────────────────── */
function setupSwatches() {
  const shoe  = get('heroShoe');
  const label = get('colorLabel');

  all('.swatch').forEach(sw => {
    sw.addEventListener('click', () => {
      all('.swatch').forEach(s => s.classList.remove('active'));
      sw.classList.add('active');
      color = sw.dataset.color || color;
      if (label) label.textContent = color;

      const src = sw.dataset.img;
      if (src && shoe) {
        shoe.style.opacity = '0';
        shoe.style.transform = 'scale(.9) rotate(-8deg)';
        setTimeout(() => {
          shoe.src = src;
          shoe.addEventListener('load', () => {
            shoe.style.opacity   = '1';
            shoe.style.transform = '';
          }, { once: true });
          // fallback if load already fired
          setTimeout(() => { shoe.style.opacity = '1'; shoe.style.transform = ''; }, 600);
        }, 300);
      }
    });
  });
}

/* ── SIZE BUTTONS ────────────────────────── */
function setupSizes() {
  const label = get('sizeLabel');
  all('.sz-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      all('.sz-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      size = btn.dataset.size;
      if (label) label.textContent = size;
    });
  });
}

/* ── CART ────────────────────────────────── */
function setupCart() {
  const mask     = get('cartMask');
  const drawer   = get('cartDrawer');
  const closeBtn = get('cartClose');
  const trigger  = get('cartTrigger');
  const heroAdd  = get('heroAdd');
  const checkout = get('checkoutBtn');

  function open()  {
    mask?.classList.add('on');
    drawer?.classList.add('on');
    document.body.classList.add('no-scroll');
  }
  function close() {
    mask?.classList.remove('on');
    drawer?.classList.remove('on');
    document.body.classList.remove('no-scroll');
  }

  trigger?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  mask?.addEventListener('click', close);

  // Hero CTA
  heroAdd?.addEventListener('click', () => {
    const img = all('.swatch.active')[0]?.dataset?.img || get('heroShoe')?.src || '';
    addItem('Nike Air Max 720', 2499000, size, color, img);
  });

  // Product card buttons
  all('.pc-add, .pc-quick').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const card = btn.closest('.prod-card');
      const img  = card?.querySelector('img')?.src || '';
      addItem(btn.dataset.product, +btn.dataset.price, size, color, img);
    });
  });

  // Checkout → WhatsApp
  checkout?.addEventListener('click', () => {
    if (!cart.length) { toast('🛒 Keranjang masih kosong!'); return; }
    const total = cart.reduce((s, i) => s + i.price, 0);
    const lines = cart.map(i => `• ${i.name} (UK ${i.size} · ${i.color})`).join('\n');
    const msg   = encodeURIComponent(
      `Halo Hai Mahadians! 👋\n\nSaya ingin memesan:\n${lines}\n\nTotal: ${money(total)}\n\nMohon konfirmasinya. Terima kasih! 🙏`
    );
    window.open(`https://wa.me/6281234567890?text=${msg}`, '_blank');
  });

  renderCart();
}

function addItem(name, price, sz, col, img) {
  cart.push({ name, price: +price, size: sz, color: col, img: img || '' });
  renderCart();
  toast(`✅ ${name} (UK ${sz}) ditambahkan!`);
}

function renderCart() {
  const body  = get('cartBody');
  const foot  = get('cartFoot');
  const badge = get('cartBadge');
  const total = get('cartTotalLabel');

  // Badge
  if (badge) {
    badge.textContent = cart.length;
    badge.classList.remove('pop');
    void badge.offsetWidth;
    badge.classList.add('pop');
  }
  if (total) total.textContent = money(cart.reduce((s, i) => s + i.price, 0));
  if (foot)  foot.style.display = cart.length ? 'block' : 'none';
  if (!body) return;

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <span>🛒</span>
        <p>Keranjangmu masih kosong</p>
      </div>`;
    return;
  }

  body.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <img class="ci-thumb"
        src="${item.img}"
        alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=50'"/>
      <div class="ci-details">
        <div class="ci-name">${item.name}</div>
        <div class="ci-price">${money(item.price)}</div>
        <div class="ci-meta">UK ${item.size} · ${item.color}</div>
      </div>
      <button class="ci-del" data-i="${idx}" aria-label="Hapus">✕</button>
    </div>`).join('');

  body.querySelectorAll('.ci-del').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(+btn.dataset.i, 1);
      renderCart();
    });
  });
}

/* ── 3D TILT ON CARDS ────────────────────── */
function setupTilt() {
  if ('ontouchstart' in window) return;
  all('.prod-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      card.style.transition = '';
      card.style.transform  = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform .5s ease, border-color .3s, box-shadow .3s';
      card.style.transform  = '';
    });
  });
}

/* ── REVEAL ON SCROLL ────────────────────── */
function setupReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: .1 });

  all('.reveal').forEach(el => obs.observe(el));

  // Hero elements animate immediately (no scroll needed)
  all('.up').forEach(el => {
    setTimeout(() => el.classList.add('in'), (+el.style.getPropertyValue('--i') || 0) * 80 + 100);
  });
}

/* ── ANIMATED COUNTERS ───────────────────── */
function setupCounters() {
  const els = all('.stat-n');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      animCount(e.target);
    });
  }, { threshold: .5 });

  els.forEach(el => obs.observe(el));
}

function animCount(el) {
  const target = parseFloat(el.dataset.target);
  const isDec  = el.hasAttribute('data-dec');
  const dur    = 1800;
  const start  = performance.now();

  function frame(now) {
    const p   = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    const val  = target * ease;
    el.textContent = isDec
      ? val.toFixed(1)
      : target >= 10000
        ? Math.floor(val).toLocaleString('id-ID')
        : Math.floor(val);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

/* ── REVIEW SLIDER ───────────────────────── */
function setupReviews() {
  const track = get('revTrack');
  const dots  = get('revDots');
  const prev  = get('revPrev');
  const next  = get('revNext');
  if (!track) return;

  const cards = all('.rev-card');
  if (!cards.length) return;

  let idx   = 0;
  let timer = null;

  function cardW() {
    return (cards[0]?.offsetWidth ?? 320) + 22;
  }

  function go(n) {
    idx = ((n % cards.length) + cards.length) % cards.length;
    track.style.transform = `translateX(-${idx * cardW()}px)`;
    all('.rdot').forEach((d, i) => d.classList.toggle('on', i === idx));
    clearInterval(timer);
    timer = setInterval(() => go(idx + 1), 4500);
  }

  // Build dots
  if (dots) {
    dots.innerHTML = cards.map((_, i) =>
      `<button class="rdot${i === 0 ? ' on' : ''}" aria-label="Slide ${i + 1}"></button>`
    ).join('');
    all('.rdot').forEach((d, i) => d.addEventListener('click', () => go(i)));
  }

  prev?.addEventListener('click', () => go(idx - 1));
  next?.addEventListener('click', () => go(idx + 1));

  // Swipe support
  let tx = 0;
  track.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    track.style.transform  = `translateX(-${idx * cardW()}px)`;
    setTimeout(() => { track.style.transition = ''; }, 100);
  });

  timer = setInterval(() => go(idx + 1), 4500);
}

/* ── PROMO CODE COPY ─────────────────────── */
function setupPromo() {
  const btn = get('copyBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const code = get('promoText')?.textContent?.trim() || 'HAIMAHADIANS20';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        btn.textContent = '✓ Disalin!';
        setTimeout(() => btn.textContent = 'Salin', 2200);
        toast('📋 Kode ' + code + ' berhasil disalin!');
      }).catch(() => toast('Kode: ' + code));
    } else {
      toast('Kode: ' + code);
    }
  });
}

/* ── CONTACT FORM ────────────────────────── */
function setupContact() {
  const form = get('contactForm');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    toast('🎉 Pesan terkirim! Kami segera menghubungimu.');
    form.reset();
  });
}

/* ── ACTIVE NAV LINKS ────────────────────── */
function setupActiveNav() {
  const sections = all('section[id]');
  const links    = all('.nav-link');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id);
        });
      }
    });
  }, { threshold: .35 });

  sections.forEach(s => obs.observe(s));
}

/* ── TOAST ───────────────────────────────── */
let _toastTimer;
function toast(msg) {
  const el = get('toast');
  if (!el) return;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(_toastTimer);
  _toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}
