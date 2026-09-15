// Interactions de la landing, sans dépendance : apparitions au scroll, compteurs,
// étapes « Comment ça marche », navbar, menus et accordéons.

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

const $$ = (selector: string, root: ParentNode = document) => Array.from(root.querySelectorAll<HTMLElement>(selector));

let cleanups: Array<() => void> = [];

/* ---------- Apparitions au scroll ---------- */

function initReveal() {
  const targets = $$("[data-reveal], [data-scale-in]");
  if (reducedMotion() || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -80px 0px" },
  );
  targets.forEach((el) => observer.observe(el));
  cleanups.push(() => observer.disconnect());
}

/* ---------- Compteurs ---------- */

function countUp(el: HTMLElement) {
  const target = Number(el.dataset.count);
  // Largeur figée sur la valeur finale : le nombre ne fait plus bouger la mise en page pendant l'animation
  el.style.minWidth = `${el.getBoundingClientRect().width}px`;
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = String(Math.round(target * easeOut(t)));
    if (t < 1) requestAnimationFrame(tick);
  };
  el.textContent = "0";
  requestAnimationFrame(tick);
}

function initCounters() {
  const counters = $$("[data-count]");
  if (reducedMotion() || !("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      countUp(entry.target as HTMLElement);
      observer.unobserve(entry.target);
    }
  });
  counters.forEach((el) => observer.observe(el));
  cleanups.push(() => observer.disconnect());
}

/* ---------- Étapes « Comment ça marche » liées au scroll ---------- */

function initProcess() {
  const roots = $$("[data-process]");
  if (!roots.length) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const anchor = window.innerHeight * 0.7;
    for (const root of roots) {
      const rect = root.getBoundingClientRect();
      const progress = Math.min(Math.max((anchor - rect.top) / rect.height, 0), 1);
      const line = root.querySelector<HTMLElement>("[data-process-line]");
      if (line) line.style.transform = `translateY(${(progress - 1) * 100}%)`;
      const steps = $$("[data-step]", root);
      steps.forEach((step, i) => {
        const threshold = steps.length > 1 ? i / (steps.length - 1) : 0;
        step.dataset.active = String(i === 0 || progress >= threshold - 0.02);
      });
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  cleanups.push(() => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(frame);
  });
}

/* ---------- Navbar : masquée au scroll vers le bas ---------- */

let lastY = 0;
function onNavScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  const y = window.scrollY;
  const menuOpen = nav.querySelector('[data-mobile-nav][data-open="true"]');
  nav.dataset.hidden = String(!menuOpen && y > 120 && y > lastY);
  lastY = y;
}

/* ---------- Clics (délégation, attachée une seule fois) ---------- */

function onClick(event: MouseEvent) {
  const target = event.target as HTMLElement;

  const mobileToggle = target.closest<HTMLElement>("[data-mobile-toggle]");
  if (mobileToggle) {
    const nav = mobileToggle.closest<HTMLElement>("[data-mobile-nav]")!;
    const open = nav.dataset.open !== "true";
    nav.dataset.open = String(open);
    mobileToggle.setAttribute("aria-expanded", String(open));
    return;
  }

  const accordionToggle = target.closest<HTMLElement>("[data-accordion-toggle]");
  if (accordionToggle) {
    const item = accordionToggle.closest<HTMLElement>("[data-accordion]")!;
    const group = item.closest<HTMLElement>("[data-accordion-group]");
    const open = item.dataset.open !== "true";
    if (group) {
      if (!open && group.dataset.accordionGroup === "always-one") return;
      $$("[data-accordion]", group).forEach((other) => {
        other.dataset.open = "false";
        other.querySelector("[data-accordion-toggle]")?.setAttribute("aria-expanded", "false");
      });
    }
    item.dataset.open = String(open);
    accordionToggle.setAttribute("aria-expanded", String(open));
  }
}

/* ---------- Cycle de vie (compatible transitions de page) ---------- */

window.addEventListener("scroll", onNavScroll, { passive: true });
document.addEventListener("click", onClick);

document.addEventListener("astro:page-load", () => {
  lastY = window.scrollY;
  document.getElementById("navbar")?.setAttribute("data-hidden", "false");
  initReveal();
  initCounters();
  initProcess();
});

document.addEventListener("astro:before-swap", () => {
  cleanups.forEach((fn) => fn());
  cleanups = [];
  const mobileNav = document.querySelector<HTMLElement>("[data-mobile-nav]");
  if (mobileNav) mobileNav.dataset.open = "false";
});
