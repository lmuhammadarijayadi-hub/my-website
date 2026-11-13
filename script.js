/* =========================================
   1. NAVBAR DRAWER
========================================= */

const drawer = document.getElementById("navbarNavMenu");
const tombolNavbar = document.querySelector(".navbar-toggler");

if (drawer && tombolNavbar) {

    // Membuka menu
    tombolNavbar.addEventListener("click", function () {
        if (!drawer.open) {
            drawer.showModal();
        } else {
            drawer.close();
        }
    });

    // Menutup ketika klik di luar drawer
    drawer.addEventListener("click", function (event) {
        if (event.target === drawer) {
            drawer.close();
        }
    });

    // Menutup drawer ketika memilih menu
    drawer.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function () {

            if (drawer.open) {
                drawer.close();
            }

        });

    });
}

/* =========================================
   2. DROPDOWN MENU
========================================= */

/* =========================================
   DROPDOWN MENU: SOLUSI FINAL DIALOG
========================================= */

const dropdownButtons = document.querySelectorAll('[data-bs-toggle="menu"]');

dropdownButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.stopPropagation();
        
        // Paksa fokus langsung ke tombol untuk memotong jeda dialog browser
        button.focus();

        const navItem = button.closest(".nav-item");
        if (!navItem) return;

        const menu = navItem.querySelector(".menu");
        if (!menu) return;

        // Cek status buka/tutup berdasarkan display atau kelas
        const sedangBuka = menu.style.display === "block" || menu.classList.contains("aktif");

        // Tutup semua menu lain di dalam drawer
        document.querySelectorAll(".drawer .menu").forEach(function (item) {
            item.style.display = "none";
            item.classList.remove("aktif");
        });

        // Buka atau tutup menu yang dipilih
        if (!sedangBuka) {
            menu.style.display = "block";
            menu.classList.add("aktif");
            button.setAttribute("aria-expanded", "true");
        } else {
            menu.style.display = "none";
            menu.classList.remove("aktif");
            button.setAttribute("aria-expanded", "false");
        }
    });
});

// Menutup dropdown ketika mengklik di luar area menu
document.addEventListener("click", function () {
    document.querySelectorAll(".drawer .menu").forEach(function (menu) {
        menu.style.display = "none";
        menu.classList.remove("aktif");
    });
    dropdownButtons.forEach(function (button) {
        button.setAttribute("aria-expanded", "false");
    });
});

/* =========================================
   3. CAROUSEL / SLIDESHOW
========================================= */

const carousel = document.getElementById(
    "carouselExampleInterval"
);

if (carousel) {

    const slides = carousel.querySelectorAll(".carousel-item");

    const indicators = carousel.querySelectorAll(
        ".carousel-indicators button"
    );

    const tombolPlayPause = carousel.querySelector(
        ".carousel-control-play-pause"
    );

    let indexAktif = 0;
    let intervalCarousel = null;
    let sedangBerjalan = true;

    // Mengatur slide aktif
    function tampilkanSlide(index) {

        slides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === index);
        });

        indicators.forEach(function (button, i) {
            button.classList.toggle("active", i === index);

            if (i === index) {
                button.setAttribute("aria-current", "true");
            } else {
                button.removeAttribute("aria-current");
            }
        });

        indexAktif = index;
    }

    // Pindah ke slide berikutnya
    function slideBerikutnya() {

        let berikutnya = (indexAktif + 1) % slides.length;

        tampilkanSlide(berikutnya);
    }

    // Menentukan waktu pergantian slide
    function mulaiCarousel() {

        clearTimeout(intervalCarousel);

        if (!sedangBerjalan) return;

        const waktu = Number(
            slides[indexAktif].dataset.bsInterval
        ) || 3000;

        intervalCarousel = setTimeout(function () {

            slideBerikutnya();

            mulaiCarousel();

        }, waktu);
    }

    // Tombol indikator
    indicators.forEach(function (button, index) {

        button.addEventListener("click", function () {

            tampilkanSlide(index);

            mulaiCarousel();

        });

    });

    // Tombol Play dan Pause
    if (tombolPlayPause) {

        tombolPlayPause.addEventListener("click", function () {

            sedangBerjalan = !sedangBerjalan;

            if (sedangBerjalan) {

                tombolPlayPause.setAttribute("aria-label", "Pause");

                mulaiCarousel();

            } else {

                tombolPlayPause.setAttribute("aria-label", "Play");

                clearTimeout(intervalCarousel);

            }

            tombolPlayPause.classList.toggle(
                "is-playing",
                sedangBerjalan
            );

        });

    }

    // Mulai slideshow otomatis
    if (slides.length > 0) {

        tampilkanSlide(0);

        mulaiCarousel();

    }

}


/* =========================================
   4. TOMBOL WHATSAPP
========================================= */

function redirWhatsapp() {

    // Ganti nomor berikut dengan nomor WhatsApp kamu
    // Gunakan kode negara 62 tanpa tanda +

    const nomor = "6281234567890";

    const pesan = encodeURIComponent(
        "Halo, saya tertarik untuk bekerja sama dengan Program Studi Statistika Universitas Hamzanwadi."
    );

    const linkWhatsapp =
        "https://wa.me/" + nomor + "?text=" + pesan;

    window.open(linkWhatsapp, "_blank");

}


/* =========================================
   5. FORM KONTAK
========================================= */

const formKontak = document.querySelector(".php-email-form");

if (formKontak) {

    formKontak.addEventListener("submit", function (event) {

        // Mencegah pengiriman jika backend belum tersedia
        event.preventDefault();

        const nama = formKontak.querySelector(
            '[name="name"]'
        ).value.trim();

        const email = formKontak.querySelector(
            '[name="email"]'
        ).value.trim();

        const subjek = formKontak.querySelector(
            '[name="subject"]'
        ).value.trim();

        const pesan = formKontak.querySelector(
            '[name="message"]'
        ).value.trim();

        if (!nama || !email || !subjek || !pesan) {

            alert("Mohon lengkapi semua kolom!");

            return;

        }

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValid.test(email)) {

            alert("Format email tidak valid!");

            return;

        }

        alert(
            "Terima kasih, " + nama +
            "! pesan anda berhasil dikirim. " +
            "Mohon tunggu beberapa saat."
        );

        formKontak.reset();

    });

}

/* =========================================
   6. SMOOTH SCROLL NAVIGASI 
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
        const tujuan = link.getAttribute("href");

        if (!tujuan || tujuan === "#") return;

        const target = document.querySelector(tujuan);

        if (target) {
            event.preventDefault(); // Mencegah loncatan instan

            // Jika link diklik dari dalam drawer, tutup drawer dulu secara aman
            const drawerElement = document.getElementById("navbarNavMenu");
            if (drawerElement && drawerElement.open) {
                drawerElement.close();
            }

            // Beri sedikit jeda agar dialog selesai tertutup dan body kembali aktif
            setTimeout(function() {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 50);
        }
    });
});


/* =========================================
   7. ANIMASI SAAT SECTION MUNCUL
========================================= */

const elemenAnimasi = document.querySelectorAll(".card-list");

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("muncul");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    elemenAnimasi.forEach(function (elemen) {

        observer.observe(elemen);

    });

}


/* =========================================
   8. TAHUN FOOTER
========================================= */

console.log(
    "Website Statistika Universitas Hamzanwadi berhasil dimuat!"
);