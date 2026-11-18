const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...mainNav.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});


// Floating glass contact window
const contactOverlay = document.getElementById("contactOverlay");
const contactWindow = document.getElementById("contactWindow");
const openContactButton = document.getElementById("openContact");
const closeContactButton = document.getElementById("closeContact");

function openContactWindow() {
  if (!contactOverlay) return;
  contactOverlay.classList.add("is-open");
  contactOverlay.setAttribute("aria-hidden", "false");
  document.body.classList.add("contact-modal-open");
  closeContactButton?.focus();
}

function closeContactWindow() {
  if (!contactOverlay) return;
  contactOverlay.classList.remove("is-open");
  contactOverlay.setAttribute("aria-hidden", "true");
  document.body.classList.remove("contact-modal-open");
  openContactButton?.focus();
}

openContactButton?.addEventListener("click", openContactWindow);
closeContactButton?.addEventListener("click", closeContactWindow);

contactOverlay?.addEventListener("click", (event) => {
  if (event.target === contactOverlay) closeContactWindow();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactOverlay?.classList.contains("is-open")) {
    closeContactWindow();
  }
});
