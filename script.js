const navLinks = Array.from(document.querySelectorAll(".topbar nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
root.dataset.theme = savedTheme || preferredTheme;

const updateThemeLabel = () => {
  const isLight = root.dataset.theme === "light";
  themeToggle?.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
};

themeToggle?.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
  localStorage.setItem("portfolio-theme", root.dataset.theme);
  updateThemeLabel();
});

updateThemeLabel();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    });
  },
  {
    rootMargin: "-36% 0px -54% 0px",
    threshold: 0.01,
  }
);

sections.forEach((section) => observer.observe(section));

const animatedItems = Array.from(document.querySelectorAll("[data-animate]"));

const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      animationObserver.unobserve(entry.target);
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12,
  }
);

animatedItems.forEach((item) => animationObserver.observe(item));
