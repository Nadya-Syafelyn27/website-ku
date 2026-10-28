
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");

// Menu navigasi HP
menuToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Tutup menu setelah memilih halaman
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Mode terang dan gelap
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");
  themeToggle.textContent = isLight ? "☾" : "☀";
  document.querySelector('meta[name="theme-color"]')
    .setAttribute("content", isLight ? "#f4efff" : "#0b0712");
});

// Efek mengetik
const typingText = document.getElementById("typingText");
const words = [
  "Creative Developer",
  "UI Enthusiast",
  "Future Programmer"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typingText.textContent = word.substring(0, charIndex);

  if (!deleting) {
    charIndex++;

    if (charIndex > word.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    charIndex--;

    if (charIndex < 0) {
      charIndex = 0;
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

// Animasi ketika bagian website terlihat
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add("visible"));
}

// Filter proyek
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === "all" ||
                    card.dataset.category === filter;
      card.hidden = !match;
    });
  });
});

// Tombol kembali ke atas
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 300);
}, { passive: true });

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Tahun otomatis
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Formulir kontak melalui aplikasi email
document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();

  // GANTI dengan alamat email tujuanmu
  const portfolioEmail = "rshslnthr@gmail.com";

  const name = document.getElementById("senderName").value.trim();
  const email = document.getElementById("senderEmail").value.trim();
  const message = document.getElementById("senderMessage").value.trim();

  if (!name || !email || !message) {
    alert("Lengkapi semua kolom terlebih dahulu!");
    return;
  }

  const subject = encodeURIComponent("Pesan dari Portfolio - " + name);
  const body = encodeURIComponent(
    "Nama: " + name +
    "\nEmail: " + email +
    "\n\nPesan:\n" + message
  );

  window.location.href =
    `mailto:${portfolioEmail}?subject=${subject}&body=${body}`;
});
