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
