// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
});

// Close menu when clicking a link (mobile)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Animate skill bars when Skills section is visible
const skillBars = document.querySelectorAll(".bar span");
const skillsSection = document.getElementById("skills");
const ioSkills = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    skillBars.forEach(bar => {
      const fill = bar.getAttribute("data-fill") || "0";
      bar.style.width = `${fill}%`;
    });
    ioSkills.disconnect();
  });
}, { threshold: 0.25 });

ioSkills.observe(skillsSection);

// Active nav link on scroll
const sections = ["about", "skills", "projects", "contact"].map(id => document.getElementById(id));
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  const scrollY = window.scrollY + 120;
  let currentId = "about";

  sections.forEach(sec => {
    if (sec.offsetTop <= scrollY) currentId = sec.id;
  });

  navLinks.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
  });
}
window.addEventListener("scroll", setActiveLink);
setActiveLink();

// Project filter
const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    projectCards.forEach(card => {
      const cat = card.dataset.category;
      const show = (filter === "all" || filter === cat);
      card.style.display = show ? "block" : "none";
    });
  });
});

// ===================== Project modal (UPDATED with optional image) =====================
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");

// ✅ New elements for modal image
const modalImageWrap = document.getElementById("modalImageWrap");
const modalImage = document.getElementById("modalImage");

projectCards.forEach(card => {
  card.addEventListener("click", () => {
    modalTitle.textContent = card.dataset.title || "Project";
    modalDesc.textContent = card.dataset.desc || "";
    modalTech.textContent = card.dataset.tech || "";
    modalLink.href = card.dataset.link || "#";

    // ✅ Show image ONLY if this project has data-img
    if (card.dataset.img) {
      modalImage.src = card.dataset.img;
      modalImageWrap.style.display = "block";
    } else {
      modalImage.src = "";
      modalImageWrap.style.display = "none";
    }

    modal.classList.add("show");
  });
});

function closeModal() {
  modal.classList.remove("show");
}
modalClose.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Contact form -> mailto
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const to = document.getElementById("toEmail").value.trim();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  const mailSubject = encodeURIComponent(subject);
  const mailtoLink = `mailto:${to}?subject=${mailSubject}&body=${body}`;

  window.location.href = mailtoLink;
});
