// script.js - Untuk Mahadian’s Website

document.addEventListener('DOMContentLoaded', function() {

    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Ubah ikon hamburger menjadi X
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

    // Smooth Scroll untuk semua link navbar
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Cek apakah link menuju section di halaman yang sama
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    e.preventDefault(); // Cegah lompat langsung
                    
                    // Smooth scroll ke section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Tutup menu mobile setelah klik
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        
                        // Kembalikan ikon ke hamburger
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

    // Optional: Tutup menu jika user klik di luar menu (di mobile)
    document.addEventListener('click', function(e) {
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

    // Bonus: Tambah efek scroll pada navbar (menjadi lebih gelap saat di-scroll)
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(250, 248, 245, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

});