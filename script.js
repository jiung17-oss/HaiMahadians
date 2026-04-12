document.addEventListener('DOMContentLoaded', () => {

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });
    }

    // Smooth Scroll
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = hamburger.querySelector('i');
                    if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });
    });

    // Toggle Sub Services
    document.querySelectorAll('.toggle-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const cardId = this.getAttribute('data-card');
            const card = document.getElementById(cardId + '-card');

            // Tutup card lain yang terbuka
            document.querySelectorAll('.card').forEach(c => {
                if (c !== card) c.classList.remove('active');
            });

            // Toggle card ini
            card.classList.toggle('active');

            // Ubah teks tombol
            this.textContent = card.classList.contains('active') ? 'Tutup' : 'Lihat Layanan';
        });
    });

});