function changeColor(color, imageSrc) {
    // Ganti warna latar belakang kartu
    const card = document.getElementById('cardContainer');
    card.style.background = color;

    // Ganti sumber gambar sepatu
    const shoe = document.getElementById('shoeImage');
    
    // Memberikan sedikit efek gerak saat gambar diganti
    shoe.style.opacity = '0';
    
    setTimeout(() => {
        shoe.src = imageSrc;
        shoe.style.opacity = '1';
    }, 200);
}
