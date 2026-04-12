// script.js - Mahadian’s Website

document.addEventListener('DOMContentLoaded', () => {

    // ================== HAMBURGER MENU ==================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Ubah ikon hamburger jadi X dan sebaliknya
            const icon = hamburger.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // ================== SMOOTH SCROLL ==================
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    e.preventDefault();

                    // Smooth scroll
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Tutup menu di mobile setelah klik
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');

                        const icon = hamburger.querySelector('i');
                        if (icon) {
                            icon.classList.remove('fa-xmark');
                            icon.classList.add('fa-bars');
                        }
                    }
                }
            }
        });
    });

    // ================== CLOSE MENU WHEN CLICK OUTSIDE ==================
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');

                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });

    // ================== NAVBAR SCROLL EFFECT ==================
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 60) {
                navbar.style.backgroundColor = 'rgba(15, 42, 36, 0.99)';
                navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            } else {
                navbar.style.backgroundColor = 'rgba(15, 42, 36, 0.98)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ================== BACK TO TOP BUTTON (Opsional tapi recommended) ==================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backTo
    // ====================== INTERACTIVE CARD SUB-LAYANAN ======================
document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const card = this.closest('.card');
        const target = this.getAttribute('data-target');
        const subContent = document.getElementById(`sub-${target}`);

        // Toggle expanded class
        card.classList.toggle('expanded');

        // Ganti teks tombol utama
        if (card.classList.contains('expanded')) {
            this.textContent = 'Tutup';
        } else {
            this.textContent = (target === 'admin') ? 'Urus Sekarang' : 'Lihat Info';
        }
    });
});

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const card = this.closest('.card');
        const target = this.getAttribute('data-target');
        const toggleBtn = card.querySelector('.toggle-btn');

        card.classList.remove('expanded');
        toggleBtn.textContent = (target === 'admin') ? 'Urus Sekarang' : 'Lihat Info';
    });
});
// Toggle Sub Services
document.querySelectorAll('.toggle-btn').forEach(button => {
    button.addEventListener('click', function() {
        const cardId = this.getAttribute('data-card');
        const card = document.getElementById(cardId + '-card');
        
        // Tutup semua card yang terbuka
        document.querySelectorAll('.card').forEach(c => {
            if (c !== card) c.classList.remove('active');
        });

        // Toggle card yang diklik
        card.classList.toggle('active');

        // Ubah teks tombol
        if (card.classList.contains('active')) {
            this.textContent = 'Tutup';
        } else {
            this.textContent = (cardId === 'admin') ? 'Lihat Layanan' : 'Lihat Layanan';
        }
    });
});