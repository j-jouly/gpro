/* --- SECURITY CHECKPOINT (PASTE DI HALAMAN TUJUAN) --- */
(function() {
    const sessionRaw = localStorage.getItem('userSession');
    const redirectUrl = 'index.html'; // Alamat balik kalau sesi habis

    // 1. Cek apakah ada sesi sama sekali
    if (!sessionRaw) {
        window.location.replace(redirectUrl);
        return;
    }

    try {
        const session = JSON.parse(sessionRaw);
        const currentTime = new Date().getTime();
        const limit = 2 * 60 * 60 * 1000; // BATAS 2 JAM

        // 2. CEK APAKAH SESI SUDAH BASI (EXPIRED)
        if (session.loginTime && (currentTime - session.loginTime > limit)) {
            localStorage.removeItem('userSession');
            alert("Sesi Anda telah berakhir (Limit 2 Jam). Silakan Login kembali, Bos.");
            window.location.replace(redirectUrl);
            return;
        }

        // 3. TAMPILKAN NAMA (OPSIONAL)
        window.addEventListener('load', () => {
            const display = document.getElementById('userNameDisplay');
            if (display) display.innerText = "Selamat Datang, " + (session.korxname || "Bos");
        });

    } catch (e) {
        // Jika data di localStorage rusak, hapus dan tendang keluar
        localStorage.removeItem('userSession');
        window.location.replace(redirectUrl);
    }

    // 4. FUNGSI LOGOUT GLOBAL
    window.logout = function() {
        if (confirm('Anda yakin ingin keluar, Bos?')) {
            localStorage.removeItem('userSession');
            window.location.replace(redirectUrl);
        }
    };
})();
